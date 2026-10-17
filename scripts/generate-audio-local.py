"""Build Rumbo's Mexican Spanish MP3 pack locally, without API calls or keys.

Install scripts/requirements-audio.txt in a virtual environment first.
Only missing model weights are downloaded; synthesis itself runs offline.
"""
import argparse
import hashlib
import io
import json
import os
from pathlib import Path
import re
import subprocess
import sys
import urllib.request
import wave

ROOT = Path(__file__).resolve().parent.parent
VOICE = "es_MX-claude-high"
REVISION = "c10ece1aade47bb51c153c893d14e5bf8e5b7117"
SOURCE = f"https://huggingface.co/rhasspy/piper-voices/resolve/{REVISION}/es/es_MX/claude/high"
MODEL_HASHES = {
    f"{VOICE}.onnx": "3ef40a71ea63852cd8ab7e6fa7d2ecdcfa67a0b47c9c48e3f10e02ee02083ea0",
    f"{VOICE}.onnx.json": "1afc81f703c0e4cb3b4d7c0dca096b8b54a98806807f0170cf5eb5557723c12d",
}
PROFILE = f"piper-1.8.0:{VOICE}:{REVISION}:default:mp3-96kbps-v1"


def digest(path):
    result = hashlib.sha256()
    with path.open("rb") as source:
        for block in iter(lambda: source.read(1024 * 1024), b""):
            result.update(block)
    return result.hexdigest()


def ensure_model(directory):
    directory.mkdir(parents=True, exist_ok=True)
    for name, expected in MODEL_HASHES.items():
        target = directory / name
        if not target.exists():
            print(f"Downloading free voice file: {name}", flush=True)
            temporary = target.with_suffix(target.suffix + ".tmp")
            try:
                with urllib.request.urlopen(f"{SOURCE}/{name}", timeout=90) as source, temporary.open("wb") as output:
                    while block := source.read(1024 * 1024):
                        output.write(block)
                if digest(temporary) != expected:
                    raise ValueError(f"Unexpected checksum for {name}")
                temporary.replace(target)
            finally:
                temporary.unlink(missing_ok=True)
        if digest(target) != expected:
            raise ValueError(f"Checksum mismatch for {name}; use the published unmodified model.")
    return directory / f"{VOICE}.onnx"


def write_json(path, data):
    temporary = path.with_suffix(path.suffix + ".tmp")
    temporary.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    temporary.replace(path)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    choice = parser.add_mutually_exclusive_group(required=True)
    choice.add_argument("--all", action="store_true", help="Generate every listening phrase")
    choice.add_argument("--sample", action="store_true", help="Generate three samples")
    parser.add_argument("--model-dir", type=Path, default=ROOT / ".audio-models")
    args = parser.parse_args()
    try:
        import lameenc
        from piper import PiperVoice
    except ImportError:
        parser.error("Install scripts/requirements-audio.txt in your Python virtual environment first.")
    corpus = json.loads(subprocess.check_output(["node", str(ROOT / "scripts/speech-corpus.mjs")], text=True))
    texts = ["Hola. ¿Me trae la cuenta, por favor?", "¿Puede repetir, por favor?", "Hablo un poco de español."] if args.sample else corpus
    os.environ.setdefault("ORT_DISABLE_TELEMETRY", "1")
    # Disable runtime telemetry; speech is produced on this computer.
    import onnxruntime
    onnxruntime.disable_telemetry_events()
    voice = PiperVoice.load(str(ensure_model(args.model_dir)))
    directory = ROOT / "dist/audio"
    (directory / "clips").mkdir(parents=True, exist_ok=True)
    manifest_path = directory / "manifest.json"
    manifest = {"version": 1, "locale": "es-MX", "provider": "Piper", "model": VOICE,
                "voice": "Claude", "profile": PROFILE, "aiGenerated": True,
                "generatedLocally": True, "apiRequired": False, "clips": {}}
    if manifest_path.exists():
        previous = json.loads(manifest_path.read_text(encoding="utf-8"))
        if previous.get("profile") == PROFILE:
            manifest = previous
    for index, text in enumerate(texts, 1):
        name = "clips/" + hashlib.sha256((PROFILE + "\0" + text).encode()).hexdigest()[:24] + ".mp3"
        target = directory / name
        reused = target.exists() and target.stat().st_size > 100
        if not reused:
            buffer = io.BytesIO()
            with wave.open(buffer, "wb") as output:
                voice.synthesize_wav(text, output)
            with wave.open(io.BytesIO(buffer.getvalue()), "rb") as recording:
                encoder = lameenc.Encoder()
                encoder.set_bit_rate(96)
                encoder.set_in_sample_rate(recording.getframerate())
                encoder.set_channels(recording.getnchannels())
                encoder.set_quality(2)
                data = encoder.encode(recording.readframes(recording.getnframes())) + encoder.flush()
            temporary = target.with_suffix(".mp3.tmp")
            temporary.write_bytes(data)
            temporary.replace(target)
        manifest["clips"][text] = name
        write_json(manifest_path, manifest)
        print(f"Audio {index}/{len(texts)} · {'reused' if reused else 'generated locally'}", flush=True)
    worker_path = ROOT / "dist/sw.js"
    revision = hashlib.sha256(manifest_path.read_bytes()).hexdigest()[:8]
    worker = worker_path.read_text(encoding="utf-8")
    worker = re.sub(r"const CACHE='rumbo-shell-v\d+(?:-[a-f0-9]{8})?';", f"const CACHE='rumbo-shell-v3-{revision}';", worker)
    worker_path.write_text(worker, encoding="utf-8")
    print(json.dumps({"available": len(manifest["clips"]), "provider": "Piper", "apiCalls": 0}))


if __name__ == "__main__":
    try:
        main()
    except Exception as error:
        print(f"Local audio generation stopped: {error}", file=sys.stderr)
        sys.exit(1)

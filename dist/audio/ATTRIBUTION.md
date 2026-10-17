# Rumbo's included Mexican Spanish voice

These 155 synthetic recordings were generated locally with Piper 1.8.0 using
`es_MX-claude-high`. No paid speech API is needed to create or play this pack.
The recordings are AI-generated, rather than recordings of a person reading
Rumbo's lessons. They are a learning aid; pronunciation feedback is welcome.

Voice source: [Rhasspy Piper voices — Claude, Mexican Spanish](https://huggingface.co/rhasspy/piper-voices/tree/c10ece1aade47bb51c153c893d14e5bf8e5b7117/es/es_MX/claude/high).

The voice's original model card is preserved in `MODEL_CARD`. It credits
[HirCoir/Piper-TTS-Spanish](https://huggingface.co/spaces/HirCoir/Piper-TTS-Spanish)
as the dataset/training source and identifies the dataset license as Apache 2.0.
A copy of that license is included in `LICENSE-APACHE-2.0.txt`. The Piper voices
collection's repository metadata separately lists MIT. Model weights are not
distributed in Rumbo; the local generator downloads the pinned upstream model.

The generator verifies these upstream SHA-256 checksums:

- ONNX: `3ef40a71ea63852cd8ab7e6fa7d2ecdcfa67a0b47c9c48e3f10e02ee02083ea0`
- Config: `1afc81f703c0e4cb3b4d7c0dca096b8b54a98806807f0170cf5eb5557723c12d`

Generation uses the model's default synthesis settings and encodes mono MP3 at
96 kbit/s with LAME through `lameenc`. The complete pack is about 3.2 MB.

[Piper](https://github.com/OHF-Voice/piper1-gpl) is a separate GPL-3.0-or-later
generation tool. [lameenc](https://github.com/chrisstaite/lameenc) is LGPL-3.0.
Neither engine nor its executable dependencies are shipped to the browser.
Their upstream licenses apply to those tools.

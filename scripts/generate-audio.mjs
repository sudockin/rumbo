import {createHash} from 'node:crypto';
import {readFile,writeFile,mkdir,stat,rename} from 'node:fs/promises';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {resolve,join} from 'node:path';
import {speechText} from '../dist/voice.mjs';
import {speechCorpus} from './speech-corpus.mjs';
export {speechCorpus} from './speech-corpus.mjs';
export const AUDIO_MODEL='gpt-4o-mini-tts';
export const AUDIO_VOICE='marin';
export const AUDIO_INSTRUCTIONS='Speak only the provided Spanish text, exactly as written. Use a natural, contemporary, neutral central Mexican Spanish accent, like a friendly adult in Mexico City having an everyday conversation. Use Mexican seseo and natural Mexican intonation. Keep vowels clear, connect words naturally, and use a relaxed conversational pace with brief meaningful pauses. Sound warm and human, not theatrical, overly cheerful, robotic, or like a language textbook. Do not explain, translate, add words, or read punctuation aloud.';
export function speechRequest(text){return {model:AUDIO_MODEL,voice:AUDIO_VOICE,input:text,instructions:AUDIO_INSTRUCTIONS,response_format:'mp3',speed:1};}
const profile=createHash('sha256').update(JSON.stringify({model:AUDIO_MODEL,voice:AUDIO_VOICE,instructions:AUDIO_INSTRUCTIONS})).digest('hex');
export function clipName(text){return 'clips/'+createHash('sha256').update(profile+'\0'+speechText(text)).digest('hex').slice(0,24)+'.mp3';}
const root=fileURLToPath(new URL('../',import.meta.url));
async function apiKey(){
 if(process.env.OPENAI_API_KEY?.trim())return process.env.OPENAI_API_KEY.trim();
 try{const source=await readFile(join(root,'.env.local'),'utf8');const match=source.match(/^\s*(?:export\s+)?OPENAI_API_KEY\s*=\s*(.*?)\s*$/m);return match?.[1]?.replace(/^(["'])(.*)\1$/,'$2')||'';}catch{return '';}
}
async function main(){
 const args=process.argv.slice(2);if(args.some(a=>!['--plan','--sample','--all'].includes(a))||args.length!==1)throw new Error('Choose --plan (no API calls), --sample (3 clips), or --all.');
 const corpus=speechCorpus();const words=corpus.join(' ').split(/\s+/).length;
 if(args[0]==='--plan'){console.log(JSON.stringify({clips:corpus.length,words,characters:corpus.join('').length,model:AUDIO_MODEL,voice:AUDIO_VOICE,locale:'es-MX',liveRequests:0},null,2));return;}
 const key=await apiKey();if(!key)throw new Error('Complete secure OpenAI API key setup before generating audio.');
 const texts=args[0]==='--sample'?['Hola. ¿Me trae la cuenta, por favor?','¿Puede repetir, por favor?','Hablo un poco de español.']:corpus;
 const dir=resolve(root,'dist/audio');await mkdir(join(dir,'clips'),{recursive:true});
 let manifest={version:1,locale:'es-MX',provider:'OpenAI',model:AUDIO_MODEL,voice:AUDIO_VOICE,profile,aiGenerated:true,clips:{}};
 try{const previous=JSON.parse(await readFile(join(dir,'manifest.json'),'utf8'));if(previous.profile===profile)manifest=previous;}catch{}
 const save=async()=>{await writeFile(join(dir,'manifest.json.tmp'),JSON.stringify(manifest,null,2)+'\n');await rename(join(dir,'manifest.json.tmp'),join(dir,'manifest.json'));};
 let generated=0;
 for(let i=0;i<texts.length;i++){
  const text=speechText(texts[i]),name=clipName(text),file=join(dir,name);
  let exists=false;try{exists=(await stat(file)).size>100;}catch{}
  if(!exists){
   const response=await fetch('https://api.openai.com/v1/audio/speech',{method:'POST',headers:{Authorization:'Bearer '+key,'Content-Type':'application/json'},body:JSON.stringify(speechRequest(text)),signal:AbortSignal.timeout(90000)});
   if(!response.ok){let code='';try{const error=await response.json();if(/^[a-zA-Z0-9_-]+$/.test(error.error?.code||''))code=' ('+error.error.code+')';}catch{}await save();throw new Error('OpenAI speech generation stopped: HTTP '+response.status+code+'. Completed clips were kept.');}
   const type=response.headers.get('content-type')||'';if(!/audio\//i.test(type))throw new Error('The speech service did not return an audio file.');
   const bytes=Buffer.from(await response.arrayBuffer());if(bytes.length<100)throw new Error('The returned audio file was empty.');
   await writeFile(file+'.tmp',bytes);await rename(file+'.tmp',file);generated++;
  }
  manifest.clips[text]=name;await save();console.log(`Audio ${i+1}/${texts.length}${exists?' · reused':' · generated'}`);
 }
 const swPath=join(root,'dist/sw.js');let worker=await readFile(swPath,'utf8');const revision=createHash('sha256').update(JSON.stringify(manifest)).digest('hex').slice(0,8);worker=worker.replace(/const CACHE='rumbo-shell-v\d+(?:-[a-f0-9]{8})?';/,`const CACHE='rumbo-shell-v3-${revision}';`);await writeFile(swPath,worker);
 console.log(JSON.stringify({generated,available:Object.keys(manifest.clips).length,locale:manifest.locale,voice:manifest.voice}));
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href)main().catch(error=>{console.error(error.message);process.exitCode=1;});

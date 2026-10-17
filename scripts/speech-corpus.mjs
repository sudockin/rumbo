import {pathToFileURL} from 'node:url';
import {resolve} from 'node:path';
import {lessons,phrases,scenarios,pronunciation} from '../dist/content.mjs';
import {speechText} from '../dist/voice.mjs';

export function speechCorpus(){return [...new Set([
 ...phrases.map(p=>p.es),...lessons.flatMap(l=>l.examples.map(e=>e.es)),...scenarios.flatMap(s=>s.turns.map(t=>t.es)),...pronunciation.map(p=>p.es),'Hola. ¿Me trae la cuenta, por favor?'
].map(speechText))];}

if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href){
 const texts=speechCorpus();
 console.log(JSON.stringify(process.argv.includes('--plan')?{clips:texts.length,words:texts.join(' ').split(/\s+/).length,locale:'es-MX',provider:'Piper · local generation',apiCalls:0}:texts,null,2));
}

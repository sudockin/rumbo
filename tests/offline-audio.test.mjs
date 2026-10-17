import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
import {runInNewContext} from 'node:vm';
import {speechCorpus} from '../scripts/speech-corpus.mjs';
import {recordingFor} from '../dist/voice.mjs';

const root=new URL('../dist/',import.meta.url);
const manifest=JSON.parse(await readFile(new URL('audio/manifest.json',root),'utf8'));

test('the included free pack covers every listening phrase with a real MP3',async()=>{
 assert.equal(manifest.locale,'es-MX');
 assert.equal(manifest.generatedLocally,true);
 assert.equal(manifest.apiRequired,false);
 assert.equal(Object.keys(manifest.clips).length,speechCorpus().length);
 for(const text of speechCorpus()){
  const path=recordingFor(manifest,text);assert.ok(path,`Missing recording: ${text}`);
  const file=new URL(path,root),bytes=await readFile(file);
  assert.ok((await stat(file)).size>100);
  assert.ok(bytes[0]===0xff&&(bytes[1]&0xe0)===0xe0,`Missing MP3 frame header: ${text}`);
 }
});

async function offlineWorker(){
 const events={},stored=new Map(),added=[];
 const base='https://rumbo.example/rumbo/';
 const key=request=>new URL(typeof request==='string'?request:request.url,base).href;
 const cache={
  async addAll(paths){for(const path of paths){added.push(path);const url=new URL(path,base),relative=url.pathname.replace('/rumbo/','');const body=relative==='audio/manifest.json'?JSON.stringify(manifest):relative.startsWith('audio/clips/')?await readFile(new URL(relative,root)):'app';stored.set(url.href,new Response(body,{headers:{'Content-Type':relative.endsWith('.mp3')?'audio/mpeg':'text/plain'}}));}},
  async match(request){return stored.get(key(request))?.clone();},
  async put(request,response){stored.set(key(request),response);}
 };
 runInNewContext(await readFile(new URL('sw.js',root),'utf8'),{
  URL,Response,Headers,
  self:{location:{origin:'https://rumbo.example'},addEventListener:(name,handler)=>{events[name]=handler;},skipWaiting:async()=>{},clients:{claim:async()=>{}}},
  caches:{open:async()=>cache,match:request=>cache.match(request),keys:async()=>[],delete:async()=>true},
  fetch:async()=>{throw new Error('Offline');}
 });
 let installed;events.install({waitUntil:promise=>{installed=promise;}});await installed;
 return {added,async request(path,headers={}){let response;events.fetch({request:new Request(new URL(path,base),{headers}),respondWith:promise=>{response=promise;}});return response;}};
}

test('installing offline files stores the complete included audio pack',async()=>{
 const worker=await offlineWorker();
 assert.equal(worker.added.filter(path=>path.endsWith('.mp3')).length,speechCorpus().length);
 const response=await worker.request('audio/'+Object.values(manifest.clips)[0]);
 assert.equal(response.status,200);assert.ok((await response.arrayBuffer()).byteLength>100);
});

test('cached recordings support Safari byte ranges without a network',async()=>{
 const worker=await offlineWorker(),path='audio/'+Object.values(manifest.clips)[0];
 const complete=await (await worker.request(path)).arrayBuffer();
 for(const [range,start,end] of [['bytes=0-1',0,1],['bytes=10-19',10,19],['bytes=-10',complete.byteLength-10,complete.byteLength-1]]){
  const response=await worker.request(path,{range});
  assert.equal(response.status,206);
  assert.equal(response.headers.get('Content-Range'),`bytes ${start}-${end}/${complete.byteLength}`);
  assert.deepEqual(new Uint8Array(await response.arrayBuffer()),new Uint8Array(complete.slice(start,end+1)));
 }
 const invalid=await worker.request(path,{range:'bytes=999999999-'});
 assert.equal(invalid.status,416);
});

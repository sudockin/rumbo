import test from 'node:test';
import assert from 'node:assert/strict';
import {chooseVoice,rankedVoices,recordingFor,createSpeechPlayer} from '../dist/voice.mjs';
import {initialState,validateState} from '../dist/core.mjs';
import {speechCorpus,speechRequest,clipName} from '../scripts/generate-audio.mjs';
const v=(name,lang='es-MX',voiceURI=name)=>({name,lang,voiceURI});
test('automatic voice choice ranks quality within the Mexican locale',()=>{
 const voices=[v('Eddy (Spanish (Mexico))'),v('Paulina'),v('Paulina (Enhanced)'),v('Paulina (Premium)'),v('Neural Spanish','es-ES')];
 assert.equal(chooseVoice(voices).name,'Paulina (Premium)');
 assert.equal(chooseVoice(voices,'Paulina').name,'Paulina');
 assert.equal(chooseVoice([v('Spain','es-ES')]),null);
 assert.equal(chooseVoice([v('Jorge','es_MX')]).name,'Jorge');
 assert.equal(rankedVoices(voices).at(-1).lang,'es-ES');
});
test('natural defaults migrate the old automatic slowdown and retain chosen speeds',()=>{
 assert.equal(initialState().settings.rate,1);
 const old=initialState();delete old.settings.speechVersion;old.settings.rate=.85;
 assert.equal(validateState(old).settings.rate,1);
 old.settings.voice='custom';assert.equal(validateState(old).settings.rate,.85);
 old.settings.voice='';old.settings.rate=.75;assert.equal(validateState(old).settings.rate,.75);
});
test('recordings use exact Spanish and only local safe clip paths',()=>{
 const text='¿Puede repetir, por favor?',path=clipName(text);const manifest={version:1,locale:'es-MX',clips:{[text]:path}};
 assert.equal(recordingFor(manifest,'  '+text+'  '),'./audio/'+path);
 assert.equal(recordingFor(manifest,'Different phrase'),null);
 for(const bad of ['https://outside.example/clip.mp3','../secret','clips/../../secret'])assert.equal(recordingFor({...manifest,clips:{[text]:bad}},text),null);
});
function environment(){
 const played=[],spoken=[];let canceled=0;class AudioMock{constructor(url){this.url=url;played.push(this);}play(){return Promise.resolve();}pause(){this.paused=true;}removeAttribute(){this.removed=true;}load(){}}
 class Utterance{constructor(text){this.text=text;}}
 const synth={speak:u=>spoken.push(u),cancel:()=>canceled++};const errors=[],fallbacks=[];
 const player=createSpeechPlayer({synth,Utterance,AudioClass:AudioMock,onError:x=>errors.push(x),onFallback:()=>fallbacks.push(true)});
 return {player,played,spoken,errors,fallbacks};
}
test('recordings take precedence and slower playback preserves pitch',()=>{
 const e=environment();e.player.play('Hola',{clip:'./audio/test.mp3',rate:.8});
 assert.equal(e.played.length,1);assert.equal(e.spoken.length,0);assert.equal(e.played[0].playbackRate,.8);assert.equal(e.played[0].preservesPitch,true);
 e.player.stop();assert.equal(e.played[0].paused,true);
});
test('failed audio falls back once and canceled audio cannot start later',()=>{
 const e=environment(),voice=v('Paulina');e.player.play('Hola',{clip:'./audio/test.mp3',voice});const first=e.played[0],fail=first.onerror;
 fail();fail();assert.equal(e.spoken.length,1);assert.equal(e.fallbacks.length,1);
 e.player.play('Adiós',{clip:'./audio/other.mp3',voice});const stale=e.played[1].onerror;e.player.stop();stale();assert.equal(e.spoken.length,1);
});
test('device speech uses the chosen locale and reports unavailable voices',()=>{
 const e=environment();e.player.play('Hola',{voice:v('Paulina'),rate:1});assert.equal(e.spoken[0].lang,'es-MX');assert.equal(e.spoken[0].rate,1);
 e.player.play('Hola');assert.equal(e.errors.length,1);
});
test('audio generation corpus covers lessons and dialogue and requests Mexican intonation',()=>{
 const corpus=speechCorpus();assert.ok(corpus.length>100);assert.equal(new Set(corpus).size,corpus.length);assert.ok(corpus.includes('La cuenta, por favor.'));
 const request=speechRequest('Hola.');assert.equal(request.input,'Hola.');assert.equal(request.voice,'marin');assert.match(request.instructions,/Mexican/);assert.equal(request.response_format,'mp3');
});

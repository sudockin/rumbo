export const NATURAL_RATE = 1;
export const SLOW_RATE = .8;
export const SPEECH_VERSION = 2;
const characterNames = /\b(Eddy|Flo|Grandma|Grandpa|Reed|Rocko|Sandy|Shelley)\b/i;
export function isMexicanVoice(voice) { return /^es-MX(?:-|$)/i.test(String(voice?.lang||'').replace(/_/g,'-')); }
export function spanishVoices(voices=[]) { return voices.filter(v=>/^es(?:-|_|$)/i.test(v.lang||'')); }
export function voiceQuality(voice) {
 const text=`${voice.name||''} ${voice.voiceURI||''}`;
 if(characterNames.test(text))return 'Character voice';
 if(/premium/i.test(text))return 'Premium';
 if(/enhanced/i.test(text))return 'Enhanced';
 if(/neural|natural|online/i.test(text))return 'Neural';
 if(/siri/i.test(text))return 'Siri';
 return 'Device voice';
}
export function rankedVoices(voices=[]) {
 const rank=v=>(isMexicanVoice(v)?1000:0)+({'Premium':120,'Enhanced':100,'Neural':90,'Siri':80,'Device voice':10,'Character voice':-300}[voiceQuality(v)])+(/Paulina|Dalia|Jorge|Sabina/i.test(v.name||'')?5:0);
 return spanishVoices(voices).sort((a,b)=>rank(b)-rank(a)||a.name.localeCompare(b.name));
}
export function chooseVoice(voices=[],saved='') {
 const available=spanishVoices(voices);
 return available.find(v=>v.voiceURI===saved)||rankedVoices(available).find(isMexicanVoice)||null;
}
export function speechText(text) { return String(text).normalize('NFC').trim().replace(/\s+/g,' '); }
export function recordingFor(manifest,text) {
 const path=manifest?.version===1&&manifest.locale==='es-MX'?manifest.clips?.[speechText(text)]:null;
 return typeof path==='string'&&/^clips\/[a-f0-9]{24}\.mp3$/.test(path)?`./audio/${path}`:null;
}
// Audio and speech share one lifetime, so navigating or starting a new phrase
// cannot leave an older recording playing or trigger a stale fallback.
export function createSpeechPlayer({synth,Utterance,AudioClass,onError=()=>{},onFallback=()=>{}}) {
 let serial=0,audio=null,notify=null;
 function stop(){serial++;notify?.(false);notify=null;if(audio){audio.onended=null;audio.onerror=null;audio.pause();audio.removeAttribute('src');audio.load();audio=null;}synth?.cancel();}
 function play(text,{voice=null,rate=NATURAL_RATE,clip=null,onState=()=>{}}={}) {
  stop();const token=serial;notify=onState;let failed=false;
  const finish=()=>{if(token!==serial)return;notify?.(false);notify=null;};
  const native=()=>{
   if(token!==serial)return;
   if(!synth||!Utterance||!voice){finish();onError('Choose or download a Spanish (Mexico) voice in Settings & audio.');return;}
   const u=new Utterance(text);u.voice=voice;u.lang=voice.lang;u.rate=rate;u.pitch=1;u.onend=finish;
   u.onerror=e=>{if(token!==serial)return;finish();if(!['interrupted','canceled'].includes(e.error))onError('The device voice could not play. Check your audio and installed voices.');};
   onState(true);try{synth.speak(u);}catch{finish();onError('The device voice could not start. Try another voice.');}
  };
  if(!clip||!AudioClass){native();return;}
  const a=new AudioClass(clip);audio=a;a.playbackRate=rate;a.preservesPitch=true;a.webkitPreservesPitch=true;
  const fallback=()=>{if(token!==serial||failed)return;failed=true;a.onended=null;a.onerror=null;a.pause();audio=null;onFallback();native();};
  a.onended=finish;a.onerror=fallback;onState(true);
  try{const promise=a.play();promise?.catch(fallback);}catch{fallback();}
 }
 return {play,stop};
}

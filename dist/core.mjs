import {NATURAL_RATE,SPEECH_VERSION} from './voice.mjs';
export const STORAGE_KEY = 'rumbo-progress-v1';
export function dayKey(date = new Date()) { return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`; }
export function initialState(){return {version:1,settings:{trip:'2027-02-01',goal:15,rate:NATURAL_RATE,speechVersion:SPEECH_VERSION,audioSource:'recorded',voice:''},completed:{},cards:{},activity:{},speaking:0,scenarios:[],updatedAt:Date.now()};}
export function validDay(value){if(typeof value!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(value))return false;const d=new Date(value+'T12:00:00');return !isNaN(d)&&dayKey(d)===value;}
export function validateState(raw){
 if(!raw||raw.version!==1||typeof raw!=='object')throw new Error('This is not a Rumbo backup.');
 const s=initialState(); const settings=raw.settings||{};
 if(validDay(settings.trip))s.settings.trip=settings.trip;
 s.settings.goal=[5,10,15,20,30].includes(Number(settings.goal))?Number(settings.goal):15;
 s.settings.rate=Number.isFinite(Number(settings.rate))?Math.min(1.1,Math.max(0.6,Number(settings.rate))):NATURAL_RATE;
 s.settings.voice=typeof settings.voice==='string'?settings.voice.slice(0,200):'';
 if(settings.speechVersion!==SPEECH_VERSION&&!s.settings.voice&&s.settings.rate===.85)s.settings.rate=NATURAL_RATE;
 s.settings.audioSource=settings.audioSource==='device'?'device':'recorded';
 for(const [id,v] of Object.entries(raw.completed||{}))if(id.length<100&&v&&Number.isFinite(v.score)&&Number.isFinite(v.total)&&v.total>0)s.completed[id]={score:Math.max(0,Math.min(v.total,v.score)),total:v.total,date:validDay(v.date)?v.date:dayKey()};
 for(const [id,v] of Object.entries(raw.cards||{}))if(id.length<100&&v&&Number.isFinite(v.due)&&Number.isFinite(v.interval)&&Number.isFinite(v.reps))s.cards[id]={due:Math.max(0,v.due),interval:Math.max(0,Math.min(3650,v.interval)),reps:Math.max(0,Math.min(10000,v.reps)),ease:Number.isFinite(v.ease)?Math.max(1.3,Math.min(3,v.ease)):2.5};
 for(const [date,v] of Object.entries(raw.activity||{}))if(validDay(date)&&v&&Number.isFinite(v.points)&&Number.isFinite(v.minutes))s.activity[date]={points:Math.max(0,Math.min(100000,v.points)),minutes:Math.max(0,Math.min(1440,v.minutes)),reviews:Number.isFinite(v.reviews)?Math.max(0,Math.min(10000,v.reviews)):0};
 s.speaking=Number.isFinite(raw.speaking)?Math.max(0,Math.min(100000,raw.speaking)):0;
 s.scenarios=Array.isArray(raw.scenarios)?[...new Set(raw.scenarios.filter(v=>typeof v==='string'&&v.length<100))]:[];
 return s;
}
export function schedule(previous, grade, now=Date.now()){
 if(!['again','hard','good','easy'].includes(grade))throw new Error('Unknown review rating');
 const c=previous||{interval:0,reps:0,ease:2.5};
 let {interval,reps,ease}=c; ease=ease||2.5;
 if(grade==='again')return {interval:0,reps:0,ease:Math.max(1.3,ease-.2),due:now+60000};
 if(grade==='hard'){interval=interval?Math.max(1,Math.round(interval*1.2)):1;ease=Math.max(1.3,ease-.15);}
 if(grade==='good')interval=reps===0?1:reps===1?3:Math.max(1,Math.round(interval*ease));
 if(grade==='easy'){interval=interval?Math.max(3,Math.round(interval*ease*1.3)):3;ease=Math.min(3,ease+.15);}
 return {interval,reps:reps+1,ease,due:now+interval*86400000};
}
export function dueCards(phrases,state,now=Date.now()){return phrases.filter(p=>!state.cards[p.id]||state.cards[p.id].due<=now).sort((a,b)=>{const x=state.cards[a.id],y=state.cards[b.id];return x&&y?x.due-y.due:x?-1:y?1:0;});}
export function streak(activity,date=new Date()){
 let d=new Date(date.getFullYear(),date.getMonth(),date.getDate(),12); let count=0;
 if(!activity[dayKey(d)]?.points)d.setDate(d.getDate()-1);
 while(activity[dayKey(d)]?.points){count++;d.setDate(d.getDate()-1);}
 return count;
}
export function daysUntil(trip,date=new Date()){
 const [y,m,d]=trip.split('-').map(Number);return Math.max(0,Math.ceil((Date.UTC(y,m-1,d)-Date.UTC(date.getFullYear(),date.getMonth(),date.getDate()))/86400000));
}
export function normalize(text){return String(text).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9\s]/g,' ').replace(/\s+/g,' ').trim();}
export function compareSpeech(expected,actual){
 const a=normalize(expected).split(' ').filter(Boolean),b=normalize(actual).split(' ').filter(Boolean);
 const grid=Array.from({length:a.length+1},()=>Array(b.length+1).fill(0));
 for(let i=0;i<=a.length;i++)grid[i][0]=i;for(let j=0;j<=b.length;j++)grid[0][j]=j;
 for(let i=1;i<=a.length;i++)for(let j=1;j<=b.length;j++)grid[i][j]=Math.min(grid[i-1][j]+1,grid[i][j-1]+1,grid[i-1][j-1]+(a[i-1]===b[j-1]?0:1));
 return Math.max(0,Math.round((1-grid[a.length][b.length]/Math.max(1,a.length,b.length))*100));
}
export function logActivity(state,points,minutes,review=false){const key=dayKey();const a=state.activity[key]||{points:0,minutes:0,reviews:0};a.points+=points;a.minutes+=minutes;if(review)a.reviews++;state.activity[key]=a;state.updatedAt=Date.now();}

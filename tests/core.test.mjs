import test from 'node:test';
import assert from 'node:assert/strict';
import {dayKey,initialState,validateState,schedule,dueCards,streak,daysUntil,compareSpeech,validDay} from '../dist/core.mjs';
import {lessons,phrases,scenarios,pronunciation} from '../dist/content.mjs';

test('review ratings produce persisted due dates and intervals',()=>{
 const now=1000000;let c=schedule(null,'again',now);assert.equal(c.due,now+60000);assert.equal(c.reps,0);
 c=schedule(null,'good',now);assert.equal(c.interval,1);assert.equal(c.due,now+86400000);
 c=schedule(c,'good',now);assert.equal(c.interval,3);c=schedule(c,'good',now);assert.equal(c.interval,8);
 assert.equal(schedule(null,'easy',now).interval,3);assert.equal(schedule(null,'hard',now).interval,1);
 assert.ok(schedule({...c,ease:1.3},'again',now).ease>=1.3);
 assert.throws(()=>schedule(c,'unknown',now));
});
test('due queue prioritizes due reviewed cards before new cards',()=>{
 const s=initialState();s.cards[phrases[1].id]=schedule(null,'again',1000);
 s.cards[phrases[2].id]=schedule(null,'easy',1000);
 const due=dueCards(phrases,s,61000);assert.equal(due[0].id,phrases[1].id);assert.ok(!due.some(p=>p.id===phrases[2].id));
});
test('streak uses local calendar dates and preserves yesterday before practice today',()=>{
 const activity={'2026-10-15':{points:5},'2026-10-16':{points:5}};
 assert.equal(streak(activity,new Date(2026,9,17,8)),2);
 activity['2026-10-17']={points:10};assert.equal(streak(activity,new Date(2026,9,17,8)),3);
 assert.equal(streak(activity,new Date(2026,9,19,8)),0);
 assert.equal(dayKey(new Date(2026,9,17,23)), '2026-10-17');
});
test('trip countdown and dates handle invalid or elapsed dates',()=>{
 assert.equal(daysUntil('2027-02-01',new Date(2026,9,17)),107);
 assert.equal(daysUntil('2026-10-01',new Date(2026,9,17)),0);
 assert.ok(!validDay('2027-02-30'));assert.ok(validDay('2028-02-29'));
});
test('word comparison ignores accents and punctuation, penalizes omissions',()=>{
 assert.equal(compareSpeech('¿Cómo se dice esto?', 'como se dice esto'),100);
 assert.ok(compareSpeech('La cuenta, por favor.', 'la cuenta')<80);
 assert.equal(compareSpeech('Buenos días',''),0);
});
test('backup validation clamps settings and discards invalid records',()=>{
 const s=initialState();s.settings.rate=100;s.settings.trip='bad';s.cards.a={due:'bad'};s.activity.bad={points:10,minutes:1};
 const clean=validateState(JSON.parse(JSON.stringify(s)));assert.equal(clean.settings.rate,1.1);assert.equal(clean.settings.trip,'2027-02-01');assert.deepEqual(clean.cards,{});assert.deepEqual(clean.activity,{});
 assert.throws(()=>validateState({version:8}));
 const valid=initialState();valid.cards[phrases[0].id]=schedule(null,'good');valid.completed[lessons[0].id]={score:3,total:4,date:'2026-10-17'};
 assert.deepEqual(validateState(JSON.parse(JSON.stringify(valid))).completed,valid.completed);
});
test('curriculum has unique cards, answerable questions, and alternating role plays',()=>{
 assert.equal(lessons.length,12);assert.ok(phrases.length>=72);assert.equal(scenarios.length,6);assert.ok(pronunciation.length>=6);
 for(const list of [lessons,phrases,scenarios])assert.equal(new Set(list.map(x=>x.id)).size,list.length);
 for(const l of lessons){assert.ok(l.explanation.length>=2);assert.ok(l.examples.length>=3);assert.ok(l.questions.length>=3);for(const q of l.questions){assert.ok(q.answer>=0&&q.answer<q.options.length);assert.equal(new Set(q.options).size,q.options.length);assert.ok(q.explanation.length>10);}}
 for(const s of scenarios){assert.equal(s.turns.length,6);s.turns.forEach((t,i)=>{assert.equal(t.speaker,i%2?'you':'local');assert.ok(t.es&&t.en);});}
});

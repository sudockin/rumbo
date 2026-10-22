import test from 'node:test';
import assert from 'node:assert/strict';
import {ranks,rankFor,badges,unlockBadges} from '../dist/rewards.mjs';
import {initialState,validateState,dayKey} from '../dist/core.mjs';
import {words} from '../dist/words.mjs';
import {lessons} from '../dist/content.mjs';

test('ranks climb in order and the top rank is complete',()=>{
 for(let i=1;i<ranks.length;i++)assert.ok(ranks[i].min>ranks[i-1].min);
 assert.equal(rankFor(0).index,0);
 assert.equal(rankFor(150).en,'Friend of tacos');
 assert.equal(rankFor(99999).next,null);
 assert.ok(Math.abs(rankFor(200).progress-.5)<1e-9);
});

test('badges unlock once and are kept through validation',()=>{
 const s=initialState();s.completed[lessons[0].id]={score:4,total:4,date:dayKey()};
 assert.deepEqual(unlockBadges(s,'2026-10-22').map(b=>b.id),['first-lesson']);
 assert.equal(unlockBadges(s,'2026-10-23').length,0);
 assert.equal(validateState(JSON.parse(JSON.stringify(s))).badges['first-lesson'],'2026-10-22');
 assert.equal(new Set(badges.map(b=>b.id)).size,badges.length);
});

test('progress saved before rewards existed still loads, with the default name',()=>{
 const old={version:1,settings:{trip:'2027-02-01',goal:15},completed:{[lessons[0].id]:{score:4,total:4,date:'2026-10-22'}},cards:{},activity:{'2026-10-22':{points:30,minutes:6}}};
 const s=validateState(old);
 assert.equal(s.settings.name,'Paminos');
 assert.deepEqual(s.badges,{});
 assert.ok(s.completed[lessons[0].id]);
 assert.equal(s.settings.trip,'2027-02-01');
});

test('every word of the day has Spanish, English and a story',()=>{
 for(const w of words)for(const k of ['es','en','story'])assert.ok(w[k]?.trim(),k);
});

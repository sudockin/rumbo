import test from 'node:test';
import assert from 'node:assert/strict';
import {STORAGE_KEY,PROFILES_KEY,profileKey,readProfiles,writeProfiles,findProfile,addProfile,removeProfile,initialState,validateState} from '../dist/core.mjs';

function memory(seed={}){const data=new Map(Object.entries(seed));return {getItem:k=>data.has(k)?data.get(k):null,setItem:(k,v)=>data.set(k,String(v)),removeItem:k=>data.delete(k),data};}

test('progress saved before profiles becomes the first profile, without moving',()=>{
 const old=initialState();old.settings.name='Sana';old.completed['hello-introductions']={score:4,total:4,date:'2026-10-22'};
 const store=memory({[STORAGE_KEY]:JSON.stringify(old)});
 const p=readProfiles(store);
 assert.deepEqual(p.list,[{id:'main',name:'Sana'}]);
 assert.equal(profileKey('main'),STORAGE_KEY);
 assert.ok(validateState(JSON.parse(store.getItem(profileKey('main')))).completed['hello-introductions']);
});

test('a new device starts with no profiles, and the first one uses the main key',()=>{
 const store=memory(),p=readProfiles(store);
 assert.equal(p.list.length,0);
 const id=addProfile(p,'Sana',store);
 assert.equal(id,'main');
 assert.equal(validateState(JSON.parse(store.getItem(STORAGE_KEY))).settings.name,'Sana');
});

test('names log in case- and accent-insensitively and stay unique',()=>{
 const store=memory(),p=readProfiles(store);addProfile(p,'Sana',store);
 const id=addProfile(p,'Paminos',store,s=>{});
 assert.notEqual(id,'main');
 assert.equal(findProfile(p,'  paminos ').id,id);
 assert.equal(findProfile(p,'SANA').id,'main');
 assert.equal(findProfile(p,'Maria'),null);
 assert.throws(()=>addProfile(p,'pamínos',store),/already/);
 assert.throws(()=>addProfile(p,'   ',store),/name/);
});

test('the profile list survives a reload, and removing one deletes only its progress',()=>{
 const store=memory(),p=readProfiles(store);addProfile(p,'Sana',store);const id=addProfile(p,'Paminos',store);
 p.active=id;writeProfiles(store,p);
 const again=readProfiles(store);
 assert.deepEqual(again.list.map(x=>x.name),['Sana','Paminos']);
 assert.equal(again.active,id);
 removeProfile(again,id,store);
 assert.equal(store.getItem(profileKey(id)),null);
 assert.ok(store.getItem(STORAGE_KEY));
 assert.equal(again.active,null);
 assert.ok(PROFILES_KEY!==STORAGE_KEY);
});

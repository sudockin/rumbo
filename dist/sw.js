const CACHE='rumbo-shell-v3-43bb9ba6';
const ASSETS=['./','./index.html','./styles.css','./app.mjs','./core.mjs','./voice.mjs','./audio/manifest.json','./content.mjs','./icon.svg','./icon-192.png','./icon-512.png','./icon-maskable.png','./manifest.webmanifest'];
async function installPack(){
 const cache=await caches.open(CACHE);
 await cache.addAll(ASSETS);
 const response=await cache.match('./audio/manifest.json');
 const pack=await response.json();
 if(pack.version===1&&pack.locale==='es-MX'&&pack.clips&&typeof pack.clips==='object'){
  const clips=[...new Set(Object.values(pack.clips))].filter(path=>/^clips\/[a-f0-9]{24}\.mp3$/.test(path)).map(path=>'./audio/'+path);
  await cache.addAll(clips);
 }
 await self.skipWaiting();
}
self.addEventListener('install',event=>event.waitUntil(installPack()));
self.addEventListener('activate',event=>{
 event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('rumbo-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
function audioRange(request,response){
 const range=request.headers.get('range');
 if(!range)return response;
 const match=/^bytes=(\d*)-(\d*)$/.exec(range);
 if(!match||(!match[1]&&!match[2]))return response;
 return response.arrayBuffer().then(buffer=>{
  const length=buffer.byteLength;
  const start=match[1]?Number(match[1]):Math.max(0,length-Number(match[2]));
  const end=match[1]?(match[2]?Math.min(Number(match[2]),length-1):length-1):length-1;
  if(start>=length||start>end)return new Response(null,{status:416,headers:{'Content-Range':`bytes */${length}`}});
  const headers=new Headers(response.headers);
  headers.set('Content-Range',`bytes ${start}-${end}/${length}`);
  headers.set('Content-Length',String(end-start+1));
  headers.set('Accept-Ranges','bytes');
  return new Response(buffer.slice(start,end+1),{status:206,headers});
 });
}
self.addEventListener('fetch',event=>{
 const request=event.request,url=new URL(request.url);
 if(request.method!=='GET'||url.origin!==self.location.origin)return;
 const audio=/\/audio\/clips\/[a-f0-9]{24}\.mp3$/.test(url.pathname);
 event.respondWith((async()=>{
  // Cache the complete recording so Safari can request byte ranges offline.
  if(audio){const cached=await caches.match(url.href);if(cached)return audioRange(request,cached);}
  try{
   const response=await fetch(request);
   if(response.ok&&response.status===200){try{const cache=await caches.open(CACHE);await cache.put(request,response.clone());}catch{}}
   return response;
  }catch{
   const cached=await caches.match(request);if(cached)return cached;
   if(request.mode==='navigate')return caches.match('./index.html');
   return Response.error();
  }
 })());
});

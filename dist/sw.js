const CACHE='rumbo-shell-v2';
const ASSETS=['./','./index.html','./styles.css','./app.mjs','./core.mjs','./voice.mjs','./audio/manifest.json','./content.mjs','./icon.svg','./icon-192.png','./icon-512.png','./icon-maskable.png','./manifest.webmanifest'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('rumbo-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;
 event.respondWith(fetch(event.request).then(async response=>{if(response.ok){try{const cache=await caches.open(CACHE);await cache.put(event.request,response.clone());}catch{}}return response;}).catch(async()=>{const cached=await caches.match(event.request);if(cached)return cached;if(event.request.mode==='navigate')return caches.match('./index.html');return Response.error();}));
});

/* Cricket Cam — works offline once opened. Always tries the internet first so you get the newest version. */
const C='cricket-cam-v14';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(['./','./icon.png','./manifest.json'])).catch(()=>{}))});
self.addEventListener('activate',e=>{e.waitUntil((async()=>{for(const k of await caches.keys())if(k!==C)await caches.delete(k);await self.clients.claim()})())});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);if(u.origin!==location.origin||u.searchParams.has('vc'))return;
  e.respondWith((async()=>{const c=await caches.open(C);const key=r.mode==='navigate'?'./':r;
    try{const ctl=new AbortController(),to=setTimeout(()=>ctl.abort(),4000);const res=await fetch(u.href,{cache:'no-cache',signal:ctl.signal});clearTimeout(to);if(res.ok)c.put(key,res.clone());return res}
    catch(err){const m=await c.match(key,{ignoreSearch:true});if(m)return m;throw err}})())});

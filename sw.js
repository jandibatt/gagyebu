// 오프라인에서도 앱이 열리게 해주는 파일 (데이터는 다루지 않아요)
const CACHE="gagyebu-v12b";
const FILES=["./","./index.html","./icon-180.png","./manifest.json"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim()});
// 인터넷 되면 최신 버전, 안 되면 저장해둔 버전
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(CACHE).then(x=>x.put(e.request,c));return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match("./index.html"))));
});

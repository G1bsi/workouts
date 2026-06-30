const CACHE='wo-v1';
const SHELL=['index.html','manifest.json','icon-192.png','icon-512.png','icon-180.png'];
self.addEventListener('install',function(e){ e.waitUntil(caches.open(CACHE).then(function(c){ return Promise.all(SHELL.map(function(u){ return c.add(u).catch(function(){}); })); }).then(function(){ return self.skipWaiting(); })); });
self.addEventListener('activate',function(e){ e.waitUntil(caches.keys().then(function(ks){ return Promise.all(ks.map(function(k){ if(k!==CACHE) return caches.delete(k); })); }).then(function(){ return self.clients.claim(); })); });
self.addEventListener('fetch',function(e){ var u=new URL(e.request.url); if(e.request.method!=='GET'||u.origin!==location.origin) return; e.respondWith(caches.match(e.request).then(function(r){ return r||fetch(e.request).then(function(resp){ var c=resp.clone(); caches.open(CACHE).then(function(ca){ ca.put(e.request,c); }); return resp; }).catch(function(){ return caches.match('index.html'); }); })); });

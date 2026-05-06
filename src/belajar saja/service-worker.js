const CACHE="study-v1";

self.addEventListener("install",e=>{
    e.waitUntil(
        caches.open(CACHE).then(cache=>{
            return cache.addAll([
                "login.html",
                "app.html",
                "style.css",
                "auth.js",
                "script.js"
            ]);
        })
    );
});

self.addEventListener("fetch",e=>{
    e.respondWith(
        caches.match(e.request).then(res=>{
            return res || fetch(e.request);
        })
    );
});
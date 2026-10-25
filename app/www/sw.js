/* 立体几何 · 截面实验台 —— 离线缓存
   作用：第一次联网打开后，把页面和资源存到本地，之后断网、飞行模式都能直接打开。
   注意：Service Worker 只在 http:// 或 https:// 下工作；
        直接双击用 file:// 打开时浏览器会跳过它（单文件版本身就不需要联网，不影响离线使用）。
   更新办法：改页面后把下面的 CACHE 版本号 +1 即可。 */
const CACHE = 'geom-lab-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-180.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  if (new URL(req.url).origin !== self.location.origin) return;   // 跨域资源不缓存
  e.respondWith(
    caches.match(req).then(hit => {
      if (hit) {
        // 后台顺手更新一份（stale-while-revalidate）
        fetch(req).then(res => {
          if (res && res.ok) caches.open(CACHE).then(c => c.put(req, res.clone()));
        }).catch(() => {});
        return hit;
      }
      return fetch(req).then(res => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy));
        }
        return res;
      }).catch(() => caches.match('./index.html'));   // 彻底断网且没缓存过时兜底
    })
  );
});

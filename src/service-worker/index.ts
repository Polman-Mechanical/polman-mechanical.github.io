/// <reference no-default-lib="true"/>
/// <reference lib="es2020" />
/// <reference lib="webworker" />

import { build, files, prerendered, version } from '$service-worker';

const CACHE_NAME = `v${version}_cache`;
const sw = self as unknown as ServiceWorkerGlobalScope & typeof globalThis;
const ignoreFiles = [
  /\.nojekyll$/
];

sw.addEventListener('install', event => {
  event.waitUntil(async function () {
    const cache = await caches.open(CACHE_NAME)
    cache.addAll([
      ...build,
      ...files.filter(f => !ignoreFiles.some(i => f.match(i))),
      ...prerendered,
    ]);
  }());
});

// Delete old caches
sw.addEventListener('activate', event => {
  event.waitUntil(async function () {
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames.map(cacheName => {
        if (cacheName !== CACHE_NAME) {
          return caches.delete(cacheName);
        }
      })
    );
  }());
});

sw.addEventListener('fetch', (event: FetchEvent & FetchEventInit) => {
  event.respondWith(async function () {
    let error: Error;
    let response: Response;
    let cache: Cache;

    response = await event.preloadResponse;
    if (response) return response;
    
    try {
      [
        response,
        cache,
      ] = await Promise.all([
        fetch(event.request),
        caches.open(CACHE_NAME),
      ]);

      if (response.ok) {
        cache.put(event.request, response.clone());
      }

      return response;
    } catch (e) {
      error = e;
    }


    response = await caches.match(event.request);
    if (response) return response;

    throw error;
  }());
});
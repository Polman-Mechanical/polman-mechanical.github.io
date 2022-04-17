const build = [
  "/_app/start-a5f297bf.js",
  "/_app/pages/__layout.svelte-0a81db2d.js",
  "/_app/assets/pages/__layout.svelte-47dfe6b3.css",
  "/_app/error.svelte-52891c42.js",
  "/_app/pages/__layout-blank.svelte-2bb7803f.js",
  "/_app/pages/frame/index@blank.svelte-4791a4f8.js",
  "/_app/assets/pages/frame/index@blank.svelte-06d30f89.css",
  "/_app/pages/index.svelte-f3414de4.js",
  "/_app/assets/pages/index.svelte-b4cff391.css",
  "/_app/pages/quotes/index.svelte-39d14799.js",
  "/_app/assets/pages/quotes/index.svelte-ee8379ee.css",
  "/_app/chunks/index-d5e11089.js",
  "/_app/chunks/dayjs-0a903476.js",
  "/_app/chunks/Offcanvas.svelte_svelte_type_style_lang-14670875.js",
  "/_app/assets/Offcanvas.svelte_svelte_type_style_lang-82c1b07d.css",
  "/_app/chunks/html2canvas.esm-be732fb2.js",
  "/_app/chunks/purify.es-c7ca67d5.js",
  "/_app/chunks/index.es-cef31c50.js"
];
const files = [
  "/.nojekyll",
  "/favicon.png",
  "/fonts/OpenSans-Bold.ttf",
  "/fonts/OpenSans-Regular.ttf",
  "/fonts/OpenSans-SemiBold.ttf",
  "/images/logo.png",
  "/images/quotePDF.png",
  "/images/signature.png",
  "/stylesheets/bootstrap-icons.css",
  "/stylesheets/bootstrap.min.css",
  "/stylesheets/bootstrap.min.css.map"
];
const prerendered = [
  "/",
  "/frame",
  "/quotes"
];
const version = "1650159330501";
const CACHE_NAME = `v${version}_cache`;
const sw = self;
const ignoreFiles = [
  /\.nojekyll$/
];
sw.addEventListener("install", (event) => {
  event.waitUntil(async function() {
    const cache = await caches.open(CACHE_NAME);
    cache.addAll([
      ...build,
      ...files.filter((f) => !ignoreFiles.some((i) => f.match(i))),
      ...prerendered
    ]);
  }());
});
sw.addEventListener("activate", (event) => {
  event.waitUntil(async function() {
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames.map((cacheName) => {
      if (cacheName !== CACHE_NAME) {
        return caches.delete(cacheName);
      }
    }));
  }());
});
sw.addEventListener("fetch", (event) => {
  event.respondWith(async function() {
    let error;
    let response;
    let cache;
    response = await event.preloadResponse;
    if (response)
      return response;
    try {
      [
        response,
        cache
      ] = await Promise.all([
        fetch(event.request),
        caches.open(CACHE_NAME)
      ]);
      if (response.ok) {
        cache.put(event.request, response.clone());
      }
      return response;
    } catch (e) {
      error = e;
    }
    response = await caches.match(event.request);
    if (response)
      return response;
    throw error;
  }());
});

const dynamicCacheName = "d-app-v1";

const assetUrls = [
  "./index.html",
  "./style.css",
  "./main.js",
  "./manifest.json",
  "./app.js",
  "./sw.js",
  "./css/colors.css",
  "./js/currentHeight.js",
  "./img/mini-icons/add-task-btn__icon.svg",
  "./img/mini-icons/calendar.svg",
  "./img/mini-icons/context-menu-btn__icon.svg",
  "./img/mini-icons/delete-btn.svg",
  "./img/mini-icons/drag-and-drop-btn.svg",
  "./img/mini-icons/img-icon.svg",
  "./img/mini-icons/trash-icon.svg",
  "./img/logo/icon-48x48.png",
  "./img/logo/icon-72x72.png",
  "./img/logo/icon-96x96.png",
  "./img/logo/icon-128x128.png",
  "./img/logo/icon-144x144.png",
  "./img/logo/icon-152x152.png",
  "./img/logo/icon-192x192.png",
  "./img/logo/icon-384x384.png",
  "./img/logo/icon-512x512.png",
  "./blocks/add-task-btn/add-task-btn.css",
  "./blocks/add-task-btn/add-task-btn.js",
  "./blocks/completed-tasks-count/completed-tasks-count.css",
  "./blocks/context-menu-btn/context-menu-btn.js",
  "./blocks/context-menu-btn/context-menu-btn.css",
  "./blocks/context-menu-window/context-menu-window.css",
  "./blocks/context-menu-window/context-menu-window.js",
  "./blocks/date-input/date-input.css",
  "./blocks/img-viewer/img-viewer.css",
  "./blocks/img-viewer/img-viewer.js",
  "./blocks/mark/mark.css",
  "./blocks/mark/mark.js",
  "./blocks/outgoing-wrapper/&__files-container/outgoing-wrapper__files-container.js",
  "./blocks/outgoing-wrapper/outgoing-wrapper__content/outgoing-wrapper__content.js",
  "./blocks/outgoing-wrapper/outgoing-wrapper__input/outgoing-wrapper__input_for_title.js",
  "./blocks/outgoing-wrapper/outgoing-wrapper.css",
  "./blocks/outgoing-wrapper/outgoing-wrapper.js",
  "./blocks/section/section.css",
  "./blocks/section/section.js",
  "./blocks/section-header/section-header.css",
  "./blocks/section-header/section-header.js",
  "./blocks/shadow-bg/shadow-bg.css",
  "./blocks/shadow-bg/shadow-bg.js",
  "./blocks/task/task.css",
  "./blocks/task/task.js",
  "./blocks/tasks-wrapper/tasks-wrapper.css",
  "./blocks/tasks-wrapper/tasks-wrapper.js",
  "./blocks/toggle-switch/toggle-switch.css",
  "./blocks/toggle-switch/toggle-switch.js",
  "./blocks/wrapper/wrapper.css",
];

self.addEventListener("install", async (event) => {
  const cache = await caches.open(dynamicCacheName);
  await cache.addAll(assetUrls);
});

self.addEventListener("activate", async (event) => {
  const cacheNames = await caches.keys();
  await Promise.all(
    cacheNames
      .filter((name) => name !== dynamicCacheName)
      .map((name) => caches.delete(name))
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  const url = new URL(request.url);
  event.respondWith(networkFirst(request));
});

async function networkFirst(request) {
  const cache = await caches.open(dynamicCacheName);
  try {
    const response = await fetch(request);
    await cache.put(request, response.clone());
    return response;
  } catch (e) {
    const cached = await cache.match(request);
    return cached ?? (await caches.match("./offline.html"));
  }
}

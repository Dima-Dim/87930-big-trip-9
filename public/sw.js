const CACHE_NAME = `BigTrip_v1.1`;
const TIMEOUT = 1000;
const CACHE_ITEMS = [
  `/`,
  `/index.html`,
  `./`,
  `./index.html`,
  `https://fonts.googleapis.com/css?family=Montserrat:400,500,600,700,800&display=swap`,
  `./css/style.css`,
  `./img/icons/bus.png`,
  `./img/icons/train.png`,
  `./img/icons/transport.png`,
  `./img/icons/trip.png`,
  `./img/icons/restaurant.png`,
  `./img/icons/ship.png`,
  `./img/icons/sightseeing.png`,
  `./img/icons/bus.png`,
  `./img/icons/check-in.png`,
  `./img/icons/drive.png`,
  `./img/icons/flight.png`,
  `./img/photos/1.jpg`,
  `./img/photos/2.jpg`,
  `./img/photos/3.jpg`,
  `./img/photos/4.jpg`,
  `./img/photos/5.jpg`,
  `./img/header-bg.png`,
  `./img/header-bg@2x.png`,
  `./img/logo.png`,
  `./bundle.js`,
]

self.addEventListener(`install`, (evt) => {

  evt.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(CACHE_ITEMS)
      )
      .then(() => self.skipWaiting())
      .catch((err) => new Error(`Cache addAll error: ${err}`))
  );
});

self.addEventListener(`activate`, (evt) => {
  evt.waitUntil(self.clients.claim());
});

self.addEventListener(`fetch`, (evt) => {

  if(CACHE_ITEMS.includes(evt.request.url)) {
    console.log(`Обрабатываем запрос к ${evt.request.url}`)
    evt.respondWith(
      fromNetwork(evt.request, TIMEOUT)
        .then((response) => {
          console.log(`${evt.request.url} ответил.`)
          toCache(evt.request, response.clone());
          return response;
        })
        .catch((err) => {
          console.log(`Пошли за кешем для ${evt.request.url}`)
          return fromCache(evt.request);
        })
    );
  } else {
    console.log(`Мимо: ${evt.request.url}`)
  }
});

function fromCache(request, err) {

  return caches.open(CACHE_NAME).then((cache) =>
    cache.match(request)
      .then((matching) =>
        matching || Promise.reject('no-match')
      ))
    .catch((err) => new Error(`fetch error: ${err}`));
}

function toCache(request, response) {

  return caches.open(CACHE_NAME)
    .then((cache) => cache.put(request, response))
    .catch((err) => new Error(`Cache put error: ${err}`));
}

function fromNetwork(request, timeout) {

  return new Promise((fulfill, reject) => {
    let timeoutId = setTimeout(reject, timeout);

    fetch(request).then((response) => {
      clearTimeout(timeoutId);
      fulfill(response);
    }, reject);
  });
}

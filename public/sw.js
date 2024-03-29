const CACHE_NAME = `BigTrip_v1.0`;
const TIMEOUT = 1000;

self.addEventListener(`install`, (evt) => {

  evt.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll([
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
          `./bundle.js`,
        ])
      )
      .then(() => self.skipWaiting())
      .catch((err) => new Error(`Cache addAll error: ${err}`))
  );
});

self.addEventListener(`activate`, (evt) => {
  evt.waitUntil(self.clients.claim());
});

self.addEventListener(`fetch`, (evt) => {

  if(!evt.request.url.includes("picsum.photos")) {
    evt.respondWith(
      fromNetwork(evt.request, TIMEOUT)
        .then((response) => {
          toCache(evt.request, response.clone());
          return response;
        })
        .catch((err) => {
          return fromCache(evt.request);
        })
    );
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

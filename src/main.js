import {ApiData} from "./components/config";
import {Index} from "./controller";
import Api from "./components/api";

export const globalState = {
  api: new Api(ApiData),
  events: null,
  destinations: null,

  addEvents(events) {
    this.events = events;
  },

  addDestinations(destinations) {
    this.destinations = destinations;
  },

  addOffers(offers) {
    this.offers = offers;
  },
};

globalState.api.getEvents()
  .then((events) => globalState.addEvents(events))
  .then(() => globalState.api.getDestination()
    .then((destinations) => globalState.addDestinations(destinations)))
  .then(() => globalState.api.getOffers()
    .then((offers) => globalState.addOffers(offers)))
  .then(() => new Index());

/**
 * Функция для получения массива ивентов
 *
 * @param {number} count Количество ивентов, которое необходимо получить
 *
 * @return {Array} массив ивентов
 */
// const getEvents = (count) => new Array(count).fill(``).map(getEventData).sort((a, b) => sortOrder.asc(a, b, `startDate`));
//
// globalState.events = getEvents(ALL_EVENT_COUNT);
//
// const start = new Index();
// start.init();

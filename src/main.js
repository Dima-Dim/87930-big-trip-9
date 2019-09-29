import {ApiData, StorageKey} from "./components/config";
import {Index} from "./controller";
import Api from "./components/api";
import Provider from "./components/provider";
import Store from "./components/store";

export const globalState = {
  api: new Api(ApiData),
  provider: new Provider({api: new Api(ApiData), store: new Store(window.localStorage, StorageKey.MAIN)}),
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

globalState.provider.getEvents()
  .then((events) => globalState.addEvents(events))
  .then(() => globalState.provider.getDestinations()
    .then((destinations) => globalState.addDestinations(destinations)))
  .then(() => globalState.provider.getOffers()
    .then((offers) => globalState.addOffers(offers)))
  .then(() => new Index());

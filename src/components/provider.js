import {responseFromJSON, generateId, objectToArray} from "./utils";
import EventsAdapter from "./events-adapter";

export default class Provider {
  constructor({api, store}) {
    this._api = api;
    this._store = store;
  }

  getEvents(clear = false) {
    if (this._isOnline()) {
      return this._api.getEvents()
        .then(responseFromJSON)
        .then(EventsAdapter.parseEvents)
        .then((events) => {
          if (clear) {
            this._store.clear();
          }
          this._store.setItems(EventsAdapter.toSources(events));
          return events;
        });
    } else {
      return Promise.resolve(EventsAdapter.parseEvents(objectToArray(this._store.getItems())));
    }
  }

  getDestinations() {
    if (this._isOnline()) {
      return this._api.getDestinations()
        .then(responseFromJSON)
        .then((destinations) => {
          this._store.setDestinations(destinations);
          return destinations;
        });
    } else {
      return Promise.resolve(objectToArray(this._store.getDestinations()));
    }
  }

  getOffers() {
    if (this._isOnline()) {
      return this._api.getOffers()
        .then(responseFromJSON)
        .then((offers) => {
          this._store.setOffers(offers);
          return offers;
        });
    } else {
      return Promise.resolve(objectToArray(this._store.getOffers()));
    }
  }

  createEvent(event) {
    if (this._isOnline()) {
      return this._api.createEvent(event)
        .then(responseFromJSON)
        .then(EventsAdapter.parseEvent)
        .then((it) => {
          this._store.setItem(it);
          return event;
        });
    } else {
      event.id = generateId(10);
      this._store.setItem({id: event.id, item: EventsAdapter.toSource(event)});
      return Promise.resolve(EventsAdapter.parseEvents(objectToArray(this._store.getItems())));
    }
  }

  updateEvent(event) {
    if (this._isOnline()) {
      return this._api.updateEvent(event)
        .then(responseFromJSON)
        .then(EventsAdapter.parseEvent)
        .then((it) => {
          this._store.setItem(EventsAdapter.toSource(it));
          return event;
        });
    } else {
      this._store.setItem({id: event.id, item: EventsAdapter.toSource(event)});
      return Promise.resolve(EventsAdapter.parseEvents(objectToArray(this._store.getItems())));
    }
  }

  removeEvent(id) {
    this._store.removeItem(id);

    if (this._isOnline()) {
      return this._api.removeEvent(id);
    } else {
      return Promise.resolve(true);
    }
  }

  sync() {
    if (this._isOnline()) {
      return this._api.syncEvents(objectToArray(this._store.getItems()))
        .then(this.getEvents(true));
    } else {
      return Promise.resolve(false);
    }
  }

  _isOnline() {
    return window.navigator.onLine;
  }
}

import {StorageKey} from "./config";

export default class Store {
  constructor(storage, key) {
    this._storage = storage;
    this._key = key;
  }

  getItems() {
    return this._getAll();
  }

  getDestinations() {
    this._storage.getItem(StorageKey.DESTINATIONS);
  }

  getOffers() {
    this._storage.getItem(StorageKey.OFFERS);
  }

  setItem({id, item}) {
    const items = this._getAll();
    items[id] = item;

    try {
      this._storage.setItem(this._key, JSON.stringify(items));
    } catch (err) {
      throw new Error(`Storage error: ${err}`);
    }
  }

  setItems(items) {
    items.map((it) => this.setItem({id: it.id, item: it}));
  }

  setDestinations(items) {
    try {
      this._storage.setItem(StorageKey.DESTINATIONS, JSON.stringify(items));
    } catch (err) {
      throw new Error(`Storage error: ${err}`);
    }
  }

  setOffers(items) {
    try {
      this._storage.setItem(StorageKey.OFFERS, JSON.stringify(items));
    } catch (err) {
      throw new Error(`Storage error: ${err}`);
    }
  }

  removeItem(id) {
    const items = this._getAll();
    delete items[id];

    try {
      this._storage.setItem(this._key, JSON.stringify(items));
    } catch (err) {
      throw new Error(`Storage error: ${err}`);
    }
  }

  clear() {
    this._storage.removeItem(this._key);
  }

  _getAll() {
    const emptyObj = {};
    let jsonItems = null;
    let items = null;

    try {
      jsonItems = this._storage.getItem(this._key);
    } catch (err) {
      throw new Error(`Storage error: ${err}`);
    }

    if (jsonItems) {
      try {
        items = JSON.parse(jsonItems);
      } catch (err) {
        throw new Error(`Storage JSON parse error: ${err}`);
      }
    }

    if (!items) {
      return emptyObj;
    } else {
      return items;
    }
  }
}

import {ApiData, HttpHeader, HttpMethod} from "./config";
import {checkStatus, fromJSON} from "./utils";
import EventsAdapter from "./events-adapter";

export default class Api {
  constructor({HOST, AUTHORIZATION}) {
    this._host = HOST;
    this._authorization = AUTHORIZATION;
  }

  getEvents() {
    return this._load({path: ApiData.POINTS})
      .then(fromJSON)
      .then(EventsAdapter.parseEvents);
  }

  getDestination() {
    return this._load({path: ApiData.DESTINATIONS})
      .then(fromJSON);
  }

  getOffers() {
    return this._load({path: ApiData.OFFERS})
      .then(fromJSON);
  }

  createEvent(event) {
    return this._load({
      path: ApiData.POINTS,
      method: HttpMethod.POST,
      body: JSON.stringify(EventsAdapter.toSource(event)),
      headers: new Headers(HttpHeader.JSON),
    })
      .then(fromJSON)
      .then(EventsAdapter.parseEvent);
  }

  updateEvent(event) {
    return this._load({
      path: `${ApiData.POINTS}/${event.id}`,
      method: HttpMethod.PUT,
      body: JSON.stringify(EventsAdapter.toSource(event)),
      headers: new Headers(HttpHeader.JSON)
    });
  }

  deleteEvent(id) {
    return this._load({
      path: `${ApiData.POINTS}/${id}`,
      method: HttpMethod.DELETE,
    });
  }

  _load({path, method = HttpMethod.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._host}/${path}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw new Error(`fetch error: ${err}`);
      });
  }

}

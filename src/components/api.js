import {ApiData, HttpHeader, HttpMethod} from "./config";
import {checkStatus} from "./utils";
import EventsAdapter from "./events-adapter";

export default class Api {
  constructor({HOST, AUTHORIZATION}) {
    this._host = HOST;
    this._authorization = AUTHORIZATION;
  }

  getEvents() {
    return this._load({path: ApiData.POINTS});
  }

  getDestinations() {
    return this._load({path: ApiData.DESTINATIONS});
  }

  getOffers() {
    return this._load({path: ApiData.OFFERS});
  }

  createEvent(event) {
    return this._load({
      path: ApiData.POINTS,
      method: HttpMethod.POST,
      body: JSON.stringify(EventsAdapter.toSource(event)),
      headers: new Headers(HttpHeader.JSON),
    });
  }

  updateEvent(event) {
    return this._load({
      path: `${ApiData.POINTS}/${event.id}`,
      method: HttpMethod.PUT,
      body: JSON.stringify(EventsAdapter.toSource(event)),
      headers: new Headers(HttpHeader.JSON)
    });
  }

  removeEvent(id) {
    return this._load({
      path: `${ApiData.POINTS}/${id}`,
      method: HttpMethod.DELETE,
    });
  }

  syncEvents(events) {
    return this._load({
      path: `${ApiData.POINTS}/${ApiData.SYNC}`,
      method: HttpMethod.POST,
      body: JSON.stringify(events),
      headers: new Headers(HttpHeader.JSON)
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

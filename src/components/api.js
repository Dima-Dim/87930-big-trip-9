import {ApiData, HTTPHeaders, HTTPMethod} from "./config";
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

  createEvent(event) {
    return this._load({
      path: ApiData.POINTS,
      method: HTTPMethod.POST,
      body: JSON.stringify(EventsAdapter.toSource(event)),
      headers: new Headers(HTTPHeaders.JSON),
    })
      .then(fromJSON)
      .then(EventsAdapter.parseEvent);
  }

  updateEvents(event) {
    return this._load({
      path: `${ApiData.POINTS}/${event.id}`,
      method: HTTPMethod.PUT,
      body: JSON.stringify(EventsAdapter.toSource(event)),
      headers: new Headers(HTTPHeaders.JSON)
    })
      .then(fromJSON)
      .then(EventsAdapter.parseEvent);
  }

  deleteEvent({id}) {
    return this._load({
      path: `${ApiData.POINTS}/${id}`,
      method: HTTPMethod.DELETE,
    });
  }

  _load({path, method = HTTPMethod.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._host}/${path}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        console.error(`fetch error: ${err}`);
        throw err;
      });
  }

}

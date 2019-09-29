import {globalState} from "../main";

export default class EventsAdapter {
  constructor(data) {
    this.id = data[`id`];
    this.type = data[`type`];
    this.destination = data[`destination`];
    this.startDate = data[`date_from`];
    this.endDate = data[`date_to`];
    this.price = data[`base_price`];
    this.additionalOptions = data[`offers`];
    this.isFavorite = data[`is_favorite`];
  }

  static parseEvent(data) {
    return new EventsAdapter(data);
  }

  static parseEvents(data) {
    return data.map(EventsAdapter.parseEvent);
  }

  static toSource(data) {
    const destination = globalState.destinations.find((it) => it.name === data.destination);
    return {
      'id': data.id,
      'type': data.type,
      'destination': {
        'description': destination.description,
        'name': data.destination,
        'pictures': destination.pictures,
      },
      'base_price': data.price,
      'date_from': data.startDate,
      'date_to': data.endDate,
      'is_favorite': data.isFavorite,
      'offers': data.additionalOptions,
    };
  }
}

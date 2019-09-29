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
    return {
      'id': data.id,
      'type': data.type,
      'destination': {
        'description': data.destination.description,
        'name': data.destination.name,
        'pictures': data.destination.pictures,
      },
      'base_price': data.price,
      'date_from': data.startDate,
      'date_to': data.endDate,
      'is_favorite': data.isFavorite,
      'offers': data.additionalOptions,
    };
  }

  static toSources(data) {
    return data.map(EventsAdapter.toSource);
  }
}

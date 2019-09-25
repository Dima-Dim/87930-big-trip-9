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
}

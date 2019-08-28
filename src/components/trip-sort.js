import AbstractComponent from "./abstract-component";
import {DEFAULT_SORT_EVENTS} from "./config";

export default class TripSort extends AbstractComponent {
  constructor(sortType = DEFAULT_SORT_EVENTS) {
    super();
    this._sortType = sortType;
  }

  getTemplate() {
    return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
              <span class="trip-sort__item  trip-sort__item--day">${this._sortType === DEFAULT_SORT_EVENTS ? `Day` : ``}</span>

              <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
            </form>`;
  }
}

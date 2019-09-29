import AbstractComponent from "./abstract-component";
import {ElementClass, Default, SORT_ITEMS} from "./config";
import {getSortItem} from "./trip-sort-item";

export default class TripSort extends AbstractComponent {
  constructor(sortType = Default.SORT_EVENTS, onChangeTripSortItem) {
    super();
    this._sortType = sortType;
    this._onChangeTripSortItem = onChangeTripSortItem;

    this.init();
  }

  _renderSortItems(sortType = this._sortType) {
    return `${Array.from(SORT_ITEMS).map((it) => getSortItem(it, sortType)).join(``)}`;
  }

  init() {
    AbstractComponent.renderElement(`.${ElementClass.TRIP_EVENTS}`, this.getElement(this._sortType), `prepend`);

    const onChangeActiveItem = () => {
      const {id} = this.getElement().querySelector(`input:checked`);
      this._onChangeTripSortItem(id);
    };

    this.getElement().addEventListener(`change`, onChangeActiveItem);
  }

  getTemplate() {
    return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
              <span class="trip-sort__item  trip-sort__item--day">${this._sortType === Default.SORT_EVENTS ? `Day` : ``}</span>
              ${this._renderSortItems()}
              <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
            </form>`;
  }
}

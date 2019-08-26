import AbstractComponent from "./abstract-component";

const sortState = {
  active: `event`,

  get checkActive() {
    return this.active;
  }
};

/**
 * Функция, для создания элемента сортировки
 *
 * @param {string} sortId Id элемента сортировки
 * @param {string} NAME Название элемента сортировки
 * @param {string} ICON Код иконки элемента сортировки
 *
 * @return {string} HTML-код
 */
const getMarkupTripSortItem = ([sortId, {NAME, ICON}]) => `
<div class="trip-sort__item  trip-sort__item--${sortId}">
  <input id="sort-${sortId}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sortId}" ${sortId === sortState.checkActive ? `checked` : ``}>
  <label class="trip-sort__btn" for="sort-${sortId}">
    ${NAME}
    ${ICON}
  </label>
</div>`;

export default class TripSort extends AbstractComponent {
  constructor(items) {
    super();
    this._items = items;
  }

  getTemplate() {
    return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
              <span class="trip-sort__item  trip-sort__item--day">Day</span>
              
              ${this._items.map((it) => getMarkupTripSortItem(it)).join(``)}
            
              <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
            </form>`;
  }
}

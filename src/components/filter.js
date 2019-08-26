import AbstractComponent from "./abstract-component";

const filterState = {
  active: `everything`,
};

export default class Filters extends AbstractComponent {
  constructor(items) {
    super();
    this._items = items;
  }

  /**
   * Функция, возвращающая разметку элемента фильтра событий
   *
   * @param {string} filterId Id фильтра
   * @param {string} name Название фильтра
   *
   * @return {string} HTML-код
   */
  static getMarkupFilter([filterId, name]) {
    return `<div class="trip-filters__filter">
              <input id="filter-${filterId}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filterId}" ${filterId === filterState[`active`] ? `checked` : ``}>
              <label class="trip-filters__filter-label" for="filter-${filterId}">
                ${name}
              </label>
            </div>`;
  }

  getTemplate() {
    return `<form class="trip-filters" action="#" method="get">
              ${this._items.map((it) => Filters.getMarkupFilter(it)).join(``)}
              <button class="visually-hidden" type="submit">
                Accept filter
              </button>
            </form>`;
  }
}

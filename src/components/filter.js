const filterState = {
  active: `everything`,

  get checkActive() {
    return this.active;
  }
};

/**
 * Функция, возвращающая разметку элемента фильтра событий
 *
 * @param {string} filterId Id фильтра
 * @param {string} name Название фильтра
 *
 * @return {string} HTML-код
 */
export const getMarkupFilter = ([filterId, name]) => `
<div class="trip-filters__filter">
  <input id="filter-${filterId}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filterId}" ${filterId === filterState.checkActive ? `checked` : ``}>
  <label class="trip-filters__filter-label" for="filter-${filterId}">
    ${name}
  </label>
</div>`;

/**
 * Функция, возвращающая разметку блока фильтров событий
 *
 * @param {Array}items Массив фильтров событий
 *
 * @return {string} HTML-код
 */
export const getMarkupFilters = (items) => `
<form class="trip-filters" action="#" method="get">
  ${items.map((it) => getMarkupFilter(it)).join(``)}
  <button class="visually-hidden" type="submit">Accept filter</button>
</form>`;

const menuState = {
  active: `table`,

  get checkActive() {
    return this.active;
  }
};

/**
 * Функция, возвращающая разметку элемента меню
 *
 * @param {string} menuId Id элемента меню
 * @param {string} NAME Название элемента меню
 * @param {string} URL URL элемента меню
 *
 * @return {string} HTML-код
 */
const getMarkupMenuItem = ([menuId, {NAME, URL}]) => `
<a class="trip-tabs__btn ${menuId === menuState.checkActive ? `trip-tabs__btn--active` : ``}" href="${URL}">
  ${NAME}
</a>`;

/**
 * Функция, возвращающая разметку блока меню
 *
 * @param {Array} items Массив с элементами меню
 *
 * @return {string} HTML-код
 */
export const getMarkupMenu = (items) => `
<nav class="trip-controls__trip-tabs  trip-tabs">
  ${items.map((it) => getMarkupMenuItem(it)).join(``)}
</nav>`;

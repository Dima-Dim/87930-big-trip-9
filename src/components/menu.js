import {AbstractComponent} from "./abstract-component";

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

const menuState = {
  active: `table`,

  get checkActive() {
    return this.active;
  }
};

export class Menu extends AbstractComponent {
  constructor(events) {
    super();
    this._events = events;
  }

  getTemplate() {
    return `<nav class="trip-controls__trip-tabs  trip-tabs">
              ${this._events.map((it) => getMarkupMenuItem(it)).join(``)}
            </nav>`;
  }
}

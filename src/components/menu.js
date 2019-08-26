import AbstractComponent from "./abstract-component";

export default class Menu extends AbstractComponent {
  constructor(events) {
    super();
    this._events = events;
    this._state = {
      active: `table`,

      get checkActive() {
        return this.active;
      }
    };
  }

  /**
   * Функция, возвращающая разметку элемента меню
   *
   * @param {string} menuId Id элемента меню
   * @param {string} NAME Название элемента меню
   * @param {string} URL URL элемента меню
   *
   * @return {string} HTML-код
   */
  _getMarkupMenuItem([menuId, {NAME, URL}]) {
    return `<a class="trip-tabs__btn ${menuId === this._state.checkActive ? `trip-tabs__btn--active` : ``}" href="${URL}">
              ${NAME}
            </a>`;
  }

  getTemplate() {
    return `<nav class="trip-controls__trip-tabs  trip-tabs">
              ${this._events.map((it) => this._getMarkupMenuItem(it)).join(``)}
            </nav>`;
  }
}

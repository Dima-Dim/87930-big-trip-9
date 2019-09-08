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

  _getMarkupMenuItem() {
    /**
     * Функция, возвращающая разметку элемента меню
     *
     * @param {string} menuId Id элемента меню
     * @param {string} NAME Название элемента меню
     * @param {string} URL URL элемента меню
     *
     * @return {string} HTML-код
     */
    const template = ([menuId, {NAME, URL}]) => `<a id="${menuId}" class="trip-tabs__btn ${menuId === this._state.checkActive ? `trip-tabs__btn--active` : ``}" href="${URL}">
                                                   ${NAME}
                                                 </a>`;
    return `${this._events.map((it) => template(it)).join(``)}`;
  }

  changeActive(active) {
    this._state.active = active;
    this.getElement().innerHTML = this._getMarkupMenuItem();
  }

  getTemplate() {
    return `<nav class="trip-controls__trip-tabs  trip-tabs">
              ${this._getMarkupMenuItem()}
            </nav>`;
  }
}

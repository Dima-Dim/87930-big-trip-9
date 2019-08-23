import {elementTemplate, renderElement} from "./utils";

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

class Menu extends elementTemplate {
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

/**
 * Функция для создания экземпляра класса и отправка его на рендеринг
 *
 * @param {string|Element} container Информация о контейнере, в который необходимо поместить элемент
 * @param {Array} content Массив данных на основании которых необходимо подготовить элемент
 * @param {"append"|"prepend"} position Позиция вставки элемента, относительно контейнера, в который он вставляется
 */
export const renderMenu = (container, content, position) => {
  const menu = new Menu(content);

  renderElement(container, menu.getElement(), position);
};

/**
 * Шаблон класса для создания элементов разметки страницы
 */
export default class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(`Can't instantiate AbstractComponent, only create one.`);
    }
    this._element = null;
  }

  getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate.`);
  }

  getElement() {
    if (!this._element) {
      this._element = AbstractComponent.createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    AbstractComponent.unRenderElement(this._element);
    this._element = null;
  }

  /**
   * Функция для изготовления DOM-элемента из строки
   *
   * @param {string} template HTML-код
   *
   * @return {ChildNode}
   */
  static createElement(template) {
    const newElement = document.createElement(`div`);
    newElement.innerHTML = template;

    return newElement.firstChild;
  }

  /**
   * Функция для добавления DOM-элементов на страницу
   *
   * @param {string|Element} container CSS-селектор контейнера, в который необходимо добавить DOM-элемент
   * @param {Element} element DOM-элемент, который нужно добавить в страницу
   * @param {"append"|"prepend"|"insertBefore"|"insertAfter"} position Позиция вставки элемента, относительно контейнера, в который он вставляется
   */
  static renderElement(container, element, position = `append`) {
    const parentContainer = typeof container === `string` ? document.querySelector(container) : container;

    switch (position) {
      case `append`:
        parentContainer.append(element);
        break;
      case `prepend`:
        parentContainer.prepend(element);
        break;
      case `insertBefore`:
        parentContainer.parentNode.insertBefore(element, parentContainer);
        break;
      case `insertAfter`:
        parentContainer.parentNode.insertBefore(element, parentContainer.nextSibling);
        break;
    }
  }

  /**
   * Функция для удаления DOM-элемента со страницы
   *
   * @param {Element} element DOM-элемент, который нужно удалить со страницы
   */
  static unRenderElement(element) {
    element.parentNode.removeChild(element);
  }
}

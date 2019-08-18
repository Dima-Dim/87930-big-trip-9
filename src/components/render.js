import {CONTAINER_SELECTORS} from "./config";

/**
 * Функция для добавления HTML-кода элементов на страницу
 *
 * @param {string} container CSS-селектор контейнера, в который необходимо добавить HTML-код элемента
 * @param {string} content HTML-код, который нужно добавить в разметку страницы
 * @param {"beforebegin" | "afterbegin" | "beforeend" | "afterend"} position, который нужно добавить в разметку страницы
 */
const renderElement = (container, content, position = `beforeend`) => {
  document.querySelector(`${CONTAINER_SELECTORS[container]}`).insertAdjacentHTML(position, content);
};

/**
 * Функция для обработки объекта с информацией об элементах, которые необходимо добавить в разметку страницы
 *
 * @param {$ObjMap} obj объект с информацией об элементах которые нужно отрисовать
 */
export const renderContent = (obj) => {
  for (const [, item] of Object.entries(obj)) {
    const markup = Array(item[`amount`]).fill(item[`markup`]).join(``);
    renderElement(item[`container`], markup, item[`position`]);
  }
};

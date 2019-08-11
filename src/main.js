import {getMarkupTripInfo} from "./components/trip-info";
import {getMarkupMenu} from "./components/menu";
import {getMarkupFilter} from "./components/filter";
import {getMarkupTripSort} from "./components/trip-sort";
import {getMarkupDay} from "./components/day";
import {getMarkupAddEvent} from "./components/add-event";

const ContainerSelectors = {
  TRIP_INFO: `.trip-info`,
  TRIP_CONTROLS: `.trip-controls`,
  TRIP_MENU: `.trip-controls h2`,
  TRIP_EVENTS: `.trip-events`,
};

const elements = {
  tripInfo: {
    container: `TRIP_INFO`,
    position: `afterBegin`,
    markup: getMarkupTripInfo,
    amount: 1
  },
  menu: {
    container: `TRIP_MENU`,
    position: `afterEnd`,
    markup: getMarkupMenu,
    amount: 1
  },
  filter: {
    container: `TRIP_CONTROLS`,
    position: `beforeEnd`,
    markup: getMarkupFilter,
    amount: 1
  },
  tripSort: {
    container: `TRIP_EVENTS`,
    position: `beforeEnd`,
    markup: getMarkupTripSort,
    amount: 1
  },
  AddEvent: {
    container: `TRIP_EVENTS`,
    position: `beforeEnd`,
    markup: getMarkupAddEvent,
    amount: 1
  },
  day: {
    container: `TRIP_EVENTS`,
    position: `beforeEnd`,
    markup: getMarkupDay,
    amount: 3
  },
};

/**
 * Функция для добавления HTML-кода элементов на страницу
 *
 * @param {string} container CSS-селектор контейнера, в который необходимо добавить HTML-код элемента
 * @param {string} content HTML-код, который нужно добавить в разметку страницы
 * @param {"beforebegin" | "afterbegin" | "beforeend" | "afterend"} position, который нужно добавить в разметку страницы
 */
const renderElement = (container, content, position = `beforeend`) => {
  document.querySelector(`${ContainerSelectors[container]}`).insertAdjacentHTML(position, content);
};

/**
 * Функция для обработки объекта с информацией об элементах, которые необходимо добавить в разметку страницы
 *
 * @param {$ObjMap} obj объект с информацией об элементах которые нужно отрисовать
 */
const renderContent = (obj) => {
  for (const [, item] of Object.entries(obj)) {
    const markup = Array(item[`amount`]).fill(item[`markup`]()).join(``);
    renderElement(item[`container`], markup, item[`position`]);
  }
};

renderContent(elements);

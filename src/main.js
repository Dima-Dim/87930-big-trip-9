import {ALL_EVENT_COUNT} from "./components/config";
import {sortOrder} from "./components/utils";
import {Index} from "./controller";
import {getEventData} from "./components/data";

export const globalState = {
  events: [],
};

/**
 * Функция для получения массива ивентов
 *
 * @param {number} count Количество ивентов, которое необходимо получить
 *
 * @return {Array} массив ивентов
 */
const getEvents = (count) => new Array(count).fill(``).map(getEventData).sort((a, b) => sortOrder.asc(a, b, `startDate`));

globalState.events = getEvents(ALL_EVENT_COUNT);

const start = new Index();
start.init();

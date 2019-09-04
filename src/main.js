import {ALL_EVENT_COUNT} from "./components/config";
import {sortOrder} from "./components/utils";
import {Index} from "./controller";
import {getEventData} from "./components/data";

/**
 * Функция для получения массива ивентов
 *
 * @param {number} count Количество ивентов, которое необходимо получить
 *
 * @return {Array} массив ивентов
 */
const getEvents = (count) => new Array(count).fill(``).map(getEventData).sort((a, b) => sortOrder.asc(a, b, `startDate`));

const start = new Index(getEvents(ALL_EVENT_COUNT));
start.init();

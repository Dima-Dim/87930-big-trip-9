import {ALL_EVENT_COUNT} from "./components/config";
import {sortOrder, getDateForEventsDayListFromTimeStamp} from "./components/utils";
import {Index} from "./controller";
import {getEventData} from "./components/data";

/**
 * Функция для получения массива ивентов
 *
 * @param {number} count Количество ивентов, которое необходимо получить
 *
 * @return {Array} allEvents массив ивентов
 */
const getEvents = (count) => {
  let days = new Set();
  const tempArr = new Array(count).fill(``).map(getEventData).sort((a, b) => sortOrder.asc(a, b, `startDate`));
  for (let i of tempArr) {
    days.add(getDateForEventsDayListFromTimeStamp(i[`startDate`]));
  }

  return Array.from(days).map((it) => [it, tempArr.filter((item) => it === getDateForEventsDayListFromTimeStamp(item[`startDate`]))]);
};

export const events = getEvents(ALL_EVENT_COUNT);

const start = new Index(new Map([...events]));
start.init();

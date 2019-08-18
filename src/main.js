import {ALL_EVENT_COUNT, MENU, FILTERS, SORT, ADDITIONAL_OPTIONS, CONTAINER_SELECTORS} from "./components/config";
import {sortOrder, getDateForEventsDayListFromTimeStamp} from "./components/utils";
import {getEventData} from "./components/data";
import {getMarkupTripInfo} from "./components/trip-info";
import {getMarkupMenu} from "./components/menu";
import {getMarkupFilters} from "./components/filter";
import {getMarkupTripSort} from "./components/trip-sort";
import {getMarkupDays} from "./components/day";
import {getMarkupAddEvent} from "./components/add-event";
import {renderContent} from "./components/render";

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

const calculationTotalCost = (costItems) => {
  let totalCost = 0;

  for (let i of costItems) {
    for (let j of i[1]) {
      totalCost += j[`price`];
      if (j[`additionalOptions`].size > 0) {
        for (let k of j[`additionalOptions`]) {
          totalCost += Number(ADDITIONAL_OPTIONS.get(k)[`PRICE`]);
        }
      }
    }
  }

  return totalCost;
};

document.querySelector(CONTAINER_SELECTORS[`TRIP_TOTAL_COST`]).textContent = calculationTotalCost(events);

const elements = {
  tripInfo: {
    container: `TRIP_INFO`,
    position: `afterBegin`,
    markup: getMarkupTripInfo(events),
    amount: 1
  },
  menu: {
    container: `TRIP_MENU`,
    position: `afterEnd`,
    markup: getMarkupMenu(Array.from(MENU)),
    amount: 1
  },
  filter: {
    container: `TRIP_CONTROLS`,
    position: `beforeEnd`,
    markup: getMarkupFilters(Array.from(FILTERS)),
    amount: 1
  },
  tripSort: {
    container: `TRIP_EVENTS`,
    position: `beforeEnd`,
    markup: getMarkupTripSort(Array.from(SORT)),
    amount: 1
  },
  AddEvent: {
    container: `TRIP_EVENTS`,
    position: `beforeEnd`,
    markup: getMarkupAddEvent(),
    amount: 1
  },
  day: {
    container: `TRIP_EVENTS`,
    position: `beforeEnd`,
    markup: getMarkupDays(events),
    amount: 1
  },
};

renderContent(elements);

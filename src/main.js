import {ALL_EVENT_COUNT, MENU, FILTERS, SORT, ADDITIONAL_OPTIONS, CONTAINER_SELECTORS} from "./components/config";
import {sortOrder, getDateForEventsDayListFromTimeStamp, renderElements} from "./components/utils";
import {getEventData} from "./components/data";
import {renderTripInfo} from "./components/trip-info";
import {renderMenu} from "./components/menu";
import {renderFilters} from "./components/filter";
import {renderTripSort} from "./components/trip-sort";
import {renderDays} from "./components/day";

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
    position: `prepend`,
    content: events,
    renderFn: renderTripInfo,
    amount: 1
  },
  menu: {
    container: `TRIP_MENU`,
    position: `insertAfter`,
    content: Array.from(MENU),
    renderFn: renderMenu,
    amount: 1
  },
  filter: {
    container: `TRIP_CONTROLS`,
    position: `append`,
    content: Array.from(FILTERS),
    renderFn: renderFilters,
    amount: 1
  },
  tripSort: {
    container: `TRIP_EVENTS`,
    position: `append`,
    content: Array.from(SORT),
    renderFn: renderTripSort,
    amount: 1
  },
  day: {
    container: `TRIP_EVENTS`,
    position: `append`,
    content: Array.from(events),
    renderFn: renderDays,
    amount: 1
  },
};

renderElements(elements);

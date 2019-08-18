import {getDayFromTimeStamp, getNameMonthFromTimeStamp} from "./utils";

const MONTH_NAME_LENGTH = 3;
const MAX_NUMBER_CITY_IN_TRIP_INFO = 3;

/**
 * Функция, для создания массива городов в которых происходят события
 *
 * @param {Array} events Массив дней, в которые происходят события
 *
 * @return {Array} Массива городов в которых происходят события
 */
const makeTripCities = (events) => {
  const tripCities = new Set();

  for (const i of events) {
    for (const j of i[1]) {
      tripCities.add(j[`destination`]);
    }
  }

  return Array.from(tripCities);
};

/**
 * Функция, для создания строки с информацией о городах через которые проходит путешествие
 *
 * @param {Array} events Массив дней, в которые происходят события
 *
 * @return {string} строки с информацией о городах через которые проходит путешествие
 */
const makeTripInfoTitle = (events) => {
  let newStr = ``;
  const tripCities = makeTripCities(events);

  if (tripCities.length < MAX_NUMBER_CITY_IN_TRIP_INFO + 1) {
    for (const i of tripCities) {
      newStr += `${i} - `;
    }
    newStr = newStr.substr(0, (newStr.length - 2));
  } else {
    newStr = `${tripCities[0]} — ... — ${tripCities[tripCities.length - 1]}`;
  }

  return newStr;
};

/**
 * Функция, для создания строки с информацией о начале и конце путешествия
 *
 * @param {Array} firstDayEvents Массив с событиями первого дня путешествия
 * @param {Array} lastDayEvents timestamp последнего события путешествия
 *
 * @return {string} строка с информацией о начале и конце путешествия
 */
const makeTripInfoStartEndTripDate = (firstDayEvents, lastDayEvents) => {
  const startEvent = firstDayEvents[0];
  const endEvent = lastDayEvents[lastDayEvents.length - 1];

  let newStr = ``;
  const startDay = getDayFromTimeStamp(startEvent[`startDate`]);
  const startMonth = getNameMonthFromTimeStamp(startEvent[`startDate`]);
  const endDay = getDayFromTimeStamp(endEvent[`endDate`]);
  const endMonth = getNameMonthFromTimeStamp(endEvent[`endDate`]);

  if (startMonth === endMonth) {
    newStr += `${startMonth.substr(0, MONTH_NAME_LENGTH)} ${startDay} — ${endDay}`;
  } else {
    newStr += `${startDay}${startMonth.substr(0, MONTH_NAME_LENGTH)} — ${startDay}${startMonth.substr(0, MONTH_NAME_LENGTH)}`;
  }

  return newStr;
};

/**
 * Функция, для создания блока с информацией о путешествие
 *
 * @param {Array} events Массив дней, в которые происходят события
 *
 * @return {string} HTML-код
 */
export const getMarkupTripInfo = (events) => `
<div class="trip-info__main">
  <h1 class="trip-info__title">${makeTripInfoTitle(events)}</h1>
  <p class="trip-info__dates">${makeTripInfoStartEndTripDate(events[0][1], events[events.length - 1][1])}</p>
</div>`;

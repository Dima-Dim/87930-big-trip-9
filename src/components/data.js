import {ALL_EVENT_TYPES, EVENT_DESTINATION, ADDITIONAL_OPTIONS} from "./config";
import {getRandomIntegerBetween} from "./utils";

const MIN_PRICE = 1;
const MAX_PRICE = 500;
const MIN_ADDITIONAL_OPTIONS = 0;
const MAX_ADDITIONAL_OPTIONS = 2;

// Для генерации более-менее логичных дат событий
const dateState = {
  timeStamp: 0,

  set startTimeStamp(startDate) {
    this.timeStamp = startDate;
  },

  get nextTimeStamp() {
    this.timeStamp += getRandomIntegerBetween(1, 60) * getRandomIntegerBetween(1, 60) * getRandomIntegerBetween(1, 24) * getRandomIntegerBetween(1, 11) * 1000;
    return this.timeStamp;
  },
};

dateState.startTimeStamp = Date.now();

/**
 * Функция возвращающая демо-данные о точках маршрута
 *
 * @return {{
 *  type: string,
 *  destination: string,
 *  startDate: *,
 *  endDate: *,
 *  price: number,
 *  additionalOptions: Set,
 *  isFavorite: boolean
 *  }}
 */
export const getEventData = () => ({
  type: Array.from(ALL_EVENT_TYPES)[getRandomIntegerBetween(0, ALL_EVENT_TYPES.size - 1)][0],
  destination: Array.from(EVENT_DESTINATION)[getRandomIntegerBetween(0, Array.from(EVENT_DESTINATION).length - 1)][0],
  startDate: dateState.nextTimeStamp,
  endDate: dateState.nextTimeStamp,
  price: getRandomIntegerBetween(MIN_PRICE, MAX_PRICE),
  additionalOptions: new Set(new Array(getRandomIntegerBetween(MIN_ADDITIONAL_OPTIONS, MAX_ADDITIONAL_OPTIONS)).fill(``).map(() => Array.from(ADDITIONAL_OPTIONS)[getRandomIntegerBetween(0, ADDITIONAL_OPTIONS.size - 1)][0])),
  isFavorite: Boolean(getRandomIntegerBetween(0, 1)),
});

import {ACTIVITY_EVENT_TYPES, TRANSFER_EVENT_TYPES, ALL_EVENT_TYPES, EVENT_DESTINATION, ADDITIONAL_OPTIONS} from "./config";
import {getRandomElementsFromArray} from "./utils";

const DESCRIPTION_LENGTH = 3;
const MAX_NUMBER_OF_PHOTO = 5;
const MAX_PRICE = 500;

// Для генерации более-менее логичных дат событий
const dateState = {
  timeStamp: 0,

  set startTimeStamp(startDate) {
    this.timeStamp = startDate;
  },

  get nextTimeStamp() {
    this.timeStamp += Math.floor(Math.random() * 950400) * 1000;
    return this.timeStamp;
  },
};

dateState.startTimeStamp = Date.now();

const descriptions = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];

/**
 * Функция для получения url-ов случайных фото
 *
 * @return {string} URL
 */
const getEventPhoto = () => `http://picsum.photos/248/152?r=${Math.random()}`;

/**
 * Функция возвращающая демо-данные о точках маршрута
 *
 * @return {{
 *  type: string,
 *  destination: string,
 *  photo: Array,
 *  description: string,
 *  startDate: number,
 *  endDate: number,
 *  price: number,
 *  additionalOptions: Set,
 *  isFavorite: boolean
 *  }}
 */
export const getEventData = () => ({
  type: Array.from(ALL_EVENT_TYPES)[Math.floor(Math.random() * (ACTIVITY_EVENT_TYPES.size + TRANSFER_EVENT_TYPES.size))][0],
  destination: Array.from(EVENT_DESTINATION)[Math.floor(Math.random() * EVENT_DESTINATION.size)],
  photo: new Array(Math.floor(Math.random() * MAX_NUMBER_OF_PHOTO)).fill(``).map(() => getEventPhoto()),
  description: getRandomElementsFromArray(descriptions, DESCRIPTION_LENGTH).join(` `),
  startDate: dateState.nextTimeStamp,
  endDate: dateState.nextTimeStamp,
  price: Math.floor(Math.random() * MAX_PRICE),
  additionalOptions: new Set(new Array(Math.floor(Math.random() * 3)).fill(``).map(() => Array.from(ADDITIONAL_OPTIONS)[Math.floor(Math.random() * ADDITIONAL_OPTIONS.size)][0])),
  isFavorite: Boolean(Math.round(Math.random())),
});

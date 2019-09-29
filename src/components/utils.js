import {FLATPICKR_CONFIG, KeyCode, LOCALES, TimeFormat} from "./config";
import * as ConfirmDatePlugin from "flatpickr/dist/plugins/confirmDate/confirmDate";
import * as RangePlugin from "flatpickr/dist/plugins/rangePlugin";
import flatpickr from "flatpickr";
import {globalState} from "../main";

/**
 * Функция, преобразующая timestamp в объект даты
 *
 * @param {number} timestamp
 *
 * @return {Date}
 */
const dateObgFromTimestamp = (timestamp) => new Date(timestamp);

const NAME_MONTH = new Map([
  [0, `January`],
  [1, `February`],
  [2, `March`],
  [3, `April`],
  [4, `May`],
  [5, `June`],
  [6, `July`],
  [7, `August`],
  [8, `September`],
  [9, `October`],
  [10, `November`],
  [11, `December`],
]);

const NUMBER_MONTH = new Map([
  [0, `01`],
  [1, `02`],
  [2, `03`],
  [3, `04`],
  [4, `05`],
  [5, `06`],
  [6, `07`],
  [7, `08`],
  [8, `09`],
  [9, `10`],
  [10, `11`],
  [11, `12`],
]);

/**
 * Функция, преобразующая timestamp в день месяца
 *
 * @param {number} timestamp
 *
 * @return {number}
 */
export const getDayFromTimeStamp = (timestamp) => dateObgFromTimestamp(timestamp).getDate();

/**
 * Функция, преобразующая timestamp в номер месяца
 *
 * @param {number} timestamp
 * @return {string}
 */
export const getNumberMonthFromTimeStamp = (timestamp) => NUMBER_MONTH.get(Number(dateObgFromTimestamp(timestamp).getMonth()));

/**
 * Функция, преобразующая timestamp в название месяца
 *
 * @param {number} timestamp
 * @return {string}
 */
export const getNameMonthFromTimeStamp = (timestamp) => NAME_MONTH.get(Number(dateObgFromTimestamp(timestamp).getMonth()));

/**
 * Функция, преобразующая timestamp в название месяца
 *
 * @param {number} timestamp
 * @param {number} number количество цифр с конца которое нужно вернуть
 *
 * @return {string}
 */
export const getYearFromTimeStamp = (timestamp, number = 4) => dateObgFromTimestamp(timestamp).getFullYear().toString().substr(-number);

/**
 * Функция, преобразующая timestamp во время, с учётом локали и формата
 *
 * @param {number}timestamp
 *
 * @return {string}
 */
export const getTimeFromTimeStamp = (timestamp) => dateObgFromTimestamp(timestamp).toLocaleString(LOCALES, TimeFormat);

/**
 * Функция, преобразующая timestamp в datetime для HTML
 *
 * @param {number}timestamp
 *
 * @return {string}
 */
export const getDatetimeFromTimeStamp = (timestamp) => dateObgFromTimestamp(timestamp).toISOString();

/**
 * Функция, преобразующая timestamp в строку для формы редактирования события
 *
 * @param {number}timestamp
 *
 * @return {string}
 */
export const getDateForEvenEditFromTimeStamp = (timestamp) => `${getDayFromTimeStamp(timestamp)}/${getNumberMonthFromTimeStamp(timestamp)}/${getYearFromTimeStamp(timestamp, 2)} ${getTimeFromTimeStamp(timestamp)}`;

/**
 * Функция, преобразующая timestamp в строку для списка дней
 *
 * @param {number}timestamp
 *
 * @return {string}
 */
export const getDateForEventsDayListFromTimeStamp = (timestamp) => `${getYearFromTimeStamp(timestamp)}-${getNumberMonthFromTimeStamp(timestamp)}-${getDayFromTimeStamp(timestamp)}`;

/**
 * Функция, преобразующая timestamp в строку для вывода информации о продолжительности события
 *
 * @param {number} startTimestamp timestamp начала события
 * @param {number} endTimestamp timestamp конца события
 *
 * @return {string}
 */
export const getDurationFromTimeStamps = (startTimestamp, endTimestamp) => {
  let newString = ``;

  const durationTime = dateObgFromTimestamp(endTimestamp - startTimestamp);
  const durationDays = durationTime.getUTCDate() - 1;
  const durationHours = durationTime.getUTCHours();
  const durationMinutes = durationTime.getUTCMinutes();

  if (durationDays > 0 && durationDays < 10) {
    newString += `0${durationDays}D `;
  } else if (durationDays >= 10) {
    newString += `${durationDays}D `;
  }
  if (durationHours > 0 && durationHours < 10) {
    newString += `0${durationHours}H `;
  } else if (durationHours >= 10) {
    newString += `${durationHours}H `;
  } else if (durationDays > 0) {
    newString += `00H `;
  }
  if (durationMinutes > 0 && durationMinutes < 10) {
    newString += `0${durationMinutes}M`;
  } else if (durationMinutes >= 10) {
    newString += `${durationMinutes}M`;
  } else if (durationDays > 0 || durationHours > 0) {
    newString += `00M`;
  } else {
    newString = `Flash!`;
  }

  return newString;
};

export const sortOrderEvents = {
  time: (a, b) => (a.endDate - a.startDate) - (b.endDate - b.startDate),
  price: (a, b) => a.price - b.price,
};

export const getPhotosMarkup = (photos) => {
  return photos.map((it) => `<img class="event__photo" src="${it.src}" alt="${it.description}">`).join(``);
};

export const useFlatpickr = (startInput, endInput, plugins) => {
  const flatpickrPlugins = [];
  let replaceEndDate = true;
  let flatpickrConfig = FLATPICKR_CONFIG;

  if (plugins && plugins.includes(`confirmdate`)) {
    flatpickrPlugins.push(new ConfirmDatePlugin({showAlways: false}));
    flatpickrConfig = Object.assign({}, flatpickrConfig, {plugins: [new ConfirmDatePlugin({showAlways: false})]});
  }

  if (plugins && plugins.includes(`range`)) {
    flatpickrPlugins.push(new RangePlugin({input: endInput}));
    flatpickrConfig = Object.assign({}, flatpickrConfig, {plugins: [new RangePlugin({input: endInput})]});
    replaceEndDate = false;
  }

  flatpickrConfig = Object.assign({}, flatpickrConfig, {plugins: flatpickrPlugins});

  flatpickr(startInput, flatpickrConfig);

  if (replaceEndDate) {
    flatpickr(endInput, flatpickrConfig);
  }
};

export const eventsFiltering = (filterName) => {
  let filteredEvents = null;

  switch (filterName) {
    case `everything`:
      filteredEvents = globalState.events;
      break;

    case `future`:
      filteredEvents = globalState.events.filter((it) => it.startDate > Date.now());
      break;

    case `past`:
      filteredEvents = globalState.events.filter((it) => it.startDate < Date.now());
      break;
  }

  return filteredEvents;
};

export const updateChart = (chart, labels, data) => {
  chart.data.labels = labels;
  chart.data.datasets.data = data;
  chart.update();
};

export const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export const enteredIsInteger = (evt) => {
  if ((evt.keyCode >= 48 && evt.keyCode <= 57) ||
    (evt.keyCode >= 96 && evt.keyCode <= 105) ||
    evt.keyCode === KeyCode.BACKSPACE ||
    evt.keyCode === KeyCode.HOME ||
    evt.keyCode === KeyCode.END ||
    evt.keyCode === KeyCode.DELETE ||
    evt.keyCode === KeyCode.LEFT_ARROW ||
    evt.keyCode === KeyCode.RIGHT_ARROW ||
    (evt.keyCode === KeyCode.A && (evt.ctrlKey || evt.metaKey))) {
    return true;
  }

  return false;
};

export const responseFromJSON = (response) => {
  return response.json();
};

export const generateId = (length = 8) => {
  const charset = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789`;
  let retVal = ``;

  for (let i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
};

export const objectToArray = (object) => {
  return Object.keys(object).map((id) => object[id]);
};

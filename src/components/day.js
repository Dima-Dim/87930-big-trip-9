import {getDayFromTimeStamp, getNameMonthFromTimeStamp, getYearFromTimeStamp} from "./utils";
import {getMarkupEvents} from "./event";

/**
 * Функция, возвращающая разметку дня, в течение которого происходят события
 *
 * @param {string} day Идентификатор дня, вида YYYY-MM-DD
 * @param {Array} events Массив событий, которые происходят в течение этого деня
 *
 * @return {string} HTML-код
 */
const getMarkupDay = ([day, events]) => `
<li class="trip-days__item  day">
  <div class="day__info">
    <span class="day__counter">${getDayFromTimeStamp(events[0][`startDate`])}</span>
    <time class="day__date" datetime="${day}"> ${getNameMonthFromTimeStamp(events[0][`startDate`]).substr(0, 3)} ${getYearFromTimeStamp(events[0][`startDate`], 2)}</time>
  </div>

  <ul class="trip-events__list">
    ${getMarkupEvents(events).map((it) => `
    <li class="trip-events__item">
      ${it}
    </li>`).join(``)}
  </ul>
</li>`;

/**
 * Функция, возвращающая разметку блока дней, в течение которых происходят события
 *
 * @param {Array} events Массив дней, в течение которых происходят события
 *
 * @return {string} HTML-код
 */
export const getMarkupDays = (events) => events.map((it) => getMarkupDay(it)).join(``);

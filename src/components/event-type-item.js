import {DEFAULT_CHECKED_TYPE} from "./config";

/**
 * Функция, возвращающая разметку типа события
 *
 * @param {string} idEvent Id типа события
 * @param {string} NAME Название типа события
 *
 * @return {string} HTML-код
 */
export const getMarkupEventTypeItem = ([idEvent, {NAME}]) => `
<div class="event__type-item">
  <input id="event-type-${idEvent}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${idEvent}" ${idEvent === DEFAULT_CHECKED_TYPE ? `checked` : ``}>
  <label class="event__type-label  event__type-label--${idEvent}" for="event-type-${idEvent}-1">
    ${NAME}
  </label>
</div>`;

/**
 * Функция, возвращающая разметку блока типов событий
 *
 * @param {Map} items Map-а типов событий
 *
 * @return {string} HTML-код
 */
export const getMarkupEventTypeItems = (items) => Array.from(items).map((it) => getMarkupEventTypeItem(it)).join(``);

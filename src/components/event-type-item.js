/**
 * Функция, возвращающая разметку типа события
 *
 * @param {string} idEvent Id типа события
 * @param {string} NAME Название типа события
 * @param {string} activeType Активный тип
 *
 * @return {string}
 */
export const getMarkupEventTypeItem = ([idEvent, {NAME}], activeType) => `
<div class="event__type-item">
  <input id="event-type-${idEvent}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${idEvent}" ${idEvent === activeType ? `checked` : ``}>
  <label class="event__type-label  event__type-label--${idEvent}" for="event-type-${idEvent}-1">
    ${NAME}
  </label>
</div>`;

/**
 * Функция, возвращающая разметку блока типов событий
 *
 * @param {Map} items Map-а типов событий
 * @param {string} activeType Активный тип
 *
 * @return {string} HTML-код
 */
export const getMarkupEventTypeItems = (items, activeType) => Array.from(items).map((it) => getMarkupEventTypeItem(it, activeType)).join(``);

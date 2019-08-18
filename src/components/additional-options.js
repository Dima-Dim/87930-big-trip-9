import {ADDITIONAL_OPTIONS} from "./config";

/**
 * Функция, возвращающая разметку дополнительной опции события
 *
 * @param {string} itemId Id дополнительной опции
 *
 * @return {string} HTML-код
 */
const getAdditionalOption = (itemId) => `
<li class="event__offer">
  <span class="event__offer-title">${ADDITIONAL_OPTIONS.get(itemId)[`NAME`]}</span>
  + € <span class="event__offer-price">${ADDITIONAL_OPTIONS.get(itemId)[`PRICE`]}</span>
</li>`;

/**
 * Функция, возвращающая разметку для дополнительной опции при редактировании события
 *
 * @param {string} itemId Id дополнительной опции
 * @param {Set} activeItems коллекция активных опций события
 * @param {string} NAME название дополнительной опции
 * @param {number} PRICE стоимость дополнительной опции
 *
 * @return {string} HTML-код
 */
const getEditAdditionalOption = ([itemId, {NAME, PRICE}], activeItems) => `
<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${itemId}-1" type="checkbox" name="event-offer-${itemId}" ${activeItems.has(itemId) ? `checked` : ``}>
  <label class="event__offer-label" for="event-offer-${itemId}-1">
    <span class="event__offer-title">${NAME}</span>
    + € <span class="event__offer-price">${PRICE}</span>
  </label>
</div>`;

/**
 * Функция, возвращающая разметку блока дополнительных опции события
 *
 * @param {Set} items коллекция активных опций события
 *
 * @return {string} HTML-код
 */
export const getAdditionalOptions = (items) => Array.from(items).map((it) => getAdditionalOption(it)).join(``);

/**
 * Функция, возвращающая разметку блока дополнительных опции для редактирования события
 *
 * @param {Set} items коллекция активных опций события
 *
 * @return {string} HTML-код
 */
export const getEditAdditionalOptions = (items) => Array.from(ADDITIONAL_OPTIONS).map((it) => getEditAdditionalOption(it, items)).join(``);

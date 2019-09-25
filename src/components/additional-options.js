// import {ADDITIONAL_OPTIONS} from "./config";

/**
 * Функция, возвращающая разметку дополнительной опции события
 *
 * @param {string} itemId Id дополнительной опции
 *
 * @return {string} HTML-код
 */
const getAdditionalOption = ({title, price}) => `
<li class="event__offer">
  <span class="event__offer-title">${title}</span>
  + € <span class="event__offer-price">${price}</span>
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
const getEditAdditionalOption = ({title, price, accepted}) => `
<div class="event__offer-selector">
  <input class="event__offer-checkbox visually-hidden" id="event-offer-${title}-1" type="checkbox" name="event-offer-${title}" value="${title}" ${accepted ? `checked` : ``}>
  <label class="event__offer-label" for="event-offer-${title}-1">
    <span class="event__offer-title">${title}</span>
    + € <span class="event__offer-price">${price}</span>
  </label>
</div>`;

/**
 * Функция, возвращающая разметку блока дополнительных опции события
 *
 * @param {Array} items массив всех возможных опций события
 *
 * @return {string} HTML-код
 */
export const getAdditionalOptions = (items) => items.filter((it) => it.accepted).map((it) => getAdditionalOption(it)).join(``);

/**
 * Функция, возвращающая разметку блока дополнительных опции для редактирования события
 *
 * @param {Array} items массив всех возможных опций события
 *
 * @return {string} HTML-код
 */
export const getEditAdditionalOptions = (items) => items.map((it) => getEditAdditionalOption(it)).join(``);

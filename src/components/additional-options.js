import {globalState} from "../main";

/**
 * Функция, возвращающая разметку дополнительной опции события
 *
 * @param {string} title название опции события
 * @param {string} price стоимость дополнительной опции
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
 * @param {string} title название опции события
 * @param {Set} items активна ли опция
 * @param {string} price стоимость дополнительной опции
 *
 * @return {string} HTML-код
 */
const getEditAdditionalOption = ({title, price}, items) => `
<div class="event__offer-selector">
  <input class="event__offer-checkbox visually-hidden" id="event-offer-${title}-1" type="checkbox" name="event-offer-${title}" value="${title}" ${items.has(title) ? `checked` : ``}>
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
 * @param {string} type тип события
 * @param {Array} items массив всех возможных опций события
 *
 * @return {string} HTML-код
 */
export const getEditAdditionalOptions = (type, items) => globalState.offers.find((offer) => offer.type === type).offers.map((it) => getEditAdditionalOption(it, new Set([...items.map((item) => item.title)]))).join(``);

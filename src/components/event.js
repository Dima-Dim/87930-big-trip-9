import {ACTIVITY_EVENT_TYPES, TRANSFER_EVENT_TYPES, ALL_EVENT_TYPES, EVENT_DESTINATION} from "./config";
import {getTimeFromTimeStamp, getDatetimeFromTimeStamp, getDurationFromTimeStamps, getDateForEvenEditFromTimeStamp} from "./utils";
import {events as allEvents} from "../main";
import {getAdditionalOptions, getEditAdditionalOptions} from "./additional-options";
import {getMarkupEventTypeItems} from "./event-type-item";

/**
 * Функция, возвращающая разметку события
 *
 * @param {string} type Id типа события
 * @param {string} destination Название места назначения
 * @param {number} startDate timestamp начала события
 * @param {number} endDate timestamp конца события
 * @param {number} price стоимость события
 * @param {Set} additionalOptions коллекция дополнительных опций
 *
 * @return {string} HTML-код
 */
const getMarkupEvent = ({type, destination, startDate, endDate, price, additionalOptions}) => `
<div class="event">
  <div class="event__type">
    <img class="event__type-icon" width="42" height="42" src="${ALL_EVENT_TYPES.get(type)[`ICON_URL`]}" alt="Event type icon">
  </div>
  <h3 class="event__title">${ALL_EVENT_TYPES.get(type)[`TITLE`]} ${destination}</h3>

  <div class="event__schedule">
    <p class="event__time">
      <time class="event__start-time" datetime="${getDatetimeFromTimeStamp(startDate)}">${getTimeFromTimeStamp(startDate)}</time>
      &mdash;
      <time class="event__end-time" datetime="${getDatetimeFromTimeStamp(endDate)}">${getTimeFromTimeStamp(endDate)}</time>
    </p>
    <p class="event__duration">${getDurationFromTimeStamps(startDate, endDate)}</p>
  </div>

  <p class="event__price">
    &euro; <span class="event__price-value">${price}</span>
  </p>

  <h4 class="visually-hidden">Offers:</h4>
  <ul class="event__selected-offers">
    ${getAdditionalOptions(additionalOptions)}
  </ul>

  <button class="event__rollup-btn" type="button">
    <span class="visually-hidden">Open event</span>
  </button>
</div>`;

/**
 * Функция, возвращающая разметку редактирования события
 *
 *
 * @param {string} type Id типа события
 * @param {string} destination Название места назначения
 * @param {string} description Описание события
 * @param {Array} photo Массив ссылок на изображения события
 * @param {number} startDate timestamp начала события
 * @param {number} endDate timestamp конца события
 * @param {number} price стоимость события
 * @param {Set} additionalOptions коллекция дополнительных опций
 * @param {boolean} isFavorite Является ли события избранным
 *
 * @return {string} HTML-код
 */
const getMarkupEditEvent = ({type, destination, description, photo, startDate, endDate, price, additionalOptions, isFavorite}) => `
<form class="event  event--edit" action="#" method="post">
  <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="${ALL_EVENT_TYPES.get(type)[`ICON_URL`]}" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Transfer</legend>
          
          ${getMarkupEventTypeItems(ACTIVITY_EVENT_TYPES)}

        </fieldset>

        <fieldset class="event__type-group">
          <legend class="visually-hidden">Activity</legend>

          ${getMarkupEventTypeItems(TRANSFER_EVENT_TYPES)}
          
        </fieldset>
      </div>
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        ${ALL_EVENT_TYPES.get(type)[`TITLE`]}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
      <datalist id="destination-list-1">
        ${Array.from(EVENT_DESTINATION).map((it) => `<option value="${it}"></option>`).join(``)}
      </datalist>
    </div>

    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">
        From
      </label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getDateForEvenEditFromTimeStamp(startDate)}">
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">
        To
      </label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getDateForEvenEditFromTimeStamp(endDate)}">
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">Delete</button>

    <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite ? `checked` : ``}>
    <label class="event__favorite-btn" for="event-favorite-1">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
      </svg>
    </label>

    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </header>

  <section class="event__details">

    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
      
      ${getEditAdditionalOptions(additionalOptions)}
      
      </div>
    </section>

    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${description}</p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${photo.map((it) => `<img class="event__photo" src="${it}" alt="Event photo">`).join(``)}
        </div>
      </div>
    </section>
  </section>
</form>`;

/**
 * Функция, возвращающая блок событий
 *
 * @param {Array} events Массив с информацией о событиях
 *
 * @return {Array}
 */
export const getMarkupEvents = (events) => events.map((it) => {
  if (it[`startDate`] === allEvents[0][1][0][`startDate`]) {
    return getMarkupEditEvent(it);
  }
  return getMarkupEvent(it);
});

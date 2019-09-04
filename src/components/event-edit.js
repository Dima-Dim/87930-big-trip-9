import {ACTIVITY_EVENT_TYPES, ALL_EVENT_TYPES, EVENT_DESTINATION, TRANSFER_EVENT_TYPES} from "./config";
import {getMarkupEventTypeItems} from "./event-type-item";
import {getDateForEvenEditFromTimeStamp} from "./utils";
import {getEditAdditionalOptions} from "./additional-options";
import AbstractComponent from "./abstract-component";

export default class EventEdit extends AbstractComponent {
  constructor({type, destination, startDate, endDate, price, additionalOptions, isFavorite}) {
    super();
    this._type = type;
    this._destination = destination;
    this._endDate = endDate;
    this._startDate = startDate;
    this._price = price;
    this._additionalOptions = additionalOptions;
    this._isFavorite = isFavorite;
  }

  getTemplate() {
    return `<form class="event  event--edit" action="#" method="post">
              <header class="event__header">
                <div class="event__type-wrapper">
                  <label class="event__type  event__type-btn" for="event-type-toggle-1">
                    <span class="visually-hidden">Choose event type</span>
                    <img class="event__type-icon" width="17" height="17" src="${ALL_EVENT_TYPES.get(this._type)[`ICON_URL`]}" alt="Event type icon">
                  </label>
                  <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                  <div class="event__type-list">
                    <fieldset class="event__type-group">
                      <legend class="visually-hidden">Transfer</legend>

                      ${getMarkupEventTypeItems(ACTIVITY_EVENT_TYPES, this._type)}

                    </fieldset>
            
                    <fieldset class="event__type-group">
                      <legend class="visually-hidden">Activity</legend>

                      ${getMarkupEventTypeItems(TRANSFER_EVENT_TYPES, this._type)}

                    </fieldset>
                  </div>
                </div>
            
                <div class="event__field-group  event__field-group--destination">
                  <label class="event__label  event__type-output" for="event-destination-1">
                    ${ALL_EVENT_TYPES.get(this._type)[`TITLE`]}
                  </label>
                  <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${this._destination}" list="destination-list-1">
                  <datalist id="destination-list-1">
                    ${Array.from(EVENT_DESTINATION).map((it) => `<option value="${it[0]}" ${it[0] === this._destination ? `selected` : ``}></option>`).join(``)}
                  </datalist>
                </div>
            
                <div class="event__field-group  event__field-group--time">
                  <label class="visually-hidden" for="event-start-time-1">
                    From
                  </label>
                  <input class="event__input event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${this._startDate / 1000}">
                  &mdash;
                  <label class="visually-hidden" for="event-end-time-1">
                    To
                  </label>
                  <input class="event__input event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${this._endDate / 1000}">
                </div>
            
                <div class="event__field-group  event__field-group--price">
                  <label class="event__label" for="event-price-1">
                    <span class="visually-hidden">Price</span>
                    &euro;
                  </label>
                  <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${this._price}">
                </div>
            
                <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                <button class="event__reset-btn" type="reset">Delete</button>
            
                <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${this._isFavorite ? `checked` : ``}>
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
                  
                  ${getEditAdditionalOptions(this._additionalOptions)}
                  
                  </div>
                </section>
            
                <section class="event__section  event__section--destination">
                  <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                  <p class="event__destination-description">${EVENT_DESTINATION.get(this._destination).DESCRIPTION}</p>
            
                  <div class="event__photos-container">
                    <div class="event__photos-tape">

                      ${this.getPhotosMarkup(EVENT_DESTINATION.get(this._destination).PHOTO)}

                    </div>
                  </div>
                </section>
              </section>
            </form>`;
  }

  getPhotosMarkup(photos) {
    return photos.map((it) => `<img class="event__photo" src="${it}" alt="Event photo">`).join(``);
  }
}

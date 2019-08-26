import {ALL_EVENT_TYPES} from "./config";
import {getTimeFromTimeStamp, getDatetimeFromTimeStamp, getDurationFromTimeStamps} from "./utils";
import {getAdditionalOptions} from "./additional-options";
import AbstractComponent from "./abstract-component";

export default class Event extends AbstractComponent {
  constructor({type, destination, startDate, endDate, price, additionalOptions}) {
    super();
    this._type = type;
    this._destination = destination;
    this._startDate = startDate;
    this._endDate = endDate;
    this._price = price;
    this._additionalOptions = additionalOptions;
  }

  getTemplate() {
    return `<div class="event">
              <div class="event__type">
                <img class="event__type-icon" width="42" height="42" src="${ALL_EVENT_TYPES.get(this._type)[`ICON_URL`]}" alt="Event type icon">
              </div>
              <h3 class="event__title">${ALL_EVENT_TYPES.get(this._type)[`TITLE`]} ${this._destination}</h3>
            
              <div class="event__schedule">
                <p class="event__time">
                  <time class="event__start-time" datetime="${getDatetimeFromTimeStamp(this._startDate)}">${getTimeFromTimeStamp(this._startDate)}</time>
                  &mdash;
                  <time class="event__end-time" datetime="${getDatetimeFromTimeStamp(this._endDate)}">${getTimeFromTimeStamp(this._endDate)}</time>
                </p>
                <p class="event__duration">${getDurationFromTimeStamps(this._startDate, this._endDate)}</p>
              </div>
            
              <p class="event__price">
                &euro; <span class="event__price-value">${this._price}</span>
              </p>
            
              <h4 class="visually-hidden">Offers:</h4>
              <ul class="event__selected-offers">
                ${getAdditionalOptions(this._additionalOptions)}
              </ul>
            
              <button class="event__rollup-btn" type="button">
                <span class="visually-hidden">Open event</span>
              </button>
            </div>`;
  }
}

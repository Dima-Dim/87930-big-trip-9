import {getDayFromTimeStamp, getNameMonthFromTimeStamp, getYearFromTimeStamp} from "./utils";
import AbstractComponent from "./abstract-component";

export default class Day extends AbstractComponent {
  constructor([day, events]) {
    super();
    this._events = events;
    this._day = day;
  }

  getTemplate() {
    return `<li class="trip-days__item  day">
              <div class="day__info">
                <span class="day__counter">${getDayFromTimeStamp(this._events[0][`startDate`])}</span>
                <time class="day__date" datetime="${this._day}"> ${getNameMonthFromTimeStamp(this._events[0][`startDate`]).substr(0, 3)} ${getYearFromTimeStamp(this._events[0][`startDate`], 2)}</time>
              </div>
            
              <ul class="trip-events__list">
                <li class="trip-events__item">
                  
                </li>
              </ul>
              
            </li>`;
  }
}

import {elementTemplate, getDayFromTimeStamp, getNameMonthFromTimeStamp, getYearFromTimeStamp, renderElement} from "./utils";
import {renderEvent} from "./event";

class Day extends elementTemplate {
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

/**
 * Функция для создания экземпляра класса и отправка его на рендеринг
 *
 * @param {string|Element} container Информация о контейнере, в который необходимо поместить элемент
 * @param {Array} content Массив данных на основании которых необходимо подготовить элемент
 * @param {"append"|"prepend"} position Позиция вставки элемента, относительно контейнера, в который он вставляется
 */
export const renderDays = (container, content, position) => {
  for (const item of content) {
    const day = new Day(item);

    renderElement(container, day.getElement(), position);

    for (const event of day._events) {
      renderEvent(day.getElement().querySelector(`.trip-events__item`), event, `append`);
    }
  }
};

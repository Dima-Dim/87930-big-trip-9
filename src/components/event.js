import {ALL_EVENT_TYPES, CONTAINER_SELECTORS} from "./config";
import {getTimeFromTimeStamp, getDatetimeFromTimeStamp, getDurationFromTimeStamps, elementTemplate, renderElement} from "./utils";
import {EventEdit} from "./event-edit";
import {getAdditionalOptions} from "./additional-options";

class Event extends elementTemplate {
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

/**
 * Функция для создания экземпляра класса и отправка его на рендеринг
 *
 * @param {string|Element} container Информация о контейнере, в который необходимо поместить элемент
 * @param {Array} content Массив данных на основании которых необходимо подготовить элемент
 * @param {"append"|"prepend"} position Позиция вставки элемента, относительно контейнера, в который он вставляется
 */
export const renderEvent = (container, content, position) => {
  const event = new Event(content);
  const eventEdit = new EventEdit(content);
  const eventRollupBtn = event.getElement().querySelector(`${CONTAINER_SELECTORS.EVENT_ROLLUP_BTN}`);
  const eventEditRollupBtn = eventEdit.getElement().querySelector(`${CONTAINER_SELECTORS.EVENT_ROLLUP_BTN}`);
  const eventEditSaveBtn = eventEdit.getElement().querySelector(`${CONTAINER_SELECTORS.EVENT_SAVE_BTN}`);

  const closingRollupHandler = () => {
    eventEditRollupBtn.removeEventListener(`click`, onClickEditRollupBtn);
    eventEditSaveBtn.removeEventListener(`click`, onClickEditRollupBtn);
    container.replaceChild(event.getElement(), eventEdit.getElement());
    eventRollupBtn.addEventListener(`click`, onClickRollupBtn);
    document.removeEventListener(`click`, onClickDifferentRollupBtn);
  };

  const openingRollupHandler = () => {
    eventRollupBtn.removeEventListener(`click`, onClickRollupBtn);
    container.replaceChild(eventEdit.getElement(), event.getElement());
    eventEditRollupBtn.addEventListener(`click`, onClickEditRollupBtn);
    eventEditSaveBtn.addEventListener(`click`, onClickEditRollupBtn);
    document.addEventListener(`click`, onClickDifferentRollupBtn);
  };

  const onClickRollupBtn = () => {
    openingRollupHandler();
  };

  const onClickEditRollupBtn = () => {
    closingRollupHandler();
  };

  const onClickDifferentRollupBtn = (evt) => {
    const target = evt.target;
    if (!target.closest(`${CONTAINER_SELECTORS.EVENT_ROLLUP_BTN}`) || event.getElement().contains(target)) {
      return;
    }

    closingRollupHandler();
  };

  eventRollupBtn.addEventListener(`click`, onClickRollupBtn);

  renderElement(container, event.getElement(), position);
};

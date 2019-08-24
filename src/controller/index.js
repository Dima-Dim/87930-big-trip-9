import {ADDITIONAL_OPTIONS, CONTAINER_SELECTORS, FILTERS, MENU, SORT} from "../components/config";
import {renderElement} from "../components/utils";
import {TripInfo} from "../components/trip-info";
import {Menu} from "../components/menu";
import {Filters} from "../components/filter";
import {TripSort} from "../components/trip-sort";
import {Day} from "../components/day";
import {Event} from "../components/event";
import {EventEdit} from "../components/event-edit";

export class Index {
  constructor(days) {
    this._days = days;
    this._tripInfo = new TripInfo(days);
    this._menu = new Menu(Array.from(MENU));
    this._filters = new Filters(Array.from(FILTERS));
    this._tripSort = new TripSort(Array.from(SORT));
  }

  init() {
    renderElement(`.${CONTAINER_SELECTORS.TRIP_INFO}`, this._tripInfo.getElement(), `prepend`);
    renderElement(`.${CONTAINER_SELECTORS.TRIP_MENU}`, this._menu.getElement(), `insertAfter`);
    renderElement(`.${CONTAINER_SELECTORS.TRIP_CONTROLS}`, this._filters.getElement(), `append`);
    renderElement(`.${CONTAINER_SELECTORS.TRIP_EVENTS}`, this._tripSort.getElement(), `append`);
    this._renderDays(`.${CONTAINER_SELECTORS.TRIP_EVENTS}`, Array.from(this._days), `append`);
    Index._calculationTotalCost(this._days);
  }

  _renderDays(container, days, position) {
    for (const it of days) {
      const day = new Day(it);

      renderElement(container, day.getElement(), position);
      this._renderEvents(day.getElement().querySelector(`.trip-events__item`), day._events, `append`);
    }
  }

  _renderEvents(container, events, position) {
    for (const it of events) {
      const event = new Event(it);
      const eventEdit = new EventEdit(it);
      const eventRollupBtn = event.getElement().querySelector(`.${CONTAINER_SELECTORS.EVENT_ROLLUP_BTN}`);
      const eventEditRollupBtn = eventEdit.getElement().querySelector(`.${CONTAINER_SELECTORS.EVENT_ROLLUP_BTN}`);
      const eventEditSaveBtn = eventEdit.getElement().querySelector(`.${CONTAINER_SELECTORS.EVENT_SAVE_BTN}`);

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
        if (!target.closest(`.${CONTAINER_SELECTORS.EVENT_ROLLUP_BTN}`) || event.getElement().contains(target)) {
          return;
        }

        closingRollupHandler();
      };

      eventRollupBtn.addEventListener(`click`, onClickRollupBtn);

      renderElement(container, event.getElement(), position);
    }
  }

  static _calculationTotalCost(costItems) {
    const totalCostElement = document.querySelector(`.${CONTAINER_SELECTORS.TRIP_TOTAL_COST}`);
    let totalCost = 0;

    for (let i of costItems) {
      for (let j of i[1]) {
        totalCost += j[`price`];
        if (j[`additionalOptions`].size > 0) {
          for (let k of j[`additionalOptions`]) {
            totalCost += Number(ADDITIONAL_OPTIONS.get(k)[`PRICE`]);
          }
        }
      }
    }

    totalCostElement.textContent = totalCost.toString();
  }
}

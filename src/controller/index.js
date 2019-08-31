import {DEFAULT_SORT_EVENTS, ADDITIONAL_OPTIONS, CONTAINER_SELECTORS, FILTERS, MENU, SORT, KeyCode} from "../components/config";
import AbstractComponent from "../components/abstract-component";
import TripInfo from "../components/trip-info";
import Menu from "../components/menu";
import Filters from "../components/filter";
import TripSort from "../components/trip-sort";
import Day from "../components/day";
import Event from "../components/event";
import EventEdit from "../components/event-edit";
import NoDays from "../components/no-days";
import TripSortItem from "../components/trip-sort-item";
import {sortOrderEvents} from "../components/utils";

export class Index {
  constructor(days) {
    this._days = days;
    this._sortedEvents = [];
    this._tripInfo = new TripInfo(days);
    this._menu = new Menu(Array.from(MENU));
    this._filters = new Filters(Array.from(FILTERS));
    this._noDays = new NoDays();
    this._state = {
      sort: DEFAULT_SORT_EVENTS,
    };
  }

  init() {
    AbstractComponent.renderElement(`.${CONTAINER_SELECTORS.TRIP_INFO}`, this._tripInfo.getElement(), `prepend`);
    AbstractComponent.renderElement(`.${CONTAINER_SELECTORS.TRIP_MENU}`, this._menu.getElement(), `insertAfter`);
    AbstractComponent.renderElement(`.${CONTAINER_SELECTORS.TRIP_CONTROLS}`, this._filters.getElement(), `append`);
    this._renderDays(`.${CONTAINER_SELECTORS.TRIP_EVENTS}`, Array.from(this._days), `append`);
    Index._calculationTotalCost(this._days);
  }

  _changeEventOrder(type) {
    this._sortedEvents = [];
    document.querySelector(`.${CONTAINER_SELECTORS.TRIP_EVENTS}`).textContent = ``;
    if (type === DEFAULT_SORT_EVENTS) {
      this._renderDays(`.${CONTAINER_SELECTORS.TRIP_EVENTS}`, Array.from(this._days), `append`);
    } else {
      this._days.forEach((day) => day[1].forEach((dayItem) => this._sortedEvents.push(dayItem)));
      this._sortedEvents.sort(sortOrderEvents[this._state.sort]);
      this._renderDays(`.${CONTAINER_SELECTORS.TRIP_EVENTS}`, [[0, this._sortedEvents]], `append`);
    }
  }

  _renderSort() {
    const tripSort = new TripSort(this._state.sort);
    AbstractComponent.renderElement(`.${CONTAINER_SELECTORS.TRIP_EVENTS}`, tripSort.getElement(this._state.sort), `append`);

    Array.from(SORT).forEach((it) => {
      const tripSortItem = new TripSortItem(it, this._state.sort);

      const onChangeTripSortItem = (evt) => {
        tripSortItem.getElement().removeEventListener(`change`, onChangeTripSortItem);
        this._state.sort = evt.target.dataset.type;
        this._changeEventOrder(this._state.sort);
      };

      tripSortItem.getElement().addEventListener(`change`, onChangeTripSortItem);

      AbstractComponent.renderElement(tripSort.getElement().lastElementChild, tripSortItem.getElement(), `insertBefore`);
    });
  }

  _renderDays(container, days, position) {
    if (days.length) {
      this._renderSort();

      for (const it of days) {
        const day = new Day(it);

        AbstractComponent.renderElement(container, day.getElement(), position);
        this._renderEvents(day.getElement().querySelector(`.trip-events__item`), day._events, `append`);
      }
    } else {
      AbstractComponent.renderElement(`.${CONTAINER_SELECTORS.TRIP_EVENTS}`, this._noDays.getElement(), `append`);
    }
  }

  _renderEvents(container, events, position) {
    for (const it of events) {
      const event = new Event(it);
      const eventEdit = new EventEdit(it);
      const inputs = eventEdit.getElement().querySelectorAll(`input, textarea`);
      const eventRollupBtn = event.getElement().querySelector(`.${CONTAINER_SELECTORS.EVENT_ROLLUP_BTN}`);
      const eventEditRollupBtn = eventEdit.getElement().querySelector(`.${CONTAINER_SELECTORS.EVENT_ROLLUP_BTN}`);
      const eventEditSaveBtn = eventEdit.getElement().querySelector(`.${CONTAINER_SELECTORS.EVENT_SAVE_BTN}`);

      const closingRollupHandler = () => {
        eventEditRollupBtn.removeEventListener(`click`, onClickEditRollupBtn);
        eventEditSaveBtn.removeEventListener(`click`, onClickEditRollupBtn);
        container.replaceChild(event.getElement(), eventEdit.getElement());
        eventRollupBtn.addEventListener(`click`, onClickRollupBtn);
        document.removeEventListener(`keydown`, onEscDownRollup);
        document.removeEventListener(`click`, onClickDifferentRollupBtn);
      };

      const openingRollupHandler = () => {
        eventRollupBtn.removeEventListener(`click`, onClickRollupBtn);
        container.replaceChild(eventEdit.getElement(), event.getElement());
        for (const input of inputs) {
          input.addEventListener(`focus`, onFocusInput);
        }
        eventEditRollupBtn.addEventListener(`click`, onClickEditRollupBtn);
        eventEditSaveBtn.addEventListener(`click`, onClickEditRollupBtn);
        document.addEventListener(`keydown`, onEscDownRollup);
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

      const onEscDownRollup = (evt) => {
        const key = evt.keyCode;
        if (key === KeyCode.ESC) {
          closingRollupHandler();
        }
      };

      const onFocusInput = () => {
        document.removeEventListener(`keydown`, onEscDownRollup);
        for (const input of inputs) {
          input.addEventListener(`blur`, onBlurInput);
        }
      };

      const onBlurInput = () => {
        document.addEventListener(`keydown`, onEscDownRollup);
      };

      eventRollupBtn.addEventListener(`click`, onClickRollupBtn);

      AbstractComponent.renderElement(container, event.getElement(), position);
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

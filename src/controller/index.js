import {DEFAULT_SORT_EVENTS, SORT_ID_PREFIX, ADDITIONAL_OPTIONS, IdElements, ClassesElements, FILTERS} from "../components/config";
import AbstractComponent from "../components/abstract-component";
import TripInfo from "../components/trip-info";
import Filters from "../components/filter";
import TripSort from "../components/trip-sort";
import Day from "../components/day";
import NoDays from "../components/no-days";
import {getDateForEventsDayListFromTimeStamp, sortOrderEvents} from "../components/utils";
import EventController from "./event-controller";
import MenuController from "./menu-controller";
import DaysContainer from "../components/days-container";
import EventAddController from "./event-add-controller";
import StatisticsController from "./statistics-controller";

export class Index {
  constructor(events) {
    this._events = events;
    this._days = this._getDays(events);
    this._sortedEvents = [];
    this._tripInfo = new TripInfo(this._days);
    this._menuController = new MenuController(this.onChangeView.bind(this));
    this._statisticsController = new StatisticsController(`.${ClassesElements.TRIP_EVENTS}`, this._events);
    this._filters = new Filters(Array.from(FILTERS));
    this._tripSort = new TripSort(DEFAULT_SORT_EVENTS, this._onChangeTripSortItem.bind(this));
    this._daysContainer = new DaysContainer();
    this._noDays = new NoDays();
    this._onDataChange = this._onDataChange.bind(this);
    this._pages = new Map([
      [IdElements.MENU_LINK_TABLE, [this._filters, this._daysContainer, this._tripSort]],
      [IdElements.MENU_LINK_STATS, [this._statisticsController]],
    ]);
    this._state = {
      sort: DEFAULT_SORT_EVENTS,
      page: IdElements.MENU_LINK_TABLE,
      adding: null,
      editing: null,
    };
  }

  _getDays(events) {
    let days = new Set();
    for (let i of events) {
      days.add(getDateForEventsDayListFromTimeStamp(i[`startDate`]));
    }

    days = Array.from(days).sort((a, b) => Date.parse(a) - Date.parse(b));

    return new Map([...days.map((it) => [it, events.filter((item) => it === getDateForEventsDayListFromTimeStamp(item[`startDate`]))])]);
  }

  init() {
    AbstractComponent.renderElement(`.${ClassesElements.TRIP_INFO}`, this._tripInfo.getElement(), `prepend`);
    AbstractComponent.renderElement(`.${ClassesElements.TRIP_CONTROLS}`, this._filters.getElement());
    AbstractComponent.renderElement(`.${ClassesElements.TRIP_EVENTS}`, this._daysContainer.getElement());
    this._renderDays(this._daysContainer.getElement(), Array.from(this._days));
    Index._calculationTotalCost(this._days);
    this._menuController.init();
    this._statisticsController.init();

    const eventAddBtn = document.querySelector(`.${ClassesElements.TRIP_EVENT_ADD}`);

    const onClickEventAddBtn = () => {
      if (!this._state.adding) {
        if (this._state.editing) {
          this._state.editing();
          this._state.editing = false;
        }
        const newEvent = new EventAddController(this._onDataChange, this._state);
        newEvent.init(this._daysContainer.getElement());
      }
    };

    eventAddBtn.addEventListener(`click`, onClickEventAddBtn);
  }

  onChangeView(activeMenuItem) {
    this._pages.get(this._state.page).forEach((it) => it.hide());
    this._state.page = activeMenuItem;
    this._pages.get(this._state.page).forEach((it) => it.show(this._events));
  }

  _changeEventOrder(type = DEFAULT_SORT_EVENTS) {
    this._daysContainer.getElement().textContent = ``;
    this._sortedEvents = [];

    if (type === DEFAULT_SORT_EVENTS) {
      this._renderDays(this._daysContainer.getElement(), Array.from(this._days));
    } else {
      Array.from(this._days).forEach((day) => day[1].forEach((dayItem) => this._sortedEvents.push(dayItem)));
      this._sortedEvents.sort(sortOrderEvents[this._state.sort.slice(SORT_ID_PREFIX.length)]);
      this._renderDays(this._daysContainer.getElement(), [[0, this._sortedEvents]]);
    }
  }

  _onChangeTripSortItem(activeSortItem) {
    this._state.sort = activeSortItem;
    this._changeEventOrder(this._state.sort);
  }

  _renderDays(container, days, position) {
    if (days.length) {
      this._tripSort.init();

      for (const it of days) {
        const day = new Day(it);

        AbstractComponent.renderElement(container, day.getElement(), position);
        this._renderEvents(day.getElement().querySelector(`.trip-events__item`), day._events);
      }
    } else {
      AbstractComponent.renderElement(`.${ClassesElements.TRIP_EVENTS}`, this._noDays.getElement());
    }
  }

  _renderEvents(container, events, position) {
    for (const it of events) {
      const event = new EventController(container, it, this._onDataChange, this._state, position);
      event.init();
    }
  }

  _onDataChange(currentData, newData) {
    const eventId = this._events.findIndex((it) => it === currentData);

    if (!newData) {
      this._events = [...this._events.slice(0, eventId), ...this._events.slice(eventId + 1)];
    } else if (!currentData) {
      this._events.push(newData);
    } else {
      this._events[eventId] = newData;
    }

    this._days = this._getDays(this._events);
    this._changeEventOrder();
    this._state.editing = null;
    this._state.adding = null;
  }

  static _calculationTotalCost(costItems) {
    const totalCostElement = document.querySelector(`.${ClassesElements.TRIP_TOTAL_COST}`);
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

import {DEFAULT_SORT_EVENTS, ADDITIONAL_OPTIONS, ClassesElements, FILTERS, MENU, SORT} from "../components/config";
import AbstractComponent from "../components/abstract-component";
import TripInfo from "../components/trip-info";
import Menu from "../components/menu";
import Filters from "../components/filter";
import TripSort from "../components/trip-sort";
import Day from "../components/day";
import NoDays from "../components/no-days";
import TripSortItem from "../components/trip-sort-item";
import {getDateForEventsDayListFromTimeStamp, sortOrderEvents} from "../components/utils";
import PointController from "./point-controller";

export class Index {
  constructor(events) {
    this._events = events;
    this._days = this._getDays(events);
    this._sortedEvents = [];
    this._tripInfo = new TripInfo(this._days);
    this._menu = new Menu(Array.from(MENU));
    this._filters = new Filters(Array.from(FILTERS));
    this._noDays = new NoDays();
    this._onDataChange = this._onDataChange.bind(this);
    this._state = {
      sort: DEFAULT_SORT_EVENTS,
    };
  }

  _getDays(events) {
    let days = new Set();
    for (let i of events) {
      days.add(getDateForEventsDayListFromTimeStamp(i[`startDate`]));
    }
    return new Map([...Array.from(days).map((it) => [it, events.filter((item) => it === getDateForEventsDayListFromTimeStamp(item[`startDate`]))])]);
  }

  init() {
    AbstractComponent.renderElement(`.${ClassesElements.TRIP_INFO}`, this._tripInfo.getElement(), `prepend`);
    AbstractComponent.renderElement(`.${ClassesElements.TRIP_MENU}`, this._menu.getElement(), `insertAfter`);
    AbstractComponent.renderElement(`.${ClassesElements.TRIP_CONTROLS}`, this._filters.getElement(), `append`);
    this._renderDays(`.${ClassesElements.TRIP_EVENTS}`, Array.from(this._days), `append`);
    Index._calculationTotalCost(this._days);
  }

  _changeEventOrder(type = DEFAULT_SORT_EVENTS) {
    this._sortedEvents = [];
    document.querySelector(`.${ClassesElements.TRIP_EVENTS}`).textContent = ``;
    if (type === DEFAULT_SORT_EVENTS) {
      this._renderDays(`.${ClassesElements.TRIP_EVENTS}`, Array.from(this._days), `append`);
    } else {
      Array.from(this._days).forEach((day) => day[1].forEach((dayItem) => this._sortedEvents.push(dayItem)));
      this._sortedEvents.sort(sortOrderEvents[this._state.sort]);
      this._renderDays(`.${ClassesElements.TRIP_EVENTS}`, [[0, this._sortedEvents]], `append`);
    }
  }

  _renderSort() {
    const tripSort = new TripSort(this._state.sort);
    AbstractComponent.renderElement(`.${ClassesElements.TRIP_EVENTS}`, tripSort.getElement(this._state.sort), `append`);

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
      AbstractComponent.renderElement(`.${ClassesElements.TRIP_EVENTS}`, this._noDays.getElement(), `append`);
    }
  }

  _renderEvents(container, events, position) {
    for (const it of events) {
      const event = new PointController(container, it, this._onDataChange, position);
      event.init();
    }
  }

  _onDataChange(currentData, newData) {
    this._events[this._events.findIndex((it) => it === currentData)] = newData;
    this._days = this._getDays(this._events);
    this._changeEventOrder();
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

import Event from "../components/event";
import EventEdit from "../components/event-edit";
import {ClassesElements, KeyCode, FLATPICKR_CONFIG, ALL_EVENT_TYPES, EVENT_DESTINATION} from "../components/config";
import {getDateForEvenEditFromTimeStamp} from "../components/utils";
import AbstractComponent from "../components/abstract-component";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import * as RangePlugin from "flatpickr/dist/plugins/rangePlugin";
import * as ConfirmDatePlugin from "flatpickr/dist/plugins/confirmDate/confirmDate";

export default class PointController {
  constructor(container, data, onDataChange, position) {
    this._container = container;
    this._event = data;
    this._position = position;
    this._onDataChange = onDataChange;
    this._flatpickr = true;
    this._flatpickrPlugins = new Set([`range`, `confirmdate`]);
  }

  init() {
    const event = new Event(this._event);
    const eventEdit = new EventEdit(this._event);
    const inputs = eventEdit.getElement().querySelectorAll(`input, textarea`);
    const eventRollupOpenBtn = event.getElement().querySelector(`.${ClassesElements.EVENT_ROLLUP_BTN}`);
    const eventEditRollupCloseBtn = eventEdit.getElement().querySelector(`.${ClassesElements.EVENT_ROLLUP_BTN}`);
    const eventEditInputList = eventEdit.getElement().querySelector(`.${ClassesElements.EVENT_TYPE_INPUT_LIST}`);
    const eventEditEventTypeIcon = eventEdit.getElement().querySelector(`.${ClassesElements.EVENT_TYPE_ICON}`);
    const eventEditEventTypeOutput = eventEdit.getElement().querySelector(`.${ClassesElements.EVENT_TYPE_OUTPUT}`);
    const eventEditEventDestinationInput = eventEdit.getElement().querySelector(`.${ClassesElements.EVENT_DESTINATION_INPUT}`);
    const eventEditEventDestinationDescription = eventEdit.getElement().querySelector(`.${ClassesElements.EVENT_DESTINATION_DESCRIPTION}`);
    const eventEditEventDestinationPhotosContainer = eventEdit.getElement().querySelector(`.${ClassesElements.EVENT_DESTINATION_PHOTOS_CONTAINER}`);
    const eventEditOffers = eventEdit.getElement().querySelector(`.${ClassesElements.EVENT_OFFER_CHECKBOX_CONTAINER}`);
    const eventEditStartTimeInput = eventEdit.getElement().querySelector(`.${ClassesElements.EVENT_TIME_INPUT}[name="event-start-time"]`);
    const eventEditEndTimeInput = eventEdit.getElement().querySelector(`.${ClassesElements.EVENT_TIME_INPUT}[name="event-end-time"]`);
    const eventEditFavoriteInput = eventEdit.getElement().querySelector(`.${ClassesElements.EVENT_FAVORITE_INPUT}`);
    const eventEditTypeInput = eventEdit.getElement().querySelector(`.${ClassesElements.EVENT_TYPE_INPUT}`);

    const useFlatpickr = (plugins) => {
      const flatpickrPlugins = [];
      let replaceEndDate = true;
      let flatpickrConfig = FLATPICKR_CONFIG;

      if (plugins && plugins.includes(`confirmdate`)) {
        flatpickrPlugins.push(new ConfirmDatePlugin({showAlways: false}));
        flatpickrConfig = Object.assign({}, flatpickrConfig, {plugins: [new ConfirmDatePlugin({showAlways: false})]});
      }

      if (plugins && plugins.includes(`range`)) {
        flatpickrPlugins.push(new RangePlugin({input: eventEditEndTimeInput}));
        flatpickrConfig = Object.assign({}, flatpickrConfig, {plugins: [new RangePlugin({input: eventEditEndTimeInput})]});
        replaceEndDate = false;
      }

      flatpickrConfig = Object.assign({}, flatpickrConfig, {plugins: flatpickrPlugins});

      flatpickr(eventEditStartTimeInput, flatpickrConfig);

      if (replaceEndDate) {
        flatpickr(eventEditEndTimeInput, flatpickrConfig);
      }
    };

    if (this._flatpickr && this._flatpickrPlugins) {
      useFlatpickr(Array.from(this._flatpickrPlugins));
    } else if (this._flatpickr) {
      useFlatpickr();
    } else {
      eventEditStartTimeInput.value = getDateForEvenEditFromTimeStamp(this._event.startDate);
      eventEditEndTimeInput.value = getDateForEvenEditFromTimeStamp(this._event.endDate);
    }

    const closingRollupHandler = () => {
      eventEditRollupCloseBtn.removeEventListener(`click`, onClickEditRollupBtn);
      eventEditInputList.removeEventListener(`change`, onChangeEventType);
      for (const input of inputs) {
        input.removeEventListener(`focus`, onFocusInput);
      }
      eventEdit.getElement().removeEventListener(`submit`, onSubmitForm);
      this._container.replaceChild(event.getElement(), eventEdit.getElement());
      eventRollupOpenBtn.addEventListener(`click`, onClickRollupBtn);
      document.removeEventListener(`keydown`, onEscDownRollup);
      document.removeEventListener(`click`, onClickDifferentRollupBtn);
    };

    const openingRollupHandler = () => {
      eventRollupOpenBtn.removeEventListener(`click`, onClickRollupBtn);
      this._container.replaceChild(eventEdit.getElement(), event.getElement());
      for (const input of inputs) {
        input.addEventListener(`focus`, onFocusInput);
      }
      eventEditRollupCloseBtn.addEventListener(`click`, onClickEditRollupBtn);
      eventEditInputList.addEventListener(`change`, onChangeEventType);
      eventEditEventDestinationInput.addEventListener(`change`, onChangeEventDescription);
      eventEdit.getElement().addEventListener(`submit`, onSubmitForm);
      document.addEventListener(`keydown`, onEscDownRollup);
      document.addEventListener(`click`, onClickDifferentRollupBtn);
    };

    const onClickRollupBtn = () => {
      openingRollupHandler();
    };

    const onClickEditRollupBtn = () => {
      closingRollupHandler();
    };

    const onChangeEventType = () => {
      const newEventType = eventEditInputList.querySelector(`input:checked`).value;
      eventEditEventTypeIcon.src = ALL_EVENT_TYPES.get(newEventType)[`ICON_URL`];
      eventEditEventTypeOutput.textContent = ALL_EVENT_TYPES.get(newEventType)[`TITLE`];
    };

    const onChangeEventDescription = () => {
      const newDestination = eventEditEventDestinationInput.value;
      eventEditEventDestinationDescription.textContent = EVENT_DESTINATION.get(newDestination).DESCRIPTION;
      eventEditEventDestinationPhotosContainer.innerHTML = eventEdit.getPhotosMarkup(EVENT_DESTINATION.get(newDestination).PHOTO);
    };

    const onClickDifferentRollupBtn = (evt) => {
      const target = evt.target;
      if (!target.closest(`.${ClassesElements.EVENT_ROLLUP_BTN}`) || event.getElement().contains(target)) {
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

    const onSubmitForm = (evt) => {
      evt.preventDefault();
      const form = new FormData(eventEdit.getElement());
      const offers = new Set();
      const checkerOffers = () => {
        eventEditOffers.querySelectorAll(`input:checked`).forEach((it) => offers.add(it.value));
      };
      checkerOffers();

      const entry = {
        destination: form.get(`event-destination`),
        price: Number(form.get(`event-price`)),
        additionalOptions: offers,
        startDate: this._flatpickrPlugins && this._flatpickrPlugins.has(`range`) ? Number(eventEditStartTimeInput.value.slice(0, 10) * 1000) : Number(eventEditStartTimeInput.value * 1000),
        endDate: this._flatpickrPlugins && this._flatpickrPlugins.has(`range`) ? Number(eventEditStartTimeInput.value.slice(-10) * 1000) : Number(eventEditEndTimeInput.value * 1000),
        isFavorite: eventEditFavoriteInput.checked,
        type: eventEditTypeInput.querySelector(`input:checked`).value,
      };

      this._onDataChange(this._event, entry);
    };

    eventRollupOpenBtn.addEventListener(`click`, onClickRollupBtn);

    AbstractComponent.renderElement(this._container, event.getElement(), this._position);
  }
}

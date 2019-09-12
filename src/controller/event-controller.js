import Event from "../components/event";
import EventEdit from "../components/event-edit";
import {ClassesElements, KeyCode, ALL_EVENT_TYPES, EVENT_DESTINATION} from "../components/config";
import {getDateForEvenEditFromTimeStamp, getPhotosMarkup, useFlatpickr} from "../components/utils";
import AbstractComponent from "../components/abstract-component";
import "flatpickr/dist/flatpickr.min.css";

export default class EventController {
  constructor(container, data, onDataChange, globalState, position) {
    this._container = container;
    this._event = data;
    this._position = position;
    this._onDataChange = onDataChange;
    this._globalState = globalState;
    this._flatpickr = {
      active: true,
      plugins: new Set([`range`, `confirmdate`]),
    };
  }

  init() {
    const event = new Event(this._event);
    const eventEdit = new EventEdit(this._event);
    const inputs = eventEdit.getElement().querySelectorAll(`input, textarea`);
    const eventRollupOpenBtn = event.getElement().querySelector(`.${ClassesElements.EVENT_ROLLUP_BTN}`);
    const eventEditRollupCloseBtn = eventEdit.getElement().querySelector(`.${ClassesElements.EVENT_ROLLUP_BTN}`);
    const eventEditInputList = eventEdit.getElement().querySelector(`.${ClassesElements.EVENT_TYPE_INPUT_LIST}`);
    const eventEditTypeIcon = eventEdit.getElement().querySelector(`.${ClassesElements.EVENT_TYPE_ICON}`);
    const eventEditTypeOutput = eventEdit.getElement().querySelector(`.${ClassesElements.EVENT_TYPE_OUTPUT}`);
    const eventEditDestinationInput = eventEdit.getElement().querySelector(`.${ClassesElements.EVENT_DESTINATION_INPUT}`);
    const eventEditDestinationDescription = eventEdit.getElement().querySelector(`.${ClassesElements.EVENT_DESTINATION_DESCRIPTION}`);
    const eventEditDestinationPhotosContainer = eventEdit.getElement().querySelector(`.${ClassesElements.EVENT_DESTINATION_PHOTOS_CONTAINER}`);
    const eventEditOffers = eventEdit.getElement().querySelector(`.${ClassesElements.EVENT_OFFER_CHECKBOX_CONTAINER}`);
    const eventEditStartTimeInput = eventEdit.getElement().querySelector(`.${ClassesElements.EVENT_TIME_INPUT}[name="event-start-time"]`);
    const eventEditEndTimeInput = eventEdit.getElement().querySelector(`.${ClassesElements.EVENT_TIME_INPUT}[name="event-end-time"]`);
    const eventEditFavoriteInput = eventEdit.getElement().querySelector(`.${ClassesElements.EVENT_FAVORITE_INPUT}`);
    const eventEditTypeInput = eventEdit.getElement().querySelector(`.${ClassesElements.EVENT_TYPE_INPUT}`);
    const eventEditDeleteBtn = eventEdit.getElement().querySelector(`.${ClassesElements.EVENT_DELETE_BTN}`);

    if (this._flatpickr.active && this._flatpickr.plugins) {
      useFlatpickr(eventEditStartTimeInput, eventEditEndTimeInput, Array.from(this._flatpickr.plugins));
    } else if (this._flatpickr.active) {
      useFlatpickr(eventEditStartTimeInput, eventEditEndTimeInput);
    } else {
      eventEditStartTimeInput.value = getDateForEvenEditFromTimeStamp(this._event.startDate);
      eventEditEndTimeInput.value = getDateForEvenEditFromTimeStamp(this._event.endDate);
    }

    const closingRollupHandler = () => {
      eventEditRollupCloseBtn.removeEventListener(`click`, onClickEditRollupBtn);
      eventEditInputList.removeEventListener(`change`, onChangeEventType);
      eventEditDestinationInput.removeEventListener(`change`, onChangeEventDescription);
      for (const input of inputs) {
        input.removeEventListener(`focus`, onFocusInput);
      }
      eventEditDeleteBtn.removeEventListener(`click`, onClickDeleteBtn);
      eventEdit.getElement().removeEventListener(`submit`, onSubmitForm);
      this._container.replaceChild(event.getElement(), eventEdit.getElement());
      eventRollupOpenBtn.addEventListener(`click`, onClickRollupBtn);
      document.removeEventListener(`keydown`, onEscDownRollup);
      this._globalState.editing = false;
    };

    const openingRollupHandler = () => {
      if (this._globalState.adding) {
        this._globalState.adding();
        this._globalState.adding = false;
      }
      if (this._globalState.editing) {
        this._globalState.editing();
      }
      this._globalState.editing = closingRollupHandler.bind(this);
      eventRollupOpenBtn.removeEventListener(`click`, onClickRollupBtn);
      this._container.replaceChild(eventEdit.getElement(), event.getElement());
      for (const input of inputs) {
        input.addEventListener(`focus`, onFocusInput);
      }
      eventEditRollupCloseBtn.addEventListener(`click`, onClickEditRollupBtn);
      eventEditInputList.addEventListener(`change`, onChangeEventType);
      eventEditDestinationInput.addEventListener(`change`, onChangeEventDescription);
      eventEditDeleteBtn.addEventListener(`click`, onClickDeleteBtn);
      eventEdit.getElement().addEventListener(`submit`, onSubmitForm);
      document.addEventListener(`keydown`, onEscDownRollup);
    };

    const onClickRollupBtn = () => {
      openingRollupHandler();
    };

    const onClickEditRollupBtn = () => {
      closingRollupHandler();
    };

    const onChangeEventType = () => {
      const newEventType = eventEditInputList.querySelector(`input:checked`).value;
      eventEditTypeIcon.src = ALL_EVENT_TYPES.get(newEventType)[`ICON_URL`];
      eventEditTypeOutput.textContent = ALL_EVENT_TYPES.get(newEventType)[`TITLE`];
    };

    const onChangeEventDescription = () => {
      const newDestination = eventEditDestinationInput.value;
      eventEditDestinationDescription.textContent = EVENT_DESTINATION.get(newDestination).DESCRIPTION;
      eventEditDestinationPhotosContainer.innerHTML = getPhotosMarkup(EVENT_DESTINATION.get(newDestination).PHOTO);
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
        startDate: this._flatpickr.plugins && this._flatpickr.plugins.has(`range`) ? Number(eventEditStartTimeInput.value.slice(0, 10) * 1000) : Number(eventEditStartTimeInput.value * 1000),
        endDate: this._flatpickr.plugins && this._flatpickr.plugins.has(`range`) ? Number(eventEditStartTimeInput.value.slice(-10) * 1000) : Number(eventEditEndTimeInput.value * 1000),
        isFavorite: eventEditFavoriteInput.checked,
        type: eventEditTypeInput.querySelector(`input:checked`).value,
      };

      closingRollupHandler();
      this._onDataChange(this._event, entry);
    };

    const onClickDeleteBtn = () => {
      this._onDataChange(this._event, null);
    };

    eventRollupOpenBtn.addEventListener(`click`, onClickRollupBtn);

    AbstractComponent.renderElement(this._container, event.getElement(), this._position);
  }
}

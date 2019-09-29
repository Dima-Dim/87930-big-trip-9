import Event from "../components/event";
import EventEdit from "../components/event-edit";
import {ElementClass, KeyCode, ALL_EVENT_TYPES} from "../components/config";
import {enteredIsInteger, getDateForEvenEditFromTimeStamp, getPhotosMarkup, useFlatpickr} from "../components/utils";
import AbstractComponent from "../components/abstract-component";
import "flatpickr/dist/flatpickr.min.css";
import {globalState} from "../main";
import {getEditAdditionalOptions} from "../components/additional-options";

export default class EventController {
  constructor(container, data, onDataChange, indexState, position) {
    this._container = container;
    this._event = data;
    this._position = position;
    this._onDataChange = onDataChange;
    this._indexState = indexState;
    this._flatpickr = {
      active: true,
      plugins: new Set([`range`, `confirmdate`]),
    };
  }

  init() {
    const event = new Event(this._event);
    const eventEdit = new EventEdit(this._event);
    const inputs = eventEdit.getElement().querySelectorAll(`input, textarea`);
    const eventRollupOpenBtn = event.getElement().querySelector(`.${ElementClass.EVENT_ROLLUP_BTN}`);
    const eventEditRollupCloseBtn = eventEdit.getElement().querySelector(`.${ElementClass.EVENT_ROLLUP_BTN}`);
    const eventEditInputList = eventEdit.getElement().querySelector(`.${ElementClass.EVENT_TYPE_INPUT_LIST}`);
    const eventEditTypeInput = eventEdit.getElement().querySelector(`.${ElementClass.EVENT_TYPE_INPUT}`);
    const eventEditTypeIcon = eventEdit.getElement().querySelector(`.${ElementClass.EVENT_TYPE_ICON}`);
    const eventEditTypeOutput = eventEdit.getElement().querySelector(`.${ElementClass.EVENT_TYPE_OUTPUT}`);
    const eventEditDestinationInput = eventEdit.getElement().querySelector(`.${ElementClass.EVENT_DESTINATION_INPUT}`);
    const eventEditDestinationDescription = eventEdit.getElement().querySelector(`.${ElementClass.EVENT_DESTINATION_DESCRIPTION}`);
    const eventEditDestinationPhotosContainer = eventEdit.getElement().querySelector(`.${ElementClass.EVENT_DESTINATION_PHOTOS_CONTAINER}`);
    const eventEditOffers = eventEdit.getElement().querySelector(`.${ElementClass.EVENT_OFFER_CHECKBOX_CONTAINER}`);
    const eventEditStartTimeInput = eventEdit.getElement().querySelector(`.${ElementClass.EVENT_TIME_INPUT}[name="event-start-time"]`);
    const eventEditEndTimeInput = eventEdit.getElement().querySelector(`.${ElementClass.EVENT_TIME_INPUT}[name="event-end-time"]`);
    const eventPriceInput = eventEdit.getElement().querySelector(`.${ElementClass.EVENT_PRICE_INPUT}`);
    const eventEditFavoriteInput = eventEdit.getElement().querySelector(`.${ElementClass.EVENT_FAVORITE_INPUT}`);
    const eventEditDeleteBtn = eventEdit.getElement().querySelector(`.${ElementClass.EVENT_DELETE_BTN}`);
    const eventEditSaveBtn = eventEdit.getElement().querySelector(`.${ElementClass.EVENT_SAVE_BTN}`);

    const activeFieldsForm = [
      eventEditDestinationInput,
      eventEditStartTimeInput,
      eventEditEndTimeInput,
      eventEditFavoriteInput,
      eventEditTypeInput,
      eventPriceInput,
      eventEditDeleteBtn,
      eventEditSaveBtn
    ];

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
      eventPriceInput.removeEventListener(`keydown`, onKeydownPriceInput);
      eventEditFavoriteInput.removeEventListener(`click`, onClickFavoriteInput);
      for (const input of inputs) {
        input.removeEventListener(`focus`, onFocusInput);
      }
      eventEditDeleteBtn.removeEventListener(`click`, onClickDeleteBtn);
      eventEdit.getElement().removeEventListener(`submit`, onSubmitForm);
      this._container.replaceChild(event.getElement(), eventEdit.getElement());
      eventRollupOpenBtn.addEventListener(`click`, onClickRollupBtn);
      document.removeEventListener(`keydown`, onEscDownRollup);
      this._indexState.editing = false;
    };

    const openingRollupHandler = () => {
      if (this._indexState.adding) {
        this._indexState.adding();
        this._indexState.adding = false;
      }
      if (this._indexState.editing) {
        this._indexState.editing();
      }
      this._indexState.editing = closingRollupHandler.bind(this);
      eventRollupOpenBtn.removeEventListener(`click`, onClickRollupBtn);
      eventPriceInput.addEventListener(`keydown`, onKeydownPriceInput);
      this._container.replaceChild(eventEdit.getElement(), event.getElement());
      for (const input of inputs) {
        input.addEventListener(`focus`, onFocusInput);
      }
      eventEditRollupCloseBtn.addEventListener(`click`, onClickEditRollupBtn);
      eventEditInputList.addEventListener(`change`, onChangeEventType);
      eventEditDestinationInput.addEventListener(`change`, onChangeEventDescription);
      eventEditDeleteBtn.addEventListener(`click`, onClickDeleteBtn);
      eventEditFavoriteInput.addEventListener(`click`, onClickFavoriteInput);
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
      eventEditOffers.innerHTML = getEditAdditionalOptions(newEventType, globalState.offers.filter((it) => it.type === newEventType)[0].offers);
    };

    const onChangeEventDescription = () => {
      const newDestination = eventEditDestinationInput.value;
      const destinationInfo = globalState.destinations.find((it) => it.name === newDestination);
      eventEditDestinationDescription.textContent = destinationInfo.description;
      eventEditDestinationPhotosContainer.innerHTML = getPhotosMarkup(destinationInfo.pictures);
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

    const onKeydownPriceInput = (evt) => {
      if (enteredIsInteger(evt)) {
        return;
      }

      evt.preventDefault();
    };

    const onClickFavoriteInput = (evt) => {
      evt.preventDefault();
      blockForm();
      const newEvent = Object.assign({}, this._event, {isFavorite: !this._event.isFavorite, destination: this._event.destination.name});

      const favoriteSuccess = () => {
        eventEdit.alarmStyle(`remove`);
        blockForm(`remove`);

        this._event.isFavorite = newEvent.isFavorite;

        if (this._event.isFavorite) {
          eventEditFavoriteInput.checked = true;
        } else {
          eventEditFavoriteInput.checked = false;
        }

        return false;
      };

      this._onDataChange(this._event, newEvent, {success: favoriteSuccess, error: loadError});
    };

    const onSubmitForm = (evt) => {
      evt.preventDefault();
      const form = new FormData(eventEdit.getElement());
      const eventType = eventEditTypeInput.querySelector(`input:checked`).value;
      const offers = new Set();
      eventEditOffers.querySelectorAll(`input:checked`).forEach((it) => offers.add(it.value));

      const entry = {
        destination: form.get(`event-destination`),
        price: Number(form.get(`event-price`)),
        additionalOptions: globalState.offers.filter((it) => it.type === eventType)[0][`offers`].filter((it) => offers.has(it.name)),
        startDate: this._flatpickr.plugins && this._flatpickr.plugins.has(`range`) ? Number(eventEditStartTimeInput.value.slice(0, 10) * 1000) : Number(eventEditStartTimeInput.value * 1000),
        endDate: this._flatpickr.plugins && this._flatpickr.plugins.has(`range`) ? Number(eventEditStartTimeInput.value.slice(-10) * 1000) : Number(eventEditEndTimeInput.value * 1000),
        isFavorite: eventEditFavoriteInput.checked,
        type: eventType,
      };

      eventEditSaveBtn.textContent = `Saving...`;
      blockForm();
      this._onDataChange(this._event, entry, {success: loadSuccess, error: loadError});
    };

    const onClickDeleteBtn = () => {
      eventEditDeleteBtn.textContent = `Deleting...`;
      blockForm();
      this._onDataChange(this._event, null, {success: loadSuccess, error: loadError});
    };

    const blockForm = (action) => {
      if (action === `remove`) {
        activeFieldsForm.forEach((it) => {
          it.disabled = false;
        });
      } else {
        activeFieldsForm.forEach((it) => {
          it.disabled = true;
        });
      }
    };

    const loadSuccess = () => {
      eventEdit.alarmStyle(`remove`);
      blockForm(`remove`);
      closingRollupHandler();

      return true;
    };

    const loadError = (err) => {
      if (err) {
        throw new Error(err);
      }

      eventEditSaveBtn.classList.add(`shake`);
      eventEdit.alarmStyle(`on`);
      eventEdit.shake();
      eventEditSaveBtn.textContent = `Save`;
      blockForm(`unblock`);

      return true;
    };

    eventRollupOpenBtn.addEventListener(`click`, onClickRollupBtn);

    AbstractComponent.renderElement(this._container, event.getElement(), this._position);
  }
}

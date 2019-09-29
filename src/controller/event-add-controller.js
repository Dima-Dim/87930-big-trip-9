import AbstractComponent from "../components/abstract-component";
import {enteredIsInteger, getDateForEvenEditFromTimeStamp, getPhotosMarkup, useFlatpickr} from "../components/utils";
import {ALL_EVENT_TYPES, ElementClass, KeyCode} from "../components/config";
import EventAdd from "../components/event-add";
import {globalState} from "../main";

export default class EventAddController {
  constructor(onDataChange, indexState) {
    this._indexState = indexState;
    this._eventAdd = new EventAdd();
    this._onDataChange = onDataChange;
    this._flatpickr = {
      active: true,
      plugins: new Set([`range`, `confirmdate`]),
    };
  }

  init(container) {
    AbstractComponent.renderElement(container, this._eventAdd.getElement(), `insertBefore`);
    this._indexState.adding = this._eventAdd.removeElement.bind(this._eventAdd);
    const inputs = this._eventAdd.getElement().querySelectorAll(`input, textarea`);
    const eventAddInputList = this._eventAdd.getElement().querySelector(`.${ElementClass.EVENT_TYPE_INPUT_LIST}`);
    const eventAddTypeIcon = this._eventAdd.getElement().querySelector(`.${ElementClass.EVENT_TYPE_ICON}`);
    const eventAddTypeOutput = this._eventAdd.getElement().querySelector(`.${ElementClass.EVENT_TYPE_OUTPUT}`);
    const eventAddDestinationInput = this._eventAdd.getElement().querySelector(`.${ElementClass.EVENT_DESTINATION_INPUT}`);
    const eventAddDestinationDescription = this._eventAdd.getElement().querySelector(`.${ElementClass.EVENT_DESTINATION_DESCRIPTION}`);
    const eventAddDestinationPhotosContainer = this._eventAdd.getElement().querySelector(`.${ElementClass.EVENT_DESTINATION_PHOTOS_CONTAINER}`);
    const eventEditOffers = this._eventAdd.getElement().querySelector(`.${ElementClass.EVENT_OFFER_CHECKBOX_CONTAINER}`);
    const eventAddStartTimeInput = this._eventAdd.getElement().querySelector(`.${ElementClass.EVENT_TIME_INPUT}[name="event-start-time"]`);
    const eventAddEndTimeInput = this._eventAdd.getElement().querySelector(`.${ElementClass.EVENT_TIME_INPUT}[name="event-end-time"]`);
    const eventPriceInput = this._eventAdd.getElement().querySelector(`.${ElementClass.EVENT_PRICE_INPUT}`);
    const eventAddTypeInput = this._eventAdd.getElement().querySelector(`.${ElementClass.EVENT_TYPE_INPUT}`);
    const eventAddCancel = this._eventAdd.getElement().querySelector(`.${ElementClass.EVENT_DELETE_BTN}`);
    const eventEditSaveBtn = this._eventAdd.getElement().querySelector(`.${ElementClass.EVENT_SAVE_BTN}`);

    const activeFieldsForm = [
      eventAddDestinationInput,
      eventAddStartTimeInput,
      eventAddEndTimeInput,
      eventAddTypeInput,
      eventAddCancel,
      eventEditSaveBtn
    ];

    if (this._flatpickr.active && this._flatpickr.plugins) {
      useFlatpickr(eventAddStartTimeInput, eventAddEndTimeInput, Array.from(this._flatpickr.plugins));
    } else if (this._flatpickr.active) {
      useFlatpickr(eventAddStartTimeInput, eventAddEndTimeInput);
    } else {
      eventAddStartTimeInput.value = getDateForEvenEditFromTimeStamp(this._event.startDate);
      eventAddEndTimeInput.value = getDateForEvenEditFromTimeStamp(this._event.endDate);
    }

    const closingRollupHandler = () => {
      eventAddCancel.removeEventListener(`click`, onClickEventAddCancel);
      eventAddInputList.removeEventListener(`change`, onChangeEventType);
      eventAddDestinationInput.removeEventListener(`change`, onChangeEventDescription);
      eventPriceInput.removeEventListener(`keydown`, onKeydownPriceInput);
      for (const input of inputs) {
        input.removeEventListener(`focus`, onFocusInput);
      }
      this._eventAdd.getElement().removeEventListener(`submit`, onSubmitForm);
      document.removeEventListener(`keydown`, onEscDownRollup);
      if (this._indexState.adding) {
        this._indexState.adding();
      }
      this._indexState.adding = false;
    };

    const openingRollupHandler = () => {
      for (const input of inputs) {
        input.addEventListener(`focus`, onFocusInput);
      }
      eventAddCancel.addEventListener(`click`, onClickEventAddCancel);
      eventAddInputList.addEventListener(`change`, onChangeEventType);
      eventAddDestinationInput.addEventListener(`change`, onChangeEventDescription);
      eventPriceInput.addEventListener(`keydown`, onKeydownPriceInput);
      this._eventAdd.getElement().addEventListener(`submit`, onSubmitForm);
      document.addEventListener(`keydown`, onEscDownRollup);
    };

    const onChangeEventType = () => {
      const newEventType = eventAddInputList.querySelector(`input:checked`).value;
      eventAddTypeIcon.src = ALL_EVENT_TYPES.get(newEventType)[`ICON_URL`];
      eventAddTypeOutput.textContent = ALL_EVENT_TYPES.get(newEventType)[`TITLE`];
    };

    const onChangeEventDescription = () => {
      const newDestination = eventAddDestinationInput.value;
      eventAddDestinationDescription.textContent = globalState.destinations.filter((it) => it.name === newDestination)[0].description;
      eventAddDestinationPhotosContainer.innerHTML = getPhotosMarkup(globalState.destinations.filter((it) => it.name === newDestination)[0].pictures);
    };

    const onEscDownRollup = (evt) => {
      const key = evt.keyCode;
      if (key === KeyCode.ESC) {
        closingRollupHandler();
      }
    };

    const onBlurInput = () => {
      document.addEventListener(`keydown`, onEscDownRollup);
    };

    const onFocusInput = () => {
      document.removeEventListener(`keydown`, onEscDownRollup);
      for (const input of inputs) {
        input.addEventListener(`blur`, onBlurInput);
      }
    };

    const onKeydownPriceInput = (evt) => {
      if (enteredIsInteger(evt)) {
        return;
      }

      evt.preventDefault();
    };

    const onClickEventAddCancel = () => {
      closingRollupHandler();
    };

    const onSubmitForm = (evt) => {
      evt.preventDefault();
      const form = new FormData(this._eventAdd.getElement());
      const offers = new Set();
      const checkerOffers = () => {
        eventEditOffers.querySelectorAll(`input:checked`).forEach((it) => offers.add(it.value));
      };
      checkerOffers();

      const entry = {
        destination: form.get(`event-destination`),
        price: Number(form.get(`event-price`)),
        additionalOptions: offers,
        startDate: this._flatpickr.plugins && this._flatpickr.plugins.has(`range`) ? Number(eventAddStartTimeInput.value.slice(0, 10) * 1000) : Number(eventAddStartTimeInput.value * 1000),
        endDate: this._flatpickr.plugins && this._flatpickr.plugins.has(`range`) ? Number(eventAddStartTimeInput.value.slice(-10) * 1000) : Number(eventAddEndTimeInput.value * 1000),
        isFavorite: false,
        type: eventAddTypeInput.querySelector(`input:checked`).value,
      };

      eventEditSaveBtn.textContent = `Saving...`;
      blockForm();
      this._onDataChange(null, entry, {success: loadSuccess, error: loadError});
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
      this._eventAdd.alarmStyle(`remove`);
      blockForm();
      closingRollupHandler();

      return true;
    };

    const loadError = (err) => {
      if (err) {
        throw new Error(err);
      }

      eventEditSaveBtn.classList.add(`shake`);
      this._eventAdd.alarmStyle(`on`);
      this._eventAdd.shake();
      eventEditSaveBtn.textContent = `Save`;
      blockForm(`unblock`);

      return true;
    };

    openingRollupHandler();
  }
}

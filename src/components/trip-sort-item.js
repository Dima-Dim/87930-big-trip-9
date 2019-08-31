import AbstractComponent from "./abstract-component";

export default class TripSortItem extends AbstractComponent {
  constructor([sortId, {NAME, ICON}], active) {
    super();
    this._sortId = sortId;
    this._name = NAME;
    this._icon = ICON;
    this._active = active;
  }

  getTemplate() {
    return `<div class="trip-sort__item  trip-sort__item--${this._sortId}">
              <input id="sort-${this._sortId}" class="trip-sort__input  visually-hidden" data-type="${this._sortId}" type="radio" name="trip-sort" value="sort-${this._sortId}" ${this._sortId === this._active ? `checked` : ``}>
              <label class="trip-sort__btn" for="sort-${this._sortId}">
                ${this._name}
                ${this._icon}
              </label>
            </div>`;
  }
}

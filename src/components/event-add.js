import AbstractComponent from "./abstract-component";
import EventEdit from "./event-edit";
import {getEventDefaultData} from "./config";
import {ElementClass} from "./config";

export default class EventAdd extends AbstractComponent {
  constructor() {
    super();
    this._eventEdit = new EventEdit(getEventDefaultData());
    this._newEventElement = this._eventEdit.getElement();
  }

  getTemplate() {
    this._newEventElement.classList.add(`trip-events__item`);
    AbstractComponent.unRenderElement(this._newEventElement.querySelector(`.${ElementClass.EVENT_ROLLUP_BTN}`));
    AbstractComponent.unRenderElement(this._newEventElement.querySelector(`.${ElementClass.EVENT_FAVORITE_INPUT}`));
    AbstractComponent.unRenderElement(this._newEventElement.querySelector(`.${ElementClass.EVENT_FAVORITE_BTN}`));
    this._newEventElement.querySelector(`.${ElementClass.EVENT_DELETE_BTN}`).textContent = `Cancel`;

    return this._newEventElement.outerHTML.trim();
  }
}

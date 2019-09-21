import Statistics from "../components/statistics";
import AbstractComponent from "../components/abstract-component";

export default class StatisticsController {
  constructor(container, data) {
    this._statisics = new Statistics();
    this._container = container;
    this._data = data;
  }

  init() {
    AbstractComponent.renderElement(this._container, this._statisics.getElement(), `insertAfter`);
  }

  hide() {
    this._statisics.hide();
  }

  show() {
    this._statisics.show();
  }
}

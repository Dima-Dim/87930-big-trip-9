import Menu from "../components/menu";
import {ClassesElements, MENU} from "../components/config";
import AbstractComponent from "../components/abstract-component";

export default class MenuController {
  constructor(onChangeView) {
    this._menu = new Menu(Array.from(MENU));
    this._onChangeView = onChangeView;

    this.init();
  }

  init() {
    AbstractComponent.renderElement(`.${ClassesElements.TRIP_MENU}`, this._menu.getElement(), `insertAfter`);

    const onClickMenu = (evt) => {
      const {target} = evt;
      this._menu.changeActive(target.id);
      this._onChangeView(target.id);
    };

    this._menu.getElement().addEventListener(`click`, onClickMenu);
  }
}

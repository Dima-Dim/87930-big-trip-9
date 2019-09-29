import Menu from "../components/menu";
import {ElementClass, MENU_ITEMS} from "../components/config";
import AbstractComponent from "../components/abstract-component";

export default class MenuController {
  constructor(onChangeView) {
    this._menu = new Menu(Array.from(MENU_ITEMS));
    this._onChangeView = onChangeView;
  }

  init() {
    AbstractComponent.renderElement(`.${ElementClass.TRIP_MENU}`, this._menu.getElement(), `insertAfter`);

    const onClickMenu = (evt) => {
      const {target} = evt;
      this._menu.changeActive(target.id);
      this._onChangeView(target.id);
    };

    this._menu.getElement().addEventListener(`click`, onClickMenu);
  }
}

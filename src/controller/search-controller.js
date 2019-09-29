import Filters from "../components/filter";
import {IdPrefix} from "../components/config";

export default class SearchController {
  constructor(filtersData, onChangeView) {
    this._filter = new Filters(filtersData);
    this._onChangeView = onChangeView;

    this.init();
  }

  init() {
    const onChangeFilter = () => {
      this._onChangeView(null, this._filter.getElement().querySelector(`input:checked`).id.slice(IdPrefix.FILTER.length));
    };

    this._filter.getElement().addEventListener(`change`, onChangeFilter);
  }

  filters() {
    return this._filter;
  }
}

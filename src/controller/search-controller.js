import Filters from "../components/filter";
import {FILTER_ID_PREFIX} from "../components/config";

export default class SearchController {
  constructor(filtersData, onChangeView) {
    this._filter = new Filters(filtersData);
    this._onChangeView = onChangeView;

    this.init();
  }

  init() {
    const onChangeFilter = () => {
      this._onChangeView(null, this._filter.getElement().querySelector(`input:checked`).id.slice(FILTER_ID_PREFIX.length));
    };

    this._filter.getElement().addEventListener(`change`, onChangeFilter);
  }

  filters() {
    return this._filter;
  }
}

import {globalState} from "../main";

export const HttpMethod = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`,
};

export const HttpHeader = {
  JSON: {'Content-Type': `application/json`},
};

export const ApiData = {
  HOST: `https://htmlacademy-es-9.appspot.com/big-trip`,
  AUTHORIZATION: `Basic 3L8w3Q3c7L6l8N6p7N5u9D5d`,
  POINTS: `points`,
  DESTINATIONS: `destinations`,
  OFFERS: `offers`,
};

export const Default = {
  CHECKED_TYPE: `flight`,
  SORT_EVENTS: `sort-event`,
  ACTIVE_EVENT_TYPE: `taxi`,
};

export const IdPrefix = {
  SORT: `sort-`,
  FILTER: `filter-`,
};

export const LOCALES = `en-US`;

export const TimeFormat = {
  hour: `numeric`,
  minute: `numeric`,
  hour12: false
};

export const NumberAdditionalOptionsInList = 3;

export const ACTIVITY_EVENT_TYPES = new Map([
  [`taxi`, {
    NAME: `Taxi`,
    TITLE: `Taxi to`,
    ICON_URL: `img/icons/taxi.png`
  }],
  [`bus`, {
    NAME: `Bus`,
    TITLE: `Bus to`,
    ICON_URL: `img/icons/bus.png`
  }],
  [`train`, {
    NAME: `Train`,
    TITLE: `Train to`,
    ICON_URL: `img/icons/train.png`
  }],
  [`ship`, {
    NAME: `Ship`,
    TITLE: `Ship to`,
    ICON_URL: `img/icons/ship.png`
  }],
  [`transport`, {
    NAME: `Transport`,
    TITLE: `Transport to`,
    ICON_URL: `img/icons/transport.png`
  }],
  [`drive`, {
    NAME: `Drive`,
    TITLE: `Drive to`,
    ICON_URL: `img/icons/drive.png`
  }],
  [`flight`, {
    NAME: `Flight`,
    TITLE: `Flight to`,
    ICON_URL: `img/icons/flight.png`
  }],
]);

export const TRANSFER_EVENT_TYPES = new Map([
  [`check-in`, {
    NAME: `Check`,
    TITLE: `Check in`,
    ICON_URL: `img/icons/check-in.png`
  }],
  [`sightseeing`, {
    NAME: `Sightseeing`,
    TITLE: `Check in`,
    ICON_URL: `img/icons/sightseeing.png`
  }],
  [`restaurant`, {
    NAME: `Restaurant`,
    TITLE: `Check in`,
    ICON_URL: `img/icons/restaurant.png`
  }],
]);

export const ALL_EVENT_TYPES = new Map([...[...ACTIVITY_EVENT_TYPES, ...TRANSFER_EVENT_TYPES]]);

export const MENU_ITEMS = new Map([
  [`table`, {
    NAME: `Table`,
    URL: `#`
  }],
  [`stats`, {
    NAME: `Stats`,
    URL: `#`
  }]
]);

export const FILTER_ITEMS = new Map([
  [`everything`, `Everything`],
  [`future`, `Future`],
  [`past`, `Past`]
]);

export const SORT_ITEMS = new Map([
  [`event`, {
    NAME: `Event`,
    ICON: ``
  }
  ],
  [`time`, {
    NAME: `Time`,
    ICON: `<svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
             <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
           </svg>`
  }
  ],
  [`price`, {
    NAME: `Price`,
    ICON: `<svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
             <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
           </svg>`
  }]
]);

export const ElementId = {
  MENU_LINK_TABLE: `table`,
  MENU_LINK_STATS: `stats`,
};

export const ElementClass = {
  TRIP_INFO: `trip-info`,
  TRIP_CONTROLS: `trip-controls`,
  TRIP_MENU: `trip-controls h2`,
  TRIP_EVENTS: `trip-events`,
  TRIP_TOTAL_COST: `trip-info__cost-value`,
  TRIP_EVENT_ADD: `trip-main__event-add-btn`,
  EVENT_TYPE_INPUT_LIST: `event__type-list`,
  EVENT_TYPE_ICON: `event__type-icon`,
  EVENT_TYPE_OUTPUT: `event__type-output`,
  EVENT_DESTINATION_INPUT: `event__input--destination`,
  EVENT_DESTINATION_DESCRIPTION: `event__destination-description`,
  EVENT_DESTINATION_PHOTOS_CONTAINER: `event__photos-tape`,
  EVENT_PRICE_INPUT: `event__input--price`,
  EVENT_OFFER_CHECKBOX_CONTAINER: `event__available-offers`,
  EVENT_TIME_INPUT: `event__input--time`,
  EVENT_FAVORITE_INPUT: `event__favorite-checkbox`,
  EVENT_FAVORITE_BTN: `event__favorite-btn`,
  EVENT_TYPE_INPUT: `event__type-list`,
  EVENT_ROLLUP_BTN: `event__rollup-btn`,
  EVENT_DELETE_BTN: `event__reset-btn`,
  EVENT_SAVE_BTN: `event__save-btn`,
  STATISTICS_MONEY: `statistics__chart--money`,
  STATISTICS_TRANSPORT: `statistics__chart--transport`,
  STATISTICS_TIME: `statistics__chart--time`,
};

export const KeyCode = {
  ESC: 27,
  BACKSPACE: 8,
  HOME: 36,
  END: 35,
  DELETE: 46,
  LEFT_ARROW: 37,
  RIGHT_ARROW: 39,
  A: 65,
  CTRL: 17,
};

const FLATPICKR_TEMP_CONFIG = {};

export const FLATPICKR_CONF = new Map([
  [`locale`, `en`],
  [`enableTime`, true],
  [`time_24hr`, true],
  [`altInput`, true],
  [`altFormat`, `d.m.y H:i`],
  [`dateFormat`, `U`],
]);

FLATPICKR_CONF.forEach((value, key) => {
  FLATPICKR_TEMP_CONFIG[key] = value;
});

export const FLATPICKR_CONFIG = FLATPICKR_TEMP_CONFIG;

export const getEventDefaultData = () => ({
  type: globalState.offers[0].type,
  destination: globalState.destinations[0],
  startDate: Date.now(),
  endDate: Date.now(),
  price: 1,
  additionalOptions: globalState.offers[0].offers,
  isFavorite: false,
});

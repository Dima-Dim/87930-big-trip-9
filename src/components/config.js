import {getRandomElementsFromArray, getRandomIntegerBetween, getEventPhoto} from "./utils";

export const ALL_EVENT_COUNT = 4;
const DESCRIPTION_LENGTH = 3;
const MIN_NUMBER_OF_PHOTO = 1;
const MAX_NUMBER_OF_PHOTO = 5;
export const DEFAULT_CHECKED_TYPE = `flight`;
export const DEFAULT_SORT_EVENTS = `sort-event`;
export const SORT_ID_PREFIX = `sort-`;
export const FILTER_ID_PREFIX = `filter-`;
const descriptions = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];

export const LOCALES = `en-US`;

export const TIME_FORMAT = {
  hour: `numeric`,
  minute: `numeric`,
  hour12: false
};

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
    NAME: `Check-in`,
    TITLE: `Check into`,
    ICON_URL: `img/icons/check-in.png`
  }],
  [`sightseeing`, {
    NAME: `Sightseeing`,
    TITLE: `Check into`,
    ICON_URL: `img/icons/sightseeing.png`
  }],
  [`restaurant`, {
    NAME: `Restaurant`,
    TITLE: `Check into`,
    ICON_URL: `img/icons/restaurant.png`
  }],
]);

export const ALL_EVENT_TYPES = new Map([...[...ACTIVITY_EVENT_TYPES, ...TRANSFER_EVENT_TYPES]]);

export const EVENT_DESTINATION = new Map([
  [`Amsterdam`, {
    DESCRIPTION: getRandomElementsFromArray(descriptions, DESCRIPTION_LENGTH).join(` `),
    PHOTO: new Array(getRandomIntegerBetween(MIN_NUMBER_OF_PHOTO, MAX_NUMBER_OF_PHOTO)).fill(``).map(() => getEventPhoto()),
  }],
  [`Geneva`, {
    DESCRIPTION: getRandomElementsFromArray(descriptions, DESCRIPTION_LENGTH).join(` `),
    PHOTO: new Array(getRandomIntegerBetween(MIN_NUMBER_OF_PHOTO, MAX_NUMBER_OF_PHOTO)).fill(``).map(() => getEventPhoto()),
  }],
  [`Chamonix`, {
    DESCRIPTION: getRandomElementsFromArray(descriptions, DESCRIPTION_LENGTH).join(` `),
    PHOTO: new Array(getRandomIntegerBetween(MIN_NUMBER_OF_PHOTO, MAX_NUMBER_OF_PHOTO)).fill(``).map(() => getEventPhoto()),
  }],
  [`Saint Petersburg`, {
    DESCRIPTION: getRandomElementsFromArray(descriptions, DESCRIPTION_LENGTH).join(` `),
    PHOTO: new Array(getRandomIntegerBetween(MIN_NUMBER_OF_PHOTO, MAX_NUMBER_OF_PHOTO)).fill(``).map(() => getEventPhoto()),
  }],
]);

export const ADDITIONAL_OPTIONS = new Map([
  [`luggage`, {
    NAME: `Add luggage`,
    PRICE: 10
  }],
  [`comfort`, {
    NAME: `Switch to comfort class`,
    PRICE: 150
  }],
  [`meal`, {
    NAME: `Add meal`,
    PRICE: 2
  }],
  [`seats`, {
    NAME: `Choose seats`,
    PRICE: 9
  }]
]);

export const MENU = new Map([
  [`table`, {
    NAME: `Table`,
    URL: `#`
  }],
  [`stats`, {
    NAME: `Stats`,
    URL: `#`
  }]
]);

export const FILTERS = new Map([
  [`everything`, `Everything`],
  [`future`, `Future`],
  [`past`, `Past`]
]);

export const SORT = new Map([
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

export const IdElements = {
  MENU_LINK_TABLE: `table`,
  MENU_LINK_STATS: `stats`,
};

export const ClassesElements = {
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
  STATISTICS_MONEY: `statistics__chart--money`,
  STATISTICS_TRANSPORT: `statistics__chart--transport`,
  STATISTICS_TIME: `statistics__chart--time`,
};

export const KeyCode = {
  ESC: 27,
};

const FLATPICKR_TEMP_CONFIG = {};

export const FLATPICKR_CONF = new Map([
  [`locale`, `en`],
  [`enableTime`, true],
  [`time_24hr`, true],
  [`altInput`, true],
  [`altFormat`, `d/m/y H:i`],
  [`dateFormat`, `U`],
]);

FLATPICKR_CONF.forEach((value, key) => {
  FLATPICKR_TEMP_CONFIG[key] = value;
});

export const FLATPICKR_CONFIG = FLATPICKR_TEMP_CONFIG;

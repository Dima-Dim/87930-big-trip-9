export const ALL_EVENT_COUNT = 4;
export const DEFAULT_CHECKED_TYPE = `flight`;

export const locales = `en-US`;

export const timeFormat = {
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

export const EVENT_DESTINATION = new Set([
  `Amsterdam`,
  `Geneva`,
  `Chamonix`,
  `Saint Petersburg`,
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

export const CONTAINER_SELECTORS = {
  TRIP_INFO: `.trip-info`,
  TRIP_CONTROLS: `.trip-controls`,
  TRIP_MENU: `.trip-controls h2`,
  TRIP_EVENTS: `.trip-events`,
  TRIP_TOTAL_COST: `.trip-info__cost-value`,
};

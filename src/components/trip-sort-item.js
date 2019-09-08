export const getSortItem = ([sortId, {NAME, ICON}], activeItem) => `<div class="trip-sort__item  trip-sort__item--${sortId}">
                                                                      <input id="sort-${sortId}" class="trip-sort__input  visually-hidden" data-type="${sortId}" type="radio" name="trip-sort" value="sort-${sortId}" ${sortId === activeItem ? `checked` : ``}>
                                                                      <label class="trip-sort__btn" for="sort-${sortId}">
                                                                        ${NAME}
                                                                        ${ICON}
                                                                      </label>
                                                                    </div>`;

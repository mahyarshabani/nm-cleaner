import { AnimationsEnum } from './animations.enum';

export class MENU_DATA {
  static ITEM_HEIGHT = 40
  static MARGIN_LEFT = 10;
  static ITEM_WIDTH = 50;
  static ANIMATIONS_TRANSITIONS_DURATION = {
    [AnimationsEnum.PREVIOUS_ACTIVE_ITEM]: 200,
    [AnimationsEnum.ITEMS_REORDERING]: 200,
    [AnimationsEnum.NEW_ACTIVE_ITEM]: 200,
  };
  static ANIMATIONS_TRANSITIONS_DELAY = {
    [AnimationsEnum.PREVIOUS_ACTIVE_ITEM]: 0,
    [AnimationsEnum.ITEMS_REORDERING]:
      MENU_DATA.ANIMATIONS_TRANSITIONS_DURATION[
        AnimationsEnum.PREVIOUS_ACTIVE_ITEM
      ],
    [AnimationsEnum.NEW_ACTIVE_ITEM]:
      MENU_DATA.ANIMATIONS_TRANSITIONS_DURATION[
        AnimationsEnum.PREVIOUS_ACTIVE_ITEM
      ] +
      MENU_DATA.ANIMATIONS_TRANSITIONS_DURATION[
        AnimationsEnum.ITEMS_REORDERING
      ],
  };
}

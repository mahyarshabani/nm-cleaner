import { MenuAnimationsEnum } from '@enum';

export class MENU_DATA {
  static ITEM_BORDER_WIDTH = 1;
  static ITEM_HEIGHT = 20;
  static SELECTED_ITEM_HEIGHT = 25;
  static HIDDEN_ITEM_TOP = MENU_DATA.ITEM_HEIGHT + MENU_DATA.ITEM_BORDER_WIDTH;
  static MARGIN_LEFT = 10;
  static ITEM_WIDTH = 30;
  static ANIMATION_TIMING_FUNCTION = 'ease-in-out';
  static ANIMATIONS_TRANSITIONS_DURATION = {
    [MenuAnimationsEnum.PREVIOUS_ACTIVE_ITEM]: 200,
    [MenuAnimationsEnum.ITEMS_REORDERING]: 200,
    [MenuAnimationsEnum.NEW_ACTIVE_ITEM]: 200,
  };
  static ANIMATIONS_TRANSITIONS_DELAY = {
    [MenuAnimationsEnum.PREVIOUS_ACTIVE_ITEM]: 0,
    [MenuAnimationsEnum.ITEMS_REORDERING]:
      MENU_DATA.ANIMATIONS_TRANSITIONS_DURATION[
        MenuAnimationsEnum.PREVIOUS_ACTIVE_ITEM
      ],
    [MenuAnimationsEnum.NEW_ACTIVE_ITEM]:
      MENU_DATA.ANIMATIONS_TRANSITIONS_DURATION[
        MenuAnimationsEnum.PREVIOUS_ACTIVE_ITEM
      ] +
      MENU_DATA.ANIMATIONS_TRANSITIONS_DURATION[
        MenuAnimationsEnum.ITEMS_REORDERING
      ],
  };
}

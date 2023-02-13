import { ElementRef, Injectable, QueryList } from '@angular/core';
import {
  animate,
  AnimationBuilder,
  AnimationMetadata,
  sequence,
  style,
} from '@angular/animations';
import { IMenuItem } from '@interface';
import { MENU_DATA } from '@constant';

@Injectable()
export class MenuAnimationService {
  constructor(private animationBuilder: AnimationBuilder) {}

  buildReorderingAnimations(
    allElements: QueryList<ElementRef>,
    orderedMenuItems: IMenuItem[]
  ) {
    const { ITEMS_REORDERING: DURATION } =
      MENU_DATA.ANIMATIONS_TRANSITIONS_DURATION;
    const { ITEMS_REORDERING: DELAY } = MENU_DATA.ANIMATIONS_TRANSITIONS_DELAY;
    allElements.forEach((element) => {
      const currentIndex = orderedMenuItems.findIndex(
        (item) => item.page === element.nativeElement.id
      );
      this.playAnimation(
        element,
        animate(
          `${DURATION}ms ${DELAY}ms ${MENU_DATA.ANIMATION_TIMING_FUNCTION}`,
          style({
            left: `calc((${currentIndex + 1} * ${
              MENU_DATA.MARGIN_LEFT
            }px) + (${currentIndex} * ${MENU_DATA.ITEM_WIDTH}px))`,
          })
        )
      );
    });
  }

  buildNewActiveElementAnimations(newActive: ElementRef) {
    const { NEW_ACTIVE_ITEM: DURATION } =
      MENU_DATA.ANIMATIONS_TRANSITIONS_DURATION;
    const {
      NEW_ACTIVE_ITEM: SECOND_STEP_DELAY,
      PREVIOUS_ACTIVE_ITEM: FIRST_STEP_DELAY,
    } = MENU_DATA.ANIMATIONS_TRANSITIONS_DELAY;
    this.playAnimation(newActive, [
      sequence([
        animate(
          `${DURATION}ms ${FIRST_STEP_DELAY}ms ${MENU_DATA.ANIMATION_TIMING_FUNCTION}`,
          style({
            top: `-${MENU_DATA.HIDDEN_ITEM_TOP}px`,
          })
        ),
        animate(
          `${DURATION}ms ${SECOND_STEP_DELAY}ms ${MENU_DATA.ANIMATION_TIMING_FUNCTION}`,
          style({
            top: '0px',
            height: `${MENU_DATA.SELECTED_ITEM_HEIGHT}px`,
          })
        ),
      ]),
    ]);
  }

  buildPreviousActiveElementAnimations(previousActive: ElementRef) {
    const { PREVIOUS_ACTIVE_ITEM: DURATION } =
      MENU_DATA.ANIMATIONS_TRANSITIONS_DURATION;
    const { PREVIOUS_ACTIVE_ITEM: DELAY } =
      MENU_DATA.ANIMATIONS_TRANSITIONS_DELAY;
    this.playAnimation(previousActive, [
      animate(
        `${DURATION}ms ${DELAY}ms ${MENU_DATA.ANIMATION_TIMING_FUNCTION}`,
        style({
          height: `${MENU_DATA.ITEM_HEIGHT}px`,
        })
      ),
    ]);
  }

  private playAnimation(
    elementRef: ElementRef,
    animationMetaData: AnimationMetadata[] | AnimationMetadata
  ): void {
    const animation = this.animationBuilder.build(animationMetaData);
    const player = animation.create(elementRef.nativeElement);
    player.play();
  }
}

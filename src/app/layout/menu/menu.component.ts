import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { IMenuItem } from '@interface';
import { PageEnum } from '@enum';
import { ListUtil } from '@util';
import { MenuAnimationService } from '@service';
import { MENU_DATA } from '@constant';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MenuAnimationService],
})
export class MenuComponent implements AfterViewInit {
  @ViewChildren('menuItemElement') menuItemElements: QueryList<ElementRef>;
  menuItems: IMenuItem[] = [
    { page: PageEnum.HOME, icon: 'home' },
    { page: PageEnum.SETTINGS, icon: 'settings' },
    { page: PageEnum.CUSTOM, icon: 'search' },
    { page: PageEnum.CUSTOM2, icon: 'done' },
  ];
  orderedMenuItems: IMenuItem[] = this.menuItems;

  constructor(private menuAnimationService: MenuAnimationService) {}

  ngAfterViewInit(): void {
    this.setInitialMenuItemsStyles();
  }

  activatePage(clickedItem: IMenuItem) {
    if (clickedItem === this.orderedMenuItems[0]) {
      return;
    }
    const previousActiveItem = this.orderedMenuItems[0];
    const clickedItemIndex = this.orderedMenuItems.indexOf(clickedItem);
    this.orderedMenuItems = ListUtil.array_move(
      this.orderedMenuItems,
      clickedItemIndex,
      0
    );
    this.initAnimations(previousActiveItem, clickedItem);
  }

  private initAnimations(
    previousActiveItem: IMenuItem,
    newActiveItem: IMenuItem
  ) {
    const [previousActiveElement, newActiveElement] = this.findItems(
      previousActiveItem,
      newActiveItem
    );
    this.menuAnimationService.buildPreviousActiveElementAnimations(
      previousActiveElement
    );
    this.menuAnimationService.buildNewActiveElementAnimations(newActiveElement);
    this.menuAnimationService.buildReorderingAnimations(
      this.menuItemElements,
      this.orderedMenuItems
    );
  }

  private findItems(
    previousActiveItem: IMenuItem,
    newActiveItem: IMenuItem
  ): [ElementRef, ElementRef] {
    let newActiveElement!: ElementRef;
    let previousActiveElement!: ElementRef;
    this.menuItemElements.forEach((el) => {
      switch (el.nativeElement.id) {
        case newActiveItem.page:
          newActiveElement = el;
          break;
        case previousActiveItem.page:
          previousActiveElement = el;
          break;
      }
    });
    return [previousActiveElement, newActiveElement];
  }

  private setInitialMenuItemsStyles() {
    this.menuItemElements.forEach((element, i) => {
      element.nativeElement.style.left = `calc((${i + 1} * ${
        MENU_DATA.MARGIN_LEFT
      }px) + ((${i}) * ${MENU_DATA.ITEM_WIDTH}px))`;
      element.nativeElement.style.width = `${MENU_DATA.ITEM_WIDTH}px`;
      element.nativeElement.style.borderWidth = `${MENU_DATA.ITEM_BORDER_WIDTH}px`;
      element.nativeElement.style.height =
        i !== 0
          ? `${MENU_DATA.ITEM_HEIGHT}px`
          : `${MENU_DATA.SELECTED_ITEM_HEIGHT}px`;
    });
  }
}

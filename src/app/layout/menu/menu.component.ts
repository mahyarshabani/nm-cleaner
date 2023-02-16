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
    { page: PageEnum.HOME, icon: 'home', route: 'scan' },
    { page: PageEnum.SETTINGS, icon: 'settings', route: 'settings' },
    // { page: PageEnum.CUSTOM, icon: 'search', route: 'scan' },
    // { page: PageEnum.CUSTOM2, icon: 'done', route: 'scan' },
  ];

  private activePage: PageEnum = this.menuItems[0].page;

  constructor(private menuAnimationService: MenuAnimationService) {}

  ngAfterViewInit(): void {
    this.setInitialMenuItemsStyles();
  }

  activatePage(page: PageEnum) {
    this.initAnimations(this.activePage, page);
    this.activePage = page;
  }

  private initAnimations(previousPage: PageEnum, newPage: PageEnum) {
    const [previousActiveElement, newActiveElement] =
      this.findNewAndOldActiveMenuItems(previousPage, newPage);
    this.menuAnimationService.buildPreviousActiveElementAnimations(
      previousActiveElement
    );
    this.menuAnimationService.buildNewActiveElementAnimations(newActiveElement);
    const newOrderedItems = [...this.menuItems].sort((item) =>
      item.page === newPage ? -1 : 0
    );
    this.menuAnimationService.buildReorderingAnimations(
      this.menuItemElements,
      newOrderedItems
    );
  }

  private findNewAndOldActiveMenuItems(
    previousPage: PageEnum,
    newPage: PageEnum
  ): [ElementRef, ElementRef] {
    let newActiveElement!: ElementRef;
    let previousActiveElement!: ElementRef;
    this.menuItemElements.forEach((el) => {
      switch (el.nativeElement.id) {
        case newPage:
          newActiveElement = el;
          break;
        case previousPage:
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

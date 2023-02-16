import { PageEnum } from '@enum';

export interface IMenuItem {
  page: PageEnum;
  icon: string;
  route: string;
}

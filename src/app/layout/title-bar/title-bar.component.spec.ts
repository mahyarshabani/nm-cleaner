import { TitleBarComponent } from './title-bar.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { ELECTRON_API_TOKEN } from '../../constant/electron-api-token';

describe('TitleBarComponent', () => {
  let spectator: Spectator<TitleBarComponent>;
  const createComponent = createComponentFactory({
    component: TitleBarComponent,
    componentProviders: [
      {
        provide: ELECTRON_API_TOKEN,
        useValue: {},
      },
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

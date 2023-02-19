import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { ScanComponent } from './scan.component';

describe('ScanComponent', () => {
  let spectator: Spectator<ScanComponent>;
  const createComponent = createComponentFactory({
    component: ScanComponent,
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

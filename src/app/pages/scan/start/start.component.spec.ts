import {
  createComponentFactory,
  mockProvider,
  Spectator,
} from '@ngneat/spectator';

import { StartComponent } from './start.component';
import { ScanService, SelectService } from '@service';

describe('StartComponent', () => {
  let spectator: Spectator<StartComponent>;
  const createComponent = createComponentFactory({
    component: StartComponent,
    providers: [mockProvider(SelectService), mockProvider(ScanService)],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

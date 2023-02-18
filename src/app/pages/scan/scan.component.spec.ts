import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { of } from 'rxjs';

import { ScanComponent } from './scan.component';
import { ElectronDeleteService, ElectronScanService } from '@service';

describe('ScanComponent', () => {
  let spectator: Spectator<ScanComponent>;
  const createComponent = createComponentFactory({
    component: ScanComponent,
    componentProviders: [
      {
        provide: ElectronDeleteService,
        useValue: {
          deleteDone$: of(''),
        },
      },
      {
        provide: ElectronScanService,
        useValue: {
          scanResult$: of([]),
        },
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

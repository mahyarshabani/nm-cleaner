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

  it('scan button should not call scan method when selected folder is not defined', () => {
    spyOn(spectator.component, 'scan');
    const scanButton = spectator.query('#scan_button');
    spectator.click(scanButton!);
    expect(spectator.component.scan).toHaveBeenCalledTimes(0);
  });
});

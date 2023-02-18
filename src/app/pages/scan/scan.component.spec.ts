import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { of } from 'rxjs';

import { ScanComponent } from './scan.component';
import { DeleteService, ScanService } from '@service';

describe('ScanComponent', () => {
  let spectator: Spectator<ScanComponent>;
  const createComponent = createComponentFactory({
    component: ScanComponent,
    componentProviders: [
      {
        provide: DeleteService,
        useValue: {
          deleteDone$: of(''),
        },
      },
      {
        provide: ScanService,
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

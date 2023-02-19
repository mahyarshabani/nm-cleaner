import { of } from 'rxjs';
import {
  createComponentFactory,
  mockProvider,
  Spectator,
} from '@ngneat/spectator';

import { ResultComponent } from './result.component';
import { DeleteService, ScanService } from '@service';

describe('ResultComponent', () => {
  let spectator: Spectator<ResultComponent>;
  const createComponent = createComponentFactory({
    component: ResultComponent,
    providers: [
      mockProvider(DeleteService, {
        deleteDone$: of(''),
        deleteLoading$: of(new Set([])),
      }),
      mockProvider(ScanService, {
        scanResult$: of([]),
      }),
    ],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});

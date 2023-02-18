import {
  createComponentFactory,
  Spectator,
  SpectatorElement,
} from '@ngneat/spectator';

import { ScanService, SelectService } from '@service';
import { SelectComponent } from './select.component';

describe('SelectComponent', () => {
  let spectator: Spectator<SelectComponent>;
  const createComponent = createComponentFactory({
    component: SelectComponent,
    componentProviders: [
      {
        provide: SelectService,
        useValue: {
          openSelectFolder: () => null,
        },
      },
      {
        provide: ScanService,
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

  it('should open select folder dialog when the drag and drop area clicked', () => {
    spyOn(spectator.component, 'openSelectFolderDialog');
    const dragAndDropArea = spectator.query(
      '.drag-and-drop-area'
    ) as SpectatorElement;
    spectator.click(dragAndDropArea);
    expect(spectator.component.openSelectFolderDialog).toHaveBeenCalledTimes(1);
  });
});

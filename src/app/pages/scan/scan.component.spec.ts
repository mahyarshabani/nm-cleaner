import { ScanComponent } from './scan.component';
import { ScanResult } from '@model';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { ELECTRON_API_TOKEN } from '../../constant/electron-api-token';
import IpcRendererEvent = Electron.IpcRendererEvent;

const scanResult: ScanResult[] = [
  new ScanResult('path/1'),
  new ScanResult('path/2'),
];

const p = {
  openSelectFolderDialog: () => 0,
  scan: (targetFolder: string) => 0,
  returnScanResult: (
    callback: (event: IpcRendererEvent, value: string) => void
  ) => '',
  scanCompleted: (callback: (event: IpcRendererEvent) => void) => '',
  delete: (targetFolder: string) => 0,
  deleteDone: (
    callback: (event: IpcRendererEvent, deletedPath: string) => void
  ) => 0,
};

describe('ScanComponent', () => {
  let spectator: Spectator<ScanComponent>;
  const createComponent = createComponentFactory({
    component: ScanComponent,
    providers: [{ provide: ELECTRON_API_TOKEN, useValue: p }],
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should create', () => {
    // weatherService.getWeatherData.andReturn(of(mockWeatherData));
    //
    // spectator = createComponent({
    //   providers: [{ provide: WeatherDataApi, useValue: weatherService }],
    // });
    expect(spectator.component).toBeTruthy();
  });
});

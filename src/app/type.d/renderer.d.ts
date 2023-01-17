import * as Electron from 'electron';

export interface IElectronAPI {
  openSelectFolderDialog: () => Promise<string>;
  scan: (targetFolder: string) => void;
  returnScanResult: (callback: any) => Electron.IpcRenderer;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}

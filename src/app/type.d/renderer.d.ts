import * as Electron from 'electron';

export interface IElectronAPI {
  openSelectFolderDialog: () => Promise<string>;
  scan: (targetFolder: string) => void;
  returnScanResult: (
    callback: (event: any, value: string) => void
  ) => Electron.IpcRenderer;
  scanCompleted: (callback: (event: any) => void) => Electron.IpcRenderer;
  delete: (targetFolder: string) => void;
  deleteDone: (callback: (event: any) => void) => Electron.IpcRenderer;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}

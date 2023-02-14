import * as Electron from 'electron';
import IpcRendererEvent = Electron.IpcRendererEvent;

export interface IElectronAPI {
  openSelectFolderDialog: () => Promise<string>;
  scan: (targetFolder: string) => void;
  returnScanResult: (
    callback: (event: IpcRendererEvent, value: string) => void
  ) => Electron.IpcRenderer;
  scanCompleted: (
    callback: (event: IpcRendererEvent) => void
  ) => Electron.IpcRenderer;
  delete: (targetFolder: string) => void;
  deleteDone: (
    callback: (event: IpcRendererEvent, deletedPath: string) => void
  ) => Electron.IpcRenderer;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}

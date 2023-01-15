export interface IElectronAPI {
  openSelectFolderDialog: () => Promise<string>;
  scan: (targetFolder: string) => void;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}

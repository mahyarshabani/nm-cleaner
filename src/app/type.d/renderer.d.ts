export interface IElectronAPI {
  openSelectFolderDialog: () => void,
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}

export interface IElectronAPI {
  openSelectFolderDialog: () => Promise<string>,
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}

import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  openSelectFolderDialog: () => ipcRenderer.invoke('dialog:selectFolder')
})

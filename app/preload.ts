import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  openSelectFolderDialog: () => ipcRenderer.send('dialog:selectFolder')
})

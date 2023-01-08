// import { contextBridge, ipcRenderer } from 'electron';
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  openSelectFolderDialog: () => ipcRenderer.send('dialog:selectFolder')
})

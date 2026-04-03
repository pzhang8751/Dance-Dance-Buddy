const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  // file operations
  openVideo: () => ipcRenderer.invoke('dialog:openVideo'),
  
  // python bridge
  comparePoses: (data) => ipcRenderer.invoke('python:comparePoses', data),
  
  // app info
  getVersion: () => ipcRenderer.invoke('app:getVersion'),
})
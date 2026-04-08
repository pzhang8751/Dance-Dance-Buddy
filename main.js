const { app, BrowserWindow, ipcMain, dialog, session } = require('electron')
const path = require('path')

const isDev = process.env.NODE_ENV === 'development'

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  if (isDev) {
    setTimeout(() => {
      win.loadURL('http://localhost:5173')
      win.webContents.openDevTools()
    }, 1500)
  } else {
    win.loadFile(path.join(__dirname, 'dist/index.html'))
  }
}

// handle ipc calls from preload here
ipcMain.handle('dialog:openVideo', async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [{ name: 'Videos', extensions: ['mp4', 'mov', 'avi'] }]
  })
  return result.filePaths
})

app.whenReady().then(() => {
  // allowing camera usage
  session.defaultSession.setPermissionRequestHandler((webContents, permission, callback) => {
    if (permission === 'media') callback(true)
  })

  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
const { app, BrowserWindow } = require('electron')
const path = require("path")
const isDev = require("electron-is-dev")

let win
function createWindow () {
   win = new BrowserWindow({
    width: 1000,
    height: 1000,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadURL(
      isDev ? "http://localhost:3000" : `file://${path.join(__dirname,"../build/index.html")}`
  )
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

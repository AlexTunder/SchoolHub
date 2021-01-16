// const apis = require('./script.example');
const { app, BrowserWindow } = require('electron');
// const script = require("./script.example");

const { ipcMain } = require('electron');

ipcMain.on('asynchronous-message', (event, arg) => {
  console.log(arg)
  event.reply('asynchronous-reply', 'pong')
})

ipcMain.on('synchronous-message', (event, arg) => {
  console.log(arg)
  event.returnValue = 'pong'
})

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true
    }
  })

  win.loadFile('index.html');
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', () => {
    // console.log(someVar);
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
})

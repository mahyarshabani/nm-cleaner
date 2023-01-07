const {app, BrowserWindow} = require('electron');

function createWindow() {
  const win = new BrowserWindow({width: 800, height: 800});
  win.loadFile('dist/nm-cleaner/index.html');
  win.setMenu(null);
}

app.whenReady().then(() => {
  createWindow()
})

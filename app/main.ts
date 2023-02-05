import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as fs from 'fs';
import { Controller } from './controller';

let win: BrowserWindow | null = null;
const args = process.argv.slice(1),
  serve = args.some((val) => val === '--serve');

function createWindow(): BrowserWindow {
  // const size = screen.getPrimaryDisplay().workAreaSize;

  const preloadURL = path.join(__dirname, 'preload.js');
  win = new BrowserWindow({
    width: 800,
    height: 600,
    center: true,
    resizable: false,
    webPreferences: {
      preload: preloadURL,
    },
  });
  win.setMenu(null);

  const controller = new Controller(win);
  controller.init();

  if (serve) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const debug = require('electron-debug');
    debug();

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('electron-reloader')(module);
    console.log('Running on localhost5000');
    win.loadURL('http://localhost:5000');
  } else {
    let pathIndex = './index.html';
    if (fs.existsSync(path.join(__dirname, '../dist/index.html'))) {
      pathIndex = '../dist/index.html';
    }
    const url = new URL(path.join('file:', __dirname, pathIndex));
    win.loadURL(url.href);
  }

  win.on('closed', () => {
    win = null;
  });

  return win;
}

try {
  app.on('ready', () => {
    createWindow();
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    if (win === null) {
      createWindow();
    }
  });
} catch (e) {
  console.error(e);
}

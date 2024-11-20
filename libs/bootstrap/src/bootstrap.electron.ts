import { app, BrowserWindow, BrowserWindowConstructorOptions, globalShortcut } from 'electron';
import { ElectronModule, ElectronModuleAsyncOptions } from '@doubleshot/nest-electron';
import { join } from 'node:path';
import installDevTools, { VUEJS_DEVTOOLS, VUEJS3_DEVTOOLS } from 'electron-devtools-installer';

const isDev = !app.isPackaged;

const URL = isDev
  ? process.env.DS_RENDERER_URL
  : `file://${join(app.getAppPath(), 'dist/render/index.html')}`;;

const winOptions: BrowserWindowConstructorOptions = {
  width: 1024,
  height: 768,
  autoHideMenuBar: true,
  frame: false,
  webPreferences: {
    contextIsolation: true,
    nodeIntegration: true,
    preload: join(__dirname, '../preload/index.js'),
  },
}

const electron: ElectronModuleAsyncOptions = {
  useFactory: async () => {
    const win = new BrowserWindow(winOptions);

    win.on('closed', () => win.destroy());

    // 打开vue开发者工具
    isDev && installDevTools(VUEJS3_DEVTOOLS, { forceDownload: true });
    win.on('ready-to-show', () => {
      isDev && win.webContents.openDevTools();
    });

    // 快捷键打开vue开发者工具
    app.whenReady().then(() => {
      globalShortcut.register('Control+Alt+D', () => {
        win.webContents.openDevTools();
      });
    });

    win.loadURL(URL);

    return { win };
  }
}

export const electronModule = ElectronModule.registerAsync(electron);

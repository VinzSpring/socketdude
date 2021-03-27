'use strict'

import { app, protocol, BrowserWindow, Menu, ipcMain, dialog } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
import path from 'path'
import fs from 'fs'
const isDevelopment = process.env.NODE_ENV !== 'production'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: (process.env
          .ELECTRON_NODE_INTEGRATION as unknown) as boolean,
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  const menu = Menu.buildFromTemplate([
    {
      label: 'File',
      submenu: [
        {
          label: 'Open',
          click() {
            win.webContents.send('open');
          },
          accelerator: 'CmdOrCtrl+o',
        },
        {
          label: 'Save',
          click() {
            win.webContents.send('save');
          },
          accelerator: 'CmdOrCtrl+s',
        },
      ],
    },
  ]);
  Menu.setApplicationMenu(menu);
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

ipcMain.on('vuex-electron', (event, {type, payload}) => {
  let buttonIndex
  let path
  switch(type) {
    case 'SAVE_DIALOG_BEFORE_OPEN':
      buttonIndex = dialog.showMessageBoxSync({
        title: 'SocketDude',
        message: 'Do you want to save the changes you made?',
        buttons: ['Don\'t Save', 'Cancel', 'Save'],
      });

      return event.reply('vuex-electron', {type: 'SAVE_DIALOG_BEFORE_OPEN', payload: buttonIndex});
    case 'SAVE_DIALOG_BEFORE_CLOSE':
      buttonIndex = dialog.showMessageBoxSync({
        title: 'SocketDude',
        message: 'Do you want to save the changes you made?',
        buttons: ['Don\'t Save', 'Cancel', 'Save'],
      });

      return event.reply('vuex-electron', {type: 'SAVE_DIALOG_BEFORE_CLOSE', payload: buttonIndex});
    case 'SHOW_SAVE_DIALOG':
      path = dialog.showSaveDialogSync({})
      return event.reply('vuex-electron', {type: 'SHOW_SAVE_DIALOG', payload: path});
    case 'SHOW_OPEN_DIALOG':
      path = dialog.showOpenDialogSync({ properties: ['openFile'] });
      return event.reply('vuex-electron', {type: 'SHOW_OPEN_DIALOG', payload: path});
    case 'CLOSE_WIN':
      return app.exit()
    case 'WRITE':
      return fs.writeFile(payload.path, JSON.stringify(payload.data), (err) => {
        if (err) console.error(err)
      });
    case 'READ':
      return fs.readFile(payload.path, (err, data) => {
        if (err) console.error(err)
        try {
          return event.reply('vuex-electron', { type: 'READ', payload :JSON.parse(data.toString())})
        } catch (err) {
          console.error(err)
        }
    });
  }
})

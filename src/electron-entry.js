const { app, BrowserWindow, Menu } = require('electron')

function createWindow() {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadURL("http://localhost:8080");

  const menu = Menu.buildFromTemplate([
    {
      label: 'File',
      submenu: [
        {
          label: 'Save', 
          click() {
            win.webContents.send('save');
          },
          accelerator: 'CmdOrCtrl+s'
        },
      ]
    }
  ])
  Menu.setApplicationMenu(menu);

  // open chrome devtools
  win.webContents.openDevTools();
}

app.on('ready', createWindow)

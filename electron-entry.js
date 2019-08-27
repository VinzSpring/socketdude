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
  const winURL = process.env.NODE_ENV === 'dev'
  ? 'http://localhost:8080'
  : `file://${process.cwd()}/build/index.html`
  win.loadURL(winURL);

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
      ]
    }
  ])
  Menu.setApplicationMenu(menu);
    
  // open chrome devtools
  if(process.env.NODE_ENV === 'dev')
    win.webContents.openDevTools();
}

app.on('ready', createWindow)

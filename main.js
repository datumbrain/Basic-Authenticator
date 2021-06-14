const { app, BrowserWindow } = require('electron');
const path = require('path');

const { spawn } = require('child_process');
const startServer = () => {
  const ls = spawn('./server/bin/my-project');
  ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });
  ls.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });
};

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: './electronJs.png',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  mainWindow.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();
  startServer();
  console.log('PROCESS', process.env.REACT_APP_API_URL);
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const binaryPath = path.join(__dirname, '/server/binary-');
const { exec } = require('child_process');
const startServer = () => {
  const ls = exec(
    process.platform === 'linux'
      ? binaryPath + 'linux'
      : process.platform === 'darwin'
      ? binaryPath + 'mac'
      : process.platform === 'win32'
      ? binaryPath + 'win'
      : ''
  );
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
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true,
    })
  );
}
app.whenReady().then(() => {
  createWindow();
  startServer();
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('before-quit', function () {
  exec('kill -9 $(lsof -i:6969 -t) 2> /dev/null');
  console.log('quitting');
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

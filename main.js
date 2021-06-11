const { app, BrowserWindow } = require('electron');
const path = require('path');

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

const homeRequest = () => {
  const { net } = require('electron');
  const request = net.request('http://localhost:6969/');
  request.on('response', (response) => {
    console.log(`STATUS: ${response.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(response.headers)}`);
    response.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`);
    });
    response.on('end', () => {
      console.log('No more data in response.');
    });
  });
  request.end();
};

app.whenReady().then(() => {
  createWindow();
  homeRequest();
  console.log('PROCESS', process.env.REACT_APP_API_URL);
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

if (process.platform === 'win32') {
    app.setAppUserModelId('com.etml.prod.v1');
}
app.name = 'ETML';

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        icon: path.join(__dirname, 'assets/image/app_icon.png'),
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true
        },
        autoHideMenuBar: true,
        backgroundColor: '#080810',
        title: 'ETML'
    });

    win.loadFile('index.html');

    // Optionnel : Maximiser au démarrage
    // win.maximize();
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

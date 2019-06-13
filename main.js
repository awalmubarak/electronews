const electron = require('electron')
const {app, BrowserWindow} = electron

let win
app.on('ready', ()=>{
    win = new BrowserWindow({
        width: 700, 
        height: 400,
        webPreferences: {
            nodeIntegration: true
        }
    })
    win.loadFile('index.html')
})
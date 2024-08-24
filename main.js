console.log("Processo principal")
console.log(`Electron: ${process.versions.electron}`)
const { app, BrowserWindow, nativeTheme, Menu, shell, ipcMain, dialog, } = require("electron")
const { error } = require("node:console")
const path = require('node:path')
const { close } = require("original-fs")


// Janela principal 
const createWindow = () => {
    nativeTheme.themeSource = "dark"
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        icon: './src/public/img/abobora.png',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
        // resizable: false
        // autoHideMenuBar: true
        // titleBarStyle: 'hidden'
    })
    // menu personalizado
    Menu.setApplicationMenu(Menu.buildFromTemplate(templete))
    win.loadFile('./src/views/index.html')
}

// janela sobre
const aboutWindow = () => {
    const about = new BrowserWindow({
        width: 360,
        height: 220,
        icon: './src/public/img/abobora.png',
        autoHideMenuBar: true,
        resizable: false
    })
    about.loadFile('./src/views/sobre.html')
}

// Janela Secundária
const childWindow = () => {
    const father = BrowserWindow.getFocusedWindow()
    if (father) {
        const child = new BrowserWindow({
            width: 640,
            height: 480,
            icon: './src/public/img/abobora.png',
            autoHideMenuBar: true,
            // resizable: false,
            // parent:father,
            // modal:true
        })
        child.loadFile('./src/views/child.html')
    }
}
app.whenReady().then(() => {
    createWindow()
    // aboutWindow()

    // IPC >>>>>>>>>>>>>>>>>>>>>>>>>>>>
    ipcMain.on('open-child', () => {
        childWindow()
    })
    ipcMain.on('renderer-message', (event, message) => {
        console.log(`processo principal recebeu uma mensagem: ${message}`)
        event.reply('main-message', 'Ola!  rederizador')
    })

    ipcMain.on('dialog-info', () => {
        dialog.showMessageBox({
            type: 'info',
            title: 'Informação',
            message: 'Mensagem',
            buttons: [
                'OK'
            ]
        })
    })
    ipcMain.on('dialog-warning', () => {
        dialog.showMessageBox({
            type: 'warning',
            title: 'Aviso',
            message: 'Confirma Ação',
            buttons: [
                'Sim', 'Não'
            ],
            defaultId: 0
        }).then((result) => {
            console.log(result)
            if (result.response === 0) {
                console.log('comfirmado')
            }
        })
    })
    ipcMain.on('dialog-select', () => {
        dialog.showOpenDialog({
            properties: ['openDirectory']
        }).then((result) => { 
            console.log(result)
        }).catch(error => {
            console.log(error)
        })
    })
    // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})


// templete menu 
const templete = [
    {
        label: 'Arquivo',
        submenu: [
            {
                label: 'Janela Secundária',
                click: () => childWindow()
            },
            {
                label: 'Sair',
                click: () => app.quit(),
                accelerator: 'Alt+F4'
            }
        ]
    },
    {
        label: 'Exibir',
        submenu: [
            {
                label: 'Recarregar',
                role: 'reload'
            },
            {
                label: 'Ferramentas do desenvolvedor',
                role: 'toggleDevTools'
            },
            {
                type: 'separator'
            },
            {
                label: 'Aplizar Zoom',
                role: 'zoomIn'
            },
            {
                label: 'Reduzir',
                role: 'zoomOut'
            },
            {
                label: 'Restaurar o zoom padrão',
                role: 'resetZoom'
            }
        ]
    },
    {
        label: 'Ajuda',
        submenu: [{
            label: 'doc',
            click: () => shell.openExternal('https://github.com/DiogoSilvaDK/Electron.git')
        },
        {
            type: 'separator'
        },
        {
            label: 'Sobre',
            click: () => aboutWindow()
        }
        ]
    },
    {
        label: 'Ferramentas',
        submenu: [{
            label: 'Registro'
        },
        {
            label: 'SMS'
        }
        ]
    }
]



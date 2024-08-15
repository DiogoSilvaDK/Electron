console.log("Processo principal")
const { app, BrowserWindow, nativeTheme, Menu, shell } = require("electron")
const { close } = require("original-fs")


// Janela principal 
const createWindow = () => {
    nativeTheme.themeSource = "dark"
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        icon: './src/public/img/abobora.png',

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
            // autoHideMenuBar: true,
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
        label:'Ferramentas',
        submenu:[{
            label:'Registro'
        },
        {
            label:'SMS'
        }
        ]
    }
]
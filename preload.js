const { contextBridge, ipcRenderer } = require('electron')


// processos 
contextBridge.exposeInMainWorld('api', {
    verElectron: () => process.versions.electron,
    open: () => ipcRenderer.send('open-child'),
    send: (massage) => ipcRenderer.send('renderer-message', massage),
    on: (massage) => ipcRenderer.on('main-message',massage)
})

// Manipulação do DOM

window.addEventListener('DOMContentLoaded', () => {
    const dataAtual = document.getElementById('dataAtual').innerHTML = obterData()
})

function obterData() {
    const data = new Date()
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
    return data.toLocaleDateString('pt-BR', options)
}
const { contextBridge } = require('electron')


// processos 
contextBridge.exposeInMainWorld('api', {
    verElectron: () => process.versions.electron
})

// Manipulação do DOM

window.addEventListener('DOMContentLoaded', () => {
    const dataAtual = document.getElementById('dataAtual').innerHTML = obterData()
})

function obterData(){
    const data = new Data()
    const options = {
        weekday:'long',
        year:'numeric',
        month:'long',
        day: 'numeric'
    }
    return data.toLocaleDataString('pt-BR',options)
}
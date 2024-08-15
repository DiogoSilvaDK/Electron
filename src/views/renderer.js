/**
 * processo de rederização
 */

console.log('processo de rederização')
console.log(`Electron: ${api.verElectron()}`)


function openChild() {
    // console.log("teste do btn")
    api.open()
}


api.send('OI!!')
api.on((event,mensagem)=>{
    console.log(`Processo de redenização recebeu uma mensagem: ${mensagem}`)
})
const container = document.querySelector('.grafico')
const context = container.getContext('2d')
const form = document.querySelector('form')

let grafico = null

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const aplicacao = document.querySelector('#capital').value 
    const ipca = document.querySelector('#taxa-ipca').value
    const taxa = document.querySelector('#taxa-investimento').value
    const opcaoMeses = document.querySelector('#meses').value
    gerarGrafico(aplicacao, taxa, ipca, opcaoMeses)
})

function gerarGrafico(aplicacao, taxa, ipca, tempo){
    
    let valoresAplicacao = []
    let valoresIpca = []
    let aplicacaoAtual = aplicacao
    let ipcaAtual = aplicacao
    let lucro = []
    let partes = []
    let cores = []

    for (let i = 1; i <= tempo; i++){
        aplicacaoAtual *= (1 + taxa / 100)
        ipcaAtual *= (1 + ipca / 100)

        valoresAplicacao.push(Number(aplicacaoAtual.toFixed(2)))
        valoresIpca.push(Number(ipcaAtual.toFixed(2)))
        lucro.push(Number(aplicacaoAtual - ipcaAtual).toFixed(2))

        if (valoresAplicacao[i-1] - valoresIpca[i-1] < 0){
            cores.push('red')
        } else {
            cores.push('green')
        }
    }

    const inputResApp = document.querySelector('#aplicacao-final')
    inputResApp.innerText = `Montante final da aplicação: R$ ${valoresAplicacao[valoresAplicacao.length - 1]}`
    const inputResIpca = document.querySelector('#ipca-final')
    inputResIpca.innerText = `Montante final corrigido pelo IPCA: R$ ${valoresIpca[valoresIpca.length - 1]}`
    const lucroRes = document.querySelector('#lucro-final')
    lucroRes.innerText = `Lucro final: R$ ${(valoresAplicacao[valoresAplicacao.length - 1] - valoresIpca[valoresIpca.length - 1]).toFixed(2)}`

    if (tempo == 24){
        for (let i = 2; i <= tempo; i += 2){
            partes.push(i.toString())
        }
    } else {
        for (let i = 1; i <= tempo; i++){
            partes.push(i.toString())
        }
    }

    if (grafico !== null) grafico.destroy()

    grafico = new Chart(context, {
        type: 'line',
        data: {
            labels: partes,
            datasets: [
                {
                    label: 'Montante da aplicação',
                    data: valoresAplicacao,
                    backgroundColor: 'black'
                },
                {
                    label: 'Valor corrigido pelo IPCA',
                    data: valoresIpca,
                    backgroundColor: 'yellow'
                },
                {
                    label: 'Lucro',
                    data: lucro,
                    backgroundColor: cores
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Tempo (meses)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Montante (R$)'
                    }
                }
            }
        }
    })
}
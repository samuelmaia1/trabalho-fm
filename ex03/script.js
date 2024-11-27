let volD = parseInt(document.getElementById("volumeDados").value);
const carac = document.getElementById("caracteristicas")
const tempo = document.getElementById("tempo")

function Quicksort(array, esq, dir){
    let i = esq;
    let j = dir;
    let pivo = array[Math.floor((esq + dir) / 2)];

    while(i <= j){
        while(array[i] < pivo){i++}
        while(array[j] > pivo){j--}
        if(i <= j){
            let temp = array[i]
            array[i] = array[j]
            array[j] = temp
            i++
            j--
        }
    }
    if(esq < j){
        Quicksort(array,esq,j)
    }
    if(i < dir){
        Quicksort(array,i,dir)
    }
}

function Mergesort(array, esq, dir) {
    if (esq < dir) {
        let meio = Math.floor((esq + dir) / 2); 
        Mergesort(array, esq, meio);            
        Mergesort(array, meio + 1, dir);        
        Intercalar(array, esq, meio, dir);     
    }
}

function Intercalar(array, esq, meio, dir) {
    let nEsq = meio - esq + 1; 
    let nDir = dir - meio; 

    let arrayEsq = new Array(nEsq + 1);
    let arrayDir = new Array(nDir + 1);

    for (let i = 0; i < nEsq; i++) {
        arrayEsq[i] = array[esq + i];
    }
    for (let j = 0; j < nDir; j++) {
        arrayDir[j] = array[meio + 1 + j];
    }

    arrayEsq[nEsq] = Infinity;
    arrayDir[nDir] = Infinity;

    let iEsq = 0, iDir = 0;
    for (let k = esq; k <= dir; k++) {
        if (arrayEsq[iEsq] <= arrayDir[iDir]) {
            array[k] = arrayEsq[iEsq];
            iEsq++;
        } else {
            array[k] = arrayDir[iDir];
            iDir++;
        }
    }
}

function Heapsort(array, n) {

    for (let ultimo = 1; ultimo < n; ultimo++) {
        construir(array, ultimo);
    }
    let ultimo = n - 1;
    while (ultimo > 0) {
        trocar(array, 0, ultimo--);
        reconstruir(array, ultimo + 1);
    }
}

function construir(array, ultimo) {
    for (let i = ultimo; i > 0 && array[i] > array[Math.floor((i - 1) / 2)]; i = Math.floor((i - 1) / 2)) {
        trocar(array, i, Math.floor((i - 1) / 2));
    }
}

function reconstruir(array, tamHeap) {
    let i = 0;
    while (hasFilho(i, tamHeap)) {
        let filho = getMaiorFilho(array, i, tamHeap);
        if (array[i] < array[filho]) {
            trocar(array, i, filho);
            i = filho;
        } else {
            break;
        }
    }
}

function hasFilho(i, tamHeap) {
   
    return i < Math.floor(tamHeap / 2);
}

function trocar(array, i, j) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

function getMaiorFilho(array, i, tamHeap) {
    
    if ((2 * i + 1) === (tamHeap - 1) || array[2 * i + 1] > array[2 * i + 2]) {
        return 2 * i + 1;
    } else {
        return 2 * i + 2;
    }
}

function Converter(numero){
    var n = numero / 4 
    return n
}

function Vetor(numero) {
    var vetor = [];
    var t = numero
    for (let i = 0; i < numero; i++) {
        vetor[i] = t;
        t--
    }
    return vetor;
}

function Copia(array){
    let cp = []
    for(let i = 0; i < array.length; i++){
        cp[i] = array[i]
    }
    return cp;
}

function Calcular(event) {
    event.preventDefault();
    let volD = parseInt(document.getElementById("volumeDados").value);
    
    let tamanho = Converter(volD)
    let vetor = Vetor(tamanho)
    let c1 = Copia(vetor)
    let c2 = Copia(vetor)
    let c3 = Copia(vetor)

    let inicioQ = performance.now()
    Quicksort(c1, 0, c1.length - 1)
    let fimQ  = performance.now()
    let tempoQuick = fimQ - inicioQ

    let inicioM = performance.now()
    Mergesort(c2, 0, c2.length - 1)
    let fimM = performance.now()
    let tempoMerge = fimM - inicioM

    let inicioH = performance.now()
    Heapsort(c3, c3.length)
    let fimH = performance.now()
    let tempoHeap = fimH - inicioH

    const grafico = new Chart("grafico", {
        type: "line",
        data: {},
        options: {}
    });

    carac.innerHTML = `<div>
                            <h2>Principais características de cada método<h2/>
                            <h4>Quicksort:</h4>
                                <p>Estratégia: Divisão e conquista.</p>
                                <p>Complexidade: O(n log n)</p>
                                <p>Estabilidade: Não é estável.</p>
                            <h4>Mergesort:</h4>
                                <p>Estratégia: Divisão e conquista.</p>
                                <p>Complexidade: O(n log n)</p>
                                <p>Estabilidade: Estável.</p>
                            <h4>Heapsort</h4>
                                <p>Estratégia: Baseado em estrutura de dados de heap binário.</p>
                                <p>Complexidade: O(n log n)</p>
                                <p>Estabilidade: Não é estável.</p>
                        </div>
    `


    tempo.innerHTML = `<div>
                            <h2>Tempo de processamento<h2/>
                            <p>Quicksort: ${tempoQuick.toFixed(2)} ms</p>
                            <p>Mergesort: ${tempoMerge.toFixed(2)} ms</p>
                            <p>Heapsort: ${tempoHeap.toFixed(2)} ms</p>
                        </div>`
}
let volD = parseInt(document.getElementById("volumeDados").value);
function Selecao(array){
    for (let i = 0; i < (array.length - 1); i++) {
        let menor = i;
        for(let j = (i + 1); j < array.length; j++){
            if(array[menor] > array[j]){
                menor = j;
            }
        }
        let temp = array[menor];
        array[menor] = array[i];
        array[i] = temp;
    }
}

function Bolha(array){
    let temp;
    for (let i = 0; i < (array.length - 1); i++) {
        for(let j = (array.length - 1);j > i; j--){
            if(array[j] < array[j - 1]){
                temp = array[j];
                array[j] = array[j - 1];
                array[j - 1] = temp;
            }
        }
    }
}

function Insercao(array){
    for (let i = 1; i < (array.length); i++) {
        let temp = array[i];
        let j = i - 1;
        while((j >= 0) && (array[j] > temp)){
            array[j + 1] = array[j];
            j--;
        }
        array[j + 1] = temp;
    }
}

function Converter(numero){
    var n = numero * 1048576 * 8 
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

function Calcular(event) {
    event.preventDefault();
    let volD = parseInt(document.getElementById("volumeDados").value);
    console.log(volD)
    let novoVetor = []

    let novoNumero = Converter(volD)
    novoVetor = Vetor(novoNumero)
    console.log("Volume convertido em bits:", novoNumero)
    console.log("Vetor antes da ordenação:", novoVetor)

}
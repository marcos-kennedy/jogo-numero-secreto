let listaNumerosSorteados = [];
let numeroMaximo = 20;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

//Função com parâmetro e sem retorno
function escreverNaTela (tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female',{rate: 1.1}) // narrador de textos
}

function mensagemIncial(){
    escreverNaTela('h1', 'Jogo do número secreto');
    escreverNaTela('p', `Escolha um número entre 1 a ${numeroMaximo}`);
}
mensagemIncial();

//Função sem parâmetro e sem retorno
function verificarChute () {
    let chuteUsuario = document.querySelector('input').value; // pega o valor dentro do input
    
    if (chuteUsuario == numeroSecreto) {
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        escreverNaTela('h1', 'Acertou :)');
        escreverNaTela('p', `Parabéns você acertou o número secreto com ${tentativas} ${palavraTentativa}!`);
        document.getElementById('reiniciar').removeAttribute('disabled'); 

    } else {
        if (chuteUsuario > numeroSecreto) {
            escreverNaTela('p', 'O número secreto é menor');
        } else {
            escreverNaTela('p', 'O número secreto é maior')
        }
        tentativas++;
        limparInput();
    }
}
//Função com retorno
function gerarNumeroAleatorio(){
    let numeroGerado =  parseInt(Math.random() * numeroMaximo + 1);
    let tamanhoLista = listaNumerosSorteados.length;
    
    if (tamanhoLista == numeroMaximo) {
        listaNumerosSorteados = [];
    }
    if (listaNumerosSorteados.includes(numeroGerado)) {
        return gerarNumeroAleatorio();
    } else {
        listaNumerosSorteados.push(numeroGerado);
        console.log(listaNumerosSorteados);
        return numeroGerado;
    }
   
}

function limparInput(){
    chuteUsuario = document.querySelector('input');
    chuteUsuario.value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    tentativas = 1;
    limparInput();
    mensagemIncial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}
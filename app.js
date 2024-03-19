// Documenta��o: https://developer.mozilla.org/pt-BR/docs/Web/API/Document/querySelector
//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'Jogo do Numero Secreto';

//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'Escolha um numero entre 1 e 10';

let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;
exibirMensagemInicial();

// Uma forma resumida de escrever o c�digo acima
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    falarTexto(texto);
}

function exibirMensagemInicial() {
    //Entre par�nteses, passamos o tipo de tag e o texto que queremos exibir
    exibirTextoNaTela('h1', 'Jogo do Numero Secreto');
    exibirTextoNaTela('p', 'Escolha um numero entre 1 e 10');
}

function verificarChute() {
    let chute = document.querySelector('input').value;
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Parabens! Voce acertou!');

        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        // As crases e o ${} s�o usados para concatenar vari�veis com texto.
        let mensagemTentativas = `Voce descobriu o numero secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }
    else if (chute > numeroSecreto) {
        exibirTextoNaTela('h1', 'Errou! O numero secreto e menor');
    }
    else {
        exibirTextoNaTela('h1', 'Errou! O numero secreto e maior');
    }
    tentativas++;
    limparCampo();
}

// Fun��o recursiva para gerar um n�mero aleat�rio entre 1 e 10
function gerarNumeroAleatorio() {

    // Math.random() gera um n�mero aleat�rio entre 0 e 1
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);

    // Se o n�mero j� foi sorteado, chama a fun��o novamente
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    // Se a lista j� tem 3 elementos, limpa a lista
    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }

    // Se o n�mero j� foi sorteado, chama a fun��o novamente
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    }
    else {

        // Se o n�mero ainda n�o foi sorteado, adiciona ele na lista e retorna o n�mero
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input').value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

function falarTexto(texto) {
    if ('speechSynthesis' in window) {
        const mensagem = new SpeechSynthesisUtterance(texto);
        // Define a voz e o idioma desejados
        mensagem.lang = 'pt-BR';
        window.speechSynthesis.speak(mensagem);
    } else {
        console.log("A s�ntese de fala n�o � suportada neste navegador.");
    }
}

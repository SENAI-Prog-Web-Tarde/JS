const mainPage = document.querySelector('.main-page');

const botao = document.createElement('button');
botao.id = "botaoManipulacao";
botao.type = "button";
botao.innerText = "Botão Para Manipular Página";

mainPage.appendChild(botao);

const link = document.createElement('a');
link.href = 'https://google.com';
link.target = '_blank';
link.id = 'linkTeste';
link.classList.add('teste');
// setTimeout(() => {link.classList.remove('teste')}, 5000)
link.innerText = 'Google';

mainPage.appendChild(link)

setTimeout(() => {
    link.href = 'https://microsoft.com'
    link.innerText = 'Microsoft';
}, 5000)

const link2 = document.createElement('a');
link2.href = 'https://instagram.com';
link2.target = '_blank';
link2.id = 'link2Teste';
link2.classList.add('teste');
link2.innerText = 'Instagram';

mainPage.appendChild(link2)

const botaoManipulacao = document.querySelector('#botaoManipulacao');



botaoManipulacao.addEventListener('click', (event) => {
    event.preventDefault();

    console.log(event.target);

    alert("Botão pressionado!");

    // event.target.style.fontSize = '20px'

    const promptMsg = prompt("Digite seu nome: ");
    const nomeElement = document.querySelector("#nomeDigitado") || document.createElement('p');
    nomeElement.id = "nomeDigitado";
    nomeElement.innerText = `Seja Bem-Vindo, ${promptMsg}!`;

    mainPage.append(nomeElement)

    const tempoTela = setInterval(() => {
        const timeElement = document.querySelector("#tempoTela") || document.createElement('p')
        timeElement.id = "tempoTela";
        timeElement.innerHTML = `Data e hora atual: ${new Date().toLocaleString()}`

        if(!mainPage.contains(timeElement))
            mainPage.append(timeElement)
    }, 1*1000)

    setTimeout(() => {
        // document.querySelector("#tempoTela").remove();
        clearInterval(tempoTela)
    }, 10*1000)
})

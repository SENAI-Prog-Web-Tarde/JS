// print("Olá mundo!") // Clássico Hello World
// print(2+3)

// console.log("Olá Mundo")

// console.log("1" + "1")
// console.log(1 + "as")
// console.log(1 + 1)
// console.log(1 - 1)
// console.log(1 - "as")
// console.log("1" - "1")

// var nomeAluno = "João" // Declaração de variável obsoleta
// let idadeAluno = 17 // Declaração de variável moderna
// let cidadeAluno = "São Paulo" // Declaração de constante (valor imutável)
// const CPF = "11111111111"
// nomeLinguagem = "JavaScript" // Declaração de variável de forma global, mas sem palavra-chave (não recomendado)

// console.log(nomeAluno);
// console.log(idadeAluno);
// console.log(cidadeAluno);
// console.log(CPF);
// console.log(nomeLinguagem);

// const podeDirigir = (idade) => {
//     return idade >= 18 ? true : false;
// }

// const DADOS_ALUNO = {
//     nome: "João",
//     idade: 17,
//     cidade: "São Paulo",
//     linguagem: "JS"
// }

// DADOS_ALUNO.podeDirigir = podeDirigir(DADOS_ALUNO.idade)

// console.log(DADOS_ALUNO);

// console.log("O aluno " + DADOS_ALUNO.nome + " tem " + DADOS_ALUNO.idade + " anos e mora em " + DADOS_ALUNO.cidade + ".")
// console.log(`O aluno ${DADOS_ALUNO.nome} tem ${DADOS_ALUNO.idade} anos e mora em ${DADOS_ALUNO.cidade}.`)

// let valor_a = 10
// let valor_b = 30.756

// // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math
// console.log("Soma: " + (valor_a + valor_b)) // Soma
// console.log("Subtração: " + (valor_a - valor_b)) // Subtração
// console.log("Multiplicação: " + (valor_a * valor_b)) // Multiplicação
// console.log("Divisão: " + (valor_a / valor_b)) // Divisão
// console.log("Resto da divisão: " + (valor_a % valor_b)) // Resto da divisão
// console.log("Divisão (truncada): " + Math.trunc(valor_a / valor_b)) // Divisão Inteira
// console.log("Exponenciação: " + Math.pow(3, 2)) // Exponenciação

// console.log(Number(DADOS_ALUNO.idade))
// console.log(isNaN(DADOS_ALUNO.idade))
// console.log(String(DADOS_ALUNO.idade))
// console.log(Boolean(DADOS_ALUNO.linguagem))
// console.log(typeof DADOS_ALUNO.podeDirigir)

// DADOS_ALUNO.nome = "Maria"
// DADOS_ALUNO.idade = 17

// if (DADOS_ALUNO.idade >= 16 && DADOS_ALUNO.idade < 18) {
//     console.log(`A aluna ${DADOS_ALUNO.nome} tem ${DADOS_ALUNO.idade} anos e pode votar, mas não pode dirigir.`)
// } else if (DADOS_ALUNO.idade >= 18) {
//     console.log(`A aluna ${DADOS_ALUNO.nome} tem ${DADOS_ALUNO.idade} anos, deve votar, e pode dirigir.`)
// } else {
//     console.log(`A aluna ${DADOS_ALUNO.nome} tem ${DADOS_ALUNO.idade} anos e não pode votar nem dirigir.`)
// }

// function montarPredio() {
//     let predio = []
//     let cabecalhoTabela = ["Andar", "Apartamentos"]
//     const quantidadeAndares = 10
//     const quantidadeApartamentos = 5

//     for (let andar = 1; andar <= quantidadeAndares; andar++) {
//         predio.push([])
//         for (let apartamento = 1; apartamento <= quantidadeApartamentos; apartamento++) {
//             if (apartamento > 9){
//                 predio[andar-1].push(Number(`${andar}${apartamento}`))
//             } else {
//                 predio[andar-1].push(Number(`${andar}0${apartamento}`))
//             }

//             if (apartamento > 1){
//                 cabecalhoTabela.push("")
//             }
//         }
//     }

//     console.clear()
//     console.log("Olympo Edifícios")
//     console.table(predio)
// }

// montarPredio()

// class Aluno {
//     constructor(nome, idade, cidade) {
//         this.nome = nome
//         this.idade = idade
//         this.cidade = cidade
//     }
// }

// const novoAluno = new Aluno("PedroTechJF", "15", "Maranhão");

// console.log(novoAluno)


// setTimeout(() => {
//     console.log("Bem-vindo ao sistema do Smart Control!")

//     while (true) {
//         let opcao = prompt("Escolha uma opção:\n1 - Montar prédio\n2 - Novo Aluno\n3 - Sair")

//         if (opcao === "3" || opcao === null) {
//             console.log("Saindo...")
//             break;
//         }

//         switch (opcao) {
//             case "1":
//                 montarPredio()
//                 break;
//             case "2":
//                 let nomeNovoAluno = prompt("Digite o nome do aluno:")
//                 let idadeNovoAluno = prompt("Digite a idade do aluno:")
//                 let cidadeNovoAluno = prompt("Digite a cidade do aluno:")
//                 console.log(new Aluno(nomeNovoAluno, idadeNovoAluno, cidadeNovoAluno))
//                 break;
//             default:
//                 console.log("Opção inválida!")
//                 break;
//         }
//     }
// }, 3*1000)

// setInterval(() => {
//     let bemVindoElement = document.getElementById("bem-vindo")
//     bemVindoElement.innerHTML = `Bem-vindo ao sistema do Smart Control<br>Data e hora atual: ${new Date().toLocaleString()}`
// }, 1*1000)
document.querySelector("#modalzinho").setAttribute("data-bs-toggle", "modal");
document.querySelector("#modalzinho").setAttribute("data-bs-target", "#staticBackdrop");


document.querySelector("#pesquisar").addEventListener("click", pesquisando)

async function pesquisando(event) {
    event.preventDefault();


    form = document.querySelector("#formpesquisa");
    placa = form.consultaplaca.value;

    document.location = "/veiculos?placa=" + placa;

}

document.querySelector("#modalzinho").addEventListener("click", pesquisandoo)

async function pesquisandoo(event) {
    event.preventDefault();


    form = document.querySelector("#formpesquisa");
    placa = form.consultaplaca.value;

    var elemento = document.getElementById("lista");
    while (elemento.firstChild) {
        elemento.removeChild(elemento.firstChild);
    }
    await fetch('/cardetalhe/' + placa)
        .then((res) => res.json())
        .then((res) => {
            for (veiculo2 of res) {
                modalcarro(veiculo2.placa, veiculo2.marca, veiculo2.modelo, veiculo2.AnoModelo, veiculo2.Combustivel, veiculo2.cilindradas, veiculo2.potencia, veiculo2.cor)

            }

        })

}

function modalcarro(placa, marca, modelo, ano, comb, cc, potencia, cor) {

    var detalhe = document.createElement("div");
    detalhe.innerHTML = "<b> PLACA:</b> " + placa +
        "<br><b>MODELO:</b> " + marca + " - " + modelo +
        "<br><b>ANO:</b> " + ano +
        "<br><b>COMBUSTÍVEL:</b> " + comb +
        "<br><b>CILINDRADAS:</b> " + cc +
        "<br><b>POTÊNCIA:</b> " + potencia +
        "<br><b>COR:</b> " + cor;

    detalhe.style.textTransform = "uppercase";


    document.querySelector("#lista").appendChild(detalhe);
}

qtd();


async function qtd(){
 
    fetch('/qtd')
        .then((res) => res.json())
        .then((res) => {
            for (qtdade of res) {
                preencheformulario(qtdade.quantidade);
            }

        })

}

async function preencheformulario(qtd){

    document.querySelector(".qtd").textContent = qtd + " veículos cadastrados";
}
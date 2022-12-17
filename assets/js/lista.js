carregarTrocas();

async function carregarTrocas(){
   
    fetch('/trocas')
        .then((res) => res.json())
        .then((res) => {
            for (trocar of res) {
                preencheformulario(trocar.id, trocar.placa, trocar.modelo, trocar.data, trocar.cliente);
            }

        })

}

function preencheformulario(id, placa, modelo, data, cliente){


    let gdata = data.split("T");
    let auxdata = gdata[0].split("-");
    let datamesmo = auxdata[2] + "/" + auxdata[1] + "/" + auxdata[0];

    let linha = document.createElement("tr");
    let datatabela = document.createElement("td");
    let clientetabela = document.createElement("td");
    let placatabela = document.createElement("td");
    let botaotabela = document.createElement("td");

    datatabela.innerHTML = datamesmo;
    clientetabela.innerHTML = cliente;
    placatabela.innerHTML = placa + " | " + modelo + ' <i class="bi bi-search" style="font-size: 9pt"></i>';
    placatabela.style.cursor = "pointer";
    placatabela.setAttribute("data-bs-toggle", "modal");
    placatabela.setAttribute("data-bs-target", "#staticBackdrop");
    placatabela.style.cursor = "pointer";
    placatabela.setAttribute("id", placa);
    placatabela.addEventListener("click", getacarrodetalhe);
    botaotabela.innerHTML = "Ver Histórico" + ' <i class="bi bi-search" style="font-size: 9pt"></i>';
    botaotabela.style.fontWeight = "700";
    linha.appendChild(datatabela);
    linha.appendChild(clientetabela);
    linha.appendChild(placatabela);
    linha.appendChild(botaotabela);

    document.querySelector(".lista1").appendChild(linha)

}

async function getacarrodetalhe() {
    let auxplacao = this.getAttribute("id");
    var elemento = document.getElementById("lista");
    while (elemento.firstChild) {
        elemento.removeChild(elemento.firstChild);
    }
    await fetch('/cardetalhe/' + auxplacao)
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
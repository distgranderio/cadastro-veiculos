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

    document.querySelector(".nenhum").style.display = "none";

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
    botaotabela.setAttribute("data-bs-toggle", "modal");
    botaotabela.setAttribute("data-bs-target", ".bd-example-modal-lg");
    botaotabela.style.fontWeight = "700";
    botaotabela.addEventListener("click", gettrocaplaca)
    botaotabela.setAttribute("id", placa);
    botaotabela.style.cursor = "pointer";
    linha.appendChild(datatabela);
    linha.appendChild(clientetabela);
    linha.appendChild(placatabela);
    linha.appendChild(botaotabela);

    document.querySelector(".lista1").appendChild(linha)

}

document.querySelector("#pesquisa").addEventListener("click", pesquisando)

async function pesquisando(event){
    event.preventDefault();


    var elemento = document.querySelector(".lista1");
    while (elemento.firstChild) {
        elemento.removeChild(elemento.firstChild);
    }

    let pesquisa = document.querySelector("#termo").value;

    document.querySelector(".nenhum").style.display = "block";

    if (pesquisa == "") {
        carregarTrocas();
    }else{
    await fetch('/pesquisar/' + pesquisa)
        .then((res) => res.json())
        .then((res) => {
            for (veiculo2 of res) {
                preencheformulario(veiculo2.id, veiculo2.placa, veiculo2.modelo, veiculo2.data, veiculo2.cliente);

            }

        })
    }

} 


async function gettrocaplaca(){
    let auxplacao = this.getAttribute("id");
    var elemento = document.getElementById("all");
    while (elemento.firstChild) {
        elemento.removeChild(elemento.firstChild);
    }
    await fetch('/trocadetalhe/' + auxplacao)
    .then((res) => res.json())
    .then((res) => {
        for (veiculos of res) {
            modaltroca(veiculos.placa, veiculos.modelo, veiculos.itens, veiculos.data, veiculos.km, veiculos.cliente)
            document.querySelector("#all1").innerHTML = "<h4>" + veiculos.placa + " - " + veiculos.modelo + "</h4>";
        }

    })

     document.querySelector("#all1").style.textTransform = "uppercase";
     document.querySelector("#all1").style.marginBottom = "10px";
}

async function modaltroca(placa, modelo, itens, data, km, cliente){
    

   // 

    let gdata = data.split("T");
    let auxdata = gdata[0].split("-");
    let datamesmo = auxdata[2] + "/" + auxdata[1] + "/" + auxdata[0];

    var card = document.createElement("div");
    card.className = "card";
    var tamanho = document.createElement("h5");
    tamanho.className = "card-header";
    tamanho.innerHTML = datamesmo;
    var cardbody = document.createElement("div");
    cardbody.className = "card-body";
    var cardtext = document.createElement("div");
    cardtext.className = "card-text";
    cardtext.innerHTML = "<b> ITENS:</b> " + itens +
        "<br><b>KM:</b> " + km +
        "<br><b>CLIENTE:</b> " + cliente;
        cardtext.style.textTransform = "uppercase";

        card.appendChild(tamanho);


        document.querySelector("#all").appendChild(card).appendChild(cardbody).appendChild(cardtext);

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
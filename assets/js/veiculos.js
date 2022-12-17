let placadocarro = location.search;
let placaaux = placadocarro.split("=");
let placareal = placaaux[1];


carregarPlaca(placareal);

async function carregarPlaca(placareal) {
    fetch('/placas/' + placareal)
        .then((res) => res.json())
        .then((res) => {
            for (placas of res) {
                preencheformulario(placas.placa, placas.modelo, placas.cliente, placas.telefone);
            }

        })

}

function preencheformulario(vplaca, vmodelo, vnome, vtelefone) {

    let form = document.querySelector("#veiculos");

    form.placa.value = vplaca.toUpperCase();
    form.veiculo.value = vmodelo;
    form.cliente.value = vnome;
    form.telefone.value = vtelefone;

    document.querySelector(".containerdosveiculos").style.opacity = "1"
}

document.querySelector("#enviar").addEventListener("click", enviando)

async function enviando(event){
    event.preventDefault();

    let formv = document.querySelector("#veiculos");

    let fplaca = formv.placa.value;
    let fveiculo = formv.veiculo.value;
    let fitens = formv.itens.value;
    let fkm = formv.km.value;
    let fcliente = formv.cliente.value;
    let ftelefone = formv.telefone.value;


    let header = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
            placa: fplaca,
            veiculo: fveiculo,
            itens: fitens,
            km: fkm,
            cliente: fcliente,
            telefone: ftelefone
        })
    }
    let resposta = await fetch('/carros/', header);
    resposta = await resposta.json();

    document.location = "/";
}
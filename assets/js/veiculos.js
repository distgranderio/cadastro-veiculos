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

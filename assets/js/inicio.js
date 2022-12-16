document.querySelector("#pesquisar").addEventListener("click", pesquisando)

async function pesquisando(event) {
    event.preventDefault();


    form = document.querySelector("#formpesquisa");
    placa = form.consultaplaca.value;

    document.location = "/veiculos?placa=" + placa;

}
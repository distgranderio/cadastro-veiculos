document.querySelector("#pesquisar").addEventListener("click", pesquisando)

async function pesquisando(event) {
    event.preventDefault();


    form = document.querySelector("#formpesquisa");
    placa = form.consultaplaca.value;

    document.location = "/veiculos?placa=" + placa;

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
// seleção dos elementos
const titulo = document.getElementById("titulo-principal");
const subtitulo = document.querySelector("#subtitulo");
const campoBusca = document.querySelector("#campo-busca");
const filtroArea = document.querySelector("#filtro-area");
const mensagem = document.querySelector("#mensagem");
const lista = document.querySelector("#lista-cursos");
const formulario = document.querySelector("#form-cadastro");
const btnTema = document.querySelector("#btn-tema");
const btnLimpar = document.querySelector("#btn-limpar");
const card = document.querySelector(".card-curso");
const botao = card.querySelector("button");

/*
// desafio 1 - trocar o texto do título
titulo.textContent = "Cursos do IFPB Cajazeiras";

// desafio 2 - ler o campo de busca
console.log(campoBusca.value.trim()); // design

// desafio 3 - adicionar e remover destaque
titulo.classList.add("destaque");
console.log(titulo.classList.contains("destaque")); // true
titulo.classList.remove("destaque");
console.log(titulo.classList.contains("destaque")); // false

// desafio 4 - alternar o tema com um clique
btnTema.addEventListener("click", () => {
document.body.classList.toggle("tema-alternativo");
});

// desafio 5 - formulário sem carregar
formulario.addEventListener("submit", (event) => {
    event.preventDefault();
    mensagem.textContent = "Formulário recebido!";
});

// desafio 6 - target ou currentTarget?
formulario.addEventListener("click", (event) => {
    console.log(event.target.tagName);
    console.log(event.currentTarget.id);
});
// BUTTON lista-cursos

// desafio 7 - a oredem do bubbling
lista.addEventListener("click", () => {
    console.log("lista");
})
lista.addEventListener("click", () => {
    console.log("cartão");
})
lista.addEventListener("click", () => {
    console.log("botão");
})
/*
clique no botão: botão -> cartão -> lista
clique no <h2>: cartão -> lista
*/
/*
// desafio 8 - delegação no painel
lista.addEventListener("click", (event) => {
    const botao = event.target.closest("button");
    if(!botao || !lista.contains(botao)){
        return;
    }

    const card = botao.closest(".card-curso");

    if(botao.dataset.acao === "detalhes"){
        const detalhes = card.querySelector(".detalhes");
        detalhes.classList.toggle("oculto");
    }
    if(botao.dataset.acao === "remover"){
        card.remove();
    }
});

// desafio 9 - filtro com busca e área
function aplicarFiltros(){
    const termo = campoBusca.value.trim().toLowerCase();
    const area = filtroArea.value;
    const cards = document.querySelectorAll(".card-curso");
    let visiveis = 0;

    cards.forEach((card) => {
        const nome = card.querySelector("h2").textContent.toLowerCase();
        const combinaNome = nome.includes(termo);
        const combinaArea = area === "todos" || card.dataset.area === area;
        const mostrar = combinaNome && combinaArea;

        card.classList.toggle("oculto", !mostrar);
        if(mostrar){
            visiveis++;
        }
    });
    mostrarMensagem('${visiveis} curso(s) encontrado(s).');
}

campoBusca.addEventListener("input", aplicarFiltros);
filtroArea.addEventListener("change", aplicarFiltros);

// desafio 10 - cadastrar um novo cartão
function criarBotao(texto, acao, variante) {
    const botao = document.createElement("button");
    botao.textContent = texto;
    botao.type = "button";
    botao.classList.add("botao", variante);
    botao.dataset.acao = acao;

    return botao;
}

function criarCard(nome, area) {
    const card = document.createElement("article");
    card.classList.add("card-curso");
    card.dataset.area = area;

    const tituloCard = document.createElement("h2");
    tituloCard.textContent = nome;

    const descricao = document.createElement("p");
    descricao.classList.add("descricao");
    descricao.textContent = "Curso cadastrado pelo formulário.";

    const detalhes = document.createElement("p");
    detalhes.classList.add("detalhes", "oculto");
    detalhes.textContent = "Area: ${area}.";

    card.append(tituloCard, descricao, criarBotao("Ver detalhes", "detalhes", "botao--principal"), 
    detalhes, criarBotao("Remover", "remover", "botao--perigo"));

    return card;
}

formulario.addEventListener("submit", (event) => {
    event.preventDefault();

    const campoNome = document.querySelector("#nome-curso");
    const nome = campoNome.value.trim();
    const area = document.querySelector("#area-curso").value;

    if (nome === "") {
        mensagem.textContent = "Informe o nome do curso.";
        campoNome.focus();
        return;
    }

    lista.append(criarCard(nome, area));
    campoNome.value = "";

    aplicarFiltros();

    mensagem.textContent = `Curso "${nome}" cadastrado!`;
    campoNome.focus();
});
*/

// funções auxiliares e estado inicial
function mostrarMensagem(texto, tipo = "info") {
    mensagem.textContent = texto;
    mensagem.classList.remove("mensagem--sucesso");
    mensagem.classList.remove("mensagem--erro");

    if (tipo === "sucesso") {
        mensagem.classList.add("mensagem--sucesso");
    } else if (tipo === "erro") {
        mensagem.classList.add("mensagem--erro");
    }
}

titulo.textContent = "Cursos de Tecnologia";
mostrarMensagem("Bem-vindos ao painel!");

// alternar o tema
btnTema.addEventListener("click", () => {
    document.body.classList.toggle("tema-alternativo");

    const ativo = document.body.classList.contains("tema-alternativo");
    mostrarMensagem(ativo ? "Destaque ativado." : "Destaque desativado.");
});

// mostrar detalhes e remover cursos por delegação
lista.addEventListener("click", (event) => {
    const botao = event.target.closest("button");

    if (!botao || !lista.contains(botao)) {
        return;
    }

    const card = botao.closest(".card-curso");

    if (!card) {
        return;
    }

    if (botao.dataset.acao === "detalhes") {
        const detalhes = card.querySelector(".detalhes");

        detalhes.classList.toggle("oculto");
        card.classList.toggle("expandido");

        botao.textContent = detalhes.classList.contains("oculto") ? "Ver detalhes" : "Ocultar detalhes";
    }

    if (botao.dataset.acao === "remover") {
        const nome = card.querySelector("h2").textContent;

        card.remove();
        mostrarMensagem(`Curso "${nome}" removido.`, "sucesso");

        aplicarFiltros();
    }
});

// filtrar cursos pelo nome e pela área
function aplicarFiltros() {
    const termo = campoBusca.value.trim().toLowerCase();
    const areaSelecionada = filtroArea.value;
    const cards = document.querySelectorAll(".card-curso");
    let quantidade = 0;

    cards.forEach((card) => {
        const nome = card.querySelector("h2").textContent.toLowerCase();
        const area = card.dataset.area;

        const combinaNome = nome.includes(termo);
        const combinaArea = areaSelecionada === "todos" || area === areaSelecionada;

        if (combinaNome && combinaArea) {
            card.classList.remove("oculto");
            quantidade++;
        } else {
            card.classList.add("oculto");
        }
    });

    mostrarMensagem(`${quantidade} curso(s) encontrado(s).`);
}

campoBusca.addEventListener("input", aplicarFiltros);
filtroArea.addEventListener("change", aplicarFiltros);

// cadastrar curso
function criarBotao(texto, acao, classe) {
    const botao = document.createElement("button");
    botao.textContent = texto;
    botao.type = "button";
    botao.classList.add("botao", classe);
    botao.dataset.acao = acao;

    return botao;
}

function criarCard(nome, area) {
    const card = document.createElement("article");
    card.classList.add("card-curso");
    card.dataset.area = area;

    const tituloCard = document.createElement("h2");
    tituloCard.textContent = nome;

    const descricao = document.createElement("p");
    descricao.classList.add("descricao");
    descricao.textContent = "Curso cadastrado pelo formulário.";

    const detalhes = document.createElement("p");
    detalhes.classList.add("detalhes", "oculto");
    detalhes.textContent = "Detalhes deste curso podem ser adicionados posteriormente.";

    card.append(
        tituloCard,
        descricao,
        criarBotao("Ver detalhes", "detalhes", "botao--principal"),
        detalhes,
        criarBotao("Remover", "remover", "botao--perigo")
    );

    return card;
}

formulario.addEventListener("submit", (event) => {
    event.preventDefault();

    const campoNome = document.querySelector("#nome-curso");
    const nome = campoNome.value.trim();
    const area = document.querySelector("#area-curso").value;

    if (nome === "") {
        mostrarMensagem("Informe o nome do curso.", "erro");
        campoNome.focus();
        return;
    }

    lista.append(criarCard(nome, area));
    campoNome.value = "";

    // reaplica os filtros para manter a listagem coerente com a busca atual
    aplicarFiltros();
    mostrarMensagem(`Curso "${nome}" cadastrado!`, "sucesso");
    campoNome.focus();
});

// o botão de limpar filtros
btnLimpar.addEventListener("click", () => {
    campoBusca.value = "";
    filtroArea.value = "todos";
    aplicarFiltros();
    campoBusca.focus();
});
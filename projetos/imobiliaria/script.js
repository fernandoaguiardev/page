// =======================
// VARIÁVEIS GLOBAIS
// =======================
let imoveis = [];
let id = 0;




// =======================
// FUNÇÕES
// =======================
// =======================
// SALVAR NO "BACKEND"
// =======================
function salvarDados() {
    localStorage.setItem("imoveis", JSON.stringify(imoveis));
    localStorage.setItem("id", id);
}

// =======================
// CARREGAR DO "BACKEND"
// =======================
function carregarDados() {
    let dados = localStorage.getItem("imoveis");
    let ultimoId = localStorage.getItem("id");

    if (dados) {
        imoveis = JSON.parse(dados);
    }

    if (ultimoId) {
        id = Number(ultimoId);
    }
}

// =======================
// CREATE
// =======================
function cadastrarImovel(event) {
    event.preventDefault();

    let proprietario = document.getElementById("proprietario").value;
    let quartos = Number(document.getElementById("quartos").value);
    let banheiros = Number(document.getElementById("banheiros").value);
    let garagem = document.getElementById("garagem").checked;

    id++;

    let imovel = { id, proprietario, quartos, banheiros, garagem };

    imoveis.push(imovel);
    salvarDados();

    alert("Imóvel cadastrado com sucesso!");

    document.getElementById("formImovel").reset();
}

// =======================
// READ
// =======================
function mostrarImoveis() {
    let lista = document.getElementById("lista");
    lista.innerHTML = "";

    if (imoveis.length === 0) {
        lista.innerHTML = "<p class='text-center'>Nenhum imóvel cadastrado.</p>";
        return;
    }

    imoveis.forEach(imovel => {
        let col = document.createElement("div");
        col.className = "col-md-4";

        col.innerHTML = `
            <div class="card shadow-sm h-100">
                <div class="card-body">
                    <h5 class="card-title">${imovel.proprietario}</h5>
                    <p class="card-text">
                        <strong>ID:</strong> ${imovel.id}<br>
                        Quartos: ${imovel.quartos}<br>
                        Banheiros: ${imovel.banheiros}<br>
                        Garagem: ${imovel.garagem ? "Sim" : "Não"}
                    </p>

                    <button class="btn btn-danger btn-sm w-100"
                        onclick="removerPorId(${imovel.id})">
                        Excluir
                    </button>
                </div>
            </div>
        `;

        lista.appendChild(col);
    });
}

// =======================
// DELETE (por botão no card)
// =======================
function removerPorId(idRecebido) {
    let indice = imoveis.findIndex(i => i.id === idRecebido);

    if (indice === -1) {
        alert("Imóvel não encontrado!");
        return;
    }

    if (confirm("Tem certeza que deseja excluir este imóvel?")) {
        imoveis.splice(indice, 1);
        salvarDados();
        mostrarImoveis();
    }
}

// =======================
// DELETE (manual - opcional)
// =======================
function deletarImovel() {
    let idDigitado = Number(prompt("Digite o ID do imóvel:"));

    let indice = imoveis.findIndex(i => i.id === idDigitado);

    if (indice === -1) {
        alert("Imóvel não encontrado!");
        return;
    }

    if (confirm("Tem certeza?")) {
        imoveis.splice(indice, 1);
        salvarDados();
        mostrarImoveis();
    }
}

// =======================
// EVENTO DO FORM
// =======================
document
    .getElementById("formImovel")
    .addEventListener("submit", cadastrarImovel);

// =======================
// CARREGAR DADOS
// =======================
carregarDados();
// Definir os dados do usuário
const validUser = "fernandoaguiardev";
const validPassword = "0101";

// Seleção dos elementos do HTML
const loginBtn = document.getElementById("loginBtn");
const loginScreen = document.getElementById("loginScreen");
const appScreen = document.getElementById("appScreen");

const usernameField = document.getElementById("username");
const passwordField = document.getElementById("password");

const totalValueElem = document.getElementById("totalValue");
const totalSpentElem = document.getElementById("totalSpent");
const addExpenseBtn = document.getElementById("addExpenseBtn");
const expenseNameField = document.getElementById("expenseName");
const expenseValueField = document.getElementById("expenseValue");
const expenseDateField = document.getElementById("expenseDate");
const expenseList = document.getElementById("expenseList");
const resetBtn = document.getElementById("resetBtn");

// Variáveis de controle
let totalValue = 0.00;
let totalSpent = 0.00;
let expenses = [];
let expenseId = 1; // Começa com 1 para índices mais intuitivos

// Função de Login
loginBtn.addEventListener("click", function() {
    const username = usernameField.value;
    const password = passwordField.value;

    if (username === validUser && password === validPassword) {
        loginScreen.style.display = "none";
        appScreen.style.display = "flex";
        loadStoredData();
    } else {
        alert("Usuário ou senha incorretos.");
    }
});

// Função para salvar os dados no localStorage
function saveData() {
    localStorage.setItem("totalValue", totalValue);
    localStorage.setItem("totalSpent", totalSpent);
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

// Função para carregar os dados do localStorage
function loadStoredData() {
    if (localStorage.getItem("totalValue")) {
        totalValue = parseFloat(localStorage.getItem("totalValue"));
    }
    if (localStorage.getItem("totalSpent")) {
        totalSpent = parseFloat(localStorage.getItem("totalSpent"));
    }
    if (localStorage.getItem("expenses")) {
        expenses = JSON.parse(localStorage.getItem("expenses"));
    }

    totalValueElem.textContent = totalValue.toFixed(2);
    totalSpentElem.textContent = totalSpent.toFixed(2);
    displayExpenses();
}

// Função para exibir as despesas
function displayExpenses() {
    expenseList.innerHTML = "";
    expenses.forEach(expense => {
        const li = document.createElement("li");
        li.textContent = `#${expense.id} - ${expense.name}: R$ ${expense.value.toFixed(2)} | Data: ${expense.date}`;
        expenseList.appendChild(li);
    });
}

// Função para adicionar uma despesa
addExpenseBtn.addEventListener("click", function() {
    const expenseName = expenseNameField.value;
    const expenseValue = parseFloat(expenseValueField.value);
    const expenseDate = expenseDateField.value;

    // Verifica se os campos estão preenchidos corretamente
    if (expenseName && !isNaN(expenseValue) && expenseDate) {
        if (expenseValue <= 0) {
            alert("O valor da despesa deve ser positivo.");
            return;
        }

        // Mostra uma janela de confirmação antes de salvar a despesa
        const confirmAddition = confirm(`Deseja adicionar a despesa "${expenseName}" no valor de R$ ${expenseValue.toFixed(2)}?`);

        if (confirmAddition) {
            const expense = {
                id: expenseId++, // Adiciona um índice único à despesa
                name: expenseName,
                value: expenseValue,
                date: expenseDate
            };

            expenses.push(expense);
            totalSpent += expenseValue;
            totalValue -= expenseValue;

            totalSpentElem.textContent = totalSpent.toFixed(2);
            totalValueElem.textContent = totalValue.toFixed(2);

            saveData();
            displayExpenses();
            alert("Despesa adicionada com sucesso!");
        } else {
            alert("Despesa cancelada.");
        }
    } else {
        alert("Por favor, preencha todos os campos corretamente.");
    }

    // Limpar os campos após a operação
    expenseNameField.value = "";
    expenseValueField.value = "";
    expenseDateField.value = "";
});

// Função para reiniciar os valores
resetBtn.addEventListener("click", function() {
    if (confirm("Tem certeza que deseja reiniciar os valores? Isso apagará todas as despesas.")) {
        const valorDisponivel = prompt("Digite o valor disponível para gastar:");

        if (!isNaN(valorDisponivel) && parseFloat(valorDisponivel) > 0) {
            totalValue = parseFloat(valorDisponivel);
            totalSpent = 0;
            expenses = [];
            expenseId = 1;

            totalValueElem.textContent = totalValue.toFixed(2);
            totalSpentElem.textContent = totalSpent.toFixed(2);

            saveData();
            displayExpenses();
        } else {
            alert("Valor inválido! Tente novamente.");
        }
    }
});

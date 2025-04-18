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

// Função de Login
loginBtn.addEventListener("click", function() {
    const username = usernameField.value;
    const password = passwordField.value;

    if (username === validUser && password === validPassword) {
        loginScreen.style.display = "none"; // Ocultar tela de login
        appScreen.style.display = "flex"; // Mostrar app com display flex para garantir centralização
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

// Função para exibir as despesas na tela
function displayExpenses() {
    expenseList.innerHTML = "";
    expenses.forEach(expense => {
        const li = document.createElement("li");
        li.textContent = `${expense.name}: R$ ${expense.value.toFixed(2)} | Data: ${expense.date}`;
        expenseList.appendChild(li);
    });
}

// Função para adicionar uma despesa
addExpenseBtn.addEventListener("click", function() {
    const expenseName = expenseNameField.value;
    const expenseValue = parseFloat(expenseValueField.value);
    const expenseDate = expenseDateField.value;

    if (expenseName && !isNaN(expenseValue) && expenseDate) {
        const expense = {
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
    } else {
        alert("Por favor, preencha todos os campos corretamente.");
    }

    // Limpar campos após adicionar a despesa
    expenseNameField.value = "";
    expenseValueField.value = "";
    expenseDateField.value = ""; // Limpar o campo de data
});

// Função para reiniciar os valores
resetBtn.addEventListener("click", function() {
    const valorDisponivel = prompt("Digite o valor disponível para gastar:");

    // Verifica se o valor inserido é válido
    if (!isNaN(valorDisponivel) && parseFloat(valorDisponivel) > 0) {
        totalValue = parseFloat(valorDisponivel);
        totalSpent = 0;
        expenses = [];

        totalValueElem.textContent = totalValue.toFixed(2);
        totalSpentElem.textContent = totalSpent.toFixed(2);

        saveData();
        displayExpenses();
    } else {
        alert("Valor inválido! Tente novamente.");
    }
});

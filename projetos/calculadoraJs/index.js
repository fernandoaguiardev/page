const root = document.documentElement
const input = document.getElementById("input")
const resultInput = document.getElementById("result")

const allowedKeys = ["(", ")", "/", "*", "-", "+", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", ".", "%"]

// teclado da tela
document.querySelectorAll(".charKey").forEach((btn) => {
  btn.addEventListener("click", () => {
    input.value += btn.dataset.value
  })
})

// clear
document.getElementById("clear").addEventListener("click", () => {
  input.value = ""
  resultInput.value = ""
})

// igual
document.getElementById("equal").addEventListener("click", calculate)

function calculate() {
  try {
    const result = eval(input.value)
    resultInput.value = result
    resultInput.classList.remove("error")
  } catch {
    resultInput.value = "ERROR"
    resultInput.classList.add("error")
  }
}

// copiar
document.getElementById("copyToClipboard").addEventListener("click", (ev) => {
  const btn = ev.currentTarget

  navigator.clipboard.writeText(resultInput.value)

  btn.innerText = btn.innerText === "Copy" ? "Copied!" : "Copy"
})

// tema
document.getElementById("themeSwitcher").addEventListener("click", () => {
  const isDark = root.getAttribute("data-theme") === "dark"
  root.setAttribute("data-theme", isDark ? "light" : "dark")
})
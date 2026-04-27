/* theme control */
function toggleTheme() {
  const html = document.documentElement
  const isLight = html.getAttribute("data-theme") === "light"

  html.setAttribute("data-theme", isLight ? "dark" : "light")
}
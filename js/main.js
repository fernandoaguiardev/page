/* main app */

document.addEventListener("DOMContentLoaded", () => {

  // conecta botão de tema
  const themeBtn = document.querySelector(".theme-toggle");

  if (themeBtn) {
    themeBtn.addEventListener("click", toggleTheme);
  }

});
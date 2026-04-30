const lightTheme = document.getElementById("light-theme");
const button = document.getElementById("toggle-theme");

const savedTheme = localStorage.getItem("theme");

// estado inicial
if (savedTheme === "light") {
    lightTheme.disabled = false;
} else {
    lightTheme.disabled = true;
}

// toggle function
function toggleTheme() {
    const isLight = !lightTheme.disabled;

    lightTheme.disabled = isLight;

    localStorage.setItem("theme", isLight ? "dark" : "light");
}

// event listener separation
button.addEventListener("click", toggleTheme);
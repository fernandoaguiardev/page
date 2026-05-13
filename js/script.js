/* ========================================
   ELEMENTOS
======================================== */

const pageButtons     = document.querySelectorAll("[data-page]");
const projectButtons  = document.querySelectorAll("[data-project]");
const views           = document.querySelectorAll(".view");
const topbarPath      = document.getElementById("topbar-path");
const projectFrame    = document.getElementById("project-frame");
const projectsToggle  = document.getElementById("projects-toggle");
const projectsSubnav  = document.getElementById("projects-subnav");
const projectsChevron = document.getElementById("projects-chevron");
const iframeLoading   = document.getElementById("iframe-loading");
const iframeError     = document.getElementById("iframe-error");
const openExternalBtn = document.getElementById("open-external-btn");
const clock           = document.getElementById("clock");
const sidebarToggle   = document.getElementById("sidebar-toggle");
const sidebar         = document.getElementById("sidebar");

/* ========================================
   ROTAS DE PROJETOS
======================================== */

const projectRoutes = {
    "grupo-goncalves": "https://grupogoncalves.vercel.app/",
    "jogo-da-velha":   "./projetos/gamedavelha/index.html",
    "calculadora-js":  "./projetos/calculadoraJs/index.html"
};

let currentProjectUrl = "";

/* ========================================
   UTILITÁRIOS
======================================== */

function removeActivePages() {
    pageButtons.forEach(btn => btn.classList.remove("active"));
}

function removeActiveProjects() {
    projectButtons.forEach(btn => btn.classList.remove("active-project"));
}

function hideViews() {
    views.forEach(view => view.classList.remove("active-view"));
}

function updatePath(path) {
    topbarPath.textContent = `workspace://${path}`;
}

/* ========================================
   ABRIR PÁGINA NORMAL
======================================== */

function openPage(pageId) {
    hideViews();
    removeActiveProjects();

    const target = document.getElementById(pageId);
    if (target) target.classList.add("active-view");

    updatePath(pageId);
}

/* ========================================
   ABRIR PROJETO
======================================== */

function openProject(projectId) {
    hideViews();
    removeActivePages();

    const url = projectRoutes[projectId];
    currentProjectUrl = url;

    iframeLoading.style.display = "flex";
    iframeError.style.display   = "none";
    projectFrame.src = "";

    document.getElementById("project-screen").classList.add("active-view");
    updatePath(projectId);

    const timeout = setTimeout(showProjectError, 8000);

    projectFrame.onload = () => {
        clearTimeout(timeout);
        iframeLoading.style.display = "none";
    };

    projectFrame.onerror = () => {
        clearTimeout(timeout);
        showProjectError();
    };

    requestAnimationFrame(() => { projectFrame.src = url; });
}

function showProjectError() {
    iframeLoading.style.display = "none";
    iframeError.style.display   = "flex";
}

openExternalBtn.addEventListener("click", () => {
    if (currentProjectUrl) window.open(currentProjectUrl, "_blank");
});

/* ========================================
   MENU PRINCIPAL
======================================== */

pageButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        removeActivePages();
        btn.classList.add("active");
        openPage(btn.dataset.page);
    });
});

/* ========================================
   MENU PROJETOS
======================================== */

projectButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        removeActiveProjects();
        btn.classList.add("active-project");
        openProject(btn.dataset.project);
    });
});

/* ========================================
   TOGGLE SUBMENU DE PROJETOS
======================================== */

let subnavExpanded = true;

function setSubnav(open) {
    subnavExpanded = open;
    projectsSubnav.classList.toggle("collapsed", !open);
    projectsChevron.classList.toggle("open", open);
}

projectsToggle.addEventListener("click", () => setSubnav(!subnavExpanded));
setSubnav(true);

/* ========================================
   TOGGLE SIDEBAR
======================================== */

let sidebarOpen = true;

sidebarToggle.addEventListener("click", () => {
    sidebarOpen = !sidebarOpen;
    sidebar.classList.toggle("collapsed", !sidebarOpen);
});

/* ========================================
   RELÓGIO
======================================== */

function updateClock() {
    const now = new Date();
    clock.textContent =
        `${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}`;
}

updateClock();
setInterval(updateClock, 10000);

/* ========================================
   ATALHOS DE TECLADO
======================================== */

document.addEventListener("keydown", e => {
    if (!e.altKey) return;
    const map = { "1": "home", "2": "sobre", "3": "skills", "4": "contato" };
    if (map[e.key]) {
        e.preventDefault();
        document.querySelector(`[data-page="${map[e.key]}"]`)?.click();
    }
    // Alt+B = toggle sidebar
    if (e.key === "b") {
        e.preventDefault();
        sidebarToggle.click();
    }
});

/* ========================================
   INIT
======================================== */

openPage("home");
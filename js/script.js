/* ========================================
   ELEMENTOS
======================================== */

const pageButtons = document.querySelectorAll("[data-page]");
const projectButtons = document.querySelectorAll("[data-project]");

const views = document.querySelectorAll(".view");

const workspacePath =
    document.getElementById("workspace-path");

const projectFrame =
    document.getElementById("project-frame");

const projectsToggle =
    document.getElementById("projects-toggle");

const projectsSubnav =
    document.getElementById("projects-subnav");

/* ========================================
   ROTAS DE PROJETOS
======================================== */

const projectRoutes = {
    "grupo-goncalves":
        "https://grupogoncalves.vercel.app/",

    "jogo-da-velha":
        "./projetos/gamedavelha/index.html",

    "calculadora-js":
        "./projetos/calculadoraJs/index.html"
};

/* ========================================
   UTILITÁRIOS
======================================== */

function removeActivePages() {
    pageButtons.forEach(button => {
        button.classList.remove("active");
    });
}

function removeActiveProjects() {
    projectButtons.forEach(button => {
        button.classList.remove("active-project");
    });
}

function hideViews() {
    views.forEach(view => {
        view.classList.remove("active-view");
    });
}

function updatePath(path) {
    workspacePath.textContent =
        `workspace://${path}`;
}

/* ========================================
   ABRIR PÁGINA NORMAL
======================================== */

function openPage(pageId) {

    hideViews();
    removeActiveProjects();

    const targetPage =
        document.getElementById(pageId);

    targetPage.classList.add("active-view");

    updatePath(pageId);
}

/* ========================================
   ABRIR PROJETO
======================================== */

function openProject(projectId) {

    hideViews();
    removeActivePages();

    projectFrame.src =
        projectRoutes[projectId];

    document
        .getElementById("project-screen")
        .classList.add("active-view");

    updatePath(projectId);
}

/* ========================================
   MENU PRINCIPAL
======================================== */

pageButtons.forEach(button => {

    button.addEventListener("click", () => {

        const page =
            button.dataset.page;

        removeActivePages();

        button.classList.add("active");

        openPage(page);

    });

});

/* ========================================
   MENU PROJETOS
======================================== */

projectButtons.forEach(button => {

    button.addEventListener("click", () => {

        const project =
            button.dataset.project;

        removeActiveProjects();

        button.classList.add("active-project");

        openProject(project);

    });

});

/* ========================================
   EXPANDIR SUBMENU
======================================== */

let expanded = true;

projectsToggle.addEventListener("click", () => {

    expanded = !expanded;

    projectsSubnav.style.display =
        expanded ? "flex" : "none";

});

/* ========================================
   INICIALIZAÇÃO
======================================== */

openPage("home");
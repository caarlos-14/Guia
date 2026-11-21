let btnModo = document.querySelector(".modo");
let iconoModo = document.querySelector(".iconoModo");

document.addEventListener("DOMContentLoaded", (e) => {
    e.preventDefault();
    const temaGuardado = localStorage.getItem("tema");
    const paginaActual = window.location.pathname.split("/").pop() || "index.html";
    const enlaces = document.querySelectorAll("header nav a");

    if(temaGuardado == "modoOscuro"){
        document.body.classList.remove("modoClaro");
        document.body.classList.add("modoOscuro"); 
    }else{
        document.body.classList.remove("modoOascuro")
        document.body.classList.add("modoClaro"); 
    }
    setTimeout(() => {
        document.body.classList.add("fade-in");
    }, 50);

    enlaces.forEach(enlace => {
        if (enlace.getAttribute("href")?.endsWith(paginaActual)) {
            enlace.classList.remove("text-decoration-none");
            enlace.classList.add("underline","fg-primary", "fw-bold", "underline-primary", "underline-thickness-3", "underline-offset-3");
            enlace.style.textDecorationColor = "#F08E21";
        }
    });

enlaces.forEach(enlace => {
        const href = (enlace.getAttribute("href") || "").split("?")[0].split("#")[0].toLowerCase();
        if (href && href.endsWith(paginaActual)) {
            enlace.classList.remove("text-decoration-none");
            enlace.classList.add("fw-bold");
            enlace.style.setProperty("text-decoration-line", "underline", "important");
            enlace.style.setProperty("text-decoration-color", "#F08E21", "important");
            enlace.style.setProperty("text-decoration-thickness", "3px", "important");
            enlace.style.setProperty("text-underline-offset", "5px", "important");
        }
    });

});

btnModo.addEventListener("click",(e) =>{
    e.preventDefault();
    iconoModo.classList.toggle("bi-sun-fill");
    iconoModo.classList.toggle("bi-moon-fill");

    if(document.body.classList.contains("modoClaro")){
        document.body.classList.remove("modoClaro");
        document.body.classList.add("modoOscuro");
        localStorage.setItem("tema","modoOscuro");
    }else{
        document.body.classList.remove("modoOscuro");
        document.body.classList.add("modoClaro"); 
        localStorage.setItem("tema","modoClaro");
    }
});


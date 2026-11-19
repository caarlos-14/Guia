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
            enlace.classList.add("fg-primary", "fw-bold", "underline-primary", "underline-thickness-3", "underline-offset-3");
            enlace.style.textDecorationColor = "#F08E21";
        }
    });

    enlaces.forEach(enlace => {
        enlace.addEventListener("click", (e) => {
            const destino = enlace.getAttribute("href");
            if (destino && destino.endsWith(".html")) {
                e.preventDefault();
                document.body.classList.remove("fade-in");
            
                setTimeout(() => {
                    window.location.href = destino;
                }, 400);
            }
        });
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


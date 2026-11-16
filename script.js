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


/**
 * 
 * Funcionalidad para INSTITUTO
 */
(function () {
    function iniciarInstituto() {
        const raiz = document.querySelector('#seccion-instituto');
        if (!raiz) return;

        /* ---------- 1. Explorador / filtro de estudios ---------- */
        const filtros = raiz.querySelectorAll('.ins-filtro');
        const estudios = raiz.querySelectorAll('.ins-estudio');
        const contador = raiz.querySelector('[data-contador]');

        function filtrar(categoria) {
            filtros.forEach(function (boton) {
                const activo = boton.dataset.filtro === categoria;
                boton.classList.toggle('activo', activo);
                boton.setAttribute('aria-pressed', activo);
            });

            // 1.º se desvanecen todas, 2.º se ocultan las que no tocan, 3.º reaparecen las demás
            estudios.forEach(function (tarjeta) {
                tarjeta.classList.add('ins-saliendo');
            });

            setTimeout(function () {
                let visibles = 0;
                estudios.forEach(function (tarjeta) {
                    const mostrar = categoria === 'todos' || tarjeta.dataset.categoria === categoria;
                    tarjeta.hidden = !mostrar;
                    if (mostrar) visibles++;
                });
                if (contador) {
                    contador.textContent = 'Mostrando ' + visibles + (visibles === 1 ? ' estudio' : ' estudios');
                }
                requestAnimationFrame(function () {
                    estudios.forEach(function (tarjeta) {
                        tarjeta.classList.remove('ins-saliendo');
                    });
                });
            }, 250);
        }

        if (filtros.length && estudios.length) {
            filtros.forEach(function (boton) {
                boton.addEventListener('click', function () {
                    filtrar(boton.dataset.filtro);
                });
            });
        }

        /* ---------- 2. Quiz "¿Qué itinerario encaja contigo?" ---------- */
        const quiz = raiz.querySelector('[data-quiz]');
        if (!quiz) return;

        const RESULTADOS = {
            dam: {
                icono: 'bi-phone-fill',
                titulo: 'Desarrollo de aplicaciones (DAM)',
                texto: 'Lo tuyo es crear: el grado superior de Desarrollo de Aplicaciones Multiplataforma te enseña a programar apps para móvil y escritorio.',
                filtro: 'superior'
            },
            asir: {
                icono: 'bi-server',
                titulo: 'Sistemas y redes (ASIR)',
                texto: 'Te gusta que todo funcione y esté seguro: el grado superior de Administración de Sistemas Informáticos en Red es tu sitio.',
                filtro: 'superior'
            },
            smr: {
                icono: 'bi-hdd-network-fill',
                titulo: 'Equipos y redes (SMR)',
                texto: 'Eres de manos a la obra: el grado medio de Sistemas Microinformáticos y Redes te da una base práctica para empezar a trabajar o seguir estudiando.',
                filtro: 'medio'
            },
            erasmus: {
                icono: 'bi-globe-europe-africa',
                titulo: 'Movilidad internacional (Erasmus+)',
                texto: 'Tu punto fuerte es salir fuera: pregunta en el centro por los proyectos Erasmus+ y combínalos con la etapa que estés cursando.',
                filtro: 'todos'
            }
        };

        const preguntas = quiz.querySelectorAll('.ins-pregunta');
        const zonaPreguntas = quiz.querySelector('[data-quiz-preguntas]');
        const zonaResultado = quiz.querySelector('[data-quiz-resultado]');
        const paso = quiz.querySelector('[data-quiz-paso]');
        const barra = quiz.querySelector('[data-quiz-barra]');
        const progreso = quiz.querySelector('.ins-progreso');
        if (!preguntas.length || !zonaPreguntas || !zonaResultado) return;

        let actual = 0;
        let puntos = {};

        function pintarPaso() {
            preguntas.forEach(function (pregunta, i) {
                pregunta.hidden = i !== actual;
            });
            if (paso) paso.textContent = 'Pregunta ' + (actual + 1) + ' de ' + preguntas.length;
            if (barra) barra.style.width = (actual / preguntas.length * 100) + '%';
            if (progreso) progreso.setAttribute('aria-valuenow', actual);
        }

        function mostrarResultado() {
            // Gana el perfil con más respuestas; si hay empate, el que se eligió antes
            let ganador = null;
            Object.keys(puntos).forEach(function (perfil) {
                if (ganador === null || puntos[perfil] > puntos[ganador]) ganador = perfil;
            });
            const res = RESULTADOS[ganador];
            if (!res) return;

            quiz.querySelector('[data-res-icono]').className = 'bi ' + res.icono;
            quiz.querySelector('[data-res-titulo]').textContent = res.titulo;
            quiz.querySelector('[data-res-texto]').textContent = res.texto;
            quiz.querySelector('[data-res-enlace]').dataset.filtro = res.filtro;

            zonaPreguntas.hidden = true;
            zonaResultado.hidden = false;
        }

        function reiniciar() {
            actual = 0;
            puntos = {};
            zonaResultado.hidden = true;
            zonaPreguntas.hidden = false;
            pintarPaso();
        }

        quiz.addEventListener('click', function (e) {
            const opcion = e.target.closest('.ins-opcion');
            if (opcion) {
                const perfil = opcion.dataset.perfil;
                puntos[perfil] = (puntos[perfil] || 0) + 1;
                actual++;
                if (actual < preguntas.length) {
                    pintarPaso();
                } else {
                    mostrarResultado();
                }
                return;
            }

            if (e.target.closest('[data-quiz-repetir]')) {
                reiniciar();
                return;
            }

            // "Ver en el explorador": aplica el filtro recomendado antes de bajar a la sección
            const enlace = e.target.closest('[data-res-enlace]');
            if (enlace && filtros.length) filtrar(enlace.dataset.filtro || 'todos');
        });

        pintarPaso();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', iniciarInstituto);
    } else {
        iniciarInstituto();
    }
})();

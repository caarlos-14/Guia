/* =====================================================
   INSTITUTO · MAQUETA 3D — añadir al final de script.js
   Solo se ejecuta si existe #seccion-maqueta en la página.
   ===================================================== */
(function () {
    function iniciarMaqueta() {
        const seccion = document.querySelector('#seccion-maqueta');
        if (!seccion) return;

        const visor = seccion.querySelector('[data-visor]');
        const mundo = seccion.querySelector('[data-mundo]');
        if (!visor || !mundo) return;

        const ANCHO_MUNDO = 720;
        const vista = { rz: -30, rx: 58, zoom: 1, base: 1 };
        const INICIAL = { rz: -30, rx: 58, zoom: 1 };

        /* ---------- 1. Construir las cajas 3D y los marcadores ---------- */
        const pines = [];
        mundo.querySelectorAll('.maq-caja').forEach(function (caja) {
            ['x', 'y', 'w', 'd', 'h'].forEach(function (clave) {
                caja.style.setProperty('--' + clave, caja.dataset[clave] || 0);
            });
            ['techo', 'frente', 'fondo', 'izq', 'der'].forEach(function (lado) {
                const cara = document.createElement('div');
                cara.className = 'maq-cara maq-cara--' + lado;
                caja.appendChild(cara);
            });
            // El marcador va al final del mundo (no dentro de la caja) para quedar siempre por encima al pulsar
            if (caja.dataset.zona && caja.dataset.num) {
                const x = Number(caja.dataset.x) || 0;
                const y = Number(caja.dataset.y) || 0;
                const pin = document.createElement('button');
                pin.type = 'button';
                pin.className = 'maq-pin';
                pin.textContent = caja.dataset.num;
                pin.dataset.ir = caja.dataset.zona;
                pin.style.setProperty('--x', x + (Number(caja.dataset.w) || 0) / 2);
                pin.style.setProperty('--y', y + (Number(caja.dataset.d) || 0) / 2);
                pin.style.setProperty('--h', (Number(caja.dataset.h) || 0) + 14);
                const ficha = seccion.querySelector('[data-ficha="' + caja.dataset.zona + '"] h3');
                pin.setAttribute('aria-label', ficha ? ficha.textContent : caja.dataset.zona);
                pines.push(pin);
            }
        });
        pines.forEach(function (pin) {
            mundo.appendChild(pin);
        });

        mundo.querySelectorAll('.maq-arbol, .maq-canasta').forEach(function (arbol) {
            arbol.style.setProperty('--x', arbol.dataset.x || 0);
            arbol.style.setProperty('--y', arbol.dataset.y || 0);
        });

        /* ---------- 2. Vista: giro, inclinación y zoom ---------- */
        function aplicarVista() {
            vista.rx = Math.min(75, Math.max(30, vista.rx));
            vista.zoom = Math.min(1.6, Math.max(0.6, vista.zoom));
            mundo.style.setProperty('--rz', vista.rz + 'deg');
            mundo.style.setProperty('--rx', vista.rx + 'deg');
            mundo.style.setProperty('--escala', (vista.base * vista.zoom).toFixed(3));
        }

        function ajustarTamano() {
            vista.base = Math.min(1, (visor.clientWidth - 40) / (ANCHO_MUNDO + 120));
            aplicarVista();
        }

        if ('ResizeObserver' in window) {
            new ResizeObserver(ajustarTamano).observe(visor);
        } else {
            window.addEventListener('resize', ajustarTamano);
        }
        ajustarTamano();

        /* ---------- 3. Arrastrar para girar (ratón y táctil) ---------- */
        let arrastre = null;
        let huboArrastre = false;

        visor.addEventListener('pointerdown', function (e) {
            if (e.target.closest('.maq-controles')) return;
            arrastre = { x: e.clientX, y: e.clientY, rz: vista.rz, rx: vista.rx };
            huboArrastre = false;
        });

        window.addEventListener('pointermove', function (e) {
            if (!arrastre) return;
            const dx = e.clientX - arrastre.x;
            const dy = e.clientY - arrastre.y;
            if (!huboArrastre && Math.abs(dx) + Math.abs(dy) > 5) {
                huboArrastre = true;
                visor.classList.add('arrastrando');
                pararAuto();
            }
            if (!huboArrastre) return;
            vista.rz = arrastre.rz + dx * 0.4;
            vista.rx = arrastre.rx - dy * 0.25;
            aplicarVista();
        });

        window.addEventListener('pointerup', function () {
            if (!arrastre) return;
            arrastre = null;
            visor.classList.remove('arrastrando');
        });

        /* ---------- 4. Giro automático ---------- */
        const botonAuto = seccion.querySelector('[data-accion="auto"]');
        let animacion = null;

        function pasoAuto() {
            vista.rz += 0.25;
            aplicarVista();
            animacion = requestAnimationFrame(pasoAuto);
        }

        function pararAuto() {
            if (!animacion) return;
            cancelAnimationFrame(animacion);
            animacion = null;
            visor.classList.remove('girando');
            if (botonAuto) {
                botonAuto.setAttribute('aria-pressed', 'false');
                botonAuto.innerHTML = '<i class="bi bi-play-fill" aria-hidden="true"></i>';
            }
        }

        function iniciarAuto() {
            visor.classList.add('girando');
            if (botonAuto) {
                botonAuto.setAttribute('aria-pressed', 'true');
                botonAuto.innerHTML = '<i class="bi bi-pause-fill" aria-hidden="true"></i>';
            }
            animacion = requestAnimationFrame(pasoAuto);
        }

        /* ---------- 5. Seleccionar una instalación ---------- */
        function seleccionar(zona) {
            seccion.querySelectorAll('[data-ficha]').forEach(function (ficha) {
                ficha.hidden = ficha.dataset.ficha !== zona;
            });
            mundo.querySelectorAll('.maq-caja[data-zona]').forEach(function (caja) {
                caja.classList.toggle('activa', caja.dataset.zona === zona);
            });
            mundo.querySelectorAll('.maq-pin').forEach(function (pin) {
                pin.classList.toggle('activo', pin.dataset.ir === zona);
            });
            seccion.querySelectorAll('.maq-zona-boton').forEach(function (boton) {
                const activo = boton.dataset.ir === zona;
                boton.classList.toggle('activo', activo);
                boton.setAttribute('aria-pressed', activo);
            });
        }

        /* ---------- 6. Clics: marcadores, edificios, botones y controles ---------- */
        seccion.addEventListener('click', function (e) {
            const control = e.target.closest('[data-accion]');
            if (control) {
                const accion = control.dataset.accion;
                if (accion === 'auto') {
                    animacion ? pararAuto() : iniciarAuto();
                    return;
                }
                pararAuto();
                if (accion === 'izquierda') vista.rz -= 45;
                if (accion === 'derecha') vista.rz += 45;
                if (accion === 'acercar') vista.zoom += 0.15;
                if (accion === 'alejar') vista.zoom -= 0.15;
                if (accion === 'reiniciar') {
                    vista.rz = INICIAL.rz;
                    vista.rx = INICIAL.rx;
                    vista.zoom = INICIAL.zoom;
                    seleccionar('inicio');
                }
                aplicarVista();
                return;
            }

            // Si se estaba arrastrando la maqueta, no cuenta como clic
            if (huboArrastre && e.target.closest('[data-visor]')) {
                huboArrastre = false;
                return;
            }

            const destino = e.target.closest('[data-ir]') || e.target.closest('.maq-caja[data-zona]');
            if (!destino) return;
            seleccionar(destino.dataset.ir || destino.dataset.zona);
        });

        /* ---------- 7. Teclado: flechas para girar e inclinar ---------- */
        visor.addEventListener('keydown', function (e) {
            const teclas = { ArrowLeft: [-15, 0], ArrowRight: [15, 0], ArrowUp: [0, -5], ArrowDown: [0, 5] };
            const mov = teclas[e.key];
            if (!mov || e.target !== visor) return;
            e.preventDefault();
            pararAuto();
            vista.rz += mov[0];
            vista.rx += mov[1];
            aplicarVista();
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', iniciarMaqueta);
    } else {
        iniciarMaqueta();
    }
})();

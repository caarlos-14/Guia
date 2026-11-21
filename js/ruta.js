        (() => {
            const $ = (sel) => document.querySelector(sel);

            // =====================================================================
            //  PLANIFICADOR DE RUTA
            //  - La ruta la crea el usuario con los LUGARES y se guarda en localStorage
            //  - Botón flotante "Mi ruta": abre la ruta del usuario desde cualquier punto
            // =====================================================================

            // Duración de la visita (minutos) por categoría y excepciones por lugar
            const DURACION = { monumentos: 60, iglesias: 30, parques: 90, restaurantes: 90, cultura: 60, institutos: 20, hoteles: 0, compras: 90, deportes: 90 };
            const DURACION_LUGAR = {
                'casa-cadena': 45, 'ayuntamiento': 30, 'parque-egido': 30, 'ermita-san-anton': 30, 'busto-meric': 15,
                'fabrica-colonial': 30, 'ombligos': 30, 'arqueopinto': 120, 'plaza-eboli': 120, 'teatro-rabal': 120, 'parque-sureste': 180
            };


            const CLAVE_RUTA = 'pinto-mi-ruta';
            const MAX_DIAS = 7;
            const porId = Object.fromEntries(LUGARES.map(l => [l.id, l]));
            const nuevoId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

            const plan = { dia: 0, mia: cargarRuta() };

            // ---------- Guardado ----------
            function cargarRuta() {
                try {
                    const d = JSON.parse(localStorage.getItem(CLAVE_RUTA));
                    if (d && Array.isArray(d.dias) && d.dias.length) {
                        d.dias.forEach(dia => dia.paradas = (dia.paradas || []).filter(p => porId[p.id] && /^\d\d:\d\d$/.test(p.hora)));
                        return d;
                    }
                } catch (e) { /* almacenamiento no disponible o datos corruptos */ }
                return { dias: [{ paradas: [] }] };
            }
            function guardarRuta() {
                try { localStorage.setItem(CLAVE_RUTA, JSON.stringify(plan.mia)); } catch (e) { /* modo privado, etc. */ }
                actualizarFab();
            }

            // ---------- Utilidades de horas ----------
            const aMin = h => { const [a, b] = h.split(':').map(Number); return a * 60 + b; };
            const aHora = m => `${String(Math.floor(m / 60) % 24).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
            const duracion = id => DURACION_LUGAR[id] ?? DURACION[porId[id].cat];
            const ordenadas = dia => [...dia.paradas].sort((a, b) => aMin(a.hora) - aMin(b.hora));
            const totalMia = () => plan.mia.dias.reduce((n, d) => n + d.paradas.length, 0);

            function siguienteHora(dia) {
                if (!dia || !dia.paradas.length) return '10:00';
                const fin = Math.max(...dia.paradas.map(p => aMin(p.hora) + duracion(p.id)));
                return aHora(Math.min(Math.ceil(fin / 15) * 15, 23 * 60 + 45));
            }


            // ---------- Línea de tiempo de un día ----------
            function lineaTiempo(dia, editable) {
                const ps = ordenadas(dia);
                if (!ps.length) {
                    return `<div class="vacio-plan"><i class="bi bi-calendar-plus"></i>
                            <p>Este día está vacío. Añade sitios con el formulario o con el botón <i class="bi bi-plus-lg"></i> de cada tarjeta.</p></div>`;
                }
                let finAnterior = -1;
                return `<ol class="linea-tiempo">${ps.map(p => {
                    const l = porId[p.id], c = CATEGORIAS[l.cat];
                    const ini = aMin(p.hora), d = duracion(p.id), fin = ini + d;
                    const solapa = ini < finAnterior;
                    finAnterior = Math.max(finAnterior, fin);
                    const detalleHora = d ? `${p.hora} – ${aHora(fin)} · ${d} min` : c.nombre;
                    return `
                        <li class="parada" style="--c:${c.color}">
                            <span class="hora">${p.hora}</span>
                            <div class="caja">
                                <span class="ico"><i class="bi ${c.icono}"></i></span>
                                <div class="info">
                                    <b title="${l.nombre}">${l.nombre}</b>
                                    <small>${detalleHora}${solapa ? ' · <span class="solapa"><i class="bi bi-exclamation-triangle-fill"></i> Se solapa</span>' : ''}</small>
                                </div>
                                <div class="acciones-mini">
                                    <button class="mini" type="button" data-ver="${l.id}" aria-label="Ver ${l.nombre}"><i class="bi bi-eye"></i></button>
                                    ${editable ? `<button class="mini quitar" type="button" data-quitar="${p.uid}" aria-label="Quitar ${l.nombre}"><i class="bi bi-x-lg"></i></button>` : ''}
                                </div>
                            </div>
                        </li>`;
                }).join('')}</ol>`;
            }

            // ---------- Enlace a Google Maps con la ruta a pie del día ----------
            function urlMaps(dia) {
                const ps = ordenadas(dia).map(p => porId[p.id]);
                if (!ps.length) return null;
                const q = l => encodeURIComponent(`${l.nombre}, ${l.direccion}, Pinto, Madrid`);
                if (ps.length === 1) return `https://www.google.com/maps/search/?api=1&query=${q(ps[0])}`;
                const paso = ps.slice(1, -1).slice(0, 8).map(q).join('%7C');
                return `https://www.google.com/maps/dir/?api=1&origin=${q(ps[0])}&destination=${q(ps[ps.length - 1])}${paso ? `&waypoints=${paso}` : ''}&travelmode=walking`;
            }
            const botonMaps = (dia, texto = 'Ver el día en Maps') => {
                const url = urlMaps(dia);
                return `<a class="btn-sec" ${url ? `href="${url}" target="_blank" rel="noopener"` : 'aria-disabled="true"'}><i class="bi bi-map"></i> ${texto}</a>`;
            };

            // ---------- Opciones del selector de lugares (agrupadas por categoría) ----------
            const opcionesLugares = Object.entries(CATEGORIAS).map(([k, c]) =>
                `<optgroup label="${c.nombre}">${LUGARES.filter(l => l.cat === k).map(l => `<option value="${l.id}">${l.nombre}</option>`).join('')}</optgroup>`
            ).join('');
            const opcionesDias = (sel) => plan.mia.dias.map((_, i) => `<option value="${i}" ${i === sel ? 'selected' : ''}>Día ${i + 1}</option>`).join('')
                + (plan.mia.dias.length < MAX_DIAS ? `<option value="${plan.mia.dias.length}">+ Nuevo día</option>` : '');

            // ---------- Panel lateral ----------

            function lateralMia() {
                const dia = plan.mia.dias[plan.dia];
                return `
                    <div class="panel">
                        <h3><i class="bi bi-plus-circle-fill" style="color:var(--naranja)"></i> Añadir parada</h3>
                        <form id="formParada" class="form-parada">
                            <label>Lugar<select id="selLugar" class="control" required>${opcionesLugares}</select></label>
                            <div class="fila">
                                <label>Día<select id="selDia" class="control">${opcionesDias(plan.dia)}</select></label>
                                <label>Hora<input id="selHora" class="control" type="time" step="900" value="${siguienteHora(dia)}" required></label>
                            </div>
                            <button class="btn-rojo w-completo" type="submit"><i class="bi bi-plus-lg"></i> Añadir a mi ruta</button>
                        </form>
                    </div>
                    <div class="panel">
                        <h3><i class="bi bi-calendar-week-fill" style="color:var(--naranja)"></i> Tu estancia</h3>
                        <div class="cifras">
                            <div><b>${plan.mia.dias.length}</b><small>${plan.mia.dias.length === 1 ? 'día' : 'días'}</small></div>
                            <div><b>${totalMia()}</b><small>paradas</small></div>
                            <div><b>${dia.paradas.length}</b><small>hoy (día ${plan.dia + 1})</small></div>
                        </div>
                        <div class="botonera">
                            ${botonMaps(dia)}
                            <button type="button" class="btn-sec" data-accion="copiar"><i class="bi bi-clipboard"></i> Copiar ruta</button>
                            ${plan.mia.dias.length > 1 ? `<button type="button" class="btn-sec peligro" data-accion="quitar-dia"><i class="bi bi-calendar-x"></i> Quitar día ${plan.dia + 1}</button>` : ''}
                            <button type="button" class="btn-sec peligro" data-accion="vaciar"><i class="bi bi-trash3"></i> Vaciar</button>
                        </div>
                    </div>`;
            }

            // ---------- Render del planificador ----------
            function pintarPlan() {
                const dias = plan.mia.dias;
                plan.dia = Math.min(plan.dia, dias.length - 1);

                $('#planDias').innerHTML = dias.map((d, i) => `
                        <button type="button" role="tab" class="chip ${i === plan.dia ? 'activo' : ''}" aria-selected="${i === plan.dia}" data-dia="${i}">
                            Día ${i + 1}<small>${d.paradas.length}</small>
                        </button>`).join('')
                    + (dias.length < MAX_DIAS ? `<button type="button" class="chip" data-accion="nuevo-dia"><i class="bi bi-plus-lg"></i> Añadir día</button>` : '');

                $('#planLista').innerHTML = lineaTiempo(dias[plan.dia], true);
                $('#planLateral').innerHTML = lateralMia();
            }

            // ---------- Panel "Mi ruta" (cajón lateral) ----------
            const cajon = $('#cajon');
            function pintarCajon() {
                $('#cajonCuerpo').innerHTML = totalMia()
                    ? plan.mia.dias.map((d, i) => `
                            <section class="cajon-dia">
                                <h4>Día ${i + 1} <small>${d.paradas.length} ${d.paradas.length === 1 ? 'parada' : 'paradas'}</small></h4>
                                ${lineaTiempo(d, true)}
                                ${d.paradas.length ? botonMaps(d, 'Ruta a pie en Maps') : ''}
                            </section>`).join('')
                    : `<div class="vacio-plan"><i class="bi bi-signpost-split"></i>
                             <p>Aún no has añadido ningún sitio.<br>Pulsa <i class="bi bi-plus-lg"></i> en cualquier lugar para empezar tu ruta.</p></div>`;
            }

            function actualizarFab() {
                $('#fabContador').textContent = totalMia();
            }

            function refrescar() {
                pintarPlan();
                if (cajon.open) pintarCajon();
                actualizarFab();
            }

            // ---------- Aviso temporal ----------
            let temporizadorAviso;
            function aviso(texto) {
                const el = $('#aviso');
                el.innerHTML = texto;
                el.classList.add('visible');
                clearTimeout(temporizadorAviso);
                temporizadorAviso = setTimeout(() => el.classList.remove('visible'), 2600);
            }

            // ---------- Acciones sobre la ruta del usuario ----------
            function anadirParada(id, diaIdx, hora) {
                while (plan.mia.dias.length <= diaIdx && plan.mia.dias.length < MAX_DIAS) plan.mia.dias.push({ paradas: [] });
                diaIdx = Math.min(diaIdx, plan.mia.dias.length - 1);
                plan.mia.dias[diaIdx].paradas.push({ uid: nuevoId(), id, hora });
                guardarRuta();
                plan.dia = diaIdx;
                refrescar();
                const fab = $('#fab');
                fab.classList.remove('salta'); void fab.offsetWidth; fab.classList.add('salta');
                aviso(`<i class="bi bi-check-circle-fill" style="color:#3fbf7f"></i> ${porId[id].nombre} · Día ${diaIdx + 1}, ${hora}`);
            }

            function textoRuta() {
                return 'Mi ruta por Pinto\n' + plan.mia.dias.map((d, i) =>
                    `\nDía ${i + 1}\n` + (ordenadas(d).map(p => `  ${p.hora}  ${porId[p.id].nombre} (${porId[p.id].direccion})`).join('\n') || '  (sin paradas)')
                ).join('\n');
            }
            async function copiarRuta() {
                if (!totalMia()) { aviso('Tu ruta está vacía'); return; }
                const t = textoRuta();
                try { await navigator.clipboard.writeText(t); }
                catch (e) {
                    const area = Object.assign(document.createElement('textarea'), { value: t });
                    document.body.appendChild(area); area.select(); document.execCommand('copy'); area.remove();
                }
                aviso('<i class="bi bi-clipboard-check"></i> Ruta copiada: pégala donde quieras');
            }

            function manejarAccion(e) {
                const quitar = e.target.closest('[data-quitar]');
                if (quitar) {
                    plan.mia.dias.forEach(d => d.paradas = d.paradas.filter(p => p.uid !== quitar.dataset.quitar));
                    guardarRuta(); refrescar();
                    return;
                }
                const diaBtn = e.target.closest('[data-dia]');
                if (diaBtn) { plan.dia = Number(diaBtn.dataset.dia); pintarPlan(); return; }


                const accion = e.target.closest('[data-accion]')?.dataset.accion;
                switch (accion) {
                    case 'nuevo-dia':
                        if (plan.mia.dias.length < MAX_DIAS) { plan.mia.dias.push({ paradas: [] }); plan.dia = plan.mia.dias.length - 1; guardarRuta(); refrescar(); }
                        break;
                    case 'quitar-dia':
                        if (plan.mia.dias.length > 1 && confirm(`¿Quitar el día ${plan.dia + 1} y sus paradas?`)) {
                            plan.mia.dias.splice(plan.dia, 1); plan.dia = Math.max(0, plan.dia - 1); guardarRuta(); refrescar();
                        }
                        break;
                    case 'vaciar':
                        if (totalMia() && confirm('¿Borrar toda tu ruta?')) { plan.mia = { dias: [{ paradas: [] }] }; plan.dia = 0; guardarRuta(); refrescar(); }
                        break;
                    case 'copiar':
                        copiarRuta();
                        break;
                    case 'cerrar-cajon':
                        cajon.close();
                        break;
                    case 'ir-planificador':
                        cajon.close();
                        pintarPlan();
                        $('#planificador').scrollIntoView({ behavior: 'smooth' });
                        break;
                }
            }
            $('#planificador').addEventListener('click', manejarAccion);
            cajon.addEventListener('click', (e) => { if (e.target === cajon) cajon.close(); else manejarAccion(e); });

            // Formulario "Añadir parada" del planificador
            $('#planificador').addEventListener('submit', (e) => {
                if (e.target.id !== 'formParada') return;
                e.preventDefault();
                anadirParada($('#selLugar').value, Number($('#selDia').value), $('#selHora').value || '10:00');
            });
            // Al cambiar de día en el formulario, propone la siguiente hora libre de ese día
            $('#planificador').addEventListener('change', (e) => {
                if (e.target.id === 'selDia') $('#selHora').value = siguienteHora(plan.mia.dias[Number(e.target.value)]);
            });

            // Botón flotante
            $('#fab').addEventListener('click', () => { pintarCajon(); cajon.showModal(); });

            // ---------- Ventana "Añadir a mi ruta" (desde tarjetas y detalle) ----------
            const dlgAnadir = $('#dlgAnadir');
            function abrirAnadir(id) {
                const l = porId[id];
                const dia = Math.min(plan.dia, plan.mia.dias.length - 1);
                dlgAnadir.innerHTML = `
                        <form class="form-parada" id="formAnadir">
                            <span class="antetitulo">Añadir a mi ruta</span>
                            <h3 id="dlgAnadirTitulo">${l.nombre}</h3>
                            <div class="fila">
                                <label>Día<select name="dia" class="control">${opcionesDias(dia)}</select></label>
                                <label>Hora<input name="hora" class="control" type="time" step="900" value="${siguienteHora(plan.mia.dias[dia])}" required></label>
                            </div>
                            <div class="botonera" style="justify-content:flex-end">
                                <button type="button" class="btn-sec" data-cerrar>Cancelar</button>
                                <button type="submit" class="btn-rojo"><i class="bi bi-plus-lg"></i> Añadir</button>
                            </div>
                            <input type="hidden" name="id" value="${id}">
                        </form>`;
                const det = document.getElementById('detalle');
                if (det && det.open) det.close();
                dlgAnadir.showModal();
            }
            document.addEventListener('click', (e) => {
                const btn = e.target.closest('[data-anadir]');
                if (btn) abrirAnadir(btn.dataset.anadir);
            });
            dlgAnadir.addEventListener('click', (e) => {
                if (e.target === dlgAnadir || e.target.closest('[data-cerrar]')) dlgAnadir.close();
            });
            dlgAnadir.addEventListener('change', (e) => {
                if (e.target.name === 'dia') dlgAnadir.querySelector('[name=hora]').value = siguienteHora(plan.mia.dias[Number(e.target.value)]);
            });
            dlgAnadir.addEventListener('submit', (e) => {
                e.preventDefault();
                const f = new FormData(e.target);
                dlgAnadir.close();
                anadirParada(f.get('id'), Number(f.get('dia')), f.get('hora') || '10:00');
            });

            pintarPlan();
            actualizarFab();
        })();

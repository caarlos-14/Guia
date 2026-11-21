(() => {
            const $ = (sel) => document.querySelector(sel);
            const WEB = 'https://www.madridbuses.com/';

            // Líneas de https://www.madridbuses.com/madrid/autobuses-pinto.html
            // carpeta + slug salen de la dirección de cada línea: WEB + carpeta + '/horarios-' + slug + '.html'
            const LINEAS = [
                { num: 'L-1A', tipo: 'Urbano', color: '#d9822b', carpeta: 'autobuses-urbanos', slug: 'l-1a-pinto', titulo: 'Circular (Pinto)' },
                { num: 'L-1B', tipo: 'Urbano', color: '#d9822b', carpeta: 'autobuses-urbanos', slug: 'l-1b-pinto', titulo: 'Circular (Pinto)' },
                { num: '412', tipo: 'Interurbano', color: '#3a9a5b', carpeta: 'autobuses-interurbanos', slug: '412-madrid-pinto-san-martin-de-la-vega', titulo: 'Madrid (Villaverde Bajo - Cruce) - San Martín de la Vega' },
                { num: '413', tipo: 'Interurbano', color: '#3a9a5b', carpeta: 'autobuses-interurbanos', slug: '413-pinto-san-martin-de-la-vega-parque-warner', titulo: 'Pinto - San Martín de la Vega - Parque Warner' },
                { num: '414', tipo: 'Interurbano', color: '#3a9a5b', carpeta: 'autobuses-interurbanos', slug: '414-madrid-pinto-valdemoro', titulo: 'Madrid (Villaverde Bajo - Cruce) - Centro Penitenciario Madrid III' },
                { num: '421', tipo: 'Interurbano', color: '#3a9a5b', carpeta: 'autobuses-interurbanos', slug: '421-madrid-getafe-pinto', titulo: 'Madrid (Legazpi) - Pinto' },
                { num: '422', tipo: 'Interurbano', color: '#3a9a5b', carpeta: 'autobuses-interurbanos', slug: '422-madrid-pinto-valdemoro', titulo: 'Madrid (Legazpi) - Valdemoro' },
                { num: '423', tipo: 'Interurbano', color: '#3a9a5b', carpeta: 'autobuses-interurbanos', slug: '423-madrid-pinto-aranjuez', titulo: 'Madrid (Estación Sur) - Aranjuez' },
                { num: '424', tipo: 'Interurbano', color: '#3a9a5b', carpeta: 'autobuses-interurbanos', slug: '424-madrid-pinto-valdemoro', titulo: 'Madrid (Legazpi) - Valdemoro (El Restón)' },
                { num: '427', tipo: 'Interurbano', color: '#3a9a5b', carpeta: 'autobuses-interurbanos', slug: '427-madrid-getafe-pinto', titulo: 'Madrid (Villaverde Bajo - Cruce) - Área Empresarial Andalucía - Pinto' },
                { num: '428', tipo: 'Interurbano', color: '#3a9a5b', carpeta: 'autobuses-interurbanos', slug: '428-getafe-pinto-valdemoro', titulo: 'Getafe - Valdemoro' },
                { num: '455', tipo: 'Interurbano', color: '#3a9a5b', carpeta: 'autobuses-interurbanos', slug: '455-getafe-fuenlabrada-pinto', titulo: 'Getafe - Pinto' },
                { num: '471', tipo: 'Interurbano', color: '#3a9a5b', carpeta: 'autobuses-interurbanos', slug: '471-humanes-fuenlabrada-pinto', titulo: 'Humanes - Fuenlabrada - Parla - Pinto' },
                { num: 'N-401', tipo: 'Nocturno', color: '#1f4e8c', carpeta: 'autobuses-nocturnos', slug: 'n401-madrid-pinto-valdemoro', titulo: 'Madrid (Atocha) - Pinto - Valdemoro' }
            ];

            const pagina = (l) => `${WEB}${l.carpeta}/horarios-${l.slug}.html`;
            const imagen = (l, sentido) => `${WEB}img/${l.carpeta}/horario-${sentido === 0 ? 'ida' : 'vuelta'}-linea-${l.slug}-completo.png`;

            const estadoT = { linea: 5, sentido: 0 };   // empieza en la 421, sentido ida

            function pintarLineas() {
                $('#lineas').innerHTML = LINEAS.map((l, i) => `
                    <button type="button" role="tab" class="chip ${i === estadoT.linea ? 'activo' : ''}" aria-selected="${i === estadoT.linea}" data-linea="${i}">
                        <span class="linea-num" style="background:${l.color}">${l.num}</span>${l.tipo}
                    </button>`).join('');
            }

            function pintarFicha() {
                const l = LINEAS[estadoT.linea];
                $('#fichaLinea').innerHTML = `
                    <span class="badge-linea" style="background:${l.color}">${l.num}</span>
                    <h4>${l.titulo}</h4>
                    <p>Autobús ${l.tipo.toLowerCase()}. Horarios de ida y vuelta para días laborables, fines de semana y festivos.</p>
                    <div class="botonera">
                        <a class="btn-sec" href="${pagina(l)}" target="_blank" rel="noopener"><i class="bi bi-box-arrow-up-right"></i> Ver la línea ${l.num}</a>
                    </div>`;
                $('#fuenteHorario').innerHTML = `<i class="bi bi-info-circle"></i> Fuente: <a href="${pagina(l)}" target="_blank" rel="noopener" style="color:var(--naranja)">madridbuses.com</a>. Los horarios pueden cambiar en verano y festivos.`;
            }

            // Muestra el horario del sentido elegido. Al tocarlo se abre a tamaño completo.
            function pintarLamina() {
                const l = LINEAS[estadoT.linea];
                const sentido = estadoT.sentido;
                document.querySelectorAll('.sentido').forEach(b => {
                    const activo = Number(b.dataset.sentido) === sentido;
                    b.classList.toggle('activo', activo);
                    b.setAttribute('aria-selected', activo);
                });
                const lamina = $('#laminaHorario');
                lamina.innerHTML = `<div class="cargando"><i class="bi bi-hourglass-split"></i> Cargando horario de ${sentido === 0 ? 'ida' : 'vuelta'} de la línea ${l.num}...</div>`;
                const img = new Image();
                img.alt = `Horario de ${sentido === 0 ? 'ida' : 'vuelta'} de la línea ${l.num}`;
                img.referrerPolicy = 'no-referrer';
                img.onload = () => {
                    if (LINEAS[estadoT.linea] !== l || estadoT.sentido !== sentido) return;   // el usuario ya cambió
                    const a = Object.assign(document.createElement('a'), { href: img.src, target: '_blank', rel: 'noopener' });
                    a.setAttribute('aria-label', `Ver a tamaño completo el horario de la línea ${l.num}`);
                    a.appendChild(img);
                    lamina.innerHTML = '';
                    lamina.appendChild(a);
                    lamina.scrollTop = 0;
                };
                img.onerror = () => {
                    if (LINEAS[estadoT.linea] !== l || estadoT.sentido !== sentido) return;
                    lamina.innerHTML = `<div class="sin-horario"><i class="bi bi-image"></i>
                        <span>No se ha podido mostrar el horario aquí.</span>
                        <a class="btn-rojo" href="${pagina(l)}" target="_blank" rel="noopener"><i class="bi bi-box-arrow-up-right"></i> Ver el horario de la línea ${l.num}</a></div>`;
                };
                img.src = imagen(l, sentido);
            }

            $('#lineas').addEventListener('click', (e) => {
                const b = e.target.closest('[data-linea]');
                if (!b) return;
                estadoT.linea = Number(b.dataset.linea);
                estadoT.sentido = 0;
                pintarLineas(); pintarFicha(); pintarLamina();
            });

            document.querySelector('.sentidos').addEventListener('click', (e) => {
                const b = e.target.closest('[data-sentido]');
                if (!b) return;
                estadoT.sentido = Number(b.dataset.sentido);
                pintarLamina();
            });

            pintarLineas();
            pintarFicha();
            // El horario se carga cuando el usuario llega a la sección
            const obs = new IntersectionObserver((entradas) => {
                if (entradas.some(e => e.isIntersecting)) { pintarLamina(); obs.disconnect(); }
            }, { rootMargin: '300px' });
            obs.observe($('#horarios'));
        })();
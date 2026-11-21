// ---------- Categorías (el orden es el de los chips) ----------
        const CATEGORIAS = {
            monumentos: { nombre: 'Monumentos', icono: 'bi-bank', color: '#f0a63c' },
            iglesias: { nombre: 'Iglesias y parroquias', icono: 'bi-building', color: '#4fb6d6' },
            parques: { nombre: 'Zonas verdes', icono: 'bi-tree', color: '#3fbf7f' },
            restaurantes: { nombre: 'Restaurantes', icono: 'bi-cup-hot', color: '#e05260' },
            cultura: { nombre: 'Cultura', icono: 'bi-book', color: '#7d8cff' },
            institutos: { nombre: 'Institutos', icono: 'bi-mortarboard', color: '#d96b9a' },
            hoteles: { nombre: 'Hoteles', icono: 'bi-house-door', color: '#a99dfc' },
            compras: { nombre: 'De compras', icono: 'bi-bag', color: '#F08E21' },
            deportes: { nombre: 'Deportes', icono: 'bi-trophy', color: '#5cc8a8' }
        };

        // ---------- Lugares ----------
        // img: RUTA DE LA FOTO DE CADA LUGAR → cámbiala por la tuya (ej. 'imagenes/torre.png' o una URL https://...)
        //      Si la dejas vacía ('') o la ruta no existe, sale un degradado con el icono
        // nota: opcional, la estrella solo aparece si la pones
        const LUGARES = [
            // --- Los 4 imprescindibles (salen primero en el carrusel) ---
            {
                id: 'torre-eboli', img: 'imagenes/torre.jpeg', cat: 'monumentos', etiqueta: 'Siglo XIV', tipo: 'Monumento Histórico', nota: 4.9,
                nombre: 'Torre de Éboli (Castillo de Pinto)', direccion: 'Plaza de Jaime Méric', estado: 'Visitas guiadas', abierto: true,
                desc: 'Fortaleza de piedra donde Felipe II confinó a Ana de Mendoza, la célebre Princesa de Éboli. Icono máximo de la villa y Bien de Interés Cultural.'
            },
            {
                id: 'santo-domingo', img: 'imagenes/santoDomingo.webp', cat: 'iglesias', etiqueta: 'Siglos XV-XVII', tipo: 'Gótico & Renacimiento', nota: 4.7,
                nombre: 'Santo Domingo de Silos', direccion: 'Plaza Egido de la Fuente s/n', estado: 'Acceso libre', abierto: false,
                desc: 'Templo mayor con majestuosas bóvedas de crucería y un retablo de gran valor artístico en el casco viejo pinteño. Declarado BIC.'
            },
            {
                id: 'parque-juan-carlos', img: 'imagenes/Pinto_Parque_Juan_Carlos_I_Statue.jpg', cat: 'parques', etiqueta: 'Pulmón Verde', tipo: 'Naturaleza & Didáctica', nota: 4.8,
                nombre: 'Parque J. Carlos I & Arqueopinto', direccion: 'Calle Sur s/n', estado: 'Abierto hoy', abierto: true,
                desc: 'Gran parque periurbano con lago artificial y parque arqueológico viviente para viajar desde el Paleolítico hasta Roma.'
            },
            {
                id: 'ermita-san-anton', img: 'imagenes/sanAnton.jpeg', cat: 'monumentos', etiqueta: 'Tradición', tipo: 'Hito Geográfico', nota: 4.6,
                nombre: 'Ermita San Antón & Km 0', direccion: 'Casco histórico', estado: 'Siempre accesible', abierto: true,
                desc: 'Monolito legendario que atestigua a Pinto como centro geográfico peninsular, junto a la popular ermita barroca.'
            },

            // --- Monumentos ---
            {
                id: 'casa-cadena', img: 'imagenes/cadena.jpeg', cat: 'monumentos', etiqueta: 'Siglo XVII', tipo: 'Museo Etnográfico',
                nombre: 'Casa de la Cadena', direccion: 'C/ de la Cadena s/n', estado: 'Según programación', abierto: true,
                desc: 'Antiguo palacete y edificio civil más destacado de Pinto. Debe su nombre a la cadena labrada sobre la puerta, símbolo del derecho de asilo. Hoy acoge el museo etnográfico y exposiciones.'
            },
            {
                id: 'ayuntamiento', img: 'imagenes/ayun.jpeg', cat: 'monumentos', etiqueta: 'Plaza Mayor', tipo: 'Edificio Civil',
                nombre: 'Ayuntamiento y Plaza de la Constitución', direccion: 'Plaza de la Constitución, 1', estado: 'Exterior libre', abierto: true,
                desc: 'Sede del gobierno municipal en la plaza principal, punto de partida ideal para recorrer el casco antiguo.'
            },
            {
                id: 'fabrica-colonial', img: 'imagenes/pueblo/fabrica-colonial.jpg', cat: 'monumentos', etiqueta: '1866', tipo: 'Patrimonio Industrial',
                nombre: 'Antigua Fábrica de Chocolate La Colonial', direccion: 'Pinto', estado: 'Exterior libre', abierto: true,
                desc: 'Restos de la fábrica de la Compañía Colonial: se conservan la chimenea, la casa del chocolate y uno de los almacenes. Origen de la tradición chocolatera pinteña.'
            },
            {
                id: 'busto-meric', img: 'imagenes/jaime-meric-1.webp', cat: 'monumentos', etiqueta: 'Homenaje', tipo: 'Escultura',
                nombre: 'Busto de Jaime Méric', direccion: 'Plaza de Jaime Méric', estado: 'Siempre accesible', abierto: true,
                desc: 'Recuerdo al fundador de la Compañía Colonial, la empresa chocolatera que marcó la historia industrial de Pinto.'
            },
            {
                id: 'fortines-guerra-civil', img: 'imagenes/ctd_deslizador_1.png', cat: 'monumentos', etiqueta: '1936-1939', tipo: 'Ruta Histórica',
                nombre: 'Fortificaciones de la Guerra Civil', direccion: 'Término municipal de Pinto', estado: 'Ruta exterior', abierto: true,
                desc: 'Red de fortines y trincheras repartidos por el término municipal, testigos del frente sur de Madrid.'
            },

            // --- Iglesias y parroquias ---
            {
                id: 'convento-capuchinas', img: 'imagenes/images.jpeg', cat: 'iglesias', etiqueta: 'Siglo XVII', tipo: 'Convento',
                nombre: 'Convento de las Capuchinas (N.ª Sra. de la Asunción)', direccion: 'Plaza de las Capuchinas, 3', estado: 'Horario de culto', abierto: false,
                desc: 'Convento de las Madres Capuchinas con su iglesia anexa, ejemplo de arquitectura religiosa del siglo XVII y Bien de Interés Cultural.'
            },
            {
                id: 'cristo-calvario', img: 'imagenes/images (1).jpeg', cat: 'iglesias', etiqueta: 'Ermita', tipo: 'Templo Popular',
                nombre: 'Ermita del Santísimo Cristo del Calvario', direccion: 'Plaza del Cristo del Calvario, 1', estado: 'Horario de culto', abierto: false,
                desc: 'Pequeña ermita dependiente de Santo Domingo de Silos, tranquila y muy querida por los vecinos.'
            },
            {
                id: 'san-francisco-javier', img: 'imagenes/images (2).jpeg', cat: 'iglesias', etiqueta: 'Parroquia', tipo: 'Templo Contemporáneo',
                nombre: 'Parroquia de San Francisco Javier', direccion: 'Avda. Pintor Antonio López, 20', estado: 'Horario de culto', abierto: false,
                desc: 'Parroquia de los barrios nuevos del municipio, con amplia explanada usada en fiestas y eventos.'
            },
            {
                id: 'sagrada-familia', img: 'imagenes/e4.webp', cat: 'iglesias', etiqueta: 'Rehabilitado', tipo: 'Convento',
                nombre: 'Convento e Iglesia de la Sagrada Familia', direccion: 'Casco histórico', estado: 'Uso municipal', abierto: false,
                desc: 'Antiguo convento rehabilitado por la Comunidad de Madrid y entregado al Ayuntamiento para uso público.'
            },

            // --- Zonas verdes ---
            {
                id: 'arqueopinto', img: 'imagenes/visita-guiada-prehistoria-evolucion-humana17-arqueopinto.jpg', cat: 'parques', etiqueta: 'Prehistoria', tipo: 'Parque Arqueológico',
                nombre: 'Arqueopinto', direccion: 'Parque Juan Carlos I', estado: 'Abierto hoy', abierto: true,
                desc: 'Parque temático de la Prehistoria donde se vive cómo eran el día a día y las viviendas de nuestros antepasados.'
            },
            {
                id: 'parque-egido', img: 'imagenes/images (3).jpeg', cat: 'parques', etiqueta: 'Centro', tipo: 'Parque Urbano',
                nombre: 'Parque del Egido de la Fuente', direccion: 'Plaza Egido de la Fuente', estado: 'Siempre accesible', abierto: true,
                desc: 'Parque céntrico junto a Santo Domingo, con el monumento que relata la leyenda del centro peninsular.'
            },
            {
                id: 'parque-norte', img: 'imagenes/images (4).jpeg', cat: 'parques', etiqueta: 'Barrio', tipo: 'Parque Urbano',
                nombre: 'Parque Norte', direccion: 'C/ Santo Domingo de Silos', estado: 'Siempre accesible', abierto: true,
                desc: 'Zona verde de barrio con áreas de juego y paseo, donde se ubica la Casa de Extremadura.'
            },
            // --- Restaurantes ---
            {
                id: 'reverso', img: 'imagenes/images (5).jpeg', cat: 'restaurantes', etiqueta: 'Mediterránea', tipo: 'Restaurante',
                nombre: 'Reverso Restaurante', direccion: 'Pinto', estado: 'Consultar horario', abierto: true,
                desc: 'Cocina mediterránea y española de autor, uno de los restaurantes mejor valorados del municipio.'
            },
            {
                id: 'suite-lago', img: 'imagenes/5a528e7c-b3e8-11eb-9520-06551cb39bc6.avif', cat: 'restaurantes', etiqueta: 'Junto al lago', tipo: 'Restaurante',
                nombre: 'La Suite del Lago', direccion: 'Parque Juan Carlos I', estado: 'Consultar horario', abierto: true,
                desc: 'Cocina mediterránea con vistas al lago del parque, perfecta para rematar el paseo.'
            },
            {
                id: 'el-apreton', img: 'imagenes/images (7).jpeg', cat: 'restaurantes', etiqueta: 'Raciones', tipo: 'Bar Restaurante',
                nombre: 'El Apretón II', direccion: 'Pinto', estado: 'Consultar horario', abierto: true,
                desc: 'Raciones abundantes y terraza: un clásico para cenar o tapear con amigos.'
            },
            {
                id: 'bar-silva', img: 'imagenes/bar-restaurante-cafeteria-silva-en-pinto-provincia-de-madrid.jpg', cat: 'restaurantes', etiqueta: 'Tradicional', tipo: 'Bar',
                nombre: 'Bar Silva', direccion: 'Pinto', estado: 'Consultar horario', abierto: true,
                desc: 'Bar de toda la vida para el aperitivo y la caña en el centro de Pinto.'
            },

            // --- Cultura ---
            {
                id: 'biblioteca-lapena', img: 'imagenes/images (8).jpeg', cat: 'cultura', etiqueta: 'Lectura', tipo: 'Biblioteca',
                nombre: 'Biblioteca Municipal Javier Lapeña', direccion: 'C/ Juana Francés, 63', estado: 'Horario municipal', abierto: true,
                desc: 'Biblioteca principal del municipio con salas de estudio, préstamo y actividades.'
            },
            {
                id: 'teatro-rabal', img: 'imagenes/teatro-francisco-rabal.jpg', cat: 'cultura', etiqueta: 'Escena', tipo: 'Teatro',
                nombre: 'Teatro Francisco Rabal', direccion: 'Pinto', estado: 'Según programación', abierto: false,
                desc: 'Teatro municipal con programación de artes escénicas, conciertos y actos como graduaciones.'
            },
            {
                id: 'centro-mab', img: 'imagenes/2525_casa-juventud-web.jpg', cat: 'cultura', etiqueta: 'Nicolás Fúster', tipo: 'Centro Municipal',
                nombre: 'Centro Miguel Ángel Blanco', direccion: 'C/ Nicolás Fúster, 2', estado: 'Horario municipal', abierto: true,
                desc: 'Centro municipal del barrio de Nicolás Fúster con talleres, cursos y servicios vecinales.'
            },
            {
                id: 'casa-extremadura', img: 'imagenes/images (6).jpeg', cat: 'cultura', etiqueta: 'Asociación', tipo: 'Casa Regional',
                nombre: 'Casa de Extremadura de Pinto', direccion: 'C/ Santo Domingo de Silos s/n (Parque Norte)', estado: 'Según programación', abierto: false,
                desc: 'Casa regional con actividades culturales, fiestas y encuentros en el Parque Norte.'
            },

            // --- Institutos ---
            {
                id: 'ies-calderon', img: 'imagenes/instituto-tecnologico-calderon-de-la-barca.jpg', cat: 'institutos', etiqueta: 'Público', tipo: 'Educación Secundaria',
                nombre: 'IES Calderón de la Barca', direccion: 'C/ Francisco Bores, 3', estado: 'Horario lectivo', abierto: true,
                desc: 'Instituto público de ESO, Bachillerato y Formación Profesional, incluido el ciclo de DAM.'
            },
            {
                id: 'ies-picasso', img: 'imagenes/pabloPicasso.jpg', cat: 'institutos', etiqueta: 'Bilingüe', tipo: 'Educación Secundaria',
                nombre: 'IES Pablo Picasso', direccion: 'C/ Pablo Picasso s/n', estado: 'Horario lectivo', abierto: true,
                desc: 'Instituto público bilingüe en inglés con ciclos de Gestión Administrativa y Administración y Finanzas.'
            },
            {
                id: 'ies-aleixandre', img: 'imagenes/vicente.jpeg', cat: 'institutos', etiqueta: 'Público', tipo: 'Educación Secundaria',
                nombre: 'IES Vicente Aleixandre', direccion: 'C/ Asturias, 20', estado: 'Horario lectivo', abierto: true,
                desc: 'Instituto público con ciclos de laboratorio, Bachillerato nocturno y Bachillerato de Artes.'
            },

            // --- Hoteles ---
            {
                id: 'eurostars-arenas', img: 'imagenes/euroStars.avif', cat: 'hoteles', etiqueta: '4 estrellas', tipo: 'Hotel',
                nombre: 'Hotel Eurostars Arenas de Pinto', direccion: 'C/ Arenas, 1', estado: 'Recepción 24 h', abierto: true,
                desc: 'Hotel moderno a unos 800 m del centro, cómodo para visitar Pinto o Madrid.'
            },
            {
                id: 'hotel-las-artes', img: 'imagenes/hotel-las-artes-artes-1.jpg', cat: 'hoteles', etiqueta: 'Junto a la A-4', tipo: 'Hotel',
                nombre: 'Hotel Las Artes', direccion: 'Plaza de Santiago, 1', estado: 'Recepción 24 h', abierto: true,
                desc: 'Hotel con acceso directo desde la A-4 y junto a zona comercial.'
            },
            {
                id: 'aparthotel-eboli', img: 'imagenes/hotelEboli.jpg', cat: 'hoteles', etiqueta: 'Familiar', tipo: 'Aparthotel',
                nombre: 'Aparthotel Princesa de Éboli', direccion: 'Paseo de las Artes, 15', estado: 'Recepción 24 h', abierto: true,
                desc: 'Establecimiento familiar con apartamentos, pensado para estancias de ocio o de trabajo.'
            },
            {
                id: 'posadas-espana', img: 'imagenes/posadas.jpg', cat: 'hoteles', etiqueta: 'Negocios', tipo: 'Hotel',
                nombre: 'Hotel Posadas de España Pinto', direccion: 'C/ Sierra Nevada, 3', estado: 'Recepción 24 h', abierto: true,
                desc: 'Hotel funcional junto a las zonas empresariales del municipio, con fácil aparcamiento.'
            },

            // --- De compras ---
            {
                id: 'plaza-eboli', img: 'imagenes/eboli.jpg', cat: 'compras', etiqueta: 'Ocio y tiendas', tipo: 'Centro Comercial',
                nombre: 'Centro Comercial Plaza Éboli', direccion: 'Pinto', estado: 'Abierto hoy', abierto: true,
                desc: 'Centro comercial con tiendas, restauración y ocio; el gran punto de compras de Pinto.'
            },
            // --- Deportes ---
            {
                id: 'polideportivo-principes', img: 'imagenes/principeAsturias.jpeg', cat: 'deportes', etiqueta: 'Municipal', tipo: 'Polideportivo',
                nombre: 'Polideportivo Príncipes de Asturias', direccion: 'Calle Sur s/n (Parque Juan Carlos I)', estado: 'Horario municipal', abierto: true,
                desc: 'Instalación deportiva municipal dentro del Parque Juan Carlos I con pistas y piscina.'
            }
        ];

        // ---------- Estado y utilidades ----------
        const estado = { texto: '', cat: 'todos' };
        const $ = (sel) => document.querySelector(sel);
        const contenedor = $('#contenedor');
        const normalizar = (s) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        LUGARES.forEach(l => {
            l._buscar = normalizar([l.nombre, l.tipo, l.desc, l.direccion, l.etiqueta, CATEGORIAS[l.cat].nombre].join(' '));
        });

        // ---------- Chips de filtro ----------
        function pintarFiltros() {
            const chips = [['todos', 'Todos', LUGARES.length],
            ...Object.entries(CATEGORIAS).map(([k, c]) => [k, c.nombre, LUGARES.filter(l => l.cat === k).length])];
            $('#filtros').innerHTML = chips.map(([k, nombre, n]) => `
                <button type="button" data-cat="${k}" class="chip ${estado.cat === k ? 'activo' : ''}"
                        aria-pressed="${estado.cat === k}">${nombre}<small>${n}</small></button>`).join('');
        }

        // ---------- Tarjeta ----------
        function tarjeta(l) {
            const c = CATEGORIAS[l.cat];
            return `
            <article class="lugar">
              <div class="tarjeta">
                <div class="media">
                  <img src="${l.img}" alt="${l.nombre}" loading="lazy" decoding="async"
                       onerror="sinFoto(this, '${c.icono}')">
                  <span class="etiqueta">${l.etiqueta}</span>
                  ${l.nota ? `<span class="nota"><i class="bi bi-star-fill"></i> ${l.nota}</span>` : ''}
                </div>
                <div class="cuerpo">
                  <span class="tipo" style="color:${c.color}"><i class="bi ${c.icono}"></i> ${l.tipo}</span>
                  <h3>${l.nombre}</h3>
                  <p>${l.desc}</p>
                  <div class="pie">
                    <span><span class="punto" style="background:${l.abierto ? '#3fbf7f' : '#e05260'}"></span>${l.estado}</span>
                    <div class="botones-tarjeta">
                      <button class="ver" type="button" data-ver="${l.id}" aria-label="Ver ${l.nombre}"><i class="bi bi-eye"></i></button>
                      <button class="ver anadir" type="button" data-anadir="${l.id}" aria-label="Añadir ${l.nombre} a mi ruta"><i class="bi bi-plus-lg"></i></button>
                    </div>
                  </div>
                </div>
              </div>
            </article>`;
        }

        // Las tarjetas se pintan UNA vez; al filtrar solo se muestran u ocultan
        LUGARES.forEach(l => { if (!l.img) l.img = 'data:,'; }); // img vacía → muestra el icono
        contenedor.innerHTML = LUGARES.map(tarjeta).join('');
        const tarjetas = [...contenedor.querySelectorAll('.lugar')];

        // ---------- Render (carrusel ↔ rejilla) ----------
        let modoAnterior = null;
        function render() {
            const q = normalizar(estado.texto.trim());
            const filtrando = q !== '' || estado.cat !== 'todos';
            const palabras = q.split(/\s+/).filter(Boolean);
            let visibles = 0;

            tarjetas.forEach((el, i) => {
                const l = LUGARES[i];
                const coincide = (estado.cat === 'todos' || l.cat === estado.cat) && palabras.every(p => l._buscar.includes(p));
                const estabaOculto = el.hidden;
                el.hidden = !coincide;
                if (coincide) {
                    visibles++;
                    if (estabaOculto || modoAnterior !== filtrando) {
                        el.classList.remove('aparece'); void el.offsetWidth; el.classList.add('aparece');
                    }
                }
            });

            contenedor.className = filtrando ? 'rejilla' : 'carrusel';
            if (modoAnterior !== filtrando) contenedor.scrollLeft = 0;
            modoAnterior = filtrando;

            $('#flechas').hidden = filtrando;
            $('#vacio').hidden = visibles > 0;
            $('#tituloSeccion').textContent = filtrando
                ? (estado.cat === 'todos' ? 'Resultados' : CATEGORIAS[estado.cat].nombre)
                : 'Lugares Imprescindibles';
            $('#contador').textContent = filtrando
                ? `${visibles} ${visibles === 1 ? 'lugar encontrado' : 'lugares encontrados'}`
                : 'Desliza o usa las flechas para descubrir cada rincón';
            actualizarFlechas();
        }

        // ---------- Flechas del carrusel (avanza de uno en uno) ----------
        function paso() {
            const t = tarjetas.find(x => !x.hidden);
            return t ? t.offsetWidth + (parseFloat(getComputedStyle(contenedor).columnGap) || 20) : 0;
        }
        function actualizarFlechas() {
            const max = contenedor.scrollWidth - contenedor.clientWidth - 2;
            $('#btnPrev').disabled = contenedor.scrollLeft <= 2;
            $('#btnNext').disabled = contenedor.scrollLeft >= max;
        }
        $('#btnPrev').addEventListener('click', () => contenedor.scrollBy({ left: -paso() }));
        $('#btnNext').addEventListener('click', () => contenedor.scrollBy({ left: paso() }));
        contenedor.addEventListener('scroll', actualizarFlechas, { passive: true });
        window.addEventListener('resize', actualizarFlechas);
        // Teclado: flechas izquierda/derecha cuando el carrusel tiene el foco
        contenedor.addEventListener('keydown', (e) => {
            if (contenedor.className !== 'carrusel') return;
            if (e.key === 'ArrowRight') { e.preventDefault(); contenedor.scrollBy({ left: paso() }); }
            if (e.key === 'ArrowLeft') { e.preventDefault(); contenedor.scrollBy({ left: -paso() }); }
        });

        // ---------- Búsqueda y filtros ----------
        $('#buscador').addEventListener('input', (e) => { estado.texto = e.target.value; render(); });
        $('#formBuscar').addEventListener('submit', (e) => {
            e.preventDefault();
            $('#buscador').blur(); // cierra el teclado en móvil
            $('#lugares').scrollIntoView({ behavior: 'smooth' });
        });
        $('#filtros').addEventListener('click', (e) => {
            const chip = e.target.closest('[data-cat]');
            if (!chip) return;
            estado.cat = chip.dataset.cat;
            pintarFiltros();
            render();
        });
        $('#btnLimpiar').addEventListener('click', () => {
            estado.texto = ''; estado.cat = 'todos';
            $('#buscador').value = '';
            pintarFiltros(); render();
        });

        // ---------- Ventana de detalle (dialog nativo: funciona en todos los navegadores actuales) ----------
        const detalle = $('#detalle');
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-ver]');
            if (!btn) return;
            const l = LUGARES.find(x => x.id === btn.dataset.ver);
            const c = CATEGORIAS[l.cat];
            const mapa = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(`${l.nombre}, ${l.direccion}, Pinto`);
            detalle.innerHTML = `
                <button type="button" class="cerrar" aria-label="Cerrar"><i class="bi bi-x-lg"></i></button>
                <img src="${l.img}" alt="${l.nombre}" onerror="this.remove()">
                <div class="cuerpo">
                  <span class="tipo fw-bold" style="color:${c.color}"><i class="bi ${c.icono}"></i> ${c.nombre} · ${l.tipo}</span>
                  <h3 id="detalleTitulo">${l.nombre}</h3>
                  <p class="suave">${l.desc}</p>
                  <p class="mb-1"><i class="bi bi-geo-alt"></i> ${l.direccion}</p>
                  <p><i class="bi bi-clock"></i> ${l.estado}</p>
                  <div class="botonera">
                    <a href="${mapa}" target="_blank" rel="noopener" class="btn-rojo">Cómo llegar <i class="bi bi-box-arrow-up-right"></i></a>
                    <button type="button" class="btn-sec" data-anadir="${l.id}"><i class="bi bi-plus-lg"></i> Añadir a mi ruta</button>
                  </div>
                </div>`;
            detalle.showModal();
        });
        detalle.addEventListener('click', (e) => {
            // Cierra con la X o pulsando fuera de la ventana
            if (e.target.closest('.cerrar') || e.target === detalle) detalle.close();
        });

        // ---------- Inicio ----------
        $('#statMonumentos').textContent = LUGARES.filter(l => l.cat === 'monumentos' || l.cat === 'iglesias').length + '+';
        pintarFiltros();
        render();
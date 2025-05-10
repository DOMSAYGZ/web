// Mapeo de categorías a palabras clave relacionadas
const categoryMappings = {
    natural: ['parque', 'reserva', 'jardín', 'playa', 'volcán', 'naturaleza', 'laguna', 'mirador', 'río', 'finca'],
    cultural: ['cultural', 'museo', 'arte', 'teatro', 'historia'],
    histórico: ['histórico', 'historia', 'ruinas', 'catedral', 'iglesia', 'antiguo'],
    gastronómico: ['gastronómico', 'restaurante', 'comida', 'café', 'gastronomía', 'mercado'],
    villa: ['villa', 'villas'],
    plaza: ['plaza', 'plazas']
};

// Lista de 5 sitios turísticos en Pedro Brand con imágenes específicas
function getFallbackPlacesData() {
    let pedroBrandSites = [
        {
            name: "Parque Nacional Montaña La Humeadora",
            badge: "Natural",
            rating: 4.5,
            price: "Entrada libre",
            availability: "Abierto todos los días",
            description: "Un parque nacional con senderos para caminatas y vistas panorámicas de la región.",
            details: "Ideal para los amantes de la naturaleza y el ecoturismo, ofrece diversas rutas de senderismo.",
            image: "assets/images/parque_humeadora.jpg"
        },
        {
            name: "Catedral San Pedro Apóstol",
            badge: "Histórico",
            rating: 4.2,
            price: "Entrada libre",
            availability: "Abierta durante servicios religiosos",
            description: "Una iglesia histórica que data del siglo XIX, conocida por su arquitectura colonial.",
            details: "Es un importante centro de fe y cultura en san pedro de macoris, con misas diarias.",
            image: "assets/images/catedral-de-san-pedro-de-macoris.jpg"
        },
        {
            name: "Río Haina",
            badge: "Natural",
            rating: 4.0,
            price: "Entrada libre",
            availability: "Accesible todo el año",
            description: "Un río que atraviesa Pedro Brand, ideal para picnics y actividades acuáticas.",
            details: "Popular entre los locales para nadar y pescar, especialmente en verano.",
            image: "assets/images/rio_haina.jpeg"
        },
        {
            name: "Mirador de Pedro Brand",
            badge: "Natural",
            rating: 4.3,
            price: "Entrada libre",
            availability: "Abierto todos los días",
            description: "Un mirador que ofrece vistas espectaculares del paisaje circundante.",
            details: "Perfecto para fotografía y observación de aves, con áreas de descanso.",
            image: "assets/images/mirador.jpg"
        },
        {
            name: "Plaza de la Cultura",
            badge: "Cultural",
            rating: 4.1,
            price: "Entrada libre",
            availability: "Abierta todos los días",
            description: "Un espacio cultural que alberga eventos artísticos y exposiciones.",
            details: "Regularmente se realizan ferias de artesanía y presentaciones musicales.",
            image: "assets/images/plaza_de_la_cultura.jpg"
        },
        {
            name: "Finca Los Corozos",
            badge: "Natural",
            rating: 4.4,
            price: "$50.00 por tour",
            availability: "Tours programados",
            description: "Una finca histórica conocida por sus cultivos de coco y vistas rurales.",
            details: "Ofrece tours agrícolas y experiencias de campo, ideal para aprender sobre la vida rural.",
            image: "assets/images/los_corozos.jpg"
        },
        {
            name: "Villa del Campo",
            badge: "Villa",
            rating: 4.7,
            price: "$85.00 por noche",
            availability: "Disponible en temporada",
            description: "Una villa rústica rodeada de naturaleza, perfecta para desconectar.",
            details: "Con diseño tradicional y jardines amplios, ofrece una experiencia tranquila en el campo.",
            image: "assets/images/villa_campo_losamigos.webp"
        },
        {
            name: "Villa Sol de Pedro Brand",
            badge: "Villa",
            rating: 4.8,
            price: "$100.00 por noche",
            availability: "Reservas disponibles",
            description: "Una villa de lujo con piscina y vistas al paisaje rural de Pedro Brand.",
            details: "Perfecta para familias o grupos, combina modernidad con el encanto dominicano.",
            image: "assets/images/villa_del_sol.jpeg"
        },
        {
            name: "Parque Central de Pedro Brand",
            badge: "Plaza",
            rating: 4.3,
            price: "Entrada libre",
            availability: "Abierta todos los días",
            description: "Un espacio comunitario en el centro de Pedro Brand, ideal para eventos locales.",
            details: "Con áreas verdes y bancas para descansar, es el corazón de la comunidad.",
            image: "assets/images/parque-central.jpg"
        }
    ];

    pedroBrandSites = pedroBrandSites.map((site, index) => {
        site.id = 100 + index;
        site.location = {
            "Parque Nacional Montaña La Humeadora": "https://www.google.com/maps/search/?api=1&query=Parque+Nacional+Montaña+La+Humeadora,+Pedro+Brand",
            "Catedral San Pedro Apostol": "https://www.google.com/maps/search/?api=1&query=Catedral+San+Pedro+Apóstol%2C+San+Pedro+de+Macor%C3%ADs",
            "Río Haina": "https://www.google.com/maps/search/?api=1&query=Río+Haina,+Pedro+Brand",
            "Mirador de Pedro Brand": "https://www.google.com/maps/search/?api=1&query=Mirador+de+Pedro+Brand",
            "Plaza de la Cultura": "https://www.google.com/maps/search/?api=1&query=Plaza+de+la+Cultura,+Pedro+Brand",
            "Finca Los Corozos": "https://www.google.com/maps/search/?api=1&query=Finca+Los+Corozos,+Pedro+Brand",
            "Villa del Campo": "https://www.google.com/maps/search/?api=1&query=Villa+del+Campo,+Pedro+Brand",
            "Villa Sol de Pedro Brand": "https://www.google.com/maps/search/?api=1&query=Villa+Sol+de+Pedro+Brand",
            "Parque Central de Pedro Brand": "https://www.google.com/maps/search/?api=1&query=Parque+Central+de+Pedro+Brand"
        }[site.name];
        return site;
    });

    return pedroBrandSites;
}
document.addEventListener('DOMContentLoaded', function () {
    loadPlaces();
    setupContactForm();
    setupSearchBar();
});

function loadPlaces() {
    fetch('data/places.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo cargar los datos');
            }
            return response.json();
        })
        .then(data => {
            let places = data.places || [];
            places = places.concat(getFallbackPlacesData());
            displayPlaces(places);
        })
        .catch(error => {
            console.error('Error al cargar los sitios turísticos:', error);
            const fallbackData = getFallbackPlacesData();
            displayPlaces(fallbackData);
        });
}

function displayPlaces(places) {
    const container = document.getElementById('places-container');
    container.innerHTML = '';

    places.forEach(place => {
        const placeElement = createPlaceElement(place);
        container.appendChild(placeElement);
    });
}

function createPlaceElement(place) {
    const placeCard = document.createElement('div');
    placeCard.className = 'place-card';
    const imageSrc = place.image || 'https://via.placeholder.com/300x200?text=Imagen+no+disponible';
    placeCard.innerHTML = `
        <div class="place-img">
            <img src="${imageSrc}" alt="${place.name}">
            <div class="place-badge">${place.badge}</div>
        </div>
        <div class="place-content">
            <h3 class="place-name">${place.name}</h3>
            <div class="place-rating">
                ${getRatingStars(place.rating)}
                <span>${place.rating}</span>
            </div>
            <div class="place-info">
                <div class="place-price">${place.price}</div>
                <div class="place-availability">${place.availability}</div>
            </div>
            <p>${place.description}</p>
            <div class="place-btns">
                <a href="${place.location}" target="_blank" class="place-btn map-btn">
                    <i class="fas fa-map-marker-alt"></i> Ver en mapa
                </a>
                <button class="place-btn details-btn" data-id="${place.id}">
                    <i class="fas fa-info-circle"></i> Detalles
                </button>
            </div>
        </div>
    `;

    const detailsBtn = placeCard.querySelector('.details-btn');
    detailsBtn.addEventListener('click', () => showPlaceDetails(place));

    return placeCard;
}

function getRatingStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    let starsHTML = '';
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    if (halfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }

    return starsHTML;
}

function showPlaceDetails(place) {
    let modal = document.getElementById('place-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'place-modal';
        modal.className = 'modal';
        document.body.appendChild(modal);

        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        overlay.addEventListener('click', closeModal);
        document.body.appendChild(overlay);
    }

    const imageSrc = place.image || 'https://via.placeholder.com/300x200?text=Imagen+no+disponible';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">×</span>
            <div class="modal-header">
                <h2>${place.name}</h2>
                <div class="place-rating">
                    ${getRatingStars(place.rating)}
                    <span>${place.rating}</span>
                </div>
            </div>
            <div class="modal-body">
                <div class="modal-img">
                    <img src="${imageSrc}" alt="${place.name}">
                </div>
                <div class="modal-info">
                    <div class="info-item">
                        <i class="fas fa-tag"></i>
                        <span>${place.badge}</span>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-dollar-sign"></i>
                        <span>${place.price}</span>
                    </div>
                    <div class="info-item">
                        <i class="fas fa-clock"></i>
                        <span>${place.availability}</span>
                    </div>
                </div>
                <div class="modal-description">
                    <h3>Descripción</h3>
                    <p>${place.details || place.description}</p>
                </div>
                <a href="${place.location}" target="_blank" class="place-btn map-btn full-width">
                    <i class="fas fa-map-marker-alt"></i> Ver ubicación en el mapa
                </a>
            </div>
        </div>
    `;

    modal.style.display = 'block';
    document.querySelector('.modal-overlay').style.display = 'block';
    document.body.style.overflow = 'hidden';

    modal.querySelector('.close-modal').addEventListener('click', closeModal);
}

function closeModal() {
    const modal = document.getElementById('place-modal');
    const overlay = document.querySelector('.modal-overlay');

    if (modal) {
        modal.style.display = 'none';
    }
    if (overlay) {
        overlay.style.display = 'none';
    }
    document.body.style.overflow = 'auto';
}

function setupContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (!name || !email || !message) {
                alert('Por favor completa todos los campos');
                return;
            }

            alert(`¡Gracias ${name}! Tu mensaje ha sido enviado. Te contactaremos pronto.`);
            contactForm.reset();
        });
    }
}

function setupSearchBar() {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');

    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', function () {
            performSearch(searchInput.value);
        });

        searchInput.addEventListener('keypress', function (event) {
            if (event.key === 'Enter') {
                performSearch(searchInput.value);
            }
        });
    }
}

function performSearch(query) {
    if (!query.trim()) {
        return;
    }

    fetch('data/places.json')
        .then(response => response.json())
        .then(data => {
            let places = data.places || [];
            places = places.concat(getFallbackPlacesData());
            filterAndDisplayPlaces(places, query);
        })
        .catch(error => {
            console.error('Error al buscar:', error);
            const fallbackData = getFallbackPlacesData();
            filterAndDisplayPlaces(fallbackData, query);
        });
}

function filterAndDisplayPlaces(places, query) {
    const searchTerm = query.toLowerCase();
    const filteredPlaces = places.filter(place => {
        return (
            place.name.toLowerCase().includes(searchTerm) ||
            place.description.toLowerCase().includes(searchTerm) ||
            place.badge.toLowerCase().includes(searchTerm)
        );
    });

    displayPlaces(filteredPlaces);

    const sectionTitle = document.querySelector('#featured .section-title h2');
    if (sectionTitle) {
        if (filteredPlaces.length > 0) {
            sectionTitle.textContent = `Resultados para "${query}" (${filteredPlaces.length})`;
        } else {
            sectionTitle.textContent = `No se encontraron resultados para "${query}"`;
        }
    }

    document.getElementById('featured').scrollIntoView({ behavior: 'smooth' });
}

(function addModalStyles() {
    const style = document.createElement('style');
    style.textContent = `
        :root {
            --primary-color:rgb(72, 161, 76);
            --primary-dark: #1B5E20;
            --primary-light: #A5D6A7;
            --secondary-color:rgb(77, 94, 78);
            --text-color: #212121;
            --shadow-color: rgba(0, 0, 0, 0.2);
            --card-bg-color: #FFFFFF;
            --rating-star-color: #FFD700;
            --overlay-bg-color: rgba(0, 0, 0, 0.7);
            --badge-bg-color: 112, 136, 113;
            --badge-bg-opacity: 0.8;
        }

        .modal {
            display: none;
            position: fixed;
            z-index: 1001;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 90%;
            max-width: 800px;
            max-height: 90vh;
            overflow-y: auto;
            background-color: var(--secondary-color);
            color: var(--text-color);
            border-radius: 20px;
            box-shadow: var(--shadow-color);
            padding: 20px;
        }

        .modal-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: var(--overlay-bg-color);
            z-index: 1000;
        }

        .modal-content {
            position: relative;
            padding: 20px;
        }

        .close-modal {
            position: absolute;
            top: 15px;
            right: 15px;
            font-size: 24px;
            cursor: pointer;
            z-index: 1002;
            color: var(--text-color);
        }

        .modal-header {
            margin-bottom: 20px;
            border-bottom: 1px solid var(--primary-light);
            padding-bottom: 15px;
            text-align: center;
        }

        .modal-img {
            width: 100%;
            height: 300px;
            overflow: hidden;
            border-radius: 10px;
            margin-bottom: 20px;
        }

        .modal-img img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .modal-info {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
            flex-wrap: wrap;
        }

        .info-item {
            background-color: var(--primary-light);
            padding: 10px 15px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            color: var(--secondary-color);
        }

        .info-item i {
            color: var(--primary-color);
            margin-right: 10px;
        }

        .modal-description {
            margin-bottom: 20px;
        }

        .modal-description h3 {
            margin-bottom: 10px;
            color: var(--primary-color);
            text-align: center;
        }

        .full-width {
            width: 100%;
            text-align: center;
        }

        .place-card {
            display: flex;
            flex-direction: column;
            background-color: var(--card-bg-color);
            border-radius: 20px;
            box-shadow: var(--shadow-color);
            overflow: hidden;
            margin: 10px auto;
            transition: transform 0.3s, opacity 0.3s;
            opacity: 0;
            transform: translateY(20px);
        }

        .place-img {
            position: relative;
            width: 100%;
            height: 200px;
            overflow: hidden;
        }

        .place-img img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-top-left-radius: 20px;
            border-top-right-radius: 20px;
        }

        .place-badge {
            position: absolute;
            top: 10px;
            left: 10px;
            background-color: rgba(var(--badge-bg-color), var(--badge-bg-opacity));
            padding: 5px 10px;
            border-radius: 5px;
            font-weight: bold;
            color: var(--secondary-color);
        }

        .place-content {
            padding: 15px;
            text-align: center;
        }

        .place-rating i {
            color: var(--rating-star-color);
        }

        .place-btn {
            background-color: var(--primary-color);
            color: var(--card-bg-color);
            padding: 10px;
            border: none;
            border-radius: 5px;
            text-decoration: none;
            margin: 0 5px;
            cursor: pointer;
            transition: background-color 0.3s;
        }

        .place-btn:hover {
            background-color: var(--primary-dark);
        }
        p {
            color: black;
        }
    `;
    document.head.appendChild(style);
})();

window.addEventListener('scroll', function () {
    const elements = document.querySelectorAll('.place-card, .about-section, .contact-container');

    elements.forEach(element => {
        const position = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (position < screenPosition) {
            element.style.opacity = 1;
            element.style.transform = 'translateY(0)';
        }
    });
});

// Chatbot para LocalSpot - Versión mejorada con sitios turísticos de Pedro Brand
document.addEventListener('DOMContentLoaded', function() {
    const chatbotContainer = document.getElementById('chatbot-container');
    const openChatbotBtn = document.getElementById('open-chatbot');
    const closeChatbotBtn = document.getElementById('close-chatbot');
    const messagesContainer = document.getElementById('chatbot-messages');
    const userInput = document.getElementById('user-input');
    const sendMessageBtn = document.getElementById('send-message');

    let conversationContext = {
        lastTopic: null,
        lastResponseType: null,
        lastSite: null,
        lastRecommended: null
    };

    const placesData = [
        {
            id: 1,
            name: "Parque Nacional Montaña La Humeadora",
            badge: "Natural",
            rating: 4.5,
            price: "Entrada libre",
            availability: "Abierto todos los días",
            description: "Un parque nacional con senderos para caminatas y vistas panorámicas de la región.",
            details: "Ideal para los amantes de la naturaleza y el ecoturismo, ofrece diversas rutas de senderismo.",
           image: "assets/images/parque_humeadora.jpg",
            location: "https://www.google.com/maps/search/?api=1&query=Parque+Nacional+Montaña+La+Humeadora,+Pedro+Brand"
        },
        {
            id: 2,
            name: "Catedral San Pedro Apóstol",
            badge: "Histórico",
            rating: 4.2,
            price: "Entrada libre",
            availability: "Abierta durante servicios religiosos",
            description: "Una iglesia histórica que data del siglo XIX, conocida por su arquitectura colonial.",
            details: "Es un importante centro de fe y cultura en san Pedro de macoris, con misas diarias.",
            image: "assets/images/catedral-de-san-pedro-de-macoris.jpg",
            location: "https://www.google.com/maps/search/?api=1&query=Catedral+San+Pedro+Apóstol%2C+San+Pedro+de+Macor%C3%ADs"
        },
        {
            id: 3,
            name: "Río Haina",
            badge: "Natural",
            rating: 4.0,
            price: "Entrada libre",
            availability: "Accesible todo el año",
            description: "Un río que atraviesa Pedro Brand, ideal para picnics y actividades acuáticas.",
            details: "Popular entre los locales para nadar y pescar, especialmente en verano.",
            image: "assets/images/rio_haina.jpeg",
            location: "https://www.google.com/maps/search/?api=1&query=Río+Haina,+Pedro+Brand"
        },
        {
            id: 4,
            name: "Mirador de Pedro Brand",
            badge: "Natural",
            rating: 4.3,
            price: "Entrada libre",
            availability: "Abierto todos los días",
            description: "Un mirador que ofrece vistas espectaculares del paisaje circundante.",
            details: "Perfecto para fotografía y observación de aves, con áreas de descanso.",
            image: "assets/images/mirador.jpg",
            location: "https://www.google.com/maps/search/?api=1&query=Mirador+de+Pedro+Brand"
        },
        {
            id: 5,
            name: "Plaza de la Cultura",
            badge: "Cultural",
            rating: 4.1,
            price: "Entrada libre",
            availability: "Abierta todos los días",
            description: "Un espacio cultural que alberga eventos artísticos y exposiciones.",
            details: "Regularmente se realizan ferias de artesanía y presentaciones musicales.",
            image: "assets/images/plaza_de_la_cultura.jpg",
            location: "https://www.google.com/maps/search/?api=1&query=Plaza+de+la+Cultura,+Pedro+Brand"
        },
        {
            id: 6,
            name: "Finca Los Corozos",
            badge: "Natural",
            rating: 4.4,
            price: "$50.00 por tour",
            availability: "Tours programados",
            description: "Una finca histórica conocida por sus cultivos de coco y vistas rurales.",
            details: "Ofrece tours agrícolas y experiencias de campo, ideal para aprender sobre la vida rural.",
            image: "assets/images/los_corozos.jpg",
            location: "https://www.google.com/maps/search/?api=1&query=Finca+Los+Corozos,+Pedro+Brand"
        },
        {
            id: 7,
            name: "Villa del Campo",
            badge: "Villa",
            rating: 4.7,
            price: "$85.00 por noche",
            availability: "Disponible en temporada",
            description: "Una villa rústica rodeada de naturaleza, perfecta para desconectar.",
            details: "Con diseño tradicional y jardines amplios, ofrece una experiencia tranquila en el campo.",
            image: "assets/images/villa_campo_losamigos.webp",
            location: "https://www.google.com/maps/search/?api=1&query=Villa+del+Campo,+Pedro+Brand"
        },
        {
            id: 8,
            name: "Villa Sol de Pedro Brand",
            badge: "Villa",
            rating: 4.8,
            price: "$100.00 por noche",
            availability: "Reservas disponibles",
            description: "Una villa de lujo con piscina y vistas al paisaje rural de Pedro Brand.",
            details: "Perfecta para familias o grupos, combina modernidad con el encanto dominicano.",
            image: "assets/images/villa_del_sol.jpeg",
            location: "https://www.google.com/maps/search/?api=1&query=Villa+Sol+de+Pedro+Brand"
        },
        {
            id: 9,
            name: "Parque Central de Pedro Brand",
            badge: "Plaza",
            rating: 4.3,
            price: "Entrada libre",
            availability: "Abierta todos los días",
            description: "Un espacio comunitario en el centro de Pedro Brand, ideal para eventos locales.",
            details: "Con áreas verdes y bancas para descansar, es el corazón de la comunidad.",
            image: "assets/images/parque-central.jpg",
            location: "https://www.google.com/maps/search/?api=1&query=Parque+Central+de+Pedro+Brand"
        }
    ];

    openChatbotBtn.addEventListener('click', () => {
        chatbotContainer.style.display = 'flex';
        if (messagesContainer.children.length <= 1) {
            addBotMessage('¡Hola! Soy el asistente virtual de LocalSpot. Estoy aquí para ayudarte a descubrir los mejores lugares turísticos de Pedro Brand. Puedes preguntarme sobre horarios, precios, ubicaciones, actividades, imágenes o recomendaciones. ¿Qué te gustaría conocer hoy?');
        }
    });

    closeChatbotBtn.addEventListener('click', () => {
        chatbotContainer.style.display = 'none';
    });

    sendMessageBtn.addEventListener('click', handleUserMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserMessage();
        }
    });

    function handleUserMessage() {
        const message = userInput.value.trim();
        if (message === '') return;
        addUserMessage(message);
        setTimeout(() => {
            const botResponse = generateResponse(message);
            addBotMessage(botResponse);
        }, 500);
        userInput.value = '';
    }

    function addUserMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'user-message';
        messageDiv.textContent = message;
        messagesContainer.appendChild(messageDiv);
        scrollToBottom();
    }

    function addBotMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'bot-message';
        messageDiv.innerHTML = message; // Usar innerHTML para permitir HTML
        messagesContainer.appendChild(messageDiv);
        scrollToBottom();
    }

    function scrollToBottom() {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function parsePrice(priceStr) {
        if (priceStr.toLowerCase().includes('libre') || priceStr.toLowerCase().includes('gratis')) {
            return 0;
        }
        const match = priceStr.match(/\$([\d,.]+)/);
        if (match) {
            return parseFloat(match[1].replace(',', ''));
        }
        return Infinity;
    }

    function findCheapestOptionByCategory(category) {
        const filteredPlaces = placesData.filter(place => normalizeText(place.badge) === normalizeText(category));
        if (filteredPlaces.length === 0) return null;
        return filteredPlaces.reduce((cheapest, current) => {
            const currentPrice = parsePrice(current.price);
            const cheapestPrice = parsePrice(cheapest.price);
            return currentPrice < cheapestPrice ? current : cheapest;
        }, filteredPlaces[0]);
    }

    function findBestOptionByCategory(category) {
        const filteredPlaces = placesData.filter(place => normalizeText(place.badge) === normalizeText(category));
        if (filteredPlaces.length === 0) return null;
        return filteredPlaces.reduce((best, current) => {
            return (current.rating > best.rating) ? current : best;
        }, filteredPlaces[0]);
    }

    function getCategoryFromMessage(message) {
        const categories = {
            natural: ['naturaleza', 'natural', 'parque', 'reserva', 'jardín', 'playa', 'laguna', 'mirador', 'río', 'finca', 'ecoturismo', 'senderismo', 'paisaje', 'bosque', 'montaña'],
            cultural: ['cultura', 'cultural', 'museo', 'arte', 'teatro', 'historia', 'exposiciones', 'eventos'],
            histórico: ['histórico', 'historia', 'ruinas', 'catedral', 'iglesia', 'antiguo', 'monumento'],
            gastronómico: ['gastronómico', 'restaurante', 'comida', 'café', 'gastronomía', 'mercado', 'culinario'],
            villa: ['villa', 'villas', 'alojamiento', 'hospedaje'],
            plaza: ['plaza', 'plazas', 'centro', 'parque central']
        };
        for (const [category, keywords] of Object.entries(categories)) {
            if (keywords.some(keyword => message.includes(keyword))) {
                return category;
            }
        }
        return null;
    }

    function generateAdditionalSiteInfo(site) {
        if (site.details) {
            return `Aquí tienes más detalles sobre ${site.name}: ${site.details}`;
        } else {
            return `Actualmente no dispongo de más información sobre ${site.name}.`;
        }
    }

    function generateSiteInfo(site) {
        conversationContext.lastResponseType = 'siteInfo';
        conversationContext.lastSite = site;
        let imageHTML = site.image ? `<img src="${site.image}" alt="${site.name}" style="max-width:100%;height:auto;"><br>` : '';
        let response = `${imageHTML}${site.name} (${site.badge}): ${site.description}<br>Calificación: ${site.rating}/5.<br>Precio: ${site.price}.<br>Disponibilidad: ${site.availability}.<br>Ubicación: <a href="${site.location}" target="_blank">Ver en mapa</a>.<br>¿Te gustaría saber más detalles o cómo llegar?`;

        const similarPlaces = placesData.filter(place => place.badge === site.badge && place.id !== site.id);
        if (similarPlaces.length > 0) {
            const similarNames = similarPlaces.map(place => place.name).join(', ');
            response += `<br><br>También te podrían interesar otros lugares similares como: ${similarNames}.`;
        }

        return response;
    }

    function generateCategoryInfo(category, queryMsg) {
        if (placesData.length === 0) {
            return `Lo siento, no puedo proporcionarte información sobre sitios de la categoría ${category} en este momento.`;
        }
        const filteredPlaces = placesData.filter(place => normalizeText(place.badge) === normalizeText(category));
        if (filteredPlaces.length === 0) {
            return `Lo siento, no se encontraron sitios para la categoría ${category}.`;
        }
        const bestOption = findBestOptionByCategory(category);
        conversationContext.lastResponseType = 'siteInfo';
        conversationContext.lastSite = bestOption;
        return generateSiteInfo(bestOption);
    }

    function containsAny(text, keywords) {
        return keywords.some(keyword => text.includes(keyword));
    }

    function findSiteMatch(message) {
        if (placesData.length === 0) return null;
        return placesData.find(place => {
            const siteName = normalizeText(place.name);
            return message.includes(siteName);
        });
    }

    function findAllSiteMatches(message) {
        return placesData.filter(place => {
            const siteName = normalizeText(place.name);
            return message.includes(siteName);
        });
    }

    function normalizeText(text) {
        return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    function findOptimalSite(query) {
        const tokens = query.split(/\s+/);
        let bestSite = null;
        let bestScore = 0;
        placesData.forEach(site => {
            let score = 0;
            tokens.forEach(token => {
                if (!token) return;
                if (normalizeText(site.name).includes(token)) score += 3;
                if (normalizeText(site.badge).includes(token)) score += 2;
                if (normalizeText(site.description).includes(token)) score += 1;
                if (site.details && normalizeText(site.details).includes(token)) score += 1;
            });
            score += site.rating;
            if (score > bestScore) {
                bestScore = score;
                bestSite = site;
            }
        });
        if (bestScore < 1) return null;
        return bestSite;
    }

    function generateResponse(message) {
        const lowercaseMsg = normalizeText(message);

        if (['si', 'sí', 'claro', 'ok', 'por supuesto'].includes(lowercaseMsg)) {
            if (conversationContext.lastResponseType === 'siteInfo' && conversationContext.lastSite) {
                conversationContext.lastResponseType = null;
                return generateAdditionalSiteInfo(conversationContext.lastSite);
            } else if (conversationContext.lastResponseType === 'recommendation' && conversationContext.lastRecommended) {
                if (conversationContext.lastRecommended.length === 1) {
                    let site = conversationContext.lastRecommended[0];
                    conversationContext.lastResponseType = 'siteInfo';
                    conversationContext.lastSite = site;
                    return generateSiteInfo(site);
                } else {
                    return '¡Perfecto! Por favor, dime el nombre del sitio sobre el que te gustaría saber más detalles.';
                }
            }
        }

        if (containsAny(lowercaseMsg, ['ayuda', 'instrucciones', 'cómo funciona', 'opciones', 'qué puedes hacer', 'información'])) {
            return 'Puedo asistirte mostrando información sobre los lugares turísticos de Pedro Brand: horarios, precios, ubicaciones, actividades, imágenes y recomendaciones. ¿Sobre qué te gustaría saber más?';
        }

        if (containsAny(lowercaseMsg, ['hola', 'buenos días', 'buenas tardes', 'buenas noches', 'saludos', 'qué tal'])) {
            return '¡Hola! ¿Cómo estás? Estoy aquí para ayudarte a explorar los mejores lugares de Pedro Brand. ¿Tienes en mente algún sitio o categoría sobre el que necesites detalles?';
        }

        if (containsAny(lowercaseMsg, ['adiós', 'hasta luego', 'chao', 'nos vemos', 'hasta pronto', 'bye'])) {
            return '¡Hasta pronto! Fue un placer ayudarte. Vuelve cuando quieras conocer más sobre los encantos de Pedro Brand.';
        }

        if (containsAny(lowercaseMsg, ['cómo llegar', 'ubicación', 'dirección', 'mapa']) && conversationContext.lastSite) {
            return `Puedes ver la ubicación de ${conversationContext.lastSite.name} en el mapa aquí: <a href="${conversationContext.lastSite.location}" target="_blank">Ver en mapa</a>`;
        }

        const sitesMentioned = findAllSiteMatches(lowercaseMsg);
        if (sitesMentioned.length >= 2 && containsAny(lowercaseMsg, ['cuál es mejor', 'comparar', 'diferencia'])) {
            const site1 = sitesMentioned[0];
            const site2 = sitesMentioned[1];
            if (site1.rating > site2.rating) {
                return `${site1.name} tiene una mejor calificación (${site1.rating}) que ${site2.name} (${site2.rating}).<br>${site1.description}`;
            } else if (site1.rating < site2.rating) {
                return `${site2.name} tiene una mejor calificación (${site2.rating}) que ${site1.name} (${site1.rating}).<br>${site2.description}`;
            } else {
                return `Ambos ${site1.name} y ${site2.name} tienen la misma calificación (${site1.rating}).`;
            }
        }

        if (sitesMentioned.length >= 2 && containsAny(lowercaseMsg, ['más barato', 'precio', 'costo'])) {
            const site1 = sitesMentioned[0];
            const site2 = sitesMentioned[1];
            const price1 = parsePrice(site1.price);
            const price2 = parsePrice(site2.price);
            if (price1 < price2) {
                return `${site1.name} es más barato (${site1.price}) que ${site2.name} (${site2.price}).<br>${site1.description}`;
            } else if (price1 > price2) {
                return `${site2.name} es más barato (${site2.price}) que ${site1.name} (${site1.price}).<br>${site2.description}`;
            } else {
                return `Ambos ${site1.name} y ${site2.name} tienen el mismo precio (${site1.price}).`;
            }
        }

        const category = getCategoryFromMessage(lowercaseMsg);
        if (category) {
            if (containsAny(lowercaseMsg, ['mejor', 'más alto', 'recomendado', 'mejor valorado'])) {
                const bestSite = findBestOptionByCategory(category);
                if (bestSite) {
                    conversationContext.lastResponseType = 'siteInfo';
                    conversationContext.lastSite = bestSite;
                    return generateSiteInfo(bestSite);
                }
            } else if (containsAny(lowercaseMsg, ['más barato', 'económico', 'barato'])) {
                const cheapestSite = findCheapestOptionByCategory(category);
                if (cheapestSite) {
                    conversationContext.lastResponseType = 'siteInfo';
                    conversationContext.lastSite = cheapestSite;
                    return generateSiteInfo(cheapestSite);
                }
            } else {
                return generateCategoryInfo(category, lowercaseMsg);
            }
        }

        const siteMatch = findSiteMatch(lowercaseMsg);
        if (siteMatch) {
            conversationContext.lastTopic = siteMatch.name;
            return generateSiteInfo(siteMatch);
        }

        let optimalSite = findOptimalSite(lowercaseMsg);
        if (optimalSite) {
            conversationContext.lastResponseType = 'siteInfo';
            conversationContext.lastSite = optimalSite;
            return generateSiteInfo(optimalSite);
        }

        return 'Lo siento, no entendí tu pregunta. ¿Podrías reformularla o especificar si deseas información sobre categorías, precios, horarios, ubicaciones, imágenes u otro aspecto?';
    }
});
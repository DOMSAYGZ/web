// Chatbot para LocalSpot - Integración con OpenAI a través de OpenRouter
document.addEventListener('DOMContentLoaded', function() {
    const chatbotContainer = document.getElementById('chatbot-container');
    const openChatbotBtn = document.getElementById('open-chatbot');
    const closeChatbotBtn = document.getElementById('close-chatbot');
    const messagesContainer = document.getElementById('chatbot-messages');
    const userInput = document.getElementById('user-input');
    const sendMessageBtn = document.getElementById('send-message');

    // Configuración del cliente de OpenAI con OpenRouter
    const openai = new OpenAI({
        baseURL: "https://openrouter.ai/api/v1",
        apiKey: "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",
        defaultHeaders: {
            "HTTP-Referer": "https://domsaygz.github.io/web/",
            "X-Title": "LocalSpot",
        },
        dangerouslyAllowBrowser: true // Permite uso en el navegador (no recomendado para producción)
    });

    // Evento para abrir el chatbot
    openChatbotBtn.addEventListener('click', () => {
        chatbotContainer.style.display = 'flex';
        if (messagesContainer.children.length <= 1) {
            addBotMessage('¡Hola! Soy el asistente virtual de LocalSpot. Estoy aquí para ayudarte a descubrir los mejores lugares turísticos de Pedro Brand. ¿Qué te gustaría saber?');
        }
    });

    // Evento para cerrar el chatbot
    closeChatbotBtn.addEventListener('click', () => {
        chatbotContainer.style.display = 'none';
    });

    // Evento para enviar mensaje con el botón
    sendMessageBtn.addEventListener('click', handleUserMessage);

    // Evento para enviar mensaje con Enter
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserMessage();
        }
    });

    // Función asíncrona para manejar el mensaje del usuario
    async function handleUserMessage() {
        const message = userInput.value.trim();
        if (message === '') return;
        addUserMessage(message);
        const botResponse = await generateResponse(message);
        addBotMessage(botResponse);
        userInput.value = '';
    }

    // Agregar mensaje del usuario al contenedor
    function addUserMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'user-message';
        messageDiv.textContent = message;
        messagesContainer.appendChild(messageDiv);
        scrollToBottom();
    }

    // Agregar mensaje del bot al contenedor
    function addBotMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'bot-message';
        messageDiv.innerHTML = message; // Usar innerHTML para permitir enlaces o formato
        messagesContainer.appendChild(messageDiv);
        scrollToBottom();
    }

    // Desplazar el contenedor de mensajes al final
    function scrollToBottom() {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Generar respuesta usando la API de OpenAI
    async function generateResponse(message) {
        try {
            const completion = await openai.chat.completions.create({
                model: "deepseek/deepseek-r1:free",
                messages: [
                    {
                        "role": "system",
                        "content": "Eres un asistente virtual para LocalSpot, especializado en los sitios turísticos de Pedro Brand, República Dominicana. Tu objetivo es ayudar a los usuarios a descubrir lugares turísticos, proporcionando información útil y recomendaciones sobre horarios, precios, ubicaciones, actividades, etc., de manera natural y conversacional."
                    },
                    {
                        "role": "user",
                        "content": message
                    }
                ],
            });

            return completion.choices[0].message.content;
        } catch (error) {
            console.error("Error al generar respuesta:", error);
            return "Lo siento, hubo un error al procesar tu solicitud. Por favor, intenta de nuevo.";
        }
    }
});

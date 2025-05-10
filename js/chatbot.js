const userInput = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');
const sendButton = document.getElementById('send-button');

const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: "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",
    dangerouslyAllowBrowser: true
});

function addUserMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', 'user-message');
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function addBotMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', 'bot-message');
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

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

async function handleUserMessage() {
    const message = userInput.value.trim();
    if (message === '') return;
    addUserMessage(message);
    const botResponse = await generateResponse(message);
    addBotMessage(botResponse);
    userInput.value = '';
}

sendButton.addEventListener('click', handleUserMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleUserMessage();
    }
});

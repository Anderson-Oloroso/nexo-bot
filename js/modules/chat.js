import { elements } from '../dom.js';
import { getApiKey } from './apiKey.js';
import { appendMessage, getConversation, showError } from './messages.js';
import { generateContent } from '../services/gemini.js';

let isSending = false;

function setSendingState(sending) {
    isSending = sending;

    elements.sendBtn.disabled = sending;
    elements.prompt.disabled = sending;

    elements.sendBtn.textContent = sending ? '...' : 'Enviar';
}

export async function sendMessage() {
    const text = elements.prompt.value.trim();

    if (!text || isSending) {
        return;
    }

    const apiKey = getApiKey();

    if (!apiKey) {
        showError('Configura tu API Key antes de enviar un mensaje.');
        return;
    }

    const model = elements.modelSelect.value;

    // Mostrar el mensaje del usuario.
    appendMessage('user', text);

    // Limpiar el campo de escritura.
    elements.prompt.value = '';
    elements.prompt.style.height = 'auto';

    setSendingState(true);

    try {
        const response = await generateContent(
            apiKey,
            model,
            getConversation()
        );

        appendMessage('model', response);

    } catch (error) {
        console.error('Error al comunicarse con Gemini:', error);

        showError(
            error.message || 'Ocurrió un error al generar la respuesta.'
        );

    } finally {
        setSendingState(false);
        elements.prompt.focus();
    }
}

export function initChat() {
    elements.composer.addEventListener('submit', event => {
        event.preventDefault();
        sendMessage();
    });

    elements.prompt.addEventListener('keydown', event => {
        if (
            event.key === 'Enter' &&
            !event.shiftKey &&
            !event.isComposing
        ) {
            event.preventDefault();
            sendMessage();
        }
    });
}

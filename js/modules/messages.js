import { elements } from '../dom.js';

let conversation = [];

export function getConversation() {
    return [...conversation];
}

export function appendMessage(role, text) {
    if (!['user', 'model'].includes(role)) {
        return;
    }

    if (typeof text !== 'string' || !text.trim()) {
        return;
    }

    conversation.push({
        role,
        parts: [{ text }]
    });

    renderMessage(role, text);
}

function renderMessage(role, text) {
    const messageElement = document.createElement('div');

    messageElement.classList.add('message', role);

    if (role === 'user') {
        messageElement.textContent = text;
    } else {
        const html = marked.parse(text);
        messageElement.innerHTML = DOMPurify.sanitize(html);
    }

    elements.messages.appendChild(messageElement);

    scrollToBottom();
}

export function clearMessages() {
    conversation = [];
    elements.messages.innerHTML = '';
}

export function scrollToBottom() {
    elements.messages.scrollTop = elements.messages.scrollHeight;
}

export function showError(text) {
    const errorElement = document.createElement('div');

    errorElement.classList.add('message', 'error');
    errorElement.textContent = text;

    elements.messages.appendChild(errorElement);

    scrollToBottom();
}
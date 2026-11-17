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

function renderMessage(role, text, isError = false) {
    const wrapper = document.createElement('div');
    wrapper.className = `message ${role}`;

    const avatar = document.createElement('div');
    avatar.className = 'avatar';
    avatar.textContent = role === 'user' ? 'Tu' : 'Nx';

    const bubble = document.createElement('div');
    bubble.className = 'bubble';

    if (isError) {
        bubble.classList.add('error');
        bubble.textContent = text;
    } else if (role === 'model') {
        bubble.innerHTML = DOMPurify.sanitize(marked.parse(text));
    } else {
        bubble.textContent = text;
    }

    wrapper.appendChild(avatar);
    wrapper.appendChild(bubble);

    elements.messages.appendChild(wrapper);
    scrollToBottom();
}

export function clearMessages() {
    conversation = [];
    elements.messages.innerHTML = '';
}

export function showError(text) {
    renderMessage('model', text, true);
}

export function scrollToBottom() {
    elements.messages.scrollTop = elements.messages.scrollHeight;
}

import { elements } from './dom.js';
import { getSavedTheme, applyTheme, toggleTheme } from './modules/theme.js';
import { getApiKey, saveApiKey } from './modules/apiKey.js';
import { clearMessages } from './modules/messages.js';
import { initChat } from './modules/chat.js';

function initTheme() {
    applyTheme(getSavedTheme(), elements.brandLogo);

    elements.themeToggle.addEventListener('click', () => {
        toggleTheme(elements.brandLogo);
    });
}

function initApiKey() {
    elements.apiKeyBtn.addEventListener('click', () => {
        elements.apiKeyInput.value = getApiKey();

        if (!elements.apiModal.open) {
            elements.apiModal.showModal();
        }
    });

    elements.closeModalBtn.addEventListener('click', () => {
        elements.apiModal.close();
    });

    elements.saveApiKeyBtn.addEventListener('click', () => {
        const apiKey = elements.apiKeyInput.value;

        if (!saveApiKey(apiKey)) {
            elements.apiKeyStatus.textContent = 'Introduce una API Key válida.';

            return;
        }

        elements.apiKeyStatus.textContent = 'API Key guardada correctamente.';
        elements.apiKeyInput.value = '';

        setTimeout(() => {
            elements.apiModal.close();
        }, 1000);
    });
}

function initHelp() {
    elements.helpBtn.addEventListener('click', () => {
        if (!elements.helpModal.open) {
            elements.helpModal.showModal();
        }
    });

    elements.closeHelpModalBtn.addEventListener('click', () => {
        elements.helpModal.close();
    });
}

function initClearChat() {
    elements.clearChatBtn.addEventListener('click', () => {
        if (confirm('¿Deseas borrar toda la conversación?')) {
            clearMessages();
        }
    });
}

function initApp() {
    initHelp();
    initTheme();
    initApiKey();
    initClearChat();
    initChat();

    console.log('Nexo-Bot inicializado correctamente.');
}

// Esperar a que el documento esté disponible.
document.addEventListener('DOMContentLoaded', initApp);

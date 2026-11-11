document.addEventListener('DOMContentLoaded', function(){
    let elements = {
        modelSelect: document.getElementById('modelSelect'),
        clearChatBtn: document.getElementById('clearChatBtn'),
        themeToggle: document.getElementById('themeToggle'),
        apiKeyBtn: document.getElementById('apiKeyBtn'),
        helpBtn: document.getElementById('helpBtn'),
        apiModal: document.getElementById('apiModal'),
        closeModalBtn: document.getElementById('closeModalBtn'),
        saveApiKeyBtn: document.getElementById('saveApiKeyBtn'),
        apiKeyInput: document.getElementById('apiKeyInput'),
        apiKeyStatus: document.getElementById('apiKeyStatus'),
        brandLogo: document.querySelector('.brand-logo'),
        messages: document.getElementById('messages'),
        composer: document.getElementById('composer'),
        prompt: document.getElementById('prompt'),
        sendBtn: document.getElementById('sendBtn')
    }

    function getApiKey(){
        return localStorage.getItem('nexo_gemini_api_key') || '';
    }

    function openModal(message, type){
        const currentKey = getApiKey();
        elements.apiKeyInput.value = currentKey;
        if(message){
            elements.apiKeyStatus.textContent = message;
            elements.apiKeyStatus.className = 'status-msg ' + (type || '');
        } else if(currentKey){
            elements.apiKeyStatus.textContent = 'Clave configurada en este navegador.';
            elements.apiKeyStatus.className = 'status-msg success';
        } else {
            elements.apiKeyStatus.textContent = 'No se ha configurado ninguna clave todavía.';
            elements.apiKeyStatus.className = 'status-msg warning';
        }
        elements.apiModal.showModal();
        elements.apiKeyInput.focus();
    }

    function closeModal(){
        elements.apiModal.close();
    }

    elements.apiKeyBtn.addEventListener('click', function(){
        openModal();
    });

    elements.helpBtn.addEventListener('click', function(){
        openModal();
    });

    elements.closeModalBtn.addEventListener('click', closeModal);

    elements.apiModal.addEventListener('click', function(e){
        if(e.target === elements.apiModal){
            closeModal();
        }
    });

    function saveKey(){
        const val = elements.apiKeyInput.value.trim();
        if(!val){
            elements.apiKeyStatus.textContent = 'Por favor, introduce una clave válida.';
            elements.apiKeyStatus.className = 'status-msg error';
            return;
        }
        localStorage.setItem('nexo_gemini_api_key', val);
        elements.apiKeyStatus.textContent = 'Clave guardada correctamente.';
        elements.apiKeyStatus.className = 'status-msg success';
        setTimeout(function(){
            closeModal();
        }, 700);
    }

    elements.saveApiKeyBtn.addEventListener('click', saveKey);

    elements.apiKeyInput.addEventListener('keydown', function(e){
        if(e.key === 'Enter'){
            e.preventDefault();
            saveKey();
        }
    });

    function setTheme(theme){
        const isLight = theme === 'light';
        document.body.dataset.theme = isLight ? 'light' : 'dark';
        elements.brandLogo.src = isLight ? './assets/nexo-day.png' : './assets/nexo-night.png';
        elements.themeToggle.textContent = isLight ? 'Noche' : 'Día';
        elements.themeToggle.setAttribute('aria-label', isLight ? 'Cambiar a modo noche' : 'Cambiar a modo día');
        elements.themeToggle.setAttribute('aria-pressed', String(isLight));
        localStorage.setItem('nexo-theme', isLight ? 'light' : 'dark');
    }

    setTheme(localStorage.getItem('nexo-theme') || 'dark');
    elements.themeToggle.addEventListener('click', function(){
        setTheme(document.body.dataset.theme === 'dark' ? 'light' : 'dark');
    });

    const DEFAULT_MODEL = 'gemini-2.5-flash';
    let conversation = [];

    elements.clearChatBtn.addEventListener('click', function(){
        const confirmDelete = confirm('¿Borrar toda la conversación?');
        if(!confirmDelete) return;
        conversation = [];
        renderMessages()
    });

    elements.prompt.addEventListener('input', function(){
        elements.prompt.style.height = 'auto';
        let newHeight = elements.prompt.scrollHeight;
        if(newHeight > 200){
            newHeight = 100
        }
        elements.prompt.style.height = `${newHeight}px`;
    })

    elements.prompt.addEventListener('keydown', function(e){
        if(e.key !== 'Enter' || e.shiftKey || e.isComposing){
            return;
        }
        e.preventDefault();
        elements.composer.requestSubmit();
    });

    elements.composer.addEventListener('submit', function(e){
        e.preventDefault();
        let text = elements.prompt.value;
        if(text){
            text = text.trim();
        }
        if(!text){
            return;
        }

        const apiKey = getApiKey();
        if(!apiKey){
            openModal('Por favor, introduce tu clave de API para poder enviar un mensaje.', 'error');
            return;
        }

        let model = elements.modelSelect.value;
        if(!model){
            model = DEFAULT_MODEL;
        }

        appendMessage('user', text, false);
        elements.prompt.value = '';
        elements.prompt.style.height = 'auto';

        setSendingState(true);

        generateContent(apiKey, model, conversation, function(error, replyText){
            if(error){
                appendMessage('model', 'Error: '+ error, true);
            }else{
                appendMessage('model', replyText, false);
            }
            setSendingState(false);
        });
    });

    function setSendingState(isSending){
        elements.sendBtn.disabled = isSending;
        elements.prompt.disabled = isSending;
    }

    function appendMessage(role, text, isError){
        conversation.push({role, parts: [{ text }]});
        renderMessages(isError ? (conversation.length-1) : null, isError);
        scrollToBottom();
    }

    function renderMessages(errorIndex, isError){
        elements.messages.innerHTML = '';
        let i = 0;
        while( i < conversation.length){
            let msg = conversation[i];

            let wrapper = document.createElement('div');
            wrapper.className = 'message ' + (msg.role === 'user' ? 'user' : 'model');

            let avatar = document.createElement('div');
            avatar.className = 'avatar';
            avatar.textContent = msg.role === 'user' ? 'Tu' : 'Nx';

            let bubble = document.createElement('div');
            bubble.className = 'bubble';
            if(isError && i === errorIndex){
                bubble.className += ' error';
            }

            let bubbleText = '';
            if(msg && msg.parts && msg.parts[0] && msg.parts[0].text){
                bubbleText = msg.parts[0].text;
            }
            if (msg.role === 'model' && !(isError && i === errorIndex)) {
                bubble.innerHTML = DOMPurify.sanitize(marked.parse(bubbleText));
            } else {
                bubble.textContent = bubbleText;
            }

            wrapper.appendChild(avatar);
            wrapper.appendChild(bubble);
            elements.messages.appendChild(wrapper);

            i++;
        }
    }

    function scrollToBottom(){
        elements.messages.scrollTop = elements.messages.scrollHeight;
    }

    function generateContent(apiKey, model, contents, callback) {
    let url = 'https://generativelanguage.googleapis.com/v1beta/models/' + encodeURIComponent(model) + ':generateContent?key=' + encodeURIComponent(apiKey);
    let payload = { contents };

    let xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          let data;
          try {
            data = JSON.parse(xhr.responseText);
          } catch (e) {
            callback('Respuesta no es JSON válido', null);
            return;
          }
          let text = '';
          if (data && data.candidates && data.candidates[0]) {
            let candidate = data.candidates[0];
            if (candidate.content && candidate.content.parts && candidate.content.parts[0]) {
              text = candidate.content.parts[0].text;
            }
          }
          if (!text) {
            text = '(sin contenido)';
          }
          callback(null, text);
        } else {
          let errorMsg = 'HTTP ' + xhr.status;
          try {
            let errJson = JSON.parse(xhr.responseText);
            if (errJson && errJson.error && errJson.error.message) {
              errorMsg = errorMsg + ': ' + errJson.error.message;
            }
          } catch (e2) {
            // ignore
          }
          callback(errorMsg, null);
        }
      }
    };
    try {
      xhr.send(JSON.stringify(payload));
    } catch (sendErr) {
      callback('No se pudo enviar la solicitud', null);
    }
  }
})
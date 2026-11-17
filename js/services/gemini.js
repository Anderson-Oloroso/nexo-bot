const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models';

export function generateContent(apiKey, model, contents) {
    return new Promise((resolve, reject) => {
        if (!apiKey || !apiKey.trim()) {
            reject(new Error('No se ha configurado la API Key.'));
            return;
        }

        if (!model || !Array.isArray(contents)) {
            reject(new Error('Los parámetros de la solicitud no son válidos.'));
            return;
        }

        const url =
            `${GEMINI_API_URL}/${encodeURIComponent(model)}:generateContent`;

        const xhr = new XMLHttpRequest();

        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('x-goog-api-key', apiKey);

        xhr.onload = () => {
            let response;

            try {
                response = JSON.parse(xhr.responseText);
            } catch {
                reject(new Error('La respuesta de Gemini no es válida.'));
                return;
            }

            if (xhr.status >= 200 && xhr.status < 300) {
                const text = response.candidates?.[0]?.content?.parts
                    ?.map(part => part.text || '')
                    .join('');

                if (!text) {
                    reject(new Error(
                        'Gemini no devolvió contenido. Puede que la respuesta haya sido bloqueada.'
                    ));
                    return;
                }

                resolve(text);
                return;
            }

            reject(new Error(
                response.error?.message ||
                `Error de Gemini (HTTP ${xhr.status}).`
            ));
        };

        xhr.onerror = () => {
            reject(new Error(
                'No fue posible conectar con Google Gemini. Comprueba tu conexión.'
            ));
        };

        xhr.ontimeout = () => {
            reject(new Error(
                'La solicitud a Gemini superó el tiempo de espera.'
            ));
        };

        xhr.timeout = 60000;

        xhr.send(JSON.stringify({ contents }));
    });
}

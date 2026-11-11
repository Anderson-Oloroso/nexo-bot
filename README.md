# Nexo Chatbot

Interfaz web moderna, ligera y responsiva para interactuar con los modelos de inteligencia artificial de **Google Gemini**, construida con tecnologías web estándar (HTML5, CSS3, JavaScript Vanilla) y soporte completo para formato Markdown, sanitización de seguridad y cambio dinámico de tema.

---

## Características

- **Integración con Google Gemini**: Soporte nativo para múltiples modelos (`gemini-2.5-flash`, `gemini-3.5-flash-lite`, `gemini-3.1-flash-lite`).
- **Seguridad y Privacidad (BYOK - Bring Your Own Key)**: La clave de API se guarda únicamente en el almacenamiento local (`localStorage`) del navegador del usuario. El código fuente está 100% libre de credenciales expuestas, listo para repositorios públicos y despliegues estáticos.
- **Asistente de Configuración Integrado**: Modal accesible con guía paso a paso para que cualquier usuario obtenga su clave gratuita desde Google AI Studio en menos de dos minutos.
- **Renderizado de Markdown y Código**: Procesamiento de respuestas con [Marked](https://marked.js.org/) y sanitización estricta contra inyecciones XSS mediante [DOMPurify](https://github.com/cure53/DOMPurify).
- **Tema Oscuro y Claro Dinámico**: Cambio de interfaz con persistencia de preferencias de usuario y adaptación de logotipos vectoriales/PNG normalizados a nivel de subpíxel.
- **Experiencia de Usuario Fluida**: Área de redacción con ajuste automático de altura, atajos de teclado (`Enter` para enviar, `Shift + Enter` para salto de línea) y desplazamiento automático inteligente.
- **Cero Dependencias de Construcción**: No requiere compiladores, empaquetadores ni Node.js para ejecutarse.

---

## Estructura del Proyecto

```text
nexo-bot/
├── assets/
│   ├── nexo-day.png      # Logotipo optimizado para tema claro (1300x310)
│   ├── nexo-night.png    # Logotipo optimizado para tema oscuro (1300x310)
│   ├── nexo-dia.png      # Alias de compatibilidad
│   ├── nexo-noche.png    # Alias de compatibilidad
│   └── nexo-icon.png     # Favicon e icono de la aplicación
├── css/
│   └── style.css         # Variables CSS, diseño responsivo y temas
├── js/
│   └── script.js         # Lógica de chat, llamadas a la API y persistencia
├── index.html            # Estructura semántica de la aplicación
├── .gitignore            # Exclusiones para control de versiones
└── README.md             # Documentación del proyecto
```

---

## Puesta en Marcha Local

Al ser una aplicación web estática pura, no necesitas instalar dependencias:

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/Anderson-Oloroso/nexo-bot.git
   cd nexo-bot
   ```

2. **Abrir la aplicación:**
   - Puedes abrir directamente el archivo `index.html` en cualquier navegador web moderno.
   - O iniciar un servidor local rápido:
     ```bash
     # Con Python
     python -m http.server 8080

     # Con Node.js / npx
     npx serve .
     ```

---

## Cómo Obtener tu API Key de Gemini

1. Ingresa a [Google AI Studio](https://aistudio.google.com/app/apikey) e inicia sesión con tu cuenta de Google.
2. Haz clic en **Create API key**.
3. Selecciona un proyecto existente o crea uno nuevo en un clic.
4. Copia la clave generada (comienza con `AIzaSy...`).
5. En Nexo Bot, haz clic en el botón **Clave** en la barra superior, pega tu clave y presiona **Guardar**.

---

## Despliegue en Netlify

El proyecto está diseñado para desplegarse de manera inmediata en **Netlify** sin configuración de compilación adicional:

1. Ve a [Netlify](https://www.netlify.com/) e inicia sesión.
2. Haz clic en **Add new site** > **Import an existing project**.
3. Conecta tu cuenta de GitHub y selecciona el repositorio `nexo-bot`.
4. Configura los parámetros básicos de despliegue:
   - **Build command**: *(dejar en blanco)*
   - **Publish directory**: `.` (o la raíz del repositorio)
5. Haz clic en **Deploy nexo-bot**. Tu sitio estará disponible en segundos con HTTPS automático.

---

## Tecnologías Utilizadas

- **HTML5**: Estructura semántica con diálogos accesibles (`<dialog>`).
- **CSS3**: Variables CSS para diseño adaptativo (Dark/Light mode) y Flexbox/Grid para maquetación responsiva.
- **JavaScript (Vanilla ES6+)**: Peticiones asíncronas vía `XMLHttpRequest` / `Fetch`, manipulación del DOM y API de `localStorage`.
- **Marked.js**: Conversión de sintaxis Markdown a HTML.
- **DOMPurify**: Sanitización de contenido para prevenir vulnerabilidades de seguridad (XSS).
- **Google Generative Language API**: Endpoint REST para modelos Gemini.

---

## Licencia

Distribuido bajo la Licencia MIT. Consulta `LICENSE` para más información.

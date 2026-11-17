# Nexo-Bot

**Nexo-Bot** es una aplicación web de chatbot moderna, ligera y modular que permite interactuar con los modelos de inteligencia artificial de **Google Gemini**. Está construida con tecnologías web estándar (HTML5, CSS3 y JavaScript Vanilla), con una arquitectura basada en módulos ES6 que facilita su mantenimiento, organización y futura expansión.

Incluye renderizado de Markdown, sanitización de contenido, configuración de API Key y cambio dinámico entre temas claro y oscuro.

---

## Características

- **Integración con Google Gemini:** comunicación con modelos de inteligencia artificial mediante la API REST de Google Generative Language.
- **Arquitectura modular:** código JavaScript organizado en módulos independientes para facilitar el mantenimiento y la escalabilidad.
- **Seguridad y privacidad (BYOK - Bring Your Own Key):** la API Key se almacena localmente en el navegador mediante `localStorage`. No se incluye ninguna credencial en el código fuente.
- **Configuración integrada:** modal de configuración para introducir y administrar la API Key, junto con una guía de ayuda para obtenerla desde Google AI Studio.
- **Renderizado de Markdown y código:** procesamiento de respuestas mediante [Marked.js](https://marked.js.org/) y sanitización del HTML generado mediante [DOMPurify](https://github.com/cure53/DOMPurify).
- **Tema oscuro y claro:** cambio dinámico de apariencia con persistencia de preferencias y adaptación del logotipo.
- **Experiencia de usuario:** área de redacción con ajuste automático de altura, atajos de teclado (`Enter` para enviar y `Shift + Enter` para salto de línea) y desplazamiento automático.
- **Sin herramientas de construcción:** no requiere compiladores, empaquetadores ni Node.js para ejecutarse en producción como aplicación frontend estática.

---

## Estructura del proyecto

```text
nexo-bot/
├── assets/
│   ├── nexo-day.png
│   ├── nexo-night.png
│   ├── nexo-dia.png
│   ├── nexo-noche.png
│   └── nexo-icon.png
│
├── css/
│   └── style.css
│
├── js/
│   ├── utils/
│   │   └── helpers.js
│   │
│   ├── modules/
│   │   ├── apiKey.js
│   │   ├── theme.js
│   │   ├── messages.js
│   │   └── chat.js
│   │
│   ├── services/
│   │   └── gemini.js
│   │
│   ├── dom.js
│   └── main.js
│
├── index.html
├── .gitignore
├── LICENSE
└── README.md
```

### Organización de JavaScript

| Archivo o directorio | Responsabilidad |
|---|---|
| `main.js` | Punto de entrada e inicialización de la aplicación. |
| `dom.js` | Referencias centralizadas a los elementos del DOM. |
| `modules/apiKey.js` | Administración de la API Key. |
| `modules/theme.js` | Gestión de los temas claro y oscuro. |
| `modules/messages.js` | Historial y renderizado de mensajes. |
| `modules/chat.js` | Lógica de conversación e interacción del usuario. |
| `services/gemini.js` | Comunicación con la API de Google Gemini. |
| `utils/helpers.js` | Funciones auxiliares reutilizables. |

---

## Tecnologías utilizadas

- **HTML5:** estructura semántica y diálogos mediante el elemento `<dialog>`.
- **CSS3:** variables CSS, Flexbox, Grid y estilos para los temas de la aplicación.
- **JavaScript Vanilla (ES6+):** módulos nativos, manipulación del DOM, eventos y solicitudes HTTP.
- **Marked.js:** conversión de Markdown a HTML.
- **DOMPurify:** sanitización del contenido HTML para reducir riesgos de ataques XSS.
- **Google Generative Language API:** integración con los modelos Gemini.
- **localStorage:** almacenamiento local de la API Key y las preferencias de tema.

---

## Requisitos

- Navegador web moderno compatible con JavaScript ES6 Modules.
- Conexión a Internet.
- API Key de Google Gemini.
- Un servidor HTTP local para ejecutar la aplicación durante el desarrollo.

**No es necesario instalar Node.js ni dependencias adicionales para ejecutar el frontend.**

---

## Puesta en marcha local

### 1. Clonar el repositorio

```bash
git clone https://github.com/Anderson-Oloroso/nexo-bot.git
cd nexo-bot
```

### 2. Iniciar un servidor local

Debido a que la aplicación utiliza módulos ES6, debe ejecutarse mediante un servidor HTTP y no directamente desde `file://`.

**Opción A: Python**

```bash
python -m http.server 8080
```

**Opción B: Visual Studio Code**

Instala la extensión Live Server, abre el proyecto y selecciona **Open with Live Server**.

### 3. Abrir la aplicación

Si utilizas Python, visita:

```text
http://localhost:8080
```

---

## Configuración de la API Key

1. Ingresa a [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Inicia sesión con tu cuenta de Google.
3. Selecciona o crea un proyecto.
4. Genera una API Key y cópiala.
5. Abre Nexo-Bot y selecciona el botón de configuración de API Key.
6. Introduce tu clave y presiona **Guardar**.

La clave se almacena en el `localStorage` del navegador.

**Importante:** este mecanismo está pensado para el uso personal y el prototipo frontend. `localStorage` no cifra las claves y estas se utilizan directamente desde el navegador. No se recomienda este enfoque para administrar claves de una aplicación pública con múltiples usuarios. La protección mediante un backend independiente está contemplada para una etapa posterior del proyecto.

---

## Despliegue en Netlify

Nexo-Bot puede desplegarse como un sitio web estático en [Netlify](https://www.netlify.com/).

1. Inicia sesión en Netlify.
2. Selecciona **Add new site** y después **Import an existing project**.
3. Conecta tu cuenta de GitHub.
4. Selecciona el repositorio `nexo-bot`.
5. Configura los parámetros:

   - **Build command:** dejar vacío.
   - **Publish directory:** `.`

6. Selecciona **Deploy site**.

Netlify publicará la aplicación y proporcionará una dirección HTTPS.

---

## Licencia

Este proyecto se distribuye bajo la licencia MIT. Consulta el archivo `LICENSE` para obtener más información.
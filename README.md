# Pituki Estudio — Sitio web

Sitio de una sola página para **Pituki Estudio**, agencia de marketing boutique en Guatemala.
CSS puro (sin frameworks), inspirado en apple.com: secciones a todo lo ancho que alternan
fondo negro / blanco / gris, tipografía grande y centrada, y micro-interacciones sutiles
(scroll reveal escalonado, hover states, feedback táctil en botones).

## Estructura

```
pituki-estudio/
├── index.html        # Marcado de la página (los logos van embebidos en base64)
├── css/
│   └── styles.css    # Sistema de diseño y animaciones
├── js/
│   └── main.js       # Scroll reveal + swap de nav según la banda de fondo
├── .gitignore
└── README.md
```

Los logos del ícono de "foco" están **embebidos como base64** dentro del HTML y del JS —
es intencional, no se mueven a archivos de imagen externos.

## Sistema de diseño

- **Colores:** negro `#000`, blanco `#fff`, gris `#f5f5f7`, terracota `#c16b2f`, cian `#00afb5`
- **Tipografías:** Hanken Grotesk (titulares), Manrope (cuerpo), JetBrains Mono (etiquetas)
- **Patrón:** cada sección (`.band`) alterna `band-black` / `band-white` / `band-gray`
  para separar visualmente los bloques.

## Ver en local

Al ser estático, basta con abrir `index.html` en el navegador. Para que las rutas
`css/` y `js/` funcionen igual que en producción, se recomienda un servidor local:

```bash
python3 -m http.server 8000
```

Luego abrir http://localhost:8000

## Deploy en Vercel

Es un sitio estático: no requiere build. Al importar el repo en Vercel, elegir
**Framework Preset: Other** y dejar los comandos de build vacíos. Cada push a `main`
despliega automáticamente.

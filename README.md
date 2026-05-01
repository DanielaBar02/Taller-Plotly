# 📍 Taller Plotly - Pines

Taller de repaso de tecnologías vistas en clase — Ingeniería de Software II

---

## ¿De qué trata este proyecto?

Es una aplicación web sencilla que muestra un mapa mundial interactivo donde puedes colocar pines haciendo clic en cualquier punto del mapa. Cada pin puede tener una etiqueta personalizada y un color a tu elección. Además, se muestra una gráfica que refleja la distribución de los pines colocados.

---

## Archivos del proyecto

```
Taller-explorer/
├── mapa_pines.html   → estructura de la página (lo que se ve)
├── mapa_pines.css    → estilos y colores de la interfaz
└── mapa_pines.js     → lógica y comportamiento del mapa
```

- **HTML** — define los elementos de la página: el mapa, la barra de herramientas, la lista de pines y la gráfica.
- **CSS** — aplica el diseño oscuro, los colores y la distribución visual.
- **JS** — maneja los clics en el mapa, crea los pines, actualiza la gráfica y permite exportar los datos.

---

## ¿Cómo ejecutarlo?

1. Descarga o clona el repositorio.
2. Abre la carpeta en **Visual Studio Code**.
3. Abre `mapa_pines.html` con la extensión **Live Server**.
4. ¡Listo! La aplicación se abre en el navegador.

> Los tres archivos deben estar en la misma carpeta para que funcionen juntos.

---

## Tecnologías usadas

| Tecnología | Para qué se usa |
|---|---|
| **Leaflet.js** | Mapa interactivo y detección de clics |
| **Plotly.js** | Gráfica de distribución de pines |
| **HTML/CSS/JS** | Estructura, estilos y lógica |

---

## Funcionalidades

- 🖱️ Clic en el mapa para colocar un pin en esa ubicación exacta
- 🏷️ Asignar una etiqueta personalizada a cada pin
- 🎨 Elegir el color de cada pin
- 🗑️ Eliminar pines individuales o limpiar el mapa completo
- 💾 Exportar todos los pines a un archivo JSON
- 📊 Gráfica en tiempo real con la posición de los pines

---

*Desarrollado como parte del Trayecto de Aprendizaje 3 — Universidad Central*

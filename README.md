# 🔮 Bouncing Glass - Simulador de Físicas 2D en Canvas

![Estado](https://img.shields.io/badge/Estado-Completado-success?style=for-the-badge)
![Licencia](https://img.shields.io/badge/Licencia-MIT-blue?style=for-the-badge)

Bouncing Glass es un simulador interactivo de físicas 2D construido completamente con tecnologías web nativas. Permite generar "pelotas de cristal" que interactúan con su entorno aplicando principios físicos como **gravedad**, **fricción** y **rebote dinámico**. Todo esto envuelto en una moderna interfaz de usuario basada en el estilo *Glassmorphism* (efecto de cristal esmerilado).

---

## 🚀 Características Principales

* **Motor de Físicas Personalizado:** Implementación de gravedad, inercia y fricción en el suelo/paredes para simular el comportamiento de pelotas reales.
* **Efectos Visuales Reactivos:** Los círculos emiten un destello blanco al colisionar con los límites del Canvas.
* **Controles en Tiempo Real:** Interfaz para ajustar la cantidad de pelotas y redimensionar el lienzo al instante mediante barras deslizantes.
* **Lanzamiento Direccional:** Selector para disparar las pelotas desde diferentes esquinas o centros del lienzo con fuerza aleatoria.
* **Diseño Glassmorphism:** Interfaz translúcida y elegante impulsada por Bootstrap 5 y CSS moderno.

---

## 🛠️ Tecnologías Usadas

Este proyecto fue desarrollado utilizando el siguiente stack tecnológico:

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap_5-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)

### 📊 Porcentaje de Uso Estimado
* 🟨 **JavaScript:** 60% (Lógica de físicas, Canvas API, Eventos del DOM)
* 🟥 **HTML:** 25% (Estructura de la aplicación, controles UI)
* 🟦 **CSS:** 15% (Efectos Glassmorphism, fondos y ajustes visuales)


---

## 👨‍💻 Autor

**Miguel Angel Cano Alejandro**
Estudiante de 6to Semestre | Instituto Tecnológico de Pachuca

---

## 📂 Estructura del Proyecto

```text
📁 animation-canvas-2d/
├── 📄 index.html        # Estructura principal e interfaz de usuario
├── 📄 README.md         # Documentación del proyecto
└── 📁 assets/
    ├── 📁 css/
    │   └── 📄 style.css # Estilos personalizados y Glassmorphism
    ├── 📁 img/
    │   ├── 🖼️ img.jpg   # Imagen de fondo local
    │   └── 🖼️ favicon.jpg # Imagen de icono del proyecto
    └── 📁 js/
        └── 📄 main.js   # Motor de físicas, clase Circle y lógica de animación

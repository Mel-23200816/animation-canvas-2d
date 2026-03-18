const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// Referencias a los controles HTML
const inputNumCircles = document.getElementById("numCircles");
const inputWidth = document.getElementById("canvasWidth");
const inputHeight = document.getElementById("canvasHeight");
const selectOrigin = document.getElementById("spawnOrigin");
const btnThrow = document.getElementById("btnThrow");

const valCircles = document.getElementById("valCircles");
const valWidth = document.getElementById("valWidth");
const valHeight = document.getElementById("valHeight");

// Variables globales
let canvas_width = parseInt(inputWidth.value);
let canvas_height = parseInt(inputHeight.value);
let arrayCircle = [];
let animationFrameId;

// Constantes físicas del mundo
const GRAVEDAD = 0.6; // Fuerza que empuja hacia abajo
const FRICCION = 0.75; // Energía que se conserva al chocar (pierde 25%)
const FRICCION_SUELO = 0.98; // Fricción al rodar por el piso

class Circle {
  constructor(x, y, radius, r, g, b, text, dx, dy) {
    this.posX = x;
    this.posY = y;
    this.radius = radius;
    this.r = r;
    this.g = g;
    this.b = b;
    this.colorSolid = `rgb(${r}, ${g}, ${b})`;
    this.colorGlass = `rgba(${r}, ${g}, ${b}, 0.5)`; 
    this.text = text;
    
    // Asignamos la velocidad inicial calculada en el lanzamiento
    this.dx = dx;
    this.dy = dy;
    
    this.bounceTimer = 0; 
  }

  draw(context) {
    context.beginPath();
    context.fillStyle = this.colorGlass;
    context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
    context.fill();

    context.lineWidth = 2;
    
    if (this.bounceTimer > 0) {
        context.strokeStyle = "white";
        context.shadowColor = "white";
        context.shadowBlur = 15; 
        this.bounceTimer--; 
    } else {
        context.strokeStyle = this.colorSolid;
        context.shadowColor = this.colorSolid;
        context.shadowBlur = 10; 
    }
    
    context.stroke();
    context.shadowBlur = 0; 

    context.fillStyle = "white"; 
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = "bold 16px Arial";
    context.fillText(this.text, this.posX, this.posY);
    context.closePath();
  }

  update(context) {
    this.draw(context);

    // 1. APLICAR GRAVEDAD
    this.dy += GRAVEDAD;

    let bounced = false;

    // Rebote inferior (suelo)
    if (this.posY + this.radius > canvas_height) {
      this.posY = canvas_height - this.radius;
      this.dy = -this.dy * FRICCION; // Invierte dirección y pierde energía
      this.dx = this.dx * FRICCION_SUELO; // Se frena un poco al rozar el suelo
      bounced = true;
    }
    // Rebote superior (techo)
    else if (this.posY - this.radius < 0) {
      this.posY = this.radius;
      this.dy = -this.dy * FRICCION;
      bounced = true;
    }

    // Rebote derecho
    if (this.posX + this.radius > canvas_width) {
      this.posX = canvas_width - this.radius;
      this.dx = -this.dx * FRICCION;
      bounced = true;
    }
    // Rebote izquierdo
    else if (this.posX - this.radius < 0) {
      this.posX = this.radius;
      this.dx = -this.dx * FRICCION;
      bounced = true;
    }

    // 2. DETENER POR COMPLETO (Si la energía es muy baja, la paramos para que no tiemble)
    if (Math.abs(this.dy) < 0.5 && this.posY + this.radius >= canvas_height - 1) {
        this.dy = 0;
    }
    if (Math.abs(this.dx) < 0.1) {
        this.dx = 0;
    }

    // Efecto visual si rebotó (solo si aún tiene velocidad considerable)
    if (bounced && Math.abs(this.dy) > 2) {
        this.bounceTimer = 5; 
    }

    this.posX += this.dx;
    this.posY += this.dy;
  }
}

// Función que calcula de dónde salen y con qué fuerza
function lanzarCirculos() {
    arrayCircle = []; // Vaciamos el lienzo para un nuevo lanzamiento
    let numCircles = parseInt(inputNumCircles.value);
    let origen = selectOrigin.value;

    for (let i = 0; i < numCircles; i++) {
        let radius = Math.floor(Math.random() * 25 + 15); // Tamaño de pelotas
        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);

        let x, y, dx, dy;

        // Calculamos la física según de dónde se lanzan
        switch(origen) {
            case "top-left":
                x = radius * 2;
                y = radius * 2;
                dx = Math.random() * 15 + 5; // Hacia la derecha
                dy = Math.random() * 5;      // Ligero hacia abajo
                break;
            case "top-right":
                x = canvas_width - (radius * 2);
                y = radius * 2;
                dx = -(Math.random() * 15 + 5); // Hacia la izquierda
                dy = Math.random() * 5;         // Ligero hacia abajo
                break;
            case "bottom-left":
                x = radius * 2;
                y = canvas_height - (radius * 2);
                dx = Math.random() * 15 + 5;   // Hacia la derecha
                dy = -(Math.random() * 25 + 10); // Fuerte hacia arriba
                break;
            case "bottom-right":
                x = canvas_width - (radius * 2);
                y = canvas_height - (radius * 2);
                dx = -(Math.random() * 15 + 5);  // Hacia la izquierda
                dy = -(Math.random() * 25 + 10); // Fuerte hacia arriba
                break;
            case "top":
                x = canvas_width / 2;
                y = radius * 2;
                dx = (Math.random() - 0.5) * 20; // Hacia ambos lados
                dy = Math.random() * 5;
                break;
            case "bottom":
                x = canvas_width / 2;
                y = canvas_height - (radius * 2);
                dx = (Math.random() - 0.5) * 20; // Hacia ambos lados
                dy = -(Math.random() * 30 + 15); // Disparo tipo fuente
                break;
        }

        arrayCircle.push(new Circle(x, y, radius, r, g, b, i + 1, dx, dy));
    }
}

/* // --- TUS CÍRCULOS DE PRUEBA ORIGINALES COMENTADOS ---
// Primero calculamos el radio
let randomRadiusTest = Math.floor(Math.random() * 100 + 30);

// Luego calculamos X e Y asegurando que el centro esté al menos a una distancia "randomRadius" de cualquier borde
let randomXTest = Math.random() * (canvas_width - randomRadiusTest * 2) + randomRadiusTest;
let randomYTest = Math.random() * (canvas_height - randomRadiusTest * 2) + randomRadiusTest;

// Círculo Azul (r:0, g:0, b:255)
// El constructor ahora recibe dx y dy al final, en vez de 'speed'
let miCirculo = new Circle(randomXTest, randomYTest, randomRadiusTest, 0, 0, 255, "Tec1", 5, 5);

// Círculo Rojo (r:255, g:0, b:0)
let miCirculo2 = new Circle(randomXTest, randomYTest, randomRadiusTest, 255, 0, 0, "Tec2", 2, 2);
*/

let updateCircle = function () {
  animationFrameId = requestAnimationFrame(updateCircle);
  ctx.clearRect(0, 0, canvas_width, canvas_height);
  
  /* // --- ACTUALIZACIÓN DE TUS CÍRCULOS ORIGINALES COMENTADOS ---
  // miCirculo.update(ctx);
  // miCirculo2.update(ctx); 
  */

  for (let i = 0; i < arrayCircle.length; i++) {
    arrayCircle[i].update(ctx);
  }
};

/* --- EVENT LISTENERS --- */

// Actualizar textos de los sliders sin disparar (espera al botón de Lanzar)
inputNumCircles.addEventListener('input', (e) => valCircles.textContent = e.target.value);

// Redimensionar canvas en tiempo real
inputWidth.addEventListener('input', (e) => {
    canvas_width = parseInt(e.target.value);
    valWidth.textContent = canvas_width;
    canvas.width = canvas_width; 
});
inputHeight.addEventListener('input', (e) => {
    canvas_height = parseInt(e.target.value);
    valHeight.textContent = canvas_height;
    canvas.height = canvas_height; 
});

// Botón Lanzar
btnThrow.addEventListener('click', lanzarCirculos);

// Iniciar aplicación
window.onload = () => {
    canvas.width = canvas_width;
    canvas.height = canvas_height;
    lanzarCirculos(); // Lanzamiento inicial automático
    updateCircle();
};
const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// Referencias a los controles HTML y a los textos (spans)
const inputNumCircles = document.getElementById("numCircles");
const inputWidth = document.getElementById("canvasWidth");
const inputHeight = document.getElementById("canvasHeight");

const valCircles = document.getElementById("valCircles");
const valWidth = document.getElementById("valWidth");
const valHeight = document.getElementById("valHeight");

// Variables globales
let canvas_width = parseInt(inputWidth.value);
let canvas_height = parseInt(inputHeight.value);
let arrayCircle = [];
let animationFrameId;

class Circle {
  constructor(x, y, radius, r, g, b, text, speed) {
    this.posX = x;
    this.posY = y;
    this.radius = radius;
    this.r = r;
    this.g = g;
    this.b = b;
    this.colorSolid = `rgb(${r}, ${g}, ${b})`;
    this.colorGlass = `rgba(${r}, ${g}, ${b}, 0.3)`; 
    this.text = text;
    this.speed = speed;
    this.dx = 1 * this.speed;
    this.dy = 1 * this.speed;
    
    // Temporizador para el efecto visual de rebote
    this.bounceTimer = 0; 
  }

  draw(context) {
    context.beginPath();
    context.fillStyle = this.colorGlass;
    context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
    context.fill();

    context.lineWidth = 2;
    
    // Si acaba de rebotar, aplicamos el efecto visual (brillo blanco intenso)
    if (this.bounceTimer > 0) {
        context.strokeStyle = "white";
        context.shadowColor = "white";
        context.shadowBlur = 20; 
        this.bounceTimer--; // Reducimos el temporizador en cada fotograma
    } else {
        // Estado normal (Glassmorphism)
        context.strokeStyle = this.colorSolid;
        context.shadowColor = this.colorSolid;
        context.shadowBlur = 10; 
    }
    
    context.stroke();
    context.shadowBlur = 0; // Resetear para el texto

    context.fillStyle = "white"; 
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = "bold 20px Arial";
    context.fillText(this.text, this.posX, this.posY);
    context.closePath();
  }

  update(context) {
    this.draw(context);

    let bounced = false; // Bandera para saber si chocó en este fotograma

    // Rebote dinámico con los bordes
    if (this.posX + this.radius > canvas_width) {
      this.dx = -Math.abs(this.dx); 
      this.posX = canvas_width - this.radius;
      bounced = true;
    }
    if (this.posX - this.radius < 0) {
      this.dx = Math.abs(this.dx); 
      this.posX = this.radius;
      bounced = true;
    }
    if (this.posY + this.radius > canvas_height) {
      this.dy = -Math.abs(this.dy); 
      this.posY = canvas_height - this.radius;
      bounced = true;
    }
    if (this.posY - this.radius < 0) {
      this.dy = Math.abs(this.dy); 
      this.posY = this.radius;
      bounced = true;
    }

    // --- EFECTO DE REBOTE ALEATORIO ---
    if (bounced) {
        this.bounceTimer = 15; // El destello blanco durará 15 fotogramas
        
        // Multiplicador aleatorio entre 0.8 y 1.2 para alterar la velocidad
        let randomFactor = (Math.random() * 0.4) + 0.8;
        
        let newDx = this.dx * randomFactor;
        let newDy = this.dy * randomFactor;
        
        // Aplicamos la nueva velocidad aleatoria solo si no se vuelve demasiado rápido ni se detiene por completo
        if (Math.abs(newDx) > 1 && Math.abs(newDx) < 12) this.dx = newDx;
        if (Math.abs(newDy) > 1 && Math.abs(newDy) < 12) this.dy = newDy;
    }

    this.posX += this.dx;
    this.posY += this.dy;
  }
}

function crearCirculoAleatorio(indice) {
    let randomRadius = Math.floor(Math.random() * 50 + 30); 
    let randomX = Math.random() * (canvas_width - randomRadius * 2) + randomRadius;
    let randomY = Math.random() * (canvas_height - randomRadius * 2) + randomRadius;
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    let randomVel = (Math.random() * 3) + 1; 

    return new Circle(randomX, randomY, randomRadius, r, g, b, indice, randomVel);
}

function init() {
  canvas.width = canvas_width;
  canvas.height = canvas_height;
  
  let numCircles = parseInt(inputNumCircles.value);
  for (let i = 0; i < numCircles; i++) {
    arrayCircle.push(crearCirculoAleatorio(i + 1));
  }
  
  updateCircle();
}

/* // --- TUS CÍRCULOS DE PRUEBA ORIGINALES COMENTADOS ---
// Primero calculamos el radio
let randomRadiusTest = Math.floor(Math.random() * 100 + 30);

// Luego calculamos X e Y asegurando que el centro esté al menos a una distancia "randomRadius" de cualquier borde
let randomXTest = Math.random() * (canvas_width - randomRadiusTest * 2) + randomRadiusTest;
let randomYTest = Math.random() * (canvas_height - randomRadiusTest * 2) + randomRadiusTest;

// Círculo Azul (r:0, g:0, b:255)
let miCirculo = new Circle(randomXTest, randomYTest, randomRadiusTest, 0, 0, 255, "Tec1", 5);
// miCirculo.draw(ctx);

// Círculo Rojo (r:255, g:0, b:0)
let miCirculo2 = new Circle(randomXTest, randomYTest, randomRadiusTest, 255, 0, 0, "Tec2", 2);
// miCirculo2.draw(ctx);
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

/* --- EVENT LISTENERS PARA LAS BARRAS (SLIDERS) --- */

inputNumCircles.addEventListener('input', (e) => {
    let nuevoNumero = parseInt(e.target.value);
    valCircles.textContent = nuevoNumero; 

    if (nuevoNumero > arrayCircle.length) {
        let faltantes = nuevoNumero - arrayCircle.length;
        for(let i = 0; i < faltantes; i++) {
            arrayCircle.push(crearCirculoAleatorio(arrayCircle.length + 1));
        }
    } 
    else if (nuevoNumero < arrayCircle.length) {
        arrayCircle.length = nuevoNumero; 
    }
});

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

window.onload = init;
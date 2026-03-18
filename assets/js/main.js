const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

//Obtiene las dimensiones de la pantalla actual
const window_height = window.innerHeight * 0.5;
const window_width = window.innerWidth * 0.5;

//El canvas tiene las mismas dimensiones que la pantalla
canvas.height = window_height;
canvas.width = window_width;

canvas.style.background = "#ff8";

class Circle {
  constructor(x, y, radius, color, text, speed) {
    this.posX = x;
    this.posY = y;
    this.radius = radius;
    this.color = color;
    this.text = text;

    this.speed = speed;

    this.dx = 1 * this.speed;
    this.dy = 1 * this.speed;
  }

  draw(context) {
    context.beginPath();

    context.strokeStyle = this.color;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = "20px Arial";
    context.fillText(this.text, this.posX, this.posY);

    context.lineWidth = 2;
    context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
    context.stroke();
    context.closePath();
  }

  update(context) {
    //context.clearRect(0, 0, window_width, window_height);

    this.draw(context);

    //Si el círculo supera el margen derecho entonces se mueve a la izquierda
    if (this.posX + this.radius > window_width) {
      this.dx = -this.dx;
      this.posX = window_width - this.radius; // Corrección para que no se quede pegado
    }

    //Si el círculo supera el margen izquierdo entonces se mueve a la derecha
    if (this.posX - this.radius < 0) {
      this.dx = -this.dx;
      this.posX = this.radius; // Corrección para que no se quede pegado
    }

    //Si el círculo supera el margen superior entonces se mueve hacia abajo
    if (this.posY - this.radius < 0) {
      this.dy = -this.dy;
      this.posY = this.radius; // Corrección para que no se quede pegado
    }

    //Si el círculo supera el margen inferior entonces se mueve hacia arriba
    if (this.posY + this.radius > window_height) {
      this.dy = -this.dy;
      this.posY = window_height - this.radius; // Corrección para que no se quede pegado
    }

    this.posX += this.dx;
    this.posY += this.dy;
  }
}

/* let arrayCircle=[];

for(let i=0; i<10;i++){

    let randomRadius = Math.floor(Math.random()*100 + 30);
    // Coordenadas corregidas para que nazcan dentro del canvas
    let randomX = Math.random() * (window_width - randomRadius * 2) + randomRadius;
    let randomY = Math.random() * (window_height - randomRadius * 2) + randomRadius;

    // Se añadió un valor de velocidad (ej. 2) al final para coincidir con el constructor
    let miCirculo = new Circle(randomX, randomY, randomRadius, 'blue', i+1, 2);

    //Agrega el objeto al array
    arrayCircle.push(miCirculo);
    arrayCircle[i].draw(ctx);
} */

// Primero calculamos el radio
let randomRadius = Math.floor(Math.random() * 100 + 30);

// Luego calculamos X e Y asegurando que el centro esté al menos a una distancia "randomRadius" de cualquier borde
let randomX = Math.random() * (window_width - randomRadius * 2) + randomRadius;
let randomY = Math.random() * (window_height - randomRadius * 2) + randomRadius;

let miCirculo = new Circle(randomX, randomY, randomRadius, "blue", "Tec1", 5);
miCirculo.draw(ctx);

let miCirculo2 = new Circle(randomX, randomY, randomRadius, "red", "Tec2", 2);
miCirculo2.draw(ctx);

let updateCircle = function () {
  requestAnimationFrame(updateCircle);
  ctx.clearRect(0, 0, window_width, window_height);
  miCirculo.update(ctx);
  miCirculo2.update(ctx);
};

updateCircle();
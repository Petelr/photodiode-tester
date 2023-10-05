var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");

// c.fillStyle = "red";
// c.fillRect(100,100,100,100)

// //line
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.strokeStyle = "blue";
// c.stroke();

function Circle(x, y, dx, dy, radius){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        c.strokeStyle = 'red';
        c.stroke();
    }

    this.update = function() {
        
    
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0){
            this.dx = -this.dx;
        }
    
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0){
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
}

var circle = new Circle(200, 200, 3, 3, 30);
var x = Math.random() * innerWidth;
var y = Math.random() * innerHeight;
var dx = 4;
var dy = 4;
var radius = 30;
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    
    circle.update();
}

animate();
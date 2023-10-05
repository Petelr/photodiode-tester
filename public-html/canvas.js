var canvas = document.querySelector('canvas');
var rectWidth = 100;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}  

function drawRect(width, brightness){

    c.fillStyle = `rgb(${brightness}, ${brightness}, ${brightness})`;
    var startX = innerWidth / 2 - width / 2;
    
    c.fillRect(startX, 0, width, innerHeight);
}

// drawRect(130,255);

function genLightProfile(waitFrames, totalLength) {
    var profile = [];
    var increment = 5*totalLength/255;
    var brightness = 255;
    for (var i = 0; i<totalLength; i++){
        if (brightness <= 0) {
            break;
        }
        if (i < waitFrames){
            profile.push(255);
        }
        else{
            profile.push(brightness);
            brightness = brightness - increment + getRandomInt(-25, 25);
        }
    }
    profile[profile.length - 1] = 0;
    return profile;
}

const profile = genLightProfile(3,150);

var frameCount = profile.length;

let animationID;

function animate() {
    animationID = requestAnimationFrame(animate);
    drawRect(rectWidth, profile[profile.length - frameCount]);
    // console.log(profile[frameCount]);
    frameCount--;
    if (frameCount <= 0) {
        cancelAnimationFrame(animationID);
        c.clearRect(0, 0, innerWidth, innerHeight);
        frameCount = profile.length;
    }
    
}

let setupAnimateID;
function setupAnimate() {
    setupAnimateID = requestAnimationFrame(setupAnimate);
    
    c.clearRect(0, 0, innerWidth, innerHeight);
    drawRect(rectWidth, 255);
    if (!isDrawing){
        c.clearRect(0, 0, innerWidth, innerHeight);
        cancelAnimationFrame(setupAnimateID);
    }
    
}

// animate();

window.addEventListener('keydown', function() {
    console.log(profile.length);
    animate();
})

// window.addEventListener('touchend', function() {
//     animate();
// })
var isDrawing = false;
let clickX = innerWidth / 2;
window.addEventListener('mousedown', function (event){
    isDrawing = true;
    console.log(isDrawing);
    clickX = event.clientX;
    
})

let adjustingAnimationID;
window.addEventListener('mousemove', function (event) {

       
    // console.log(rectWidth);
    if (isDrawing){
        rectWidth = Math.floor((rectWidth + Math.abs(clickX - event.clientX)) * 0.5);
        setupAnimate();
        
    }
})

window.addEventListener('mouseup', function (){
    isDrawing = false;
    
    c.clearRect(0, 0, innerWidth, innerHeight);
    console.log(isDrawing);
})
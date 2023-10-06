// TODO
// 1. add width percentage number when changing width
// 2. find a way to change background brightness



// Setting up the canvas
var canvas = document.querySelector('canvas');
var rectWidth = 100;
var c = canvas.getContext("2d");

// change canvas size to match the window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Use this function to generate a random int between the given range.
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}  

// draw a rectangular with given width and brightness level
// Brightness level go from 0 to 255
function drawRect(width, brightness){
    c.fillStyle = `rgb(${brightness}, ${brightness}, ${brightness})`;
    var startX = innerWidth / 2 - width / 2;
    c.fillRect(startX, 0, width, innerHeight);
}

// In order to emulating the flashing effect of lightnings,
// use this function to generate an array of brightness values.
function genLightProfile(waitFrames, totalLength) {
    var profile = [];
    var increment = 5*totalLength/255;
    var brightness = 255;
    for (var i = 0; i<totalLength; i++){
        if (brightness <= 0) {
            // avoid to add negative brightness values into the array
            break;
        }
        if (i < waitFrames){
            // make the first few frames stay at max brightness
            profile.push(255);
        }
        else{
            profile.push(brightness);
            // randomize brightness value to mimic flickering effect
            brightness = brightness - increment + getRandomInt(-25, 25);
        }
    }
    // make sure the brightness of the last frame is 0
    // so that each flashing sequence ends with a dark rectangle
    profile[profile.length - 1] = 0;
    return profile;
}

const profile = genLightProfile(3,150);
var frameCount = profile.length;
let animationID;

// animate the flashes,
// and stop the flashes when the sequence is ended.
function animate() {
    animationID = requestAnimationFrame(animate);
    drawRect(rectWidth, profile[profile.length - frameCount]);
    frameCount--;
    if (frameCount <= 0) {
        cancelAnimationFrame(animationID);
        c.clearRect(0, 0, innerWidth, innerHeight);
        frameCount = profile.length;
    }
    
}

// animate the setup,
// visualize the width of the rectangle during customization
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

// animate the flashes when any key is pressed down
window.addEventListener('keydown', function() {
    animate();
})

// event listener for touchscreen devices
// window.addEventListener('touchend', function() {
//     animate();
// })

var isDrawing = false;
let clickX = innerWidth / 2;

// change the width of the rectangle when mouse is clicked down
window.addEventListener('mousedown', function (event){
    isDrawing = true;
    // console.log(isDrawing);
    clickX = event.clientX; 
})

// animate the varying-width rectangle when customizing the width
window.addEventListener('mousemove', function (event) {
    if (isDrawing){
        rectWidth = Math.floor((rectWidth + Math.abs(clickX - event.clientX)) * 0.5);
        setupAnimate();
    }
})

window.addEventListener('mouseup', function (){
    isDrawing = false;
    c.clearRect(0, 0, innerWidth, innerHeight);
    // console.log(isDrawing);
})
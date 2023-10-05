var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");

class Point{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}  

class LightningPath{
    constructor({ startPoint, pathIncrement, branchAngle, pathLength, branchLen, isBranch }){
        this.startPoint = startPoint;
        this.pathIncrement = pathIncrement;
        this.branchAngle = branchAngle; // set to zero when not in a branch.
        this.pathLength = pathLength;
        this.branchLen = branchLen; //ignored when not in branch.
        this.isBranch = isBranch;
        this.paths = []; 
    }

    generate (){
        // branch length should be shorter than main path
        if (this.isBranch) {
            this.pathLength = this.branchLen;
        }
        
        var currentPath = [];
        var lastPnt = this.startPoint;

        var currentPnt = this.startPoint;

        for (var i=1; i<this.pathLength+1; i++){
            
            // adding randomness to points generation 
            var randomX = this.pathIncrement * Math.sin(this.branchAngle) + 
                getRandomInt(-this.pathIncrement, this.pathIncrement);
            var randomY = this.pathIncrement * Math.cos(this.branchAngle) + 
                getRandomInt(-this.pathIncrement, this.pathIncrement);

            currentPnt = new Point(lastPnt.x + randomX, lastPnt.y + randomY);
            currentPath.push(currentPnt);
            lastPnt = currentPnt;

            // if (i > this.pathLength) {break;} //make sure no branch is longer than the canvas height.

            if (getRandomInt(0, 100) < 1) {
                console.log('Branching!');
                const branchConfig = {
                    startPoint: lastPnt,
                    pathIncrement: 10,
                    branchAngle: getRandomInt(-30,30)/180,
                    pathLength: innerHeight/increment,
                    branchLen: 10,
                    isBranch: true
                };
                var newBranch = new LightningPath(branchConfig);
                this.paths = this.paths.concat(newBranch.paths);
            }
        }
        console.log(newBranch.paths);
        console.log(currentPath);
        this.paths = this.paths.push(currentPath);
        console.log(this.paths);
    }
}

// function generateLightningPath (startPnt, dy, angle, length, branchLen, isBranch) {
    
//     var _length = length;
//     if (isBranch) {
//         _length = branchLen;
//     }
    
//     var currentPath = [];
//     var lightningPaths = []
//     var _startPnt = startPnt;
//     var lastPnt = _startPnt;
//     var currentPoint = _startPnt;
  
//     for (var i=1; i<_length+1; i++){
//         currentPath.push(lastPnt);
//         var randomX = dy * Math.sin(angle) + (Math.random() - 0.5) * 2 * dy;
//         var randomY = dy * Math.cos(angle) + (Math.random() - 0.5) * 2 * dy;
//         var currentPoint = new Point(lastPnt.x + randomX, lastPnt.y + randomY);
//         lastPnt = currentPoint;
//         if (i > length) {break;}

//         if (getRandomInt(0, 100) < 3) {
//             // generate branches with 3% chances.
//             console.log("YAAAAS ");
//             lightningPaths = lightningPaths.concat(
//                 generateLightningPath(
//                     lastPnt,
//                     dy,
//                     getRandomInt(-30,30)/180, // convert angle to radian
//                     (innerHeight-lastPnt.y)/dy, // stop drawing when it reaches the buttom of the frame.
//                     10 + getRandomInt(0, 10),
//                     true
//                 )
//             );
//         }
//     }
//     lightningPaths.push(currentPath);

//     return lightningPaths;
// }

var startPoint = new Point(innerWidth/2, 0);
var endPoint = new Point(innerWidth/2, 100);
var increment = 10;

const pathConfig = {
    startPoint: startPoint,
    pathIncrement: 10,
    branchAngle: 0,
    pathLength: innerHeight/increment,
    branchLen: 10,
    isBranch: false
};

var b = new LightningPath(pathConfig);
b.generate();
var a = b.paths;
c.beginPath();
for (var j = 0; j < a.length; j++) {
    tmp = a[j];
    for (var i = 0; i < tmp.length-1; i++) {
        
        c.moveTo(tmp[i].x, tmp[i].y);
        c.lineTo(tmp[i+1].x, tmp[i+1].y);
        c.strokeStyle = "#ffffff";
        c.stroke();

    }
}

// function animate() {
//     requestAnimationFrame(animate);
//     c.clearRect(0, 0, innerWidth, innerHeight);
// }

// animate();
// html elements
var canvas;
var canvasContext;

//dimensions

var width = 600;
var height = 400;
var roadArea;
var roadWidth;
var roadBorderWidth=5;
var grassWidth=20;
const Frames_Per_Second = 30;
var carY = 0;
var red1 = false;
var red2 = false;
var red3 = false;
var interval;

$('#gameCanvas')[0].width = width;
$('#gameCanvas')[0].height = height;

window.onload = function () {
    startGame();
}

function startGame(){
    setupCanvas();
    interval = setInterval(function () {
        moveCars();
    }, 1000 / Frames_Per_Second);
    canvas.addEventListener('mousedown', function (e) {
        drawRedCar(e);
    });
}

function restartGame() {
    window.location.reload();
}

function setupCanvas() {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    roadArea = canvas.width - (grassWidth*2);
    roadWidth = (roadArea - grassWidth) / 3;
    drawBackground();
    drawBlueCars();
}

function moveCars() {
    drawBackground();
    blueCar1.move(2);
    blueCar2.move(1.5);
    blueCar3.move(1.0);
    if (red1 == true) {
        redCar1.move(-1);
        if ((blueCar1.y + 40) > redCar1.y) {
            clearInterval(interval);
            $('#gameoverModal').modal('show'); 
        }
    }
    if (red2 == true) {
        redCar2.move(-1);
        if ((blueCar2.y + 40) > redCar2.y) {
            clearInterval(interval);
            $('#gameoverModal').modal('show'); 
        }
    }
    if (red3 == true) {
        redCar3.move(-1);
        if ((blueCar3.y + 40) > redCar3.y) {
            clearInterval(interval);
            $('#gameoverModal').modal('show'); 
        }
    }
}



function drawBackground() {
    clear();
    colorRect(0, 0, canvas.width, canvas.height, '#72A521'); //draw grass
    colorRect(grassWidth, 0, roadArea, canvas.height, 'black'); //draw tar
    //draw roads
    colorRect(grassWidth, 0, roadBorderWidth, canvas.height, 'gold');
    colorRect(grassWidth + roadWidth + roadBorderWidth, 0, roadBorderWidth, canvas.height, 'gold');
    colorRect(grassWidth + ((roadWidth + roadBorderWidth) * 2), 0, roadBorderWidth, canvas.height, 'gold');
    colorRect(roadArea + (roadBorderWidth*3), 0, roadBorderWidth, canvas.height, 'gold');
    for (var i = 10; i < canvas.height; i += 40) {
        colorRect((roadWidth / 2) + grassWidth + roadBorderWidth, i, 3, 20, 'white');
        colorRect((roadWidth / 2) + roadWidth + grassWidth + (roadBorderWidth * 2), i, 3, 20, 'white');
        colorRect((roadWidth / 2) + (roadWidth * 2) + grassWidth + (roadBorderWidth * 3), i, 3, 20, 'white');
    }
}

function drawBlueCars() {
    blueCar1 = new component(40, 40, "blue", 95, carY);
    blueCar2 = new component(40, 40, "blue", 100 + roadWidth, carY);
    blueCar3 = new component(40, 40, "blue", 105 + (roadWidth * 2), carY);
}

function drawRedCar(e) {
    var element = canvas;
    var offsetX = 0,
        offsetY = 0

    if (element.offsetParent) {
        do {
            offsetX += element.offsetLeft;
            offsetY += element.offsetTop;
        } while ((element = element.offsetParent));
    }

    x = e.pageX - offsetX;
    y = e.pageY - offsetY;

    if (x > 25 && x <= 25 + 180) {
        redCar1 = new component(40, 40, "red", 95, canvas.height - 40);
        redCar1.move(-1);
        red1 = true;
        console.log(x + " onee");
    }
    else if (x > 30 + 180 && x <= 30 + 180 + 180) {
        redCar2 = new component(40, 40, "red", 100 + roadWidth, canvas.height - 40);
        redCar2.move(-1);
        red2 = true;
        console.log(x + " twoo");
    }
    else if (x > 35 + 180 + 180 && x <= 35 + 180 + 180 + 180) {
        redCar3 = new component(40, 40, "red", 105 + (roadWidth * 2), canvas.height - 40);
        redCar3.move(-1);
        red3 = true;
        console.log(x + " threee");
    }
}

function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
    canvasContext.fillStyle = fillColor; // sets fill color of rectangle
    canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight); // draw a filled rectangle
}

function clear() {
    canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

class component {
    constructor(width, height, color, x, y) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.move = function (speed) {
            this.y += speed;
            if (this.y > canvas.height) {
                this.y = 0;
            }
            canvasContext.fillStyle = color;
            canvasContext.fillRect(this.x, this.y, this.width, this.height);
        };
    }
}
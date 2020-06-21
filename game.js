// ---------------MAIN GAME LOGIC--------------
// --------------By Rohith Adithya-------------


// html elements
var canvas;
var canvasContext;

//dimensions

var width = 600;
var height = 400;
var grassWidth = width / 30;
var roadArea = width - (grassWidth * 2);
var roadWidth = (roadArea - grassWidth) / 3;//180
var roadBorderWidth = width / 120;//5
var roadStart1 = grassWidth + roadBorderWidth;
var roadStart2 = grassWidth + (roadBorderWidth * 2);
var roadStart3 = grassWidth + (roadBorderWidth * 3);
var carWidth = width / 15;//40
var carHeight = height / 10;
var Frames_Per_Second = 30;
var blueCarOriginY = 0;
var redCarOriginY = height - carHeight;
var car1OriginX = grassWidth + roadBorderWidth + (roadWidth / 2) - (carWidth / 2);
var car2OriginX = grassWidth + (roadBorderWidth * 2) + ((roadWidth / 2) * 3) - (carWidth / 2);
var car3OriginX = grassWidth + (roadBorderWidth * 3) + ((roadWidth / 2) * 5) - (carWidth / 2);
var red1 = false;
var red2 = false;
var red3 = false;
var interval;

//set canvas size
$('#gameCanvas')[0].width = width;
$('#gameCanvas')[0].height = height;


//start the game after canvas loads
window.onload = function () {
    startGame();
}

function startGame() {
    //first set the canvas up
    setupCanvas();
    //move cars as per fps
    interval = setInterval(function () {
        moveCars();
    }, 1000 / Frames_Per_Second);
    //listen for mouse clicks to insert red cars
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
    // draw the background and insert three blue cars from top
    drawBackground();
    drawBlueCars();
}

function drawBackground() {
    clear();
    colorRect(0, 0, width, height, '#72A521'); //draw grass
    colorRect(grassWidth, 0, roadArea, height, 'black'); //draw tar
    //draw roads
    colorRect(grassWidth, 0, roadBorderWidth, height, 'gold');
    colorRect(grassWidth + roadWidth + roadBorderWidth, 0, roadBorderWidth, height, 'gold');
    colorRect(grassWidth + ((roadWidth + roadBorderWidth) * 2), 0, roadBorderWidth, height, 'gold');
    colorRect(roadArea + (roadBorderWidth * 3), 0, roadBorderWidth, height, 'gold');
    for (var i = 10; i < height; i += carHeight) {
        colorRect((roadWidth / 2) + grassWidth + roadBorderWidth, i, 3, grassWidth, 'white');
        colorRect((roadWidth / 2) + roadWidth + grassWidth + (roadBorderWidth * 2), i, 3, grassWidth, 'white');
        colorRect((roadWidth / 2) + (roadWidth * 2) + grassWidth + (roadBorderWidth * 3), i, 3, grassWidth, 'white');
    }
}

function drawBlueCars() {
    blueCar1 = new component(carWidth, carHeight, "blue", car1OriginX, blueCarOriginY);
    blueCar2 = new component(carWidth, carHeight, "blue", car2OriginX, blueCarOriginY);
    blueCar3 = new component(carWidth, carHeight, "blue", car3OriginX, blueCarOriginY);
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

    //check if mouse click was in road 1, then insert a new red car
    if (x > roadStart1 && x <= roadStart1 + roadWidth) {
        redCar1 = new component(carWidth, carHeight, "red", car1OriginX, redCarOriginY);
        redCar1.move(-1);
        red1 = true;
    }
    //check if mouse click was in road 2, then insert a new red car
    else if (x > roadStart2 + roadWidth && x <= roadStart2 + (roadWidth * 2)) {
        redCar2 = new component(carWidth, carHeight, "red", car2OriginX, redCarOriginY);
        redCar2.move(-1);
        red2 = true;
    }
    //check if mouse click was in road 3, then insert a new red car
    else if (x > roadStart3 + (roadWidth * 2) && x <= roadStart3 + (roadWidth * 3)) {
        redCar3 = new component(carWidth, carHeight, "red", car3OriginX, redCarOriginY);
        redCar3.move(-1);
        red3 = true;
    }
}



function moveCars() {
    drawBackground();
    // update blue cars position
    blueCar1.move(2);
    blueCar2.move(1.5);
    blueCar3.move(1.0);
    //move red cars if they exist
    if (red1 == true) {
        redCar1.move(-1);
        //check for colision
        if ((blueCar1.y + carHeight) > redCar1.y) {
            clearInterval(interval);
            $('#gameoverModal').modal('show');
        }
    }
    if (red2 == true) {
        redCar2.move(-1);
        //check for colision
        if ((blueCar2.y + carHeight) > redCar2.y) {
            clearInterval(interval);
            $('#gameoverModal').modal('show');
        }
    }
    if (red3 == true) {
        redCar3.move(-1);
        //check for colision
        if ((blueCar3.y + carHeight) > redCar3.y) {
            clearInterval(interval);
            $('#gameoverModal').modal('show');
        }
    }
}

 // draw a filled rectangle
function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

 // clear everything on the canvas
function clear() {
    canvasContext.clearRect(0, 0, width, height);
}

//class to create car objects
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
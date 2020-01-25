class point {
    constructor(x, y, radius, id){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.id = id;

        //random velocities from -1 to 1
        this.velx = Math.random()*2 -1;
        this.vely = Math.random()*2 -1;

        this.connects = {}
    }
}

var points = []
var canvas;

var speed = 0.5;

//game world size
var height = 600;
var width = 800;

var connectDist = 100;

var mouseX = 0;
var mouseY = 0;

var mousePercentX = 0;
var mousePercentY = 0.1;

var mouseDown = false;

var pointGridHeight = Math.ceil(height/connectDist);
var pointGridWidth = Math.ceil(width/connectDist);
var pointGrid = Create2dArray(pointGridHeight, pointGridWidth);

const showPoints = false;
const pointsAmount = 120;

const maxSpeed = 3;
const speedAccel = 0.002;

$(document).ready(function() {
    startFlame();
});

function startFlame(){

    let id = 0;

    for(i = 0;i<pointsAmount;i++){

        let circ = new point(Math.random()*width,Math.random()*height,10,id);
        points.push(circ);
        id += 1;
    }

    renderArea.start();
    canvas = $("#wireflame")
} 

function Create2dArray(rows, cols){

    let arr = new Array(rows);

    for(i = 0;i<rows;i++){
        arr[i] = new Array(cols);
    }

    return arr;
}


function distBetweenPoints(x1,y1,x2,y2){
    return Math.sqrt( Math.pow(x1-x2,2) + Math.pow(y1-y2,2) );
}

function inBounds(x,y,boundx,boundy){
    if( x<0 || x>boundx ){
        return false;
    }
    if( y<0 || y>boundy ){
        return false;
    }
    return true;
}

function clearPointGrid(){
    for(i = 0;i<pointGridHeight;i++){
        for(j = 0;j<pointGridWidth;j++){
            pointGrid[i][j] = [];
        }
    }
}

function populatePointGrid(){

    clearPointGrid()

    for(i = 0;i<points.length;i++){
        //calculate the grid position
        let gridX = Math.floor(points[i].x/(width/pointGridWidth));
        let gridY = Math.floor(points[i].y/(height/pointGridHeight));
        
        pointGrid[gridY][gridX].push(points[i]);
    }
}

function connectPoints(){

    for(y = 0;y<pointGridHeight;y++){
        for(x = 0;x<pointGridWidth;x++){

            //search all of the adjacent cells
            let startX = x - 1;
            let startY = y - 1;
            let endX = x + 1;
            let endY = y + 1;

            //edge conditions
            if(startX<0){ startX = 0;};
            if(startY<0){ startY = 0;};
            if(endX>=pointGridWidth){ endX = pointGridWidth - 1;};
            if(endY>=pointGridHeight){ endY = pointGridHeight - 1;};

            //gather all of the points in the center cell
            let gridpoints = []
            for(i = 0;i<pointGrid[y][x].length;i++){
                pointGrid[y][x][i].connects = {};
                gridpoints.push(pointGrid[y][x][i]);
            }

            //connect the points in adjacent cells to the center points
            for(ay = startY;ay<=endY;ay++){            
                for(ax = startX;ax<=endX;ax++){
                    //if its not the current cell
                    if(!(ax == x && ay == y)){
                        let cell = pointGrid[ay][ax];
                        for(i = 0;i<cell.length;i++){
                            //connect all of the center points
                            for(j = 0;j<gridpoints.length;j++){
                                //add the adjacent point to the connects dict
                                if(cell[i].connects[gridpoints[j].id] == null){
                                    gridpoints[j].connects[cell[i].id] = cell[i];
                                }
                            }
                        }
                    }
                }
            }

            //connect the inner points
            for(i = 0;i<gridpoints.length;i++){
                for(j = 0;j<gridpoints.length;j++){
                    if(i != j){
                        //dont make double connections
                        if(gridpoints[i].connects[gridpoints[j].id] == null){
                            gridpoints[j].connects[gridpoints[i].id] = gridpoints[i];
                        }
                    }
                }
            }
        }
    }
}

function renderConnections(){

    //calculate correct aspect ratio values
    let warpX = renderArea.canvas.width/width;
    let warpY = renderArea.canvas.height/height;

    let newMouseX = width*mousePercentX;
    let newMouseY = height*mousePercentY;

    for(i = 0;i<points.length;i++){

        let current = points[i];
        let connects = Object.values(current.connects);

        if(showPoints){
            drawEmptyPoint(points[i].x*warpX,points[i].y*warpY,points[i].radius,"lightblue");
        }

        //try each close point
        for(j = 0;j<connects.length;j++){

            let next = connects[j];
            let dist = distBetweenPoints(current.x, current.y,next.x,next.y);

            if(dist<=connectDist){

                let weight = dist/connectDist;

                //calculate color
                let offColor = 125;
                let newColor = Math.floor(weight*offColor);
                let secondWeight = Math.abs(newMouseY-(current.y+next.y)/2)/150;
                let newColorString = 'rgb('+ newColor/secondWeight/2 +','+ newColor*secondWeight +','+ newColor+(255-offColor) +')';

                //draw the connecting line
                drawLine(current.x*warpX,current.y*warpY,next.x*warpX,next.y*warpY,newColorString);
            }
        }

        //mouse input
        let dist = distBetweenPoints(current.x,current.y,newMouseX,newMouseY)
        if(dist<=connectDist){
            //push away from mouse
            points[i].x += (current.x-newMouseX)/dist*Math.abs(speed);
            points[i].y += (current.y-newMouseY)/dist*Math.abs(speed);
        }
    }
}

function updatePoints(){
    for(i = 0;i<points.length;i++){

        //moves point
        points[i].x += points[i].velx*speed*2;
        points[i].y += points[i].vely*speed;
        points[i].y += ((points[i].x/height/2)**2 - 2)*speed;

        //check if out of bounds
        if(points[i].y<0){
            points[i].y += height;
        }else if(points[i].y>height){
            points[i].y -= height;
        }

        if(points[i].x<0){
            points[i].x += width;
        }else if(points[i].x>width){
            points[i].x -= width;
        }
    }
}

function elementInViewport(element){
    let rect = element.getBoundingClientRect();
    
    if(rect.bottom < 0){
        return false;
    }

    return true;
}

function updateRenderArea() {

    //only render when the element is on the screen
    if(!elementInViewport(renderArea.canvas)){
        return;
    }

    renderArea.clear();

    updatePoints();

    populatePointGrid();
    connectPoints();
    renderConnections();
}

//mouse handling
function moved(event){
    
    oldMouseX = mouseX
    oldMouseY = mouseY

    let rect = renderArea.canvas.getBoundingClientRect();

    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top;
    
    mousePercentX = mouseX/canvas.width();
    mousePercentY = mouseY/canvas.height();

    //if the player is clicking
    if(mouseDown){
        mouseDragged(width*(oldMouseX-mouseX)/canvas.width());
    }
}

function mouseDragged(delta){

    speed += speedAccel*delta;
    if(speed>maxSpeed){
        speed = maxSpeed
    }
    if(speed<-maxSpeed){
        speed = -maxSpeed
    }
}

function onMouseDown(){
    mouseDown = true;
}

function onMouseUp(){
    mouseDown = false;
}

function onMouseOut(){
    onMouseUp()
}

//rendering stuff
var renderArea = {
    canvas : document.getElementById("wireflame"),
    start : function() {

        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(updateRenderArea, 20);

        this.canvas.onmousemove = moved
        this.canvas.onmousedown = onMouseDown
        this.canvas.onmouseup = onMouseUp
        this.canvas.onmouseout = onMouseOut
        this.canvas.onselectstart = function(){ return false; }

    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function drawEmptyPoint(x,y,radius,color){
    ctx = renderArea.context;

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.arc(x,y,radius,0,2*Math.PI);

    ctx.stroke();
}

function drawLine(x1,y1,x2,y2,color){
    ctx = renderArea.context;

    ctx.lineWidth = 1.5;

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);

    ctx.stroke();
}

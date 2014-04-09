
Math.TAU = Math.PI * 2;

CanvasRenderingContext2D.prototype.drawRotatedImage = function(image, x, y, width, height, angle, originX, originY) {
    if (width === undefined)   { width = image.width; }
    if (height === undefined)  { height = image.height; }
    if (angle === undefined)   { angle = 0; }
    if (originX === undefined) { originX = 0; }
    if (originY === undefined) { originY = 0; }
    var cos = Math.cos(angle);
    var sin = Math.sin(angle);
    
    console.log(originX, originY);
    
    this.setTransform(cos, sin, -sin, cos, x+originX, y+originY);
    this.drawImage(image, -originX, -originY, width, height);
    this.resetTransform();
}

CanvasRenderingContext2D.prototype.resetTransform = function() {
	this.setTransform(1, 0, 0, 1, 0, 0);
}

CanvasRenderingContext2D.prototype.drawCircle = function (x, y, radius) {
	context.beginPath();
	context.arc(x, y, radius, 0, Math.TAU);
	context.fill();
}




function ImageAsset(src, width, height) {
	//Image.call(this, width, height);
	
	this.loaded = false;
	this.width = width;
	this.height = height;
	this.dx = 0;
	this.dy = 0;
	this.src = src;
	this.imgElement = new Image(width, height);
	this.imgElement.src = this.src;
	//document.querySelector('body').appendChild(this);
	
	this.loaded = true;
}
ImageAsset.prototype.center = function() {
	this.dx = -this.width / 2;
	this.dy = -this.height / 2;
}
ImageAsset.prototype.draw = function(context, x, y, rotation) {
	if (this.loaded) {
		context.drawRotatedImage(this.imgElement, x+this.dx, y+this.dy, this.width, this.height, rotation, -this.dx, -this.dy);
	}
	else {
		console.log(this.src, "not loaded yet. Cannot draw to canvas.");
	}
}

//var imgSpaceBackground = new ImageAsset('space-background.png');
var imgEarth = new ImageAsset('earth.png', 100, 100);
var imgSpaceStation = new ImageAsset('spacestation.png', 64, 64);

//document.addEventListener('DOMContentLoaded', firstDraw);
document.addEventListener('click', firstDraw);
function firstDraw()
{
	console.log("click");
	imgEarth.center();
	imgSpaceStation.center();
	
	var centerX = 250;
	var centerY = 250;
	var radius = 150;
	
	var demos = document.querySelectorAll(".ufo-demo");
	for (var i = 0; i < demos.length; i++) {
		var context = demos[i].getContext("2d");
		//imgSpaceBackground.draw(context, 0, 0);
		imgEarth.draw(context, centerX, centerY);
		
		var radianAngle = 0;
		var spaceStationX = centerX + radius * Math.cos( radianAngle );
		var spaceStationY = centerY + radius * Math.sin( radianAngle );
		
		imgSpaceStation.draw(context, spaceStationX, spaceStationY);
	}
}



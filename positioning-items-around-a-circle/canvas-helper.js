

var notEmpty = /\S/

window.addEventListener('load', checkForCanvasElements);
function checkForCanvasElements() {
	var canvasElements = document.querySelectorAll('canvas');
	for (var i = 0; i < canvasElements.length; i++) {
		var canvas = canvasElements[i];
		if (!canvas.innerHTML.match(notEmpty)) {
			canvas.innerHTML = "Sorry, your browser does not support the canvas. Please upgrade your browser.";
		}
	}
}

function isCanvasSupported(){
  var elem = document.createElement('canvas');
  return !!(elem.getContext && elem.getContext('2d'));
}


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


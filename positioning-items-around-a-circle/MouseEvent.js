
console.log("Loaded MouseEvent.js 0.1");

MouseEvent.CLICK = 'click';
MouseEvent.CONTEXT_MENU = 'contextmenu';
MouseEvent.DOUBLE_CLICK = 'dblclick';
MouseEvent.MOUSE_DOWN = 'mousedown';
MouseEvent.MOUSE_ENTER = 'mouseenter';
MouseEvent.MOUSE_LEAVE = 'mouseleave';
MouseEvent.MOUSE_MOVE = 'mousemove';
MouseEvent.MOUSE_OUT = 'mouseout';
MouseEvent.MOUSE_OVER = 'mouseover';
MouseEvent.MOUSE_UP = 'mouseup';
MouseEvent.SHOW = 'show';

MouseEvent.trackMouse = function(target, onUpdate) {
	var mouseData = {mouseX:NaN, mouseY:NaN, mouseDown:false};
	
	target.addEventListener(MouseEvent.MOUSE_DOWN, function(event) {
		mouseData.mouseDown = true;
		if (onUpdate) { onUpdate.call(target, mouseData); }
	});
	target.addEventListener(MouseEvent.MOUSE_MOVE, function(event) {
		mouseData.mouseX = event.clientX;
		mouseData.mouseY = event.clientY;
		if (onUpdate) { onUpdate.call(target, mouseData); }
	});
	target.addEventListener(MouseEvent.MOUSE_UP, function(event) {
		mouseData.mouseDown = false;
		if (onUpdate) { onUpdate.call(target, mouseData); }
	});
	
	return mouseData;
}



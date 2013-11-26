document.addEventListener('DOMContentLoaded', drawClock);
function drawClock()
{
	var now = new Date();
	var h = now.getHours();
	var m = now.getMinutes();
	var s = now.getSeconds();

	// --- DIGITAL CLOCK --- //
	function formatHour(h)		{ return (h % 12 == 0) ? "12" : String(h % 12); }
	function padZero(num)		{ return ((num < 10) ? "0" : "" ) + String(num); }
	function getTimePeriod(h)	{ return (h < 12) ? "AM" : "PM"; }

	var timeString = formatHour(h) + ":" + padZero(m) + ":" + padZero(s) + " " + getTimePeriod(h);
	document.getElementById("tutorial-example-currentTime").innerHTML = timeString;
	
	// --- Analog clock ---//

	var canvas = document.getElementById("tutorial-example-clock");
	var context = canvas.getContext("2d");

	// You can change this to make the clock as big or small as you want.
	// Just remember to adjust the canvas size if necessary.
	var clockRadius = 100;

	// Make sure the clock is centered in the canvas
	var clockX = canvas.width / 2;
	var clockY = canvas.height / 2;

	// Make sure TAU is defined (it's not by default)
	Math.TAU = 2 * Math.PI;

	function drawArm(progress, armThickness, armLength, armColor)
	{
		var armRadians = (Math.TAU * progress) - (Math.TAU/4);
		var targetX = clockX + Math.cos(armRadians) * (armLength * clockRadius);
		var targetY = clockY + Math.sin(armRadians) * (armLength * clockRadius);

		context.lineWidth = armThickness;
		context.strokeStyle = armColor;

		context.beginPath();
		context.moveTo(clockX, clockY); // Start at the center
		context.lineTo(targetX, targetY); // Draw a line outwards
		context.stroke();
	}

	context.clearRect(0, 0, canvas.width, canvas.height);
	drawArm( h/12, 10, 1/2, '#000000'); // Hour
	drawArm( m/60,  4, 3/4, '#000000'); // Minute
	drawArm( s/60,  2,   1, '#FF0000'); // Second
	
	storedMS = now.getTime();
	document.getElementById("tutorial-example-storedTime").innerHTML = timeString;
	
	updateSince()
	setInterval(updateSince, 1000);
}

var storedMS;

function updateSince()
{
	var now = new Date();
	document.getElementById("tutorial-example-since").innerHTML = since(storedMS, now.getTime());
}

function since(startMS, currentMS)
{
	var diffMS = currentMS - startMS;
	if (diffMS < 1000) return format(diffMS, 'millisecond');
	diffMS /= 1000;
	if (diffMS < 60) return format(diffMS, 'second');
	diffMS /= 60;
	if (diffMS < 60) return format(diffMS, 'minute');
	diffMS /= 60;
	if (diffMS < 60) return format(diffMS, 'hour');
	
}

function format(val, unit)
{
	val = Math.floor(val);
	return String(val) + " " + unit + ((val == 1) ? "" : "s");
}

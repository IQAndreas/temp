var menu = document.querySelector('#menu')
var currentStyleTF = document.querySelector('#current-menu-style')
var menuStyles = ['none', 'float-left', 'float-right', 'position-fixed', 'relative-left', 'relative-right', 'absolute-left', 'absolute-right']
var currentStyle = 0;
function toggle()
{
	currentStyle++;
	currentStyle %= menuStyles.length;
	menu.className = "floating-menu" + " " + menuStyles[currentStyle];
	currentStyleTF.innerHTML = menuStyles[currentStyle];
}

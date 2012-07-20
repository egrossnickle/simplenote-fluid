/*
  Title: Simplenote restyled
 Author: Eric Grossnickle
    URL: http://lab.mightydream.com/simplenote-restyled/
   Date: 10/20/2010
*/


function initialize()
{
	includeFiles(version);
	
	if (version === 1) {
		// set note style
		var body = document.getElementById('custom-doc');
		if (getCookie('note_style') == 'dark') {
			removeClass(body, 'light');
			addClass(body, 'dark');
		}
		else {
			removeClass(body, 'dark');
			addClass(body, 'light');
		}
		
		adjustLayout();
		setTimeout(adjustLayout, 1000);
	}
}

function includeFiles(version) {
	// append new stylesheet
	var cssNode = document.createElement('link');
	cssNode.type = 'text/css';
	cssNode.rel = 'stylesheet';
	cssNode.href = 'http://lab.mightydream.dev/simplenote-restyled/css/simplenote-v'+version+'.css';
	cssNode.media = 'screen';
	cssNode.title = 'dynamicLoadedSheet';
	document.getElementsByTagName("head")[0].appendChild(cssNode);
	
	// add favicon
	var faviconNode = document.createElement('link');
	faviconNode.rel = 'shortcut icon';
	faviconNode.href = 'http://lab.mightydream.com/simplenote-restyled/favicon.ico';
	document.getElementsByTagName("head")[0].appendChild(faviconNode);
}

function adjustLayout()
{
	// get window dimensions
	var wHeight = window.innerHeight;
	var wWidth = window.innerWidth;
	
	// get body dimensions
	var body = document.getElementById('custom-doc');
		var bHeight = body.offsetHeight;
		var bWidth = body.offsetWidth;
	
	// get list dimensions
	var list = document.getElementById('listContainer');
		var lHeight = list.offsetHeight;
		var lWidth = list.offsetWidth;
	
	// get panel dimensions
	var panel = document.getElementById('text');
		var pHeight = panel.offsetHeight - document.getElementById('status').offsetHeight;
		var pWidth = panel.offsetWidth;
	
	// get textarea dimensions
	var textarea = document.getElementById('content');
	
	// get status dimensions
	var status = document.getElementById('status');
		var sHeight = status.offsetHeight;
		var sWidth = status.offsetWidth;
	
	// landscape mode
	if (hasClass(body, 'landscape')) {
		// set new dimensions of body
		body.style.height = wHeight + "px";
		
		// get header dimensions (#header + #hd)
		var hHeight = document.getElementById('header').offsetHeight + document.getElementById('hd').offsetHeight;
		
		var bd = document.getElementById('bd');
		
		// set new bd and list heights
		bd.style.height = wHeight - hHeight - sHeight + "px";
		list.style.height = bd.offsetHeight + "px";
		
		// set new textarea dimensions
		textarea.style.height = bd.offsetHeight - 20 + "px";
		textarea.style.width = bWidth - lWidth - 20 + "px";
	}
	// normal mode
	else {
		// set new panel height
		var pHeightNew = pHeight + (wHeight - bHeight);
		panel.style.height = pHeightNew + "px";
		
		// set new textarea dimensions
		textarea.style.height = pHeightNew - 20 - document.getElementById('ft').offsetHeight + "px";
		textarea.style.width = wWidth - 20 + "px";
	}
}

// http://www.openjs.com/scripts/dom/class_manipulation.php
function hasClass(ele,cls) {
	return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}
function addClass(ele,cls) {
	if (!this.hasClass(ele,cls)) ele.className += " "+cls;
}
function removeClass(ele,cls) {
	if (hasClass(ele,cls)) {
    	var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
		ele.className=ele.className.replace(reg,' ');
	}
}

// http://www.w3schools.com/JS/js_cookies.asp
function setCookie(c_name, value, expiredays)
{
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + expiredays);
	document.cookie = c_name+ "=" + escape(value) + ((expiredays==null) ? "" : ";expires=" + exdate.toGMTString());
}

// http://www.w3schools.com/JS/js_cookies.asp
function getCookie(c_name)
{
	if (document.cookie.length>0) {
		c_start=document.cookie.indexOf(c_name + "=");
		if (c_start!=-1) {
			c_start=c_start + c_name.length+1;
			c_end=document.cookie.indexOf(";",c_start);
			if (c_end==-1) c_end=document.cookie.length;
			return unescape(document.cookie.substring(c_start,c_end));
		}
	}
	return "";
}

var version = null;
if (document.getElementById('wrapper') || document.getElementById('content')) version = 1;
else version = 2;

var page = window.location.pathname;

if (version === 1) {
	if (page == '/account.html')
	{
		includeFiles(version);
		
		var table = document.getElementsByTagName('table')[0];
		numRows = table.getElementsByTagName('tr').length;
		var tRow = table.insertRow(numRows-1);
		
		var tCell = document.createElement('td');
		tCell.innerHTML = 'Note Style';
		tRow.appendChild(tCell);
		
		var tCell = document.createElement('td');
		
		var aDark = document.createElement('a');
		aDark.innerHTML = (getCookie('note_style') != 'light') ? '<strong>Dark</strong>' : 'Dark';
		aDark.setAttribute('href', '#');
		aDark.setAttribute('onclick', "setCookie('note_style', 'dark', 730); location.href = '/';");
		
		var aLight = document.createElement('a');
		aLight.innerHTML = (getCookie('note_style') == 'light') ? '<strong>Light</strong>' : 'Light';
		aLight.setAttribute('href', '#');
		aLight.setAttribute('onclick', "setCookie('note_style', 'light', 730); location.href = '/';");
		
		var sep = document.createElement('span');
		sep.innerHTML = ' / ';
		
		tCell.appendChild(aLight);
		tCell.appendChild(sep);
		tCell.appendChild(aDark);
		
		tRow.appendChild(tCell);
		
		// insert blank row after
		numRows = table.getElementsByTagName('tr').length;
		var tRowBlank = table.insertRow(numRows-1);
		tRowBlank.appendChild(document.createElement('td'));
		tRowBlank.appendChild(document.createElement('td'));
	}
	else if (page == '/login.html')
	{
		includeFiles(version);
	}
	else
	{
		if (window.fluid) initialize();
		else window.addEventListener('load', initialize, false);
			
		window.addEventListener('resize', adjustLayout, false);
	}
}
else {
	if (page == '/settings') {
	
	}
	else if (page == '/contact/') {
	
	}
	else {
		if (window.fluid) initialize();
		else window.addEventListener('load', initialize, false);
	}
}
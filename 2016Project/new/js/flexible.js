var deviceWidth = document.documentElement.clientWidth;//设备css像素宽
var isIPhone = window.navigator.appVersion.match(/iPhone/gi);//判断设备是不是iPhone
if (isIPhone) {
	alert("iPhone");
	dpr = window.devicePixelRatio;
	width = deviceWidth * dpr;
	scale = 1/dpr;
	fontSize = width/10;	
	window.document.documentElement.style.fontSize = fontSize + 'px';
}else {
	alert("andrio")
	scale = 1;
	fontSize = deviceWidth/10;
	dpr = 1 ;
	window.document.documentElement.style.fontSize = fontSize + 'px';
}
document.querySelector('meta[name="viewport"]').setAttribute('content','initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
var docEl = window.document.documentElement;
docEl.setAttribute('data-dpr', dpr);

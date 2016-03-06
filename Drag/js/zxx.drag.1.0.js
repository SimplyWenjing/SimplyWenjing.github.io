// by zhangxinxu welcome to visit my personal website http://www.zhangxinxu.com/
// zxx.drag v1.0 2010-03-23 元素的拖拽实现

var params = {
	left: 0,
	top: 0,
	currentX: 0,
	currentY: 0,
	flag: false//移动与否的标志
};
//获取相关CSS属性
var getCss = function(o,key){
	return o.currentStyle? o.currentStyle[key] : document.defaultView.getComputedStyle(o,false)[key]; 	
};

//拖拽的实现
var startDrag = function(target){
		params.left = getCss(target, "left");//获取元素的css中的left和top
		params.top = getCss(target, "top");

	target.onmousedown = function(event){
		params.flag = true;//进行拖拽
		var e = event;
		params.currentX = e.clientX;//记录下鼠标按下时的坐标
		params.currentY = e.clientY;
	};
	document.onmouseup = function(){
		params.flag = false;//拖拽停止	
		params.left = getCss(target, "left");
		params.top = getCss(target, "top");
	};
	document.onmousemove = function(event){
		var e = event;
		if(params.flag){
			var nowX = e.clientX, nowY = e.clientY;//鼠标移动后的坐标
			var disX = nowX - params.currentX, disY = nowY - params.currentY;//鼠标移动的距离
			target.style.left = parseInt(params.left) + disX + "px";
			target.style.top = parseInt(params.top) + disY + "px";
		}

	}	
};
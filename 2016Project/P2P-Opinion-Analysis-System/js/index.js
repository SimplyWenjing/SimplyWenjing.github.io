// 这个轮播图做的不够好，因为全都是写死了，不能控制动画的速度，扩展性太差
//今后的修改方向：1、图片左右移动的时候要加动画；
//2、hover上去的时候就不要再自动播放了
//3、 点击右边箭头 下面的小点也要相应的变化

leftBtn = document.getElementById("left");
rightBtn = document.getElementById("right");
imageList = document.getElementById("image-list");
imageControl = document.getElementById("image-control");
var moveFlag = false;

var leftCSS = getCSS(imageList,"left");
var left = leftCSS.slice(0,leftCSS.length-2);

//获取CSS样式
function getCSS(element,key){
	var computedStyle = element.currentStyle ? element.currentStyle : document.defaultView.getComputedStyle(element,null);
	return computedStyle[key];
}

//控制图片向左移
function moveLeft() {
	moveFlag = false;
	left = left - 1280;
	if(left < -5120){
		left = -1280;
	} else if(left > -1280){
		left = -5120;
	}
	imageList.style.left = left + "px";	
	setTimeout(function(){
		moveFlag = true;
	},1500)			
}
//控制图片向右移
function moveRight() {
	moveFlag = false;
	left = left + 1280;
	if(left < -5120){
		left = -1280;
	} else if(left > -1280){
		left = -5120;
	}
	imageList.style.left = left + "px";	
	moveFlag = true;
}
//图片自动播放
function moveAuto() {
	moveFlag = true;
	if (moveFlag == true) {
		timeId = setInterval(function(){
			left = left - 1280;
			if(left <= -5120){
				left = -1280;
			} else if(left >= -1280){
				left = -5120;
			}	
			imageList.style.left = left + "px";			
		},6000);
	} else{
		clearInterval(timeId);
		moveFlag = false;
	}	
}
//添加事件处理程序
leftBtn.addEventListener("click",moveLeft,false);
right.addEventListener("click",moveRight,false);
window.addEventListener("load",moveAuto,false);
imageControl.addEventListener("click",function(event) {
	var target = event.target;
	if(target.nodeName.toLowerCase() == "li"){
		for(var i = 0; i < 4; i ++) {
			imageControl.children[i].style.color="#eee";
		}
		target.style.color="#e7504d";
		var order = parseInt(target.getAttribute("data-order"));
		console.log(order);
		switch (order) {
			case 1:
				imageList.style.left = -1280 + "px";
				break;
			case 2:
				imageList.style.left = -2560 + "px";
				break;
			case 3:
				imageList.style.left = -3840 + "px";
				break;
			case 4:
				imageList.style.left = -5120 +"px";
				break;
		}
	}
},false)


//wow.init();
var progressBar = null;
var mySwiper = null;
var bgAudio = null;
var musicBtn = null;
var DATA = null;
var loadedImg = 0;

function loadImg(url, count, callback) {
  var image = new Image();
  image.onload = function () {
    loadedImg++;
    if (loadedImg == count) {
      callback();
    }
  }
  image.src = url;
}


function loadImgs(urls, callback) {
  loadedImg = 0;
  for(var i = 0, l = urls.length; i < l; i++) {
    loadImg(urls[i], l, callback);
  }
}
function byId(id) {
	return document.getElementById(id);
}
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function createMusic() {
	bgAudio = byId("bg_audio");
	musicBtn =  byId("music");
	/*
	bgAudio.onplay = function() {
	   musicBtn.className = "play-music";
	};
	bgAudio.onpause = function() {
	   musicBtn.className = "pause-music";
	};
	*/
	
	//musicBtn.className = "play-music";
	bgAudio.addEventListener("play", function () {
		musicBtn.className = "play-music";
	});
	bgAudio.addEventListener("pause", function () {
		musicBtn.className = "pause-music";
	});
	bgAudio.play();
	byId("music_warpper").addEventListener("click", function () {
		if (musicBtn.className == "play-music") {
			bgAudio.pause();
		}
		else {
			bgAudio.play();
		}
	})

}
var isSetStared = false;
function createStars() {
	if (isSetStared == true) {
		return;
	}
	isSetStared = true;
	if (DATA["scores"]) {
		for(var i = 0 ; i < 5; i++) {
			byId("score" + (i + 1)).className = "score" + DATA["scores"][i]["value"];
			byId("score" + (i + 1) + "_label").innerHTML = DATA["scores"][i]["txt"];
		}
	}
	
	addClass(byId("page6"), "result" + DATA["result"]);
}
function createProgressBar(page) {
	progressBar = new ProgressBar.Circle('#day_circle', {
				  	color: '#5079c5',
				    strokeWidth: 18,
				    trailWidth: 18,
				    duration: 1000,
				    easing: 'easeInOut',
				    text: {
				        value: '0',
				        style: {
				        	color: '#e95735',
				        	"font-size": "46px"
				        }
				    },
				    step: function(state, bar) {
				        bar.setText((bar.value() * 360).toFixed(0) + "天");
				    }
			});
			var day = DATA["play_day"];
			window.setTimeout(function () {
				progressBar.animate(1, function() {
					//progressBar.animate(0);
                   
					progressBar.animate(day / 360 , function () {
						page.className = page.className + " animate-page-state2";
					});

					
					
				})
			}, 1000)
}


function hasClass(el, className) {
  if (el.classList)
    return el.classList.contains(className)
  else
    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
}

function addClass(el, className) {
  if (el.classList)
    el.classList.add(className)
  else if (!hasClass(el, className)) el.className += " " + className
}

function removeClass(el, className) {
  if (el.classList)
    el.classList.remove(className)
  else if (hasClass(el, className)) {
    var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
    el.className=el.className.replace(reg, ' ')
  }
}

function createSwiper() {
	mySwiper = new Swiper('.swiper-container', {
    "mode" : 'vertical',
    "simulateTouch": false,
    "preventClicks": false,
    "onSlideChangeEnd" : function (swiper) {
    		//console.log(swiper);
    		var prePage = swiper.getSlide(swiper.previousIndex);
    		if (!hasClass(prePage, "animate-page-leave")) {
    			addClass(prePage, "animate-page-leave");
    		}
	    	var page = swiper.getSlide(swiper.activeIndex);
	    	if (!hasClass(page, "animate-page")) {
	    		addClass(page, "animate-page");
	    	}
	    	if (hasClass(page, "animate-page-leave")) {
	    		removeClass(page, "animate-page-leave");
	    	}
	    	document.body.className = "body-page" + (swiper.activeIndex + 1);
	    	if (page.className.indexOf("page4") >= 0) {
	    		if (progressBar == null) {
	    			createProgressBar(page);
	    		}
	    	}
	    	if (page.className.indexOf("page6") >= 0) {
	    		createStars();
	    	}
	 },
	 "onTouchStart" : function (swiper, event) {
	 		if(musicBtn.className != "play-music" && musicBtn.className != "pause-music" ) {
	 			bgAudio.play();
	 		}
	 }
	});

}

function getData() {
	var deviceId = getParameterByName("deviceid");
	qwest.get('/operation/2015diary/php/data.php?deviceid=' + deviceId)
     .then(function(response) {
     	var obj = JSON.parse(response);
     	DATA = obj;
     	byId("play_story_count").innerHTML = DATA["play_count"];
     	byId("time_show").innerHTML = DATA["time"];
     	byId("play_order").innerHTML = DATA["percentage"];
     	if (DATA["play_count"] == 0 && DATA["play_day"] == 0) {
     		 
     		 window.setTimeout(function () {
				mySwiper.removeSlide(3);
				window.setTimeout(function () {
					mySwiper.removeSlide(3);
					window.setTimeout(function () {
						mySwiper.removeSlide(3);
		     		 }, 0);
	     		 }, 0);
     		 }, 0);
     		 
     		
     		//
     		//mySwiper.removeSlide(5);
     		//mySwiper.removeSlide(6);
     		/*
     		byId("page4").style.display = "none";
     		byId("page5").style.display = "none";
     		byId("page6").style.display = "none";
     		*/
     	}
      //  console.info(obj);
     });
}
function isInWeixin() {
  var ua = navigator.userAgent.toLowerCase();
  return ua.indexOf("micromessenger") != -1;
}

var isInited = false;
function init() {
	if (isInited == true) {
		return;
	}
	if (isInWeixin()) {
		byId("download_bar").style.display = "block";
	}
	isInited = true;
	byId("loading").style.display = "none";
	
	createSwiper();
	getData();
	byId("share_btn").addEventListener("click", share);
	byId("download_btn").addEventListener("click", download);
	createMusic();

}


function download() {
	if (_hmt) {
        _hmt.push(['_trackEvent', '2015dialy_click', '2015dialy_click_download']);
    }
    window.setTimeout(function () {
		window.location="http:\/\/a.app.qq.com/o/simple.jsp?pkgname=com.kunpeng.babyting";
    }, 200);
}
function share() {
	dataForWeixin.desc = getTimelineDesc();
	if (isInBabytingAndroid == true) {
        shareWebPageToWeixinAndroid();
    }
    else if (window.WebViewJavascriptBridge) {
        shareWebPageToWeiXinIOS();
    }
    else {
         showMask();
    }
    if (_hmt) {
        _hmt.push(['_trackEvent', '2015dialy_click', '2015dialy_click_share']);
    }
}
var dataForWeixin={
    img_url : 'http://3gimg.qq.com/BabytingWeb/operation/2015diary/style/images/weixin.jpg',
    url : window.location.href,
    title : "【我宝宝的2015成长日记】",
    desc : "哇，2015年我的宝宝好棒，经过官方鉴定：被评为“国学大师”，快来围观！",
    callback : function(){}
 };
function getAppMessageDesc() {
	var t = null;
	switch (DATA["result"]) {
    	case "1": {
    		t = "动画粉丝";
    		break;
    	} 
    	case "2": {
    		t = "故事大王";
    		break;
    	}
    	case "3": {
    		t = "英语学霸";
    		break;
    	}
    	case "4": {
    		t = "儿歌达人";
    		break;
    	}
    	case "5": {
    		t = "国学大师";
    		break;
    	}
    	}
	var desc =  "哇，2015年我的宝宝好棒，经过官方鉴定：被评为“" + t + "”，快来看";
	return desc;
}

function getTimelineDesc() {
	var t = null;
	switch (DATA["result"]) {
    	case "1": {
    		t = "动画粉丝";
    		break;
    	} 
    	case "2": {
    		t = "故事大王";
    		break;
    	}
    	case "3": {
    		t = "英语学霸";
    		break;
    	}
    	case "4": {
    		t = "儿歌达人";
    		break;
    	}
    	case "5": {
    		t = "国学大师";
    		break;
    	}
    	}
	var desc =  "【我宝宝的2015成长日记】，经过官方鉴定：被评为“" + t + "”，快来看";
	return desc;
}

function onBridgeReady() {
    WeixinJSBridge.on('menu:share:appmessage', function(argv) {
    	dataForWeixin.title = "【我宝宝的2015成长日记】";
    	dataForWeixin.desc = getAppMessageDesc();
		WeixinJSBridge.invoke('sendAppMessage',{
		        'content' : '',
		        'desc' : dataForWeixin.desc,
		        'img_height' : "120",
		        'img_url' : dataForWeixin.img_url,
		        'img_width' : "120",
		        'link' : dataForWeixin.url,
		        'title' : dataForWeixin.title,
		        'type' : 'link'
		    }, function(res) {
		   
		    });
    });
    WeixinJSBridge.on('menu:share:timeline', function(argv){
    	  dataForWeixin.desc = getTimelineDesc();
	      WeixinJSBridge.invoke('shareTimeline',{
	      "img_url":dataForWeixin.img_url,
	      "img_width":"120",
	      "img_height":"120",
	      "link":dataForWeixin.url,
	      "desc":dataForWeixin.desc,
		  "title":dataForWeixin.desc
		  
	      }, function(res){
	        
	      });
    });
    
}
if (typeof WeixinJSBridge === "undefined") {
    if (document.addEventListener){
        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
    }
    else if(document.attachEvent){
      document.attachEvent('WeixinJSBridgeReady' , onBridgeReady);
      document.attachEvent('onWeixinJSBridgeReady' , onBridgeReady);
    }
}
  else{
      onBridgeReady();
}
//分享网页到微信
//FIXME 后续要修复分享图片路径的问题，当前版本先不解决，程序中的KEY为img_path
function shareWebPageToWeiXinIOS() {
//	alert("share web page 1");
	dataForWeixin.title = getTimelineDesc();
    var iParamJson = {
        key:"WebPageToWeiXin",
        title: dataForWeixin.title,
        content:dataForWeixin.desc,
        web_url:dataForWeixin.url,

        iscircle: 1
    };
    var data = JSON.stringify(iParamJson);
    if (window.WebViewJavascriptBridge) {
        var bridge = window.WebViewJavascriptBridge;
  //      alert("share web page 2");
        bridge.callHandler('CallNativeAPI', data, function(response) {
		
        })
    } else {
       
    }
}
  
var isInBabytingAndroid = false;
function enableSdk() {
  isInBabytingAndroid = true;
}

function shareWebPageToWeixinAndroid() {
    var iParamJson = {
        key: 7,
        title: dataForWeixin.title,
        content: dataForWeixin.desc,
        web_url: dataForWeixin.url,
        img_path: dataForWeixin.img_url ,
        iscircle: 1
    };
    window.prompt(7, JSON.stringify(iParamJson));
}

 function hideMask() {
  var maskDom = byId("share_mask");
  maskDom.removeEventListener("click", hideMask);
  maskDom.style.display = "none";
}


function showMask() {
  var maskDom = byId("share_mask");
  maskDom.addEventListener("click", hideMask);
  maskDom.style.display = "block";
}


loadImgs(
  [
    "http://3gimg.qq.com/BabytingWeb/operation/2015diary/style/images/huojian2.png",
    "http://3gimg.qq.com/BabytingWeb/operation/2015diary/style/images/miaomiao.png",
    "http://3gimg.qq.com/BabytingWeb/operation/2015diary/style/images/mmleaf.png",
    "http://3gimg.qq.com/BabytingWeb/operation/2015diary/style/images/right_eyeball.png",
    "http://3gimg.qq.com/BabytingWeb/operation/2015diary/style/images/left_eyeball.png",
    "http://3gimg.qq.com/BabytingWeb/operation/2015diary/style/images/bggif_new.gif",
    "http://3gimg.qq.com/BabytingWeb/operation/2015diary/style/images/person1.png",
    "http://3gimg.qq.com/BabytingWeb/operation/2015diary/style/images/person2.png",
    "http://3gimg.qq.com/BabytingWeb/operation/2015diary/style/images/car.png",
    "http://3gimg.qq.com/BabytingWeb/operation/2015diary/style/images/bggif2_new.gif",
    "http://3gimg.qq.com/BabytingWeb/operation/2015diary/style/images/star2.png",
    "http://3gimg.qq.com/BabytingWeb/operation/2015diary/style/images/result5_new.png"
  ], function () {
    init();
});

window.setTimeout(function () {
    init();
}, 8000);



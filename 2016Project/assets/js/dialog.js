;(function($){
    $.extend({
        "formDialog" : function(options){
            var dialogConfig = $.extend({}, defaults, options);
         	dialogConfig.dialogObj.css("display","block");
		 	dialogConfig.dialogCover.css("display","block");
			 
	        dialogConfig.dialogCover.on("click",function(){
				dialogConfig.dialogObj.css("display","none");
				$(this).css("display","none");
				clear();
			});
			
			$("#info_form :input").blur(function(){
				$parent = $(this).parent();
				$parent.find(".error-msg").remove();
				if ($(this).is("#name")) {
				//验证姓名是否为空
					if (this.value == "") {
						var errorMsg = "姓名不能为空";
						$parent.append('<div class="error-msg">' + errorMsg +'</div>');
					}
					//  else if (!/^[\u4e00-\u9fa5]{2,4}$/.test(this.value)){
					// 	var errorMsg = "请输入合法姓名";//姓名为2-4位汉字
					// 	$parent.append('<div class="error-msg">' + errorMsg +'</div>');
					// }
				}
				if ($(this).is("#phone")) {
				//验证手机号码输入是否正确
					if (this.value == "") {
						var errorMsg = "手机号不能为空";
						$parent.append('<div class="error-msg">' + errorMsg +'</div>');
					} else {
						if (!$.isNumeric(this.value)) {
							var errorMsg = "手机号格式有误";
							$parent.append('<div class="error-msg">' + errorMsg +'</div>');
						} else {
							if (this.value.toString().length !== 11) {
								var errorMsg = "输入有误，手机号码应为11位";
								$parent.append('<div class="error-msg">' + errorMsg +'</div>');
							} else {
								return true;					
							}
						}
					}									
				}
				if ($(this).is("#qq")) {
				//验证QQ号是否为数字
					if (this.value == "") {
						var errorMsg = "QQ号不能为空";
						$parent.append('<div class="error-msg">' + errorMsg +'</div>');
					} else{
						if (!$.isNumeric(this.value)) {
							var errorMsg = "QQ号只能为数字";
							$parent.append('<div class="error-msg">' + errorMsg +'</div>');
						} else {
							return true;
						}
					}				
				}
				if ($(this).is("#wx")) {
				//验证微信号是否为数字
					if (this.value == "") {
						var errorMsg = "微信号不能为空";
						$parent.append('<div class="error-msg">' + errorMsg +'</div>');
					} else{
						if (!$.isNumeric(this.value)) {
							var errorMsg = "微信号只能为数字";
							$parent.append('<div class="error-msg">' + errorMsg +'</div>');
						} else {
							return true;
						}
					}				
				}
				if ($(this).is("select")) {
				//验证下拉框是否为空
					if (this.value == "" || this.value == "0") {
						var errorMsg = "此项不能为空";
						$parent.append('<div class="error-msg">' + errorMsg +'</div>');
					} 				
				}
		    });
			
			
			$("#submit-btn").click (function (){			
				$("#info_form :input").trigger("blur");
				var errorNum = $("form .error-msg").length;
				if (errorNum) {
				
					 if ($(window).width() > 900 &&$(window).width()!==1242 ) {
					 	dialogConfig.dialogObj.css("height","auto");
					 } else {
						dialogConfig.dialogObj.css("height","auto");
					 }				
					return false;
				} else {
				
					var _url = dialogConfig.submitUrl;
					var _data = $("#info_form").serialize();
					var _o = $("#feedback");
					$.ajax ({
						type: "post",
						url: _url,
						dataType: "json",
						data : _data,
						success: function (data) {
							dialogConfig.dialogObj.css("display","none");
							clear();
							_o.css("display","block"); 
							_o.html("<div class='feedback-content'><p>提交成功</p><p></p><p>Submit successfully</p><div id='feedback-btn'>确定</div></div>");
							$("#feedback-btn").click(function(){
								_o.css("display","none");
								dialogConfig.dialogCover.css("display","none");
							});
							// $("#submit-btn").attr({"disabled": "disabled"});                    
						},
						error: function (XMLHttpRequest,textStatus) {
							dialogConfig.dialogObj.css("display","none");
							_o.css("display","block"); 
							_o.html("<div class='feedback-content'><p>提交失败</p><p></p><p>Submit successfully</p><div id='feedback-btn'>确定</div></div>");
							$("#feedback-btn").click(function(){
								_o.css("display","none");
								dialogConfig.dialogCover.css("display","none");
								//$("book-box").css("display","block");
							});
						}
					});
					
					
					return false;      
				}
			});

			getCarBrandList(dialogConfig.getCarBrandUrl);
			
			getCarTypeList(0,"");
			getCarConfigList(0,"");
			getCitiesList(0,"");
			getAreasList(0,"");
	
			$(document).on("change","#car-brand",function(){
				var _id = $(this).val();
				getCarTypeList(_id, dialogConfig.getCartypeUrl);
			});
			
			$(document).on("change","#car-type",function(){
				var _id = $(this).val();
				getCarConfigList(_id, dialogConfig.getCarConfigUrl);
			});
			
			getProvinceList(dialogConfig.getProvinceUrl);
			
			$(document).on("change","#province",function(){
				var _id = $(this).val();
				getCitiesList(_id,dialogConfig.getCitiesUrl);
			});
			
			$(document).on("change","#city",function(){
				var _id = $(this).val();
				
				getAreasList(_id, dialogConfig.getAreasUrl);
			});
        }
    });
    
    var defaults = {
		dialogObj : $("#dialog-box"),
		dialogCover : $("#body-cover"),
		submitUrl : "http://localhost:8000/data/user_order",
		getCarBrandUrl : "http://localhost:8000/data/car_brand",
		getCartypeUrl : "http://localhost:8000/data/car_type",
		getCarConfigUrl : "http://localhost:8000/data/car_config",
		getProvinceUrl : "http://localhost:8000/data/provinces",
		getCitiesUrl : "http://localhost:8000/data/cities",
		getAreasUrl : "http://localhost:8000/data/areas"
	}
    
})(window.jQuery);


function getCarBrandList(_url){
	var url = _url;
	$.getJSON(url,function(data){
		
		if(data){
			$("#car-brand option").remove();
			var strhtml = "<option value='0'>请选择</option>";
			$.each(data,function(k,v){
			
				strhtml+="<option value='"+v.id+"'>"+v.name+"</option>";
			});
			$("#car-brand").append(strhtml);
		}
		
	});
	
}

function getCarTypeList(id,_url){
	if(id){
		var url = _url+"/"+id;
		$.getJSON(url,function(data){
		
			if(data){
				$("#car-type option").remove();
				var strhtml = "<option value='0'>请选择</option>";
				$.each(data,function(k,v){
			    
					strhtml+="<option value='"+v.id+"'>"+v.type_name+"</option>";
				});
				$("#car-type").append(strhtml);
			}
		});
	}else{
		var strhtml = "<option value='0'>请选择</option>";
		$("#car-type").html(strhtml);
	}
}

function getCarConfigList(id,_url){
	if(id){
		var url = _url+"/"+id;
		$.getJSON(url,function(data){
		
			if(data){
				$("#detail option").remove();
				var strhtml = "<option value='0'>请选择</option>";
				$.each(data,function(k,v){
			    
					strhtml+="<option value='"+v.id+"'>"+v.content+"</option>";
				});
				$("#detail").append(strhtml);
			}
		});
	}else{
		var strhtml = "<option value='0'>请选择</option>";
		$("#detail").html(strhtml);
	}	
}

function getProvinceList(_url){
	var url = _url;
	$.getJSON(url,function(data){
		if(data){
			
			$("#province option").remove();
			var strhtml = "<option value='0'>省</option>";
			$.each(data,function(k,v){
			    
				strhtml+="<option value='"+v.provinceid+"'>"+v.province+"</option>";
			});
			$("#province").append(strhtml);
		}
	});
}

function getCitiesList(id,_url){
	if(id){
	var url = _url+"/"+id;
	$.getJSON(url,function(data){
		
		if(data){
			$("#city option").remove();
			var strhtml = "<option value='0'>市</option>";
				$.each(data,function(k,v){
			    
					strhtml+="<option value='"+v.cityid+"'>"+v.city+"</option>";
				});
				$("#city").append(strhtml);
			}
		});
	}else{
		var strhtml = "<option value='0'>市</option>";
		$("#city").html(strhtml);
	}
}

function getAreasList(id,_url){
	if(id){
	var url = _url+"/"+id;
	console.log("areasList:"+url);
	$.getJSON(url,function(data){
		
		if(data){
			$("#region option").remove();
			var strhtml = "<option value='0'>区</option>";
				$.each(data,function(k,v){
			    
					strhtml+="<option value='"+v.areaid+"'>"+v.area+"</option>";
				});
				$("#region").append(strhtml);
			}
		});
	}else{
		var strhtml = "<option value='0'>区</option>";
		$("#region").html(strhtml);
	}
}

function clear(){
	$("#name").val("");
	$("#phone").val("");
	$("#qq").val("");
	$("#wx").val("");
	$("#note").val("");
	$(".error-msg").remove();
}

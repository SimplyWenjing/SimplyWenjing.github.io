//表单验证
		/*验证手机号，手机号必须为数字，且手机号码应为11位*/
		var phone = document.getElementById("phone");
		var msgs = document.getElementsByTagName("em");
		EventUtil.addHandler(phone,"blur",function () {
			if (isNaN(phone.value)){
				msgs[0].style.display = "block";
				console.log("--"+ phone.value.length);
			} else {
				if (phone.value.toString().length !== 11) {
					msgs[0].innerHTML = "输入有误，手机号码应为11位"
					msgs[0].style.display = "block";
				} else{
					msgs[0].style.display = "none";
				}					
			}
		});
		/*验证QQ号码，QQ号码必须为数字*/
		var QQ = document.getElementById("QQ");
		EventUtil.addHandler(QQ,"blur",function(){
			if (isNaN(QQ.value)){
				msgs[1].style.display = "block";
			} else{				
				msgs[1].style.display = "none";
			}
		});
		/*验证微信号码，微信号码必须为数字*/
		var wx = document.getElementById("wx");
		EventUtil.addHandler(wx,"blur",function(){
			if (isNaN(wx.value)){
				msgs[2].style.display = "block";
			} else{				
				msgs[2].style.display = "none";
			}
		});
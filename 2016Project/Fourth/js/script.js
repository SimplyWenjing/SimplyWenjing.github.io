/*-----------------------用到的函数----------------*/
       //查找属性，返回属性的值
        function findAttribute(ele, name) {
            while(ele) {
                var value = ele.getAttribute(name);
                if (value) {
                    return value;
                }
                ele = ele.parentNode;
            }
            return null;
        }
        //获取相关CSS属性
        var getCss = function(o,key){
            return o.currentStyle? o.currentStyle[key] : document.defaultView.getComputedStyle(o,false)[key];   
        };

        var dataStyle = {
            "type": null,
            "eles": []
        }

        /*-------------------------制作蛋糕--------------------*/
        document.getElementById("slide").addEventListener("click", function (event) {
            var cake1 = document.getElementById("init-cake");
            cake1.style.display = "none";
            var srcElement = event.target;
            var cake = document.getElementById("cake");
            //var tips = document.getElementById("tips");
            //tips.style.display = "none";
            var cakeType = findAttribute(srcElement, "data-cake-type");
            if (cakeType.indexOf("c_") >= 0) {
                dataStyle["type"] = cakeType;
                if(cake.className == cakeType){
                    cake.className = "";
                    dataStyle["type"] = "";
                }
            }
            else {                
                if(dataStyle.eles.indexOf(cakeType)>=0){                    
                    var index=dataStyle.eles.indexOf(cakeType);
                    dataStyle.eles.splice(index,1);                 
                }else{
                    dataStyle.eles.push(cakeType);
                }               
            }
            var className = "";
            className +=  dataStyle["type"];
            for(var i = 0, l = dataStyle.eles.length; i < l; i++) {
                className +=  " " + dataStyle.eles[i];
            }
            cake.className = className;
        },false);
    /*-----------------点击按钮跳转分享------------------*/
        var shareBtn = document.getElementById("button");    
        var bless = document.getElementById("bless");
        shareBtn.addEventListener("click",function(){
            if(bless.value == "【宝贝听听生日快乐】点击输入祝福(30字内)"){
                bless.value = "宝贝听听4周岁快乐，感谢你的温暖陪伴！";
            }
            var blessWord = bless.value;            
            var url = "share.html?word=" + blessWord +"&type=" + dataStyle.type + "&ele=" +dataStyle.eles; 
            window.location = url;
            console.log(dataStyle);
                      
        },false);



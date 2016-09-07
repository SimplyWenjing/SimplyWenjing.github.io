$(function () {
    var arr=[83667,20000,15000,14024,12195,10800,10000,10000,10000,10000,10000,10000,10000,6000,5000,5000,5000,3000,1046,1000];
    for(var i=0;i<20;i++){
        //alert(arr[i]);
        if(arr[i]<10000){
            $("table tbody").find("tr").eq(i).find("td").eq(4).append("<ul>"+"<li>"+arr[i]+"&nbsp;"+"</li>"+"<li >"+"&nbsp;"+"</span>"+"</li>"+"<li>" +"&nbsp;"+"</li>"+"</ul>");
            $("table tbody").find("tr").eq(i).find("td").eq(4).find("li").eq(1).css({"height":"6px","width":arr[i]/83667*255+'px',"background-color":"orange","margin-left":"13px"});
        }else {
            $("table tbody").find("tr").eq(i).find("td").eq(4).append("<ul>"+"<li>"+arr[i]+"</li>"+"<li >"+"&nbsp;"+"</span>"+"</li>"+"<li>" +"&nbsp;"+"</li>"+"</ul>");
            $("table tbody").find("tr").eq(i).find("td").eq(4).find("li").eq(1).css({"height":"6px","width":arr[i]/83667*255+'px',"background-color":"orange","margin-left":"10px"});
        }



        $("table tbody").find("tr").eq(i).find("td").eq(4).find("li").eq(2).css({"height":"6px","width":280-arr[i]/83667*255+'px',"background-color":"#DCDCDC"});
        $("table tbody").find("tr").eq(i).find("td").eq(4).find("ul").css({"margin-left":"10px"});
        $("table tbody").find("tr").eq(i).find("td").css("vertical-align","middle");
        $("table thead").find("tr").eq(i).find("th").css("vertical-align","middle");
    }
});
var guanzhuBtn = document.getElementById("guanzhu-btn");
var sentiBtn = document.getElementById("senti-btn");
var tableContent = document.getElementById("content");
guanzhuBtn.addEventListener("click",function(){
    tableContent.style.display = "block";
})


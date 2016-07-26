$(function() {
		$("#panel").css("opacity","0.5");
		$("#panel").click(function(){
			$(this).animate({left:"650px",opacity:"1"},3000)
				   .animate({top:"300px"},3000);
		})
		/*$("#text").click(function(){
			$(this).show("fast");
		});*/
		
	})
$(function(){
	var phone = Request.QueryString("phone");
	$("#txt").val(phone)
	$(".x").click(function(){
		var str = $("#txt").val();
		//console.log(str)
		str = str.substring(0,str.length-1);
		$("#txt").val(str)
	})
})

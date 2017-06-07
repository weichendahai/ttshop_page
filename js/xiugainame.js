$(function(){
	
	var user_id = localStorage.getItem("user_id")
	var name = Request.QueryString("name");
	name = decodeURI(name)//转码
	function stripscript(s) {//不许输入特殊字符
	    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]")   
	    var rs = "";   
	    for (var i = 0; i < s.length; i++) {  
	        rs = rs+s.substr(i, 1).replace(pattern, '');   
	    }   
	    return rs;  
	}  
	$("#txt").val(name)
	$(".x").click(function(){
		var str = $("#txt").val();
		//console.log(str)
		str = str.substring(0,str.length-1);
		$("#txt").val(str)
	});
	$("#btn").click(function(){
		
		var new_value = encodeURI(stripscript($("#txt").val()));
		if(new_value ==""){
			new Toast({context:$('body'),message:'昵称不可为空'}).show();
		}else{
			$.ajax({
				type: ajaxtype,
				url: changeuserinfo,
				dataType: "jsonp",
				data:{
					user_id:user_id,
					info_type:0,
					new_value:new_value
				},
				contentType: "application/json",
				jsonp: "jsonpCallback",
				jsonpCallback:"changeuserinfo",
				success: function(data){
					if(data.result == 0){
						window.history.go(-1)
					}else{
						new Toast({context:$('body'),message:decodeURI(data.content)}).show();
					}
				},
				error: function(){
					new Toast({context:$('body'),message:'网络故障'}).show();
				}
			})
		}
		
	})
})

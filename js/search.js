$(function(){
	var user_id = localStorage.getItem("user_id");
	var category_id =0;
	search()
	$("#searchText").on('keypress',function(e) {  
        var keycode = e.keyCode; 
        var searchName = $(this).val();  
        if(keycode=='13') {  
            e.preventDefault();    
            //请求搜索接口  
           	window.location.href = "../searchresult.html?searchName="+searchName+"&category_id="+category_id;
        }  
 	});  
 	$(".searchfenlei").delegate("li","click",function(){
 		var searchName = $(this).text();
 		
 		window.location.href = "../searchresult.html?searchName="+searchName+"&category_id="+category_id;
 	})
 	function search(){
 		$.ajax({
			type: ajaxtype,
			url: searchprepare,
			dataType: "jsonp",
			data:{user_id:user_id},
			contentType: "application/json",
			jsonp: "jsonpCallback",
			jsonpCallback:"searchprepare",
			success: function(data){
				console.log(data)
				if(data.result == 0){
					var hot_keywordstr='';
					if(data.content.hot_keywords.length == 0){
						$(".hot").css("display","none");
					}else{
						for(var i = 0;i<data.content.hot_keywords.length;i++){
							hot_keywordstr+='<li>'+decodeURI(data.content.hot_keywords[i])+'</li>'
						}
						$(".hot").append(hot_keywordstr);
					}
					
					var history_keywordstr = '';
					if(data.content.history_keywords.length == 0){
						$(".history").css("display","none")
					}else{
						for(var i = 0;i<data.content.history_keywords.length;i++){
							history_keywordstr+='<li>'+decodeURI(data.content.history_keywords[i])+'</li>'
						}
						$(".history").append(history_keywordstr);
					}
					
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

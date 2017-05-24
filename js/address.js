$(function(){
	var user_id = localStorage.getItem("user_id");
	$("section").delegate(".dizhi","click",function(){
		var addresshtml = $(this).html();
		var address_id = $(this).attr("address_id");
		localStorage.setItem("addresshtml",addresshtml);
		localStorage.setItem("address_id",address_id);
		window.history.back(-1);
	})
	$("header .right").click(function(){
		window.location.href = "manageaddress.html"
	})
	$.ajax({
		type: ajaxtype,
		url: getaddresslist,
		dataType: "jsonp",
		data:{
			user_id:user_id,
		},
		contentType: "application/json",
		jsonp: "jsonpCallback",
		jsonpCallback:"getaddresslist",
		beforeSend:function(){
			$(".section").html("<p class='load'>加载中...</p>")
		},
		success: function(data){
			console.log(data)
			if(data.result == 0){
				if(data.content.addrs ==''){
					var str = '<img src ="../img/kong.png" style="display:block;margin:0 auto;width:50%;"/><p style="text-align:center;height:1rem;line-height:1rem;">暂无收货地址,快去添加一个吧</p>'
					$("section").html(str)
				}else{
					var content = data.content.addrs;
					var str = '';
					for(var i=0;i<content.length;i++){
						var default_address_id = data.content.default_address_id;//默认地址
						str +='<div class="dizhi" address_id="'+content[i].address_id+'">'
						if(default_address_id ==content[i].address_id){
							
							str +='<div class="moren"><span>默认</span></div>'
						}
					str +='<div class="lianxiren"><p>收货人：'	
							+decodeURI(content[i].contact)+
							'</p><span class="phone">'
							+content[i].mobile_phone+
							'</span></div><div class="dizhixiangqing">'
							+decodeURI(content[i].address)+
							'</div></div>'
					}
					$('section').html(str);
				}
			}else{
				new Toast({context:$('body'),message:data.content}).show(); 
			}
		},
		error: function(){
			new Toast({context:$('body'),message:'网络故障'}).show(); 
		}
	})
})

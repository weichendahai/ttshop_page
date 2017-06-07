$(function(){
	var user_id =localStorage.getItem("user_id");
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
				if(data.content.addrs==''){
					var str = '<img src ="../img/kong.png" style="display:block;margin:0 auto;width:50%;"/><p style="text-align:center;height:1rem;line-height:1rem;">暂无收货地址</p>'
					$("section").html(str)
				}else{
					var content = data.content.addrs;
					var str = '';
					
					for(var i=0;i<content.length;i++){
						var default_address_id = data.content.default_address_id;//默认地址
					str +='<div class="dizhi" address_id="'+content[i].address_id+'"><div class="lianxiren"><p>'	
							+decodeURI(content[i].contact)+
							'</p><span class="phone">'
							+content[i].mobile_phone+
							'</span>'
					if(default_address_id ==content[i].address_id){
						str +='<span class="moren">默认</span>'
					}
					str +='</div><div class="dizhixiangqing"><span class="iconfont">&#xe632;</span>'
							+decodeURI(content[i].address)+
							'</div><div class="bottom"><p class="delete iconfont">&#xe638;</p><p class="edit iconfont">&#xe647;</p></div></div>'
					}
					$('section').html(str);
					if(content.length == 1){//只有一个收获地址不许删除
						$(".dizhi").eq(0).find(".delete").css("color","#C0C0C0")
					}
				}
			}else{
				new Toast({context:$('body'),message:decodeURI(data.content)}).show(); 
			}
		},
		error: function(){
			new Toast({context:$('body'),message:'网络故障'}).show(); 
		}
	})
	$("section").delegate(".delete","click",function(){
		
		var that = $(this);
		var address_id = $(this).parents(".dizhi").attr("address_id");
		if($("section .dizhi").length>1){
			if (confirm("删除收货地址？")){
				$.ajax({
					type: ajaxtype,
					url: removeaddress,
					dataType: "jsonp",
					data:{
						user_id:user_id,
						address_id:address_id
					},
					contentType: "application/json",
					jsonp: "jsonpCallback",
					jsonpCallback:"removeaddress",
					success: function(data){
						console.log(data)
						if(data.result == 0){
							that.parents(".dizhi").remove();
							if(that.parents(".dizhi").children(".moren").length>0){
								$("section .dizhi").eq(0).append("<div class='moren'><span>默认</span></div>")
							}
							if($(".dizhi").length==1){//删除按钮是灰色
								$(".dizhi").eq(0).find(".delete").css("color","#c2c2c2")
							}
						}else{
							new Toast({context:$('body'),message:decodeURI(data.content)}).show(); 
						}
					},
					error: function(){
						new Toast({context:$('body'),message:'网络故障'}).show(); 
					}
				})
			}else{
				
			}
		}
		
	})
	$("section ").delegate(".edit","click",function(){
		var address_id = $(this).parents(".dizhi").attr("address_id");
		var contact = ($(this).parents(".dizhi").find(".lianxiren").children("p").text());
		var mobile_phone = $(this).parents(".dizhi").find(".phone").text();
		var address = $(this).parents(".dizhi").find(".dizhixiangqing").text();
		localStorage.setItem("contact",contact);
		localStorage.setItem("mobile_phone",mobile_phone);
		localStorage.setItem("address",address);
		window.location.href = "editaddresss.html?address_id="+address_id;
	})
	
	$(".footer").click(function(){
		
		var address_id = "";
		window.location.href = "editaddresss.html?address_id="+address_id;
	})
})

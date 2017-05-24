$(function(){
	var user_id = localStorage.getItem("user_id");
	//地区选择
	$("header").delegate(".goback","click",function(){
		window.history.go(-1)
	})
	$("#address").click(function(){
		change($("#address"));
	})
	var address_id = Request.QueryString("address_id");
	if(address_id == ''){//如果地址ID是空  就是增加地址
		$("header").html('<span class="iconfont goback">&#xe604;</span>新增收货地址')
	}else{//否则就是修改地址
		$("header").html('<span class="iconfont goback">&#xe604;</span>修改收货地址');
		$("#name").val(localStorage.getItem("contact"));
		$("#phone").val(localStorage.getItem("mobile_phone"));
		$("#address").val(localStorage.getItem("address").split(" ")[0]);
		$("#addressdetails").val(localStorage.getItem("address").split(" ")[1]);
	}
	//设为默认
	var moren = 0;//是默认
	$("#moren").click(function(){
		if(moren == 1){
			$(this).children("a").css("color","#ff678a");
			$(this).children("a").html("&#xe652;");
			moren = 0;
		}else if(moren == 0){
			$(this).children("a").css("color","#000");
			$(this).children("a").html("&#xe60e;");
			moren = 1;
		}
		console.log(moren)
	})
	$(".footer").click(function(){
		
		var contact = encodeURI($("#name").val());
		var mobile_phone = $("#phone").val();
		var address = encodeURI($("#address").val()+" "+$("#addressdetails").val());
		var reg = /^1[0-9]{10}$/; //验证手机规则
		if(reg.test(mobile_phone) == true){
			if(contact != ''){
				if($("#addressdetails").val()!=''){
					if($("#address").val()!=''){
						if(address_id == ''){
							addaddress = addaddress;
							data = {
								user_id:user_id,
								contact:contact,
								mobile_phone:mobile_phone,
								address:address,
								defaults:moren
							}
						}else{
							addaddress = editaddress;
							data ={
								user_id:user_id,
								address_id:address_id,
								contact:contact,
								mobile_phone:mobile_phone,
								address:address,
								defaults:moren
							}
						}
						$.ajax({
							type: ajaxtype,
							url: addaddress,
							dataType: "jsonp",
							data:data,
							contentType: "application/json",
							jsonp: "jsonpCallback",
							jsonpCallback:"addaddress",
							success: function(data){
								console.log(data)
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
					}else{
						new Toast({context:$('body'),message:'请选择收货地址'}).show(); 
					}
				}else{
					new Toast({context:$('body'),message:'请填写收货地址'}).show(); 
				}
			}else{
				new Toast({context:$('body'),message:'请填写收货人'}).show(); 
			}
		}else{
			new Toast({context:$('body'),message:'手机号码格式错误'}).show(); 
		}
	})	
	
})

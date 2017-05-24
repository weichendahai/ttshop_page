
$(function(){
	var user_id = localStorage.getItem("user_id");
	var cart_item_ids = Request.QueryString("cart_item_ids");//产品id
	cart_item_ids = cart_item_ids.split("~");
	cart_item_ids = encodeURI(cart_item_ids.join("#"));
	var buytype = Request.QueryString("buytype");//购买类型
	console.log(buytype)
	var addresshtml = localStorage.getItem("addresshtml");
	var address_id = localStorage.getItem("address_id");
	var evaluate_shared_id = Request.QueryString("evaluate_shared_id");;//点评用户id
	
	function stopcd(data){
		if(data.result == 0){
				if(addresshtml != null){//判断是不是换了收货地址
					$(".dizhi").html(addresshtml);
					$(".dizhi").attr("order_addr_id",address_id);
					localStorage.removeItem("addresshtml");
					localStorage.removeItem("address_id");
				}else {//没换
					$(".dizhi").attr("order_addr_id",data.content.default_addr);
					if($(".dizhi").attr("order_addr_id") == -1){//如果没有收货地址
						$(".dizhi").html("请选择收货地址");
					}else{
						var addstr = '<div class="moren"><span>默认</span></div><div class="lianxiren"><p>收货人：'
						+decodeURI(data.content.contact)+
						'</p><span class="phone">'
						+data.content.mobile_phone+
						'</span></div><div class="dizhixiangqing">'
						+decodeURI(data.content.address)+
						'</div>'
						$(".dizhi").html(addstr);
					}
				}
				var orderstr = '';
				var priceallsmall = 0;//小计
				var priceall = data.content.freight;//总价钱
				var countall = 0;//总数量
				for(var i = 0;i<data.content.items.length;i++){
					var price = (data.content.items[i].item_price/100).toFixed(2);
					orderstr+='<div class="product"><div class="productimg"><img src="'
					+data.content.items[i].item_icon+
					'"/></div><div class="productdetails"><div class="top"><h3>'
					+decodeURI(data.content.items[i].item_name)+
					'</h3><span>￥'
					+price+
					'</span></div><div class="bottom"><span class="left">'
					
					for(var j = 0;j<data.content.items[i].item_propertys.length;j++){
							
						if(j ==data.content.items[i].item_propertys.length-1 ){
							
							orderstr+= decodeURI(data.content.items[i].item_propertys[j].item_property_desc);
						}else{
							orderstr+= decodeURI(data.content.items[i].item_propertys[j].item_property_desc)+",";
						}
					}
					orderstr+='</span><span class="right">x'
							+data.content.items[i].item_count+
							'</span></div></div></div>'
					priceall = (data.content.items[i].item_price*data.content.items[i].item_count)+parseInt(priceall);
					priceallsmall = (data.content.items[i].item_price*data.content.items[i].item_count)+priceallsmall;
					countall = countall+data.content.items[i].item_count;
				}
				$(".order").html(orderstr);
				$(".yunfei .right").html("￥"+(data.content.freight/100).toFixed(2));
				$(".xiaoji .right").html("￥"+(priceallsmall/100).toFixed(2));
				$(".xiaoji .right").attr("money","￥"+(priceallsmall/100).toFixed(2));
				$(".xiaoji .right").attr("moneyy",priceallsmall);
				$(".footer p").eq(0).html("共"+countall+"件商品");
				$(".footer p").eq(1).children("a").html("￥"+(priceall/100).toFixed(2));
				$(".footer p").eq(1).children("a").attr("money","￥"+(priceall/100).toFixed(2));
				if(data.content.coupons.length==0){//优惠券
					$(".youhuiquan .right").html("暂无可用优惠券");
					$(".youhuiquan").attr("user_coupon_id","-1");
				}else{
					var str = ''
					for(var i = 0;i<data.content.coupons.length;i++){
						str+= '<li coupon_id="'
						+data.content.coupons[i].coupon_id+
						'"><p>'
						+decodeURI(data.content.coupons[i].coupon_name)+
						'</p><p>'
						for(var j = 0;j<data.content.coupons[i].conditions.length;j++){
							str+=''+decodeURI(data.content.coupons[i].conditions[j].condition_desc)+'  '
						}
						str+='</p><p>有效期至'
						+data.content.coupons[i].end_date+
						'</p><div class="btn">使用</div></li>'
					}
					$("#youhui .main").append(str);
				}
				if(data.content.gift_cards.length==0){//红包	
					$(".hongbao .right").html("暂无可用红包");
					$(".hongbao").attr("user_gift_card_id","-1");
				}else{
					var str = ''
					for(var i = 0;i<data.content.gift_cards.length;i++){
						str+= '<li gift_card_id="'
						+data.content.gift_cards[i].gift_card_id+
						'"><p>'
						+decodeURI(data.content.gift_cards[i].gift_card_name)+
						'</p><p>￥'
						+(data.content.gift_cards[i].gift_card_balance/100).toFixed(2)+
						'</p><div class="btn">使用</div></li>'
					}
					$("#hongbao .main").append(str);
				}
			}else{
				new Toast({context:$('body'),message:decodeURI(data.content)}).show(); 
			}
	}
	function buynows(data){
		if(data.result == 0){
				if(addresshtml != null){//判断是不是换了收货地址
					$(".dizhi").html(addresshtml);
					$(".dizhi").attr("order_addr_id",address_id);
					localStorage.removeItem("addresshtml");
					localStorage.removeItem("address_id");
				}else {//没换
					$(".dizhi").attr("order_addr_id",data.content.default_addr);
					if(data.content.default_addr == -1){//如果没有收货地址
						$(".dizhi").html("请选择收货地址");
					}else{
						var addstr = '<div class="moren"><span>默认</span></div><div class="lianxiren"><p>收货人：'
						+decodeURI(data.content.contact)+
						'</p><span class="phone">'
						+data.content.mobile_phone+
						'</span></div><div class="dizhixiangqing">'
						+decodeURI(data.content.address)+
						'</div>'
						$(".dizhi").html(addstr);
					}
				}
				var orderstr = '';
				var priceallsmall = 0;//小计
				var priceall = data.content.freight;//总价钱
				for(var i = 0;i<data.content.items.length;i++){
					var price = (data.content.items[i].item_price/100).toFixed(2);
					orderstr+='<div class="product"><div class="productimg"><img src="'
					+data.content.items[i].item_icon+
					'"/></div><div class="productdetails"><div class="top"><h3>'
					+decodeURI(data.content.items[i].item_name)+
					'</h3><span>￥'
					+price+
					'</span></div><div class="bottom"><span class="left">'
					for(var j = 0;j<data.content.items[i].item_propertys.length;j++){

						if(j ==data.content.items[i].item_propertys.length-1 ){
							
							orderstr+= decodeURI(data.content.items[i].item_propertys[j].item_property_desc);
						}else{
							orderstr+= decodeURI(data.content.items[i].item_propertys[j].item_property_desc)+",";
						}
					}
					orderstr+='</span><span class="right">x1</span></div></div></div>'
					priceall = data.content.items[i].item_price+parseInt(priceall);
					priceallsmall = data.content.items[i].item_price+priceallsmall;
				}
				$(".order").html(orderstr);
				$(".yunfei .right").html("￥"+(data.content.freight/100).toFixed(2));
				$(".xiaoji .right").html("￥"+(priceallsmall/100).toFixed(2));
				$(".xiaoji .right").attr("money","￥"+(priceallsmall/100).toFixed(2));
				$(".xiaoji .right").attr("moneyy",priceallsmall);
				$(".footer p").eq(0).html("共1件商品");
				$(".footer p").eq(1).children("a").html("￥"+(priceall/100).toFixed(2));
				$(".footer p").eq(1).children("a").attr("money","￥"+(priceall/100).toFixed(2));
				if(data.content.coupons.length==0){//优惠券
					$(".youhuiquan .right").html("暂无可用优惠券");
					$(".youhuiquan").attr("user_coupon_id","-1");
				}else{
					var str = ''
					for(var i = 0;i<data.content.coupons.length;i++){
						str+= '<li parameter_second="'+data.content.coupons[i].conditions[0].parameter_second+'" parameter_first="'+data.content.coupons[i].conditions[0].parameter_first+'" coupon_id="'
						+data.content.coupons[i].coupon_id+
						'"><p>'
						+decodeURI(data.content.coupons[i].coupon_name)+
						'</p><p>'
						
						str+=''+decodeURI(data.content.coupons[i].conditions[0].condition_desc)+''
						
						str+='</p><p>有效期至'
						+data.content.coupons[i].end_date+
						'</p><div class="btn">使用</div></li>'
					}
					$("#youhui .main").append(str);
				}
				if(data.content.gift_cards.length==0){//红包	
					$(".hongbao .right").html("暂无可用红包");
					$(".hongbao").attr("user_gift_card_id","-1");
				}else{
					var str = ''
					for(var i = 0;i<data.content.gift_cards.length;i++){
						str+= '<li gift_card_id="'
						+data.content.gift_cards[i].gift_card_id+
						'"><p>'
						+decodeURI(data.content.gift_cards[i].gift_card_name)+
						'</p><p>￥'
						+(data.content.gift_cards[i].gift_card_balance/100).toFixed(2)+
						'</p><div class="btn">使用</div></li>'
					}
					$("#hongbao .main").append(str);
				}
			}else{
				new Toast({context:$('body'),message:decodeURI(data.content)}).show(); 
			}
	}
	console.log(address_id)
	if(buytype == 1){//从购物车进入
		if(address_id == null){//判断是不是从收货地址列表返回的    不是
			$.ajax({
				type: ajaxtype,
				url: stopcartcd,
				dataType: "jsonp",
				data:{
					user_id:user_id,
					cart_item_ids:cart_item_ids,
				},
				contentType: "application/json",
				jsonp: "jsonpCallback",
				jsonpCallback:"stopcartcd",
				success: function(data){
					console.log(data)
					var stopdata = JSON.stringify(data);//把data转化成字符串保存
					localStorage.setItem("stopdata",stopdata);
					stopcd(data)
				},
				error: function(){
					new Toast({context:$('body'),message:'网络故障'}).show(); 
				}
			})
		}else{//是
			var data = JSON.parse(localStorage.getItem("stopdata"));//把保存的字符串data传化成对象
			stopcd(data)
		}
	}else{
		if(address_id == null){//判断是不是从收货地址列表返回的    不是
			$.ajax({
				type: ajaxtype,
				url: buynow,
				dataType: "jsonp",
				data:{
					user_id:user_id,
					cart_item_ids:cart_item_ids,
					evaluate_shared_id:evaluate_shared_id
				},
				contentType: "application/json",
				jsonp: "jsonpCallback",
				jsonpCallback:"buynow",
				success: function(data){
					console.log(data)
					var stopdata = JSON.stringify(data);//把data转化成字符串保存
					localStorage.setItem("stopdata",stopdata);
					buynows(data)
				},
				error: function(){
					new Toast({context:$('body'),message:'网络故障'}).show(); 
				}
			})
		}else{//是
			var data = JSON.parse(localStorage.getItem("stopdata"));//把保存的字符串data传化成对象
			buynows(data)
		}
	}
	
	
	
	
	
	
	$(".gobackajax").click(function(){
		if(buytype == 1){//从购物车进入//返回时恢复购物车倒计时
			$.ajax({
				type: ajaxtype,
				url: resumecartcd,
				dataType: "jsonp",
				data:{
					user_id:user_id,
				},
				contentType: "application/json",
				jsonp: "jsonpCallback",
				jsonpCallback:"resumecartcd",
				success: function(data){
					console.log(data)
					window.history.go(-1)
					if(data.result == 0){
						
					}else{
						new Toast({context:$('body'),message:decodeURI(data.content)}).show(); 
					}
				},
				error: function(){
					history.go(-1)
					new Toast({context:$('body'),message:'网络故障'}).show(); 
				}
			})
		}else{
			history.go(-1)
		}
		
	})
	$("#youhui .bottom li").click(function(){//关闭
		$(".mask").css("display","none");
		$(this).parents(".masktop").slideUp();
	})
	$("#hongbao .bottom li").click(function(){//关闭
		$(".mask").css("display","none");
		$(this).parents(".masktop").slideUp();
	})
	$("#youhui .bottom li").eq(0).click(function(){//清空
		$(".mask").css("display","none");
		$(this).parents(".masktop").slideUp();
		$(".youhuiquan .right").text("请选择优惠券");
		$(".youhuiquan").attr("user_coupon_id",-1);
		$("#youhui li").removeAttr("oldclick");
	})
	$("#hongbao .bottom li").eq(0).click(function(){//清空
		$(".mask").css("display","none");
		$(this).parents(".masktop").slideUp();
		$(".hongbao .right").text("请选择红包");
		$(".hongbao").attr("user_coupon_id",-1);
		$("#hongbao li").removeAttr("oldclick");
	})
	$(".youhuiquan").click(function(){//打开优惠券
		if($("#youhui .main").find("li").length == 0){
			new Toast({context:$('body'),message:'暂无可用优惠券'}).show(); 
		}else{
			$(".mask").css("display","block");
			$("#youhui").slideDown();
		}
		
	})
	$(".hongbao").click(function(){//打开红包
		if($("#hongbao .main").find("li").length == 0){
			new Toast({context:$('body'),message:'暂无可用红包'}).show(); 
		}else{
			$(".mask").css("display","block");
			$("#hongbao").slideDown();
		}
	});
	$("#hongbao").delegate(".btn","click",function(){
		if($(this).parents("li").attr("oldclick")==1){
			new Toast({context:$('body'),message:'您正在使用该红包'}).show(); 
		}else{
			$(".hongbao .right").html($(this).parents("li").children("p").eq(1).text())
			$(".mask").css("display","none");
			var gift_card_id = $(this).parents("li").attr("gift_card_id");
			$(".hongbao ").attr("user_gift_card_id",gift_card_id);
			$("#hongbao").slideUp();
			var a = $(".xiaoji .right").attr("money");
			var b = $(".footer a").attr("money");
			var c= $(".hongbao .right").html();
			var xiaoji = (parseFloat(a.substring(1,a.length))-parseFloat(c.substring(1,c.length))).toFixed(2);
			var zongji = (parseFloat(b.substring(1,b.length))-parseFloat(c.substring(1,c.length))).toFixed(2);
			//$(".xiaoji .right").text("￥"+xiaoji);
			$(".footer a").text("￥"+zongji);
			$("#hongbao").find("li").attr("oldclick",-1);
			$(this).parents("li").attr("oldclick",1);
		}
	})
	$("#youhui").delegate(".btn","click",function(){
		var moneyy = parseInt($(".xiaoji .right").attr("moneyy"));
		var parameter_second = parseInt($(this).parents("li").attr("parameter_second")/100);
		var parameter_first = parseInt($(this).parents("li").attr("parameter_first")/100);
		if(moneyy >=parameter_first){
			if($(this).parents("li").attr("oldclick")==1){
				new Toast({context:$('body'),message:'您正在使用该优惠券'}).show(); 
			}else{
				$(".youhuiquan .right").html($(this).parents("li").children("p").eq(1).text())
				$(".mask").css("display","none");
				var coupon_id = $(this).parents("li").attr("coupon_id");
				$(".youhuiquan").attr("user_coupon_id",coupon_id);
				$("#youhui").slideUp();
				$("#youhui").find("li").attr("oldclick",-1);
				$(this).parents("li").attr("oldclick",1);
				var b = $(".footer a").attr("money");
				var zongji = (parseFloat(b.substring(1,b.length))-parameter_second).toFixed(2);
				$(".footer a").text("￥"+zongji);
			}
		}else{
			new Toast({context:$('body'),message:'您不可使用该优惠券'}).show();
		}
		
	})
	$(".dizhi").click(function(){
		window.location.href = "address.html"
	})
	$(".jiesuan").click(function(){//提交订单
		var order_addr_id = $(".dizhi").attr("order_addr_id");
		if(order_addr_id ==''||order_addr_id==null||order_addr_id==undefined||order_addr_id==-1){
			new Toast({context:$('body'),message:'请选择收货地址'}).show(); 
		}else{
			var user_coupon_id = $(".youhuiquan").attr("user_coupon_id");
			var user_gift_card_id = $(".hongbao").attr("user_gift_card_id");
			$.ajax({
				type: ajaxtype,
				url: submitorder,
				dataType: "jsonp",
				data:{
					user_id:user_id,
					order_addr_id:order_addr_id,
					user_coupon_id:user_coupon_id,
					user_gift_card_id:user_gift_card_id
				},
				contentType: "application/json",
				jsonp: "jsonpCallback",
				jsonpCallback:"submitorder",
				success: function(data){
					console.log(data)
					if(data.result == 0){
						var order_id = data.order_id;
						var wxurl = window.location.href;
							$.ajax({
								type: ajaxtype,
								url: payforwx,
								dataType: "jsonp",
								data:{
									order_id:order_id,
									wxurl:wxurl
								},
								contentType: "application/json",
								jsonp: "jsonpCallback",
								jsonpCallback:"payforwx",
								success: function(data){
									console.log(data)
									wx.config({
									    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
									    appId: appid, // 必填，公众号的唯一标识
									    timestamp:data.timeStamp , // 必填，生成签名的时间戳
									    nonceStr: data.nonceStr, // 必填，生成签名的随机串
									    signature: data.signature,// 必填，调用js签名，见附录1
									    jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
									});
									wx.ready(function(){
										wx.chooseWXPay({
								            appId: appid,
								            timestamp: data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
								            nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
								            package: data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
								            signType: data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
								            paySign: data.paySign , // 支付签名
								            success: function (res) {
								                if(res.errMsg == "chooseWXPay:ok" ) {
													window.location.href ="../order.html?orderIndex=0"
								                   
								                }else{
								                   new Toast({context:$('body'),message:decodeURI("支付失败")}).show(); 
								                }
								            },
								            cancel:function(res){
								                //支付取消
								                window.location.href ="../order.html?orderIndex=1"
								            }
								        });
									})
									
								},
								error: function(){
									
								}
							})
						
						
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

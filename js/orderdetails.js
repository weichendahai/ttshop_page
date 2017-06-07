$(function(){
	//ajax
	var order_id = Request.QueryString("order_id");
	var user_id = localStorage.getItem("user_id")
	$.ajax({
			type: ajaxtype,
			url: getorderinfo,
			dataType: "jsonp",
			data:{
				user_id:user_id,
				order_id:order_id
			},
			contentType: "application/json",
			jsonp: "jsonpCallback",
			jsonpCallback:"getorderinfo",
			success: function(data){
				if(data.result == 0){
					console.log(data)
					var content = data.content;
					var express_code = data.content.express_code;//物流编号
					console.log(express_code)
					if(express_code ==''||express_code ==null||express_code==undefined){
						
						$(".wuliuzhuangtai").children("p").html("暂无物流信息");
					}else{
						$(".wuliuzhuangtai").attr("express_code",express_code);
						$(".wuliuzhuangtai").children("p").html("物流单号："+express_code);
					}
					if(content.order_state==0){
						var order_state = "待付款"
						$(".wuliuzhuangtai").css("display","none");
						
					}else if(content.order_state==1){
						var order_state = "待发货";
						$(".wuliuzhuangtai").children("p").text("暂无物流信息");
					}else if(content.order_state==2){
						var order_state = "待收货"
					}else if(content.order_state==3){
						var order_state = "已完成"
					}
					$(".zhuangtai p").eq(0).text(order_state);
					$(".zhuangtai p").eq(1).text("订单号："+content.order_code);
					$(".zhuangtai p").eq(2).text("下单时间："+content.create_date);
					$(".lianxiren p").text("收货人："+decodeURI(content.contact));
					$(".lianxiren .phone").text(content.mobile_phone);
					$(".dizhis").text(decodeURI(content.address) );
					
					
					var str ='';
					for(var i =0;i<content.items.length;i++){
						
						var price = (content.items[i].item_price/100).toFixed(2);
						str +='<div class="product" order_item_id ="'
							+content.items[i].order_item_id+
							'" item_id="'+content.items[i].item_id+'"><div class="productimg"><img src="'
							+content.items[i].item_icon+
							'"/></div><div class="productdetails"><div class="top"><h3>'
							+decodeURI(content.items[i].item_name)+
							'</h3><span>￥'
							+price+
							'</span></div><div class="bottom"><span class="left">'
						for(var k=0;k<content.items[i].item_propertys.length;k++){
							if(k == content.items[i].item_propertys.length-1){
								str+=decodeURI(content.items[i].item_propertys[k].item_property_desc);
							}else{
								str+= decodeURI(content.items[i].item_propertys[k].item_property_desc)+",";
							}
						}
						str+='</span><span class="right">x'
							+content.items[i].item_count+
							'</span></div></div>'
						if(content.items[i].item_state == 0){
							str+='<div class="return" id="return">申请退货</div></div>'
						}else{
							str+='<div class="return">已申请退货</div></div>'
						}
						
					}
					var allprice = (content.order_total/100).toFixed(2);
					var freight = (content.freight/100).toFixed(2);
					str+='<div class="jiesuan"><p class="xiaoji "><span class="left">小计</span><span class="right">￥'
							+allprice+
						'</span></p><p class="yunfei "><span class="left">运费</span><span class="right">￥'
							+freight+
						'</span></p><p class="gongji "><span class="left">共计</span><span class="right">￥'
							+((content.order_total+content.freight)/100).toFixed(2)+
						'</span></p></div><div order_code="'+content.order_id+'" class="pay paycancel">支付订单</div><div order_code="'+content.order_id+'" class="cancel paycancel">取消订单</div>'

					
					$(".order").append(str);
					if(content.order_state==0){
						$(".paycancel").css("display","block");
						$(".return").css("display","none");

					}
				}else{
					new Toast({context:$('body'),message:decodeURI(data.content)}).show(); 
				}
			},
			error: function(){
				new Toast({context:$('body'),message:'网络故障'}).show(); 
			}
		})
	$(".order").delegate("#return","click",function(event){
		var item_id = $(this).parents(".product").attr("item_id");
		var order_item_id = $(this).parents(".product").attr("order_item_id");
		var oneprice = $(this).parents(".product").find(".top").children("span").text();
		var count = $(this).parents(".product").find(".bottom").children(".right").text()
		var price = "￥"+(parseFloat(oneprice.substring(1,oneprice.length))*parseFloat(count.substring(1,count.length))).toFixed(2);
		window.location.href = "gotoreturn.html?item_id="+item_id+"&order_item_id="+order_item_id+"&order_id="+order_id+"&price="+price;
		event.stopPropagation()
	})
	
	//商品详情
	
	$(".order").delegate(".product","click",function(){
		var item_id = $(this).attr("item_id");
		window.location.href = "productdetails.html?item_id="+item_id;
	})
	$(".order").delegate(".cancel","click",function(){
		var order_code = $(this).attr("order_code");
		if (confirm("取消该条订单？")){
			$.ajax({
				type: ajaxtype,
				url: cancelorder,
				dataType: "jsonp",
				data:{
					user_id:user_id,
					order_id:order_code
				},
				contentType: "application/json",
				jsonp: "jsonpCallback",//键  没什么用
				jsonpCallback:"cancelorder",//键值    给后台的函数名
				beforeSend:function(){},
				success: function(data){
					console.log(data)
					if(data.result == 0){
						window.location.href = "../order.html?orderIndex=0"
					}else{
						new Toast({context:$('body'),message:decodeURI(data.content)}).show();
					}
				},
				error: function(){
					alert(2)
					new Toast({context:$('body'),message:'网络错误'}).show();
				}
			});
		}else{
			
		} 
	})
	$(".order").delegate(".pay","click",function(){
		 var order_code = $(this).attr("order_code");
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
			            }
			        });
				})
				
			},
			error: function(){
				
			}
		})
	})
})

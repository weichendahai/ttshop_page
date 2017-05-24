$(function(){
	var shoppingcar = localStorage.getItem('shoppingcar');
	if(shoppingcar ==null){
		shoppingcar = 0;
	}
	$("footer .num").text(shoppingcar);
	var user_id =localStorage.getItem("user_id");
	//ajax
	$.ajax({
		type: ajaxtype,
		url: getuserinfo,
		dataType: "jsonp",
		data:{user_id:user_id},
		contentType: "application/json",
		jsonp: "jsonpCallback",
		jsonpCallback:"getuserinfo",
		success: function(data){
			console.log(data)
			if(data.result == 0){
				var content = data.content;
				var imgstr = content.head_image_addr;
				$(".touxiang").html('<img src="'+imgstr+'" onerror="this.src='+errorheadimg2+';"/>');
				localStorage.setItem("imgstr",imgstr);
				$(".name").text(decodeURI(content.nickname));
				//分享金额
				var shard_bonus = content.shard_bonus;
				//点评金额
				var evaluate_bonus = content.evaluate_bonus;
				if(evaluate_bonus>=shard_bonus){
					$(".VIP p").text("点评达人")
				}else{
					$(".VIP p").text("分享达人")
				}
				
			}else{
				new Toast({context:$('body'),message:decodeURI(data.content)}).show(); 
			}
		},
		error: function(){
			new Toast({context:$('body'),message:'网络故障'}).show(); 
		}
	})
	//setting
	$(".setting").click(function(){
		window.location.href = "html/setting.html"
	})
	//跳转
	$(".allorder").click(function(){
		window.location.href ="order.html?orderIndex=0"
	});
	$(".orderfenlei dl").eq(0).click(function(){
		window.location.href ="order.html?orderIndex=1"
	})
	$(".orderfenlei dl").eq(1).click(function(){
		window.location.href ="order.html?orderIndex=2"
	})
	$(".orderfenlei dl").eq(2).click(function(){
		window.location.href ="order.html?orderIndex=3"
	})
	$(".orderfenlei dl").eq(3).click(function(){
		window.location.href ="order.html?orderIndex=4"
	})
	$(".orderfenlei dl").eq(4).click(function(){
		window.location.href ="renturnproduct.html"
	})
	$(".main li").eq(0).click(function(){
		window.location.href = "Listdelists.html?fenlei=dianping&user_id="+user_id;
	});
	$(".main li").eq(1).click(function(){
		window.location.href = "Listdelists.html?fenlei=fenxiang&user_id="+user_id;
	})
	$(".main li").eq(2).click(function(){
		window.location.href = "html/manageaddress.html"
	})
	$(".main li").eq(3).click(function(){
		window.location.href = "html/hongbao.html"
	})
	$(".main li").eq(4).click(function(){
		window.location.href = "html/youhuiquan.html"
	})
	$(".main li").eq(5).click(function(){
		window.location.href = "html/yongjin.html"
	})
	$(".main li").eq(6).click(function(){
		window.location.href = "html/myfeedback.html"
	})
})

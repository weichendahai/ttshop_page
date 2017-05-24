$(function(){
	var user_id = localStorage.getItem("user_id");
	var cartItemId;
	var buytype =1;
	var shoppingcar = 0;//购物车数量
	getcart();
	//跳转
	$(".shangpin ").on("tap","li",function(){
		var item_id = $(this).attr("item_id");
		window.location.href ="html/productdetails.html?item_id="+item_id;
	});
	$(".jiesuan .right").click(function(){
		
		var cart_item_ids='';
		if($(".check").length ==0){
			new Toast({context:$('body'),message:"您未勾选任何商品"}).show(); 
		}else{
			for(var i = 0;i<$(".check").length;i++){
				if(i == $(".check").length-1){
					cart_item_ids+=$(".check").eq(i).attr("cartItemId");
				}else{
					cart_item_ids+=$(".check").eq(i).attr("cartItemId")+"~";
				}
			}
			window.location.href = "html/jiesuan.html?cart_item_ids="+cart_item_ids+"&buytype="+buytype;
		}
		
	})
	
	//购物车加减
	var shopnum ;
//	$(".shangpin").on('input propertychange',"#num",function(event){
//		shopnum = $(this).val();
//		if(shopnum==''){
//			shopnum=1;
//		}
//		shoppingcar = shoppingcar+shopnum-1;
//		cartItemId = $(this).parents("li").attr("cartItemId");
//		var obj = $(this);
//		modifycar(obj);
//		obj.parent(".num").children("#num").val(shopnum);
//		$("footer .num").text(shoppingcar);
//		localStorage.setItem("shoppingcar",shoppingcar);
//		jiage();
//		event.stopPropagation()
//	})
	$(".shangpin").on("tap","#num",function(event){
		event.stopPropagation();
	})
	$(".shangpin").on("tap",".jian",function(event){
		
		shopnum = $(this).parent(".num").children("#num").val();
		
		cartItemId = $(this).parents("li").attr("cartItemId");
		var obj = $(this);
		if(shopnum<=1){
			if(confirm("删除商品？")==true){
				shopnum--;
				shoppingcar--;
				modifycar(obj);
			}
		}else{
			shopnum--;
			shoppingcar--;
			modifycar(obj);
		}
		obj.parent(".num").children("#num").val(shopnum);
		
		$("footer .num").text(shoppingcar);
		localStorage.setItem("shoppingcar",shoppingcar);
		jiage();
		event.stopPropagation();
	})
	$(".shangpin").on("tap",".jia",function(event){
		shopnum = $(this).parent(".num").children("#num").val();
		
		cartItemId = $(this).parents("li").attr("cartItemId");
		var obj = $(this);
//		if(shopnum >= 99){
//			new Toast({context:$('body'),message:"超过数量限制"}).show(); 
//		}else{
//			shopnum++
//			shoppingcar++;
//			modifycar(obj);
//		}
		shopnum++
		shoppingcar++;
		modifycar(obj);
		obj.parent(".num").children("#num").val(shopnum);
		
		$("footer .num").text(shoppingcar);
		localStorage.setItem("shoppingcar",shoppingcar);
		
		jiage();
		event.stopPropagation();
	})
	
	//全选
	$(".youhui .quanxuan .iconfont").click(function(){
		if($(this).hasClass("checkall")){//如果是全选状态
			$(this).removeClass("checkall");
			$(".shangpin li").removeClass("check");
			$(this).html("&#xe653;")
			$(".shangpin li .iconfont").html("&#xe653;")
			jiage();
		}else{
			$(this).addClass("checkall");
			$(".shangpin li").addClass("check");
			$(this).html("&#xe616;");
			$(".shangpin li .iconfont").html("&#xe616;");
			jiage();
		}
	})
	//单选
	$(".shangpin").on("tap",".iconfont",function(event){
		if($(this).parent("li").hasClass("check")){//如果是选中状态
			$(".youhui .quanxuan .iconfont").html("&#xe653;")
			$(".youhui .quanxuan .iconfont").removeClass("checkall");
			$(this).parent("li").removeClass("check");
			$(this).html("&#xe653;")
			jiage();
		}else{
			
			$(this).parent("li").addClass("check");
			$(this).html("&#xe616;");
			jiage();
		}
		event.stopPropagation()
	})
	//价钱
	function jiage(obj){
		var money = 0;
		for(var i = 0;i<$(".check").length;i++){
			money = parseFloat($(".check").eq(i).find(".money").children('a').text()*$(".check").eq(i).find("#num").val())+money;
		}
		$(".jiesuan .left span").eq(2).text(money.toFixed(2));
	}
	
	//倒计时
	function leftTime(a,b){
		var set = setInterval(function(){
			var endTime = new Date(b);//结束时间
		    var curTime = new Date();//当前时间
		    var leftTime = parseInt((endTime.getTime() - curTime.getTime())/1000);//获得时间差秒数
		    //小时、分、秒需要取模运算
		    var d = parseInt(leftTime/(60*60*24));
		    if(d<10){
		    	d = "0"+d
		    	
		    }
		    var h = parseInt(leftTime/(60*60)%24);
		    if(h<10){
		    	h = "0"+h
		    	
		    }
		    var m = parseInt(leftTime/60%60);
		    if(m<10){
		    	m = "0"+m
		    	
		    }
		    var s = parseInt(leftTime%60);
		    if(s<10){
		    	s = "0"+s
		    }
		    var ms = parseInt(((endTime.getTime() - curTime.getTime())/100)%10); // 这样确认毫秒数是一位
		    var txt =h+":"+m+":"+s;
		    a.innerHTML = txt;
		   	if(leftTime<=0){ 
		    	//倒计时结束回调函数
		    	a.innerHTML= "计时结束";
		    	shopnum = 0;
		    	var obj = a.parentNode.parentNode.parentNode.parentNode;
		    	obj.remove();
		    }
		},100)
	    
 	};
 	//购物车加减
 	function modifycar(obj){
		var item_count = shopnum;
		$.ajax({
			type: ajaxtype,
			url: modifycartitem,
			dataType: "jsonp",
			data:{
				user_id:user_id,
				cart_item_id:cartItemId,
				item_count:item_count
			},
			contentType: "application/json",
			jsonp: "jsonpCallback",
			jsonpCallback:"modifycartitem"+RndNum(4),
			success: function(data){
				
				if(data.result == 0){
					if(item_count == 0){
						obj.parents("li").remove();
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
	//获取购物车
	function getcart(){
		$.ajax({
			type: ajaxtype,
			url: getcartitems,
			dataType: "jsonp",
			data:{
				user_id:user_id,
			},
			contentType: "application/json",
			jsonp: "jsonpCallback",
			jsonpCallback:"getcartitems",
			beforeSend:function(){
				$(".mui-table-view ").html("<p class='load'>加载中...</p>")
			},
			success: function(data){
				console.log(data)
				if(data.result == 0){
					shoppingcar = 0
					
					console.log(data.content)
					var content = data.content;
					if(content ==''){
						var str = '<img src ="img/kong.png" style="display:block;margin:0 auto;width:50%;"/><p style="text-align:center;height:1rem;line-height:1rem;">暂无此类订单</p>'
						$(".mui-table-view").html(str)
					}else{
						var str = '';
						
						for(var i = 0;i<content.items.length;i++){
							console.log(content.items[i])
							var price = (content.items[i].item_price/100).toFixed(2);
							str+='<li class="check" cartItemId ="'
							+content.items[i].cart_item_id+
							'" item_id = "'
							+content.items[i].item_id+
							'"><span class="iconfont">&#xe616;</span><div class="xiangqing"><img src = "'
							+content.items[i].item_icon+
							'"/><div class="center"><h5>'
							+decodeURI(content.items[i].item_name)+
							'</h5><p class="xinghao">'
							for(var j = 0;j<content.items[i].item_propertys.length;j++){
								if(j == content.items[i].item_propertys.length-1){
									str+= decodeURI(content.items[i].item_propertys[j].item_property_desc)
								}else{
									str+= decodeURI(content.items[i].item_propertys[j].item_property_desc)+","
								}
								
							}
							str +='</p><p><span class="money">￥<a>'
							+price+
							'</a></span><span class="daojishi"></span></p></div><div class="num"><span class="jian">-</span><input type="number" readonly="readonly" name="num" id="num" value="'
							+content.items[i].item_count+
							'"/><span class="jia">+</span></div></div></li>'
							
							shoppingcar = shoppingcar+content.items[i].item_count;
							}
							$("footer .num").text(shoppingcar);
							localStorage.setItem("shoppingcar",shoppingcar);
						$(".shangpin").html(str);
						
						for(var i = 0;i<content.items.length;i++){
							var b = content.items[i].end_time;
							var a = document.getElementsByClassName("daojishi")[i];
							//set.push("set"+i);
							leftTime(a,b)
						}
						
						//钱
						jiage();
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


$(function(){
	var page = 0;
	var item_id = Request.QueryString("item_id");//产品id
	var buytype =0;
	var evaluate_shared_id = Request.QueryString("evaluate_shared_id");
	var share = Request.QueryString("share");
	var user_id = localStorage.getItem("user_id");
	var property_price_key =[];
	var property_price_value =[];
	var shoppingcar = localStorage.getItem('shoppingcar');
	if(shoppingcar ==null){
		shoppingcar = 0;
	}
	$(".footer .num").text(shoppingcar)
	if(share == -1){
		getCodeForWechat()
	}else{
		
	}
	$("#goback").click(function(){
		if(share == -1){
			window.location.href = "http://h5.ciaotalking.com"
		}else{
			history.go(-1)
		}
	})
	//获取商品描述
	$.ajax({
		type: ajaxtype,
		url: getiteminfo,
		dataType: "jsonp",
		data:{
			user_id:user_id,
			item_id:item_id,
			evaluate_shared_id:evaluate_shared_id
			},
		contentType: "application/json",
		jsonp: "jsonpCallback",
		jsonpCallback:"getiteminfo",
		success: function(data){
			console.log(data)
			if(data.result == 0){
				var property_prices_keys = data.content.property_prices_key;
				var property_prices_values = data.content.property_prices_value;
				property_price_key.push(property_prices_keys);//规格价格
				property_price_value.push(property_prices_values);//规格价格
				var content = data.content;
				var imgstr = content.item_icon;//图片地址
				var price = (content.price/100).toFixed(2);//保留两位小数 string
				var item_price_discount = "￥"+(data.content.item_price_discount/100).toFixed(2);
				var item_state = data.content.item_state;
				$(".footer").attr("item_state",item_state);
				if(item_state!=1){
					$(".productdetails-productprice").text("商品已下架！");//价钱
				}else{
					$(".productdetails-productprice").text("￥"+price);//价钱
				}
				$(".footer li").eq(2).attr("item_price_discount",item_price_discount);
				$(".productdetails-productLeft img").attr("src",imgstr)
				$(".productdetails-productitle").text(decodeURI(content.item_name));//产品姓名
				$(".productdetails-productbuycomment span").eq(0).text( content.order_count+"人购买");//购买数量
				$(".productdetails-productbuycomment span").eq(2).text( content.evaluate_count+"人评价");//购买数量
				//产品型号
				var propertysstr = '';
				for(var i = 0;i<content.propertys.length;i++){
					
					propertysstr+='<div class="xinghao1" property_key ="'
						+content.propertys[i].property_key+
						'"><p class="title">选择'
						+decodeURI(content.propertys[i].property_key_desc)+
							'</p>'
					for(var j = 0;j<content.propertys[i].values.length;j++){
						if(j == 0){
							propertysstr+='<span class="check" property_value = "'
								+content.propertys[i].values[j].property_value+
								'">'
								+decodeURI(content.propertys[i].values[j].property_desc)+
								'</span>'
						}else{
							propertysstr+='<span property_value = "'
								+content.propertys[i].values[j].property_value+
								'">'
								+decodeURI(content.propertys[i].values[j].property_desc)+
								'</span>'
						}
						
						
					}	
					propertysstr+='</div>'
					
				}
				$(".xinghaobox").append(propertysstr)
				
				//评分
				var score = (content.grade/10).toFixed(1);
				$(".productcommentitle span").text(score+"分");
				var starhalf = Math.round(content.grade/10)%2;//半星
				var staron = Math.floor(content.grade/10/2);  //整星
				var staroff = 5-staron-starhalf;    //无星
				console.log(staroff)
				var starstr="";
				for	(var j=0;j<staron;j++){
					starstr +='<span><img src="../image/score_1.png"/></span>'
				}
				if(starhalf == 1){//判断有没有半颗星
					starstr +='<span><img src="../image/score_3.png"/></span>'
				}
				if(staroff >0){//判断有没有星
					for	(var j=0;j<staroff;j++){
						starstr +='<span><img src="../image/score_2.png"/></span>'
					}
				}
				starstr+='<p>'+score+'分</p>'
				$(".productdetails-productscore").html(starstr)//评分
				var gongxiaostr = decodeURI(content.item_desc);
				$(".productgongxiao").text(gongxiaostr)//功效
				//产品参数
				var distributionsstr = '';//年龄比例肤质
				for(var i = 0;i<content.distributions.length;i++){
					distributionsstr+='<p><span>'
									+decodeURI(content.distributions[i].distribution_type_desc)+"："+
									'</span><a>'
					var count = 0;//总数量
					for(var j= 0;j<content.distributions[i].distribution_value.length;j++){
						count = count+content.distributions[i].distribution_value[j].distribution_count
					}
					for(var j= 0;j<content.distributions[i].distribution_value.length;j++){
						distributionsstr+='<i>'
						+decodeURI(content.distributions[i].distribution_value[j].distribution_sub_desc)+
						' - '
						+((content.distributions[i].distribution_value[j].distribution_count/count)*100).toFixed(2)+
						'%</i>'
					}
					distributionsstr+='</a></p>'	
				}
				$(".procuctdistribution").append(distributionsstr);
			}else{
				new Toast({context:$('body'),message:decodeURI(data.content)}).show(); 
			}
			
		},
		error: function(){
			new Toast({context:$('body'),message:'网络故障'}).show(); 
		}
	});
	//商品评价
	getitemevaluate();
	function getitemevaluate(){
		$.ajax({
			type: ajaxtype,
			url: getitemevaluatelist,
			dataType: "jsonp",
			data:{
				item_id:item_id,
				page_no:page
			},
			contentType: "application/json",
			jsonp: "jsonpCallback",
			jsonpCallback:"getitemevaluatelist",
			success: function(data){
				console.log(data)
				if(data.result == 0){
					var evaluates = data.content.evaluates;
					$(".gotocomment").attr({'item_id':data.content.item_id})//设置一个商品ID属性
					var nowdate = new Date();
					var str = '';
					if(evaluates ==''){
						var str = '<img src ="../img/kong.png" style="display:block;margin:0 auto;width:50%;"/><p style="text-align:center;height:1rem;line-height:1rem;">暂无点评记录</p>'
						
					}else{
						for(var i =0;i<evaluates.length;i++){
							var brithday = evaluates[i].user_date_of_birth;
							var age =nowdate.getFullYear() - brithday.substr(0,4);//年龄
							var commentdata = evaluates[i].create_date.split(" ")[0];//点评日期
							str +='<div class="listdetails" evaluate_id="'
									+evaluates[i].evaluate_id+
									'"><div class="detailsLeft"><img src="'
									+evaluates[i].user_head_image_addr+
									'" onerror="this.src='+errorheadimg+';"/></div><div class="detailsRight"><div class="details-top"><p class="name">'
									+decodeURI(evaluates[i].user_nickname)+
									'</p><p class="age"><span>'
									+age+
									'岁</span></p><p class="time">'
									+commentdata+
									'</p></div><div class="details-center"><div class="fenshu iconfont"  id="fenshu">'
							var starhalf = Math.round(evaluates[i].grade/10)%2;//半星
							var staron = Math.floor(evaluates[i].grade/10/2);  
							var staroff = 5-staron-starhalf;
						for	(var j=0;j<staron;j++){
							str +='<img class="star" src="../image/score_1.png"/>'
						}
						if(starhalf == 1){//判断有没有半颗星
							str +='<img class="star" src="../image/score_3.png"/>'
						}
						if(staroff >0){//判断有没有星
							for	(var j=0;j<staroff;j++){
								str +='<img class="star" src="../image/score_2.png"/>'
							}
						}  
						str +=	'</div><div class="youdian"><span>优点：</span>'
								+decodeURI(evaluates[i].item_advantage)+	
								'</div><div class="quedian"><span>缺点：</span>'
								+decodeURI(evaluates[i].item_disadvatage)+
								'</div></div><div class="pic-vid">'
								if(evaluates[i].evaluate_image_addr){
									var evaluate_image_addr =evaluates[i].evaluate_image_addr;
									evaluate_image_addr =evaluate_image_addr.split(";");
									for(var j =0;j<evaluate_image_addr.length;j++){
										str +='<div class="imgdiv"><img src="'+evaluate_image_addr[j]+'"/></div>';
									}
								}
								
							str+='</div><div class="share"><span class="iconfont">&#xe63a;</span> 分享闺蜜评价</div></div></div>'
						}
					}
					if(page == 0){
						$(".productcomment").html(str);
					}else{
						$(".productcomment").append(str);
					}
					var next_page_no = data.content.next_page_no;
					if(next_page_no<0){
						mui('#pullrefresh').pullRefresh().endPullupToRefresh(true); //参数为true代表没有更多数据了。
					}else{
						mui('#pullrefresh').pullRefresh().endPullupToRefresh(false); //参数为true代表没有更多数据了。
					}
					if($(".imgdiv")){
						$(".pic-vid img").load(function(){
							for(var i =0;i<$(".imgdiv").length;i++){
								var imgdivwidth = $(".imgdiv").eq(i).width();
								var imgdivheight = imgdivwidth;
								var imgwidth = $(".imgdiv").eq(i).children("img").width();
								var imgheight = $(".imgdiv").eq(i).children("img").height();		
								if(imgheight<imgwidth){
									$(".imgdiv").eq(i).children("img").css("height","100%");
								}else{
									$(".imgdiv").eq(i).children("img").css("width","100%");
								}
								$(".imgdiv").eq(i).css("height",imgdivheight);
							}
						})
					}
					
				}else{
					new Toast({context:$('body'),message:decodeURI(data.content)}).show();
				}
			},
			error: function(){
				new Toast({context:$('body'),message:'网络故障'}).show();
			}
		});
	}
	//上拉下拉
	mui.init({
		pullRefresh: {
			container: '#pullrefresh',
			down : {
		      height:50,//可选,默认50.触发下拉刷新拖动距离,
		      auto: false,//可选,默认false.自动下拉刷新一次
		      contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
		      contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
		      contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
		      callback :pullfresh//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
		   	},
			up: {
				contentrefresh: '正在加载...',
				contentnomore:'没有更多数据了',
				callback: pullupRefresh
			}
		}
	});
	function pullfresh(){
		page = 0;
		setTimeout(function() {
			getitemevaluate();
			mui('#pullrefresh').pullRefresh().endPulldownToRefresh();//结束刷新
		},1500)
		
	}
	function pullupRefresh() {
		page++;
		setTimeout(function() {
			getitemevaluate();
		}, 1500);
	}
	//open 功效
	$(".productdetails .productdetails-productRight .productdetails-productbuycomment").on("tap","span:eq(3)",function(){
		if($(this).find("a").hasClass("open")){
			$(this).find("a").removeClass("open");
			$(this).find("span").text("详情");
			$(".productgongxiao").stop().slideUp(200);
		}else{
			$(this).find("a").addClass("open");
			$(this).find("span").text("收起");
			$(".productgongxiao").stop().slideDown(200);
		}
	})
	//显示大图
	$(".productcomment").on("tap",".imgdiv",function(event){
		var src = $(this).find("img").attr("src");
		$(".bigimg img").attr("src",src);
		$(".bigimg").css("display","block");
		var _height = $(".bigimg img").height();
		$(".bigimg img").css("margin-top",-_height/2);
		event.stopPropagation();
	});
	$(".bigimg").click(function(){
		$(this).css("display","none");
	});
	//点击朦层取消朦层
	$("body").delegate(".wxmask","click",function(){
		$(this).remove();
		$(".wxmaskimg").remove();
	})
	//分享
	$(".productcomment").on("tap",".share",function(event){
		wxmaskshow();
		var evaluate_id =$(this).parents(".listdetails").attr("evaluate_id");
		goshare(user_id,evaluate_id);
		event.stopPropagation();
	});
	//点评
	$(".footer li").eq(1).click(function(){
		localStorage.setItem("item_id",item_id);
		localStorage.setItem("productname",$(".productdetails-productitle").text());
		localStorage.setItem("productmoney",$(".productdetails-productprice").text());
		localStorage.setItem("productimg",$(".productdetails-productLeft img").attr("src"));
		localStorage.setItem("item_price_discount",$(this).attr("item_price_discount"));
		window.location.href = "../comment.html";
	});
	//点评详情
	$(".productcomment").on("tap",".listdetails",function(){
		var evaluate_id = $(this).attr("evaluate_id");
		localStorage.setItem("details-tophtml",$(this).find(".details-top").html());
		window.location.href = "productcommentdetalis.html?evaluate_id="+evaluate_id;
	})
	//选择型号
	$(".xinghaobox").on("tap","span",function(){
		$(this).parents(".xinghao1").children("span").css({
			"background":"#fff",
    		"color": "#000",
    		"border-color": "#b9b9b9"
    		})
		$(this).css({
			"background":"#fff",
    		"color": "#fe547b",
    		"border-color": "#fe547b"
    	})
		$(this).parents(".xinghao1").children("span").removeClass("check");
		$(this).addClass("check");
		var property_pricethis ="";
		var xinghaoprice;
		for(var i =0;i<$(".xinghaobox .xinghao1").length;i++){
			if(i ==$(".xinghaobox .xinghao1").length-1){
				property_pricethis += $(".xinghao1").eq(i).attr("property_key")+":"+$(".xinghao1").eq(i).children(".check").attr("property_value")
			}else{
				property_pricethis += $(".xinghao1").eq(i).attr("property_key")+":"+$(".xinghao1").eq(i).children(".check").attr("property_value")+"/"
			}
		}
		for(var i =0;i<property_price_key[0].length;i++){
			if(property_pricethis ==property_price_key[0][i]){
				console.log(property_price_value[0][i])
				xinghaoprice = (property_price_value[0][i]/100).toFixed(2);
				console.log(xinghaoprice)
				if($(".footer").attr("item_state")!=1){
					$(".productdetails-productprice").text("商品已下架！");
				}else{
					$(".productdetails-productprice").text("￥"+xinghaoprice);
				}
				
			}
		}
	})
	//立即购买
	$(".footer li").eq(2).click(function(){
		if($(".footer").attr("item_state")!=1){
			new Toast({context:$('body'),message:'商品已下架！'}).show();
		}else{
			var cart_item_ids = item_id+",";
			//alert($(".xinghao1").length)
			for(var i = 0;i<$(".xinghao1").length;i++){
				if(i == $(".xinghao1").length-1){
					cart_item_ids+=$(".xinghao1").eq(i).attr("property_key")+","
				}else{
					cart_item_ids+=$(".xinghao1").eq(i).attr("property_key")+"-"
				}
			}
			for(var i = 0;i<$(".xinghao1").length;i++){
				if(i == $(".xinghao1").length-1){
					cart_item_ids+=$(".xinghao1").eq(i).find(".check").attr("property_value")
				}else{
					cart_item_ids+=$(".xinghao1").eq(i).find(".check").attr("property_value")+"-"
				}
			}
			var shoppingcar = localStorage.getItem("shoppingcar");
			if(shoppingcar == 0){
				window.location.href = "jiesuan.html?cart_item_ids="+cart_item_ids+"&buytype="+buytype+"&evaluate_shared_id="+evaluate_shared_id;
			}else{
				add();
			}
		}
		
	})
	//加入购物车
	$(".footer li").eq(0).click(function(){
		if($(".footer").attr("item_state")!=1){
			new Toast({context:$('body'),message:'商品已下架！'}).show();
		}else{
			add()
		}
	})
	function add(){
		var property_key ="";
		var property_value ="";
		for(var i =0;i<$(".xinghao1").length;i++){
			if(i == $(".xinghao1").length-1){
				property_key +=$(".xinghao1").eq(i).attr("property_key");
				property_value +=$(".xinghao1").eq(i).children(".check").attr("property_value");
			}else{
				property_key +=$(".xinghao1").eq(i).attr("property_key")+"-";
				property_value +=$(".xinghao1").eq(i).children(".check").attr("property_value")+"-";
			}
			
		}
		$.ajax({
			type: ajaxtype,
			url: additemtocart,
			dataType: "jsonp",
			data:{
				item_id:item_id,
				user_id:user_id,
				evaluate_shared_id:evaluate_shared_id,
				property_key:property_key,
				property_value:property_value
				
			},
			contentType: "application/json",
			jsonp: "jsonpCallback",
			jsonpCallback:"additemtocart",
			success: function(data){
				console.log(data)
				window.location.href = "../gouwuche.html"
			},
			error: function(){
				new Toast({context:$('body'),message:'网络故障'}).show();
			}
		})
	}
})


$(function(){
	//跳转
	getCodeForWechat()
	var property_price_key =[];
	var property_price_value =[];
	var user_id = localStorage.getItem("user_id");
	var evaluate_shared_id = Request.QueryString("evaluate_shared_id");
	var page = 0;
	var season =-1;//最新的一期
		hotitems()
	var item_id;
	$(".search").click(function(){
		window.location.href = "html/search.html"
	});
	$(".lunbo ").on("tap",".swiper-slide",function(){
		item_id = $(this).children(".item_id").text();
		window.location.href = "html/productdetails.html?item_id="+item_id;
	})
	$(".Categorylist").on("tap","dl",function(){
		var searchName = "";
		var category_id = $(this).index()+1;
		window.location.href = "searchresult.html?searchName="+searchName+"&category_id="+category_id;
	})
	$(".burstlist").on("tap",".burstlist-div",function(){
		item_id = $(this).children(".item_id").text();
		window.location.href = "html/productdetails.html?item_id="+item_id;
	})
	$(".CategorylistALL-title").on("tap",".last",function(){
		window.location.href = "html/CategorylistALL.html";
	});
	//点评
	$(".burstlist").on("tap",".dianping",function(event){
		localStorage.setItem("item_id",$(this).parents(".burstlist-div").find(".item_id").text());
		localStorage.setItem("productname",$(this).parents(".right").children(".title").text());
		localStorage.setItem("productmoney",$(this).parents(".right").children(".shop").children("p").text());
		localStorage.setItem("productimg",$(this).parents(".burstlist-div").find(".left").find("img").attr("src"));
		localStorage.setItem("item_price_discount",$(this).attr("item_price_discount"));
		window.location.href = "comment.html";
		event.stopPropagation();
	});
	//分享
	$(".burstlist").on("tap",".share",function(event){
		wxmaskshow2()
		var item_id = $(this).parents(".burstlist-div").find(".item_id").text();
		var item_name = $(this).parents(".right").children(".title").text();
		var item_icon_attr = $(this).parents(".burstlist-div").find(".left").find("img").attr("src");
		sharewxproduct(item_name,item_icon_attr,item_id)
		event.stopPropagation();
	});
	//点击朦层取消朦层
	$("body").delegate(".wxmask","click",function(){
		$(this).remove();
		$(".wxmaskimg").remove();
	})
	
	//上拉下拉
	mui.init({
		pullRefresh: {
			container: '#pullrefresh',
			
			up: {
				contentrefresh: '正在加载...',
				contentnomore:'没有更多数据了',
				callback: pullupRefresh
			}
		}
	});

	
	/**
	 * 上拉加载具体业务实现
	 */
	function pullupRefresh() {
		page++;
		setTimeout(function() {
			hotitems()
		}, 1500);
	}
	//加入购物车开始
		var offset = $("footer li").eq(3).offset();  //结束的地方的元素
		var height = $("footer li").eq(3).height();
		var width = $("footer li").eq(3).width();
		var addcar;
		var img  ;
		var flyer ;
		var left ;
		var top ;
		$(".changexinghao .center").delegate("span","click",function(){
			$(this).parents(".xinghao1").children("span").removeClass("check");
			$(this).addClass("check");
			var property_pricethis ="";
			var xinghaoprice;
			for(var i =0;i<$(".changexinghao .xinghao1").length;i++){
				if(i ==$(".changexinghao .xinghao1").length-1){
					property_pricethis += $(".xinghao1").eq(i).attr("property_key")+":"+$(".xinghao1").eq(i).children(".check").attr("property_value")
				}else{
					property_pricethis += $(".xinghao1").eq(i).attr("property_key")+":"+$(".xinghao1").eq(i).children(".check").attr("property_value")+"/"
				}
			}
			console.log(index)
			for(var i =0;i<property_price_key[index].length;i++){
				if(property_pricethis ==property_price_key[index][i]){
					console.log(property_price_value[index][i])
					xinghaoprice = (property_price_value[index][i]/100).toFixed(2);
					$(".changexinghao .top .money").text("￥"+xinghaoprice);	
				}
			}
			
		})
		var index;
		$(".burstlist").on("tap",".addShoppingcar",function(event){
			index = $(this).parents(".burstlist-div").index();
			console.log(index)
			addcar = $(this);
			img = addcar.parents(".burstlist-div").find("img").attr('src');
			flyer = $('<img class="u-flyer" style="width:50px;height: 50px;z-index:9999;" src="'+img+'">' );
			left = $(this).offset().left;
			top = $(this).offset().top-$(window).scrollTop();
			if($(this).parents(".burstlist-div").attr("item_state")!=1){
				new Toast({context:$('body'),message:"商品已下架！"}).show();
			}else{
				$(".changexinghao .top .topright .title").text(addcar.parents(".burstlist-div").find(".title").text());
				$(".changexinghao .top .topimg img").attr("src",img);
				$(".changexinghao .topright .money").text(addcar.parents(".burstlist-div").find(".shop").find('span').text());
				$(".changexinghao .center").html(addcar.parents(".burstlist-div").find(".xinghaobox").html());
				var xinghaolength = $(this).parents(".box").attr("xinghaolength");
				if(xinghaolength == 0){
					flyer.fly({
						start: {
							left:left,
							top: top,
						},
						end: {
							left: offset.left+width/2,
							top: offset.top+height/2,
							width: 0,
							height: 0
						},
						onEnd: function(){
						}
					});
					add(addcar);
				
				}else{
					$(".mask").css("left",0);
					var _height = $(".changexinghao").height();
					$(".changexinghao").css({"marginTop":-_height/2,"display":"block"});
				}
			}
			event.stopPropagation();
		});
		$(".changexinghao .top span").click(function(){
			$(".mask").css("left","100%");
			$(".changexinghao").css({"display":"none"});
		})
		$(".changexinghao .bottom span").click(function(){
				
			flyer.fly({
				start: {
					left:left,
					top: top,
				},
				end: {
					left: offset.left+width/2,
					top: offset.top+height/2,
					width: 0,
					height: 0
				},
				onEnd: function(){
				}
			});
			add(addcar);
			$(".changexinghao").css({"display":"none"})
			$(".mask").css({"left":"100%"})
		})
		function add(addcar){
			var item_id = addcar.parents(".burstlist-div").find(".item_id").text();
			var property_key ="";
			var property_value ="";
			for(var i =0;i<$(".changexinghao .xinghao1").length;i++){
				
				if(i ==$(".changexinghao .xinghao1").length-1){
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
					if(data.result == 0){
						var num = $(".num").text();//购物车数量
						num++;
						$(".num").text(num);
						//存购物车数量
						localStorage.setItem("shoppingcar",num);
					}else{
						new Toast({context:$('body'),message:decodeURI(data.content)}).show();
					}
					
				},
				error: function(){
					new Toast({context:$('body'),message:'网络故障'}).show();
				}
			})
		}
	//加入购物车结束
	
		
		//获取轮播图列表
		$.ajax({
			type: ajaxtype,
			url: bannerurl,
			dataType: "jsonp",
			contentType: "application/json",
			jsonp: "jsonpCallback",//键  没什么用
			jsonpCallback:"banner",//键值    给后台的函数名
			beforeSend:function(){},
			success: function(data){
				console.log(data)
				var bannerstr =""; 
				if(data.result == 0){
					
					for(var i=0;i<data.content.banners.length;i++){
						bannerstr += '<div class="swiper-slide"><span class="item_id">'
									+data.content.banners[i].item_id+
								'</span><img class="swiper-lazy" data-src="'+
								data.content.banners[i].poster_image_addr
								+'" /><div class="swiper-lazy-preloader"></div></div>'
					}
					$("#swiper-wrapper").html(bannerstr)
					var swiper = new Swiper('.swiper-container', {
				        pagination: '.swiper-pagination',
				        observer:true,//修改swiper自己或子元素时，自动初始化swiper
						observeParents:true,//修改swiper的父元素时，自动初始化swiper
				        paginationClickable: true,
				        spaceBetween: 0,
				        centeredSlides: true,
				        autoplay: 2500,
				        autoplayDisableOnInteraction: false,
				        lazyLoading : true
				    });

				}else{
					new Toast({context:$('body'),message:decodeURI(data.content)}).show();
				}
			},
			error: function(){
				//new Toast({context:$('body'),message:'网络错误'}).show();
			}
		});
		
		
		$(".burstlist-title").on("tap",".last",function(){
			page = 0;
			$("#burstlist .burstlist-div").remove();
			if($(".burstlist-title .last").attr("qishu")==0){
				season =-1;
			}else{
				season =$(".burstlist-title .last").attr("season");
			}
			if($(".burstlist-title .last").attr("qishu")==-1){
				$(".burstlist-title .last").text("查看本期列表>");
				$(".burstlist-title .last").attr("qishu",0)
				hotitems()
			}else{
				$(".burstlist-title .last").text("查看往期列表>")
				$(".burstlist-title .last").attr("qishu",-1)
				hotitems()
			}
		})
		//获取爆款列表
		function hotitems(){
			$.ajax({
				type: ajaxtype,
				url: hotitemlist,
				dataType: "jsonp",
				data:{"page_no":page,"season_no":season},
				contentType: "application/json",
				jsonp: "jsonpCallback",
				jsonpCallback:"hotitem",
				beforeSend:function(){
					if(page ==0){
						$("#burstlist").html("<p class='load'>加载中...</p>")
					}
				},
				success: function(data){
					console.log(data)
				
					var hotitemliststr = "";
					if(data.result == 0){
						
						$(".burstlist-title .last").attr("season",data.content.season_no-1)
						if(data.content.hot_items ==''){
							hotitemliststr = '<img src ="img/kong.png" style="display:block;margin:0 auto;width:50%;"/><p style="text-align:center;height:1rem;line-height:1rem;">暂无爆款列表</p>'
						}else{
							for(var i=0;i<data.content.hot_items.length;i++){
								var property_prices_keys = data.content.hot_items[i].property_prices_key;
								var property_prices_values = data.content.hot_items[i].property_prices_value;
								property_price_key.push(property_prices_keys);//规格价格
								property_price_value.push(property_prices_values);//规格价格
								hotitemliststr += '<div item_state="'+data.content.hot_items[i].item_state+'" xinghaolength = "'+data.content.hot_items[i].propertys.length+'" class="burstlist-div"><div class="xinghaobox" style ="display:none;">'
								//加上商品型号//////////////////////////////////////
								var propertys = data.content.hot_items[i].propertys;
								for(var j = 0;j<propertys.length;j++){
									hotitemliststr+='<div class="xinghao1" property_key="'
										+propertys[j].property_key+
										'"><p class="title">选择'
										+decodeURI(propertys[j].property_key_desc)+
										'</p>'
										for(var k = 0;k<propertys[j].values.length;k++){
											if(k == 0){
												hotitemliststr+='<span class="check" property_value="'
												+propertys[j].values[k].property_value+
												'">'
												+decodeURI(propertys[j].values[k].property_desc)+
												'</span>'
											}else{
												hotitemliststr+='<span property_value="'
												+propertys[j].values[k].property_value+
												'">'
												+decodeURI(propertys[j].values[k].property_desc)+
												'</span>'
											}
											
										}
									hotitemliststr+='</div>'
									}
								///////////////////////////////////////////////////
								hotitemliststr +='</div><span class="item_id">'
									+data.content.hot_items[i].item_id+
									'</span><div class="top"><div class="left">'
									if(data.content.hot_items[i].item_state!=1){
										hotitemliststr+='<span>已抢光</span>'
									}
									hotitemliststr +='<img src="'
			                      	+data.content.hot_items[i].item_icon_addr+
									'" onerror="this.src='+errorimg+';"/></div><div class="right"><p class="title">'
									+decodeURI(data.content.hot_items[i].item_name)+
									'</p>'
								var starhalf = Math.round(data.content.hot_items[i].grade/10)%2;//半星
								var staron = Math.floor(data.content.hot_items[i].grade/10/2);  
								var staroff = 5-staron-starhalf;
								hotitemliststr +='<div class="pingjia">'
								for	(var j=0;j<staron;j++){
									hotitemliststr +='<img src="image/score_1.png"/>'
								}
								if(starhalf == 1){//判断有没有半颗星
									hotitemliststr +='<img src="image/score_3.png"/>'
								}
								if(staroff >0){//判断有没有星
									for	(var j=0;j<staroff;j++){
										hotitemliststr +='<img src="image/score_2.png"/>'
									}
								}
								hotitemliststr +='<p><span>'
									+data.content.hot_items[i].evaluate_count+
									'</span>人评论</p></div><div class="dianpingshare"><div class="dianping" item_price_discount = "￥'
									+(data.content.hot_items[i].item_price_discount/100).toFixed(2)+
									'"><span class="iconfont">&#xe60f;</span>我要点评</div><div class="share"><span class="iconfont">&#xe602;</span>我要分享</div></div><div class="shop"><p>'
									if(data.content.hot_items[i].item_state!=1){
										hotitemliststr+='<span>商品已下架！</span>'
									}else{
										hotitemliststr+='<i>￥</i><span>'+(data.content.hot_items[i].price/100).toFixed(2)+'</span>'
									}
									hotitemliststr+='</p><p class="addShoppingcar iconfont">&#xe724;</p></div></div></div><div class="bottom">'
									+decodeURI(data.content.hot_items[i].advantage)+
									'</div></div>'
							}
						}
						
						if(page == 0){
							$("#burstlist").html(hotitemliststr);
						}else{
							$("#burstlist").append(hotitemliststr);
							
							
						}
						var next_page_no = data.content.next_page_no;
						if(next_page_no<0){
							mui('#pullrefresh').pullRefresh().endPullupToRefresh(true); //参数为true代表没有更多数据了。
						}else{
							mui('#pullrefresh').pullRefresh().endPullupToRefresh(false); //参数为true代表没有更多数据了。
						}
						
						
						
					}else{
						$(".load").remove();
						mui('#pullrefresh').pullRefresh().endPullupToRefresh(true); //参数为true代表没有更多数据了。
						new Toast({context:$('body'),message:decodeURI(data.content)}).show();
					}
				},
				error: function(){
					//new Toast({context:$('body'),message:'网络错误'}).show();
				}
			})
		}
})

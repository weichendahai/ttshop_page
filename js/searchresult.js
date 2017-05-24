$(function(){
	var user_id = localStorage.getItem("user_id");
	var evaluate_shared_id = Request.QueryString("evaluate_shared_id");
	var page =0;
	var order_userful = 0;//排序 0价格 1销量
	var order_count = 1;//1升序 2降序
	var property_price_key =[];
	var property_price_value =[];
	var shoppingcar = localStorage.getItem('shoppingcar');
	if(shoppingcar ==null){
		shoppingcar = 0;
	}
	$("footer .num").text(shoppingcar);
	//获取关键字
	var keyword = encodeURI(decodeURI(Request.QueryString("searchName")));
	$("#searchText").val(decodeURI(Request.QueryString("searchName")))
	var category_id = Request.QueryString("category_id");//一级分类id
	if(category_id ==''||category_id==null||category_id==undefined){
		category_id =0;
	}
	//获取搜索信息
	searchresult(keyword,category_id);
	//、、、、、、、、、、、、、、、、、、、、、、、、、、、、、
	//、、、、、、、、、、、、、、、、、、、、、、、、、、、、、
	//、、、、、、获取商品
	function searchresult(keyword,category_id){
 		$.ajax({
			type: ajaxtype,
			url: search,
			dataType: "jsonp",
			data:{
				user_id:user_id,
				keyword:keyword,
				category_id:category_id,
				page_no:page,
				order_userful:order_userful,
				order_count:order_count
			},
			contentType: "application/json",
			jsonp: "jsonpCallback",
			jsonpCallback:"search",
			beforeSend:function(){
				if(page ==0){
					$(".mui-table-view").html("<p class='load'>加载中...</p>")
				}
			},
			success: function(data){
				console.log(data)
				
				if(data.result == 0){
					var str = '';
					if(page == 0){
						for(var i=0;i<data.content.categorys.length;i++){
							var fenleistr = '';
							for(var j =0;j<data.content.categorys[i].subs.length;j++){
								fenleistr+='<li class="li" category_id="'
											+data.content.categorys[i].subs[j].category_id+'">'
											+decodeURI(data.content.categorys[i].subs[j].category_name)+'</li>'
							}
							$(".fenleilist-title").eq(i).find(".fenleilist-main").html(fenleistr)
						}
					}
					if(data.content.items == ''){
						str = '<img src ="img/kong.png" style="display:block;margin:0 auto;width:50%;"/><p style="text-align:center;height:1rem;line-height:1rem;">暂无相关商品</p>'
						$(".mui-table-view").html(str)
					}else{
						
						for(var i =0 ;i<data.content.items.length;i++){
							
							var property_prices_keys = data.content.items[i].property_prices_key;
							var property_prices_values = data.content.items[i].property_prices_value;
							property_price_key.push(property_prices_keys);//规格价格
							property_price_value.push(property_prices_values);//规格价格
							var stateon = "row";//class名
							str+='<div xinghaolength="'+data.content.items[i].item_propertys.length+'" class="box '
								+stateon+
								'" item_id="'
								+data.content.items[i].item_id+
								'" item_price_discount ="￥'+(data.content.items[i].item_price_discount/100).toFixed(2)+'"><div class="xinghaobox">'
								
							for(var j = 0;j<data.content.items[i].item_propertys.length;j++){
								str+='<div class="xinghao1" style="display:none;" property_key="'
									+data.content.items[i].item_propertys[j].property_key+
									'"><p class="title">选择'
									+decodeURI(data.content.items[i].item_propertys[j].property_key_desc)+
									'</p>'
									for(var k = 0;k<data.content.items[i].item_propertys[j].values.length;k++){
										if(k == 0){
											str+='<span class="check" property_value="'
											+data.content.items[i].item_propertys[j].values[k].property_value+
											'">'
											+decodeURI(data.content.items[i].item_propertys[j].values[k].property_desc)+
											'</span>'
										}else{
											str+='<span property_value="'
											+data.content.items[i].item_propertys[j].values[k].property_value+
											'">'
											+decodeURI(data.content.items[i].item_propertys[j].values[k].property_desc)+
											'</span>'
										}
										
									}
								str+='</div>'
								}
							
								
							
							str+='</div><div class="productimg"><img src="'
								+data.content.items[i].item_icon+
								'" onerror="this.src='+errorimg+';"/></div><div class="productInfromtion"><p class="productname">'
								+decodeURI(data.content.items[i].item_name)+
								'</p><div class="dianpingshare"><div class="share"><span class="iconfont">&#xe615;</span> 分享</div></div><div class="productBuy"><div><p class="money">￥'
								+(data.content.items[i].item_price/100).toFixed(2)+
								'</p><p class="personnum">'
								+data.content.items[i].order_count+
								'人购买</p></div><span class="addShoppingcar iconfont">&#xe617;</span></div></div></div>'
						}
						
						if(page == 0){
							$(".mui-table-view").html('');
							$(".mui-table-view").html(str);
							$(".mui-scroll").css({'transform':'translate3d(0px, 0px, 0px)'});
							
						}else{
							$(".mui-table-view").append(str);
							
						}
						var next_page_no = data.content.next_page_no;
						if(next_page_no<0){
							mui('#pullrefresh').pullRefresh().endPullupToRefresh(true); //参数为true代表没有更多数据了。
						}else{
							mui('#pullrefresh').pullRefresh().endPullupToRefresh(false); //参数为true代表没有更多数据了。
						}
					}
					
				}else{
					$(".load").remove()
					mui('#pullrefresh').pullRefresh().endPullupToRefresh(true); //参数为true代表没有更多数据了。
					new Toast({context:$('body'),message:decodeURI(data.content)}).show();
				}
			},
			error: function(){
				new Toast({context:$('body'),message:'网络故障'}).show();
			}
		})
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
	function pullfresh(e){
		page = 0;
		setTimeout(function() {
			searchresult(keyword,category_id);
			mui('#pullrefresh').pullRefresh().endPulldownToRefresh();//结束刷新
		},1500)	
	}
	function pullupRefresh(e) {
		page++
		setTimeout(function() {
			searchresult(keyword,category_id);
		}, 1500);
	}
	
	//判断来路
	var comments = Request.QueryString("comments");
	if(comments == ""){//不是从点评页面
		$("section").on("tap",".row",function(){
			var item_id = $(this).attr("item_id");
			window.location.href = "html/productdetails.html?item_id="+item_id;
		})
	}else{//是从点评页面
		
		//$(".addShoppingcar").css("display","none");
		
		if(comments == 1){//选点评商品
			$("section").on("tap",".row",function(){
				
				localStorage.setItem("item_id",$(this).attr("item_id"));
				localStorage.setItem("productname",$(this).find(".productname").text());
				localStorage.setItem("item_price_discount",$(this).attr("item_price_discount"));
				localStorage.setItem("productmoney",$(this).find(".money").text());
				localStorage.setItem("productimg",$(this).find(".productimg img").attr("src"));
				if (/(iPhone|iPad|iPod)/i.test(navigator.userAgent)) {
	    			
			            window.location.href = window.document.referrer+timer;
			    } else {
			    	
			    	window.history.go("-1"); 
			    }
			})
			
		}else if(comments == 2){//选同款推荐
			$("section").on("tap",".row",function(){
				
				var item_idArr = localStorage.getItem("item_idArr");
				
				if(item_idArr == null||item_idArr==undefined||item_idArr==''){
					console.log(item_idArr)
					var item_idArr = [];
					var productnameArr = [];
					var productmoneyArr = [];
					var productimgArr = [];
					var obj = $(this);
					setItem(obj);
					
				}else{
					item_idArr = item_idArr.split(",");
					if(item_idArr.length>=5){
						new Toast({context:$('body'),message:'最多选择5条同款商品'}).show();
					}else{
						var productnameArr = localStorage.getItem("productnameArr").split(",");
						var productmoneyArr = localStorage.getItem("productmoneyArr").split(",");
						var productimgArr = localStorage.getItem("productimgArr").split(",");
						var obj = $(this)
						setItem(obj);	
					}
				
				}
				function setItem(obj){//储存同款信息
					var a = 0;
					for(var i = 0;i<item_idArr.length;i++){
						if(obj.attr("item_id") == item_idArr[i]){
							var a = 1;
							new Toast({context:$('body'),message:'您已经选择了此同款'}).show();
						}
					}
					
					if( a == 0){
						item_idArr.push(obj.attr("item_id"));
						localStorage.setItem("item_idArr",item_idArr);
						productnameArr.push(obj.find(".productname").text());
						localStorage.setItem("productnameArr",productnameArr);
						productmoneyArr.push(obj.find(".money").text());
						localStorage.setItem("productmoneyArr",productmoneyArr);
						productimgArr.push(obj.find(".productimg img").attr("src"));
						localStorage.setItem("productimgArr",productimgArr);
						if (/(iPhone|iPad|iPod)/i.test(navigator.userAgent)) {
	    	
					            window.location.href = window.document.referrer;
					    } else {
					    	
					    	window.history.go("-1"); 
					    }//返回同款推荐
						
					}else{
						
					}
					
				}
				//
			})
		}
	} 
	////////////////////////////////////////////////////////////
	//加入购物车开始
	var offset = $("footer li").eq(3).offset();  //结束的地方的元素
	var height = $("footer li").eq(3).height();
	var width = $("footer li").eq(3).width();

	var left;
	var top ;
	var addcar;
	var img;
	var flyer;
	////选择型号
	$(".center").delegate("span","click",function(){
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
		for(var i =0;i<property_price_key[index].length;i++){
			if(property_pricethis ==property_price_key[index][i]){
				console.log(property_price_value[index][i])
				xinghaoprice = (property_price_value[index][i]/100).toFixed(2);
			}
		}
		$(".changexinghao .bottom p").text("￥"+xinghaoprice);	
	})
	var index;
	$(".mui-table-view").on("tap",".addShoppingcar",function(event){//是$(".addcar")这个元素点击促发的 开始动画的位置就是这个元素的位置为起点
		index = $(this).parents(".box").index();
		addcar = $(this);
		img = addcar.parents(".box").find("img").attr('src');
		flyer = $('<img class="u-flyer" style="width:50px;height: 50px;z-index:999999;" src="'+img+'">');
		left = $(this).offset().left;
		top = $(this).offset().top-$(window).scrollTop();
		$(".changexinghao .top p").text(addcar.parents(".box").find(".productname").text());
		$(".changexinghao .bottom p").text(addcar.parents(".box").find(".money").text());
		$(".changexinghao .center").html(addcar.parents(".box").find(".xinghaobox").html());
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
			$(".changexinghao .xinghao1").css("display","block");
			var _height = $(".changexinghao").height();
			$(".changexinghao").css({"display":"block","marginTop":-_height/2});
			
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
		var item_id = addcar.parents(".box").attr("item_id");
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
	////////////////////////////////////////////////////////////	
	//筛选
	$(".nav li").eq(3).click(function(){
		$(".mask").animate({"left":"0"});
		$(".shaixuan").animate({"right":"0"})
	})
	//排序
	$(".nav li").eq(0).click(function(){
		mui('#pullrefresh').pullRefresh().refresh(true);
		page=0;
		searchresult(keyword,category_id);
	})
	$(".nav li").eq(1).click(function(){
		mui('#pullrefresh').pullRefresh().refresh(true);
		page=0;
		order_userful = 0;//排序 0价格 1销量
		if($(this).find(".iconfont").hasClass("up")){
			order_count = 2;//1升序 2降序
			$(this).find(".iconfont").removeClass("up");
			$(this).find(".iconfont").addClass("down");
			searchresult(keyword,category_id);
		}else{
			order_count = 1;//1升序 2降序
			$(this).find(".iconfont").removeClass("down");
			$(this).find(".iconfont").addClass("up");
			searchresult(keyword,category_id);
		}
		
	})
	$(".nav li").eq(2).click(function(){
		mui('#pullrefresh').pullRefresh().refresh(true);
		page=0;
		order_userful = 1;//排序 0价格 1销量
		if($(this).find(".iconfont").hasClass("up")){
			order_count = 2;//1升序 2降序
			$(this).find(".iconfont").removeClass("up");
			$(this).find(".iconfont").addClass("down");
			searchresult(keyword,category_id);
		}else{
			order_count = 1;//1升序 2降序
			$(this).find(".iconfont").removeClass("down");
			$(this).find(".iconfont").addClass("up");
			searchresult(keyword,category_id);
		}
	})
	//搜索
	$("#searchText").on('keypress',function(e) {  
        var keycode = e.keyCode; 
        keyword = encodeURI($(this).val());  
        category_id = 0;
        if(keycode=='13') {  
            e.preventDefault();    
            //请求搜索接口  
           searchresult(keyword,category_id);
        }  
 });  
 
 
 	//二级分类
   	$(".fenleilist-main").on("tap","li",function(event){
   		
		if($("#searchText").val() == ''){
			
		}else{
			keyword = encodeURI($("#searchText").val());  
		}
		category_id = $(this).attr("category_id");
		searchresult(keyword,category_id);
		$(".mask").animate({"left":"100%"});
		$(".shaixuan").animate({"right":"-5.5rem"});
		event.stopPropagation();
	})
//	$(".fenlei").click(function(){
//		if($(".fenleilist").css("display") == "block"){
//			$(".fenlei .bottom").html("&#xe613;")
//		}else{
//			$(".fenlei .bottom").html("&#xe61e;")
//		}
//		$(".fenleilist").stop().slideToggle();
//	})
	$(".fenleilist-title .bottom").click(function(event){//展开
		
		//searchresult();
		if($(this).parent(".fenleilist-title").find(".fenleilist-main").css("display") == "block"){
			$(this).html("&#xe613;")
		}else{
			$(this).html("&#xe61e;")
		}
		$(this).parent(".fenleilist-title").find(".fenleilist-main").stop().slideToggle();
		event.stopPropagation();
	})
	$(".fenleilist-title").click(function(e){//展开
		if(!$(e.target).hasClass("li")){
		    if($("#searchText").val() == ''){
			
			}else{
				keyword = encodeURI($("#searchText").val());  
			}
			category_id = $(this).index()+1;
			searchresult(keyword,category_id);
			$(".mask").animate({"left":"100%"});
			$(".shaixuan").animate({"right":"-5.5rem"});
		}
		
	})
	//点击朦层取消朦层
	$("body").delegate(".wxmask","click",function(){
		$(this).remove();
		$(".wxmaskimg").remove();
	})
	//分享
	$("section").on("tap",".share",function(event){
		wxmaskshow2()
		var item_id = $(this).parents(".box").attr("item_id");
		var item_name = $(this).parents(".productInfromtion").children(".productname").text();
		var item_icon_attr = $(this).parents(".box").find(".productimg").find("img").attr("src");
		sharewxproduct(item_name,item_icon_attr,item_id)
		event.stopPropagation();
	});
})
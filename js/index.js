
$(function(){
	//跳转
	//getCodeForWechat()
	
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
	 * 下拉刷新具体业务实现
	 */
//	function pulldownRefresh() {
//		setTimeout(function() {
//			var table = document.body.querySelector('.mui-table-view');
//			var cells = document.body.querySelectorAll('.mui-table-view-cell');
//			for (var i = cells.length, len = i + 3; i < len; i++) {
//				var li = document.createElement('li');
//				li.innerHTML = '<a>' + (i + 1) + '</a>';
//				//下拉刷新，新纪录插到最前面；
//				table.insertBefore(li, table.firstChild);
//			}
//			mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
//		}, 1500);
//	}
	
	/**
	 * 上拉加载具体业务实现
	 */
	function pullupRefresh() {
		page++;
		setTimeout(function() {
			
			$.ajax({
				type: ajaxtype,
				url: hotitemlist,
				dataType: "jsonp",
				data:{"page_no":page,"season_no":season},
				contentType: "application/json",
				jsonp: "jsonpCallback",
				jsonpCallback:"hotitem",
				success: function(data){
					//var next_page_no = data.content.next_page_no;
					//console.log(next_page_no)
					
				},
				error: function(){
					
				}
			})
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
			for(var i =0;i<property_price_key[index].length;i++){
				if(property_pricethis ==property_price_key[index][i]){
					console.log(property_price_value[index][i])
					xinghaoprice = (property_price_value[index][i]/100).toFixed(2);
					$(".changexinghao .bottom p").text("￥"+xinghaoprice);
				}
			}
			
		})
		var index;
		$(".burstlist").on("tap",".addShoppingcar",function(event){
			index = $(this).parents(".burstlist").index();
			addcar = $(this);
			img = addcar.parents(".burstlist-div").find("img").attr('src');
			flyer = $('<img class="u-flyer" style="width:50px;height: 50px;z-index:9999;" src="'+img+'">' );
			left = $(this).offset().left;
			top = $(this).offset().top-$(window).scrollTop();
			
			$(".changexinghao .top p").text(addcar.parents(".burstlist-div").find(".top .title").text());
			$(".changexinghao .bottom p").text(addcar.parents(".burstlist-div").find(".shop p").text());
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
})

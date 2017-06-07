$(function(){
	$("body #goback").attr("href","javascript:void(0);").click(function(){//兼容的返回按键
	   window.location.href = "personcenter.html"
	});
	var shoppingcar = localStorage.getItem('shoppingcar');
	if(shoppingcar ==null){
		shoppingcar = 0;
	}
	$("footer .num").text(shoppingcar);
	var orderIndex = Request.QueryString("orderIndex");
	$(".kinerNav li").eq(orderIndex).addClass("active");//进入页面
	var user_id =localStorage.getItem("user_id");
	var index = orderIndex-1;//下标
	var page = 0;//页码
	getorder(page);
	$(".kinerNav li").click(function(){//导航点击 
		$(".kinerNav li").removeClass("active");
		$(this).addClass("active");
		index = $(this).index()-1;
		page = 0;
		getorder(page);
	})
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
			getorder(page)
			mui('#pullrefresh').pullRefresh().endPulldownToRefresh();//结束刷新
		},1500)	
	}
	function pullupRefresh(e) {
		page++
		setTimeout(function() {
			getorder(page)
			
		}, 1500);
	}

	
	//ajax
	function getorder(page){
		$.ajax({
			type: ajaxtype,
			url: getorderlist,
			dataType: "jsonp",
			data:{
				user_id:user_id,
				page_no:page,
				order_state:index
			},
			contentType: "application/json",
			jsonp: "jsonpCallback",
			jsonpCallback:"getorderlist",
			beforeSend:function(){
				if(page ==0){
					$(".mui-table-view ").html("<p class='load'>加载中...</p>")
				}
			},
			success: function(data){
				console.log(data)
				if(data.result == 0){
					
					var content = data.content.orders;
					if(content ==''){
						
						var str = '<img src ="img/kong.png" style="display:block;margin:0 auto;width:50%;"/><p style="text-align:center;height:1rem;line-height:1rem;">暂无此类订单</p>'
						$(".mui-table-view").html(str)
					}else{
						var str ='';
						for(var i = 0;i<content.length;i++){
							if(content[i].order_state==0){
								var order_state = "待付款"
							}else if(content[i].order_state==1){
								var order_state = "待发货"
							}else if(content[i].order_state==2){
								var order_state = "待收货"
							}else if(content[i].order_state==3){
								var order_state = "已完成"
							}
							str+='<div class="orderlist" order_id ="'+content[i].order_id+'"><p class="order-number"><span class="left">订单编号：'
								+content[i].order_code+
							 	'</span><span class="Right">'
							 	+order_state+
								'</span></p><ul>'
								var allprice =0;
								
								for(var j= 0;j<content[i].items.length;j++){
									var price = (content[i].items[j].item_price/100).toFixed(2)
									//console.log(price)
									str+='<li item_id="'
										+content[i].items[j].item_id+
										'"><span class="productImg"><img src="'
										+content[i].items[j].item_icon+
										'"/></span><div class="productmain"><p class="productname">'
										+decodeURI(content[i].items[j].item_name)+
										'</p><p class="xinghao">'
										for(var k=0;k<content[i].items[j].item_propertys.length;k++){
											if(k == content[i].items[j].item_propertys.length-1){
												str+= decodeURI(content[i].items[j].item_propertys[k].item_property_desc);
											}else{
												str+= decodeURI(content[i].items[j].item_propertys[k].item_property_desc)+",";
											}
										}
									str+='</p><p class="pingjia"><a class="iconfont ">&#xe63f;</a>评价</p></div><div class="money-num"><span class="money">￥'
										+price+
										'</span><span class="num">x'
										+content[i].items[j].item_count+
										'</span></div></li>'
										allprice = (parseFloat(price)*content[i].items[j].item_count)+allprice;
								}
							str+='</ul><div class="total"><p>共<a class="productnum">'
								+j+
								'</a>件 合计：<a class="productmoney">￥'
								+(allprice).toFixed(2)+
								'</a></p></div></div>'
						}
						if(page ==0){
							$(".mui-table-view").html(str)
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
					new Toast({context:$('body'),message:decodeURI(data.content)}).show(); 
				}
			},
			error: function(){
				new Toast({context:$('body'),message:'网络故障'}).show(); 
			}
		})
	}
	$(".mui-table-view").on("tap",".pingjia",function(event){
    	var item_id = $(this).parents("li").attr("item_id");//产品编号
    	localStorage.setItem("item_id",item_id);
		localStorage.setItem("productname",$(this).parents("li").find(".productname").text());
		localStorage.setItem("productmoney",$(this).parents("li").find(".money").text());
		localStorage.setItem("productimg",$(this).parents("li").find(".productImg img").attr("src"));
    	window.location.href="comment.html?item_id="+item_id;
    	event.stopPropagation()
    })
	$(".mui-table-view").on("tap",".orderlist",function(){
		var order_id = $(this).attr("order_id");
		mui('#pullrefresh').pullRefresh().refresh(true);
    	window.location.href="html/orderdetails.html?order_id="+order_id;
	})
    
    
});
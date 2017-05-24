$(function(){
	var shoppingcar = localStorage.getItem('shoppingcar');
	if(shoppingcar ==null){
		shoppingcar = 0;
	}
	$("footer .num").text(shoppingcar);
	var user_id =localStorage.getItem("user_id"); 
	var page = 0;
	//上拉下拉
	getrefund(page)
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
			getrefund(page)
			mui('#pullrefresh').pullRefresh().endPulldownToRefresh();//结束刷新
		},1500)	
	}
	function pullupRefresh(e) {
		page++
		setTimeout(function() {
			getrefund(page)
		}, 1500);
	}
	function getrefund(page){
		$.ajax({
			type: ajaxtype,
			url: getrefundlist,
			dataType: "jsonp",
			data:{
				user_id:user_id,
				page_no:page,
				
			},
			contentType: "application/json",
			jsonp: "jsonpCallback",
			jsonpCallback:"getrefundlist",
			beforeSend:function(){
				if(page ==0){
					$(".mui-table-view ").html("<p class='load'>加载中...</p>")
				}
			},
			success: function(data){
				if(data.result == 0){
					console.log(data)
					var str;
					if(data.content.refunds == ''){
						str = '<img src ="img/kong.png" style="display:block;margin:0 auto;width:50%;"/><p style="text-align:center;height:1rem;line-height:1rem;">暂无退款记录</p>'
						$(".mui-table-view").html(str)
						//console.log(str)
					}else{
						str= "";
						for(var i=0;i<data.content.refunds.length;i++){
							var price =(data.content.refunds[i].item_price/100).toFixed(2);
							if(data.content.refunds[i].refund_state == 0){//状态
								var refund_state = "申请中";
							}else if(data.content.refunds[i].refund_state == 1){
								var refund_state = "申请成功"
							}else{
								var refund_state = "申请失败"
							}
						str+='<div class="product" item_id="'
							+data.content.refunds[i].item_id+
							'"><div class="top"><span class="Left"><img src="'
							+data.content.refunds[i].item_icon+
							'" onerror="this.src='+errorimg+';"></span><div class="Center"><p class="productname">'
							+decodeURI(data.content.refunds[i].item_name)+
							'</p><p class="xinghao">'
						for(var k=0;k<data.content.refunds[i].propertys.length;k++){
							if(k == data.content.refunds[i].propertys.length-1){
								str+= decodeURI(data.content.refunds[i].propertys[k].item_property_desc);
							}else{
								str+= decodeURI(data.content.refunds[i].propertys[k].item_property_desc)+",";
							}
						}
						if(data.content.refunds[i].refund_type == 0){
							var refund_type = "退货退款"
						}else if(data.content.refunds[i].refund_type == 1){
							var refund_type = "退货"
						}else if(data.content.refunds[i].refund_type == 2){
							var refund_type = "退款"
						}
						str+='</p></div><div class="Right"><span class="money">￥'
							+price+
							'</span><span class="num">x'
							+data.content.refunds[i].item_count+
							'</span></div></div><div class="center"><p><a class="iconfont">&#xe621;</a> '
							+refund_type+
							'</p><div class="returnmoney">退款金额：￥'
							+(price*data.content.refunds[i].item_count).toFixed(2)+
							'</div></div><div class="bottom"><p class="red">'
							+refund_state+
							'</p></div></div>'
						}
						if(page ==0){
						$(".mui-table-view").html(str);
						
						}else{
							$(".mui-table-view").append(str);
						}
					}
					
					
					var next_page_no = data.content.next_page_no;
					if(next_page_no<0){
						mui('#pullrefresh').pullRefresh().endPullupToRefresh(true); //参数为true代表没有更多数据了。
					}else{
						mui('#pullrefresh').pullRefresh().endPullupToRefresh(false); //参数为true代表没有更多数据了。
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
//	$(".mui-table-view").on("tap",".pingjia",function(event){
//  	var item_id = $(this).parents(".product").attr("item_id");//产品编号
//  	localStorage.setItem("item_id",item_id);
//		localStorage.setItem("productname",$(this).parents("li").find(".productname").text());
//		localStorage.setItem("productmoney",$(this).parents("li").find(".money").text());
//		localStorage.setItem("productimg",$(this).parents("li").find(".productImg img").attr("src"));
//  	window.location.href="comment.html?item_id="+item_id;
//  	event.stopPropagation()
//  })
//	$(".mui-table-view").on("tap",".product",function(){
//		var item_id = $(this).parents(".product").attr("item_id");
//		window.location.href = "html/productdetails.html?item_id="+item_id;
//	})
})

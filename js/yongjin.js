$(function(){
	$(function(){
	var page = 0;
	var user_id =localStorage.getItem("user_id");
	var imgstr = localStorage.getItem("imgstr");
	$(".touxiang img").attr("src",imgstr);
	$(".btn").click(function(){//申请提现
		var tixianmoney = parseFloat($(".top p span").text());
		if(tixianmoney>=100){//判断金额
			$.ajax({
				type:ajaxtype,
				url: requestbonuspayment,
				dataType: "jsonp",
				data:{
					user_id:user_id,
				},
				contentType: "application/json",
				jsonp: "jsonpCallback",
				jsonpCallback:"requestbonuspayment",
				success: function(data){
					console.log(data)
					if(data.result == 0){
						//提现之后减去提现钱重新显示
						$(".top p span").text((parseFloat($(".top p span").text())/100-parseFloat(data.content.total)/100).toFixed(2));
						 
						var content  =data.content;
						var price = (content.total/100).toFixed(2);
						if(content.state == 1){
							var state = "申请中";
						}else{
							var state = "已支付";
						}
						var str ='<li><div class="center"><p>提现</p><p>提现日期：'
								+content.payment_date+
								'</p></div><div class="right"><div class="money">'
								+price+
								'元</div><div class="state">'
								+state+
								'</div></div></li>'
						
						$(".mui-table-view").prepend(str)
					}else{
						new Toast({context:$('body'),message:data.content}).show();
					}
				},
				error: function(){
					new Toast({context:$('body'),message:'网络故障'}).show();
				}
			})
		}else{
			new Toast({context:$('body'),message:'金额超过100才可提现'}).show();
		}
	})
	giftcard(page)
	function giftcard(page){//提现记录
		$.ajax({
			type: ajaxtype,
			url: getbonus,
			dataType: "jsonp",
			data:{
				user_id:user_id,
				page_no:page,
			},
			contentType: "application/json",
			jsonp: "jsonpCallback",
			jsonpCallback:"getbonus",
			beforeSend:function(){
				if(page ==0){
					$(".mui-table-view ").html("<p class='load'>加载中...</p>")
				}
			},
			success: function(data){
				console.log(data)
				if(data.result == 0){
					$(".top p span").text((data.content.default_balance/100).toFixed(2))
					var content = data.content.payments;
					console.log(content)
					if(content ==''){
						
						var str = '<img src ="../img/kong.png" style="display:block;margin:0 auto;width:50%;"/><p style="text-align:center;height:1rem;line-height:1rem;">暂无提现记录</p>'
						$(".mui-table-view").html(str)
					}else{
						
						
						var str ='';
						for(var i = 0;i<content.length;i++){
							var price = (content[i].total/100).toFixed(2);
							
							if(content[i].state == 1){
								var state = "申请中";
							}else{
								var state = "已支付";
							}
							str +='<li><div class="center"><p>提现</p><p>提现日期：'
									+content[i].create_date+
									'</p></div><div class="right"><div class="money">'
									+price+
									'元</div><div class="state">'
									+state+
									'</div></div></li>'
						}
						
						if(page == 0){
							$(".mui-table-view").html(str);
							
						}else{
							$(".mui-table-view").append(str);
							
						}
						
					}
					console.log(data.content.next_page_no)
					if(data.content.next_page_no<0){
						mui('#pullrefresh').pullRefresh().endPullupToRefresh(true); //参数为true代表没有更多数据了。
					}else{
						mui('#pullrefresh').pullRefresh().endPullupToRefresh(false); //参数为true代表没有更多数据了。
					}
				}else{
					new Toast({context:$('body'),message:data.content}).show();
				}
			},
			error: function(){
				new Toast({context:$('body'),message:'网络故障'}).show();
			}
		})
	}
	
	mui.init({
		pullRefresh: {
			container: '#pullrefresh',
			down : {
		      height:50,//可选,默认50.触发下拉刷新拖动距离,
		      auto: false,//可选,默认false.自动下拉刷新一次
		      contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
		      contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
		      contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
		      callback :pulldownRefresh//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
		   	},
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
	function pulldownRefresh() {
		page = 0
		setTimeout(function() {
			giftcard(page)
			mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
		}, 500);
		
	}
	
	/**
	 * 上拉加载具体业务实现
	 */
	function pullupRefresh() {
		page++
		setTimeout(function() {
			giftcard(page)
		}, 500);
	}
	
})

})

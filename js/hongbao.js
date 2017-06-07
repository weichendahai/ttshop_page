$(function(){
	var page = 0;
	var user_id =localStorage.getItem("user_id");
	var imgstr = localStorage.getItem("imgstr");
	$(".touxiang img").attr("src",imgstr);
	var state = 0;//有效
	giftcard(page,state)
	$(".kinerNav li").click(function(){
		var index  = $(this).index();
		$(".kinerNav li").removeClass("active");
		$(".kinerNav li").eq(index).addClass("active");
		state = index;
		page = 0;
		giftcard(page,state)
		
	})
	function giftcard(page,state){
		if(state == 0){
			$(".mui-table-view").attr("id","youxiao")
		}else{
			$(".mui-table-view").attr("id","shixiao")
		}
		$.ajax({
			type: ajaxtype,
			url: getgiftcard,
			dataType: "jsonp",
			data:{
				user_id:user_id,
				page_no:page,
				valid:state
			},
			contentType: "application/json",
			jsonp: "jsonpCallback",
			jsonpCallback:"getgiftcard",
			beforeSend:function(){
				if(page ==0){
					$(".mui-table-view ").html("<p class='load'>加载中...</p>")
				}
			},
			success: function(data){
				console.log(data)
				if(data.result == 0){
					var content = data.content.gift_cards;
					console.log(content)
					if(content ==''){
						var str = '<img src ="../img/kong.png" style="display:block;margin:0 auto;width:50%;"/><p style="text-align:center;height:1rem;line-height:1rem;">暂无此类订单</p>'
						$(".mui-table-view").html(str)
					}else{
						var str ='';
						for(var i = 0;i<content.length;i++){
							var price = (content[i].gift_card_balance/100).toFixed(2)
							str +='<li><div class="iconfont">&#xe63e;</div><div class="center"><p>'
								+decodeURI(content[i].gift_card_name)+
								'</p><p>有效期至'
								+content[i].end_date+
								'</p></div><div class="money">'
								+price+
								'元</div></li>'
						}
						
						if(page == 0){
							$(".mui-table-view").html(str);
							
						}else{
							$(".mui-table-view").append(str);
							
						}
						
					}
					if(data.content.next_page_no<0){
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
			giftcard(page,state)
			mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
		}, 1500);
	}
	
	/**
	 * 上拉加载具体业务实现
	 */
	function pullupRefresh() {
		page++
		setTimeout(function() {
			giftcard(page,state)
			
			
		}, 1500);
	}
	
})

$(function(){
	//显示大图
	var user_id = localStorage.getItem("user_id");
	var page =0;
	feedback()
	function feedback(){
		$.ajax({
			type: ajaxtype,
			url: getfeedback,
			dataType: "jsonp",
			data:{
				user_id:user_id,
				page_no:page
			},
			contentType: "application/json",
			jsonp: "jsonpCallback",
			jsonpCallback:"getfeedback",
			beforeSend:function(){
				if(page ==0){
					$(".mui-table-view ").html("<p class='load'>加载中...</p>")
				}
			},
			success: function(data){
				console.log(data)
				if(data.result == 0){
					if(data.content ==''){
						var str = '<img src ="../img/kong.png" style="display:block;margin:0 auto;width:50%;"/><p style="text-align:center;height:1rem;line-height:1rem;">暂无反馈信息，快去写一条吧</p>'
						$(".mui-table-view").html(str)
					}else{
						var str ='';
						for(var i =0;i<data.content.length;i++){
							str +='<div class="box" id='
							+data.content[i].id+
							'><div class="boxTop"><div class="boxTopLeft">反馈问题：</div><div class="boxTopRight ellipsis">'
							+decodeURI(data.content[i].content)+
							'</div></div><div class="boxCenter">'
							if(data.content[i].img_addr ==''||data.content[i].img_addr ==null||data.content[i].img_addr ==undefined){
								
							}else{
								str+='<div class="one"><div class="oneleft">反馈问题：</div><div class="oneright"><img src ="'+data.content[i].img_addr+'"/></div></div>'
							}
							console.log(data.content[i].read_date)
							var duclass = "yidu";
							var dutext = "查看信息";
							if(data.content[i].backs.length == 0){
								str+='</div><div class="boxBottom"><span class="'+duclass+' du">'+dutext+'</span></div></div>'
							}else{
								str+='<div class="two">'
								for(var j =0;j<data.content[i].backs.length;j++){
									if(data.content[i].backs[j].read_date ==''&&data.content[i].backs[j].from==-1){
										duclass = "weidu";
										dutext = "查看未读信息";
									}
									if(data.content[i].backs[j].from==-1){
										var twoclass = "twoserver";
										var twotext = "客服回复";
									}else{
										var twoclass = "twomy";
										var twotext = "我的回复"
									}
									str+='<div class="'
									+twoclass+
									'"><p>'+twotext+'：'
									+decodeURI(data.content[i].backs[j].content)+
									'</p>'
									if(data.content[i].backs[j].img_addr ==''||data.content[i].backs[j].img_addr ==null||data.content[i].backs[j].img_addr ==undefined){
										str+='</div>'
									}else{
										str+='<img src ="'+data.content[i].img_addr+'"/></div>'
									}
								}
								str+='</div></div><div class="boxBottom"><span class="'+duclass+' du">'+dutext+'</span></div></div>'
							}
							
						}
					
						if(page == 0){
							$(".mui-table-view").html(str);
							
						}else{
							$(".mui-table-view").append(str);	
						}
					}
					if(data.next_page_no<0){
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
	
	//初始化上拉下拉
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
			feedback()
			mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
		}, 1500);
	}
	
	/**
	 * 上拉加载具体业务实现
	 */
	function pullupRefresh() {
		page++
		setTimeout(function() {
			feedback()
		}, 1500);
	}
	//显示大图
	$(".mui-table-view").on("tap","img",function(){
		var src = $(this).attr("src");
		$(".bigimg img").attr("src",src);
		$(".bigimg").css("display","block");
		var _height = $(".bigimg img").height();
		$(".bigimg img").css("margin-top",-_height/2);
	});
	$(".bigimg").click(function(){
		$(this).css("display","none");
	});
	//阅读消息
	$(".mui-table-view").on("tap",".du",function(){
		var id = $(this).parents(".box").attr("id");
		$(this).parents(".box").find(".boxCenter").slideDown();
		$(this).parents(".box").find(".boxTopRight").removeClass("ellipsis");
		$(this).removeClass();
		$(this).addClass("reply");
		$(this).html("回复")
		$.ajax({
			type: ajaxtype,
			url: readfeedback,
			dataType: "jsonp",
			data:{
				user_id:user_id,
				id:id
			},
			contentType: "application/json",
			jsonp: "jsonpCallback",
			jsonpCallback:"readfeedback",
			success: function(data){
				console.log(data)
				if(data.result == 0){
		
				}else{
					//new Toast({context:$('body'),message:data.content}).show(); 
				}
			},
			error: function(){
				//new Toast({context:$('body'),message:'网络故障'}).show(); 
			}
		})
	
	});
	//写反馈
	$(".footer").click(function(){
		window.location.href ="gotofeedback.html?fid=0"
	});
	//
	$("#goback").click(function(){
		window.location.href ="../personcenter.html"
	})
	//回复反馈
	$(".mui-table-view").on("tap",".reply",function(){
		var fid = $(this).parents(".box").attr("id");
		window.location.href ="gotofeedback.html?fid="+fid;
	});
})

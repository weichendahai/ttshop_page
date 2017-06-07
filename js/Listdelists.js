
$(function(){
	var shoppingcar = localStorage.getItem('shoppingcar');
	if(shoppingcar ==null){
		shoppingcar = 0;
	}
	$("footer .num").text(shoppingcar);
	$("header").delegate(".goback","click",function(){
		window.history.go(-1)
	})
	var page = 0;
	var list_type;
	var user_id = Request.QueryString("user_id");
	var fenlei = Request.QueryString("fenlei");
	console.log(fenlei+";"+user_id)
	if(fenlei == "dianping"){
		list_type = 0;
		$("header").html('<span class="iconfont goback">&#xe648;</span>点评')
	}else if(fenlei == "fenxiang"){
		list_type = 1;
		$("header").html('<span class="iconfont goback">&#xe648;</span>分享')
	}
	getuserevaluate();
	$(".mui-table-view ").on("tap",".listdetails",function(){
		var evaluate_id = $(this).attr("evaluate_id");
		localStorage.setItem("details-tophtml",$(this).children(".details-top").html());
		window.location.href = "html/commentdetails.html?evaluate_id="+evaluate_id+"&share=-1";
	})
	//点击朦层取消朦层
	$("body").delegate(".wxmask","click",function(){
		$(this).remove();
		$(".wxmaskimg").remove();
	})
	//分享
	$(".mui-table-view").on("tap",".share",function(event){
		wxmaskshow2();
		var evaluate_id =$(this).parents(".listdetails").attr("evaluate_id");
		goshare(user_id,evaluate_id);
		event.stopPropagation();
	});
	//显示大图
	$(".mui-table-view").on("tap",".imgdiv",function(event){
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
	//上拉下拉
	mui.init({
		pullRefresh: {
			container: '#pullrefresh',
//			down : {
//		      height:50,//可选,默认50.触发下拉刷新拖动距离,
//		      auto: false,//可选,默认false.自动下拉刷新一次
//		      contentdown : "下拉可以刷新",//可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
//		      contentover : "释放立即刷新",//可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
//		      contentrefresh : "正在刷新...",//可选，正在刷新状态时，下拉刷新控件上显示的标题内容
//		      callback :pullfresh//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
//		   	},
			up: {
				contentrefresh: '正在加载...',
				contentnomore:'没有更多数据了',
				callback: pullupRefresh
			}
		}
	});
//	function pullfresh(e){
//		page = 0;
//		setTimeout(function() {
//			getuserevaluate()
//			mui('#pullrefresh').pullRefresh().endPulldownToRefresh();//结束刷新
//		},500)	
//	}
	function pullupRefresh(e) {
		page++
		setTimeout(function() {
			getuserevaluateup()
		}, 500);
	}
	function getuserevaluate(){
		$.ajax({
			type: ajaxtype,
			url: getuserevaluatelist,
			dataType: "jsonp",
			data:{
				user_id:user_id,
				page_no:page,
				list_type:list_type,//	0为点评记录，1为分享记录
				only_bonus:0//	0为必须携带佣金，1为不需要携带佣金
				
			},
			contentType: "application/json",
			jsonp: "jsonpCallback",
			jsonpCallback:"getuserevaluatelist",
//			beforeSend:function(){
//				if(page ==0){
//					$(".mui-table-view ").html("<p class='load'>加载中...</p>")
//				}
//			},
			success: function(data){
				console.log(data)
				if(data.result == 0){
					var content = data.content;
					$(".touxiang img").attr("src",content.owner_head_image_addr);
					$(".name-rank").html(decodeURI(content.owner_nickname))
					$(".top .money").html("佣金金额：<span>"+(content.owner_bonus/100).toFixed(2)+"元</span>");
					if(list_type == 0){
						$(".nummber").html("点评 <span>"+content.count+"条</span>");
					}else if(list_type == 1){
						$(".nummber").html("分享 <span>"+content.count+"条</span>");
					}
					if(content.evaluates ==''){
						var str = '<img src ="img/kong.png" style="display:block;margin:0 auto;width:50%;"/><p style="text-align:center;height:1rem;line-height:1rem;">暂无记录</p>'
						$(".mui-table-view").append(str)
					}else{
						
						var str ='';
						for(var i = 0;i<content.evaluates.length;i++){
							var brithday = content.evaluates[i].user_date_of_birth;
							var nowdate = new Date();
							var age =nowdate.getFullYear() - brithday.substr(0,4);//年龄
							str+='<div class="listdetails" evaluate_id="'
								+content.evaluates[i].evaluate_id+
								'" ><div class="details-top"><img src="'
								+content.evaluates[i].user_head_image_addr+
								'" onerror="this.src='+errorheadimg2+';"/><div class="topcenter"><div class="topcenter1"><p class="name">'
								+decodeURI(content.evaluates[i].user_nickname)+
								'</p><p class="age"><span>'
								+age+
								'岁</span></p><p class="yongjin">佣金：<span>'
						    	+(content.evaluates[i].bonus/100).toFixed(2)+
								'</span></p></div><p class="time">'
								+content.evaluates[i].create_date+
								'</p></div></div><div class="details-center"><div class="fenshu iconfont"  id="fenshu"><p class="name">'
								+decodeURI(content.evaluates[i].item_name)+
								'</p></div><div class="youdian"><span>优点：</span>'
								+decodeURI(content.evaluates[i].item_advantage)+
								'</div><div class="quedian"><span>缺点：</span>'
								+decodeURI(content.evaluates[i].item_disadvatage)+
								'</div><div class="share"><span class="iconfont">&#xe602;</span> 分享评价</div></div><div class="pic-vid">'
								if(content.evaluates[i].evaluate_image_addr){
									var evaluate_image_addr = content.evaluates[i].evaluate_image_addr;
									evaluate_image_addr =evaluate_image_addr.split(";");
									for(var j =0;j<evaluate_image_addr.length;j++){
										str +='<div class="imgdiv"><img src="'+evaluate_image_addr[j]+'"/></div>';
									}
								}
								
							str+='</div></div>'
						}
						$(".mui-table-view").append(str);
						if($(".imgdiv")){
							$(".pic-vid img").load(function(){
								for(var i =0;i<$(".imgdiv").length;i++){
									var imgdivwidth = $(".imgdiv").eq(i).width();
									var imgdivheight = imgdivwidth;
									var imgwidth = $(".imgdiv").eq(i).children("img").width();
									var imgheight = $(".imgdiv").eq(i).children("img").height();
									console.log(imgwidth+";"+imgheight)			
									if(imgheight<imgwidth){
										$(".imgdiv").eq(i).children("img").css("height","100%");
									}else{
										$(".imgdiv").eq(i).children("img").css("width","100%");
									}
									$(".imgdiv").eq(i).css("height",imgdivheight);
								}
							})
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
	function getuserevaluateup(){
		$.ajax({
			type: ajaxtype,
			url: getuserevaluatelist,
			dataType: "jsonp",
			data:{
				user_id:user_id,
				page_no:page,
				list_type:list_type,//	0为点评记录，1为分享记录
				only_bonus:0//	0为必须携带佣金，1为不需要携带佣金
				
			},
			contentType: "application/json",
			jsonp: "jsonpCallback",
			jsonpCallback:"getuserevaluatelist",

			success: function(data){
				console.log(data)
				if(data.result == 0){
					var content = data.content;
					if(content ==''){
						var str = '<img src ="img/kong.png" style="display:block;margin:0 auto;width:50%;"/><p style="text-align:center;height:1rem;line-height:1rem;">暂无此类订单</p>'
						$(".mui-table-view").html(str)
					}else{
			
						var str ='';
						for(var i = 0;i<content.evaluates.length;i++){
							var brithday = content.evaluates[i].user_date_of_birth;
							var nowdate = new Date();
							var age =nowdate.getFullYear() - brithday.substr(0,4);//年龄
							str+='<div class="listdetails" evaluate_id="'
								+content.evaluates[i].evaluate_id+
								'" ><div class="details-top"><img src="'
								+content.evaluates[i].user_head_image_addr+
								'" onerror="this.src='+errorheadimg2+';"/><p class="name">'
								+decodeURI(content.evaluates[i].user_nickname)+
								'</p><p class="age"><span>'
								+age+
								'岁</span></p><p class="yongjin">佣金：<span>'
						    	+(content.evaluates[i].bonus/100).toFixed(2)+
								'</span></p></div><div class="details-center"><div class="fenshu iconfont"  id="fenshu"><p class="name">'
								+decodeURI(content.evaluates[i].item_name)+
								'</p><p class="time">'
								+content.evaluates[i].create_date+
								'</p></div><div class="youdian"><span>优点：</span>'
								+decodeURI(content.evaluates[i].item_advantage)+
								'</div><div class="quedian"><span>缺点：</span>'
								+decodeURI(content.evaluates[i].item_disadvatage)+
								'</div><div class="share"><span class="iconfont">&#xe615;</span> 分享</div></div></div>'
						}
						$(".mui-table-view").append(str);
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
})

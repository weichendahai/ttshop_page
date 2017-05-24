$(function(){
	var shoppingcar = localStorage.getItem('shoppingcar');
	if(shoppingcar ==null){
		shoppingcar = 0;
	}
	$("footer .num").text(shoppingcar);
	var page = 0;
	var user_id = localStorage.getItem("user_id");
	text1($(".dianping .week .chakan"),$(".dianping .week .ranklist"));
	text2($(".fenxiang .week .chakan"),$(".fenxiang .week .ranklist"));
	$(" .weekmouthnav .weeknav").click(function(){//周导航
		$(".weekmouthnav .weeknav").addClass("active");
		$(".weekmouthnav .mouthnav").removeClass("active");
		$(".week").css("display","block");
		$(".mouth").css("display","none");
	});
	var on = 0;
	$(" .weekmouthnav .mouthnav").click(function(){//月导航
		$(".weekmouthnav .weeknav").removeClass("active");
		$(".weekmouthnav .mouthnav").addClass("active");
		$(".mouth").css("display","block");
		$(".week").css("display","none");
		if(on == 0){
			text1($(".dianping .week .chakan"),$(".dianping .mouth .ranklist"));
			text2($(".fenxiang .week .chakan"),$(".fenxiang .mouth .ranklist"));
			on++
		}
	});
	//查看更多榜单
	$(".ranklist").delegate("#more","click",function(){
		var ranking_type = $(".kinerNav .active").index();
		var page = $(this).parent(".ranklist").attr("page");
		page++;
		$(this).parent(".ranklist").attr("page",page);
		if(ranking_type == 0){//点评查看更多
			text1($(this).parents(".lists").find(".chakan"),$(this).parent(".ranklist"));
		}else{//分享查看更多
			text2($(this).parents(".lists").find(".chakan"),$(this).parent(".ranklist"));
		}
	})
	//查看上一周
	$(".week .chakan").click(function(){
		if($(".week .chakan").attr("season")>0){
			$(".week .ranklist").attr("page",0);//点评和分享的页码清0
			$(".week .chakan").attr("season",-1)
			text1($(".dianping .week .chakan"),$(".dianping .week .ranklist"));
			text2($(".fenxiang .week .chakan"),$(".fenxiang .week .ranklist"));
			
			$(".week .chakan").html("查看本期榜单")
			$(".weekmouthnav li").eq(0).text("上周榜单")
		}else{
			$(".week .ranklist").attr("page",0);//点评和分享的页码清0
			$(".week .chakan").attr("season",1);
			text1($(".dianping .week .chakan"),$(".dianping .week .ranklist"));
			text2($(".fenxiang .week .chakan"),$(".fenxiang .week .ranklist"));
			
			$(".week .chakan").html("查看上期榜单")
			$(".weekmouthnav li").eq(0).text("本周榜单")
		}
		
	})
	//查看上一周
	$(".mouth .chakan").click(function(){
		if($(".mouth .chakan").attr("season")>0){
			$(".mouth .ranklist").attr("page",0);//点评和分享的页码清0
			$(".mouth .chakan").attr("season",-1)
			text1($(".dianping .mouth .chakan"),$(".dianping .mouth .ranklist"));
			text2($(".fenxiang .mouth .chakan"),$(".fenxiang .mouth .ranklist"));
			
			$(".mouth .chakan").html("查看本期榜单")
			$(".weekmouthnav li").eq(1).text("上月榜单")
		}else{
			$(".mouth .ranklist").attr("page",0);//点评和分享的页码清0
			$(".mouth .chakan").attr("season",1);
			text1($(".dianping .mouth .chakan"),$(".dianping .mouth .ranklist"));
			text2($(".fenxiang .mouth .chakan"),$(".fenxiang .mouth .ranklist"));
			
			$(".mouth .chakan").html("查看上期榜单")
			$(".weekmouthnav li").eq(1).text("本月榜单")
		}
		
	})
	function text1(obj1,obj2){
		var cycle = $(".weekmouthnav .active").index();
		var page = obj2.attr("page");
		var season_no = obj1.attr("season")
		$.ajax({
			type: ajaxtype,
			url: evaluateranking,
			dataType: "jsonp",
			data:{
				user_id:user_id,
				ranking_type:0,
				cycle:cycle,
				page_no:page,
				season_no:season_no
			},
			contentType: "application/json",
			jsonp: "jsonpCallback",
			jsonpCallback:"evaluateranking1",
			beforeSend:function(){
				if(page ==0){
					obj2.html("<p class='load'>加载中...</p>")
				}else{
					obj2.find(".more").html("<img style='margin:0 auto;height:100%;' src='img/5-121204193956-50.gif'>")
				}
			},
			success: function(data){
				console.log(data)
				if(data.result == 0){
					if(data.content.listitems == ''){
						var str = '<img src ="img/kong.png" style="display:block;margin:0 auto;width:50%;"/><p style="text-align:center;height:1rem;line-height:1rem;">暂无此类榜单</p>'
						obj2.html(str);
					}else{
						var str ='';
						if(page ==0){
							if(data.content.myself==null||data.content.myself==undefined||data.content.myself==''){
								str +='<div style="height:0;"></div>'
							}else{
								str+='<div class="my" user_id="'
									+data.content.myself.user_id+
									'"><span class="touxiang"><img src="'
									+data.content.myself.head_icon+
									'" onerror="this.src='+errorheadimg2+';"/></span><div class="infromtion"><p class="name">'
									+decodeURI(data.content.myself.nickname)+
									'</p><p class="yongjin">佣金：<a>￥'
									+(data.content.myself.bonus/100).toFixed(2)+
									'</a></p></div><span class="rank">第<a>'
									+data.content.myself.rank_no+
									'</a>名</span></div>'
							}
							
							for(var i = 0;i<data.content.listitems.length;i++){
								if(i == 0){
									str+='<li user_id="'
										+data.content.listitems[i].user_id+
										'"><div class="one"><a class="huangguan"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-wangguan"></use></svg></a><span class="touxiang"><img src="'
										+data.content.listitems[i].head_icon+
										'" onerror="this.src='+errorheadimg2+';"/></span></div><div class="infromtion"><p class="name">'
										+decodeURI(data.content.listitems[i].nickname)+
										'</p><p class="yongjin">佣金：<a>￥'
										+(data.content.listitems[i].bonus/100).toFixed(2)+
										'</a></p></div><span class=" topone"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-NO"></use></svg></span></li>'
								}else if(i == 1){
									str+='<li user_id="'
										+data.content.listitems[i].user_id+
										'"><div class="two"><a class="huangguan"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-wangguan-copy-copy"></use></svg></a><span class="touxiang"><img src="'
										+data.content.listitems[i].head_icon+
										'" onerror="this.src='+errorheadimg2+';"/></span></div><div class="infromtion"><p class="name">'
										+decodeURI(data.content.listitems[i].nickname)+
										'</p><p class="yongjin">佣金：<a>￥'
										+(data.content.listitems[i].bonus/100).toFixed(2)+
										'</a></p></div><span class=" toptwo"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-NO2"></use></svg></span></li>'
								}else if(i ==2){
									str+='<li user_id="'
										+data.content.listitems[i].user_id+
										'"><div class="three"><a class="huangguan"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-wangguan-copy"></use></svg></a><span class="touxiang"><img src="'
										+data.content.listitems[i].head_icon+
										'" onerror="this.src='+errorheadimg2+';"/></span></div><div class="infromtion"><p class="name">'
										+decodeURI(data.content.listitems[i].nickname)+
										'</p><p class="yongjin">佣金：<a>￥'
										+(data.content.listitems[i].bonus/100).toFixed(2)+
										'</a></p></div><span class=" topthree"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-NO1"></use></svg></span></li>'
								}else{
									str+='<div class="my myelse" user_id="'
										+data.content.listitems[i].user_id+
										'"><span class="touxiang"><img src="'
										+data.content.listitems[i].head_icon+
										'" onerror="this.src='+errorheadimg2+';"/></span><div class="infromtion"><p class="name">'
										+decodeURI(data.content.listitems[i].nickname)+
										'</p><p class="yongjin">佣金：<a>￥'
										+(data.content.listitems[i].bonus/100).toFixed(2)+
										'</a></p></div><span class="rank">第<a>'
										+data.content.listitems[i].rank_no+
										'</a>名</span></div>'
								}
								
							}
							if(data.content.next_page_no<0){
								str+='<div class="more">没有更多数据啦</div>'
							}else{
								str+='<div class="more" id="more">点击查看更多排名</div>'
							}
							
							obj2.html(str)
						}else{
							
							for(var i = 0;i<data.content.listitems.length;i++){
								if(i == 0){
									str+='<li user_id="'
										+data.content.listitems[i].user_id+
										'"><div class="one"><a class="huangguan"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-wangguan"></use></svg></a><span class="touxiang"><img src="'
										+data.content.listitems[i].head_icon+
										'" onerror="this.src='+errorheadimg2+';"/></span></div><div class="infromtion"><p class="name">'
										+decodeURI(data.content.listitems[i].nickname)+
										'</p><p class="yongjin">佣金：<a>￥'
										+(data.content.listitems[i].bonus/100).toFixed(2)+
										'</a></p></div><span class=" topone"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-NO"></use></svg></span></li>'
								}else if(i == 1){
									str+='<li user_id="'
										+data.content.listitems[i].user_id+
										'"><div class="two"><a class="huangguan"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-wangguan-copy-copy"></use></svg></a><span class="touxiang"><img src="'
										+data.content.listitems[i].head_icon+
										'" onerror="this.src='+errorheadimg2+';"/></span></div><div class="infromtion"><p class="name">'
										+decodeURI(data.content.listitems[i].nickname)+
										'</p><p class="yongjin">佣金：<a>￥'
										+(data.content.listitems[i].bonus/100).toFixed(2)+
										'</a></p></div><span class=" toptwo"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-NO2"></use></svg></span></li>'
								}else if(i ==2){
									str+='<li user_id="'
										+data.content.listitems[i].user_id+
										'"><div class="three"><a class="huangguan"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-wangguan-copy"></use></svg></a><span class="touxiang"><img src="'
										+data.content.listitems[i].head_icon+
										'" onerror="this.src='+errorheadimg2+';"/></span></div><div class="infromtion"><p class="name">'
										+decodeURI(data.content.listitems[i].nickname)+
										'</p><p class="yongjin">佣金：<a>￥'
										+(data.content.listitems[i].bonus/100).toFixed(2)+
										'</a></p></div><span class=" topthree"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-NO1"></use></svg></span></li>'
								}else{
									str+='<div class="my myelse" user_id="'
										+data.content.listitems[i].user_id+
										'"><span class="touxiang"><img src="'
										+data.content.listitems[i].head_icon+
										'" onerror="this.src='+errorheadimg2+';"/></span><div class="infromtion"><p class="name">'
										+decodeURI(data.content.listitems[i].nickname)+
										'</p><p class="yongjin">佣金：<a>￥'
										+(data.content.listitems[i].bonus/100).toFixed(2)+
										'</a></p></div><span class="rank">第<a>'
										+data.content.listitems[i].rank_no+
										'</a>名</span></div>'
									
								
								}
								
							}
							if(data.content.next_page_no<0){
								str+='<div class="more">没有更多数据啦</div>'
							}else{
								str+='<div class="more" id="more">点击查看更多排名</div>'
							}
							obj2.find(".more").remove();
							obj2.append(str)
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
	function text2(obj1,obj2){
		var cycle = $(".weekmouthnav .active").index();
		var page = obj2.attr("page");
		//var season_no = obj1.attr("season")
		$.ajax({
			type: ajaxtype,
			url: evaluateranking,
			dataType: "jsonp",
			data:{
				user_id:user_id,
				ranking_type:0,
				cycle:cycle,
				page_no:page,
				season_no:1
			},
			contentType: "application/json",
			jsonp: "jsonpCallback",
			jsonpCallback:"evaluateranking2",
			beforeSend:function(){
				if(page ==0){
					obj2.html("<p class='load'>加载中...</p>")
				}else{
					obj2.find(".more").html("<img style='margin:0 auto;height:100%;' src='img/5-121204193956-50.gif'>")
				}
			},
			success: function(data){
				console.log(data)
				if(data.result == 0){
					if(data.content.listitems == ''){
						var str = '<img src ="img/kong.png" style="display:block;margin:0 auto;width:50%;"/><p style="text-align:center;height:1rem;line-height:1rem;">暂无此类榜单</p>'
						obj2.html(str);
					}else{
						var str ='';
						if(page ==0){
							if(data.content.myself==null||data.content.myself==undefined||data.content.myself==''){
								str +='<div style="height:0;"></div>'
							}else{
								str+='<div class="my" user_id="'
									+data.content.myself.user_id+
									'"><span class="touxiang"><img src="'
									+data.content.myself.head_icon+
									'" onerror="this.src='+errorheadimg2+';"/></span><div class="infromtion"><p class="name">'
									+decodeURI(data.content.myself.nickname)+
									'</p><p class="yongjin">佣金：<a>￥'
									+(data.content.myself.bonus/100).toFixed(2)+
									'</a></p></div><span class="rank">第<a>'
									+data.content.myself.rank_no+
									'</a>名</span></div>'
							}
							for(var i = 0;i<data.content.listitems.length;i++){
								if(i == 0){
									str+='<li user_id="'
										+data.content.listitems[i].user_id+
										'"><div class="one"><a class="huangguan"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-wangguan"></use></svg></a><span class="touxiang"><img src="'
										+data.content.listitems[i].head_icon+
										'" onerror="this.src='+errorheadimg2+';"/></span></div><div class="infromtion"><p class="name">'
										+decodeURI(data.content.listitems[i].nickname)+
										'</p><p class="yongjin">佣金：<a>￥'
										+(data.content.listitems[i].bonus/100).toFixed(2)+
										'</a></p></div><span class=" topone"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-NO"></use></svg></span></li>'
								}else if(i == 1){
									str+='<li user_id="'
										+data.content.listitems[i].user_id+
										'"><div class="two"><a class="huangguan"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-wangguan-copy-copy"></use></svg></a><span class="touxiang"><img src="'
										+data.content.listitems[i].head_icon+
										'" onerror="this.src='+errorheadimg2+';"/></span></div><div class="infromtion"><p class="name">'
										+decodeURI(data.content.listitems[i].nickname)+
										'</p><p class="yongjin">佣金：<a>￥'
										+(data.content.listitems[i].bonus/100).toFixed(2)+
										'</a></p></div><span class=" toptwo"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-NO2"></use></svg></span></li>'
								}else if(i ==2){
									str+='<li user_id="'
										+data.content.listitems[i].user_id+
										'"><div class="three"><a class="huangguan"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-wangguan-copy"></use></svg></a><span class="touxiang"><img src="'
										+data.content.listitems[i].head_icon+
										'" onerror="this.src='+errorheadimg2+';"/></span></div><div class="infromtion"><p class="name">'
										+decodeURI(data.content.listitems[i].nickname)+
										'</p><p class="yongjin">佣金：<a>￥'
										+(data.content.listitems[i].bonus/100).toFixed(2)+
										'</a></p></div><span class=" topthree"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-NO1"></use></svg></span></li>'
								}else{
									str+='<div class="my myelse" user_id="'
										+data.content.listitems[i].user_id+
										'"><span class="touxiang"><img src="'
										+data.content.listitems[i].head_icon+
										'" onerror="this.src='+errorheadimg2+';"/></span><div class="infromtion"><p class="name">'
										+decodeURI(data.content.listitems[i].nickname)+
										'</p><p class="yongjin">佣金：<a>￥'
										+(data.content.listitems[i].bonus/100).toFixed(2)+
										'</a></p></div><span class="rank">第<a>'
										+data.content.listitems[i].rank_no+
										'</a>名</span></div>'
								}
								
							}
							if(data.content.next_page_no<0){
								str+='<div class="more">没有更多数据啦</div>'
							}else{
								str+='<div class="more">点击查看更多排名</div>'
							}
							
							obj2.html(str)
						}else{
							
							for(var i = 0;i<data.content.listitems.length;i++){
								if(i == 0){
									str+='<li user_id="'
										+data.content.listitems[i].user_id+
										'"><div class="one"><a class="huangguan"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-wangguan"></use></svg></a><span class="touxiang"><img src="'
										+data.content.listitems[i].head_icon+
										'" onerror="this.src='+errorheadimg2+';"/></span></div><div class="infromtion"><p class="name">'
										+decodeURI(data.content.listitems[i].nickname)+
										'</p><p class="yongjin">佣金：<a>￥'
										+(data.content.listitems[i].bonus/100).toFixed(2)+
										'</a></p></div><span class=" topone"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-NO"></use></svg></span></li>'
								}else if(i == 1){
									str+='<li user_id="'
										+data.content.listitems[i].user_id+
										'"><div class="two"><a class="huangguan"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-wangguan-copy-copy"></use></svg></a><span class="touxiang"><img src="'
										+data.content.listitems[i].head_icon+
										'" onerror="this.src='+errorheadimg2+';"/></span></div><div class="infromtion"><p class="name">'
										+decodeURI(data.content.listitems[i].nickname)+
										'</p><p class="yongjin">佣金：<a>￥'
										+(data.content.listitems[i].bonus/100).toFixed(2)+
										'</a></p></div><span class=" toptwo"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-NO2"></use></svg></span></li>'
								}else if(i ==2){
									str+='<li user_id="'
										+data.content.listitems[i].user_id+
										'"><div class="three"><a class="huangguan"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-wangguan-copy"></use></svg></a><span class="touxiang"><img src="'
										+data.content.listitems[i].head_icon+
										'" onerror="this.src='+errorheadimg2+';"/></span></div><div class="infromtion"><p class="name">'
										+decodeURI(data.content.listitems[i].nickname)+
										'</p><p class="yongjin">佣金：<a>￥'
										+(data.content.listitems[i].bonus/100).toFixed(2)+
										'</a></p></div><span class=" topthree"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-NO1"></use></svg></span></li>'
								}else{
									str+='<div class="my myelse" user_id="'
										+data.content.listitems[i].user_id+
										'"><span class="touxiang"><img src="'
										+data.content.listitems[i].head_icon+
										'" onerror="this.src='+errorheadimg2+';"/></span><div class="infromtion"><p class="name">'
										+decodeURI(data.content.listitems[i].nickname)+
										'</p><p class="yongjin">佣金：<a>￥'
										+(data.content.listitems[i].bonus/100).toFixed(2)+
										'</a></p></div><span class="rank">第<a>'
										+data.content.listitems[i].rank_no+
										'</a>名</span></div>'

								}
								
							}
							if(data.content.next_page_no<0){
								str+='<div class="more">没有更多数据啦</div>'
							}else{
								str+='<div class="more">点击查看更多排名</div>'
							}
							obj2.find(".more").remove();
							obj2.append(str)
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
	//跳转
	$(".dianping .ranklist ").delegate("li","click",function(){
		var user_id = $(this).attr("user_id");
		window.location.href = "Listdelists.html?fenlei=dianping&user_id="+user_id;
	})
	$(".dianping ").delegate(".my","click",function(){
		var user_id = $(this).attr("user_id");
		window.location.href = "Listdelists.html?fenlei=dianping&user_id="+user_id;
	})
	$(".fenxiang .ranklist ").delegate("li","click",function(){
		var user_id = $(this).attr("user_id");
		window.location.href = "Listdelists.html?fenlei=fenxiang&user_id="+user_id;
	})
	$(".fenxiang").delegate(".my","click",function(){
		var user_id = $(this).attr("user_id");
		window.location.href = "Listdelists.html?fenlei=fenxiang&user_id="+user_id;
	})
	//ajax
	
})

$(function(){
	var user_id = localStorage.getItem("user_id");
	var list_type = 0;
	var page = 0;
	var page2 = 0;
	var shoppingcar = localStorage.getItem('shoppingcar');
	if(shoppingcar ==null){
		shoppingcar = 0;
	}
	$("footer .num").text(shoppingcar);
	firstgetsample(page,0,0);

	firstgetsample(page2,1,1);

	
	mui.init();
	(function($) {
		//阻尼系数
		var deceleration = mui.os.ios?0.003:0.0009;
		$('.mui-scroll-wrapper').scroll({
			bounce: false,
			indicators: true, //是否显示滚动条
			deceleration:deceleration
		});
		$.ready(function() {
			//循环初始化所有下拉刷新，上拉加载。
			$.each(document.querySelectorAll('.mui-slider-group .mui-scroll'), function(index, pullRefreshEl) {
				$(pullRefreshEl).pullToRefresh({
					down: {
						callback: function() {
							var self = this;
							page = 0;
							list_type = index;
							setTimeout(function() {
								var ul = self.element.querySelector('.mui-table-view');
								getsample(page,list_type,self);
								
							}, 1000);
						}
					},
					up: {
						callback: function() {
							var self = this;
							
							
							list_type = index;
							setTimeout(function() {
								var ul = self.element.querySelector('.mui-table-view');
								if(list_type==0){
									page++;
									getsample(page,list_type,self);
								}else if(list_type ==1){
									page2++;
									getsample(page2,list_type,self)
								}
								
								
							}, 1000);
						}
					}
				});
			});
			
		});
	})(mui);
	function getsample(page,list_type,self){
		$.ajax({
			type: ajaxtype,
			url: getsamplelist,
			dataType: "jsonp",
			data:{
				user_id:user_id,
				page_no:page,
				list_type:list_type
			},
			contentType: "application/json",
			jsonp: "jsonpCallback",
			jsonpCallback:"getsamplelist",
			beforeSend:function(){
				if(page == 0){
					$(".mui-table-view").eq(list_type).html("<p class='load'>加载中...</p>")
				}
				
			},
			success: function(data){
				console.log(data)
				if(data.result == 0){
					var next_page_no = data.content.next_page_no;
					if(next_page_no < 0){
						next_page_no = true;
					}else{
						next_page_no = false;
					}
					var str ='';
					for(var i =0;i<data.content.samples.length;i++){
						str +='<li sample_id="'+data.content.samples[i].sample_id+'" item_id="'
							+data.content.samples[i].item_id+
							'"><img class="banner" src="'
							+data.content.samples[i].sample_image_addr+
							'" onerror="this.src='+bigerrorimg+';"/><div class="jieshao"><div class="left"><h6>'
							+decodeURI(data.content.samples[i].item_name)+
							'</h6><div class="btn ljcy">立即参与</div></div><div class="right"><p>数量：<span>'
							+data.content.samples[i].item_count+
							'</span></p><p>参与人数：<span>'
							+data.content.samples[i].apply_count+
							'</span></p><p>距离结束：<span class="daojishi"></psan></p></div></div></li>'
					}
					var len = $(".mui-table-view").eq(list_type).children("li").length;
					console.log(len)
					if(page == 0){
						$(".mui-table-view").eq(list_type).html(str);
						self.endPullDownToRefresh(next_page_no);
					}else{
						$(".mui-table-view").eq(list_type).append(str);
						self.endPullUpToRefresh(next_page_no);
					}
					for(var i =0;i<data.content.samples.length;i++){
						var b = data.content.samples[i].end_date;
						var a = document.getElementsByClassName("mui-table-view")[list_type].getElementsByClassName("daojishi")[i+len];
						var c = document.getElementsByClassName("mui-table-view")[list_type].getElementsByClassName("btn")[i+len];
						//	var a = $(".mui-table-view").eq(list_type).find(".daojishi").eq(i+len);
//						var c = $(".mui-table-view").eq(list_type).find(".btn").eq(i+len);
						var state = data.content.samples[i].state;
						if(state == 0){
							c.innerHTML= "申请中";
		    				c.setAttribute('class','btn sqz');
						}else if(state == 1){
							c.innerHTML= "已中签";
		    				c.setAttribute('class','btn yzq');
						}else if(state == 2){
							c.innerHTML= "未中签";
		    				c.setAttribute('class','btn wzq');
						}
						leftTime(a,b,c)
						
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
	function firstgetsample(page,list_type,num){
		$.ajax({
			type: ajaxtype,
			url: getsamplelist,
			dataType: "jsonp",
			data:{
				user_id:user_id,
				page_no:page,
				list_type:list_type
			},
			contentType: "application/json",
			jsonp: "jsonpCallback",
			jsonpCallback:"getsamplelist"+num,
			beforeSend:function(){
				$(".mui-table-view").eq(list_type).html("<p class='load'>加载中...</p>")
			},
			success: function(data){
				console.log(data)
				if(data.result == 0){
					var str ='';
					for(var i =0;i<data.content.samples.length;i++){
						str +='<li sample_id="'+data.content.samples[i].sample_id+'" item_id="'
							+data.content.samples[i].item_id+
							'"><img class="banner" src="'
							+data.content.samples[i].sample_image_addr+
							'" onerror="this.src='+bigerrorimg+';"/><div class="jieshao"><div class="left"><h6>'
							+decodeURI(data.content.samples[i].item_name)+
							'</h6><div class="btn ljcy">立即参与</div></div><div class="right"><p>数量：<span>'
							+data.content.samples[i].item_count+
							'</span></p><p>参与人数：<span>'
							+data.content.samples[i].apply_count+
							'</span></p><p>距离结束：<span class="daojishi"></psan></p></div></div></li>'
					}
					var len = $(".mui-table-view").eq(0).children("li").length;
					$(".mui-table-view").eq(list_type).html(str);
					
					for(var i =0;i<data.content.samples.length;i++){
						var b = data.content.samples[i].end_date;
						var a = document.getElementsByClassName("daojishi")[i+len];
						var c = document.getElementsByClassName("btn")[i+len];
						var state = data.content.samples[i].state;
						if(state == 0){
							c.innerHTML= "申请中";
		    				c.setAttribute('class','btn sqz');
						}else if(state == 1){
							c.innerHTML= "已中签";
		    				c.setAttribute('class','btn yzq');
						}else if(state == 2){
							c.innerHTML= "未中签";
		    				c.setAttribute('class','btn wzq');
						}
						leftTime(a,b,c)
						
						
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
	//倒计时
	function leftTime(a,b,c){
		setInterval(function(){
			var endTime = new Date(b);//结束时间
		    var curTime = new Date();//当前时间
		    var leftTime = parseInt((endTime.getTime() - curTime.getTime())/1000);//获得时间差秒数
		   //小时、分、秒需要取模运算
		    var d = parseInt(leftTime/(60*60*24));
		    if(d<10){
		    	d = "0"+d
		    	
		    }
		    var h = parseInt(leftTime/(60*60)%24);
		    if(h<10){
		    	h = "0"+h
		    	
		    }
		    var m = parseInt(leftTime/60%60);
		    if(m<10){
		    	m = "0"+m
		    	
		    }
		    var s = parseInt(leftTime%60);
		    if(s<10){
		    	s = "0"+s
		    }
		    var ms = parseInt(((endTime.getTime() - curTime.getTime())/100)%10); // 这样确认毫秒数是一位
		    var txt = d+"天"+h+":"+m+":"+s;
		    a.innerHTML = txt;
		    if(leftTime<=0){ 
		    	//倒计时结束回调函数
		    	a.innerHTML= "0天";
		    	c.innerHTML= "已结束";
		    	c.setAttribute('class','btn yjs');
		    }
		},100)
	    
 	};
	$(".wrapper").on("tap",".banner",function(){
		var item_id = $(this).parent("li").attr("item_id");
		window.location.href = "html/productdetails.html?item_id="+item_id;
	})
	$(".wrapper").on("tap",".ljcy",function(event){
		var sample_id = $(this).parents("li").attr("sample_id");
		var obj = $(this);
		$.ajax({
			type: ajaxtype,
			url: applysample,
			dataType: "jsonp",
			data:{
				user_id:user_id,
				sample_id:sample_id
			},
			contentType: "application/json",
			jsonp: "jsonpCallback",
			jsonpCallback:"applysample",
			success: function(data){
				console.log(data)
				if(data.result == 0){
					new Toast({context:$('body'),message:'参与成功'}).show(); 
					obj.html("申请中");
					obj.removeClass("ljcy").addClass("sqz");
					$("#item2mobile .mui-table-view").prepend(obj.parents("li").prop("outerHTML"));
					obj.parents("li").remove();
				}else{
					new Toast({context:$('body'),message:decodeURI(data.content)}).show(); 
				}
			},
			error: function(){
				new Toast({context:$('body'),message:'网络故障'}).show(); 
			}
		})
		event.stopPropagation()
	})
})

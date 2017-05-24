$(function(){
	var page = 0;
	var item_id = Request.QueryString("item_id");//产品id
	var buytype =0;
	var evaluate_shared_id = Request.QueryString("evaluate_shared_id");
	var user_id = localStorage.getItem("user_id");
	//商品描述ajax
	$.ajax({
		type: ajaxtype,
		url: getiteminfo,
		dataType: "jsonp",
		data:{
			user_id:user_id,
			item_id:item_id,
			evaluate_shared_id:evaluate_shared_id
				},
		contentType: "application/json",
		jsonp: "jsonpCallback",
		jsonpCallback:"getiteminfo",
		success: function(data){
			console.log(data)
			if(data.result == 0){
				var content = data.content;
				var imgstr = content.item_big_image_addr;//图片地址
				$(".productImg img").attr("src",imgstr)
				//console.log(content)
				$(".productName").text(decodeURI(content.item_name));//产品姓名
				var price = (content.price/100).toFixed(2);//保留两位小数 string
				$(".productMoney .money").text("￥"+price);//价钱
				$(".productMoney .buynum").text( content.order_count+"人购买");//购买数量
				//产品型号
				var propertysstr = '';
				for(var i = 0;i<content.propertys.length;i++){
					propertysstr+='<div class="xinghao1" property_key ="'
						+content.propertys[i].property_key+
						'"><p class="title">选择'
						+decodeURI(content.propertys[i].property_key_desc)+
							'</p>'
					for(var j = 0;j<content.propertys[i].values.length;j++){
						if(j == 0){
							propertysstr+='<span class="check" property_value = "'
								+content.propertys[i].values[j].property_value+
								'">'
								+decodeURI(content.propertys[i].values[j].property_desc)+
								'</span>'
						}else{
							propertysstr+='<span property_value = "'
								+content.propertys[i].values[j].property_value+
								'">'
								+decodeURI(content.propertys[i].values[j].property_desc)+
								'</span>'
						}
						
						
					}	
					propertysstr+='</div>'
					
				}
				$(".xinghaobox").append(propertysstr)
				
				//评分
				var starhalf = Math.round(content.grade/10)%2;//半星
				var staron = Math.floor(content.grade/10/2);  //整星
				var staroff = 5-staron-starhalf;    //无星
				console.log(staroff)
				var starstr="";
				for	(var j=0;j<staron;j++){
					starstr +='<img src="../img/star-on.png"/>'
				}
				if(starhalf == 1){//判断有没有半颗星
					starstr +='<img src="../img/star-half.png"/>'
				}
				if(staroff >0){//判断有没有星
					for	(var j=0;j<staroff;j++){
						starstr +='<img src="../img/star-off.png"/>'
					}
				}
				$(".productrenqi p").eq(1).append(starstr)//评分
				$(".productrenqi p").eq(2).find("b").text(content.evaluate_count+"人")//点评人数
				$(".productrenqi p").eq(3).find("b").text(content.shared_count+"人")//分享人数
				var gongxiaostr = decodeURI(content.item_desc);
				$(".productcanshu p").eq(1).find("b").text(gongxiaostr)//功效
				//产品参数
				var distributionsstr = '';//年龄比例肤质
				for(var i = 0;i<content.distributions.length;i++){
					distributionsstr+='<p><span>'
									+decodeURI(content.distributions[i].distribution_type_desc)+"："+
									'</span><a>'
					var count = 0;//总数量
					for(var j= 0;j<content.distributions[i].distribution_value.length;j++){
						count = count+content.distributions[i].distribution_value[j].distribution_count
					}
					for(var j= 0;j<content.distributions[i].distribution_value.length;j++){
						distributionsstr+='<b>'
						+decodeURI(content.distributions[i].distribution_value[j].distribution_sub_desc)+
						'-'
						+(content.distributions[i].distribution_value[j].distribution_count/count)*100+"%"
						'</b>'
					}
					distributionsstr+='</a></p>'	
				}
				$(".productcanshu").append(distributionsstr);
			}else{
				new Toast({context:$('body'),message:decodeURI(data.content)}).show(); 
			}
			
		},
		error: function(){
			new Toast({context:$('body'),message:'网络故障'}).show(); 
		}
	});
	//商品详情ajax
	$.ajax({
		type: ajaxtype,
		url: getitemdesc,
		dataType: "jsonp",
		data:{item_id:item_id},
		contentType: "application/json",
		jsonp: "jsonpCallback",
		jsonpCallback:"getitemdesc",
		success: function(data){
			console.log(data)
			
			for(var i =0;i<data.content.info_image_addrs.length;i++){
				var str = '<img src="'
							+data.content.info_image_addrs[i]+
							'"onerror="this.src='+bigerrorimg2+';">'
				$("#details").append(str)
			}
		},
		error: function(){
			new Toast({context:$('body'),message:'网络故障'}).show();
		}
	});
	//商品评价ajax
	getitemevaluate();
	function getitemevaluate(){
		$.ajax({
			type: ajaxtype,
			url: getitemevaluatelist,
			dataType: "jsonp",
			data:{
				item_id:item_id,
				page_no:page
			},
			contentType: "application/json",
			jsonp: "jsonpCallback",
			jsonpCallback:"getitemevaluatelist",
			success: function(data){
				console.log(data)
				if(data.result == 0){
					var evaluates = data.content.evaluates;
					$(".gotocomment").attr({'item_id':data.content.item_id})//设置一个商品ID属性
					var nowdate = new Date();
					var str = '';
					for(var i =0;i<evaluates.length;i++){
						var brithday = evaluates[i].user_date_of_birth;
						var age =nowdate.getFullYear() - brithday.substr(0,4);//年龄
						var commentdata = evaluates[i].create_date.split(" ")[0];//点评日期
						str +='<div class="listdetails" evaluate_id="'
								+evaluates[i].evaluate_id+
								'"><div class="details-top"><img src="'
								+evaluates[i].user_head_image_addr+
								'" /><p class="name">'
								+decodeURI(evaluates[i].user_nickname)+
								'</p><span class="medal"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-NO"></use></svg></span><p class="age"><span>'
								+age+
								'岁</span></p></div><div class="details-center"><div class="fenshu iconfont"  id="fenshu">'
						var starhalf = Math.round(evaluates[i].grade/10)%2;//半星
						var staron = Math.floor(evaluates[i].grade/10/2);  
						var staroff = 5-staron-starhalf;
					for	(var j=0;j<staron;j++){
						str +='<img class="star" src="../img/star-on.png"/>'
					}
					if(starhalf == 1){//判断有没有半颗星
						str +='<img class="star" src="../img/star-half.png"/>'
					}
					if(staroff >0){//判断有没有星
						for	(var j=0;j<staroff;j++){
							str +='<img class="star" src="../img/star-off.png"/>'
						}
					}  
					str +=	'<p class="time">'
							+commentdata+
							'</p></div><div class="youdian"><span>优点：</span>'
							+decodeURI(evaluates[i].item_advantage)+	
							'</div><div class="quedian"><span>缺点：</span>'
							+decodeURI(evaluates[i].item_disadvatage)+
							'</div></div></div>'	
					}
					if(page == 0){
						$(".mui-table-view").html(str)
					}else{
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
		});
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
	
	function pullfresh(){
		page =0;
		setTimeout(function() {
			getitemevaluate()
			mui('#pullrefresh').pullRefresh().endPulldownToRefresh();//结束刷新
		},1500)
		
	}
	function pullupRefresh() {
		page++;
		setTimeout(function() {
			getitemevaluate();	
		}, 1500);
	}
	//ajax结束
	
	//点评
	$(".gotocomment").click(function(){
		localStorage.setItem("item_id",item_id);
		localStorage.setItem("productname",$("#product .productName").text());
		localStorage.setItem("productmoney",$("#product .money").text());
		localStorage.setItem("productimg",$("#product .productImg img").attr("src"));
		window.location.href = "../comment.html";
	});
	//点评详情
	$(".mui-table-view ").on("tap",".listdetails",function(){
		var evaluate_id = $(this).attr("evaluate_id");
		localStorage.setItem("details-tophtml",$(this).children(".details-top").html());
		window.location.href = "productcommentdetalis.html?evaluate_id="+evaluate_id;
	})
	
	$(".xinghaobox").delegate("span","click",function(){
		$(this).parents(".xinghao1").children("span").css({
			"background":"#fff",
    		"color": "#000",
    		"border-color": "#b9b9b9"
    		})
		$(this).css({
			"background":"#fe547b",
    		"color": "#fff",
    		"border-color": "#fe547b"
    	})
		$(this).parents(".xinghao1").children("span").removeClass("check");
		$(this).addClass("check");
	})
	//立即购买
	$(".foot li").eq(0).click(function(){
		var cart_item_ids = item_id+",";
		//alert($(".xinghao1").length)
		for(var i = 0;i<$(".xinghao1").length;i++){
			if(i == $(".xinghao1").length-1){
				cart_item_ids+=$(".xinghao1").eq(i).attr("property_key")+","
			}else{
				cart_item_ids+=$(".xinghao1").eq(i).attr("property_key")+"-"
			}
		}
		for(var i = 0;i<$(".xinghao1").length;i++){
			if(i == $(".xinghao1").length-1){
				cart_item_ids+=$(".xinghao1").eq(i).find(".check").attr("property_value")
			}else{
				cart_item_ids+=$(".xinghao1").eq(i).find(".check").attr("property_value")+"-"
			}
		}
		var shoppingcar = localStorage.getItem("shoppingcar");
		if(shoppingcar == 0){
			window.location.href = "jiesuan.html?cart_item_ids="+cart_item_ids+"&buytype="+buytype+"&evaluate_shared_id="+evaluate_shared_id;
		}else{
			add();
		}
	})
	$(".foot li").eq(1).click(function(){
		add()
	})
	function add(){
		var property_key ="";
		var property_value ="";
		for(var i =0;i<$(".xinghao1").length;i++){
			if(i == $(".xinghao1").length-1){
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
				window.location.href = "../gouwuche.html"
			},
			error: function(){
				new Toast({context:$('body'),message:'网络故障'}).show();
			}
		})
	}
})

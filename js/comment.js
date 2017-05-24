$(function(){
	var shoppingcar = localStorage.getItem('shoppingcar');
	if(shoppingcar ==null){
		shoppingcar = 0;
	}
	$("footer .num").text(shoppingcar);
	//有无商品000
	var user_id = localStorage.getItem("user_id")
	var item_id = localStorage.getItem("item_id");
	var item_idArr = localStorage.getItem("item_idArr");//同款
	var item_id_common = localStorage.getItem("item_id_common");
	var showImagestr = localStorage.getItem("showImagestr");
	if(item_id == item_id_common && item_id !=null &&item_id != 'undefined' &&item_id != ''){//如果是一款商品的话保留文字 并且文字个数要和文字保持一致
		var youdian = localStorage.getItem("youdian");
		var quedian = localStorage.getItem("quedian");
		$("#youdian").val(youdian);
		$("#quedian").val(quedian);
		for(var i = 0;i<$(".wenzi").length;i++){
			var zishu = $(".wenzi").eq(i).find("input").val().length;
			$(".wenzi").eq(i).find(".num").children('a').text(zishu);
		}
		$(".imgarrshow").html(showImagestr);
	}else{
		$(".wenzi").find("input").val("");//如果选择的不是同一款商品 内容清空
		$(".imgarrshow").html('');
	}
	if(item_id == null||item_id == 'undefined'){//没有商品不显示
		$("#commentproduct").css({
			"width":"0",
			"height":"0",
			"padding":"0"
		})
		$("section").css({
			"paddingTop":"0.6rem"
		})
	}else{//有商品把储存的信息拿出来显示
		var productname = localStorage.getItem("productname");
		var productmoney = localStorage.getItem("productmoney");
		var productimg = localStorage.getItem("productimg");
		var item_price_discount = localStorage.getItem("item_price_discount");
		var str = '<img src="'
			+productimg+
			'" onerror="this.src='+errorimg+';"/><div class="center"><h3>'
			+productname+
			'</h3><p>折扣价：<a>'
			+item_price_discount+
			'</a></p></div>'
		$("#commentproduct").html(str);
		$("#commentproduct").attr("item_id",item_id);
	}
	if(item_idArr == null || item_idArr == 'undefined'||item_idArr == ""){//没有同款不显示
		console.log("无同款")
	}else{
		var item_idArr = localStorage.getItem("item_idArr").split(",");
		var productnameArr = localStorage.getItem("productnameArr").split(",");
		var productmoneyArr = localStorage.getItem("productmoneyArr").split(",");
		var productimgArr = localStorage.getItem("productimgArr").split(",");
		var str = '';
		for(var i = 0;i<item_idArr.length;i++){
			str+='<div class="product" item_id="'
				+item_idArr[i]+
				'"><img src="'
				+productimgArr[i]+
				'"/><div class="center"><h3>'
				+productnameArr[i]+
				'</h3><p>参考价：<a>'
				+productmoneyArr[i]+
				'</a></p></div><div class="shanchu">删除</div></div>'	
		}
		$(".Recommend").append(str)
	}
	//清除缓存
	function removeItem(){
		localStorage.removeItem("item_id");
		localStorage.removeItem("productname");
		localStorage.removeItem("productmoney");
		localStorage.removeItem("productimg");
		localStorage.removeItem("item_idArr");
		localStorage.removeItem("productnameArr");
		localStorage.removeItem("productmoneyArr");
		localStorage.removeItem("productimgArr");
		localStorage.removeItem("item_id_common");
	}
	//清除同款
	function removeRecommend(index){
		var item_idArr = localStorage.getItem("item_idArr").split(",");
		var productnameArr = localStorage.getItem("productnameArr").split(",");
		var productmoneyArr = localStorage.getItem("productmoneyArr").split(",");
		var productimgArr = localStorage.getItem("productimgArr").split(",");
		item_idArr = item_idArr.splice(index,1);
		productnameArr = productnameArr.splice(index,1);
		productmoneyArr = productmoneyArr.splice(index,1);
		productimgArr = productimgArr.splice(index,1);
		localStorage.setItem("item_idArr",item_idArr);
		localStorage.setItem("productnameArr",productnameArr);
		localStorage.setItem("productimgArr",productimgArr);
		localStorage.setItem("productmoneyArr",productmoneyArr);
	}
	//选择商品
	$("#changeproduct").click(function(){
		item_id_common = item_id;
		localStorage.setItem("item_id_common",item_id_common);
		localStorage.setItem("showImagestr",$(".imgarrshow").html());
		localStorage.setItem("youdian",$("#youdian").val());
		localStorage.setItem("quedian",$("#quedian").val());
		window.location.href = "searchresult.html?time=New Date()&comments=1"
	})
	$(".Recommend .change").click(function(){
		item_id_common = item_id;
		localStorage.setItem("item_id_common",item_id_common);
		localStorage.setItem("showImagestr",$(".imgarrshow").html());
		localStorage.setItem("youdian",$("#youdian").val());
		localStorage.setItem("quedian",$("#quedian").val());
		if(item_id == null||item_id=='undefined'){//如果点评商品没有不能选择同款推荐
			new Toast({context:$('body'),message:'请先选择点评商品'}).show();
		}else if($(".Recommend .product").length>=5){
			new Toast({context:$('body'),message:'最多选择5条同款商品'}).show();
		}else{
			window.location.href = "searchresult.html?time=New Date()&comments=2"
		}
		
	})
	//删除同款
	$(".Recommend ").delegate(".shanchu","click",function(){
		var index = $(this).parents(".product").index()-1;
		removeRecommend(index);
		$(this).parent(".product").remove();
	})
	//上传图片最多6张
	$("#imgTest").change(function(e){
		if($(".imgarrshow .showImagediv").length>=6){
			new Toast({context:$('body'),message:'您最多选择6张图片'}).show(); 
		}else{
			var size = e.target.files[0].size
			if(size<=10485760){
				console.info(e.target.files[0]);//图片文件
			   	var type = e.target.files[0].type;//格式
			   	type = type.split("/")[1];
			   	console.log(type)
			    var dom =$("input[id^='imgTest']")[0];
			    var reader = new FileReader();
			    reader.onload = (function (file) {
			        return function (e) {
			           var bate64 = this.result//这个就是base64的数据了
			           bate64 =bate64.split(",")[1];
			            //$("#showImage")[0].src=this.result;
			        	$.ajax({
							type: 'POST',
							url: UploadServlet,
							dataType: "json",
							data:{"imgStr":bate64,"postfix":type},
							beforeSend:function(){
								$(".xin").css("display","block");
							},
							success: function(data){
								console.log(data.content);
								if(data.result == 0){
									setTimeout(function(){
										var str = '<div class="showImagediv"><div class="showImagedivoverflow"><img src="'+data.content+'"/></div><span class="delete iconfont">&#xe65f;</span></div>'
										$(".imgarrshow").append(str);
										if($(".showImagediv")){
											$(".imgarrshow img").load(function(){
												for(var i =0;i<$(".showImagediv").length;i++){
													var imgdivwidth = $(".showImagediv").eq(i).width();
													var imgdivheight = imgdivwidth;
													var imgwidth = $(".showImagediv").eq(0).find("img").width();
													var imgheight = $(".showImagediv").eq(0).find("img").height();
													console.log(imgwidth+";"+imgheight)							
													if(imgheight<imgwidth){
														$(".showImagediv").eq(i).find("img").css("height","100%");
													}else{
														$(".showImagediv").eq(i).find("img").css("width","100%");
													}
													$(".showImagediv").eq(i).css("height",imgdivheight);
												}
											})
											
										}
										$(".xin").css("display","none");
										new Toast({context:$('body'),message:'上传完成'}).show(); 
									},500)
								}else{
									new Toast({context:$('body'),message:data.content}).show(); 
								}
							},
							error: function(){
								new Toast({context:$('body'),message:'上传失败'}).show(); 
							}
						});	
			        };
			    })(e.target.files[0]);
			    reader.readAsDataURL(e.target.files[0]);
			}else{
				new Toast({context:$('body'),message:'图片超过10兆不可上传'}).show(); 
			}
		}
		
	});
	//显示大图
	$(".imgarrshow ").delegate("img","click",function(){
		var src = $(this).attr("src");
		$(".bigimg img").attr("src",src);
		$(".bigimg").css("display","block");
		var _height = $(".bigimg img").height();
		$(".bigimg img").css("margin-top",-_height/2);
	});
	//取消显示大图
	$(".bigimg").click(function(){
		$(this).css("display","none");
	});
	//删除图片
	$(".imgarrshow ").delegate(".delete","click",function(){
		$(this).parent(".showImagediv").remove();
	});
	//input监听
	$("input").bind('input propertychange',function(){//input的内容发生变化时
		var len = $(this).val().length;
		$(this).parent(".txt").children(".num").find("a").text(len);
		if(len >= 15){
			$(this).parent(".txt").children(".num").find("a").css("color","#fe547b")
		}else{
			$(this).parent(".txt").children(".num").find("a").css("color","#e2e2e2")
		}
	});
	//打分
	document.getElementById("fenshu").addEventListener("touchstart", function(e) {
        var X = e.touches[0].pageX;
       	var scroe = 0;//初始化分值
        $(".star").css({"background":"url(img/star-off.png) no-repeat ","background-size":"100%"})
		for(var i = 0;i<5;i++){
			var startX = parseInt($("#fenshu").css('padding-left'));//父元素padding
			var starW = parseInt($(".star").eq(i).width());//子元素width
			var starM = parseInt($(".star").eq(i).css('margin-right'));//子元素margin
			if(startX+(starW+starM)*i< X && X<startX+(starW+starM)*i+(starW)/2){
				$(".star").eq(i).css({"background":"url(img/star-half.png) no-repeat ","background-size":"100%"})
				scroe = scroe+10;
			}else if(startX+(starW+starM)*i+(starW)/2 <=X){
				$(".star").eq(i).css({"background":"url(img/star-on.png) no-repeat ","background-size":"100%"})
				scroe =scroe+20;
			}
		}
		$(".fenshu p a ").text(scroe/10)
      
    }, false);
	    //手指离开屏幕
    document.getElementById("fenshu").addEventListener("touchend", function(e) {
        var X = e.changedTouches[0].pageX;
        var scroe = 0;//初始化分值
        $(".star").css({"background":"url(img/star-off.png) no-repeat ","background-size":"100%"})
		for(var i = 0;i<5;i++){
			var startX = parseInt($("#fenshu").css('padding-left'));//父元素padding
			var starW = parseInt($(".star").eq(i).width());//子元素width
			var starM = parseInt($(".star").eq(i).css('margin-right'));//子元素margin
			if(startX+(starW+starM)*i< X && X<startX+(starW+starM)*i+(starW)/2){
				$(".star").eq(i).css({"background":"url(img/star-half.png) no-repeat ","background-size":"100%"})
				scroe = scroe+10;
			}else if(startX+(starW+starM)*i+(starW)/2 <=X){
				$(".star").eq(i).css({"background":"url(img/star-on.png) no-repeat ","background-size":"100%"})
				scroe =scroe+20;
			}
		}
		$(".fenshu p a ").text(scroe/10)
    },  false);

	//手指在屏幕滑动时候
	document.getElementById("fenshu").addEventListener("touchmove",function(e){
		var X = e.touches[0].pageX;
		var scroe = 0;//初始化分值
        $(".star").css({"background":"url(img/star-off.png) no-repeat ","background-size":"100%"})
		for(var i = 0;i<5;i++){
			var startX = parseInt($("#fenshu").css('padding-left'));//父元素padding
			var starW = parseInt($(".star").eq(i).width());//子元素width
			var starM = parseInt($(".star").eq(i).css('margin-right'));//子元素margin
			if(startX+(starW+starM)*i< X && X<startX+(starW+starM)*i+(starW)/2){
				$(".star").eq(i).css({"background":"url(img/star-half.png) no-repeat ","background-size":"100%"})
				scroe = scroe+10;
			}else if(startX+(starW+starM)*i+(starW)/2 <=X){
				$(".star").eq(i).css({"background":"url(img/star-on.png) no-repeat ","background-size":"100%"})
				scroe =scroe+20;
			}
		}
		$(".fenshu p a ").text(scroe/10)
	},false)
	//提交评价
	$(".submit").click(function(){
		var evaluate_image_addr ='';
		var grade = $(".scroe").text()*10;
		var other_item_ids = localStorage.getItem("item_idArr");//同款
		//上传的图片用；分割好传给后台
		for(var i = 0;i<$(".imgarrshow .showImagediv").length;i++){
			if(i==$(".imgarrshow .showImagediv").length-1){
				evaluate_image_addr += $(".imgarrshow img").eq(i).attr("src");
			}else{
				evaluate_image_addr += $(".imgarrshow img").eq(i).attr("src")+";";
			}
		}
		if($("#commentproduct").html() == ""){
			new Toast({context:$('body'),message:'请选择商品'}).show();
		}else if($("#youdian").val() == ''){
			new Toast({context:$('body'),message:'小主没写优点哦'}).show();
		}else if($("#quedian").val() == ''){
			new Toast({context:$('body'),message:'小主没写缺点哦'}).show();
		}else{
			var item_advantage = encodeURI($("#youdian").val());
			var item_disadvatage = encodeURI($("#quedian").val());
			$.ajax({
				type: ajaxtype,
				url: addevaluate,
				dataType: "jsonp",
				data:{
					user_id:user_id,
					item_id:item_id,
					item_advantage:item_advantage,
					item_disadvatage:item_disadvatage,
					evaluate_image_addr:evaluate_image_addr,
					evaluate_vedio_addr:'',
					grade:grade,
					other_item_ids:other_item_ids,
				},
				contentType: "application/json",
				jsonp: "jsonpCallback",
				jsonpCallback:"addevaluate",
				success: function(data){
					console.log(data)
					
					if(data.result == 0){
						removeItem()
						new Toast({context:$('body'),message:'提交成功,分享赚取佣金'}).show();
						wxmaskshow2();
						var evaluate_id = data.evaluate_id;
						goshare(user_id,evaluate_id);
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
	//点击朦层取消朦层
	$("body").delegate(".wxmask","click",function(){
		$(this).remove();
		$(".wxmaskimg").remove();
	})
})

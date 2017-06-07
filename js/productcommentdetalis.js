$(function(){
	var evaluate_id = Request.QueryString("evaluate_id");//点评id
	var evaluate_shared_id = Request.QueryString("evaluate_shared_id");
	var user_id = localStorage.getItem("user_id");
	$.ajax({
		type: ajaxtype,
		url: getevaluateinfo,
		dataType: "jsonp",
		data:{
			user_id:user_id,
			evaluate_id:evaluate_id,
			evaluate_shared_id:evaluate_shared_id
		},
		contentType: "application/json",
		jsonp: "jsonpCallback",
		jsonpCallback:"getevaluateinfo",
		success: function(data){
			console.log(data)
			if(data.result == 0){
				$("#product").attr("item_id",data.content.item_id);
				var detailsTophtml = localStorage.getItem("details-tophtml");//点评用户信息
				$("#product img").attr("src",data.content.item_icon);//图片
				$("#product .center h3").text(decodeURI(data.content.item_name));//名字
				$("#product .center p a").text("￥"+(data.content.item_price/100).toFixed(2));//价格
				$(".listdetails .details-top").html(detailsTophtml);
				$(".fenshu .scroe").text(data.content.grade/10+"分");//分数
				$(".fenshu .time").text(data.content.create_date);//时间
				var starstr='';
				var starhalf = Math.round(data.content.grade/10)%2;//半星
				var staron = Math.floor(data.content.grade/10/2);  
				var staroff = 5-staron-starhalf;
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
				$(".fenshu .star").html(starstr);//星星
				$(".youdian").html("<span>优点：</span>"+decodeURI(data.content.item_advantage));
				$(".quedian").html("<span>缺点：</span>"+decodeURI(data.content.item_disadvatage));
				if(data.content.evaluate_image_addr){
					var evaluate_image_addr = data.content.evaluate_image_addr;
					evaluate_image_addr =evaluate_image_addr.split(";");
					for(var i =0;i<evaluate_image_addr.length;i++){
						var str = '<div class="imgdiv"><img src="'+evaluate_image_addr[i]+'"/></div>';
						$(".pic-vid").append(str);
					}
				}
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
				var tongkuanstr =''
				if(data.content.getOtherItemIds ==''||data.content.getOtherItemIds==null||data.content.getOtherItemIds ==undefined){
					$("fieldset").css("display","none");
				}else{
					for(var i =0;i<data.content.getOtherItemIds.length;i++){
						tongkuanstr+='<div class="product" item_id ="'
						+data.content.getOtherItemIds[i].other_item_id+
						'"><img src="'
						+data.content.getOtherItemIds[i].other_item_icon_addr+
						'"/><div class="center"><h3>'
						+decodeURI(data.content.getOtherItemIds[i].other_item_name)+
						'</h3><p>参考价：<a>'
						+(data.content.getOtherItemIds[i].other_item_price/100).toFixed(2)+
						'</a></p></div></div>'
					}
				}
				$(".tongkuan").html(tongkuanstr);
				
			}else{
				new Toast({context:$('body'),message:decodeURI(data.content)}).show();
			}
			
		},
		error: function(){
			new Toast({context:$('body'),message:'网络故障'}).show();
		}
	})
	//点评
	$(".xinghao span").eq(1).click(function(){
		
		localStorage.setItem("item_id",$("#product").attr("item_id"));
		localStorage.setItem("productname",$("#product h3").text());
		localStorage.setItem("productmoney",$("#product a").text());
		localStorage.setItem("productimg",$("#product img").attr("src"));
		window.location.href = "../comment.html";
	});
	//分享
	$(".xinghao span").eq(0).click(function(){
		wxmaskshow();
		goshare(user_id,evaluate_id)
	});
	//显示大图
	$(".pic-vid").delegate("img","click",function(){
		var src = $(this).attr("src");
		$(".bigimg img").attr("src",src);
		$(".bigimg").css("display","block");
		var _height = $(".bigimg img").height();
		$(".bigimg img").css("margin-top",-_height/2);
	});
	$(".bigimg").click(function(){
		$(this).css("display","none");
	})
	//点击朦层取消朦层
	$("body").delegate(".wxmask","click",function(){
		$(this).remove();
		$(".wxmaskimg").remove();
	})

})

$(function(){
	var user_id =localStorage.getItem("user_id");
	//上传图片
	$("#imgTest").change(function(e){
		var size = e.target.files[0].size
		if(size<=10485760){
			var type = e.target.files[0].type;//格式
		   	type = type.split("/")[1];
		   	console.log(type)
		    var dom =$("input[id^='imgTest']")[0];
		    //console.info(dom.value);//这个是文件的路径 C:\fakepath\icon (5).png
		    //console.log(e.target.value);//这个也是文件的路径和上面的dom.value是一样的
		    var reader = new FileReader();
		    reader.onload = (function (file) {
		        return function (e) {
		           var bate64 = this.result//这个就是base64的数据了
		           bate64 =bate64.split(",")[1];
		           //console.log(bate64)
		            //$("#showImage")[0].src=this.result;
		        	$.ajax({
						type: "post",
						url: UploadServlet,
						dataType: "json",
						data:{"imgStr":bate64,"postfix":type},
						success: function(data){
							console.log(data.content);
							if(data.result == 0){
								$("#showImage").attr("src",data.content);
								info_type = 4;
								new_value = data.content;
								changeuser();
								new Toast({context:$('body'),message:'上传完成'}).show(); 
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
	})
	//ajax
	//获取信息
	$.ajax({
		type: ajaxtype,
		url: getuserinfo,
		dataType: "jsonp",
		data:{user_id:user_id},
		contentType: "application/json",
		jsonp: "jsonpCallback",
		jsonpCallback:"getuserinfo",
		success: function(data){
			console.log(data)
			if(data.result == 0){
				var content = data.content;
				
				if(content.sex==0){
					var sex = "男"
				}else if(content.sex ==1){
					var sex = "女"
				}
				if(content.skin_type == 0){
					var skin_type = "干性皮肤"
				}else if(content.skin_type == 1){
					var skin_type = "油性皮肤"
				}else if(content.skin_type == 2){
					var skin_type = "敏感性皮肤"
				}else if(content.skin_type == 3){
					var skin_type = "中性皮肤"
				}else if(content.skin_type == 4){
					var skin_type = "混合性皮肤"
				}
				var imgstr = content.head_image_addr;
				$(".touxiang").append('<img id="showImage" src="'+imgstr+'" onerror="this.src='+errorheadimg+';"/>');
				$(".top .name").text(decodeURI(content.nickname));
				$(".personame .right").text(decodeURI(content.nickname));
				$(".fuzhi .right").text(skin_type);
				$(".phone .right").text(content.mobile_phone);
				$(".sex .right").text(sex);
				$(".brow .right").text(content.date_of_birth);
				//分享金额
				var shard_bonus = content.shard_bonus;
				//点评金额
				var evaluate_bonus = content.evaluate_bonus;
				if(evaluate_bonus>=shard_bonus){
					$(".top .chenghao").text("点评达人");
					$(".VIPLevel .right").text("点评达人");
				}else{
					$(".top .chenghao").text("分享达人");
					$(".VIPLevel .right").text("分享达人");
				}
				
			}else{
				new Toast({context:$('body'),message:decodeURI(data.content)}).show();
			}
		},
		error: function(){
			new Toast({context:$('body'),message:'网络故障'}).show();
		}
	})
	
	
	//跳转
	$(".personame").click(function(){
		var name = $(this).children(".right").text();
		window.location.href = "xiugainame.html?name="+name;
	})
	$(".phone").click(function(){
		var phone = $(this).children(".right").text();
		window.location.href = "xiugaiphone.html?phone="+phone;
	})
	var info_type;//类别
	var new_value;//值
	$(".sex").click(function(){
		var picker = new mui.PopPicker();  
		picker.setData([{value:'0',text:'男'},{value:'1',text:'女'}]);  //数据
		picker.show(function (selectItems) {  //显示
			info_type = 2;
			new_value = selectItems[0].value;
			changeuser();
			$(".sex").children(".right").text(selectItems[0].text);//zz 
			
		})
	})
	$(".fuzhi").click(function(){
		var picker = new mui.PopPicker();  
		picker.setData([
			{value:'0',text:'干性皮肤'},
			{value:'1',text:'油性皮肤'},
			{value:'2',text:'敏感性皮肤'},
			{value:'3',text:'中性皮肤'},
			{value:'4',text:'混合性皮肤'}
			]);  //数据
		picker.show(function (selectItems) {  //显示
			info_type = 1;
			new_value =  encodeURI(selectItems[0].value);//编码
			changeuser();
			$(".fuzhi").children(".right").text(selectItems[0].text);//zz  
		})
	})
	$(".brow").click(function(){
//		var date = new Date();
//		var year = date.getYear();
//		var month = date.getMonth();//少一月
//  	var day = date.getDate();
    	
		var dtpicker = new mui.DtPicker({  
		    type: "date",//设置日历初始视图模式    'datetime'：完整日期视图(年月日时分)；'date'：年视图(年月日)'time'：时间视图(时分)；'month'：月视图(年月)；'hour'：时视图(年月日时)；*暂不支持指定其他视图；如有特殊需求可在dtpicker.js中修改getSelected()方法中selected对象值
		    beginDate: new Date(1900, 00, 01),//设置开始日期  
		    endDate: new Date(),//设置结束日期  
		    labels: ['Year', 'Mon', 'Day'],//设置默认标签区域提示语  
//		    customData: {  
//		        h: [{  
//		            value: 'AM',  
//		            text: 'AM'  
//		        }, {  
//		            value: 'PM',  
//		            text: 'PM'  
//		        }]  
//		    }//时间/日期别名  
		})  
		dtpicker.show(function(e) { 
			var str = e.y.value+"-"+e.m.value+"-"+e.d.value;
			info_type = 3;
			new_value = str;
			changeuser();
		    $(".brow").children(".right").text(str);  
		})  
	})
	//修改信息
	function changeuser(){
		$.ajax({
			type: ajaxtype,
			url: changeuserinfo,
			dataType: "jsonp",
			data:{
				user_id:user_id,
				info_type:info_type,
				new_value:new_value
			},
			contentType: "application/json",
			jsonp: "jsonpCallback",
			jsonpCallback:"changeuserinfo",
			success: function(data){
				if(data.result == 0){
					new Toast({context:$('body'),message:decodeURI(data.content)}).show();
				}else{
					new Toast({context:$('body'),message:decodeURI(data.content)}).show();
				}
			},
			error: function(){
				new Toast({context:$('body'),message:"网络故障"}).show();
			}
		})
	}
})

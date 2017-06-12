
	var timer = "?time=New Date()";//时间戳
	var errorimg = "'img/fly.png'";
	var errorimg2 = "'../img/fly.png'";
	var bigerrorimg = "'img/bigfly.png'";
	var bigerrorimg2 = "'../img/bigfly.png'";
	var errorheadimg = "'../img/touxiang.jpg'";
	var errorheadimg2 = "'img/touxiang.jpg'";
	var Request = {//获取url地址参数
		QueryString : function(val) {
		var uri = window.location.search;
		var re = new RegExp("" +val+ "=([^&?]*)", "ig");
		return ((uri.match(re))?(uri.match(re)[0].substr(val.length+1)):"");
		}
	}
	function getQueryString(name,str) {//获取url地址参数
	    str=str|| decodeURIComponent(window.location.search);
	    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	    var r = str.substr(1).match(reg);
	    if (r != null) {
	        return unescape(r[2]);
	    }
	    return null;
	}
	//随机数
	function RndNum(n){
		var rnd="";
		for(var i=0;i<n;i++)
		rnd+=Math.floor(Math.random()*10);
		return rnd;
	}
	function imgChange(e) {//上传图片
		var size = e.target.files[0].size
		if(size<=10485760){
			console.info(e.target.files[0]);//图片文件
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
									$("#showImage").attr("src",data.content);
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

	//环境
	var huanjing = "h5";
	var ajaxtype = "get";


	//定义接口
	//上传图片接口
	var protocol = "http://";
	var host = "localhost:8080/SpringWind/";
	
	var head_protocol_host = protocol+host;
	
	var UploadServlet = "http://h5.ciaotalking.com/upload/UploadServlet";
	//获取用户信息
	var getuserinfo = head_protocol_host+"server/getuserinfo";
	//修改用户基本信息
	var changeuserinfo= head_protocol_host+"server/changeuserinfo";
	//获取订单列表
	var getorderlist=head_protocol_host+"server/getorderlist";
	//获取订单详情
	var getorderinfo=head_protocol_host+"server/getorderinfo";
	//取消订单
	var cancelorder = head_protocol_host+"server/cancelorder";
	//申请退款
	var requestrefund=head_protocol_host+"server/requestrefund"
	//获取退款记录列表
	var getrefundlist=head_protocol_host+"server/getrefundlist";
	//获取点评记录列表
	var getuserevaluatelist= head_protocol_host+"server/getuserevaluatelist";
	//删除收货地址接口
	var removeaddress= head_protocol_host+"server/removeaddress";
	//增加收货地址
	var addaddress = head_protocol_host+"server/addaddress";
	//编辑收货地址
 	var editaddress = head_protocol_host+"server/editaddress";
	//获取地址列表
	var getaddresslist=head_protocol_host+"server/getaddresslist"
	//获取红包列表
	var getgiftcard = head_protocol_host+"server/getgiftcard";
	//获取优惠券列表
	var getcoupon = head_protocol_host+"server/getcoupon";
	//获取佣金列表
	var getbonus = head_protocol_host+"server/getbonus";
	//申请提现
	var requestbonuspayment = head_protocol_host+"server/requestbonuspayment"
	//banner接口
	var bannerurl = head_protocol_host+"server/getbannerlist";
	//爆款列表接口
	var hotitemlist = head_protocol_host+"server/gethotitemlist";
	//获取商品描述
	var getiteminfo = head_protocol_host+"server/getiteminfo";
	//获取商品详情
	var getitemdesc = head_protocol_host+"server/getitemdesc";
	//获取商品评价列表
	var getitemevaluatelist = head_protocol_host+"server/getitemevaluatelist";
	//加入购物车
	var additemtocart = head_protocol_host+"server/additemtocart";
	//获取购物车数据
	var getcartitems = head_protocol_host+"server/getcartitems";
	//改变购物车数量
	var modifycartitem = head_protocol_host+"server/modifycartitem";
	//停止购物车倒计时
	var stopcartcd = head_protocol_host+"server/stopcartcd";
	//恢复购物车倒计时
	var resumecartcd = head_protocol_host+"server/resumecartcd";
	//提交订单
	var submitorder = head_protocol_host+"server/submitorder";
	//试用列表
	var getsamplelist= head_protocol_host+"server/getsamplelist";
	//申请试用
	var applysample = head_protocol_host+"server/applysample";
	//写点评
	var addevaluate = head_protocol_host+"server/addevaluate";
	//点评详情
	var getevaluateinfo = head_protocol_host+"server/getevaluateinfo";
	//点评记录列表
	var getuserevaluatelist = head_protocol_host+"server/getuserevaluatelist";
	//热门搜索和常用搜索
	var searchprepare = head_protocol_host+"server/searchprepare";
	//搜索
	var search = head_protocol_host+"server/search";
	//榜单列表
	var evaluateranking = head_protocol_host+"server/evaluateranking";
	//立即购买
	var buynow = head_protocol_host+"server/buynow";
	//分享点评（基于系统分享，调用微信分享到朋友圈功能）
	var sharedevaluate = head_protocol_host+"server/sharedevaluate";
	//用户登录获取信息
	var wxLogin =head_protocol_host+"server/getwxinfo";
	//写反馈
	var submitfeedback= head_protocol_host+"server/submitfeedback";
	//反馈列表
	var getfeedback=head_protocol_host+"server/getfeedback";
	//阅读反馈
	var readfeedback= head_protocol_host+"server/readfeedback"
	//获取jssdk参数
	var jssdk = head_protocol_host+"server/getwxsdk";
	//APPid
	var appid = "wx8bb77e77bbb27298";
	//获取支付参数
	var payforwx = head_protocol_host+"server/payforwx";
	//支付回调接口
	var paysuccess = head_protocol_host+"server/paysuccess";
	//申请微信分享并后台记录
	function goshare(user_id,evaluate_id){
		$.ajax({
			type: ajaxtype,
			url: sharedevaluate,
			dataType: "jsonp",
			data:{
				user_id:user_id,
				evaluate_id:evaluate_id
			},
			contentType: "application/json",
			jsonp: "jsonpCallback",
			jsonpCallback:"sharedevaluate",
			success: function(data){
				console.log(data)
				if(data.result == 0){
					var item_name = decodeURI(data.item_name);
					var item_icon_attr =data.item_icon_addr;
					var evaluate_shared_id = data.evaluate_shared_id;
					sharewx(item_name,item_icon_attr,evaluate_id,evaluate_shared_id)
				}else{
					new Toast({context:$('body'),message:data.content}).show();
				}
			},
			error: function(){
				new Toast({context:$('body'),message:'网络故障'}).show();
			}
		})
	}
	//微信分享点击出现朦层
	function wxmaskshow(){
		var wxmask = "<div class='wxmask'></div><img class='wxmaskimg' src ='../img/wxshare.png'>"
		$("body").append(wxmask)
	};
	function wxmaskshow2(){
		var wxmask = "<div class='wxmask'></div><img class='wxmaskimg' src ='img/wxshare.png'>"
		$("body").append(wxmask)
	};
	//分享商品描述
	function sharewxproduct(item_name,item_icon_attr,item_id){
		var sharehref = "http://h5.ciaotalking.com/html/productdetails.html?item_id="+item_id+"&share=-1";
		var wxurl = window.location.href;
		$.ajax({//获取微信的签名等参数
			type: ajaxtype,
			url: jssdk,
			dataType: "jsonp",
			data:{
				wxurl:wxurl
			},
			contentType: "application/json",
			jsonp: "jsonpCallback",
			jsonpCallback:"jssdk",
			success: function(data){
				console.log(data)
				if(data.result == 0){
					var timestamp =data.timestamp;
					var nonceStr =data.noncestr;
					var signature = data.signature;
					wx.config({
					    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					    appId: appid, // 必填，公众号的唯一标识
					    timestamp:timestamp , // 必填，生成签名的时间戳
					    nonceStr: nonceStr, // 必填，生成签名的随机串
					    signature: signature,// 必填，签名，见附录1
					    jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
					});
					wx.error(function(res){
					    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
					});
				}else{
					new Toast({context:$('body'),message:data.content}).show();
				}
			},
			error: function(){
				new Toast({context:$('body'),message:'网络故障'}).show();
			}
		})
		wx.ready(function(){
		    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
		    wx.onMenuShareTimeline({
			    title: item_name, // 分享标题
			    link: sharehref, // 分享链接
			    imgUrl: item_icon_attr, // 分享图标
			    success: function () {
			        // 用户确认分享后执行的回调函数
			        $(".wxmask").remove();
			        $(".wxmaskimg").remove();
			         new Toast({context:$('body'),message:'分享成功'}).show();
			    },
			    cancel: function () {
			    	$(".wxmask").remove()
			    	$(".wxmaskimg").remove();
			    }
			});
			 wx.onMenuShareAppMessage({
			    title: item_name, // 分享标题
			    desc: '商品详情', // 分享描述
			    link: sharehref, // 分享链接
			    imgUrl: item_icon_attr, // 分享图标
			    success: function () {
			        // 用户确认分享后执行的回调函数
			        $(".wxmask").remove();
			        $(".wxmaskimg").remove();
			        new Toast({context:$('body'),message:'分享成功'}).show();
			    },
			    cancel: function () {
			    	$(".wxmask").remove();
			    	$(".wxmaskimg").remove();
			    	new Toast({context:$('body'),message:'分享失败'}).show();
			        // 用户取消分享后执行的回调函数
			    }
			});
		});
	}
	//执行微信分享
	function sharewx(item_name,item_icon_attr,evaluate_id,evaluate_shared_id){
		var sharehref = "http://h5.ciaotalking.com/html/commentdetails.html?evaluate_id="+evaluate_id+"&evaluate_shared_id="+evaluate_shared_id;
		var wxurl = window.location.href;
		$.ajax({//获取微信的签名等参数
			type: ajaxtype,
			url: jssdk,
			dataType: "jsonp",
			data:{
				wxurl:wxurl
			},
			contentType: "application/json",
			jsonp: "jsonpCallback",
			jsonpCallback:"jssdk",
			success: function(data){
				console.log(data)
				if(data.result == 0){
					var timestamp =data.timestamp;
					var nonceStr =data.noncestr;
					var signature = data.signature;
					wx.config({
					    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					    appId: appid, // 必填，公众号的唯一标识
					    timestamp:timestamp , // 必填，生成签名的时间戳
					    nonceStr: nonceStr, // 必填，生成签名的随机串
					    signature: signature,// 必填，签名，见附录1
					    jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
					});
					wx.error(function(res){
					    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
					});
				}else{
					new Toast({context:$('body'),message:data.content}).show();
				}
			},
			error: function(){
				new Toast({context:$('body'),message:'网络故障'}).show();
			}
		})
		wx.ready(function(){
		    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
		    wx.onMenuShareTimeline({
			    title: item_name, // 分享标题
			    link: sharehref, // 分享链接
			    imgUrl: item_icon_attr, // 分享图标
			    success: function () {
			        // 用户确认分享后执行的回调函数
			        $(".wxmask").remove();
			        $(".wxmaskimg").remove();
			        new Toast({context:$('body'),message:'分享成功'}).show();
			    },
			    cancel: function () {
			    	$(".wxmask").remove()
			    	$(".wxmaskimg").remove();
			    	//new Toast({context:$('body'),message:'分享失败'}).show();
			        // 用户取消分享后执行的回调函数
			    }
			});
			 wx.onMenuShareAppMessage({
			    title: item_name, // 分享标题
			    desc: '美妆点评详情', // 分享描述
			    link: sharehref, // 分享链接
			    imgUrl: item_icon_attr, // 分享图标
			    success: function () {
			        // 用户确认分享后执行的回调函数
			        $(".wxmask").remove();
			        $(".wxmaskimg").remove();
			        new Toast({context:$('body'),message:'分享成功'}).show();
			    },
			    cancel: function () {
			    	$(".wxmask").remove()
			    	$(".wxmaskimg").remove();
			    	new Toast({context:$('body'),message:'分享失败'}).show();
			        // 用户取消分享后执行的回调函数
			    }
			});
		});
	}
	//微信登录
	function getCodeForWechat(){
		var data = {};
		data.item_count = 0;
		data.user_id = 1559;
		localStorage.setItem("shoppingcar",data.item_count);
		localStorage.setItem("user_id",data.user_id);
	    /*var weChatCode=getQueryString("code");
	    	//alert(weChatCode)
		    if(weChatCode==null){//如果参数没获取到重新登录
		        var backUrl=encodeURIComponent(location.href);//解码当前地址
		        //重新回到登录页面
		        location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appid+"&redirect_uri="+backUrl+"&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect";
		    }else{//如果参数获取到请求ajax获取用户ID和购物车数量
		    	if(weChatCode!=localStorage.getItem("weChatCodesession")){//如果两次code不相同
	    			localStorage.setItem("weChatCodesession",weChatCode)
		            $.ajax({
		                type:ajaxtype,
		                url:wxLogin,
		                dataType:"jsonp",
		                data:{
		                	code:weChatCode
		                },
		                contentType: "application/json",
		                jsonp: "jsonpCallback",
						jsonpCallback:"wxLogin",
		                success:function (data){
		                	//alert(data.result)
		                    if(data.result == 0){
		                        //获取用户基本信息

		                   		$("footer .num").text(data.item_count)
								localStorage.setItem("shoppingcar",data.item_count);
								localStorage.setItem("user_id",data.user_id);
								//alert(data.user_id)
		                    }else{
		                         new Toast({context:$('body'),message:"暂时无法登录，请您退出后重试!"}).show();
		                    }
		                },
		                error:function (){
		                    new Toast({context:$('body'),message:"暂时无法登录，请您退出后重试~"}).show();
		                },
		            });
		        }
		    }*/
	
	}

$(function(){
	//顶部返回按钮
	$("body .goback").click(function(){

		window.history.go(-1)
		//return false
	})
	//底部导航栏
	$("footer li dl").click(function(){
		$("footer li dt").css("color","#999999");
		$(this).children("dt").css("color","#FE547B");
	})
	$("footer li").eq(0).click(function(){
		window.location.href = "./index.html"
	})
	$("footer li").eq(1).click(function(){
		window.location.href = "./tryout.html"
	})
	$(".ComentList").click(function(){
		$(".Comment-List").stop().slideToggle();
		if($(".ComentList").hasClass("button1")){
			$(".ComentList img").attr("src","image/tab_middlebutton_2.png");
			$(".ComentList").removeClass("button1");
			$(".ComentList").addClass("button2");
			$(".footermask").css("display","block");
		}else if($(".ComentList").hasClass("button2")){
			$(".ComentList img").attr("src","image/tab_middlebutton_1.png");
			$(".ComentList").removeClass("button2");
			$(".ComentList").addClass("button1");
			$(".footermask").css("display","none");
		}

	})
	$("footer li").eq(3).click(function(){
		window.location.href = "gouwuche.html"
	})
	$("footer li").eq(4).click(function(){
		window.location.href = "personcenter.html"
	})
	$("footer .comment").click(function(){
		window.location.href = "comment.html"
		localStorage.removeItem("item_id");
	})
	$("footer .list").click(function(){
		window.location.href = "List.html"
	})

})

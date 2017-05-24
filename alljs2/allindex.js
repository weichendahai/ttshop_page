///<jscompress sourcefile="androidToast.js" />
/**  
 * �����ڲ���ϳ�����ִ�е��������ʾ��ʾ���  
 * @param config  
 * @return  
*/  
var Toast = function(config){   
    this.context = config.context==null?$('body'):config.context;//������   
    this.message = config.message;//��ʾ����   
    this.time = config.time==null?3000:config.time;//����ʱ��   
    this.left = config.left;//��������ߵľ���   
    this.top = config.top;//�������Ϸ��ľ���   
    this.init();   
}   
var msgEntity;   
Toast.prototype = {   
    //��ʼ����ʾ��λ�����ݵ�   
    init : function(){   
        $("#toastMessage").remove();   
        //������Ϣ��   
        var msgDIV = new Array();   
        msgDIV.push('<div id="toastMessage">');
        msgDIV.push('<span style="font-size:14px;">'+this.message+'</span>');
        msgDIV.push('</div>');   
        msgEntity = $(msgDIV.join('')).appendTo(this.context);   
        //������Ϣ��ʽ   
        var left = this.left == null ? this.context.width()/2-msgEntity.find('span').width()/2-10: this.left; 
        var top = this.top == null ? this.context.height()/2-msgEntity.find('span').height()/2 : this.top; 
        msgEntity.css({
        	position:'absolute',
        	top:top,
        	'z-index':'999999',
        	left:left,
        	'background-color':'black',
        	color:'white',
        	'font-size':'14px',
        	padding:'10px',
        	
        	});
        msgEntity.hide();   
    },   
    //��ʾ����   
    show :function(){   
        msgEntity.fadeIn(this.time/2);   
        msgEntity.fadeOut(this.time/2);   
    }   
           
}  

///<jscompress sourcefile="common.js" />

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
	
	
	//定义借口
	//上传图片接口
	var UploadServlet = "http://h5.ciaotalking.com/upload/UploadServlet";
	//获取用户信息
	var getuserinfo = "http://"+huanjing+".ciaotalking.com/server/getuserinfo";
	//修改用户基本信息
	var changeuserinfo= "http://"+huanjing+".ciaotalking.com/server/changeuserinfo";
	//获取订单列表
	var getorderlist="http://"+huanjing+".ciaotalking.com/server/getorderlist";
	//获取订单详情
	var getorderinfo="http://"+huanjing+".ciaotalking.com/server/getorderinfo";
	//取消订单
	var cancelorder = "http://"+huanjing+".ciaotalking.com/server/cancelorder";
	//申请退款
	var requestrefund="http://"+huanjing+".ciaotalking.com/server/requestrefund"
	//获取退款记录列表
	var getrefundlist="http://"+huanjing+".ciaotalking.com/server/getrefundlist";
	//获取点评记录列表  
	var getuserevaluatelist= "http://"+huanjing+".ciaotalking.com/server/getuserevaluatelist";
	//删除收货地址接口
	var removeaddress= "http://"+huanjing+".ciaotalking.com/server/removeaddress";
	//增加收货地址
	var addaddress = "http://"+huanjing+".ciaotalking.com/server/addaddress";
	//编辑收货地址
 	var editaddress = "http://"+huanjing+".ciaotalking.com/server/editaddress";
	//获取地址列表
	var getaddresslist="http://"+huanjing+".ciaotalking.com/server/getaddresslist"
	//获取红包列表
	var getgiftcard = "http://"+huanjing+".ciaotalking.com/server/getgiftcard";
	//获取优惠券列表
	var getcoupon = "http://"+huanjing+".ciaotalking.com/server/getcoupon";
	//获取佣金列表
	var getbonus = "http://"+huanjing+".ciaotalking.com/server/getbonus";
	//申请提现
	var requestbonuspayment = "http://"+huanjing+".ciaotalking.com/server/requestbonuspayment"
	//banner接口
	var bannerurl = "http://"+huanjing+".ciaotalking.com/server/getbannerlist";
	//爆款列表接口
	var hotitemlist = "http://"+huanjing+".ciaotalking.com/server/gethotitemlist";
	//获取商品描述
	var getiteminfo = "http://"+huanjing+".ciaotalking.com/server/getiteminfo";
	//获取商品详情
	var getitemdesc = "http://"+huanjing+".ciaotalking.com/server/getitemdesc";
	//获取商品评价列表
	var getitemevaluatelist = "http://"+huanjing+".ciaotalking.com/server/getitemevaluatelist";
	//加入购物车
	var additemtocart = "http://"+huanjing+".ciaotalking.com/server/additemtocart";
	//获取购物车数据
	var getcartitems = "http://"+huanjing+".ciaotalking.com/server/getcartitems";
	//改变购物车数量
	var modifycartitem = "http://"+huanjing+".ciaotalking.com/server/modifycartitem";
	//停止购物车倒计时
	var stopcartcd = "http://"+huanjing+".ciaotalking.com/server/stopcartcd";
	//恢复购物车倒计时
	var resumecartcd = "http://"+huanjing+".ciaotalking.com/server/resumecartcd";
	//提交订单
	var submitorder = "http://"+huanjing+".ciaotalking.com/server/submitorder";
	//试用列表
	var getsamplelist= "http://"+huanjing+".ciaotalking.com/server/getsamplelist";
	//申请试用
	var applysample = "http://"+huanjing+".ciaotalking.com/server/applysample";
	//写点评
	var addevaluate = "http://"+huanjing+".ciaotalking.com/server/addevaluate";
	//点评详情
	var getevaluateinfo = "http://"+huanjing+".ciaotalking.com/server/getevaluateinfo";
	//点评记录列表
	var getuserevaluatelist = "http://"+huanjing+".ciaotalking.com/server/getuserevaluatelist";
	//热门搜索和常用搜索
	var searchprepare = "http://"+huanjing+".ciaotalking.com/server/searchprepare";
	//搜索
	var search = "http://"+huanjing+".ciaotalking.com/server/search";
	//榜单列表
	var evaluateranking = "http://"+huanjing+".ciaotalking.com/server/evaluateranking";
	//立即购买
	var buynow = "http://"+huanjing+".ciaotalking.com/server/buynow";
	//分享点评（基于系统分享，调用微信分享到朋友圈功能）
	var sharedevaluate = "http://"+huanjing+".ciaotalking.com/server/sharedevaluate";
	//用户登录获取信息
	var wxLogin ="http://"+huanjing+".ciaotalking.com/server/getwxinfo";
	//写反馈
	var submitfeedback= "http://"+huanjing+".ciaotalking.com/server/submitfeedback";
	//反馈列表
	var getfeedback="http://"+huanjing+".ciaotalking.com/server/getfeedback";
	//阅读反馈
	var readfeedback= "http://"+huanjing+".ciaotalking.com/server/readfeedback"
	//获取jssdk参数
	var jssdk = "http://"+huanjing+".ciaotalking.com/server/getwxsdk";
	//APPid
	var appid = "wx8bb77e77bbb27298";
	//AppSecret
	var AppSecret = "63dfb0bbaf9f63a48caa64483fdf803e";
	//获取支付参数
	var payforwx = "http://"+huanjing+".ciaotalking.com/server/payforwx";
	//支付回调接口
	var paysuccess = "http://"+huanjing+".ciaotalking.com/server/paysuccess";
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
			       	goshare(user_id,evaluate_id)
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
			        goshare(user_id,evaluate_id);
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
//	    var weChatCode=getQueryString("code");
//	    	//alert(weChatCode)
//		    if(weChatCode==null){//如果参数没获取到重新登录
//		        var backUrl=encodeURIComponent(location.href);//解码当前地址
//		        //重新回到登录页面
//		        location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appid+"&redirect_uri="+backUrl+"&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect";
//		    }else{//如果参数获取到请求ajax获取用户ID和购物车数量
//		    	if(weChatCode!=localStorage.getItem("weChatCodesession")){//如果两次code不相同
//	    			localStorage.setItem("weChatCodesession",weChatCode)
//		            $.ajax({
//		                type:ajaxtype,
//		                url:wxLogin,
//		                dataType:"jsonp",
//		                data:{
//		                	code:weChatCode
//		                },
//		                contentType: "application/json",
//		                jsonp: "jsonpCallback",
//						jsonpCallback:"wxLogin",
//		                success:function (data){
//		                	//alert(data.result)
//		                    if(data.result == 0){
//		                        //获取用户基本信息
//		                      
//		                   		$("footer .num").text(data.item_count)
//								localStorage.setItem("shoppingcar",data.item_count);
//								localStorage.setItem("user_id",data.user_id);
//								//alert(data.user_id)
//		                    }else{
//		                         new Toast({context:$('body'),message:"暂时无法登录，请您退出后重试!"}).show();
//		                    }
//		                },
//		                error:function (){
//		                    new Toast({context:$('body'),message:"暂时无法登录，请您退出后重试~"}).show(); 
//		                },
//		            });    
//		        }
//		    }
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
	$("footer li").eq(2).click(function(){
		$(".Comment-List").stop().slideToggle();
		$(".ComentList span").toggleClass("span")
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

///<jscompress sourcefile="rem.js" />
! function(win) {
	function resize() {
		var domWidth = domEle.getBoundingClientRect().width;
		if(domWidth / v > 540) {
			domWidth = 540 * v;
		}
		win.rem = domWidth / 7.5;// rem定义  2倍图   1rem=100px   iphone6(3.75)  iphone(3.2) 
		domEle.style.fontSize = win.rem + "px";
	}
	var v, initial_scale, timeCode, dom = win.document,
		domEle = dom.documentElement,
		viewport = dom.querySelector('meta[name="viewport"]'),
		flexible = dom.querySelector('meta[name="flexible"]');
	if(viewport) {
		//viewport：<meta name="viewport"content="initial-scale=0.5, minimum-scale=0.5, maximum-scale=0.5,user-scalable=no,minimal-ui"/>
		var o = viewport.getAttribute("content").match(/initial\-scale=(["']?)([\d\.]+)\1?/);
		if(o) {
			initial_scale = parseFloat(o[2]);
			v = parseInt(1 / initial_scale);
		}
	} else {
		if(flexible) {
			var o = flexible.getAttribute("content").match(/initial\-dpr=(["']?)([\d\.]+)\1?/);
			if(o) {
				v = parseFloat(o[2]);
				initial_scale = parseFloat((1 / v).toFixed(2))
			}
		}
	}
	if(!v && !initial_scale) {
		var n = (win.navigator.appVersion.match(/android/gi), win.navigator.appVersion.match(/iphone/gi));
		v = win.devicePixelRatio;
		v = n ? v >= 3 ? 3 : v >= 2 ? 2 : 1 : 1, initial_scale = 1 / v
	}
	//没有viewport标签的情况下
	if(domEle.setAttribute("data-dpr", v), !viewport) {
		if(viewport = dom.createElement("meta"), viewport.setAttribute("name", "viewport"), viewport.setAttribute("content", "initial-scale=" + initial_scale + ", maximum-scale=" + initial_scale + ", minimum-scale=" + initial_scale + ", user-scalable=no"), domEle.firstElementChild) {
			domEle.firstElementChild.appendChild(viewport)
		} else {
			var m = dom.createElement("div");
			m.appendChild(viewport), dom.write(m.innerHTML)
		}
	}
	win.dpr = v;
	win.addEventListener("resize", function() {
		clearTimeout(timeCode), timeCode = setTimeout(resize, 300)
	}, false);
	win.addEventListener("pageshow", function(b) {
		b.persisted && (clearTimeout(timeCode), timeCode = setTimeout(resize, 300))
	}, false);
	/* 个人觉得没必要完成后就把body的字体设置为12
	"complete" === dom.readyState ? dom.body.style.fontSize = 12 * v + "px" : dom.addEventListener("DOMContentLoaded", function() {
	 //dom.body.style.fontSize = 12 * v + "px"
	}, false);
	*/
	resize();
}(window);
///<jscompress sourcefile="index.js" />

$(function(){
	//跳转
	//getCodeForWechat()
	
	var item_id;
	$(".search").click(function(){
		window.location.href = "html/search.html"
	});
	$(".lunbo ").on("tap",".swiper-slide",function(){
		item_id = $(this).children(".item_id").text();
		window.location.href = "html/productdetails.html?item_id="+item_id;
	})
	$(".Categorylist").on("tap","dl",function(){
		var searchName = "";
		var category_id = $(this).index()+1;
		window.location.href = "searchresult.html?searchName="+searchName+"&category_id="+category_id;
	})
	$(".burstlist").on("tap",".burstlist-div",function(){
		item_id = $(this).children(".item_id").text();
		window.location.href = "html/productdetails.html?item_id="+item_id;
	})
	$(".CategorylistALL-title").on("tap",".last",function(){
		window.location.href = "html/CategorylistALL.html";
	});
	//点评
	$(".burstlist").on("tap",".dianping",function(event){
		localStorage.setItem("item_id",$(this).parents(".burstlist-div").find(".item_id").text());
		localStorage.setItem("productname",$(this).parents(".right").children(".title").text());
		localStorage.setItem("productmoney",$(this).parents(".right").children(".shop").children("p").text());
		localStorage.setItem("productimg",$(this).parents(".burstlist-div").find(".left").find("img").attr("src"));
		localStorage.setItem("item_price_discount",$(this).attr("item_price_discount"));
		window.location.href = "comment.html";
		event.stopPropagation();
	});
	//分享
	$(".burstlist").on("tap",".share",function(event){
		wxmaskshow2()
		var item_id = $(this).parents(".burstlist-div").find(".item_id").text();
		var item_name = $(this).parents(".right").children(".title").text();
		var item_icon_attr = $(this).parents(".burstlist-div").find(".left").find("img").attr("src");
		sharewxproduct(item_name,item_icon_attr,item_id)
		event.stopPropagation();
	});
	//点击朦层取消朦层
	$("body").delegate(".wxmask","click",function(){
		$(this).remove();
		$(".wxmaskimg").remove();
	})
	
	//上拉下拉
	mui.init({
		pullRefresh: {
			container: '#pullrefresh',
			
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
//	function pulldownRefresh() {
//		setTimeout(function() {
//			var table = document.body.querySelector('.mui-table-view');
//			var cells = document.body.querySelectorAll('.mui-table-view-cell');
//			for (var i = cells.length, len = i + 3; i < len; i++) {
//				var li = document.createElement('li');
//				li.innerHTML = '<a>' + (i + 1) + '</a>';
//				//下拉刷新，新纪录插到最前面；
//				table.insertBefore(li, table.firstChild);
//			}
//			mui('#pullrefresh').pullRefresh().endPulldownToRefresh(); //refresh completed
//		}, 1500);
//	}
	
	/**
	 * 上拉加载具体业务实现
	 */
	function pullupRefresh() {
		page++;
		setTimeout(function() {
			
			$.ajax({
				type: ajaxtype,
				url: hotitemlist,
				dataType: "jsonp",
				data:{"page_no":page,"season_no":season},
				contentType: "application/json",
				jsonp: "jsonpCallback",
				jsonpCallback:"hotitem",
				success: function(data){
					//var next_page_no = data.content.next_page_no;
					//console.log(next_page_no)
					
				},
				error: function(){
					
				}
			})
		}, 1500);
	}
	//加入购物车开始
		var offset = $("footer li").eq(3).offset();  //结束的地方的元素
		var height = $("footer li").eq(3).height();
		var width = $("footer li").eq(3).width();
		var addcar;
		var img  ;
		var flyer ;
		var left ;
		var top ;
		$(".changexinghao .center").delegate("span","click",function(){
			$(this).parents(".xinghao1").children("span").removeClass("check");
			$(this).addClass("check");
			var property_pricethis ="";
			var xinghaoprice;
			for(var i =0;i<$(".changexinghao .xinghao1").length;i++){
				if(i ==$(".changexinghao .xinghao1").length-1){
					property_pricethis += $(".xinghao1").eq(i).attr("property_key")+":"+$(".xinghao1").eq(i).children(".check").attr("property_value")
				}else{
					property_pricethis += $(".xinghao1").eq(i).attr("property_key")+":"+$(".xinghao1").eq(i).children(".check").attr("property_value")+"/"
				}
			}
			for(var i =0;i<property_price_key[index].length;i++){
				if(property_pricethis ==property_price_key[index][i]){
					console.log(property_price_value[index][i])
					xinghaoprice = (property_price_value[index][i]/100).toFixed(2);
					$(".changexinghao .bottom p").text("￥"+xinghaoprice);
				}
			}
			
		})
		var index;
		$(".burstlist").on("tap",".addShoppingcar",function(event){
			index = $(this).parents(".burstlist").index();
			addcar = $(this);
			img = addcar.parents(".burstlist-div").find("img").attr('src');
			flyer = $('<img class="u-flyer" style="width:50px;height: 50px;z-index:9999;" src="'+img+'">' );
			left = $(this).offset().left;
			top = $(this).offset().top-$(window).scrollTop();
			
			$(".changexinghao .top p").text(addcar.parents(".burstlist-div").find(".top .title").text());
			$(".changexinghao .bottom p").text(addcar.parents(".burstlist-div").find(".shop p").text());
			$(".changexinghao .center").html(addcar.parents(".burstlist-div").find(".xinghaobox").html());
			var xinghaolength = $(this).parents(".box").attr("xinghaolength");
			if(xinghaolength == 0){
				flyer.fly({
					start: {
						left:left,
						top: top,
					},
					end: {
						left: offset.left+width/2,
						top: offset.top+height/2,
						width: 0,
						height: 0
					},
					onEnd: function(){
					}
				});
				add(addcar);
			
			}else{
				$(".mask").css("left",0);
				var _height = $(".changexinghao").height();
				$(".changexinghao").css({"marginTop":-_height/2,"display":"block"});
			}
			
			event.stopPropagation();
		});
		$(".changexinghao .top span").click(function(){
			$(".mask").css("left","100%");
			$(".changexinghao").css({"display":"none"});
		})
		$(".changexinghao .bottom span").click(function(){
				
			flyer.fly({
				start: {
					left:left,
					top: top,
				},
				end: {
					left: offset.left+width/2,
					top: offset.top+height/2,
					width: 0,
					height: 0
				},
				onEnd: function(){
				}
			});
			add(addcar);
			$(".changexinghao").css({"display":"none"})
			$(".mask").css({"left":"100%"})
		})
		function add(addcar){
			var item_id = addcar.parents(".burstlist-div").find(".item_id").text();
			var property_key ="";
			var property_value ="";
			for(var i =0;i<$(".changexinghao .xinghao1").length;i++){
				
				if(i ==$(".changexinghao .xinghao1").length-1){
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
					if(data.result == 0){
						var num = $(".num").text();//购物车数量
						num++;
						$(".num").text(num);
						//存购物车数量
						localStorage.setItem("shoppingcar",num);
					}else{
						new Toast({context:$('body'),message:decodeURI(data.content)}).show();
					}
					
				},
				error: function(){
					new Toast({context:$('body'),message:'网络故障'}).show();
				}
			})
		}
	//加入购物车结束
})


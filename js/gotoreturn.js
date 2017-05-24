$(function(){
	var order_id = Request.QueryString("order_id");
	var item_id = Request.QueryString("item_id");
	var order_item_id = Request.QueryString("order_item_id");
	var price = decodeURI(Request.QueryString("price"));
	var user_id = localStorage.getItem("user_id");
	$(".money").text(price);
	$("#imgTest").change(function(){
		imgChange(event)
		
	});
	$(".footer").click(function(){
		var refund_image_addr =$("#showImage").attr("src");
		console.log(refund_image_addr)
		var refund_info = encodeURI($("textarea").val());
		if($(".box").eq(0).attr("refund_type") == -1){
			new Toast({context:$('body'),message:'请选择服务类型'}).show(); 
		}else if($(".box").eq(1).attr("refund_reason") == -1){
			new Toast({context:$('body'),message:'请选择退货原因'}).show(); 
		}else{
			var refund_type = $(".box").eq(0).attr("refund_type");
			var refund_reason = $(".box").eq(1).attr("refund_reason");
			$.ajax({
				type: ajaxtype,
				url: requestrefund,
				dataType: "jsonp",
				data:{
					user_id:user_id,
					order_id:order_id,
					item_id:item_id,
					order_item_id:order_item_id,
					refund_type:refund_type,
					refund_reason:refund_reason,
					refund_info:refund_info,
					refund_image_addr:refund_image_addr
				},
				contentType: "application/json",
				jsonp: "jsonpCallback",
				jsonpCallback:"requestrefund",
				success: function(data){
					if(data.result == 0){
						console.log(data)
						window.location.href="../renturnproduct.html"
					}else{
						new Toast({context:$('body'),message:decodeURI(data.content)}).show(); 
					}
				},
				error: function(){
					new Toast({context:$('body'),message:'网络故障'}).show(); 
				}
			})
		}
		
	});
	$(".box").eq(0).click(function(){
		var picker = new mui.PopPicker();  
		picker.setData([
			{value:'0',text:'退货退款'},
			{value:'1',text:'退货'},
			{value:'2',text:'退款'}
			]);  //数据
		picker.show(function (selectItems) {  //显示
			new_value = selectItems[0].value;
			$(".box").eq(0).find("p").text(selectItems[0].text);
			$(".box").eq(0).attr("refund_type",selectItems[0].value)
		})
	})
	$(".box").eq(1).click(function(){
		var picker = new mui.PopPicker();  
		picker.setData([
			{value:'0',text:'包装问题'},
			{value:'1',text:'快递原因'},
			{value:'2',text:'库房发错'},
			{value:'3',text:'过敏'},
			{value:'4',text:'重复购买'},
			{value:'5',text:'质量问题'},
			{value:'6',text:'买错了'},
			{value:'7',text:'商品破损'},
			{value:'8',text:'漏发'},
			{value:'9',text:'丢件'},
			{value:'10',text:'有更好的产品'},
			{value:'11',text:'看到负面评价'}
			]);  //数据
		picker.show(function (selectItems) {  //显示
			new_value = selectItems[0].value;
			$(".box").eq(1).find("p").text(selectItems[0].text);
			$(".box").eq(1).attr("refund_reason",selectItems[0].value)
		})
	})
})

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

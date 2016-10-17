$(function () {
	var flag = true ;		
//账号名只能为邮箱/手机号/第一位非数字1的字母数字组合
	$('.inputTab input[name="user"]').blur(function(){
		var val = $(this).val();
		
//					验证电话号码
		var reg = /^1[3579]\d{9}$/  ;
//					验证邮箱
		var rex = /^\w+@[a-zA-Z0-9]+\.[a-zA-Z]+$/; 
//					第一位非1字母数字组合
		var reb = /^[^1][a-zA-Z]+[0-9]+/;
		var reB = /^[^1][0-9]+[a-zA-Z]+/;
		if(val==""){
			$(this).parent().find('span').html('用户名不能为空！');
			flag = false;
		}
		else{
			if((reg.test(val) || rex.test(val) || reb.test(val) || reB.test(val))==true){
						flag = true;
			}else{
				$(this).parent().find('span').html('账号名只能为邮箱/手机号/第一位非数字1的字母数字组合！');
				flag = false;
			}
		}
		
	});
	
	$('.inputTab input[name="user"]').focus(function(){
		$(this).parent().find('span').html('');
	});
	
	
	//密码由英文字母、数字组成，长度6-12位		
	
	$('.inputTab input[name="pass"]').blur(function(){
		
		var val  =	$(this).val();
		var reg = /[a-zA-Z0-9]{6,12}/;
		if (val=="") {
			$(this).parent().find('span').html('密码不能为空！');
			flag = false;
		}
		else if(reg.test(val)==false){
			$(this).parent().find('span').html('密码由英文字母、数字组成，长度6-12位！');
			flag = false;
		}else{
			$(this).parent().find('span').html('');
			flag = true;
		}
	});
	
	$('.inputTab input[name="psw"]').blur(function(){
		if($('.inputTab input[name="pass"]').val()!=$(this).val()){
			$(this).parent().find('span').html('两次输入的密码不一致!');
			flag=false;
		}else{
			$(this).parent().find('span').html('');
			flag = true;
			
		}
	})
	
//				滑动验证码，验证
    var slider = new SliderUnlock("#slider",{
		successLabelTip : "验证成功"	
		},function(){
			$('button').show();
			$('.spell').hide();
        });
//			     滑动条初始化    
	slider.init();
//	        	验证码生成,判断
	$.idcode.setCode();
	$('#Txtidcode').blur(function(){	
		var IsBy = $.idcode.validateCode();	  		
		if(IsBy==false){
			$('.span-zc').html('验证码错误');
			flag = false;
		}else{
			flag = true;
			$('.span-zc').html('');	  
		}
	});
	
	
//	判断cookie是否为空，创建数组
	var  arrco = JSON.parse($.cookie('mess')); 
	if(JSON.parse($.cookie('mess'))==null){
		arrco = [];
	}
	
//				默认选择同意 提交注册
	var arr = arrco;

	
	$('button').click(function(){
	if(!($('.inputTab input[name="test"]').is(':checked'))){
		alert("请同意用户协议!");
		return;
	}else{
		if(flag==false) {
			return;
		}else{
			var obj = {};
			obj.name = $('.inputTab input[name=user]').val();
			obj.pass = $('.inputTab input[name=pass]').val();
			
			arr.push(obj);		
		//		将数组转换成json字符串传输
			
			$.cookie('mess', JSON.stringify(arr), {expires: 300 ,path:"/"});
			location.href = "sign-up-1.html";
		}
	}
	

	
	});

	
	
});
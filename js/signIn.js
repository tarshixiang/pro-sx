$(function(){
	var message = $.cookie('mess');
	
	var str = JSON.parse(message) ;
				
//				检验勾选框内容 
	
	if($.cookie('see')){
		var u = $.cookie('see');				
		$('input[name=user]').val(u);
		$('input[name=remember]').attr('checked','checked');
	}
	
	if (!str) {
		$('.span-1').html('请先注册！');
		return;
	}else{
		$('button').click(function(){
			$.cookie('see',null,{expires: -1 ,path:'/'});
			$.cookie('userName',null,{expires: -1 ,path:'/'});
			var userName = $('input[name=user]').val();
			
			var psw = $('input[name=psw]').val();
			
			for(var i=0 ; i<str.length; i++){
				var index = i;
				
				if(str[i].name==userName && str[i].pass== psw && $('input[name=auto]').is(":checked")){
					location.href = 'index.html';					
					$('.span-1').html('');
					var nam = str[index].name;
					$.cookie('userName',nam,{expires: 7 ,path:'/'});		
//				判断是否勾选记住账号
					if($('input[name=remember]').is(":checked")){	
						
						$.cookie('see',nam,{expires: 7 ,path:'/'});						
					}

					return;
				}else{
					$('.span-1').html('用户名不存在或密码错误');
				}

			}
	
		});
	}
	
	$('input[name=user]').focus(function(){
		$('.span-1').html('');
	});
//				
});
			

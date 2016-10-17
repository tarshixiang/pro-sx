//登录信息
//	确定游客还是会员
	$.cookie('not',"youke",{expries:300,path:"/"});	
	
	if($.cookie('userName')){
		userName = $.cookie('userName')
		$('.head-left .top-2 span').siblings().hide();
		$('.head-left .top-2 span').html('您好！'+userName);
		$('.head-left .top-2 .tuichu').show();
		$('.head-left .top-2 .tuichu').click(function(){
			$.cookie('userName',null,{expires:-1,path:"/"});
			$.cookie('not',"youke",{expries:300,path:"/"});
			$('.head-left .top-2 span').siblings().show();
			$('.head-left .top-2 span').html('你好，欢迎光临可得眼镜网!');
			$(this).hide();
			location.reload();
		});		
	}else{
		userName = $.cookie('not');
	}
// 购物车信息
	var whos =userName;
	if($.cookie(whos)){
		var sum =JSON.parse($.cookie(whos));
		var carNum = 0 ;
		for(var i=0 ; i<sum.length; i++){
			carNum += JSON.parse($.cookie(whos))[i].num;
		}			
	}else{
		var carNum =0 ;
	}
	$('.gwc').html(carNum);
	$('.gwc-num').html(carNum);	

//	导航条二级导航事件

	$('.top-3').mouseenter(function(){		
		$('.top-3').css('background','white');	
		$('.erji-1').show();	
	});
	$('.top-3').mouseleave(function(){		
		$('.top-3').css('background','url(../img/tubiao.png) 76px -16px no-repeat');	
		$('.erji-1').hide();		
	});
	$('.top-4').mouseenter(function(){	
		$('.top-4').css('background','white');	
		$('.erji-2').show();		
	});
	$('.top-4').mouseleave(function(){		
		$('.top-4').css('background','url(../img/tubiao.png) 76px -16px no-repeat');	
		$('.erji-2').hide();		
	});
	
	$('.banner li').mouseenter(function(){
		$(this).addClass('z-act').siblings().removeClass('z-act');
	});
	


//右侧菜单栏样式切换
	$('#signR li').mouseenter(function(){
		$(this).css('background-position-x','-364px').siblings().css('background-position-x','-309px');	
		$('.sign-weixin').css('background-position-x','-111px');
		$('.sign-word').css('background-position-x','-111px');
	});
	$('#signR li').mouseleave(function(){
		$(this).css('background-position-x','-309px');		
	});
	
	//右侧菜单栏回到顶部
	$('#signR .sign6').click(function(){
		$('body, html').animate({'scrollTop': 0}, 600);
	});
	$('#signR .sign4').mouseenter(function(){
		$('.sign-weixin').show();
	});
	$('#signR .sign4').mouseleave(function(){
		$('.sign-weixin').hide();
	});
	$('#signR .sign3').mouseenter(function(){
		$('.sign-word').show();
	});
	$('#signR .sign3').mouseleave(function(){
		$('.sign-word').hide();
	});
	
	
	$(window).scroll(function(){
		var self = this;
		var scrTop = $(this).scrollTop();
		if(scrTop >= 1000){
			$('#signR .sign6').show();
		}else{
			$('#signR .sign6').hide();
		}
		if(scrTop >= 600){
			$('#signL').show();
		}else{
			$('#signL').hide();
		}
	});
// 搜索栏
	$('.banner-li1').mouseenter(function(){	
		$('.banner-content').show();		
		
	});

	$('.banner-li2 li').mouseenter(function(){		
		$(this).css({'border':'1px solid #90c31f','borderRight':'white'}).siblings().css({'border':'none','borderRight':'1px solid #90c221'});
		var index = $(this).index();		
		$('.pic'+index+'').show().addClass('div-act').siblings().hide();		
	});

	$('.banner-content').mouseleave(function(){
		$(this).hide();			
	});
	

	
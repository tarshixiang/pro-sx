var banner = {
//	banner轮播
	dom : {},
	arr : ['#fdfdfd','#3da1ff','#66d7d5','#3c8ee0','#96d2f4'],
	init : function(){
		var self = this;
		var dom = this.dom;
		dom.li = $('.pic ul li');
		dom.img = $('.bantu img');
		dom.F0 = $('.pic-move ul');
		dom.F123 = $('.lunbo-f');
		dom.F123b = $('.cont-banner ul');
		dom.F4 = $('.content-4 .f4-banner-l ul');
		dom.F5 = $('.f5-banner-l ul');
		this.change();
		
		this.index = -1;
//		图片2次运动
		this.shu2 = 0 ;  
//		图片三次运动
		this.shu3 = 0 ;
				
		this.timer = setInterval(function(){
			
			self.index++;
			if(self.index >= 5){
				self.index=0;
			}
			self.shu2++;
			if(self.shu2>1){
				self.shu2 = 0;
			}
			
			self.shu3++;
			if(self.shu3>2){
				self.shu3 = 0;
			}		
			self.move();
			self.small();
		},4000);
	},
	move:function(){
		var dom = this.dom; 						
		dom.li.eq(this.index).addClass('small-act').siblings().removeClass('small-act');
		dom.img.eq(this.index).fadeIn().siblings().fadeOut();
		$('#ban-bottom').css('background',this.arr[(this.index)]);
	},
	small:function(){
		var dom = this.dom; 
		dom.F0.animate({'left':-218*(this.shu2)},2000);
		dom.F123.animate({'left':-210*(this.shu2)},2000);		
		dom.F123b.animate({'left':-490*(this.shu2)},2000);
		dom.F4.animate({'left':-710*(this.shu3)},2000);
		dom.F5.animate({'left':-710*(this.shu3)},2000);
	},
	change : function(){
		var dom = this.dom ;		
		dom.li.mouseenter(function(){
			banner.index = $(this).index();
			banner.move();
		});
	}
}
//获取json 4个量
function getJson4(url,dis,j){
	$.getJSON(url,function(data){
		for(var i=0 ; i<j;i++){
			var oli = $('<li><img src="'+data[i].img+'"/><p class=li-p>'+data[i].pirce+'</p><a href="#" class=li-a>'+data[i].content+'</a><p class=li-p1>'+data[i].til+'</p></li>')
			$(dis).append(oli);
		}
	});
}
//获取json 3个量
function getJson3(url,dis,j){
	$.getJSON(url,function(data){
		for(var i=0 ; i<j;i++){
			var oli = $('<li class=ti><img src="'+data[i].img+'"/><a href="#" >'+data[i].title+'</a><p class="p">'+data[i].price+'</p></li>')
			$(dis).append(oli);
		}
	});
}

//4,5楼获取json
function getJsonF4(url,dis,j){
	$.getJSON(url,function(data){
		for(var i=0 ; i<j;i++){
			var oli = $('<li><img src="'+data[i].img+'"/><span>'+data[i].pirce+'</span><a href="#" >'+data[i].content+'</a><p >'+data[i].til+'</p></li>')
			$(dis).append(oli);
		}
	});
}


$(function(){
	
//banner轮播图	
	banner.init();

	
//	背景图选择框
	$('.banner-li2 li').mouseenter(function(){		
		$(this).css({'border':'1px solid #90c31f','borderRight':'white'}).siblings().css({'border':'none','borderRight':'1px solid #90c221'});
		var index = $(this).index();		
		$('.pic'+index+'').show().addClass('div-act').siblings().hide();
		$('.pic').show();
		$('.banner-content').mouseleave(function(){		
			$('.pic'+index+'').hide().removeClass('div-act');
			$('.banner-li2 li').css('border','none');
			$('.small-banner').show();
		});
	});


//	左侧楼梯样式切换

	$('#signL li').mouseenter(function(){
		$(this).css('background-position-x','-30px').siblings().css('background-position-x','-70px');
	});
	$('#signL li').mouseleave(function(){
		$(this).css('background-position-x','-70px');	
	});

//左侧楼梯跳转

	$('#signL li').click(function(){

		var index = $(this).index();
		if(index==0){
			$('body, html').animate({'scrollTop': $('.content-1-top').offset().top}, 600);
		}
		else if(index==1){
			$('body, html').animate({'scrollTop': $('.content-2-top').offset().top}, 600);
		}
		else if(index==2){
			$('body, html').animate({'scrollTop': $('.content-3-top').offset().top}, 600);
		}
		else if(index==3){
			$('body, html').animate({'scrollTop': $('.content-4-top').offset().top}, 600);
		}	
	});
	
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
	
	

//	0级阶梯
//	TAB	切换
	$('.cont-0-top-right span').mouseenter(function(){
		$(this).addClass('cont-z-act').siblings().removeClass('cont-z-act');
	});

	getJson3('../json/index-0.json','.cont-0-bottom-ul',5);

//	点击切换json数据
	$('.cont-0-bottom-left .miao1').mouseenter(function(){
		$('.cont-0-bottom-ul').html('');
		$(this).css('background-position-y','0').siblings().css('background-position-y','-91px');
		getJson3('../json/index-0.json','.cont-0-bottom-ul',5);
	});
	
	$('.cont-0-bottom-left .miao2').mouseenter(function(){	
		$('.cont-0-bottom-ul').html('');
		$(this).css('background-position-y','-273px').siblings().css('background-position-y','-182px');
		getJson3('../json/index-1.json','.cont-0-bottom-ul',5);	
	});
	
//	1,2,3,4级阶梯 获取json数据
	
	getJson4('../json/index-1f.json','.content-1 .content-f-bottom-right',12);
	getJson4('../json/index-2f.json','.content-2 .content-f-bottom-right',12);
	getJson4('../json/index-3f.json','.content-3 .content-f-bottom-right',12);	
	getJsonF4('../json/index-4f.json','.content-4 .f4-picli',12);
	getJsonF4('../json/index-5f.json','.f5-pic ul',8);
	
	
	
	
// 6阶梯
	$('.cont-6-top li').mouseenter(function(){
		var index = $(this).index();
		$(this).addClass('sixUl-act').siblings().removeClass('sixUl-act');
		$('.cont-6-bottom .list').eq(index).addClass('sixLi-act').siblings().removeClass('sixLi-act');
	});
	
	$('.li-bottom-left').mouseenter(function(){	
		$(this).css('background-position-y','0px').addClass('sixLi-act').siblings().removeClass('sixLi-act');
		$(this).siblings().css('background-position-y','-136px');
	});
	$('.li-bottom-left2').mouseenter(function(){		
		$(this).css('background-position-y','-408px').addClass('sixLi-act').siblings().removeClass('sixLi-act');;
		$(this).siblings().css('background-position-y','-272px');
	});
	
// 6-1阶梯
	$('.con-6-1 span').mouseenter(function(){
		
		$(this).addClass('sixUl-act').siblings().removeClass('sixUl-act');
	});
	$('.con-6-4 ul li').mouseenter(function(){
		
		$(this).addClass('sixUl-act').siblings().removeClass('sixUl-act');
	});

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
//			location.reload();
		});		
	}else{
		userName = $.cookie('not');
	}
});

$(function(){
	
//				获取商品列表				
	$.getJSON('../json/shops.json',function(data){
		for(var i=0 ; i<40 ; i++){						
			var oli = $('<li><img src="'+data[i].img+'"><p class="s-p1">￥<span>'+data[i].price+'</span></p><p class="s-p2"><a href="#">'+data[i].content+'</a></p><p class="s-p3">'+data[i].useful+'</p><p class="s-p4"><b></b><span>有'+data[i].num+'条评论</span></p><div class="shop-buy addcar"><i></i>购物车</div><div class="shop-sc"><i></i>收藏</div></li>');
			$('.ss').append(oli);
			
			if((i+1)%4==0){
				$('.ss').append('<div class="clear"></div>');
			}
		}
		
	});	
//				商品列表样式改变
	$('.ss').on('mouseenter','li',function(){	
		$(this).css({'height':'378px','border':'1px solid #6D9D03','margin':'0 20px -30px 0','z-index':'10'});
		$(this).find('.shop-buy').show();
		$(this).find('.shop-sc').show();

	});
	$('.ss').on('mouseleave','li',function(){
		$(this).css({'height':'348px','border':'1px solid #ccc','margin':'0 20px 30px 0','z-index':'1'});
		$(this).find('.shop-buy').hide();
		$(this).find('.shop-sc').hide();					
	});

//				商品列表分页 

	$('.fenlei div b').eq(0).click(function(){
		$('.ss').css({"top":'0'});
		$(this).parent().find('em').html('1/2');
		$('.fenye').val('1');
	});
	
	$('.fenlei div b').eq(1).click(function(){					
		$('.ss').css({"top":'-1900px'});
		$(this).parent().find('em').html('2/2');
		$('.fenye').val('2');
	});
			
	
//				商品栏分类				
	$('.fenlei span').click(function(){
		$(this).addClass('fenlei-act').siblings().removeClass('fenlei-act');
	});
//              综合排序			
	$('.fenlei span').eq(0).click(function(){					
		$('.ss li').remove();
		$.getJSON('../json/shops.json',function(data){
			for(var i=0 ; i<40 ; i++){						
				var oli = $('<li><img src="'+data[i].img+'"><p class="s-p1">￥<span>'+data[i].price+'</span></p><p class="s-p2"><a href="#">'+data[i].content+'</a></p><p class="s-p3">'+data[i].useful+'</p><p class="s-p4"><b></b><span>有'+data[i].num+'条评论</span></p><div class="shop-buy addcar"><i></i>购物车</div><div class="shop-sc"><i></i>收藏</div></li>');
				$('.ss').append(oli);
				
				if((i+1)%4==0){
					$('.ss').append('<div class="clear"></div>');
				}
			}
			
		});				
	});
//              按销量排				
	$('.fenlei span').eq(1).click(function(){	
		$('.ss li').remove();
		$.getJSON('../json/shops.json',function(data){
			
			for(var j = 0; j < data.length - 1;j++){
				var isTrue = false;
				for(var i = 0; i < data.length - j - 1;i++){
					if(parseInt(data[i].num ) < parseInt( data[i+1].num)){
						var  temp = data[i];
						data[i] = data[i+1];
						data[i+1] = temp;
						isTrue = true;
					}
				}							
					if(isTrue == false){
						break;
				}	
			}
					
			for(var i=0 ; i<40; i++){						
				var oli = $('<li><img src="'+data[i].img+'"><p class="s-p1">￥<span>'+data[i].price+'</span></p><p class="s-p2"><a href="#">'+data[i].content+'</a></p><p class="s-p3">'+data[i].useful+'</p><p class="s-p4"><b></b><span>有'+data[i].num+'条评论</span></p><div class="shop-buy addcar"><i></i>购物车</div><div class="shop-sc"><i></i>收藏</div></li>');
				$('.ss').append(oli);
				
				if((i+1)%4==0){
					$('.ss').append('<div class="clear"></div>');
				}
			
			}
		});

	});				

	
//按价格排
	$('.fenlei span').eq(2).click(function(){	
		$('.ss li').remove();
		$.getJSON('../json/shops.json',function(data){
			
			for(var j = 0; j < data.length - 1;j++){
				var isTrue = false;
				for(var i = 0; i < data.length - j - 1;i++){
					if(parseInt(data[i].price ) > parseInt( data[i+1].price)){
						var  temp = data[i];
						data[i] = data[i+1];
						data[i+1] = temp;
						isTrue = true;
					}
				}							
					if(isTrue == false){
						break;
				}	
			}
					
			for(var i=0 ; i<40; i++){						
				var oli = $('<li><img src="'+data[i].img+'"><p class="s-p1">￥<span>'+data[i].price+'</span></p><p class="s-p2"><a href="#">'+data[i].content+'</a></p><p class="s-p3">'+data[i].useful+'</p><p class="s-p4"><b></b><span>有'+data[i].num+'条评论</span></p><div class="shop-buy addcar"><i></i>购物车</div><div class="shop-sc"><i></i>收藏</div></li>');
				$('.ss').append(oli);
				
				if((i+1)%4==0){
					$('.ss').append('<div class="clear"></div>');
				}
			
			}
		});

	});	
	
	
	
	if($.cookie(whos)){
		arr =JSON.parse($.cookie(whos));					
	}else{
		var arr = [];
	}

	$('.ss').on('click','.shop-buy',function(e){
//确定购物车数量				
		$('#msg').fadeIn();	
		setTimeout(function(){
			$('#msg').fadeOut();
		},10);
		if($.cookie(whos)){
			
			var sum =JSON.parse($.cookie(whos));
			var carNum = 0 ;
			for(var i=0 ; i<sum.length; i++){						
				carNum += JSON.parse($.cookie(whos))[i].num;
			}						
		}else{
			var carNum =0 ;
		}
		$('.gwc').html(carNum+1);
		$('.gwc-num').html(carNum+1);

		
//					添加商品到购物车
		var obj = {};				
		$.cookie("carNum",JSON.stringify(carNum),{ expries: 20, path:"/"});
		obj.img = $(this).parent().find('img').attr('src');
		obj.num = 1;
		obj.price = $(this).parent().find('.s-p1 span').html();
		obj.content = $(this).parent().find('.s-p2 a').html();					
		obj.useful = $(this).parent().find('.s-p3').html();
		
		for(var i=0 ; i<arr.length ; i++){
			if(obj.img==arr[i].img){
				arr[i].num++;
				$.cookie(whos,JSON.stringify(arr),{expires: 300 ,path:"/"});	
				return;
			}
		}
		arr.push(obj);					
		$.cookie(whos,JSON.stringify(arr),{expires: 300 ,path:"/"});						
	});

	$('.banner-li1').mouseenter(function(){
		$('.banner-li2').show()
	})
});

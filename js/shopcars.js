
$(function(){
	
//				计算价格数量
	var money = 0;
	var shopNum = 0;
	if($.cookie(whos)){
		shops = JSON.parse($.cookie(whos));	
	}else{
		var shops = [];
	}
//商品列表信息显示			
	if(shops.length!=0){
		$('.car-null').hide();
		$('.car-has').show();
		for(var i=0 ; i<shops.length ; i++){
			var oBox  = $('<div class="box"><ul><li class="li-1"><img src="'+shops[i].img+'"><span>'+shops[i].content+'</span></li><li class="li-2"><input type="button"  value="-" class="jian"/><input type="text" value="'+shops[i].num+'" class="txt"/><input type="button" value="+"  class="jia"/></li><li class="li-3">￥'+shops[i].price+'</li><li class="li-4">￥<a class="xiaoji">'+shops[i].num*shops[i].price+'</a></li><li class="li-5"><a  href="javascript:;">加入收藏夹</a><a href="javascript:;" class="del">删除</a></li></ul></div>');						
			money += shops[i].num*shops[i].price;
			shopNum += shops[i].num;
			$('.car-list').append(oBox);
			$('.zongjia').html('￥'+money+'.00');
			$('.bigZ').html('￥'+money+'.00');
			$('.shopNum').html(shopNum);												
		}
	}else{
		$('.car-has').hide();
		$('.car-null').show();
	}
	
//删除商品		
//删除的东西添加到下面回收站	数组delArr
	if($.cookie("del")){
		delAr = JSON.parse($.cookie("del"));
	}else{
		var delAr = [];
	}
	
	if(delAr.length!=0){
		for(var i=0 ; i< delAr.length ; i++){
			console.log(delAr[i][0].img);
			var odiv = $('<div><img src='+delAr[i][0].img+'><p class="p1">￥'+delAr[i][0].price+'</p><p>'+delAr[i][0].content+'*'+delAr[i][0].num+'</p><input type="button" value="重新加入购物车"/></div>');
			$('.skills-box li').eq(3).append(odiv);	
		}
	}
//删除商品			
	$('.car-list').on('click','.del',function(){					
		$('#tcc').show();
		$('.alter').show();
		money = 0;
		shopNum = 0;
		var index = $(this).parents(".box").index();
		$('.sure').click(function(){
			$('#tcc').hide();
			$('.alter').hide();	
			location.reload();
		});
		var a = shops.splice(index,1);
//添加到页面
		var od = $('<div><img src='+a[0].img+'><p class="p1">￥'+a[0].price+'</p><p>'+a[0].content+'*'+a[0].num+'</p><input type="button" value="重新加入购物车"/></div>');
		$('.zongjia').html('￥'+money+'.00');
		$('.bigZ').html('￥'+money+'.00');
		$('.shopNum').html(shopNum+'.00');
		$('.gwc').html(shopNum);
		$('.skills-box li').eq(3).append(od);
	
		delAr.push(a);
		$.cookie('del',JSON.stringify(delAr),{expries:300,path:"/"});					
		$.cookie(whos,JSON.stringify(shops),{expries:300,path:"/"});									
		for(var i=0 ; i<shops.length ; i++){
			money += shops[i].num*shops[i].price;
			shopNum += shops[i].num;
			$('.zongjia').html('￥'+money);
			$('.bigZ').html('￥'+money);
			$('.shopNum').html(shopNum);
			$('.gwc').html(shopNum);
		}	
		if(shops.length==0){
			$('.car-null').show();
			$('.car-has').hide();
			$('.zongjia').html('￥0.00');
			$('.bigZ').html('￥0.00');
			$('.shopNum').html(0);
			$('.gwc').html(0);
		}
		$(this).parents(".box").remove();	
	});
	
	$('.close , .noSure').click(function(){
		$('#tcc').hide();
		$('.alter').hide();
		location.reload();
	})

//              回收站加入购物车
	
	$('.skills-box li div input').click(function(){
		location.reload();
		money = 0;
		shopNum = 0;
		var index = $(this).parents('div').index();
		$(this).parent().remove();
		delAr = JSON.parse($.cookie('del'));
		var del =delAr.splice(index,1);		
		var oB  = $('<div class="box"><ul><li class="li-1"><img src='+del[0][0].img+'><span>'+del[0][0].content+'</span></li><li class="li-2"><input type="button"  value="-" class="jian"/><input type="text" value="'+del[0][0].num+'" class="txt"/><input type="button" value="+"  class="jia"/></li><li class="li-3">￥'+del[0][0].price+'</li><li class="li-4">￥<a class="xiaoji">'+del[0][0].num*del[0][0].price+'</a></li><li class="li-5"><a  href="javascript:;">加入收藏夹</a><a href="javascript:;" class="del">删除</a></li></ul></div>');
		$('.car-list').append(oB);
		$('.zongjia').html('￥'+money+'.00');
		$('.bigZ').html('￥'+money+'.00');
		$('.shopNum').html(shopNum);
		$('.gwc').html(shopNum);
		
		for(var i=0 ; i<shops.length ; i++){
			money += shops[i].num*shops[i].price;
			shopNum += shops[i].num;
			$('.zongjia').html('￥'+money+'.00');
			$('.bigZ').html('￥'+money+'.00');
			$('.shopNum').html(shopNum);
			$('.gwc').html(shopNum);
		}	
		
		
		$.cookie('del',JSON.stringify(delAr),{expries:300,path:"/"});					
		shops = JSON.parse($.cookie(whos));					
		shops.push(del[0][0]);						
		$.cookie(whos,JSON.stringify(shops),{expries:300,path:"/"});
		
	});


//             加减数量				
	$(".car-list").on('click','.jia',function(){
		money = 0;
		shopNum = 0;
		var index = $(this).parents(".box").index();
		var n =parseInt($(this).prev().val()) + 1;
		$(this).prev().val(n);
		for(var i=0 ; i<shops.length ; i++){
			if(i==index){
				shops[i].num++;
				$(this).parents('.box').find('.xiaoji').html(shops[i].num*shops[i].price);
				$.cookie(whos,JSON.stringify(shops),{expires: 300 ,path:"/"});
			}					
			money += shops[i].num*shops[i].price;
			shopNum += shops[i].num;
			$('.zongjia').html('￥'+money.toFixed());
			$('.bigZ').html('￥'+money.toFixed());
			$('.shopNum').html(shopNum);
			$('.gwc').html(shopNum);
		}							
	});
	$(".car-list").on('click','.jian',function(){
		money = 0;
		shopNum = 0;					
		var index = $(this).parents(".box").index();
		var n =parseInt($(this).next().val()) - 1;
		if(n==0){
			return;
		}
		$(this).next().val(n);
		for(var i=0 ; i<shops.length ; i++){
			if(i==index){
				shops[i].num--;
				$(this).parents('.box').find('.xiaoji').html(shops[i].num*shops[i].price);
				$.cookie(whos,JSON.stringify(shops),{expires: 300 ,path:"/"});
			}					
			money += shops[i].num*shops[i].price;
			shopNum += shops[i].num;
			$('.zongjia').html('￥'+money.toFixed());
			$('.bigZ').html('￥'+money.toFixed());
			$('.shopNum').html(shopNum);
			$('.gwc').html(shopNum);
		}
	});
	
	
//				tab切换列表							
	$('.skills-list li').click(function(){
		$('.prev').show();
		$('.next').show();
		index= $(this).index();
		$(this).addClass('li-click').siblings().removeClass('li-click');
		$('.skills-box li').eq(index).addClass('ul-act').siblings().removeClass('ul-act');
		var m = $('.ul-act div').size();
		
		$('.next').click(function(){
			var x =parseInt($('.skills-box li.ul-act').css('left')); 					
			var n = $('.ul-act div').size();					
			m--;
			x-=197;
			if(m<=n-6){
				m=n-5;
				return;
			}
			else{
				$('.skills-box li.ul-act').animate({"left":x},100);
			}
			
		});
		$('.prev').click(function(){
			var x =parseInt($('.skills-box li.ul-act').css('left')); 					
			var n = $('.ul-act div').size();						
			x+=197;					
			if (x==197) {
				x=0;
				return;
			}else{	
				$('.skills-box li.ul-act').animate({"left":x},100);
			}
		});
	});	
	//结算	
		$('.jisuan').click(function(){
			if(userName=="youke"){
				$('.js').show();
			}
			$('.js-close i').click(function(){
				$('.js').hide();
			});
			$('.js-sure').click(function(){
				location.href = "signIn.html";
			});
			
		});
		
	
});

var bigChange = {

    dom: {},

    init: function() {

        this.initDom();
        this.bindEvent();
    },

    initDom: function() {
        var dom = this.dom;
        dom.sImg = $('.small-pic');      // 小图的盒子
        dom.bImg = $('.bigImg');      // 大图的盒子
        dom.large = $('.big');    // 放大镜
    },

    bindEvent: function() {

        var dom = this.dom;

		dom.sImg.mouseenter(function(){
			dom.bImg.show();
            dom.large.show();
		});
		dom.sImg.mouseleave(function(){
			dom.bImg.hide();
            dom.large.hide();
		});

        dom.sImg.mousemove(function(e) {

            var left = e.pageX - dom.sImg.offset().left - dom.large.width() / 2;
            var top = e.pageY - dom.sImg.offset().top - dom.large.height() / 2;

            if (left <= 0) {
                left = 0;
            } else if (left >= dom.sImg.width() - dom.large.width()) {
                left = dom.sImg.width() - dom.large.width();
            }

            if (top <= 0) {
                top = 0;
            } else if (top >= dom.sImg.height() - dom.large.height()) {
                top = dom.sImg.height() - dom.large.height();
            }
	
            dom.large.css({'left': left, 'top': top});
            var bLeft = left * (dom.bImg.find('img').width() - dom.bImg.width()) / (dom.sImg.width() - dom.large.width());
            var bTop = top * (dom.bImg.find('img').height() - dom.bImg.height()) / (dom.sImg.height() - dom.large.height());

            dom.bImg.find('img').css({'left': -bLeft, 'top': -bTop});
			
        });
    }			
}

$(function(){

	bigChange.init();
	
	
	$('.small-logo li').mouseenter(function(){
		var index = $(this).index();
		$('.small-pic li').eq(index).addClass('xq-act').siblings().removeClass('xq-act');
		$(this).addClass('tab-small').siblings().removeClass('tab-small');
		$('.bigImg img').attr("src","../img/spxq/big"+index+".jpg");

	});
//				右眼选择度数
	$('.R').click(function(){
		
		$(this).find('ul').slideToggle();
		
	});
	$('.R ul li').click(function(){
		var n = $(this).html();
		$(this).parent().parent().find('em').html(n);
	});
//				左眼选择度数			
	$('.L').click(function(){
		
		$(this).find('ul').slideToggle();
		
	});
	$('.L ul li').click(function(){
		var n = $(this).html();
		$(this).parent().parent().find('em').html(n);
	});
	
//	加减数量
	$('.jian').click(function(){				
		var num =$(this).next().val() ;
		num--;
		if(num==-1){
			return;
		}else{
			$(this).next().val(num);
		}
	});
	
	$('.jia').click(function(){				
		var num =$(this).prev().val();
		num++;				
		$(this).prev().val(num);
	});
//	扫微信
	$('.last').mouseenter(function(){
		$(this).find("img").show();
	});
	$('.last').mouseleave(function(){
		$(this).find("img").hide();
	});
		
//	tab切换
	$('.types-right-top li').click(function(){
		$(this).addClass('xq-l').siblings().removeClass('xq-l');
		var index = $(this).index();
		$('.types-right-bottom li').eq(index).addClass('img-act').siblings().removeClass('img-act');
	});
	
	$('.shop-center-bottom .pic li').click(function(){
		$(this).addClass('xq-li').siblings().removeClass('xq-li');
		
	});
	
//	清楚记录
	$('.delete').click(function(){
		$(this).parent().hide();
		$(this).parent().find('li').remove();
	});
	
	
});

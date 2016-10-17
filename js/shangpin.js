
var Index = {

    dom: {},
    index: 0,    // 当前显示的轮播的下标
    timer: null,

    init: function() {

        this.initDom();
        this.initSlide();
        this.myShow();
        this.bindEvent();

        this.timer = setInterval(function() {
            Index.slideChange();
        }, 3000)

    },

    bindEvent: function() {
        var dom = this.dom;
        var self = this;

        dom.main.mouseenter(function() {
            clearInterval(self.timer);				
            dom.prevBtn.show();
            dom.nextBtn.show();
        });

        dom.main.mouseleave(function() {
            self.timer = setInterval(function() {
                Index.slideChange();
            }, 3000)

            dom.prevBtn.hide();
            dom.nextBtn.hide();

        });

        dom.prevBtn.click(function() {
            self.index--;

            if (self.index < 0) {
                self.index = dom.liNum-1;
            }
            self.myShow();
        });

        dom.nextBtn.click(function() {
            self.slideChange();
        });
        
        dom.small.mouseenter(function(){					        						        	
     		$(this).addClass('small-act').siblings().removeClass('small-act');
        	self.index = $(this).index();
        	self.myShow();
        });

    },

    initDom: function() {
        var dom = this.dom;
        dom.li = $('.sp-pic li');
        dom.main = $('#ban-bottom');
        dom.prevBtn = $('.prev');
        dom.nextBtn = $('.next');
        dom.small = $('.sp-small li');
    },

    initSlide: function() {
        var dom = this.dom;
        dom.liNum = dom.li.size();  // 获取li的个数
    },

    myShow: function() {
        var dom = this.dom;
        dom.li.eq(this.index).fadeIn().siblings().fadeOut();
     	dom.small.eq(this.index).addClass('small-act').siblings().removeClass('small-act');

    },

    slideChange: function() {
        var dom = this.dom;

        this.index++;

        if (this.index == dom.liNum) {
            this.index = 0;
        }				
        this.myShow();

    }

}

$(function(){
	
//						商品列表	
	Index.init();
	$.getJSON('../json/shangpin-1.json',function(data){
		
		for(var i=0 ; i<15;i++){
			var oLi = $('<li><a href="#"><img src="'+data[i].img+'"/></a><p class="p1">'+data[i].p1+'</p><p class="p2">'+data[i].p2+'</p><p class="p3">'+data[i].p3+'</p></li>');
			$('.pro-2 ul').append(oLi);
		}
		
	});
	
	$.getJSON('../json/shangpin-2.json',function(data){
		for(var i=0 ; i<12;i++){
			var oLi = $('<li><a href="#"><img src="'+data[i].img+'"/></a><p class="p1">'+data[i].p1+'</p><p class="p2">'+data[i].p2+'</p><p class="p3">'+data[i].p3+'</p></li>');
			$('.pro-3 ul').append(oLi);
		}
	
	
	});
	


});

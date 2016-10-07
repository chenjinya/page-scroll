/*
 * @author jinyachen@gmail.com
 * Page Scroll
 *
 */
var PScroll = function(el){
    this.el = el;
    this.init();
}
PScroll.prototype = {
    window: {
        height: 0,
        widht: 0
    },
    unit: 'em',
    scrollStep: 1,
    init: function(){

        this.window.width = $(window).width();
        this.window.height = $(window).height();
        if(!this.el){
            this.el = $("[page-scroll-body]");
        }
        this.psb = this.el;
        
        $("body").css({
            height: this.window.height,
        });
        this.bindEvent();
    },
    initStyle: function(){
    },
    bindEvent: function(){
        document.addEventListener('touchmove', function (e) {
            e.preventDefault();
        }, false);
        var self = this;
        var psb = this.psb;
        var scrollTop = 0;
        var scrollLeft = 0;
        var scrollTopPre = 0;
        var scrollStep = this.scrollStep;// %
        var unit = this.unit;

        psb.on("touchstart", function(e){

        })
        .on("touchend", function(e){
            emBasePx = parseInt(self.psb.css("font-size"));
            var maxTop = 0;
            switch(unit){
                case "em": 
                    maxTop = Math.ceil((self.window.height - self.psb.height()) / emBasePx);
                    break;
                case "%": 
                    maxTop =  Math.ceil(( 1 - self.psb.height()/ self.window.height) * 100)  ;
                    break;
                case "px": 
                    maxTop =  Math.ceil(self.window.height - self.psb.height());
                    break;
                default : 
                    maxTop = 0;
                    break;
            }
            if(scrollTop > 0){
                scrollTop = 0;
            }
            else if( scrollTop < maxTop) {
                scrollTop = maxTop;
            }
            psb.animate({
                top: scrollTop + unit,
            },100);

        }).on("touchmove", function(e){         
            if(e.changedTouches[0].clientY - scrollTopPre < 0){
                scrollTop -= scrollStep;
            } else {
                scrollTop += scrollStep;
            }            
            psb.css({
                top: scrollTop + unit,
            });
            scrollTopPre = e.changedTouches[0].clientY
            return false;
            
        });
    }
}


/***************************************
writed by Li quanfeng. 
date:2014/11/20
***************************************/
$(window).ready(function(){
    //init particleground 粒子动画
    $("#canvas-wrapper").css({
        'height':$(window).height()+'px',
        'width':$(window).width()+'px'
    });
    $('#canvas-wrapper').particleground({
        dotColor: '#9af4e5',
        lineColor: '#c9f2eb'
    }); 
    
    //鼠标移动反差效果
    var items = document.getElementsByClassName("nav-title");
    document.addEventListener('mousemove', function (evt){
        var x = evt.clientX;
        var y = evt.clientY;
        var winWidth = window.innerWidth;
        var winHeight = window.innerHeight;
        var halfWidth = winWidth / 2;
        var halfHeight = winHeight / 2;
     
        var rx = x - halfWidth;
        var ry = halfHeight - y;
        var length = items.length;
        var max = 40;
        for (var i = 0 ; i < length ; i++) {
            var dx = (items[i].getBoundingClientRect().width/max)*(rx / -halfWidth);
            var dy = (items[i].getBoundingClientRect().height/max)*(ry / halfHeight); 
            items[i].style['transform'] = items[i].style['-webkit-transform'] = 'translate('+dx+'px,'+dy+'px)';
        }
          
    }, false);

    //滑动最顶部top按钮
    $(window).bind('scroll resize',function(){ 
        $(".ico-top").goToTop(); 
    }); 
});

$(window).load(function(){
    $("#loading").fadeOut("normal",function(){
        $(".main").fadeIn();
    });
}); 

//jQuery扩展返回顶部方法
(function($){
    var goToTopTime;
    $.fn.goToTop=function(options){
        var opts = $.extend({},$.fn.goToTop.def,options);
        var $window=$(window);
        $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body'); // opera fix
        var $this=$(this);
        clearTimeout(goToTopTime);
        goToTopTime=setTimeout(function(){
            var shouldvisible=( $window.scrollTop() >= opts.startline )? true : false;
            
            if (shouldvisible){
                $this.stop().addClass("animated  bounceInUp");
                $this.show();
            }else{
                $this.stop().removeClass("animated  bounceInUp");
                $this.fadeOut();
            }
        },30);
        
        $(this).click(function(event){
            $body.stop().animate( { scrollTop: $(opts.targetObg).offset().top}, opts.duration);
            $(this).blur();
            event.preventDefault();
            event.stopPropagation();
        });
    };
    
    $.fn.goToTop.def={
        startline:30,//出现回到顶部按钮的滚动条scrollTop距离
        duration:200,//回到顶部的速度时间
        targetObg:"html"//目标位置
    };
})(jQuery);
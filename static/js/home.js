/***************************************
writed by Li quanfeng. 
date:2014/11/20
***************************************/
$(window).ready(function(){
    // //menu点击切换效果
    // $(".menu").on('click','li',function(){ 
    //    $(".menu li").each(function(){
    //         if($(this).hasClass("active")){
    //             $(this).removeClass("active");
    //         }
    //    });
    //    $(this).addClass("active");         
    // }); 
    //图片轮播
    (function(){
        var num=$(".img-gallary").children().length;//图片数建议不大于5
        var index=0;
        var h=$("#news .nav-content").height();
        setInterval(function(){imgAnimate2D(1);},5000);

        $(".ico-next").click(function(){
            console.log('ico-next')
            // index=autoIndex(index,0);
            imgAnimate2D(0);
        });
        $(".ico-prev").click(function(){
            console.log('ico-prev')
            // index=autoIndex(index,1);
            imgAnimate2D(1);
        });
        $("#main-bg").click(function(){
            
        });
        $(".img-gallary").click(function(){
            console.log("this.img-gallary")
        });
        //图片切换动画
        function imgAnimate2D(sign){
            index=autoIndex(index,parseInt(sign));
            $(".img-gallary").animate({
                'margin-top':'-'+index*h+'px',
            },500);
        }
        function imgAnimate3D(){
            
        }
        function autoIndex(i,sign){
            //sign:1为循环自增,sign:0为循环自减
            if(sign==1 && i==num-1){
                i=0;
            }
            else if(sign==1){
                i++;
            }
            else if(sign==0 && i==0){
                i=num-1;
            }
            else if(sign==0){
                i--;
            }
            else{
                console.log('params error...')
            }
            return i;
        }
    })();
    //init particleground 粒子动画
    $("#canvas-wrapper").css({'height':$(window).height()+'px','width':$(window).width()+'px'});
    $('#canvas-wrapper').particleground({
        dotColor: '#eee',
        lineColor: '#efefef'
    }); 
    //鼠标移动反差效果
    function effectM(){
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
    };
    effectM();
    //滑动最顶部top按钮
    $(window).bind('scroll resize',function(){ 
        $(".ico-top").goToTop(); 
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
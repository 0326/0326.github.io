/***************************************
copyright 武汉华中时讯科技有限公司
writed by Li quanfeng. 
date:2014/11/20
***************************************/
$(document).ready(function(){
    //nav-box导航动画
    $(".nav-box").click(function(){
        var name=this.id;
        if(name=="news") return;

        $(".main").animate({
            'margin-left':'-1000px',
        },1000,function(){
            $(".main").fadeOut();
            $(".ico-back").fadeIn();
            $('#page-'+name).fadeIn();  
        });
        $(".ico-back").click(function(){
            $('#page-'+name).fadeOut();
            $(".ico-back").fadeOut();
            $(".main").animate({
                'margin-left':'100px',
                'display':'block'
            },1000);
            $(".main").fadeIn();
        });
    });
    //图片轮播
    (function(){
        var num=$(".img-gallary").children().length;//图片数建议不大于5
        var index=0;
        var h=$("#news .nav-content").height();
        setInterval(imgAnimate2D,5000);

        $(".ico-next").click(function(){
            console.log('ico-next')
            index=autoIndex(index,1);
            imgAnimate2D();
        });
        $(".ico-prev").click(function(){
            console.log('ico-prev')
            index=autoIndex(index,-1);
            imgAnimate2D();
        });
        $("#main-bg").click(function(){
            
        });
        $(".img-gallary").click(function(){
            console.log("this.img-gallary")
        });
        //图片切换动画
        function imgAnimate2D(){
            $(".img-gallary").animate({
                'margin-top':'-'+index*h+'px',
            },500);
            index=autoIndex(index,1);
            // console.log(index)
        }
        function imgAnimate3D(){
            
        }
        function autoIndex(i,sign){
            if(i>=num-1){
                i=0;
            }
            else if(sign==-1){//prev,自减
                if(i==0){
                    i=num-1;
                }
                else{
                    i--;
                }
            }
            else{
                i++;//next,自增
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
});
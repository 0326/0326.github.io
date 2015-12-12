define([], function(){


    //iframe 通信
    window.iframeCall = {
        setheight: function (el,height) {
            $(el).css({'height':height});
        }
    };

    /**
     * 前端导航链接页面
     */
    function initNavMenu() {
        var protocol = location.protocol || 'http:';
        $('.J_MenuList').on('click','a', function (e) {
            var $target = $(e.target);

            if($target.attr('href').indexOf('/?#link') === 0){
                e.preventDefault();
                (function () {
                    var height = $('.mid-col').height() -100;
                    var width = $('.mid-col').width() -20;
                    var url = protocol + '//www.aliquanfeng.com/link/';
                    var ifmStr = [
                        '<iframe name="link" id="J_IfmLink" class="ifm-link" frameborder="0" scrolling="no" src="',
                        url,
                        '" width="',
                        width,
                        '" height="',
                        height,
                        '"></iframe>'
                    ].join('');
                    if(!$('#J_IfmLink').length){
                        $('.body-wrap').hide();
                        $('.mid-col').append(ifmStr);
                        $(window).on('resize', function () {
                            $('#J_IfmLink').css({
                                'height':$('.mid-col').height() -100,
                                'width':$('.mid-col').width() -20
                            })
                        })
                    }
                })();
            }

        })
    }


    return{
        init: function(){
            initNavMenu();
        }
    }
})
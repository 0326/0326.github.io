define([], function () {


    //iframe 通信
    window.iframeCall = {
        setHeight: function (el, height) {
            $(el).css({'height': height});
        }
    };

    /**
     * 前端导航链接页面
     */
    function initNavMenu() {
        var protocol = location.protocol || 'http:';
        $('.J_MenuList').on('click', 'a', function (e) {
            var $target = $(e.target);

            // 收藏夹
            if ($target.attr('href').indexOf('/?#link') === 0) {
                e.preventDefault();
                (function () {
                    var height = $('.mid-col').height() - 100;
                    var width = $('.mid-col').width() - 20;
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

                    if (!$('#J_IfmLink').length) {
                        $('.body-wrap').hide();
                        $('.mid-col').append(ifmStr);
                        $(window).on('resize', function () {
                            $('#J_IfmLink').css({
                                'height': $('.mid-col').height() - 100,
                                'width': $('.mid-col').width() - 20
                            })
                        })
                    }

                })();
            }

            // 实验室
            if ($target.attr('href').indexOf('/?#labs') === 0) {
                e.preventDefault();
                (function () {
                    var height = $('.mid-col').height();
                    var width = $('.mid-col').width();
                    var url = protocol + '//www.aliquanfeng.com/labs/';
                    var ifmStr = [
                        '<iframe name="link" id="J_IfmLabs" class="ifm-labs" frameborder="0" scrolling="no" src="',
                        url,
                        '" width="',
                        width,
                        '" height="',
                        height,
                        '"></iframe>'
                    ].join('');

                    if (!$('#J_IfmLabs').length) {
                        $('.body-wrap').hide();
                        $('.mid-col').append(ifmStr);
                    }

                })();

                // 创造关闭按钮
                var $closeBtn = $('#J_IfmLinkCloseBtn');
                if (!$closeBtn.length) {
                    $('body').append('<div id="J_IfmLinkCloseBtn" class="ifm-link-close-btn">X</div>');
                    $closeBtn = $('#J_IfmLinkCloseBtn');

                    setTimeout(function () {
                        $closeBtn.css({
                            'transform': 'translate(-80px,0)',
                            'transition': 'all 0.5s'
                        });
                    }, 60);


                    $closeBtn.on('click', function (e) {
                        //$closeBtn.css({
                        //    'right': '-120px'
                        //});
                        location.reload();
                    })
                }
            }





        })
    }


    return {
        init: function () {
            initNavMenu();
        }
    }
})
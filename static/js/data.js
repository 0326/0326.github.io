(function () {
    var DATA={},timer=null;
    
    function initLinks(){
        DATA.links={info:[],blog:[],tool:[],learn:[],other:[]};
        DATA.links.info=[
            {'name':'外刊评论','hdimg':'http://www.vaikan.com/favicon.ico','url':'http://www.vaikan.com/'}
            ,{'name':'w3cplus','hdimg':'http://cdn1.w3cplus.com/cdn/farfuture/6I7SmeJ6bvYzRevkkH6pjf9WnDTRa7YEBbsCyi6dPro/mtime:1414079820/sites/all/themes/w3cplusV2/favicon.ico','url':'http://www.w3cplus.com/'}
            ,{'name':'sitepoint','hdimg':'http://www.sitepoint.com/favicon.ico','url':'http://www.sitepoint.com/'}
            ,{'name':'CSDN','hdimg':'http://csdnimg.cn/public/favicon.ico','url':'http://www.csdn.net/'}
            ,{'name':'推酷','hdimg':'http://www.tuicool.com/favicon.ico','url':'http://www.tuicool.com/'}
            ,{'name':'伯乐在线','hdimg':'http://blog.jobbole.com/favicon.ico','url':'http://blog.jobbole.com/'}
            ,{'name':'codeproject','hdimg':'http://www.codeproject.com/favicon.ico','url':'http://www.codeproject.com'}

        ];
        DATA.links.blog=[
            {'name':'前端观察','hdimg':'http://www.qianduan.net/favicon.ico','url':'http://www.qianduan.net/'}
            ,{'name':'w3cfuns','hdimg':'http://www.w3cfuns.com/favicon.ico','url':'http://www.w3cfuns.com/'}
            ,{'name':'次碳酸钴','hdimg':'http://www.web-tinker.com/favicon.ico','url':'http://www.web-tinker.com/'}
            ,{'name':'奇舞团','hdimg':'http://www.75team.com/favicon.ico','url':'http://www.75team.com/'}
        ];
        DATA.links.tool=[
            {'name':'git简易指南','hdimg':'https://avatars1.githubusercontent.com/u/8676306?v=2&s=40','url':'http://www.bootcss.com/p/git-guide/'}
            ,{'name':'designerslist','hdimg':'http://www.designerslist.info/wp-content/themes/designerslist/assets/img/favicon.ico','url':'http://www.designerslist.info/'}
            ,{'name':'w3school','hdimg':'http://www.w3school.com.cn/favicon.ico','url':'http://www.w3school.com.cn/'}
            ,{'name':'sassmeister','hdimg':'http://sassmeister.com/favicon.ico','url':'http://sassmeister.com/'}
            ,{'name':'colourco','hdimg':'http://colourco.de/favicon.ico','url':'http://colourco.de/'}
            ,{'name':'materialpalette','hdimg':'http://assets0.materialup.com/assets/palette/favicon-60ce4eafcc4e3c6319219e26ff9e22b7.ico','url':'http://www.materialpalette.com'}
            ,{'name':'Devdocs','hdimg':'http://maxcdn.devdocs.io/images/icon-32.png','url':'http://devdocs.io/'}
            ,{'name':'ECMAScript 6','hdimg':'http://es6.ruanyifeng.com/favicon.ico','url':'http://es6.ruanyifeng.com/'}
            ,{'name':'ES6to5','hdimg':'http://es6.ruanyifeng.com/favicon.ico','url':'https://6to5.org'}
            ,{'name':'HTML5 标准','hdimg':'http://www.w3.org/2008/site/images/favicon.ico','url':'http://www.w3.org/TR/2014/REC-html5-20141028/'}
            ,{'name':'百度脑图','hdimg':'http://www.baidu.com/favicon.ico','url':'http://naotu.baidu.com/edit.html'}
            ,{'name':'nitrous','hdimg':'https://www.nitrous.io/favicon.ico','url':'https://www.nitrous.io'}
            ,{'name':'RunJS',"hdimg":'http://runjs.cn/favicon.ico','url':'http://runjs.cn/code/dsl1y3ig'}
        ];
        DATA.links.learn=[
            {'name':'图灵社区','hdimg':'http://www.ituring.com.cn/favicon.ico','url':'http://www.ituring.com.cn/'}
            ,{'name':'站酷网','hdimg':'http://www.zcool.com.cn/favicon.ico','url':'http://www.zcool.com.cn/'}
            ,{'name':'做好网站','hdimg':'http://www.dowebok.com/favicon.ico','url':'http://www.dowebok.com/'}
            ,{'name':'极客标签','hdimg':'http://www.gbtags.com/gb/networks/themes/img/gbin1.ico','url':'http://www.gbtags.com/gb/gbcollection.htm'}
            ,{'name':'优设网','hdimg':'http://www.uisdc.com/favicon.ico','url':'http://www.uisdc.com/'}
            ,{'name':'tympanus-codrops','hdimg':'http://tympanus.net/codrops/favicon.ico','url':'http://tympanus.net/codrops/'}
            ,{'name':'abduzeedo','hdimg':'http://abduzeedo.com/files/favicon_0_0.ico','url':'http://abduzeedo.com/'}
            ,{'name':'smashing magazine','hdimg':'http://www.smashingmagazine.com/wp-content/themes/smashing-magazine/images/favicon.png','url':'http://www.smashingmagazine.com/'}
            ,{'name':'慕课网','hdimg':'http://www.imooc.com/favicon.ico','url':'http://www.imooc.com/course/list'}
        ]
        DATA.links.other=[
            {'name':'0326博客','hdimg':'http://0326.github.io/favicon.ico','url':'http://0326.github.io/'}
            ,{'name':'aliqin前端','hdimg':'http://aliqin.github.io/public/favicon.ico','url':'http://aliqin.github.io/'}
            ,{'name':'腾讯CDC','hdimg':'http://cdc.tencent.com/favicon.ico','url':'http://cdc.tencent.com/'}
            ,{'name':'百度FEX','hdimg':'http://www.baidu.com/favicon.ico','url':'http://fex.baidu.com/'}
            ,{'name':'黄蜂网','hdimg':'http://woofeng.cn/favicon.ico','url':'http://woofeng.cn/'}
            ,{'name':'新浪SAE','hdimg':'http://sae.sina.com.cn/favicon.ico','url':'http://sae.sina.com.cn/'}
            ,{'name':'我是PM','hdimg':'http://www.woshipm.com/wp-content/themes/ui90_e33/images/favicon.ico','url':'http://www.woshipm.com/'}
        ];
    }

    function createLinks (argument) {
        var key,i,obj;
        initLinks();
        for(key in DATA.links){
            obj=DATA.links[key];
            for(i=0;i<obj.length;i++){
                $("#link-"+key+" .data-li").append(
                    '<li><a target="_blank" href="'+obj[i]['url']+'">'+
                    '<img src="'+obj[i]['hdimg']+'"><em>'+obj[i]['name']+'</em>'+
                    '</a></li>'
                );
            }
        }
    }

    timer = setInterval(function(){
        if($ && jQuery){
            createLinks();
            clearInterval(timer);
        }
        else{
            console.log("jQuery is loading...")
        }
    }, 500);
})()

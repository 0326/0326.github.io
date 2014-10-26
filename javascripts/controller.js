
//data-box
DATA={};
createLinks();
createWorks();

function createLinks (argument) {
	(function initLinks(){
		DATA.links={info:[],blog:[],tool:[],learn:[],other:[]};
		DATA.links.info=[
			{'name':'外刊评论','hdimg':'http://www.vaikan.com/favicon.ico','url':'http://www.vaikan.com/'}
			,{'name':'w3cplus','hdimg':'http://cdn1.w3cplus.com/cdn/farfuture/6I7SmeJ6bvYzRevkkH6pjf9WnDTRa7YEBbsCyi6dPro/mtime:1414079820/sites/all/themes/w3cplusV2/favicon.ico','url':'http://www.w3cplus.com/'}
			,{'name':'sitepoint','hdimg':'http://www.sitepoint.com/favicon.ico','url':'http://www.sitepoint.com/'}
			,{'name':'CSDN','hdimg':'http://csdnimg.cn/public/favicon.ico','url':'http://www.csdn.net/'}
			,{'name':'推酷','hdimg':'http://www.tuicool.com/favicon.ico','url':'http://www.tuicool.com/'}
			,{'name':'伯乐在线','hdimg':'http://blog.jobbole.com/favicon.ico','url':'http://blog.jobbole.com/'}
			

		];
		DATA.links.blog=[
			{'name':'前端观察','hdimg':'http://www.qianduan.net/favicon.ico','url':'http://www.qianduan.net/'}
			,{'name':'w3cfuns','hdimg':'http://www.w3cfuns.com/favicon.ico','url':'http://www.w3cfuns.com/'}
			,{'name':'次碳酸钴','hdimg':'http://www.web-tinker.com/favicon.ico','url':'http://www.web-tinker.com/'}
			,{'name':'次碳酸钴','hdimg':'http://www.web-tinker.com/favicon.ico','url':'http://www.web-tinker.com/'}
		];
		DATA.links.tool=[
			{'name':'git简易指南','hdimg':'https://avatars1.githubusercontent.com/u/8676306?v=2&s=40','url':'http://www.bootcss.com/p/git-guide/'}
			,{'name':'designerslist','hdimg':'http://www.designerslist.info/wp-content/themes/designerslist/assets/img/favicon.ico','url':'http://www.designerslist.info/'}
			,{'name':'w3school','hdimg':'http://www.w3school.com.cn/favicon.ico','url':'http://www.w3school.com.cn/'}
			,{'name':'colourco','hdimg':'http://colourco.de/favicon.ico','url':'http://colourco.de/'}

		];
		DATA.links.learn=[
			{'name':'图灵社区','hdimg':'http://www.ituring.com.cn/favicon.ico','url':'http://www.ituring.com.cn/'}
			,{'name':'站酷网','hdimg':'http://www.zcool.com.cn/favicon.ico','url':'http://www.zcool.com.cn/'}
			,{'name':'做好网站','hdimg':'http://www.dowebok.com/favicon.ico','url':'http://www.dowebok.com/'}
			,{'name':'极客标签','hdimg':'http://www.gbtags.com/gb/networks/themes/img/gbin1.ico','url':'http://www.gbtags.com/gb/gbcollection.htm'}
			,{'name':'优设网','hdimg':'http://www.uisdc.com/favicon.ico','url':'http://www.uisdc.com/'}
			,{'name':'优设网','hdimg':'http://www.uisdc.com/favicon.ico','url':'http://www.uisdc.com/'}
		]
		DATA.links.other=[
			{'name':'aliqin前端','hdimg':'http://aliqin.github.io/public/favicon.ico','url':'http://aliqin.github.io/'}
			,{'name':'腾讯CDC','hdimg':'http://cdc.tencent.com/favicon.ico','url':'http://cdc.tencent.com/'}
			,{'name':'百度FEX','hdimg':'http://www.baidu.com/favicon.ico','url':'http://fex.baidu.com/'}
			,{'name':'黄蜂网','hdimg':'http://woofeng.cn/favicon.ico','url':'http://woofeng.cn/'}
			,{'name':'新浪SAE','hdimg':'http://sae.sina.com.cn/favicon.ico','url':'http://sae.sina.com.cn/'}
			,{'name':'我是PM','hdimg':'http://www.woshipm.com/wp-content/themes/ui90_e33/images/favicon.ico','url':'http://www.woshipm.com/'}
		];
	})();
	var key,i,obj;
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

function createWorks (argument) {
	DATA.navs={'nav-work-tech':true,'nav-work-desi':true,'nav-work-life':true,'nav-work-other':true};
	(function initWorks(){
		DATA.works=[
			{'name':'IT阅读','type':'work-tech','hdimg':'images/works/itread.jpg','url':'http://itread.sinaapp.com/'}
			,{'name':'TinyGame','type':'work-other','hdimg':'http://tinygame.sinaapp.com/static/images/tinygame-logo.gif','url':'http://tinygame.sinaapp.com/'}
			,{'name':'Souvenir','type':'work-other','hdimg':'http://tp2.sinaimg.cn/2625394005/180/40062973916/1','url':'http://souvenir.sinaapp.com/'}
			,{'name':'新浪微博','type':'work-life','hdimg':'http://tp2.sinaimg.cn/2625394005/180/40062973916/1','url':'http://weibo.com/liquanfeng326'}
			,{'name':'Lofter','type':'work-life','hdimg':'http://tp2.sinaimg.cn/2625394005/180/40062973916/1','url':'http://liquanfeng.lofter.com/'}
			,{'name':'Pyramid中文文档','type':'work-tech','hdimg':'http://www.pylonsproject.org/static/images/about-pylons.png','url':'http://pyramidoc.lofter.com/'}
			,{'name':'CSDN博客','type':'work-tech','hdimg':'http://avatar.csdn.net/A/F/B/1_liquanfeng326.jpg','url':'http://blog.csdn.net/liquanfeng326'}
			,{'name':'站酷网','type':'work-desi','hdimg':'http://zcimg.zcool.com.cn/zcimg/e8dc53b29ec400000181f17e1d13.jpg','url':'http://liquanfeng.zcool.com.cn/'}
		];
	})();
	var work;
	for(var i=0;i<DATA.works.length;i++){
		$("#works .data-li").append(
			'<li class="'+DATA.works[i]['type']+'"><a href="'+DATA.works[i]['url']+'" target="_blank">'+
              '<img src="'+DATA.works[i]['hdimg']+'"><p>'+DATA.works[i]['name']+'</p>'+
            '</a></li>'
		);
	}
}
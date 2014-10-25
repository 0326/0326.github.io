//data-box
DATE={};
createLinks();

function initLinks(){
	DATE.links={info:[],blog:[],tool:[],learn:[],other:[]};
	DATE.links.info=[
		{'hdimg':'http://www.w3cfuns.com/favicon.ico','url':'http://www.w3cfuns.com/','name':'w3cfuns'}
		,{'hdimg':'http://www.w3cfuns.com/favicon.ico','url':'http://www.w3cfuns.com/','name':'w3cfuns'}
	];
	DATE.links.blog=[
		{'hdimg':'http://www.w3cfuns.com/favicon.ico','url':'http://www.w3cfuns.com/','name':'w3cfuns'}
		,{'hdimg':'http://www.w3cfuns.com/favicon.ico','url':'http://www.w3cfuns.com/','name':'w3cfuns'}
	];
	DATE.links.tool=[
		{'hdimg':'http://www.w3cfuns.com/favicon.ico','url':'http://www.w3cfuns.com/','name':'w3cfuns'}
		,{'hdimg':'http://www.w3cfuns.com/favicon.ico','url':'http://www.w3cfuns.com/','name':'w3cfuns'}
	];
	DATE.links.learn=[
		{'hdimg':'http://www.w3cfuns.com/favicon.ico','url':'http://www.w3cfuns.com/','name':'w3cfuns'}
		,{'hdimg':'http://www.w3cfuns.com/favicon.ico','url':'http://www.w3cfuns.com/','name':'w3cfuns'}
	]
	DATE.links.other=[
		{'hdimg':'http://www.w3cfuns.com/favicon.ico','url':'http://www.w3cfuns.com/','name':'w3cfuns'}
		,{'hdimg':'http://www.w3cfuns.com/favicon.ico','url':'http://www.w3cfuns.com/','name':'w3cfuns'}
	];
}

function createLinks (argument) {
	initLinks();
	var key,i,obj;
	for(key in DATE.links){
		obj=DATE.links[key];
		for(i=0;i<obj.length;i++){
			$("#link-"+key+" .data-li").append(
				'<li><a href="'+obj[i]['url']+'">'+
				'<img src="'+obj[i]['hdimg']+'"><em>'+obj[i]['name']+'</em>'+
				'</a></li>'
			);
		}
	}
}
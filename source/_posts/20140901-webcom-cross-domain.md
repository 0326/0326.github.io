title: Web通信系列-跨域
date: 2014-09-01
updated: 
tags:
category: blog
photos: http://7xp4vm.com1.z0.glb.clouddn.com/0__1280×1810_.png-q55
---

轮询，HTTP流都只能向同源页面发送请求，这主要是Ajax通信的同源限制造成的。所谓同源，就是在同一个域下的资源，所谓同域，就是相同协议，相同host，相同端口号。不符合上面三个条件的请求都是跨域请求。
<!-- more -->

## 跨域常见方法
### Access Control
CORS（Cross-Origin Resource Sharing，跨源资源共享）定义了跨源情况下浏览器与服务器该如何沟通。CORS的基本思想就是使用自定义的HTTP头部来让浏览器和服务器沟通，从而决定请求是否有效。

比如客户端会附加一个origin头部：
```javascript
Origin: http://www.feread.xyz
```
如果服务端认为这个请求可以接受，就在Access-Control-Allow-Origin头部中回发相同源信息（如果是公共资源，可以回发”*”）：
```javascript
Access-Control-Allow-Origin: http://www.feread.xyz
```
浏览器收到响应后会检查这个头部信息，如果没有这个头部或者源信息不匹配，浏览器就会驳回请求。

不同浏览器对CORS的实现不同。在IE8+中通过XDR（XDomainRequest）对象来实现。XDR不同于XHR：

1. cookie不会随请求发送，也不会随响应返回
2. 只能设置请求头部信息的Content-Type字段
3. 不能访问响应的头部信息
4. 只支持GET和POST请求

所有的XDR请求都是异步的。请求返回后会触发onload事件，使用方法与XHR大体相同。但是XDR的open方法只接受两个参数：请求类型和绝对url。
```javascript
var xdr=new XDomainRequest();
//返回成功
xdr.onload=function(){
 alert(xdr.responseText);
}
//返回错误
xdr.onerror=function(){
 alert("An error occurred");
}
//设置超时响应
xdr.timeout=1000;
xdr.ontimeout=function(){
  alert("timeout...");
}
xdr.open("post","http://www.feread.xyz/form");
xdr.contentType="application/x-www-form-urlencoded";
xdr.send("name1=Bill&name2=Gate");
```
其他浏览器（Firefox3.5+，Safari4+，Chrome，iOS版Safari，Android的WebKit…）都通过XHR对象实现了对CORS的原生支持。既然都是通过XHR实现的，那么跨域和不跨域时使用上有什么区别呢？

首先，open()的传入的url必须是绝对地址。出于安全考虑，跨域XHR还有以下限制：

1. 不能使用setRequestHeader()设置自定义头部
2. 不能发送和接收cookie
3. 调用getAllResponseHeaders()总会返回空字符串
4. 由于都是使用相同接口，为了区别，建议在不跨域时使用相对url，跨域时使用绝对url。

原则上CORS不支持自定义头部，只能发送get和post请求，但是你也可以通过一种叫做Preflight Requests的透明服务器验证机制来突破它，有兴趣自行谷歌。

由于IE和其他浏览器对CORS的实现不统一，为了兼容，我们需要实现一个统一的方案：
```javascript
function createCORSRequest(method,url){
    var xhr=new XMLHttpRequest();
    if("withCredentials" in xhr){
        xhr.open(method,url,true);
    }
    else if(typeof XDomainRequest !="undefined"){
        xhr=new XDomainRequest();
        xhr.open(method,url);
    }
    else{
        xhr=null;
    }
    return xhr;
}
```
## 图像Ping
使用<img>标签，一个网页可以从任何一个网页中加载图片，不必考虑是否跨域。阅读前端博客中的许多图片都是跨域请求的。

图像Ping是与服务器进行简单、单向的跨域通信的一种方式，其实就是利用了image的src属性。我们平时动态创建图像的时候，image的src属性都是直接指向服务器的静态资源，但如果src不是指向静态资源呢？

```javascript
var img=new Image();
img.onload=function(){
    //do something...
}
img.onerror=function(){
    //do something...
}
img.src="http://www.feread.xyz/test?q=nick";
```
当为img设置完src属性后就开始请求了，可以看到这里的src带了一个参数。当请求完成时就可以执行onload事件处理函数了。通过图像Ping，浏览器是得不到任何具体数据的。但是通过侦听onload和onerror事件，我们能知道响应是在什么时候接收到的。

所以图像Ping跨域的方法也是有明显不足的：一是只能发送get请求，二是无法访问服务器响应文本。因此，图像Ping只能用于浏览器与服务器的单向通信。一般用于跟踪用户点击页面或者动态广告的曝光次数。

## JSONP
大名鼎鼎的JSONP（JSON with padding，参数式JSON或填充式JSON）是目前非常流行的一种跨域方法。

JSONP由两部分组成：回调函数和数据。举个例子，假如readit.sinaapp.com页面下有一段JS代码想要跨域访问www.feread.xyz域下的资源，利用JSONP的话应该会发送这样一段请求：
```javascript
http://www.feread.xyz/jsonp/?callback=handlefunc
```
handlefunc就是回调函数，而数据就是从www.feread.xyz服务器上返回的数据，并且会作为参数传给handlefunc函数，这也就是它为何叫参数式JSON的原因。另外callback=handlefunc类似于键值形式，这个要和服务器约定好，在有的地方也看到类似于
```javascript
http://www.feread.xyz/jsonp/?jsonp=handlefunc
```
这样的jsonp请求，不管键时callback还是jsonp，与服务器端统一就行，命名什么的并没有严格规定。

/*这是注释，你看不到*/

不过我还是不解为何叫JSONP？服务端返回的数据不一定是json格式的，可以是任意JavaScript代码，并且是由JS直译器直接执行，而非用json解析器解析。我想很多初学者认识JSONP时都会联想到和JSON的关系，如果硬要说的话，可能就是大家一般传的数据都是json格式的吧…

说完了原理，下面说说实现。原生JS使用JSONP是通过动态script元素来使用的。使用时可以为src属性指定一个跨域url（类似于img的url），因为JSONP是有效的JS代码，所以请求完成后就会立即执行。

```javascript
function handlefunc(response){
    console.log(response);
}
var script=document.createElement("script");
script.src="http://www.feread.xyz/jsonp/?callback=handlefunc";
document.body.insertBefore(script,document.body.firstChild);
```
上面这段代码动态的创建了script标签，也因为这样，JSONP 被称作是一种“让使用者利用 script 元素注入的方式绕开同源策略”的方法。如果不想这样，也可以直接用jQuery：

```javascript
$.ajax({
    url: 'http://www.feread.xyz/jsonp',
    dataType: "jsonp",
    jsonp: "callback",
    success: function (data) {
        console.log(data)
    }
})
```
JSONP是从其他域加载代码执行的，所以访问的那个域一定要值得你的信任，这样就不会有问题。推荐用jQuery提供的JSONP方法，因为这样不仅简单，还有错误处理。

## window.name
当一个页面中有多个框架（iframe或者frame）时，浏览器会为整个HTML文档创建一个window对象，还会为每个框架创建一个额外的window对象。而window.name就是每个框架的名字。window.name  值在不同的页面（甚至不同域名）加载后依旧存在，浏览器刷新后还存在，并且可以支持非常长的 name 值（2MB）。利用这一点可以实现基于window.name跨域的。

实现方法需要涉及到三个页面

1. 本服务器需要获取数据的页面，假设为www.a.com/app.html

2. 本服务器代理页面,假设为www.a.com/proxy.html

3. 需要访问的外域页面，假设为www.out.com/data.html

首先外域服务器要在data.html下面设置它的window.name的值，以便于我们访问：
```javascript
//data.html

<script type="text/javascript">
    window.name = 'this is data';// 这里是要传输的数据，大小一般为2M，IE和firefox下可以大至32M左右。数据格式可以自定义，如json、字符串
</script>
```
然后在我们的app.html页面下面创建一个iframe，让src指向外域的data.html页面。当页面加载完成后，我们还不能访问data.html下的window.name，因为name属性只有在同域下才能访问，所以我们需要将这个远程的iframe.src指向本域下的proxy.html，这样才能访问数据。

```javascript
<script type="text/javascript">
    var state = 0, 
    iframe = document.createElement('iframe'),
    loadfn = function() {
        if (state === 1) {
            var data = iframe.contentWindow.name;    // 读取数据
            alert(data);    //弹出获取的数据
        } else if (state === 0) {
            state = 1;
            iframe.contentWindow.location = "http://a.com/proxy.html";    // 设置的代理文件
        }  
    };
    iframe.src = 'http://www.out.com/data.html';
    if (iframe.attachEvent) {
        iframe.attachEvent('onload', loadfn);
    } else {
        iframe.onload  = loadfn;
    }
    document.body.appendChild(iframe);
</script>
```
当远程data.html页面加载完后会执行一次loadfn函数，state变为1，然后将iframe的地址指向本地代理文件proxy.html，当本地文件加载好之后又会执行一次loadfn，此时window.name仍然没有改变，并且iframe与app.html同域，name的值可以直接获取。

获取数据之后为了防止其他iframe访问，销毁iframe，这样也可以节省内存：
```javascript
当远程data.html页面加载完后会执行一次loadfn函数，state变为1，然后将iframe的地址指向本地代理文件proxy.html，当本地文件加载好之后又会执行一次loadfn，此时window.name仍然没有改变，并且iframe与app.html同域，name的值可以直接获取。

获取数据之后为了防止其他iframe访问，销毁iframe，这样也可以节省内存：
```
整个过程中，proxy.html啥也没干，就占了个坑。总结起来：iframe的src属性由外域转向本地域，跨域数据即由iframe的window.name从外域传递到本地域。这个就巧妙地绕过了浏览器的跨域访问限制，但同时它又是安全操作。

## window.postMessage
postMessage是html5引入的一个新的API，目前支持这个API的浏览器有：Firefox, IE8+, Opera, Safari, Chrome。postMessage允许页面中的多个iframe/window的通信，postMessage也可以实现ajax直接跨域，不通过服务器端代理。

详细内容参考这里就行了：https://developer.mozilla.org/en-US/docs/Web/API/Window.postMessage
```javascript
Access-Control-Allow-Origin: http://www.feread.xyz
```

## 总结
跨域方法很多，除了上面几种，还可以用服务器代理跨域（server proxy），利用flash跨域,基于FIM,利用document.domain（只能在相同主域不同二级域名下跨域）限于篇幅，不一一叙述。



## Fetch

## xdr



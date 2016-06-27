title: Web通信系列-深入JSONP
date: 2014-09-02
updated: 
tags:
category: blog
photos: http://7xp4vm.com1.z0.glb.clouddn.com/0__1280×1810_.png-q55
---

JSONP解为何叫JSONP？服务端返回的数据不一定是json格式的，可以是任意JavaScript代码，并且是由JS编译器直接执行，而非用json解析器解析。我想很多初学者认识JSONP时都会联想到和JSON的关系，如果硬要说的话，可能就是大家一般传的数据都是json格式的,除此之外跟JSON没有半毛钱关系.
<!-- more -->


## JSONP产生背景
在[Web通信系列-跨域]()一文中有对JSONP作简单介绍,我们用它来跨域获取数据.其实Web端整个通信技术无非就是解决客户端数据如何和服务端数据进行交互的问题,但是考虑到安全问题,又不得不添加其他规则,比如同源策略.

想象这样一个场景,淘宝页面下面有一段JS代码,想要发送http请求,调用京东服务器上的商品接口来查询信息,想想也知道这是不可能的,这是两家死对头,京东怎么可能把接口暴露给淘宝呢?这时候同源策略就起作用了,不同源的请求是禁止的!你发了我也不给你!

再想象这样一个场景,淘宝程序员小淘想在淘宝页面下面发送http请求,调用天猫服务器上的接口来处理数据,由于这两个网站都是一个公司的,是互利共生的,所以天猫当然很乐意把接口让淘宝使用了,然而天猫和淘宝并不在同一个域名下面啊,同源策略会限制这个请求的!

这个时候,JSONP出现了.

## JSONP原理

同源策略是为了Web的安全通信而制定的规则,但是如果跨域访问是安全的呢?就像淘宝和天猫一样,天猫知道来自淘宝的请求一定是安全的,不会干坏事的,那么这个时候同源策略反而成为了一块绊脚石.这个时候,聪明的工程师们就想到了一种巧妙的方法来跨域,绕过同源策略.

既然天猫服务器端确保淘宝的访问是安全的,那么他们的服务端程序员(假设叫小猫)肯定可以为了淘宝能顺利访问而做出贡献.程序员们发现在html标签中凡是有src属性的标签都能够跨域访问资源.你看img的src属性可以指向任何一个网站的图片地址,iframe的src属性也可以指向任何一个网页链接,script标签的src属性也可以加载任何一个网站的脚本.比如下面这段脚本加载了aliquanfeng.com域名服务器上得test.js文件.
```html
<script src="//aliquanfeng.com/js/test.js></script>
```
我们知道,通过script请求的脚本会在脚本加载完成后立即执行,假如test.js里面的内容是这样的:
```javascript
alert('hello world');
```
那么当test请求完毕后页面就会弹出一个"hello world"的对话框.程序员们仿佛看到了希望,这样不就能跨域访问数据了么!!!
于是他们立马动手写了一个,大体思路是这样的:
小淘想利用script标签的src属性来跨域调用天猫服务端的接口:
```html
<!--来自淘宝前端网页-->
<script src="//tmall.com/js/fortaobao.js></script>
```
而fortaobao.js的内容则是小淘想要获取的数据:
```javascript
{username:"动感小前端",isLogin:true}  // 来自天猫服务端
```
小淘这样虽然访问到了数据,但是并没有什么卵用,要怎么处理呢?小猫灵机一动,要不这样,我直接返回:
```javascript
taobaoCallback({username:"动感小前端",isLogin:true})  // 来自天猫服务端
```
小猫把数据用一个名为taobaoCallback的函数包裹起来,然后小淘再到前端写一个同名的函数对数据进行处理:
```javascript
function taobaoCallback(data){
  if(data.isLogin){
    alert("亲爱的"+data.username+",您已登录!");
  }
}
```
这样小猫和小淘就实现了跨域访问!
然而,这样写代码可扩展性很差耶,如果有很多个跨域请求那我不是要写很多函数么?于是他们又想到一个办法,通过url参数来动态设置回调函数名称.
小猫写了一个接口,规定小淘访问这个接口时要传一个名为callback的参数,参数的值就是数据外面要包裹的函数名,比如下面这个请求:
```
//www.tmall.com/api/fortaobao?callback=xxxxx
```
那么小猫会获取callback参数的值,返回以下数据:
```
xxxxx({username:"动感小前端",isLogin:true})
```
小淘则只需要动态创建一个script标签.将请求地址放在script的src属性中,并创建一个名为xxxxx的处理函数即可:
```javascript
function taobaoCallback(data){
  if(data.isLogin){
    alert("亲爱的"+data.username+",您已登录!");
  }
}
var url = "//www.tmall.com/api/fortaobao";
var script = document.createElement('script');
script.setAttribute('src', url+"?callback=taobaoCallback");
document.getElementsByTagName('head')[0].appendChild(script); 
```
这样,当脚本加载完毕后就会执行taobaoCallback回调函数了.这就是JSONP的原理了,很简单吧!

## JSONP封装
上面只是为了说明原理而举的一个示例,通过参数来指定回调函数名,这样服务端就可以不用动态改了,但是回调函数名却是前端写死的全局函数,这样肯定不行的,如果有很多JSONP请求,那不是要写很多全局函数了??

我们在使用jQuery或者zepto.js的时候,它们都对JSONP做了封装,可以很方便的使用,JSONP的原理我们都清楚了,下面就参照一下zepto.js的源码,来看一下如何将JSONP封装成通用的借口.构造出更加强大的JSONP请求.

[zepto.js](http://zeptojs.com/)是一个轻量级的JS库,其源码可以在[Github](https://github.com/madrobby/zepto)上找到.使用[JSONP](http://zeptojs.com/#$.ajax)可以通过$.ajax或者$.ajaxJSONP方法来调用,先看一下$.ajaxJSONP直接调用的方式:






## 参考链接

<http://json-p.org/>





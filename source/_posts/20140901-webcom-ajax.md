title: Web通信系列-深入JSONP
date: 2014-09-02
updated:
tags:
category: blog
photos: http://7xp4vm.com1.z0.glb.clouddn.com/0__1280×1810_.png-q55
---

JSONP解为何叫JSONP？服务端返回的数据不一定是json格式的，可以是任意JavaScript代码，并且是由JS编译器直接执行，而非用json解析器解析。我想很多初学者认识JSONP时都会联想到和JSON的关系，如果硬要说的话，可能就是大家一般传的数据都是json格式的,除此之外跟JSON没有半毛钱关系.
<!-- more -->
# Web通信之一：Ajax
Ajax全称Asynchronous JavaScript +XML，虽然加了个XML，可是Ajax的数据格式并不仅仅只有XML啊…..只能把它归结为历史问题了。
## 使用Ajax
Ajax的核心是XMLHttpRequest对象，考虑到兼容性，下面是我们创建XHR对象的一般方法：
```javascript
function createXHR(){  
	var xmlHttpRequest;
        if(window.ActiveXObject){  
            try{  
                xmlHttpRequest = new ActiveXObject("Microsoft.XMLHTTP");  
            }catch(e){  
                xmlHttpRequest = new ActiveXObject("Msxml2.XMLHTTP");  
            }   
        }else if(window.XMLHttpRequest){  
            xmlHttpRequest = new XMLHttpRequest();  
        }
    return xmlHttpRequest;  
}
```
使用时第一个要调用的方法就是open：
```javascript
var xhr=createXHR();
xhr.open("GET","http://localhost:8080/test/ajax",true);
```
open方法的第一个参数是请求类型（GET/POST），第二个参数是请求url（url必须与请求页在同一个域中），第三个是async（true/false），这里打开的是一个异步的请求。

下面我们通过send方法发送这个请求：
```javascript
xhr.send(null);
```
send用来传数据，但如果是get请求，send的参数必须为空或者null。

当服务器响应并且客户端收到数据后，响应数据就会自动填充XHR对象的属性，相关属性如下：

responseText：作为响应主体被返回的文本。

responseXML：如果响应内容类型为”text/xml”或”application/xml”，这个属性将保存包含着响应数据的XML DOM文档。对于非XML数据而言，该属性为null。

status：响应的HTTP状态。

statusText：HTTP状态的说明。

当我们收到响应后，第一部自然是检查status，看响应是否成功。
```javascript
function checkStatus(xhr){
	if((xhr.status >=200 && xhr.status <=300) || xhr.status ==304){
		return true;
	}
	else{
		return false;
	}
}
```
但是我们发送的是异步请求，如何知道响应是否收到呢？此时，可以检测XHR对象的readyState属性，该属性表示请求/响应过程的当前阶段，可取值如下：

0：未初始化。尚未调用open()

1.启动。已调用open()但未调用send()

2.发送。已调用send()但未收到响应

3.接收。已接收到部分响应

4.完成。已接收到全部响应，并且可以在客户端使用

只要readyState值改变，都会触发readystatechange事件。通常我们只对完成响应阶段感兴趣，所以可以把你的响应代码写在readyState为4后面：
```javascript
xhr.onreadystatechange=function(){
    if(xhr.readyState==4 && checkStatus(xhr)){
    $("#text").text(xhr.responseText);
    }
}
```
为了保证兼容性，必须在调用open()方法之前指定onreadystatechange事件处理程序。
## 更加强大—XMLHttpRequest 2级
2级XHR增加了一些新内容，但并非所有浏览器都实现了它。哎，要是所有的浏览器都叫W3c，前端开发也就不用太多顾虑了= =
### FormData
Web应用中频繁使用的一项功能就是表单数据的序列化，XHR 2级为此定义了FormData类型。还记得send()方法么？你可以将FormData对象作为send的参数直接post给服务器，使用FormData不必明确在XHR对象上设置请求头部，多方便~
### 超时设定
timeout属性，如果在一定时间内未收到响应就终止请求，并调用ontimeout事件处理函数：
```javascript
xhr.timeout=1000;//超时设置为1s
xhr.ontimeout=function(){
   //超时处理...
}
```
### 重写MIME类型
overrideMimeType方法用于重写XHR响应的MIME类型。为什么要重写？

举个例子，服务器返回的MIME类型是text/plain，但数据总实际包含的是XML，根据服务端返回的数据类型，XHR会设定responseXML属性为null。如果客户端重写MIME类型，就可以把响应当做XML来处理。

注意：必须在send()之前调用overrideMimeType方法。




## 异步的背后
js是单线程执行的，那么ajax是否是真的异步？

严格的来说，应该是异步请求，单步执行。

首先，浏览器为一个窗口只开一个js线程。这个窗口的所有事件都在该js 单线程事件队列中等待执行。而ajax请求是由浏览器发出的，浏览器是多线程的。它为ajax新开了一个线程，如果设置了回调，那么响应返回后就会将事件回调函数放在js单线程事件队列中等待执行。





## 参考链接

<http://json-p.org/>
<http://www.ibm.com/developerworks/cn/xml/wa-ajaxintro1.html>

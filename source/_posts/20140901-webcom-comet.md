title: Web通信系列-深入JSONP
date: 2014-09-02
updated:
tags:
category: blog
photos: http://7xp4vm.com1.z0.glb.clouddn.com/0__1280×1810_.png-q55
---

JSONP解为何叫JSONP？服务端返回的数据不一定是json格式的，可以是任意JavaScript代码，并且是由JS编译器直接执行，而非用json解析器解析。我想很多初学者认识JSONP时都会联想到和JSON的关系，如果硬要说的话，可能就是大家一般传的数据都是json格式的,除此之外跟JSON没有半毛钱关系.
<!-- more -->

# Web通信之六：Comet总结
Comet是一种用于web的推送技术，能使服务器实时地将更新的信息传送到客户端，而无须客户端发出请求，目前有三种实现方式，长轮询，iframe，HTTP流。Comet是Alex Russell提出的，本质上是一种更高级的Ajax应用，前面已经对Ajax，短轮询，长轮询进行讲解了，还有SSE（不过是实现Comet的一种接口而已）。本文则是对上面的总结。

一般的HTTP请求有如下三个过程：

1. A client requests a webpage from a server.
2. The server calculates the response
3. The server sends the response to the client.

<img src="http://i.stack.imgur.com/TK1ZG.png"/>

Ajax 轮询（AJAX Polling）过程：

1. A client requests a webpage from a server using regular http (see http above).
2. The requested webpage executes javascript which requests a file from the server at regular intervals (e.g. 0.5 seconds).
3. The server calculates each response and sends it back, just like normal http traffic.

http://i.stack.imgur.com/qlMEU.png

Ajax长轮询（Ajax Long-polling）：

1. A client requests a webpage from a server using regular http (see http above).
2. The requested webpage executes javascript which requests a file from the server.
3. The server does not immediately respond with the requested information but waits until there’s newinformation available.
4. When there’s new information available, the server responds with the new information.
5. The client receives the new information and immediately sends another request to the server, re-starting the process.

http://i.stack.imgur.com/zLnOU.png

HTML5 SSE服务器推送事件：

1. A client requests a webpage from a server using regular http (see http above).
2. The requested webpage executes javascript which opens a connection to the server.
3. The server sends an event to the client when there’s new information available.

Real-time traffic from server to client, mostly that’s what you’ll need You’ll want to use a server that has an event loop Not possible to connect with a server from another domain
If you want to read more, I found these very useful: (article), (article), (article), (tutorial).

<img src="http://i.stack.imgur.com/ziR5h.png" />

HTML5 Web Sockets：

1. A client requests a webpage from a server using regular http (see http above).
2. The requested webpage executes javascript which opens a connection with the server.
3. The server and the client can now send each other messages when new data (on either side) is available.
Real-time traffic from the server to the client and from the client to the server
You’ll want to use a server that has an event loop
With WebSockets it is possible to connect with a server from another domain.
It is also possible to use a third party hosted websocket server, for example Pusher or others. This way you’ll only have to implement the client side, which is very easy!
If you want to read more, I found these very useful: (article), (article) (tutorial).

http://i.stack.imgur.com/CgDlc.png

在未来，Web Sockets将会取代Comet成为服务器推送的方法，chrome、Firefox、Opera、Safari等主流版本均支持Web Sockets，Internet Explorer从10开始支持。

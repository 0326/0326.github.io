title: CSS 简明教程
date: 2013-11-04
updated:
tags:
category: blog
photos: https://gtms02.alicdn.com/tps/i2/TB1HQHCHXXXXXcoaXXXf5Y.HXXX-990-521.png
---

别紧张,CSS其实很简单.本文将带你踏进CSS的世界,快速掌握CSS基本知识.本文虽然是面向小白,但在此之前,你应该听说过CSS并且了解过基本术语.
<!-- more -->

## 1. CSS 选择器
选择器是CSS的核心,虽然这东西很简单，但是这是最基础的。能把最基础的东西运用自如，就已经是高手了。

选择器的种类可以分为三种：标签名选择器、类选择器和ID选择器。而网友们所谓的后代选择器和群组选择器只不过是对前三种选择器的扩展应用。而在标签内写入style=””的方式，应该是CSS的一种引入方式，而不是选择器，因为根本就没有用到选择器。而一般人们将上面这几种方式结合在一起，所以就有了5种或6种选择器了。

### 1.1 标签选择器
直接用HTML标签，又叫类型选择器，元素选择器，简单选择器。

### 1.2 类选择器
之所以把这一条单独列出来完全是为了排版好看。

### 1.3 ID选择器
不解释.

### 1.4 扩展用法
好吧，这里才是重点，融合以上三种选择器，可以召唤更强大的选择器：

#### 1.4.1 通用选择器
用法：
```CSS
* {property：value}
```
#### 1.4.2 伪类和伪元素
伪类用法：
```CSS
selector : pseudo-class {property: value}
```
伪元素用法：
```CSS
selector:pseudo-element{property:value}
```
更多用法:
<img src="http://img.blog.csdn.net/20131104103808390?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvbGlxdWFuZmVuZzMyNg==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center"/>

#### 1.4.3 后代选择器
选择元素的所有后代:
```CSS
selector1 selector2{…}
```
对于后代选择器，浏览器CSS匹配不是从左到右进行查找，而是从右到左进行查找。比如DIV#divBox p span.red{color:red;}，浏览器的查找顺序如下：先查找html中所有class=’red’的span元素，找到后，再查找其父辈元素中是否有p元素，再判断p的父元素中是否有id为divBox的div元素，如果都存在则匹配上。这样做的好处是尽早过滤掉一些无关的样式规则和元素。

#### 1.4.4 子选择器
选择元素的直接后代：selector1 >selector2{…},IE6不支持支持子选择器。但我们可以模拟子选择器的效果。比如要实现以下效果：
```CSS
#nav > li{backgroud:#abc;padding:10px;}
```
可以先用后代选择器选择所有后代：
```CSS
#nav li{backgroud:#abc;padding:10px;}
```
然后用通用选择器覆盖：
```CSS
#nav li *{backgroud:none;padding:0;}
```
举这个例子其实是想说明CSS很灵活,并不是为了兼容IE6,文章原来还有些兼容IE6/7的Demo,后来都被我删掉了.IE6/7已经被人类抛弃了.

#### 1.4.5 相邻兄弟选择器
如果需要选择紧接在另一个元素后的元素，而且二者有相同的父元素，可以使用相邻兄弟选择器。
```html
<div>
<h1>This is a heading.</h1>
<p>This is paragraph.</p>
</div>
```
比如上面的h1和p有相同的父元素而且相邻，就可以用 **h1+p{color:red;}**.

#### 1.4.6 群组选择器
说它是选择器，不如说是选择器的一种用法：**selector1，selector2，…{property: value}**.

#### 1.4.7 属性选择器
属性选择器根据某个属性是否存在或属性的值来寻找元素，非常强大。
```CSS
input[type="text"]
{
  margin-bottom:10px;
}

input[type="button"]
{
  width:120px;
}
```
更多用法：
<img src="http://img.blog.csdn.net/20131104110052390"/>

## 2 选择器优先级
前面说到了那么多选择器,如果他们都作用于同一个元素,那谁会生效呢?这就要说到选择器的优先级了.

同一个元素可能会有多个样式，这些样式很可能会冲突，css通过层叠的过程来处理这种冲突，简单的说就是给每个规则分配一个重要度。

### 2.1 层叠
层叠重要度从高到低排列顺序：

1.标有！important的用户样式；

2.标有！important的作者样式；

3.作者样式；

4.用户样式；

5.浏览器/用户代理默认样式；

### 2.1 优先级的计算
一般而言，选择器越特殊，它的优先级越高。也就是选择器指向的越准确，它的优先级就越高。通常我们用1表示标签名选择器的优先级，用10表示类选择器的优先级，用100标示ID选择器的优先级。直接在网页中用sytle=”….”的优先级最高，为1000，但是不推荐这样用，你懂的。举个例子：
```
div.test1 .span p{...} 优先级= 1+10 +10 +1
span#xxx .songs li {...}优先级=1+100 + 10 + 1
#xxx li {...}优先级= 100 +1
```
### 2.3 继承
继承就是应用样式的元素后代会继承样式的某些属性。这句话很容易理解，但是”某些属性”有些坑啊，你特么到底是哪些属性啊？

首先要明确一点：直接应用于元素的任何样式都会覆盖继承而来的属性。比如你对body设置了font-size：10px;的属性，但是h1，h2都不听你的，因为浏览器默认给h1，h2设置了字体大小，覆盖了继承而来的样式。

然后网页中用到的继承大多都是文本方面的继承，比如font-size，font-color之类的。边框类的属性是不能继承的，比如border，margin，padding什么的，这个要是能继承网页就完蛋了。

有些浏览器在继承方面还有些问题，比如说高贵冷艳的IE，在继承表格字号方面会有些问题。总的来说，在写代码的时候除了文本继承外，其他的都不要指望用继承了，直接用选择器会更好些。

## 3 盒模型
盒模型，定位，浮动,可以说是css最重要的3个概念。

### 3.1 盒模型概述
页面上的每个元素都被看成一个矩形框。这个框由元素的内容、内边距、边框和外边距组成。

内边距、边框和外边距都是可选的默认为0。但是许多元素由用户代理样式表设置外边距和内边距。所以不见的一定是0。

在css中，width和height是指内容区域的宽度和高度，对边距没有影响。所以增加width/height/内容/边框/内外边距中的任何一个都会使盒子变大。值得高兴的是，IE6在混杂模式的使用的是非标准的盒模型。他的width不是内容的宽度，而是内容+内边距+边框的总宽度。

#### 3.1.1 外边距叠加
外边距叠加条件：只有普通文档流中块框的垂直外边距才会发生叠加。行内框，浮动框，绝对定位框的外边距都不会叠加。外边距叠加有3类：

当两个或更多垂直外边距相遇时，大的外边距会包含小的外边距。这个外边距的总和等于两个叠加者中外边距较大者；
<img src="http://img.blog.csdn.net/20131104123658671"/>

当一个元素包含在另外一个元素中时，他们的顶外边距也会叠加；
<img src="http://img.blog.csdn.net/20131104125414718"/>

如果给一个空元素设置外边距，那么顶外边距和底外边距就会叠加：
<img src="http://img.blog.csdn.net/20131104125825812"/>

### 3.2 可视化格式模型
CSS 有三种基本的定位机制：普通流、浮动和绝对定位。

除非专门指定，否则所有框都在普通流中定位。也就是说，普通流中的元素的位置由元素在 (X)HTML 中的位置决定。

块级框从上到下一个接一个地排列，框之间的垂直距离是由框的垂直外边距计算出来。

行内框在一行中水平布置。可以使用水平内边距、边框和外边距调整它们的间距。但是，垂直内边距、边框和外边距不影响行内框的高度。由一行形成的水平框称为行框，行框的高度总是足以容纳它包含的所有行内框。不过，设置行高可以增加这个框的高度。因此，修改行内框尺寸的唯一方法是修改行高或者水平边距。

顺便说一下display属性:
<img src="http://img.blog.csdn.net/20131104131308203?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvbGlxdWFuZmVuZzMyNg==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center"/>
display：none将元素隐藏起来,visible:hidden也是隐藏元素，但二者有区别：前者不占用空间，而后者虽然看不见，但还是占着地方！

display:inline-block将对象呈递为内联对象，但是对象的内容作为块对象呈递。旁边的内联对象会被呈递在同一行内，允许空格。

### 3.3 定位
CSS中一共有3中定位方式(严格的说不止三种,在CSS3中又新增了其他定位方式,比如sticky),先说一下position属性:
<img src="http://img.blog.csdn.net/20131104131957078?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvbGlxdWFuZmVuZzMyNg==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center"/>
绝对定位（absolute）：要注意的是绝对定位元素的位置与文档流无关，因此不占据空间！就好比普通流中的元素看不见他，但是我们看的见！

固定定位（fixed）：绝对定位的一种，区别上面说了（fixed相对浏览器窗口定位，absolute相对第一个非static父元素定位）。不过高兴的是，IE6不支持固定定位，IE7部分支持，但有许多bug。

相对定位：相对于普通流中正常位置位移，但是元素仍然占据原来的空间，所以移动元素可能会覆盖其他框。

### 3.4 浮动
浮动的框可以左右移动，直到它的外边缘碰到包含框或另外一个浮动框边缘。浮动不在文档的普通流中。

有浮动就可能会要clear清浮，以下是clear属性:
<img src="http://img.blog.csdn.net/20131104144622703?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvbGlxdWFuZmVuZzMyNg==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center" />
清浮常用伪类的方法：
```CSS
.clearfix:after {
   content: ".";
   visibility: hidden;
   display: block;
   height: 0;
   clear: both;
}
```
还可以用overflow：hidden属性。因为overflow会迫使父元素贴紧其内对象的内容，从而达到清浮的作用，但也可能触发滑动条或者隐藏内容。
详细介绍可以参考这里:<http://www.w3school.com.cn/css/css_positioning_floating.asp>
有了上面的基础,我们就可以用CSS来实践一番了.

## 4 CSS 布局
css布局被认为是一个很麻烦的东西，可能它本身并不复杂，只是浏览器的不一致让人觉得很头疼。对于初学者来说或许框架能更快的得到想要的结果，但这种傻逼的使用方式蒙蔽了布局的内部原理，这是非常可怕的！

所有css布局技术的根本都是3个基本概念：定位、浮动和外边距操控（喵了个咪的，怎么又是3个）。下面开始实战啦。

### 4.1 浮动布局
貌似浮动布局是最简单也是最可靠的，先来一个简单的两栏布局，页面居中：
<img src="http://img.blog.csdn.net/20131104181729812" />
```html
<html>
<body>
<div class="wrapper">
	<div class="header">head</div>
	<div class="container">
		<div class="leftbar">
			<p>left</p>
			<p>left</p>
		</div>
		<div class="content">
			<p>content</p>
			<p>content</p>
			<p>content</p>
			<p>content</p>
			<p>content</p>
			<p>content</p>
		</div>
	</div>
	<div class="clear"></div>
	<div class="footer">footer</div>
</div>
<style type="text/css">
/*让容器水平居中,但IE6不支持margin：auto属性，解决方法是利用text-align:center*/
body{
	text-align: center;/*IE6君认为该属性让所有的东西都居中*/
}
.wrapper{
	width: 960px;
	margin: 0 auto;
	text-align: left;/*调整text-align为左对齐*/
}
.header,.footer{
	height: 60px;
	background-color: #9a2;
}
.leftbar{
	width: 200px;
	float: left;
	background-color: #00f;
}
.content{
	width: 740px;/*空出20px作为隔离带*/
	float: right;
	background-color: #0e8;
}
.clear{clear:both;}
</style>
</body>
</html>
```
然后再来个三栏布局，只要稍微改一下代码：
```html
<html>
<body>
<div class="wrapper">
	<div class="header">head</div>
	<div class="container">
		<div class="leftbar">
			<p>left</p>
			<p>left</p>
		</div>
		<div class="content">
			<div class="main-content">
				<p>content</p>
				<p>content</p>
				<p>content</p>
				<p>content</p>
				<p>content</p>
				<p>content</p>
			</div>
			<div class="rightbar">
				<p>right</p>
				<p>right</p>
			</div>
		</div>
	</div>
	<div class="clear"></div>
	<div class="footer">footer</div>
</div>
<style type="text/css">
/*让容器水平居中,但IE6不支持margin：auto属性，解决方法是利用text-align:center*/
body{
	text-align: center;/*IE6君认为该属性让所有的东西都居中*/
}
.wrapper{
	width: 960px;
	margin: 0 auto;
	text-align: left;/*调整text-align为左对齐*/
}
.header,.footer{
	height: 60px;
	background-color: #9a2;
}
.leftbar{
	width: 200px;
	float: left;
	background-color: #00f;
}
.content{
	width: 740px;/*空出20px作为隔离带*/
	float: right;
	background-color: #0e8;
}
.clear{clear:both;}
/*在content内部再分浮动，形成3栏布局*/
.main-content{
	width: 600px;
	float: left;
	background-color: #7621de;
}
.rightbar{
	width: 120px;
	float: right;
	background-color: #b23aa2;
}
</style>
</body>
</html>
```
效果图：
<img src="http://img.blog.csdn.net/20131104225456109?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvbGlxdWFuZmVuZzMyNg==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center"/>
浮动布局的方法有很多，用起来也特别方便。虽然效果图是挫了点，但不要在意这些细节，这不是重点。。。

### 4.2 固定宽度、流式和弹性布局
#### 4.2.1 固定宽度布局
固定宽度布局就是以像素为单位的布局，上面的两个例子都是固定宽度布局。这种布局的好处是知道每个元素的精确宽度，非常方便。坏处就是在不同分辨率的显示器下会出现显示溢出或者大量空白。随着屏幕尺寸的多样化，外加移动web的需求，固定宽度布局常常被认为是糟糕的权益之计。

### 4.2.2 流式布局
流式布局的灵活性更大，因为它采用的是百分数布局。这样随着不同窗口大小可以进行伸缩。一般还会添加以像素或em为单位的min-width来防止布局变得太窄。（有关min-width和min-height与浏览器兼容性问题，请戳这里：点击打开链接）。

在这里再总结一下px和em的关系。px是按像素计算的绝对单位。em是相对长度单位。相对于当前对象内文本的字体尺寸。如当前对行内文本的字体尺寸未被人为设置，则相对于浏览器的默认字体尺寸(任意浏览器的默认字体高都是16px。所有未经调整的浏览器都符合: 1em=16px)。

那么12px=0.75em,10px=0.625em。为了简化font-size的换算，需要在css中的body选择器中声明 Font-size=62.5%，这就使em值变为 16px*62.5%=10px, 这样12px=1.2em, 10px=1em, 也就是说只需要将你的原来的px数值除以10，然后换上em作为单位就行了。

em有如下特点：

em的值并不是固定的;
em会继承父级元素的字体大小。
所以我们在写CSS的时候，需要注意几点：

body选择器中声明Font-size=62.5%;
将你的原来的px数值除以10，然后换上em作为单位;
重新计算那些被放大的字体的em数值。避免字体大小的重复声明。
也就是避免1.2 * 1.2= 1.44的现象。比如说你在#content中声明了字体大小为1.2em，那么在声明p的字体大小时就只能是1em，而不是1.2em, 因为此em非彼em，它因继承#content的字体高而变为了1em=12px。

但是12px汉字例外，就是由以上方法得到的12px(1.2em)大小的汉字在IE中并不等于直接用12px定义的字体大小，而是稍大一点。这个问 题 Jorux已经解决，只需在body选择器中把62.5%换成63%就能正常显示了。原因可能是IE处理汉字时，对于浮点的取值精确度有限。

#### 4.2.3 弹性布局
虽然流式布局比固定布局好，但是当分辨率过大时行会过长，窗口太窄时行会很短。对于这个问题，弹性布局可能是一种解决方案。

弹性布局相对于字号来设置元素的宽度，而不是浏览器宽度。以em为单位设置宽度，可以确保在字号增加时整个布局随之扩大。
```html
<html>
<body>
<div class="wrapper">
	<div class="header">head</div>
	<div class="container">
		<div class="leftbar">
			<p>left</p>
			<p>left</p>
		</div>
		<div class="content">
			<div class="main-content">
				<p>content</p>
				<p>content</p>
				<p>content</p>
				<p>content</p>
				<p>content</p>
				<p>content</p>
			</div>
			<div class="rightbar">
				<p>right</p>
				<p>a a a a</p>
			</div>
		</div>
	</div>
	<div class="clear"></div>
	<div class="footer">footer</div>
</div>
<style type="text/css">
/*让容器水平居中,但IE6不支持margin：auto属性，解决方法是利用text-align:center*/
body{
	text-align: center;/*IE6君认为该属性让所有的东西都居中*/
}
.wrapper{
	font-size: 62.5%;/*调整字号为默认16px的62.5%，使10px=1em，方便计算*/
	max-width: 95%;
	width: 96em;
	margin: 0 auto;
	text-align: left;/*调整text-align为左对齐*/
}
.header,.footer{
	height: 6em;
	background-color: #9a2;
}
.leftbar{
	width: 20%;
	float: left;
	background-color: #00f;
}
.content{
	width: 78%;
	float: right;
	background-color: #0e8;
}
.clear{clear:both;}
/*在content内部再分浮动，形成3栏布局*/
.main-content{
	width: 80%;
	float: left;
	background-color: #7621de;
}
.rightbar{
	width: 18%;
	float: right;
	background-color: #b23aa2;
}
</style>
</body>
</html>
```
上面只是以em为容器单位，但内部div使用的仍然是百分比。这样内部宽度仍然是相对字号的，可以很方便的修改布局的总尺寸，不必修改每个宽度的尺寸。


## 5 CSS 背景图
### 5.1 背景图像
先说一下background的用法。
<img src="http://img.blog.csdn.net/20131105093925468?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvbGlxdWFuZmVuZzMyNg==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center"/>
通常使用简写形式：background：背景色 背景图 重复方式 定位方式  图像位置，比如background: #00FF00 url(bgimage.gif) no-repeat fixed top;

background-position有center属性，可以让背景居中。

如果使用像素对背景定位，如background-position：20px 20px；位置是从父元素左上角到图像左上角算的。如果使用百分比，如background-position：20% 20%；

位置则是从图片上距左上角x,y距离20%的点到父元素左上角来算的。
<img src="http://img.blog.csdn.net/20140803151556734"/>

### 5.2 圆角图像
以前的做法是用圆角图像填充图像的四个角，这样为了一个圆角效果会加很多无意义的东西。用css3的话可以一次添加多个图像：
```CSS
{
	background-image: url(top-left.gif),
	                  url(top-right.gif),
	                  url(bottom-left.gif),
	                  url(bottom-right.gif);
	background-repeat: no-repeat,
		           no-repeat,
			   no-repeat,
			   no-repeat;
	background-position: top left,
	       		     top right,
	       		     bottom left,
			     bottom right;

}
```
还可以用border-radius:
```CSS
{
	border-radius: 5%;
	-webkit-border-radius: 5%;
	-moz-border-radius: 5%;
}
```
最后要说的是border-image属性，利用强大的九分缩放法。就是把一张背景图通过百分比划分成九个部分，这样在图片缩放的时候这九个部分就作为单独的块来缩放。
<img src="http://img.blog.csdn.net/20140803153258312?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvbGlxdWFuZmVuZzMyNg==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center"/>
我要说的是这个功能真的很酷炫，具体的说明参考<http://www.w3school.com.cn/cssref/pr_border-image.asp>

### 5.3 投影
用法参考:
<http://www.w3school.com.cn/cssref/pr_box-shadow.asp>

<http://www.w3cplus.com/content/css3-box-shadow>

### 5.4 不透明度
老方法:
```CSS
{
	opacity: 0.5;
	filter:alpha(opacity=50);
}
```
简写的方法：
```CSS
{
    background-color:rgba(255,0,0,0.5);
}
```
### 5.5 CSS Sprite
将许多图片合成在一张大图里，然后偏移量来获取想要的小图片，这就是css的Sprite精灵。可以减少图片的请求量，减少服务器压力。Sprite主要是通过background-position和height，width来实现。一张图就能理解：
<img src="http://img.blog.csdn.net/20140803160423086?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvbGlxdWFuZmVuZzMyNg==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center" />






















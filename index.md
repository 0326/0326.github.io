---
layout: template_base
---

<div id="loading"><p class="bunce1"></p><p class="bunce2"></p><p class="bunce3"></p></div>
<div class="main animated  lightSpeedIn">
	<img id="main-bg" src="/static/images/bg.png">
	<div class="nav-box" id="about">
		<a  class="none-href" href="/about">
		<div class="nav-content">
			<h2 class="nav-title">企业文化</h2>
		</div>
		</a>
	</div>	
	<div class="nav-box" id="product">
		<a  class="none-href" href="/product">
		<div class="nav-content">
			<h2 class="nav-title"><a  class="none-href" href="http://www.shike.im">产品&服务</a></h2>
		</div>
		</a>
	</div>
	<div class="nav-box" id="join">
		<a  class="none-href" href="join">
		<div class="nav-content">
		<h2 class="nav-title">加入我们</h2>
		</div>
		</a>
	</div>
	<div class="nav-box" id="contact">
		<a  class="none-href" href="/cooperation#">
		<div class="nav-content">
			<img class="nav-title" src="/static/images/sitelogo.png">
		</div>
		</a>
	</div>
	<div class="nav-box" id="cooperation">
		<a  class="none-href" href="/cooperation">
		<div class="nav-content">
			<h2 class="nav-title">合作伙伴</h2>
		</div>
		</a>
	</div>	
	<div class="nav-box" id="news">
		<div class="nav-content">
		<ul class="img-gallary">
			<li><a><img src="/static/images/gallary/1.jpg" class="img-news" id="img-new0"></a></li>
			<li><a><img src="/static/images/gallary/2.jpg" class="img-news" id="img-new1"></a></li>
			<li><a><img src="/static/images/gallary/3.jpg" class="img-news" id="img-new2"></a></li>
		</ul>
		</div>
		<p class="icon45 ico-next"></p>
		<p class="icon45 ico-prev"></p>
	</div>
</div>
<script type="text/javascript">
$(".main").css({'display':'none'});
$(window).load(function(){
    $("#loading").fadeOut("normal",function(){
        $(".main").fadeIn();
    });
});
</script>
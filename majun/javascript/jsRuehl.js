$(function(){
 $(document).ready(function(){
  $("#mainTitle") .animate({ opacity:1}, 800 ,function(){
	$("#mainTitleContents").animate({opacity:1}, 800)});
  $("#mainTitle").animate({borderLeftWidth:"10px"}, 500);
 });
});

$(function(){
 $(document).ready(function(){
  $("#subSection").animate({ opacity:0}, 800 )
             .animate({ opacity:1,marginTop:30}, 500);
  $(".mainSection").animate({opacity:0},800)
	     .animate({ opacity:1},500);
});
});

$(function(){
 $(".mainSection").hide();
 $("#mainSectionHai").show();
 $("#hrefHora").click(function(){
   $("li").animate({"borderLeftWidth":"0px"},400);
   $(".mainSection").fadeOut();
   $("#hrefHora").animate({"borderLeftWidth":"10px"},400);
 setTimeout(function(){
   $("#mainSectionHora").fadeIn();
 },300);

 });
 $("#hrefHai").click(function(){
   $("li").animate({"borderLeftWidth":"0px"},400);
   $(".mainSection").fadeOut();
   $("#hrefHai").animate({"borderLeftWidth":"10px"},400);
 setTimeout(function(){
   $("#mainSectionHai").fadeIn();
 },300);
 });

 $("#hrefWait").click(function(){
   $("li").animate({"borderLeftWidth":"0px"},400);
   $(".mainSection").fadeOut();
   $("#hrefWait").animate({"borderLeftWidth":"10px"},400);
 setTimeout(function(){
   $("#mainSectionWait").fadeIn();
 },300);
 });

 $("#hrefHand").click(function(){
   $("li").animate({"borderLeftWidth":"0px"},400);
   $(".mainSection").fadeOut();
   $("#hrefHand").animate({"borderLeftWidth":"10px"},400);
 setTimeout(function(){
   $("#mainSectionHand").fadeIn();
 },300);
 });

 $("#hrefLeech").click(function(){
   $("li").animate({"borderLeftWidth":"0px"},400);
   $(".mainSection").fadeOut();
   $("#hrefLeech").animate({"borderLeftWidth":"10px"},400);
 setTimeout(function(){
   $("#mainSectionLeech").fadeIn();
 },300);
 });
$("#hrefFlow").click(function(){
   $("li").animate({"borderLeftWidth":"0px"},400);
   $(".mainSection").fadeOut();
   $("#hrefFlow").animate({"borderLeftWidth":"10px"},400);
 setTimeout(function(){
   $("#mainSectionFlow").fadeIn();
 },300);
 });

 $("#hrefJihai").click(function(){
   $("li").animate({"borderLeftWidth":"0px"},400);
   $(".mainSection").fadeOut();
   $("#hrefJihai").animate({"borderLeftWidth":"10px"},400);
 setTimeout(function(){
   $("#mainSectionJihai").fadeIn();
 },300);
 });
 $("#hrefNaki").click(function(){
   $("li").animate({"borderLeftWidth":"0px"},400);
   $(".mainSection").fadeOut();
   $("#hrefNaki").animate({"borderLeftWidth":"10px"},400);
 setTimeout(function(){
   $("#mainSectionNaki").fadeIn();
 },300);
 });
 $("#hrefPoint").click(function(){
   $("li").animate({"borderLeftWidth":"0px"},400);
   $(".mainSection").fadeOut();
   $("#hrefPoint").animate({"borderLeftWidth":"10px"},400);
 setTimeout(function(){
   $("#mainSectionPoint").fadeIn();
 },300);
 });
});

var isHidden = true;
$(function(){
 $("#toPageTop a").hide();
 $(window).scroll(function(){
  if($(this).scrollTop() > 300){
    if(isHidden){
	$("#toPageTop a").stop(true,true).fadeIn();
	isHidden = false;
    }
  }else{
    if(!isHidden){
	$("#toPageTop a").stop(true.true).fadeOut();
	isHidden = true;
    }
  }
 });
});

$(function(){
 $("#toPageTop a").click(function(){
	$("html,body").animate({
		"scrollTop":0
	},900,"easeInOutExpo");
	return false;
 });
});

$(function(){
 $("#toPageTop").hover(function(){
  $("#toPageTop img").attr({src:"image/pageUp2.png"});
 },function(){
  $("#toPageTop img").attr({src:"image/pageUp.png"});
 });
});

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
  $("#mainSection").animate({opacity:0},800)
	     .animate({ opacity:1},500);
});
});

$(function(){
 $(".mainSection").hide();
 $("#mainSectionHai").show();
 $("#hrefHora").click(function(){
   $(".mainSection").fadeOut();
 setTimeout(function(){
   $("#mainSectionHora").fadeIn();
 },400);

 });
 $("#hrefHai").click(function(){
   $(".mainSection").fadeOut();
 setTimeout(function(){
   $("#mainSectionHai").fadeIn();
 },400);
 });

 $("#hrefWait").click(function(){
   $(".mainSection").fadeOut();
 setTimeout(function(){
   $("#mainSectionWait").fadeIn();
 },400);
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
 $("a[href^=#]").click(function(){
	var href = $(this).attr("href");
	var target = $(href == "#" || href == "" ? "html" : href);
	var position = target.offset().top;
	var positionNew = position - 100;
	$("body,html").animate({scrollTop:positionNew}, 900, "easeInOutExpo");
 });
});


$(function(){
 $("#toPageTop").hover(function(){
  $("#toPageTop img").attr({src:"image/pageUp2.png"});
 },function(){
  $("#toPageTop img").attr({src:"image/pageUp.png"});
 });
});
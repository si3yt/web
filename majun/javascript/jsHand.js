$(function(){
 $(document).ready(function(){
  $("#mainTitle") .animate({ opacity:1}, 800 ,function(){
	$("#mainTitleContents").animate({opacity:1}, 800)});
  $("#mainTitle").animate({borderLeftWidth:"10px"}, 500);
 });
});

$(function(){
 $(document).ready(function(){
  $("#handCategory").animate({ opacity:0}, 800 )
             .animate({ opacity:1,marginTop:30}, 500);
  $("#mainSection").animate({opacity:0},800)
	     .animate({ opacity:1},500);
});
});
var a = 0;
$(function(){
 $("#hand1 .more").click(function(){
  if(a == 0){
    $("#hand1").animate({width:"90%"} ,800);
    $("#hand2").css({"clear":"left"});
    a = 1;
    $("#hand1 .more").html("© close");
  }else if(a==1){
    $("#hand1").animate({width:"280px"} ,800);
    $("#hand2").css({"clear":"none"});
    a = 0;
    $("#hand1 .more").html("and more ¨");
  }
 });
});

$(function(){
 $(".subCategory").hide();
 $(".mainCategory").click(function(){
  if($("+ul",this).css("display")=="none"){
   $(".subCategory").slideUp();
   $(".mainCategory").css({"border-radius":"10px"});
   $("+ul",this).slideDown();
   $(this,".mainCategory").css({"border-radius":"10px 10px 0px 0px"});
  }else{
   $(".subCategory").slideUp();
   $(".mainCategory").css({"border-radius":"10px"});
  }
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
	var positionNew = position - 130;
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

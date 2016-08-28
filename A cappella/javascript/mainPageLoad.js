/*Page Load Action*/
$(function() {
  $("#onpu1").css({"opacity":"0"});
  $("#onpu2").css({"opacity":"0"});
  $("#onpu3").css({"opacity":"0"});
  $("#fullpage").hide();
  $(".section").css({"height":$(window).height()});
  $(".partContents").hide();
  $("#backButton3").hide();
  $("#backButton2").hide();
  $("#backButton1").hide();
  $("#backButtonR").hide();
  $("#backButtonB").hide();
  $("#backButtonV").hide();
  $(document).ready(function() {

    $("#onpu1").animate({opacity:1,marginTop:"20%"},1500);
    setTimeout(function(){
      $("#onpu2").animate({opacity:1,marginTop:"20%"},1500);
    },500);
    setTimeout(function(){
      $("#onpu3").animate({opacity:1,marginTop:"20%"},1500);
    },1000);
    setTimeout(function(){
      $("#loadPage").fadeOut();
    },2800);
    setTimeout(function(){
      $("#fullpage").fadeIn("slow");
      $("#fullpage").fullpage();
      $("#mainPage p").hide();
      $("#mainPage h1 span").css({"opacity":"0"});
      $("#mainPage h1").animate({width:"30%"},1000);
      setTimeout(function(){
        $("#mainPage h1 span").animate({opacity:1},1000);
        $("#mainPage p").fadeIn("slow");
      },1000);
    },3300);
 });
});

/*Window Resize Action*/
$(function(){
  $(document).resize(function(){
      $(".section").css({"height":$(window).height()});
      $("#fullpage").fullpage();
  });
});

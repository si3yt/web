$(function(){
  $("#kako").css({"border-color":"#7fbfff"});
  $("#kako").click(function(){
    $("img").css({"border-color":"#fff"});
    var video = $("#videoKocoa").get(0);
    video.src = "video/カコノマチニ.MP4";
    $("#kako").css({"border-color":"#7fbfff"});
    $("#caption").html("♪ カコノマチニ:POP STAR");
  });
  $("#bis").click(function(){
    $("img").css({"border-color":"#fff"});
    var video = $("#videoKocoa").get(0);
    video.src = "video/Bi83.MP4";
    $("#bis").css({"border-color":"#7fbfff"});
    $("#caption").html("♪ Bi83:花");
  });
  $("#lib").click(function(){
    $("img").css({"border-color":"#fff"});
    var video = $("#videoKocoa").get(0);
    video.src = "video/LiB.MP4";
    $("#lib").css({"border-color":"#7fbfff"});
    $("#caption").html("♪ LiB:Change The World");
  });
  $("#sugar").click(function(){
    $("img").css({"border-color":"#fff"});
    var video = $("#videoKocoa").get(0);
    video.src = "video/sugarless.MP4";
    $("#sugar").css({"border-color":"#7fbfff"});
    $("#caption").html("♪ sugarless:happiness");
  });
  $("#acom").click(function(){
    $("img").css({"border-color":"#fff"});
    var video = $("#videoKocoa").get(0);
    video.src = "video/ACoM.MP4";
    $("#acom").css({"border-color":"#7fbfff"});
    $("#caption").html("♪ ACoM:コネクト");
  });
  $("#tomato").click(function(){
    $("img").css({"border-color":"#fff"});
    var video = $("#videoKocoa").get(0);
    video.src = "video/Otomatn.MP4";
    $("#tomato").css({"border-color":"#7fbfff"});
    $("#caption").html("♪ O-tomato'n:MY FIRST KISS");
  });
});

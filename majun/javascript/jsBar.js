$(function() {
     $("#buttonCall").click(function() {
           $("#overlayForm").fadeIn();�@/*�ӂ���ƕ\��*/
 });
     $("#buttonClose").click(function() {
           $("#overlayForm").fadeOut();�@/*�ӂ���Ə�����*/
 });
});

$(function() {
 $(window).resize(function(){
    if($(window).innerWidth() < 720){
	$("#siteHeader a").width("80px");
 	$("#siteHeader h1").style.marginRight("20px");
    }else{
	$("#siteHeader a").width("120px");
    }
 })
})
$(function() {
 $(document).ready(function(){
    if($(window).innerWidth() < 720){
	$("#siteHeader a").width("80px");
 	$("#siteHeader h1").style.marginRight("20px");
    }else{
	$("#siteHeader a").width("120px");
    }
 })
})
$(function() {
     $("#buttonCall").click(function() {
           $("#overlayForm").fadeIn();Å@/*Ç”ÇÌÇ¡Ç∆ï\é¶*/
 });
     $("#buttonClose").click(function() {
           $("#overlayForm").fadeOut();Å@/*Ç”ÇÌÇ¡Ç∆è¡Ç¶ÇÈ*/
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
$(function() {
     $("#buttonCall").click(function() {
           $("#overlayForm").fadeIn();　/*ふわっと表示*/
 });
     $("#buttonClose").click(function() {
           $("#overlayForm").fadeOut();　/*ふわっと消える*/
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
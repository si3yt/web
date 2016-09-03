$(function(){
 $(document).ready(function(){
  $("#mainImage").height($("#subContents").outerHeight());
  $("#mainImage").animate({ opacity: 1}, 1000 )
		 .animate({ opacity:0.9}, 1000 );
 });
});
$(function(){
 $(document).ready(function(){
  $("#mainContents").animate({ opacity:0}, 1000 )
		    .animate({ opacity:1,marginTop:100}, 1000 );
 });
});

$(function(){
 $(document).ready(function(){
  $(".step").animate({ opacity:0}, 1500 )
	    .animate({ opacity:1}, 1000 ,function(){
     $("#step1Contents").animate({opacity:1},200);
     $("#step1").animate({borderLeftWidth:"10px"}, 200,function(){
       $("#step2Contents").animate({opacity:1},200);
       $("#step2").animate({borderLeftWidth:"10px"}, 200,function(){
	$("#step3Contents").animate({opacity:1},200);
        $("#step3").animate({borderLeftWidth:"10px"},200);
       });
     });
   });
 });
});

$(function(){
 $(window).resize(function(){
    $("#mainImage").height($("#subContents").outerHeight());
 });
});

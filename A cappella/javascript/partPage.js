/*PartPage Mouseover Action*/
var imgClick = 0.7;
$(function(){
  $("#partPage img").hover(
    function(){
      $(this).css({"opacity":imgClick});
      $("#partText").html($(this).attr("alt"));
    },function(){
      $(this).css({"opacity":"1"});
      if (imgClick == 1) {
        /*No Action*/
      }else{
        $("#partText").html("シルエットをクリック！");
      }
    }
  );
  $("#partPage #third").hover(
    function(){
      $("#partBar3").css({"left":"0"});
      $("#partBar3").css({"background-color":"#99ccff"});
      $("#partBar3").stop().animate({width:"100%"},300);
    },function(){
      if (imgClick != 1) {
        $("#partBar3").stop().animate({width:"0"},300);
        $("#partBar3").animate({left:"100%"},{duration:300, queue:false});
      }
    }
  );
  $("#partPage #second").hover(
    function(){
      $("#partBar2").css({"left":"0"});
      $("#partBar2").css({"background-color":"#99ffcc"});
      $("#partBar2").stop().animate({width:"100%"},300);
    },function(){
      if (imgClick != 1) {
        $("#partBar2").stop().animate({width:"0"},300);
        $("#partBar2").animate({left:"100%"},{duration:300, queue:false});
      }
    }
  );
  $("#partPage #first").hover(
    function(){
      $("#partBar1").css({"left":"0"});
      $("#partBar1").css({"background-color":"#ffabff"});
      $("#partBar1").stop().animate({width:"100%"},300);
    },function(){
      if (imgClick != 1) {
        $("#partBar1").stop().animate({width:"0"},300);
        $("#partBar1").animate({left:"100%"},{duration:300, queue:false});
      }
    }
  );
  $("#partPage #read").hover(
    function(){
      $("#partBarR").css({"left":"0"});
      $("#partBarR").css({"background-color":"#ffcc99"});
      $("#partBarR").stop().animate({width:"100%"},300);
    },function(){
      if (imgClick != 1) {
        $("#partBarR").stop().animate({width:"0"},300);
        $("#partBarR").animate({left:"100%"},{duration:300, queue:false});
      }
    }
  );
  $("#partPage #base").hover(
    function(){
      $("#partBarB").css({"left":"0"});
      $("#partBarB").css({"background-color":"#9999ff"});
      $("#partBarB").stop().animate({width:"100%"},300);
    },function(){
      if (imgClick != 1) {
        $("#partBarB").stop().animate({width:"0"},300);
        $("#partBarB").animate({left:"100%"},{duration:300, queue:false});
      }
    }
  );
  $("#partPage #voipa").hover(
    function(){
      $("#partBarV").css({"left":"0"});
      $("#partBarV").css({"background-color":"#cc99ff"});
      $("#partBarV").stop().animate({width:"100%"},300);
    },function(){
      if (imgClick != 1) {
        $("#partBarV").stop().animate({width:"0"},300);
        $("#partBarV").animate({left:"100%"},{duration:300, queue:false});
      }
    }
  );
});

/*Part Third Click Action*/
$(function(){
  $("#third").stop().click(function(){
    imgClick = 1;
    $("#partDown").fadeOut(100);
    $(".3").fadeOut(800);
    $("#second").animate({marginLeft:"15%"},{duration:800, queue:false});
    $("#third").animate({width:"19%",marginLeft:"0",marginTop:"-8.5%"},{duration:800, queue:false});
    $("#partName").animate({opacity:"0"},{duration:100, queue:false});
    $("#partName").animate({borderLeftColor:"#99ccff",borderRightColor:"#99ccff",color:"#666"},{duration:800, queue:false});
    $(this).css({"opacity":"1"});
    setTimeout(function(){
      $("#partName").html("サード");
      $("#third").fadeOut(500);
      $("#partBackBar").animate({marginTop:"5%"},800).animate({height:"50%"},500);
      setTimeout(function(){
        $("#third").fadeIn(500);
        $("#addThird").fadeIn(1000);
        $("#partName").animate({opacity:"1"},{duration:200, queue:false});
        $("#backButton3").fadeIn(1000);
      },1600);
    },800);
  });
  $("#backButton3").click(function(){
    $("#backButton3").fadeOut(200);
    $(".partContents").fadeOut(600);
    $("#third").fadeOut(500);
    setTimeout(function(){
      $("#partBackBar").animate({height:"20%"},600).animate({marginTop:"29%"},1000);
    },800);
    $("#partName").animate({opacity:"0"},{duration:200, queue:false});
    setTimeout(function(){
      $("#third").fadeIn(700);
    },1700);
    setTimeout(function(){
      $(".3").fadeIn(800);
      $("#second").animate({marginLeft:"0"},{duration:800, queue:false});
      $("#third").animate({width:"10%",marginLeft:"19.3%",marginTop:"3%"},{duration:800, queue:false});
      $("#partName").html("パート紹介");
      $("#partName").animate({borderLeftColor:"#000",borderRightColor:"#000",color:"#333"},{duration:800, queue:false});
      setTimeout(function(){
            imgClick = 0.7;
            $("#partDown").fadeIn(300);
            setTimeout(function(){
              $("#partName").animate({opacity:"1"},{duration:200, queue:false});
            },300);
      },200);
    },2300);
  });
});

/*Part Second Click Action*/
$(function(){
  $("#second").stop().click(function(){
    imgClick = 1;
    $("#partDown").fadeOut(100);
    $(".2").fadeOut(800);
    $("#first").animate({marginLeft:"15%"},{duration:800, queue:false});
    $("#third").animate({opacity:"0",marginLeft:"0%"},{duration:800, queue:false});
    $("#second").animate({width:"19%",marginLeft:"0",marginTop:"-8.5%"},{duration:800, queue:false});
    $("#partName").animate({opacity:"0"},{duration:100, queue:false});
    $("#partName").animate({borderLeftColor:"#99ffcc",borderRightColor:"#99ffcc",color:"#666"},{duration:800, queue:false});
    $(this).css({"opacity":"1"});
    setTimeout(function(){
      $("#partName").html("セカンド");
      $("#second").fadeOut(500);
      $("#third").animate({width:"0"},{duration:800, queue:false});
      $("#partBackBar").animate({marginTop:"5%"},800).animate({height:"50%"},500);
      setTimeout(function(){
        $("#second").fadeIn(500);
        $("#addSecond").fadeIn(1000);
        $("#partName").animate({opacity:"1"},{duration:200, queue:false});
        $("#backButton2").fadeIn(1000);
      },1600);
    },800);
  });
  $("#backButton2").click(function(){
    $("#backButton2").fadeOut(200);
    $(".partContents").fadeOut(600);
    $("#second").fadeOut(500);
    setTimeout(function(){
      $("#partBackBar").animate({height:"20%"},600).animate({marginTop:"29%"},1000);
    },800);
    $("#partName").animate({opacity:"0"},{duration:200, queue:false});
    setTimeout(function(){
      $("#second").fadeIn(700);
      $("#third").animate({width:"10%"},{duration:800, queue:false});
    },1700);
    setTimeout(function(){
      $(".2").fadeIn(800);
      $("#first").animate({marginLeft:"0"},{duration:800, queue:false});
      $("#third").animate({opacity:"1",marginLeft:"19.3%"},{duration:800, queue:false});
      $("#second").animate({width:"10%",marginTop:"3%"},{duration:800, queue:false});
      $("#partName").html("パート紹介");
      $("#partName").animate({borderLeftColor:"#000",borderRightColor:"#000",color:"#333"},{duration:800, queue:false});
      setTimeout(function(){
            imgClick = 0.7;
            $("#partDown").fadeIn(300);
            setTimeout(function(){
              $("#partName").animate({opacity:"1"},{duration:200, queue:false});
            },300);
      },200);
    },2300);
  });
});

/*Part First Click Action*/
$(function(){
  $("#first").stop().click(function(){
    imgClick = 1;
    $("#partDown").fadeOut(100);
    $(".1").fadeOut(800);
    $("#read").animate({marginLeft:"15%"},{duration:800, queue:false});
    $("#third").animate({opacity:"0",marginLeft:"0%"},{duration:800, queue:false});
    $("#second").animate({opacity:"0"},{duration:800, queue:false});
    $("#first").animate({width:"19%",marginLeft:"0",marginTop:"-8.5%"},{duration:800, queue:false});
    $("#partName").animate({opacity:"0"},{duration:100, queue:false});
    $("#partName").animate({borderLeftColor:"#ffabff",borderRightColor:"#ffabff",color:"#666"},{duration:800, queue:false});
    $(this).css({"opacity":"1"});
    setTimeout(function(){
      $("#partName").html("ファースト");
      $("#first").fadeOut(500);
      $("#third").animate({width:"0"},{duration:800, queue:false});
      $("#second").animate({width:"0"},{duration:800, queue:false});
      $("#partBackBar").animate({marginTop:"5%"},800).animate({height:"50%"},500);
      setTimeout(function(){
        $("#first").fadeIn(500);
        $("#addFirst").fadeIn(1000);
        $("#backButton1").fadeIn(1000);
        $("#partName").animate({opacity:"1"},{duration:200, queue:false});
    },1600);
    },800);
  });
  $("#backButton1").click(function(){
    $("#backButton1").fadeOut(200);
    $(".partContents").fadeOut(600);
    $("#first").fadeOut(500);
    setTimeout(function(){
      $("#partBackBar").animate({height:"20%"},600).animate({marginTop:"29%"},1000);
    },800);
    $("#partName").animate({opacity:"0"},{duration:200, queue:false});
    setTimeout(function(){
      $("#first").fadeIn(700);
      $("#third").animate({width:"10%"},{duration:800, queue:false});
      $("#second").animate({width:"10%"},{duration:800, queue:false});
    },1700);
    setTimeout(function(){
      $(".1").fadeIn(800);
      $("#read").animate({marginLeft:"0"},{duration:800, queue:false});
      $("#third").animate({opacity:"1",marginLeft:"19.3%"},{duration:800, queue:false});
      $("#second").animate({opacity:"1"},{duration:800, queue:false});
      $("#first").animate({width:"10%",marginTop:"3%"},{duration:800, queue:false});
      $("#partName").html("パート紹介");
      $("#partName").animate({borderLeftColor:"#000",borderRightColor:"#000",color:"#333"},{duration:800, queue:false});
      setTimeout(function(){
            imgClick = 0.7;
            $("#partDown").fadeIn(300);
            setTimeout(function(){
              $("#partName").animate({opacity:"1"},{duration:200, queue:false});
            },300);
      },200);
    },2300);
  });
});

/*Part Read Click Action*/
$(function(){
  $("#read").stop().click(function(){
    imgClick = 1;
    $("#partDown").fadeOut(100);
    $(".r").fadeOut(800);
    $("#base").animate({marginLeft:"15%"},{duration:800, queue:false});
    $("#third").animate({opacity:"0",marginLeft:"0%"},{duration:800, queue:false});
    $("#second").animate({opacity:"0"},{duration:800, queue:false});
    $("#first").animate({opacity:"0"},{duration:800, queue:false});
    $("#read").animate({width:"19%",marginLeft:"0",marginTop:"-8.5%"},{duration:800, queue:false});
    $("#partName").animate({opacity:"0"},{duration:100, queue:false});
    $("#partName").animate({borderLeftColor:"#ffcc99",borderRightColor:"#ffcc99",color:"#666"},{duration:800, queue:false});
    $(this).css({"opacity":"1"});
    setTimeout(function(){
      $("#partName").html("リード");
      $("#read").fadeOut(500);
      $("#third").animate({width:"0"},{duration:800, queue:false});
      $("#second").animate({width:"0"},{duration:800, queue:false});
      $("#first").animate({width:"0"},{duration:800, queue:false});
      $("#partBackBar").animate({marginTop:"5%"},800).animate({height:"50%"},500);
      setTimeout(function(){
        $("#read").fadeIn(500);
        $("#addRead").fadeIn(1000);
        $("#backButtonR").fadeIn(1000);
        $("#partName").animate({opacity:"1"},{duration:200, queue:false});
      },1600);
    },800);
  });
  $("#backButtonR").click(function(){
    $("#backButtonR").fadeOut(200);
    $(".partContents").fadeOut(600);
    $("#read").fadeOut(500);
    setTimeout(function(){
      $("#partBackBar").animate({height:"20%"},600).animate({marginTop:"29%"},1000);
    },800);
      $("#partName").animate({opacity:"0"},{duration:200, queue:false});
    setTimeout(function(){
      $("#read").fadeIn(700);
      $("#third").animate({width:"10%"},{duration:800, queue:false});
      $("#second").animate({width:"10%"},{duration:800, queue:false});
      $("#first").animate({width:"10%"},{duration:800, queue:false});
  },1700);
    setTimeout(function(){
      $(".r").fadeIn(800);
      $("#base").animate({marginLeft:"0"},{duration:800, queue:false});
      $("#third").animate({opacity:"1",marginLeft:"19.3%"},{duration:800, queue:false});
      $("#second").animate({opacity:"1"},{duration:800, queue:false});
      $("#first").animate({opacity:"1"},{duration:800, queue:false});
      $("#read").animate({width:"10%",marginTop:"3%"},{duration:800, queue:false});
      $("#partName").html("パート紹介");
      $("#partName").animate({borderLeftColor:"#000",borderRightColor:"#000",color:"#333"},{duration:800, queue:false});
      setTimeout(function(){
            imgClick = 0.7;
            $("#partDown").fadeIn(300);
            setTimeout(function(){
              $("#partName").animate({opacity:"1"},{duration:200, queue:false});
            },300);
      },200);
    },2300);
  });
});

/*Part Base Click Action*/
$(function(){
  $("#base").stop().click(function(){
    imgClick = 1;
    $("#partDown").fadeOut(100);
    $(".b").fadeOut(800);
    $("#voipa").animate({marginLeft:"15%"},{duration:800, queue:false});
    $("#third").animate({opacity:"0",marginLeft:"0%"},{duration:800, queue:false});
    $("#second").animate({opacity:"0"},{duration:800, queue:false});
    $("#first").animate({opacity:"0"},{duration:800, queue:false});
    $("#read").animate({opacity:"0"},{duration:800, queue:false});
    $("#base").animate({width:"19%",marginLeft:"0",marginTop:"-8.5%"},{duration:800, queue:false});
    $("#partName").animate({opacity:"0"},{duration:100, queue:false});
    $("#partName").animate({borderLeftColor:"#9999ff",borderRightColor:"#9999ff",color:"#666"},{duration:800, queue:false});
    $(this).css({"opacity":"1"});
    setTimeout(function(){
      $("#partName").html("ベース");
      $("#base").fadeOut(500);
      $("#third").animate({width:"0"},{duration:800, queue:false});
      $("#second").animate({width:"0"},{duration:800, queue:false});
      $("#first").animate({width:"0"},{duration:800, queue:false});
      $("#read").animate({width:"0"},{duration:800, queue:false});
      $("#partBackBar").animate({marginTop:"5%"},800).animate({height:"50%"},500);
      setTimeout(function(){
        $("#base").fadeIn(500);
        $("#addBase").fadeIn(1000);
        $("#backButtonB").fadeIn(1000);
        $("#partName").animate({opacity:"1"},{duration:200, queue:false});
      },1600);
    },800);
  });
  $("#backButtonB").click(function(){
    $("#backButtonB").fadeOut(200);
    $(".partContents").fadeOut(600);
    $("#base").fadeOut(500);
    setTimeout(function(){
      $("#partBackBar").animate({height:"20%"},600).animate({marginTop:"29%"},1000);
    },800);
      $("#partName").animate({opacity:"0"},{duration:200, queue:false});
    setTimeout(function(){
      $("#base").fadeIn(700);
      $("#third").animate({width:"10%"},{duration:800, queue:false});
      $("#second").animate({width:"10%"},{duration:800, queue:false});
      $("#first").animate({width:"10%"},{duration:800, queue:false});
      $("#read").animate({width:"10%"},{duration:800, queue:false});
  },1700);
    setTimeout(function(){
      $(".b").fadeIn(800);
      $("#voipa").animate({marginLeft:"0"},{duration:800, queue:false});
      $("#third").animate({opacity:"1",marginLeft:"19.3%"},{duration:800, queue:false});
      $("#second").animate({opacity:"1"},{duration:800, queue:false});
      $("#first").animate({opacity:"1"},{duration:800, queue:false});
      $("#read").animate({opacity:"1"},{duration:800, queue:false});
      $("#base").animate({width:"10%",marginTop:"3%"},{duration:800, queue:false});
      $("#partName").html("パート紹介");
      $("#partName").animate({borderLeftColor:"#000",borderRightColor:"#000",color:"#333"},{duration:800, queue:false});
      setTimeout(function(){
            imgClick = 0.7;
            $("#partDown").fadeIn(300);
            setTimeout(function(){
              $("#partName").animate({opacity:"1"},{duration:200, queue:false});
            },300);
      },200);
    },2300);
  });
});

/*Part Voipa Click Action*/
$(function(){
  $("#voipa").stop().click(function(){
    imgClick = 1;
    $("#partDown").fadeOut(100);
    $(".v").fadeOut(800);
    $("#third").animate({opacity:"0",marginLeft:"0%"},{duration:800, queue:false});
    $("#second").animate({opacity:"0"},{duration:800, queue:false});
    $("#first").animate({opacity:"0"},{duration:800, queue:false});
    $("#read").animate({opacity:"0"},{duration:800, queue:false});
    $("#base").animate({opacity:"0"},{duration:800, queue:false});
    $("#voipa").animate({width:"19%",marginLeft:"0",marginTop:"-8.5%"},{duration:800, queue:false});
    $("#partName").animate({opacity:"0"},{duration:100, queue:false});
    $("#partName").animate({borderLeftColor:"#cc99ff",borderRightColor:"#cc99ff",color:"#666"},{duration:800, queue:false});
    $(this).css({"opacity":"1"});
    setTimeout(function(){
      $("#partName").html("ボイスパーカッション");
      $("#voipa").fadeOut(500);
      $("#third").animate({width:"0"},{duration:800, queue:false});
      $("#second").animate({width:"0"},{duration:800, queue:false});
      $("#first").animate({width:"0"},{duration:800, queue:false});
      $("#read").animate({width:"0"},{duration:800, queue:false});
      $("#base").animate({width:"0"},{duration:800, queue:false});
      $("#partBackBar").animate({marginTop:"5%"},800).animate({height:"50%"},500);
      setTimeout(function(){
        $("#voipa").fadeIn(500);
        $("#addVoipa").fadeIn(1000);
        $("#backButtonV").fadeIn(1000);
        $("#partName").animate({opacity:"1"},{duration:200, queue:false});
      },1600);
    },800);
  });
  $("#backButtonV").click(function(){
    $("#backButtonV").fadeOut(200);
    $(".partContents").fadeOut(600);
    $("#voipa").fadeOut(500);
    setTimeout(function(){
      $("#partBackBar").animate({height:"20%"},600).animate({marginTop:"29%"},1000);
    },800);
      $("#partName").animate({opacity:"0"},{duration:200, queue:false});
    setTimeout(function(){
      $("#voipa").fadeIn(700);
      $("#third").animate({width:"10%"},{duration:800, queue:false});
      $("#second").animate({width:"10%"},{duration:800, queue:false});
      $("#first").animate({width:"10%"},{duration:800, queue:false});
      $("#read").animate({width:"10%"},{duration:800, queue:false});
      $("#base").animate({width:"10%"},{duration:800, queue:false});
  },1700);
    setTimeout(function(){
      $(".v").fadeIn(800);
      $("#third").animate({opacity:"1",marginLeft:"19.3%"},{duration:800, queue:false});
      $("#second").animate({opacity:"1"},{duration:800, queue:false});
      $("#first").animate({opacity:"1"},{duration:800, queue:false});
      $("#read").animate({opacity:"1"},{duration:800, queue:false});
      $("#base").animate({opacity:"1"},{duration:800, queue:false});
      $("#voipa").animate({width:"10%",marginTop:"3%"},{duration:800, queue:false});
      $("#partName").html("パート紹介");
      $("#partName").animate({borderLeftColor:"#000",borderRightColor:"#000",color:"#333"},{duration:800, queue:false});
      setTimeout(function(){
            imgClick = 0.7;
            $("#partDown").fadeIn(300);
            setTimeout(function(){
              $("#partName").animate({opacity:"1"},{duration:200, queue:false});
            },300);
      },200);
    },2300);
  });
});

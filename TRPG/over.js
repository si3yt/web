$(function($){
  $('.typist')
    .typist({ speed: 5 })
    .typistAdd('＋　げいむ　えんど　＋')
    .typistPause(500)
    .on('end_pause.typist', function() {
      $('.top').fadeIn('slow');
    });
});

document.onkeydown = function(e){
  if (e.keyCode == 13) {
    location.href="start.html";
  }
};

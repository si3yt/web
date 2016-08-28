var count = 0;
$(function($){
  $('.typist')
    .typist({ speed: 30 })
    .typistAdd('わがけんきゅうしつへようこそ。\n')
    .typistPause(300)
    .typistAdd('\nこのへやにひとりのけんきゅういんがとじこめられました。\n')
    .typistPause(300)
    .typistAdd('\nあなたがぷれいやーとなり、けんきゅうしつをだっしゅつしてください。\n')
    .typistPause(300)
    .typistAdd('\nじゅうじキーでけんきゅういんをそうさし、\n')
    .typistAdd('きになるところをエンターキーでしらべることができます。\n')
    .typistPause(300)
    .typistAdd('はんとうめいのエリアがしらべることのできるばしょです。\n')
    .typistPause(300)
    .typistAdd('\nどうかぶじにだっしゅつしてくださいね。')
    .typistPause(500)
    .on('end_pause.typist', function() {
      count++;
      if (count == 6) {
        $('.next').fadeIn('slow');
      }
    });
});

document.onkeydown = function(e){
  if (e.keyCode == 13) {
    location.href="player.html";
  }
};

$(document).ready(function() {
  $('#slide').coinslider({
    width: 980,
    height: 540,
    spw: 8, //画面切り替え時の横四角数
    sph: 4, //画面切り替え時の縦四角数
    delay: 3000, //次の画像への切り替え時間
    sDelay: 30, //四角が次の四角へ切り替わる時間?
    opacity: 0.7, //不透明度
    titleSpeed: 500, //タイトル?
    effect: 'random', //エフェクト(random, swirl, rain, straight)
    navigation: true, //ナビボタン
    links: true, //画像リンク
    hoverPause: true, //MouseOn停止
  });
});

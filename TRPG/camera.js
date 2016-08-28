//カメラが起動できたかのフラグ
var localMediaStream = null;

function loadCamera(){
$(function() {
  //videoタグを取得
  var video = document.getElementById('camera');
  	//カメラ使えるかチェック
  	var hasGetUserMedia = function() {
  		return (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
  	};

  	//エラー
  	var onFailSoHard = function(e) {
  		console.log('エラー!', e);
  	};

  	if(!hasGetUserMedia()) {
  		alert("未対応ブラウザです。");
  	} else {
  		window.URL = window.URL || window.webkitURL;
  		navigator.getUserMedia  = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
  		navigator.getUserMedia({video: true}, function(stream) {
  			video.src = window.URL.createObjectURL(stream);
  			localMediaStream = stream;
  		}, onFailSoHard);
  	}
  });
}
function webCamera(targetC,targetI){
  var video = document.getElementById('camera');
  if (localMediaStream) {
    var canvas = document.getElementById(targetC);
    //canvasの描画モードを2sに
    var ctx = canvas.getContext('2d');
    var img = document.getElementById(targetI);

    //videoの縦幅横幅を取得
    var w = 350;
    var h = 250;

    //同じサイズをcanvasに指定
    canvas.setAttribute("width", w);
    canvas.setAttribute("height", h);

    //canvasにコピー
    ctx.drawImage(video, 0, 0, w, h);
    //imgにpng形式で書き出し
    img.src = canvas.toDataURL('image/png');
  }
}

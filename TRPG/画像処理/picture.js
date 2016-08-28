img = new Image();
pattern = new Image();
img.onload = function(){
    /*読み込み終了後ここで画像を加工して表示する*/
    //キャンバスに画像をセット
    var canvas = document.getElementById('canvas');
    //var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    var width = img.width;
    var height = img.height;
    canvas.width = width;
    canvas.height = height;
    context.drawImage(img, 0, 0);

    //パターン画像をセット
    var canvasP = document.getElementById('canvasP');
    var contextP = canvasP.getContext('2d');
    //var widthP = pattern.width;
    //var heightP = pattern.height;
    //contextP.drawImage(pattern, 0, 0);

    //var srcDataP = contextP.getImageData(0, 0, widthP, heightP);
    //var srcP = srcDataP.data;
    var widthP = 2;
    var heightP = 2;

    canvasP.width = widthP;
    canvasP.height = heightP;

    //フィルター処理
    var srcData = context.getImageData(0, 0, width, height);
    var dstData = context.createImageData(width, height);
    var src = srcData.data;
    var dst = dstData.data;
    grayFilter(src, dst, width, height);
    context.putImageData(dstData, 0, 0);

    var srcPData = contextP.createImageData(widthP, heightP);
    var srcP = srcPData.data;
    patternGet(src, srcP, widthP, heightP, 2, width, height);
    contextP.putImageData(srcPData, 0, 0);

    //パターン認識
    var flagP = patternMatch(src, srcP, width, height, widthP, heightP);

    if (flagP) {
      document.getElementById("output").innerHTML += "正常";
    }

    //画像タグに代入して表示
    var dataurl = canvas.toDataURL();
    document.getElementById("output").innerHTML += "<img src='" + dataurl + "'>";
};
//読み込んだ画像ソースを入れる
img.src = "a.png";
pattern.src = "c.png";
//グレースケール変換関数
var grayFilter = function(src, dst, width, height) {
    for (var i = 0; i < height; i++) {
        for (var j = 0; j < width; j++) {
            var idx = (j + i * width) * 4;
            var gray = (src[idx] + src[idx + 1] + src[idx + 2]) / 3;
            dst[idx] = gray;
            dst[idx + 1] = gray;
            dst[idx + 2] = gray;
            dst[idx + 3] = src[idx + 3];
        }
    }
};

//パターンマッチング
var patternMatch = function(src, srcP, width, height, widthP, heightP) {
  for (var i = 0; i < (height - heightP); i++) {
    for (var j = 0; j < (width - widthP); j++) {
      for (var iP = 0; iP < heightP; iP++) {
        for (var jP = 0; jP < widthP; jP++) {
          if (src[(j+(i+iP)*width+jP)*4] == srcP[(jP+iP*widthP)*4] ){
            if (jP == widthP-1 && iP == heightP-1) {
              return true;
            }
          }else{break;}
        }
      }
    }
  }
  return false;
};

//パターン取得
var patternGet = function(src, srcP, widthP, heightP, start, width, height) {
  for (var i = 0; i < heightP; i++) {
    for (var j = 0; j < widthP*4; j++) {
      var value = src[(j+start*4)+(((i+start)*width)*4)];
      srcP[j+(i*widthP*4)] = value;
    }
  }
};

//ダミーパターンの作成
var dummyPatternGet = function(src, srcP, widthP, heightP, start, width, height, line){
  for (var i = 0; i < heightP; i++) {
    for (var j = 0; j < widthP*4; j++) {
      var value = src[(j+start*4)+(((i+start)*width)*4)];
      if (i==line) {
        value = 255;
      }
      srcP[j+(i*widthP*4)] = value;
    }
  }
};

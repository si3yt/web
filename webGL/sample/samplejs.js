var grayFilter = function(src, dst, width, height) {
    for (var i = 0; i < height; i++) {
        for (var j = 0; j < width; j++) {
            var idx = (j + i * width) * 4;
            var gray = 0.299*src[idx] + 0.587*src[idx + 1] + 0.114*src[idx + 2];
            dst[idx] = gray;
            dst[idx + 1] = gray;
            dst[idx + 2] = gray;
            dst[idx + 3] = src[idx + 3];
        }
    }
};
var dst11 = [];
window.addEventListener("DOMContentLoaded", function(){
    //ファイルオープンの際のイベント
    var ofd = document.getElementById("selectfile1");
    ofd.addEventListener("change", function(evt) {
        var img = null;
        var canvas = document.createElement("canvas");
        //var canvas = document.getElementById('canvas');

        var file = evt.target.files;
        var reader = new FileReader();

        //dataURL形式でファイルを読み込む
        reader.readAsDataURL(file[0]);

        //ファイルの読込が終了した時の処理
        reader.onload = function(){
            img = new Image();
            img.onload = function(){
                //キャンバスに画像をセット
                var context = canvas.getContext('2d');
                var width = img.width;
                var height = img.height;
                canvas.width = width;
                canvas.height = height;
                context.drawImage(img, 0, 0);

                //フィルター処理
                var srcData1 = context.getImageData(0, 0, width, height);
                var dstData1 = context.createImageData(width, height);
                var src1 = srcData1.data;
                var dst1 = dstData1.data;
                grayFilter(src1, dst1, width, height);
                dst11 = dstData1.data;
                context.putImageData(dstData1, 0, 0);

                //画像タグに代入して表示
                //var dataurl = canvas.toDataURL();
                //document.getElementById("output1").innerHTML = "<img src='" + dataurl + "'>";
            }
            img.src = reader.result;
        }
    }, false);

    var ofd = document.getElementById("selectfile2");
    ofd.addEventListener("change", function(evt) {
        var img = null;
        var canvas = document.createElement("canvas");
        //var canvas = document.getElementById('canvas');

        var file = evt.target.files;
        var reader = new FileReader();

        //dataURL形式でファイルを読み込む
        reader.readAsDataURL(file[0]);

        //ファイルの読込が終了した時の処理
        reader.onload = function(){
            img = new Image();
            img.onload = function(){
                //キャンバスに画像をセット
                var context = canvas.getContext('2d');
                var width = img.width;
                var height = img.height;
                canvas.width = width;
                canvas.height = height;
                context.drawImage(img, 0, 0);

                //フィルター処理
                var srcData2 = context.getImageData(0, 0, width, height);
                var dstData2 = context.createImageData(width, height);
                var src2 = srcData2.data;
                var dst2 = dstData2.data;
                grayFilter(src2, dst2, width, height);
                context.putImageData(dstData2, 0, 0);

                //画像タグに代入して表示
                //var dataurl = canvas.toDataURL();
                //document.getElementById("output2").innerHTML = "<img src='" + dataurl + "'>";

                var canvas2 = document.createElement("canvas");
                var context2 = canvas.getContext('2d');
                var dster = context.createImageData(width, height);
                var dster2 = dster.data;

                var movecounter = new Array(64);
                for (var i = 0; i < movecounter.length; i++) {
                  movecounter[i] = 0;
                }
                var j = 0;
                var l = 0;
                var Re = 0;
                for (var i = 0; i < dster2.length; i++) {
                  //差分の取得
                  if( (i+1)%4 != 0 ){
                    dster2[i] = Math.abs(dst2[i] - dst11[i]);
                  }else{
                    dster2[i] = 255;
                  }
                  //差分から動くもの選択
                  if (i%400 == 0) {
                    j++;
                    if (i%3200 == 0) {
                      j = Re;
                      l++;
                      if (l == 100) {
                        Re += 8;
                        l = 0;
                      }
                    }
                  }
                  if( (i+1)%4 == 1) {
                    if ( dster2[i] >= 50) {
                      movecounter[j]++;
                    }
                  }
                }
                context.putImageData(dster, 0, 0);

                //画像タグに代入して表示
                var dataurl = canvas.toDataURL();
                document.getElementById("output3").innerHTML = "<img src='" + dataurl + "'>";
            }
            img.src = reader.result;
        }
    }, false);
});

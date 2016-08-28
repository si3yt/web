
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
//var controls = new THREE.OrbitControls(camera, renderer.domElement);

var mainW = 6;

var Cube = new THREE.CubeGeometry(5,5,5);
var Sphere = new THREE.SphereGeometry(2, 32, 16);
var Cylinder = new THREE.CylinderGeometry(3,3,6);
var Octa = new THREE.OctahedronGeometry(3);
var Icosa = new THREE.IcosahedronGeometry(3);
var Tetra = new THREE.TetrahedronGeometry(3);
var White = new THREE.MeshLambertMaterial({color:0xffffcc});
var Black = new THREE.MeshLambertMaterial({color:0x8c5026});
var pawnW = [];
var pawnB = [];
for(var i=0;i<8;i++){
  pawnW[i] = new THREE.Mesh(Sphere, White);
  pawnB[i] = new THREE.Mesh(Sphere, Black);
};
var rookW = [];
var rookB = [];
var bishopW = [];
var bishopB = [];
var knightW = [];
var knightB = [];
for(var i=0;i<2;i++){
  rookW[i] = new THREE.Mesh(Cube, White);
  rookB[i] = new THREE.Mesh(Cube, Black);
  bishopW[i] = new THREE.Mesh(Cylinder, White);
  bishopB[i] = new THREE.Mesh(Cylinder, Black);
  knightW[i] = new THREE.Mesh(Octa, White);
  knightB[i] = new THREE.Mesh(Octa, Black);
}
var queenW = [];
var queenB = [];
var kingW = [];
var kingB = [];
queenW[0] = new THREE.Mesh(Icosa, White);
queenB[0] = new THREE.Mesh(Icosa, Black);
kingW[0] = new THREE.Mesh(Tetra, White);
kingB[0] = new THREE.Mesh(Tetra, Black);

window.onload = function() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor( 0xcccccc, 1 );
  document.body.appendChild(renderer.domElement);

  board();
  positionSets();
  piece();

  var light = new THREE.DirectionalLight(0xffffff,2);
  light.position.set(0, 10, 0).normalize();
  scene.add( light );

  camera.position.set(30, 30, 50);
  camera.lookAt(scene.position);//*

  var render = function () {
    requestAnimationFrame(render);

    //controls.update();
    renderer.render(scene, camera);
  };

  render();

};

/* make board */
function board(){
  var mainH = mainW/10;
  var boardGeometry = new THREE.CubeGeometry(mainW,mainH,mainW);
  var white = new THREE.MeshBasicMaterial({color: 0xffffff});
  var black = new THREE.MeshBasicMaterial({color: 0x000000});
  var board = [];
  var positionX = -mainW*3 - mainW/2;
  var positionY = 0;
  var positionZ = -mainW*4 - mainW/2;
  var positionSZ = -mainW*3 - mainW/2;

  for (var i = 0; i < 64; i++) {
    var int = parseInt(i/8);
    if ((int%2) == 1) {
      if ((i%2) == 0) {
        board[i] = new THREE.Mesh(boardGeometry, white);
      }else{
        board[i] = new THREE.Mesh(boardGeometry, black);
      };
    }else{
      if ((i%2) != 0) {
        board[i] = new THREE.Mesh(boardGeometry, white);
      }else{
        board[i] = new THREE.Mesh(boardGeometry, black);
      };
    };
    if ((i%8) == 0 && i != 0) {
      positionX += mainW;
      positionZ = positionSZ;
      board[i].position.set(positionX,positionY,positionZ);
    }else{
      positionZ += mainW;
      board[i].position.set(positionX,positionY,positionZ);
    };
    scene.add(board[i]);
  };
};

/* piece set */
var positionPiece = new Array(8);
var pieceColor = new Array(8);
for (var i = 0; i < 8; i++) {
  positionPiece[i] = new Array(8);
  pieceColor[i] = new Array(8);
};
for (var i=0;i<8;i++){
  for (var j=0;j<8;j++){
    positionPiece[i][j] = 0;
    pieceColor[i][j] = 0;

  };
};
function piece(){
  for(var i=0;i<8;i++){
    pawnW[i].position.set(positionSet[1][i][0],positionSet[1][i][1],positionSet[1][i][2]);
    scene.add(pawnW[i]);
    positionPiece[1][i] = pawnW[i];
    pieceColor[1][i] = 1;
    pawnB[i].position.set(positionSet[6][i][0],positionSet[6][i][1],positionSet[6][i][2]);
    scene.add(pawnB[i]);
    positionPiece[6][i] = pawnB[i];
    pieceColor[6][i] = 2;
  };
  rookW[0].position.set(positionSet[0][0][0],positionSet[0][0][1],positionSet[0][0][2]);
  positionPiece[0][0] = rookW[0];
  pieceColor[0][0] = 1;
  rookW[1].position.set(positionSet[0][7][0],positionSet[0][7][1],positionSet[0][7][2]);
  positionPiece[0][7] = rookW[1];
  pieceColor[0][7] = 1;
  bishopW[0].position.set(positionSet[0][2][0],positionSet[0][2][1],positionSet[0][2][2]);
  positionPiece[0][2] = bishopW[0];
  pieceColor[0][2] = 1;
  bishopW[1].position.set(positionSet[0][5][0],positionSet[0][5][1],positionSet[0][5][2]);
  positionPiece[0][5] = bishopW[1];
  pieceColor[0][5] = 1;
  knightW[0].position.set(positionSet[0][1][0],positionSet[0][1][1],positionSet[0][1][2]);
  positionPiece[0][1] = knightW[0];
  pieceColor[0][1] = 1;
  knightW[1].position.set(positionSet[0][6][0],positionSet[0][6][1],positionSet[0][6][2]);
  positionPiece[0][6] = rookW[1];
  pieceColor[0][6] = 1;
  rookB[0].position.set(positionSet[7][0][0],positionSet[7][0][1],positionSet[7][0][2]);
  positionPiece[7][0] = rookB[0];
  pieceColor[7][0] = 2;
  rookB[1].position.set(positionSet[7][7][0],positionSet[7][7][1],positionSet[7][7][2]);
  positionPiece[7][7] = rookB[1];
  pieceColor[7][7] = 2;
  bishopB[0].position.set(positionSet[7][2][0],positionSet[7][2][1],positionSet[7][2][2]);
  positionPiece[7][2] = bishopB[0];
  pieceColor[7][2] = 2;
  bishopB[1].position.set(positionSet[7][5][0],positionSet[7][5][1],positionSet[7][5][2]);
  positionPiece[7][5] = bishopB[1];
  pieceColor[7][5] = 2;
  knightB[0].position.set(positionSet[7][1][0],positionSet[7][1][1],positionSet[7][1][2]);
  positionPiece[7][1] = knightB[0];
  pieceColor[7][1] = 2;
  knightB[1].position.set(positionSet[7][6][0],positionSet[7][6][1],positionSet[7][6][2]);
  positionPiece[7][6] = knightB[1];
  pieceColor[7][6] = 2;
  for(var i=0;i<2;i++){
    scene.add(rookW[i]);
    scene.add(rookB[i]);
    scene.add(bishopW[i]);
    scene.add(bishopB[i]);
    scene.add(knightW[i]);
    scene.add(knightB[i]);
  }
  queenW[0].position.set(positionSet[0][4][0],positionSet[0][4][1],positionSet[0][4][2]);
  scene.add(queenW[0]);
  positionPiece[0][4] = queenW[0];
  pieceColor[0][4] = 1;
  queenB[0].position.set(positionSet[7][4][0],positionSet[7][4][1],positionSet[7][4][2]);
  scene.add(queenB[0]);
  positionPiece[7][4] = queenB[0];
  pieceColor[7][4] = 2;
  kingW[0].position.set(positionSet[0][3][0],positionSet[0][3][1],positionSet[0][3][2]);
  scene.add(kingW[0]);
  positionPiece[0][3] = kingW[0];
  pieceColor[0][3] = 1;
  kingB[0].position.set(positionSet[7][3][0],positionSet[7][3][1],positionSet[7][3][2]);
  scene.add(kingB[0]);
  positionPiece[7][3] = kingB[0];
  pieceColor[7][3] = 2;
}

/* position set */
var positionSet = new Array(8);
for (var i = 0; i < positionSet.length; i++) {
  positionSet[i] = new Array(8);
}
function positionSets(){
  var positionX = -mainW*3 - mainW/2;
  var positionY = mainW/2;
  var positionZ = -mainW*4 - mainW/2;
  var positionSZ = positionZ;
  for (var i = 0; i < 8; i++) {
    for (var j = 0; j < 8; j++) {
      positionZ += mainW;
      positionSet[i][j] = [positionX,positionY,positionZ];
    };
    positionX += mainW;
    positionZ = positionSZ;
  };
};

/* move piece */
function move(start1,start2,stop1,stop2){
  var piece = positionPiece[start1][start2];
  var stopX = positionSet[stop1][stop2][0];
  var stopZ = positionSet[stop1][stop2][2];
  var target = positionPiece[stop1][stop2];
  var movement;
  function loopPlusX(){
      movement = requestAnimationFrame(loopPlusX);

      // 以下にループ実行したいコード
      piece.position.x += 0.2;

      if(piece.position.x >= stopX){
         cancelAnimationFrame(movement);
      };
  };
  function loopMinusX(){
      movement = requestAnimationFrame(loopMinusX);

      // 以下にループ実行したいコード
      piece.position.x -= 0.2;

      if(piece.position.x <= stopX){
         cancelAnimationFrame(movement);
      };
  };
  function loopPlusZ(){
      movement = requestAnimationFrame(loopPlusZ);

      // 以下にループ実行したいコード
      piece.position.z += 0.2;

      if(piece.position.z >= stopZ){
         cancelAnimationFrame(movement);
      };
  };
  function loopMinusZ(){
      movement = requestAnimationFrame(loopMinusZ);

      // 以下にループ実行したいコード
      piece.position.z -= 0.2;

      if(piece.position.z <= stopX){
         cancelAnimationFrame(movement);
      };
  };
  if (target != 0) {
    scene.remove(target);
    burn(stop1,stop2);
  }
  if (piece.position.x != stopX) {
    if (piece.position.x < stopX) {
      loopPlusX();
    }else{
      loopMinusX();
    };
  };
  if (piece.position.z != stopZ) {
    if (piece.position.z < stopZ) {
      loopPlusZ();
    }else{
      loopMinusZ();
    };
  };
  positionPiece[start1][start2] = 0;
  positionPiece[stop1][stop2] = piece;
  pieceColor[stop1][stop2] = pieceColor[start1][start2];
  pieceColor[start1][start2] = 0;
};

/* piece remove effect */
function burn(stop1,stop2){
  var burns = new Array(10);
  var setPlus = new Array(10);
  var Sphere = new THREE.SphereGeometry(0.5, 32, 16);
  var Color = new THREE.MeshLambertMaterial({color:0x000000});
  var plus = -0.3
  for (var i = 0; i < burns.length; i++) {
    burns[i] = new THREE.Mesh(Sphere, Color);
    burns[i].position.set(positionSet[stop1][stop2][0],positionSet[stop1][stop2][1],positionSet[stop1][stop2][2]);
    setPlus[i] = plus;
    scene.add(burns[i]);
  };
  function loopBurn(){
    movement = requestAnimationFrame(loopBurn);
    for (var i = 0; i < burns.length; i++) {
      burns[i].position.x += setPlus[i]+Math.floor(Math.random()*1.5)+0.01;
      burns[i].position.y += 0.3;
      burns[i].position.z += setPlus[i]+Math.floor(Math.random()*1.5)+0.01;
    };
  };
  loopBurn();
  setTimeout(function(){
    cancelAnimationFrame(movement);
    for (var i = 0; i < burns.length; i++) {
      scene.remove(burns[i]);
    };
  },700);
};

/* keyboard move */
var player = 2;
document.onkeydown = function(e){
  if (e.keyCode == 13) {
    var move1=0;
    var move2=0;
    var move3=0;
    var move4=0;
    for (var i = 0; i < movecounter.length; i++) {
      if (movecounter[i] > 50){
        var j = Math.floor(i/8);
        var l = Math.floor(i%8);
        if (positionPiece[j][l] != 0) {
        if (pieceColor[j][l] == player){
            move1 = j;
            move2 = l;
          }else{
            move3 = j;
            move4 = l;
          }
        }else{
          move3 = j;
          move4 = l;
        }
      }
    }
    move(move1,move2,move3,move4);
    dst11 = dst22;
    if (player == 1) {
      player = 2;
    }else{
      player = 1;
    }
    pro1 = move3;
    pro2 = move4;
  }

  promotion(e);
};

/* promotion */
var pQW = 1;
var pQB = 1;
var pKW = 2;
var pKB = 2;
var pRW = 2;
var pRB = 2;
var pBW = 2;
var pBB = 2;
var pro1 = 0;
var pro2 = 0;
function promotion(e){
  if (e.keyCode == 81) {
    if (player == 2) {
      scene.remove(positionPiece[pro1][pro2]);
      queenW[pQW] = new THREE.Mesh(Icosa, White);
      queenW[pQW].position.set(positionSet[pro1][pro2][0],positionSet[pro1][pro2][1],positionSet[pro1][pro2][2]);
      scene.add(queenW[pQW]);
      positionPiece[pro1][pro2] = queenW[pQW];
      pQW++;
    }
    if (player == 1) {
      scene.remove(positionPiece[pro1][pro2]);
      queenB[pQB] = new THREE.Mesh(Icosa, Black);
      queenB[pQB].position.set(positionSet[pro1][pro2][0],positionSet[pro1][pro2][1],positionSet[pro1][pro2][2]);
      scene.add(queenB[pQB]);
      positionPiece[pro1][pro2] = queenB[pQB];
      pQB++;
    }
  }
  if (e.keyCode == 82) {
    if (player == 2) {
      scene.remove(positionPiece[pro1][pro2]);
      rookW[pRW] = new THREE.Mesh(Cube, White);
      rookW[pRW].position.set(positionSet[pro1][pro2][0],positionSet[pro1][pro2][1],positionSet[pro1][pro2][2]);
      scene.add(rookW[pRW]);
      positionPiece[pro1][pro2] = rookW[pRW];
      pRW++;
    }
    if (player == 1) {
      scene.remove(positionPiece[pro1][pro2]);
      rookB[pRB] = new THREE.Mesh(Cube, Black);
      rookB[pRB].position.set(positionSet[pro1][pro2][0],positionSet[pro1][pro2][1],positionSet[pro1][pro2][2]);
      scene.add(rookB[pRB]);
      positionPiece[pro1][pro2] = rookB[pRB];
      pRB++;
    }
  }
  if (e.keyCode == 75) {
    if (player == 2) {
      scene.remove(positionPiece[pro1][pro2]);
      knightW[pKW] = new THREE.Mesh(Octa, White);
      knightW[pKW].position.set(positionSet[pro1][pro2][0],positionSet[pro1][pro2][1],positionSet[pro1][pro2][2]);
      scene.add(knightW[pKW]);
      positionPiece[pro1][pro2] = knightW[pKW];
      pKW++;
    }
    if (player == 1) {
      scene.remove(positionPiece[pro1][pro2]);
      knightB[pKB] = new THREE.Mesh(Octa, Black);
      knightB[pKB].position.set(positionSet[pro1][pro2][0],positionSet[pro1][pro2][1],positionSet[pro1][pro2][2]);
      scene.add(knightB[pKB]);
      positionPiece[pro1][pro2] = knightB[pKB];
      pKB++;
    }
  }
  if (e.keyCode == 66) {
    if (player == 2) {
      scene.remove(positionPiece[pro1][pro2]);
      bishopW[pBW] = new THREE.Mesh(Cylinder, White);
      bishopW[pBW].position.set(positionSet[pro1][pro2][0],positionSet[pro1][pro2][1],positionSet[pro1][pro2][2]);
      scene.add(bishopW[pBW]);
      positionPiece[pro1][pro2] = bishopW[pBW];
      pBW++;
    }
    if (player == 1) {
      scene.remove(positionPiece[pro1][pro2]);
      bishopB[pBB] = new THREE.Mesh(Cylinder, Black);
      bishopB[pBB].position.set(positionSet[pro1][pro2][0],positionSet[pro1][pro2][1],positionSet[pro1][pro2][2]);
      scene.add(bishopB[pBB]);
      positionPiece[pro1][pro2] = bishopB[pBB];
      pBB++;
    }
  }
}



//背景差分
var movecounter = new Array(64);
for (var i = 0; i < movecounter.length; i++) {
  movecounter[i] = 0;
}

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
var dst22 = [];
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
                dst22 = dstData2.data;
                context.putImageData(dstData2, 0, 0);

                //画像タグに代入して表示
                //var dataurl = canvas.toDataURL();
                //document.getElementById("output2").innerHTML = "<img src='" + dataurl + "'>";

                var canvas2 = document.createElement("canvas");
                var context2 = canvas.getContext('2d');
                var dster = context.createImageData(width, height);
                var dster2 = dster.data;

                for (var i = 0; i < movecounter.length; i++) {
                  movecounter[i] = 0;
                }
                var j = 7;
                var l = 0;
                var Re = 7;
                for (var i = 0; i < dster2.length; i++) {
                  //差分の取得
                  if( (i+1)%4 != 0 ){
                    dster2[i] = Math.abs(dst2[i] - dst11[i]);
                  }else{
                    dster2[i] = 255;
                  }
                  //差分から動くもの選択
                  if (i%400 == 0) {
                    j--;
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
                //var dataurl = canvas.toDataURL();
                //document.getElementById("output3").innerHTML = "<img src='" + dataurl + "'>";
            }
            img.src = reader.result;
        }
    }, false);
});

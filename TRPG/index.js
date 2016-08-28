// スクリーン指定
var scene = new THREE.Scene();
// カメラ指定
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
// レンダー指定
var renderer = new THREE.WebGLRenderer({antialias: true});
// レンダーの影指定
renderer.shadowMapEnabled = true;
// カメラコントロールの指定
var controls = new THREE.OrbitControls(camera, renderer.domElement);

// 各オブジェクトの作成、色指定、影指定
var Floor = new THREE.CubeGeometry(200,1,200);
var floorM = new THREE.MeshLambertMaterial({color:0xb0c4de});
var floor = new THREE.Mesh(Floor, floorM);
floor.receiveShadow = true;
var Wall1 = new THREE.CubeGeometry(200,100,1);
var wallM1 = new THREE.MeshLambertMaterial({color:0xffffff});
var wall1 = new THREE.Mesh(Wall1, wallM1);
var wallM2 = new THREE.MeshLambertMaterial({color:0x999999});
var wall2 = new THREE.Mesh(Wall1, wallM2);
var Wall3 = new THREE.CubeGeometry(1,100,200);
var wallM3 = new THREE.MeshLambertMaterial({color:0xdddddd});
var wall3 = new THREE.Mesh(Wall3, wallM3);
var wallM4 = new THREE.MeshLambertMaterial({color:0xbbbbbb});
var wall4 = new THREE.Mesh(Wall3, wallM4);

var Door = new THREE.CubeGeometry(50,80,70);
var doorM = new THREE.MeshLambertMaterial({color:0xcd853f, transparent:true, opacity:0.5});
var door = new THREE.Mesh(Door, doorM);

var Sofa = new THREE.CubeGeometry(50,80,50);
var sofaM = new THREE.MeshLambertMaterial({color:0xf0e68c, transparent:true, opacity:0.5});
var sofa = new THREE.Mesh(Sofa, sofaM);

var Tool = new THREE.CubeGeometry(50,80,50);
var toolM = new THREE.MeshLambertMaterial({color:0xfadff2f, transparent:true, opacity:0.5});
var tool = new THREE.Mesh(Tool, toolM);

var Desk = new THREE.CubeGeometry(70,80,30);
var deskM1 = new THREE.MeshLambertMaterial({color:0xf6495ed, transparent:true, opacity:0.5});
var desk1 = new THREE.Mesh(Desk, deskM1);
var deskM2 = new THREE.MeshLambertMaterial({color:0x9370db, transparent:true, opacity:0.5});
var desk2 = new THREE.Mesh(Desk, deskM2);

var Body = new THREE.CylinderGeometry(0,10,20,50);
var bodyM = new THREE.MeshLambertMaterial({color:0xcd5c5c});
var body = new THREE.Mesh(Body, bodyM);
body.castShadow = true;
var Head = new THREE.SphereGeometry(8, 32, 32);
var headM = new THREE.MeshLambertMaterial({color:0xcd5c5c});
var head = new THREE.Mesh(Head, headM);
head.castShadow = true;

// windows.onload
function webGL() {
  renderer.setSize(window.innerWidth-400, window.innerHeight-200);
  document.getElementById('item').style.width = window.innerWidth-400 + 'px';
  renderer.setClearColor( 0x000000, 1 );
  document.getElementById('webGL').appendChild(renderer.domElement);
  document.getElementById('battle').style.width = window.innerWidth-400 + 'px';
  document.getElementById('battle').style.height = window.innerHeight-200 + 'px';


  room();

  camera.position.set(100, 150, 50);
  camera.lookAt(scene.position);//*

  var render = function () {
    requestAnimationFrame(render);

    key();
    if (diceState) {
      diceThrow();
    }

    if (mainHP <= 0) {
      location.href="over.html";
    }

    controls.update();
    renderer.render(scene, camera);
  };

  render();
}

var color = 1;
var clearCount = 20;
function clear() {
  var battle = document.getElementById('battle');
  if (color == 1) {
    battle.style.backgroundColor = "#fff";
    if (clearCount >= 10) {
      color = 2;
    }
  }else {
    battle.style.backgroundColor = "#000";
    color = 1;
  }
  clearCount--;
  if (clearCount === 0) {
    location.href="clear.html";
  }
  window.setTimeout(clear,200);
}

// ------------------------------------------------------------
// 部屋空間を作るイベント
// ------------------------------------------------------------
function room() {
  // 光の設置
  // 平行光
  var light = new THREE.AmbientLight(0x333333,1);
  light.position.set(0, 100, 0).normalize();
  scene.add( light );
  // 環境光
  var light2 = new THREE.DirectionalLight(0x333333,2);
  light2.position.set(0, 50, 0);
  scene.add( light2 );
  // スポットライト
  var spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(0, 100, 0);
  // スポットライトの影指定
  spotLight.target = head;
  spotLight.castShadow = true;
  scene.add( spotLight );

  // 床と壁の設置
  floor.position.set(0,0,0);
  scene.add(floor);
  wall1.position.set(0,50,-100);
  scene.add(wall1);
  wall2.position.set(0,50,100);
  scene.add(wall2);
  wall3.position.set(-100,50,0);
  scene.add(wall3);
  wall4.position.set(100,50,0);
  scene.add(wall4);

  // 各イベント領域の設置
  door.position.set(75,40,-50);
  scene.add(door);
  sofa.position.set(-75,40,75);
  scene.add(sofa);
  tool.position.set(75,40,75);
  scene.add(tool);
  desk1.position.set(-65,40,-75);
  scene.add(desk1);
  desk2.position.set(-65,40,-35);
  scene.add(desk2);

  // プレイヤーの設置
  body.position.set(0,10,0);
  scene.add(body);
  head.position.set(0,20,0);
  scene.add(head);
}

// キーボードの入力状態を記録する配列
var input_key_buffer = new Array();
//keyboard入力
//if( evt.keyCode == 37 )  x--;
//if( evt.keyCode == 39 )  x++;
//if( evt.keyCode == 40 )  y--;
//if( evt.keyCode == 38 )  y++;
// ------------------------------------------------------------
// キーボードを押したときに実行されるイベント
// ------------------------------------------------------------
document.onkeydown = function(e){
  if (e.keyCode == 32 && !input_key_buffer[e.keyCode]) {
    attack();
  }
  input_key_buffer[e.keyCode] = true;
  if (e.keyCode == 13 && !modalEnterFlag) {
    if (!selectEnterFlag) {
      enter();
    }else if(!selectEnterEventFlag){
      selectEnter();
    }else{
      diceEvent(false);
    }
  }
  if (selectArrowFlag) {
    // 上キーが押されているか調べる
  	if(e.keyCode == 38){
      selectArrowUp();
    }
    // 下キーが押されているか調べる
  	if(e.keyCode == 40){
      selectArrowDown();
  	}
  }
  if (modalPatternFlag) {
    if (e.keyCode == 49) {
      patternLoadJudge(1);
    }
    if(e.keyCode == 50){
      patternLoadJudge(2);
  	}
    if(e.keyCode == 51){
      patternLoadJudge(3);
  	}
  }
};
// ------------------------------------------------------------
// キーボードを離したときに実行されるイベント
// ------------------------------------------------------------
document.onkeyup = function (e){
  input_key_buffer[e.keyCode] = false;
};
// ------------------------------------------------------------
// ウィンドウが非アクティブになる瞬間に実行されるイベント
// ------------------------------------------------------------
window.onblur = function (){

	// 配列をクリアする
	input_key_buffer.length = 0;
};
// ------------------------------------------------------------
// キーボードが押されているか調べる関数
// ------------------------------------------------------------
function KeyIsDown(key_code){
	if(input_key_buffer[key_code])	return true;
	return false;
}

// ------------------------------------------------------------
// キーボード入力イベント
// ------------------------------------------------------------
var areaInFlagDoor = false;
var areaInFlagSofa = false;
var areaInFlagTool = false;
var areaInFlagDesk1 = false;
var areaInFlagDesk2 = false;
function key(){
	// 左キーが押されているか調べる
  if (!selectArrowFlag) {
  	if(KeyIsDown(37)){
      if (body.position.z < 90) {
        body.position.z += 1.5;
        head.position.z += 1.5;
      }
    }
  	// 上キーが押されているか調べる
  	if(KeyIsDown(38)){
      if (body.position.x > -90) {
        body.position.x -= 1.5;
        head.position.x -= 1.5;
      }
  	}
    // 右キーが押されているか調べる
  	if(KeyIsDown(39)){
      if (body.position.z > -90) {
        body.position.z -= 1.5;
        head.position.z -= 1.5;
      }
  	}
    // 下キーが押されているか調べる
  	if(KeyIsDown(40)){
      if (body.position.x < 90) {
        body.position.x += 1.5;
        head.position.x += 1.5;
      }
  	}
    inArea();
    inAreaLog();
  }
}

function inArea() {
  var picture = document.getElementById('picture');
  //Door
  if (body.position.x <= 90 && body.position.x >= 50 && body.position.z >= -85 && body.position.z <= -15) {
    if (!areaInFlagDoor) {
      scene.remove(door);
      doorM = new THREE.MeshLambertMaterial({emissive:0xcd853f, transparent:true, opacity:0.5});
      door = new THREE.Mesh(Door, doorM);
      door.position.set(75,40,-50);
      scene.add(door);
      areaInFlagDoor = true;
      picture.src = "labDoor.jpg";
    }
  }else{
    if (areaInFlagDoor) {
      scene.remove(door);
      doorM = new THREE.MeshLambertMaterial({color:0xcd853f, transparent:true, opacity:0.5});
      door = new THREE.Mesh(Door, doorM);
      door.position.set(75,40,-50);
      scene.add(door);
      areaInFlagDoor = false;
      picture.src = "labNormal.jpg";
    }
  }
  //sofa
  if (body.position.x >= -90 && body.position.x <= -50 && body.position.z <= 90 && body.position.z >= 50) {
    if (!areaInFlagSofa) {
      scene.remove(sofa);
      sofaM = new THREE.MeshLambertMaterial({emissive:0xf0e68c, transparent:true, opacity:0.5});
      sofa = new THREE.Mesh(Sofa, sofaM);
      sofa.position.set(-75,40,75);
      scene.add(sofa);
      areaInFlagSofa = true;
      picture.src = "labSofa.jpg";
    }
  }else{
    if (areaInFlagSofa) {
      scene.remove(sofa);
      sofaM = new THREE.MeshLambertMaterial({color:0xf0e68c, transparent:true, opacity:0.5});
      sofa = new THREE.Mesh(Sofa, sofaM);
      sofa.position.set(-75,40,75);
      scene.add(sofa);
      areaInFlagSofa = false;
      picture.src = "labNormal.jpg";
    }
  }
  //tool
  if (body.position.x <= 90 && body.position.x >= 50 && body.position.z <= 90 && body.position.z >= 50) {
    if (!areaInFlagTool) {
      scene.remove(tool);
      toolM = new THREE.MeshLambertMaterial({emissive:0xfadff2f, transparent:true, opacity:0.5});
      tool = new THREE.Mesh(Tool, toolM);
      tool.position.set(75,40,75);
      scene.add(tool);
      areaInFlagTool = true;
      picture.src = "labKizai.jpg";
    }
  }else{
    if (areaInFlagTool) {
      scene.remove(tool);
      toolM = new THREE.MeshLambertMaterial({color:0xfadff2f, transparent:true, opacity:0.5});
      tool = new THREE.Mesh(Tool, toolM);
      tool.position.set(75,40,75);
      scene.add(tool);
      areaInFlagTool = false;
      picture.src = "labNormal.jpg";
    }
  }
  //desk1
  if (body.position.x >= -90 && body.position.x <= -30 && body.position.z > -90 && body.position.z <= -60) {
    if (!areaInFlagDesk1) {
      scene.remove(desk1);
      deskM1 = new THREE.MeshLambertMaterial({emissive:0xf6495ed, transparent:true, opacity:0.5});
      desk1 = new THREE.Mesh(Desk, deskM1);
      desk1.position.set(-65,40,-75);
      scene.add(desk1);
      areaInFlagDesk1 = true;
      picture.src = "labDesk.jpg";
    }
  }else{
    if (areaInFlagDesk1) {
      scene.remove(desk1);
      deskM1 = new THREE.MeshLambertMaterial({color:0xf6495ed, transparent:true, opacity:0.5});
      desk1 = new THREE.Mesh(Desk, deskM1);
      desk1.position.set(-65,40,-75);
      scene.add(desk1);
      areaInFlagDesk1 = false;
      picture.src = "labNormal.jpg";
    }
  }
  //desk2
  if (body.position.x >= -90 && body.position.x <= -30 && body.position.z >= -50 && body.position.z <= -20) {
    if (!areaInFlagDesk2) {
      scene.remove(desk2);
      deskM2 = new THREE.MeshLambertMaterial({emissive:0x9370db, transparent:true, opacity:0.5});
      desk2 = new THREE.Mesh(Desk, deskM2);
      desk2.position.set(-65,40,-35);
      scene.add(desk2);
      areaInFlagDesk2 = true;
      picture.src = "labDesk.jpg";
    }
  }else{
    if (areaInFlagDesk2) {
      scene.remove(desk2);
      deskM2 = new THREE.MeshLambertMaterial({color:0x9370db, transparent:true, opacity:0.5});
      desk2 = new THREE.Mesh(Desk, deskM2);
      desk2.position.set(-65,40,-35);
      scene.add(desk2);
      areaInFlagDesk2 = false;
      picture.src = "labNormal.jpg";
    }
  }
}

// ------------------------------------------------------------
// 選択し選択イベント
// ------------------------------------------------------------
// 選択イベント
var selectEnterFlag = false;
var selectEnterEventFlag = false;
function selectEnter() {
  var radio = document.getElementsByName('radio');
  for (var i = 0; i < radio.length; i++) {
    if (radio[i].checked) {
      var log = document.getElementById('log');
      switch (radio[i].value) {
        case '0': //戻る
          log.innerHTML = "たんさくにもどります。";
          selectEnterFlag = false;
          selectArrowFlag = false;
          break;
          default:
        case '1': //冷蔵庫
          iceOpen();
          break;
        case '2': //ソファ
          sofaUp();
          break;
        case '3': //引出
          shelfOpen();
          selectEnterFlag = false;
          selectArrowFlag = false;
          break;
        case '4': //ロッカー
          lockerOpen();
          selectEnterFlag = false;
          selectArrowFlag = false;
          break;
        case '5': //剣
         swordHave();
         selectEnterFlag = false;
         selectArrowFlag = false;
         break;
        case '6': //斧
         axeHave();
         selectEnterFlag = false;
         selectArrowFlag = false;
         break;
        case '7': //弓
         arrowHave();
         selectEnterFlag = false;
         selectArrowFlag = false;
         break;
        case '8': //宝玉
         ballOn();
         break;
        case '10': //二値化
         nichika();
         break;
        case '11': //差分
         sabun();
         selectEnterFlag = false;
         selectArrowFlag = false;
         break;
        case '12': //パターンマッチング
         pattern();
         break;
        case '01': //ドアネクスト
         doorOpen();
         break;
        case '02': //バトルネクスト
         log.innerHTML = "バトルをかいしします。";
         war();
         break;
        case '03':
         moveDoor(); //ドアゴゴゴ
         selectEnterFlag = false;
         selectArrowFlag = false;
         break;
      }
    }
  }
}

// 選択下イベント
var selectArrowFlag = false;
function selectArrowDown() {
  var radio = document.getElementsByName('radio');
  for (var i = 0; i < radio.length; i++) {
    if (radio[i].checked && i != radio.length - 1) {
      i++;
      radio[i].checked = "true";
      break;
    }
  }
}

// 選択上イベント
function selectArrowUp() {
  var radio = document.getElementsByName('radio');
  for (var i = 0; i < radio.length; i++) {
    if (radio[i].checked && i !== 0) {
      i--;
      radio[i].checked = "true";
      break;
    }
  }
}

// 選択用ラジオボタン生成
function makeRadio(value,inner) {
  var log = document.getElementById('log');
  log.innerHTML += "<br /><input type='radio' name='radio' value='" + value + "'>";
  log.innerHTML += "<label>｝"+inner+"</label>";
}

// 戻るラジオボタン生成
function makeRadioReturn() {
  var log = document.getElementById('log');
  log.innerHTML += "<br /><input type='radio' name='radio' value='0' checked='checked'>";
  log.innerHTML += "<label>｝たんさくにもどる</label>";
}

// 次へラジオボタン生成
function makeRadioNext(num) {
  var log = document.getElementById('log');
  log.innerHTML += "<br /><input type='radio' name='radio' value='0"+num+"' checked='checked'>";
  log.innerHTML += "<label>｝つぎへ</label>";
}

// モーダル
modalEnterFlag = false;
function modalFlag(flag) {
  modalEnterFlag = flag;
}


// ------------------------------------------------------------
// プレイヤー情報の取得
// ------------------------------------------------------------
function getQuery() {
    var query = window.location.search.substring(1);
    var element = query.split("=");
    return decodeURIComponent( element[ 1 ] );
}

var playerState = new Array(3);

function user() {
  var player = document.getElementById('player'+getQuery());
  var playerImg = document.getElementById('playerImg'+getQuery());
  player.style.display = "block";
  playerImg.style.display = "block";
  if (getQuery() == 1) { //バランス
    playerState[0] = 5;
    playerState[1] = 5;
    playerState[2] = 5;
  }
  if (getQuery() == 2) { //体力
    playerState[0] = 8;
    playerState[1] = 2;
    playerState[2] = 5;
  }
  if (getQuery() == 3) { //知力
    playerState[0] = 4;
    playerState[1] = 7;
    playerState[2] = 4;
  }
  if (getQuery() == 4) { //精神
    playerState[0] = 3;
    playerState[1] = 5;
    playerState[2] = 7;
  }
  if (getQuery() == 10) { //チート
    playerState[0] = 10;
    playerState[1] = 10;
    playerState[2] = 10;
  }
}

// ------------------------------------------------------------
// Enterキーイベント
//<span onclick="diceEvent(true)">しらべる</span>
// ------------------------------------------------------------
var enterFlag = false;
function enter() {
  var log = document.getElementById('log');
  if (!enterFlag) {
    //Doorエリア
    if (areaInFlagDoor) {
      log.innerHTML += 'かたくとざされたどあ。<br />ちからをこめても<br />びくともしない。';
      if (itemState[1]) {
        log.innerHTML += '<br />よこにロッカーがある。';
        makeRadio(4,"ロッカーをひらく");
      }
      if (patternFlag && (itemState[5] || itemState[6] || itemState[7])) {
        log.innerHTML += '<br />そのちゅうしんに<br />';
        log.innerHTML += 'まるいくぼみができている。';
        makeRadio(8,"ほうぎょくをはめる");
      }
      makeRadioReturn();
      selectEnterFlag = true;
      selectArrowFlag = true;
      enterFlag = true;
    }
    //Sofaエリア
    if (areaInFlagSofa) {
      log.innerHTML += 'あまいにおいと<br />コーヒーのかおりがたちこめる。';
      log.innerHTML += 'れいぞうこと<br />やわらかいそふぁがおいてある。';
      if (!itemState[4] && !itemUseState[4]) {
        makeRadio(1,"れいぞうこをひらく");
      }
      if (!itemState[0] && !itemUseState[0]) {
        makeRadio(2,"そふぁをもちあげる");
      }
      makeRadioReturn();
      selectEnterFlag = true;
      selectArrowFlag = true;
      enterFlag = true;
    }
    //Toolエリア
    if (areaInFlagTool) {
      log.innerHTML += 'さまざまなきざいがある。<br />';
      log.innerHTML += 'ぼーどにはがぞうしょりをしろ<br />とかかれている。';
      if (itemState[2] && itemState[3]) {
        if (!nichikaFlag) {
          makeRadio(10,"しろくろにする");
        }
        if (!sabunFlag) {
          makeRadio(11,"さぶんをとる");
        }
        if (!patternFlag) {
          makeRadio(12,"パターンをさがす");
        }
      }
      makeRadioReturn();
      selectEnterFlag = true;
      selectArrowFlag = true;
      enterFlag = true;
    }
    //Desk1エリア
    if (areaInFlagDesk1) {
      log.innerHTML += 'あれたつくえときれいなつくえがならんでいる。';
      if (!itemState[5] && !itemState[6] && !itemState[7]) {
        log.innerHTML += '<br />たてかけられたぶきがある。';
        makeRadio(5,"けんをてにとる");
        makeRadio(6,"おのをてにとる");
        makeRadio(7,"ゆみをてにとる");
      }
      makeRadioReturn();
      selectEnterFlag = true;
      selectArrowFlag = true;
      enterFlag = true;
    }
    //Desk2エリア
    if (areaInFlagDesk2) {
      log.innerHTML += 'あれたつくえと<br />';
      log.innerHTML += 'きれいなつくえが<br />ならんでいる。<br />';
      log.innerHTML += 'したにはひきだしがある。';
      if (itemState[0]) {
        makeRadio(3,"ひきだしをひらく");
      }
      makeRadioReturn();
      selectEnterFlag = true;
      selectArrowFlag = true;
      enterFlag = true;
    }
  }
}

// ------------------------------------------------------------
// エリアin時のログ情報
// ------------------------------------------------------------
var areaLogFlag = false;
function inAreaLog() {
  var log = document.getElementById('log');
  //Doorエリア
  if (!areaLogFlag) {
    if (areaInFlagDoor) {
      log.innerHTML = '＊どあエリア<br />';
      areaLogFlag = true;
    } else if (areaInFlagSofa) {   //Sofaエリア
      log.innerHTML = '＊きゅうけいエリア<br />';
      areaLogFlag = true;
    } else if (areaInFlagTool) {  //Toolエリア
      log.innerHTML = '＊きざいエリア<br />';
      areaLogFlag = true;
    } else if (areaInFlagDesk1) {  //Desk1エリア
      log.innerHTML = '＊おくのつくえエリア<br />';
      areaLogFlag = true;
    } else if (areaInFlagDesk2) {  //Desk2エリア
      log.innerHTML = '＊てまえのつくえエリア<br />';
      areaLogFlag = true;
    }
  }else if(!areaInFlagDoor && !areaInFlagSofa && !areaInFlagTool && !areaInFlagDesk1 && !areaInFlagDesk2) {
    log.innerHTML = '';
    areaLogFlag = false;
    enterFlag = false;
  }
}

// ------------------------------------------------------------
// ダイスを投げたときのイベント
// ------------------------------------------------------------
var diceState = false;
function diceEvent(e) {
  diceState = e;
  if(diceThrowState){
    if (!diceState) {
      judge();
    }
  }
}
var diceThrowState = false;
// ------------------------------------------------------------
// ダイスを投げたときのイベント
// ------------------------------------------------------------
var diceNumber = 0;
function diceThrow() {
  var dice = document.getElementById('dice');
  var rand = Math.floor( Math.random() * 8 ) + 1 ;
  dice.innerHTML = rand;
  diceNumber = rand;
}
// ------------------------------------------------------------
// ダイス判定
// ------------------------------------------------------------
var judgeState = 0;
//開始
function judgeStart(e) {
  diceThrowState = true;
  diceEvent(true);
  judgeState = e;
}
// 判定
function judge() {
  if (playerState[judgeState-1] >= diceNumber) {
    judgeEvent(true,judgeState);
  }else {
    sound('btnNo');
    judgeEvent(false,judgeState);
  }
  judgeState = 0;
}

// ------------------------------------------------------------
// アイテムイベント
// ------------------------------------------------------------
var itemState = new Array(8);
var itemUseState = new Array(8);
// アイテムゲット
function itemEventGet(e) {
  sound('btnYes');
  var items = document.getElementsByClassName('itemList');
  itemState[e] = true;
  items[e].style.opacity = 1;
}

// アイテム使用
function itemEventUse(e) {
  var items = document.getElementsByClassName('itemList');
  itemState[e] = false;
  itemUseState[e] = true;
  items[e].style.opacity = 0;
}

// ------------------------------------------------------------
// 各イベント
// ------------------------------------------------------------
//引出をあける
function shelfOpen() {
  itemEventUse(0);
  var log = document.getElementById('log');
  log.innerHTML = '＊てまえのつくえエリア<br />';
  log.innerHTML += 'なかから<br />ひとつめのがぞうと<br />ロッカーのかぎを<br />みつけた。';
  itemEventGet(2);
  itemEventGet(1);
  document.getElementById('imageOne').style.display = "block";
  modalOpen('rockerKey');
  webCamera('canvas1','img1');
}
// ロッカーを開ける
var eventKind = 0;
function lockerOpen() {
  itemEventUse(1);
  var log = document.getElementById('log');
  log.innerHTML = '＊どあエリア<br />';
  log.innerHTML += 'なかから<br />ふたつめのがぞうをみつけた。';
  itemEventGet(3);
  document.getElementById('imageTwo').style.display= "block";
  modalOpen('pictureSecond');
  webCamera('canvas2','img2');
}
//けんを取る
function swordHave() {
  itemEventGet(5);
  var log = document.getElementById('log');
  log.innerHTML = '＊おくのつくえエリア<br />';
  log.innerHTML += 'ぎんのつるぎを<br />てにいれた。<br />';
  log.innerHTML += 'ほかのぶきは<br />くだけちってしまった。';
  modalOpen('sword');
}
//おのを取る
function axeHave() {
  itemEventGet(6);
  var log = document.getElementById('log');
  log.innerHTML = '＊おくのつくえエリア<br />';
  log.innerHTML += 'てつのおのを<br />てにいれた。<br />';
  log.innerHTML += 'ほかのぶきは<br />くだけちってしまった。';
  modalOpen('axe');
}
//ゆみを取る
function arrowHave() {
  itemEventGet(7);
  var log = document.getElementById('log');
  log.innerHTML = '＊おくのつくえエリア<br />';
  log.innerHTML += 'きのゆみやを<br />てにいれた。<br />';
  log.innerHTML += 'ほかのぶきは<br />くだけちってしまった。';
  modalOpen('arrow');
}
//ほうぎょくをはめる
function ballOn() {
  itemEventUse(4);
  var log = document.getElementById('log');
  log.innerHTML = '＊どあエリア<br />';
  log.innerHTML += 'とびらはおとをあげて<br />ひらいていく。<br />';
  log.innerHTML += 'やっとここからでられる！';
  sound('btnHougyoku');
  makeRadioNext(1);
}
//敵出現
function doorOpen() {
  var log = document.getElementById('log');
  log.innerHTML = '＊どあエリア<br />';
  log.innerHTML += 'とおもったそのとき、<br />とびらのむこうから<br />';
  log.innerHTML += 'いぎょうのせいぶつが<br />あらわれた！';
  makeRadioNext(2);
}
// ソファを持ちあげる
function sofaUp() {
  var log = document.getElementById('log');
  log.innerHTML = '＊きゅうけいエリア<br />';
  log.innerHTML += 'たいりょくはんていを<br />おこないます。<br />';
  log.innerHTML += 'えんたーをおしてください。';
  selectEnterEventFlag = true;
  eventKind = 1;
  judgeStart(1);
}
//冷蔵庫を開ける
function iceOpen() {
  var log = document.getElementById('log');
  log.innerHTML = '＊きゅうけいエリア<br />';
  log.innerHTML += 'せいしんはんていを<br />おこないます。<br />';
  log.innerHTML += 'えんたーをおしてください。';
  selectEnterEventFlag = true;
  eventKind = 2;
  judgeStart(3);
}

function judgeEvent(e,state) {
  diceThrowState = false;
  var log = document.getElementById('log');
  log.innerHTML += '<br />';
  if (e) {
    log.innerHTML += 'せいこうしました！<br />';
    switch (eventKind) {
      case 1:
        itemEventGet(0);
        log.innerHTML += 'そふぁのしたから<br />ひきだしのカギをみつけた。';
        modalOpen('pullKey');
        break;
      case 2:
        itemEventGet(4);
        log.innerHTML += 'れいぞうこのなかから<br />なぞのほうぎょくをみつけた。';
        modalOpen('piece');
        break;
      case 3:
        nichikaLoad();
        sound('btnImg');
        log.innerHTML = '＊きざいエリア<br />';
        log.innerHTML += 'せいこうしました！<br />';
        log.innerHTML += 'がぞうしょりきざいの<br />つかいかたをおぼえた。<br />';
        log.innerHTML += 'がぞうをしろくろにできた。<br />';
        log.innerHTML += 'しろくろにしたら<br />いろのこいとこと<br />うすいとこがわかりやすい！';
        nichikaFlag = true;
        break;
    }
  } else {
    log.innerHTML += 'しっぱいしました。<br />';
    switch (state) {
      case 1:
        var hp = document.getElementsByClassName('HP');
        hp[getQuery()-1].innerHTML = hp[getQuery()-1].innerHTML.slice(0,-1);
        log.innerHTML += 'たいりょくがひとつへりました。';
        playerState[state-1]--;
        if (playerState[state-1] <= 0) {
          location.href="over.html";
        }
        break;
      case 2:
        var mp = document.getElementsByClassName('MP');
        mp[getQuery()-1].innerHTML = mp[getQuery()-1].innerHTML.slice(0,-1);
        log.innerHTML += 'ちりょくがひとつへりました。';
        playerState[state-1]--;
        if (playerState[state-1] <= 0) {
          location.href="over.html";
        }
        break;
      case 3:
        var sp = document.getElementsByClassName('SP');
        sp[getQuery()-1].innerHTML = sp[getQuery()-1].innerHTML.slice(0,-1);
        log.innerHTML += 'せいしんがひとつへりました。';
        playerState[state-1]--;
        if (playerState[state-1] <= 0) {
          location.href="over.html";
        }
        break;
    }
  }
  selectEnterFlag = false;
  selectArrowFlag = false;
  selectEnterEventFlag = false;
}

// ------------------------------------------------------------
// 画像処理イベント
// ------------------------------------------------------------
var nichikaFlag = false;
var sabunFlag = false;
var patternFlag = false;
// 二値化
function nichika() {
  var log = document.getElementById('log');
  log.innerHTML = '＊きざいエリア<br />';
  log.innerHTML += 'ちりょくはんていを<br />おこないます。<br />';
  log.innerHTML += 'えんたーをおしてください。';
  selectEnterEventFlag = true;
  eventKind = 3;
  judgeStart(2);
}
// 背景差分
function sabun() {
  var log = document.getElementById('log');
  if (nichikaFlag) {
    sound('btnImg');
    log.innerHTML = '＊きざいエリア<br />';
    log.innerHTML += 'しろくろがぞうから<br />さぶんをとりました。<br />';
    log.innerHTML += 'にたがぞうでも<br />すこしのちがいが<br />すごくわかる！<br />';
    sabunFlag = true;
    sabunLoad();
  } else {
    log.innerHTML = '＊きざいエリア<br />';
    log.innerHTML += 'まだおこなえません。<br />';
    selectEnterFlag = false;
    selectArrowFlag = false;
  }
}
// パターン認識
function pattern() {
  var log = document.getElementById('log');
  if (sabunFlag) {
    log.innerHTML = '＊きざいエリア<br />';
    log.innerHTML += 'さぶんがぞうから<br />パターンをさがします。<br />';
    log.innerHTML += 'るいじぱたーんをせんたくしてください。<br />';
    patternLoad();
  } else {
    log.innerHTML = '＊きざいエリア<br />';
    log.innerHTML += 'まだおこなえません。<br />';
    selectEnterFlag = false;
    selectArrowFlag = false;
  }
}
function moveDoor() {
  var log = document.getElementById('log');
  log.innerHTML = '＊きざいエリア<br />';
  log.innerHTML += 'とびらのほうから<br />ゴゴゴゴゴとおとがした。<br />';
  log.innerHTML += 'ふたつのがぞうは<br />';
  log.innerHTML += 'やくめをはたしたように<br />きえていった。';
  itemEventUse(2);
  itemEventUse(3);
  patternFlag = true;
  sound('btnDoor');
}

function correctPattern() {
  sound('btnImg');
  modalOutTarget('pattern');
  var log = document.getElementById('log');
  log.innerHTML = '＊きざいエリア<br />';
  log.innerHTML += 'せいかいのパターンをみつけた。<br />';
  log.innerHTML += 'にたがぞうや<br />ぶぶんてきににているところを<br />さがせるんだ！';
  makeRadioNext(3);
}

// ------------------------------------------------------------
// バトルイベント
// ------------------------------------------------------------
var warCount = 3;
function war() {
  var webGL = document.getElementById('webGL');
  webGL.style.width = window.innerWidth-400 + "px";
  webGL.style.height = window.innerHeight-200 + "px";
  if (warCount === 0) {
    document.getElementById('bgm').src = "bgm4.mp3";
    webGL.style.display = 'none';
    var battle = document.getElementById('battle');
    battle.style.display = 'block';
    var sub1 = document.getElementById('sub1');
    var rand = Math.floor( Math.random() * 10 ) + 1 ;
    sub1.src = "battle/sub1/" + rand + ".gif";
    var sub2 = document.getElementById('sub2');
    rand = Math.floor( Math.random() * 10 ) + 1 ;
    sub2.src = "battle/sub2/" + rand + ".gif";
    var main = document.getElementById('main');
    rand = Math.floor( Math.random() * 3 ) + 1 ;
    itemState[6] = true;
    if (itemState[5]) {
      main.src = "battle/main/sword" + rand + ".gif";
    }else if (itemState[6]) {
      main.src = "battle/main/axe" + rand + ".gif";
    }else if (itemState[7]) {
      main.src = "battle/main/arrow" + rand + ".gif";
    }
    var enemy = document.getElementById('enemy');
    rand = Math.floor( Math.random() * 10 ) + 1 ;
    enemy.src = "battle/enemy/" + rand + ".gif";
    //HP設定
    var stateSub1 = document.getElementById('stateSub1');
    stateSub1.style.width = sub1HP + 'px';
    var stateSub2 = document.getElementById('stateSub2');
    stateSub2.style.width = sub2HP + 'px';
    var stateMain = document.getElementById('stateMain');
    stateMain.style.width = mainHP + 'px';
    var stateEnemy = document.getElementById('stateEnemy');
    stateEnemy.style.width = enemyHP + 'px';
    attackSub();
    attackEnemy();
  }
  if (warCount > 0) {
    webGL.innerHTML = "<div id='countDown'></div>";
    var countDown = document.getElementById('countDown');
    countDown.style.display = 'block';
    switch (warCount) {
      case 3:
        countDown.innerHTML = "３";
        break;
      case 2:
        countDown.innerHTML = "２";
        break;
      case 1:
        countDown.innerHTML = "１";
        break;
    }
    warCount--;
    window.setTimeout(war,1000);
  }
}

var sub1HP = 100;
var sub2HP = 100;
var mainHP = 300;
var enemyHP = 600;
function attack() {
  var battle = document.getElementById('battle');
  if (enemyHP > 0) {
    if (itemState[5]) {
      sound('btnP1');
    }else if (itemState[6]) {
      sound('btnP2');
    }else if (itemState[7]) {
      sound('btnP3');
    }
    var damage = Math.floor( Math.random() * 10 ) + 5;
    if (mainHP > 0) {
      enemyHP = enemyHP - damage;
      if (getQuery() == 10) {
        damage = 50;
        enemyHP = enemyHP - damage;
      }
      if (enemyHP < 0) {
        enemyHP = 0;
      }
      var stateEnemy = document.getElementById('stateEnemy');
      stateEnemy.style.width = enemyHP + 'px';
      var damageEnemy = document.getElementById('dEMain');
      damageEnemy.innerHTML = "Main Attack!:"+damage;
      var div = document.createElement('div');
      div.classList.add('damageBig');
      div.style.top = (Math.floor( Math.random() * 500 ) + 20) + 'px';
      div.style.left = (Math.floor( Math.random() * 900 ) + 100) + 'px';
      if (damage == 50) {
        div.style.fontSize = 14*20 + 'px';
      }else{
        div.style.fontSize = damage*20 + 'px';
      }
      window.setTimeout(function(){
        div.style.opacity = 1;
      },100);
      window.setTimeout(function(){
        div.style.opacity = 0;
      },1100);
      div.innerHTML = damage;
      battle.appendChild(div);
    }
  }
  if (enemyHP <= 0) {
    soundStop('bgm');
    sound('btnClear');
    battle.style.backgroundColor = "#fff";
    clear();
  }
}


function attackSub() {
  sound('btnS');
  var damage = Math.floor( Math.random() * 4 ) + 2;
  enemyHP = enemyHP - damage;
  if (enemyHP < 0) {
    enemyHP = 0;
  }
  var stateEnemy = document.getElementById('stateEnemy');
  stateEnemy.style.width = enemyHP + 'px';
  var damageEnemy = document.getElementById('dESub');
  damageEnemy.innerHTML = "　/　Sub Attack! : "+damage+"×2";
  if (enemyHP > 0) {
    if (sub1HP > 0) {
      window.setTimeout(attackSub,1000);
    }else{
      damageEnemy.innerHTML = "　/　Sub Attack! : NONE";
    }
  }
}

function attackEnemy() {
  sound('btnE');
  var damage = Math.floor( Math.random() * 20 ) + 10;
  sub1HP -= 10;
  var stateSub1 = document.getElementById('stateSub1');
  stateSub1.style.width = sub1HP + 'px';
  sub2HP -= 10;
  var stateSub2 = document.getElementById('stateSub2');
  stateSub2.style.width = sub2HP + 'px';
  mainHP -= 15;
  var stateMain = document.getElementById('stateMain');
  stateMain.style.width = mainHP + 'px';
  var damageParty = document.getElementById('damageParty');
  damageParty.innerHTML = "FIRE BREATH : "+damage+" ALL DAMAGE!!!";
  if (enemyHP > 0) {
    window.setTimeout(attackEnemy,1200);
  }
}

function nichikaLoad() {
  var img1 = document.getElementById('img1');
  var img2 = document.getElementById('img2');
  // ひとつめ
  var canvas1 = document.createElement('canvas');
  var one = document.getElementById('imageOne');
  one.innerHTML = "ひとつめのがぞう：しろくろ";
  one.appendChild(canvas1);
  var context1 = canvas1.getContext('2d');
  var width = img1.width;
  var height = img1.height;
  canvas1.width = width;
  canvas1.height = height;
  context1.drawImage(img1, 0, 0);

  var srcData1 = context1.getImageData(0, 0, width, height);
  var dstData1 = context1.createImageData(width, height);
  var src1 = srcData1.data;
  var dst1 = dstData1.data;
  faceFilter(src1, dst1, width, height);
  context1.putImageData(dstData1, 0, 0);

  // ひとつめモーダル
  var canvas01 = document.createElement('canvas');
  var oneModal = document.getElementById('nichikaInner');
  oneModal.appendChild(canvas01);
  var context01 = canvas01.getContext('2d');
  canvas01.width = width;
  canvas01.height = height;
  context01.drawImage(img1, 0, 0);

  var srcData01 = context01.getImageData(0, 0, width, height);
  var dstData01 = context01.createImageData(width, height);
  var src01 = srcData01.data;
  var dst01 = dstData01.data;
  faceFilter(src01, dst01, width, height);
  context01.putImageData(dstData01, 0, 0);

  // ふたつめ
  var canvas2 = document.createElement('canvas');
  var two = document.getElementById('imageTwo');
  two.innerHTML = "ふたつめのがぞう：しろくろ";
  two.appendChild(canvas2);
  var context2 = canvas2.getContext('2d');
  canvas2.width = width;
  canvas2.height = height;
  context2.drawImage(img2, 0, 0);

  var srcData2 = context2.getImageData(0, 0, width, height);
  var dstData2 = context2.createImageData(width, height);
  var src2 = srcData2.data;
  var dst2 = dstData2.data;
  faceFilter(src2, dst2, width, height);
  context2.putImageData(dstData2, 0, 0);

  // ふたつめモーダル
  var canvas02 = document.createElement('canvas');
  var twoModal = document.getElementById('nichikaInner');
  twoModal.appendChild(canvas02);
  var context02 = canvas02.getContext('2d');
  canvas02.width = width;
  canvas02.height = height;
  context02.drawImage(img2, 0, 0);

  var srcData02 = context02.getImageData(0, 0, width, height);
  var dstData02 = context02.createImageData(width, height);
  var src02 = srcData02.data;
  var dst02 = dstData02.data;
  faceFilter(src02, dst02, width, height);
  context02.putImageData(dstData02, 0, 0);

  modalOpen('nichika');

}

//グレースケール変換関数
var grayFilter = function(src, dst, width, height) {
    for (var i = 0; i < height; i++) {
        for (var j = 0; j < width; j++) {
            var idx = (j + i * width) * 4;
            var gray = (src[idx] + src[idx + 1] + src[idx + 2]) / 3;
            if (gray > 125) {
              gray = 0;
            }else {
              gray = 255;
            }
            dst[idx] = gray;
            dst[idx + 1] = gray;
            dst[idx + 2] = gray;
            dst[idx + 3] = src[idx + 3];
        }
    }
};

//肌色検出2値化関数
var faceFilter = function(src, dst, width, height) {
  for (var i = 0; i < height; i++) {
    for (var j = 0; j < width; j++) {
      var idx = (j + i * width) * 4;
      var r = src[idx];
      var g = src[idx+1];
      var b = src[idx+2];
      //RGB→HSV変換
      //maxの判定
      var max = r;
      if (max < g) {
        max = g;
      }
      if (max < b) {
        max = b;
      }
      //minの判定
      var min = r;
      if (min > g) {
        min = g;
      }
      if (min > b) {
        min = b;
      }
      //色彩を求める
      var H;
      if (max == r) { //rが最大値
        H = 60 * ((g-b)/(max-min));
      }else if (max == g) { //gが最大値
        H = 60 * ((b-r)/(max-min))+120;
      }else{ //bが最大値
        H = 60 * ((r-g)/(max-min))+240;
      }
      if (r == g && r == b) { //3つが同じ値
        H = 0;
      }
      if (H < 0) { //色相がマイナスの場合は360を加算
        H += 360;
      }
      //彩度を求める
      var S = (max-min) / max;
      //明度を求める
      var V = max;
      //RGB→YCbCr変換
      var Y = 0.299 * r + 0.587 * g + 0.114 * b;
      var Cb = (-0.172) * r - 0.339 * g + 0.511 * b;
      var Cr = 0.511 * r - 0.428 * g - 0.083 * b;
      //肌色の判定
      if ((H < 80 || H > 150) && (Cb > -100 && Cb < -5) && (Cr > 5 && Cr < 100)) {
        dst[idx] = 255;
        dst[idx + 1] = 255;
        dst[idx + 2] = 255;
      }else {
        dst[idx] = 0;
        dst[idx + 1] = 0;
        dst[idx + 2] = 0;
      }
      dst[idx + 3] = 255;
    }
  }
};

//差分取得
var sabunFilter = function(dst1, dst2, dst3){
  for (var i = 0; i < dst1.length; i++) {
    if (i%4 !== 3) {
      dst3[i] = dst2[i] - dst1[i];
    }else{
      dst3[i] = 255;
    }
  }
};

function sabunLoad() {
  var img1 = document.getElementById('img1');
  var img2 = document.getElementById('img2');
  var canvas1 = document.createElement('canvas');
  var one = document.getElementById('imageOne');
  one.innerHTML = "ひとつめのがぞう：しろくろ";
  one.appendChild(canvas1);
  var context1 = canvas1.getContext('2d');
  var width = img1.width;
  var height = img1.height;
  canvas1.width = width;
  canvas1.height = height;
  context1.drawImage(img1, 0, 0);

  var srcData1 = context1.getImageData(0, 0, width, height);
  var dstData1 = context1.createImageData(width, height);
  var src1 = srcData1.data;
  var dst1 = dstData1.data;
  faceFilter(src1, dst1, width, height);
  context1.putImageData(dstData1, 0, 0);

  var canvas2 = document.createElement('canvas');
  var two = document.getElementById('imageTwo');
  two.innerHTML = "ふたつめのがぞう：しろくろ";
  two.appendChild(canvas2);
  var context2 = canvas2.getContext('2d');
  canvas2.width = width;
  canvas2.height = height;
  context2.drawImage(img2, 0, 0);

  var srcData2 = context2.getImageData(0, 0, width, height);
  var dstData2 = context2.createImageData(width, height);
  var src2 = srcData2.data;
  var dst2 = dstData2.data;
  faceFilter(src2, dst2, width, height);
  context2.putImageData(dstData2, 0, 0);

  var canvas3 = document.createElement('canvas');
  one.innerHTML = "しろくろさぶんがぞう";
  two.innerHTML = "";
  one.appendChild(canvas3);
  var context3 = canvas3.getContext('2d');
  canvas3.width = width;
  canvas3.height = height;
  var dstData3 = context3.createImageData(width, height);
  var dst3 = dstData3.data;
  sabunFilter(dst1, dst2, dst3);
  context3.putImageData(dstData3, 0, 0);

  // モーダル
  var canvas03 = document.createElement('canvas');
  var modal = document.getElementById('sabunInner');
  modal.appendChild(canvas03);
  var context03 = canvas03.getContext('2d');
  canvas03.width = width;
  canvas03.height = height;
  var dstData03 = context03.createImageData(width, height);
  var dst03 = dstData03.data;
  sabunFilter(dst1, dst2, dst03);
  context03.putImageData(dstData03, 0, 0);
  modalOpen('sabun');
}

//パターンマッチング
var patternMatch = function(dst3, dstP, width, height, widthP, heightP) {
  for (var i = 0; i < (height - heightP); i++) {
    for (var j = 0; j < (width - widthP); j++) {
      var breakFlag = false;
      for (var iP = 0; iP < heightP; iP++) {
        for (var jP = 0; jP < widthP; jP++) {
          if (dst3[(j+(i+iP)*width+jP)*4] == dstP[(jP+iP*widthP)*4] ){
            if (jP == widthP-1 && iP == heightP-1) {
              return true;
            }
          }else{
            breakFlag = true;
            break;
          }
        }
        if (breakFlag) {
          break;
        }
      }
    }
  }
  return false;
};

//パターン取得
var patternGet = function(dst3, dstP, widthP, heightP, start, width, height) {
  for (var i = 0; i < heightP; i++) {
    for (var j = 0; j < widthP*4; j++) {
      var value = dst3[(j+start*4)+(((i+start)*width)*4)];
      dstP[j+(i*widthP*4)] = value;
    }
  }
};

//ダミーパターンの作成
var dummyPatternGet = function(dst3, dstP, widthP, heightP, start, width, height){
  for (var i = 0; i < heightP; i++) {
    for (var j = 0; j < widthP*4; j+=4) {
      for (var l = 0; l < 4; l++) {
        var value = dst3[(j+l+start*4)+(((i+start)*width)*4)];
        if (i%7 === 0 && j%48 === 0) {
          value = 255;
        }
        dstP[j+l+(i*widthP*4)] = value;
      }
    }
  }
};

var startImagePoint =  Math.floor( Math.random() * 40 ) + 130;

function patternLoad() {
  var img1 = document.getElementById('img1');
  var img2 = document.getElementById('img2');
  document.getElementById('pattern').style.display = "block";
  var canvas1 = document.createElement('canvas');
  var one = document.getElementById('imageOne');
  one.innerHTML = "ひとつめのがぞう：しろくろ";
  one.appendChild(canvas1);
  var context1 = canvas1.getContext('2d');
  var width = img1.width;
  var height = img1.height;
  canvas1.width = width;
  canvas1.height = height;
  context1.drawImage(img1, 0, 0);

  var srcData1 = context1.getImageData(0, 0, width, height);
  var dstData1 = context1.createImageData(width, height);
  var src1 = srcData1.data;
  var dst1 = dstData1.data;
  faceFilter(src1, dst1, width, height);
  context1.putImageData(dstData1, 0, 0);

  var canvas2 = document.createElement('canvas');
  var two = document.getElementById('imageTwo');
  two.innerHTML = "ふたつめのがぞう：しろくろ";
  two.appendChild(canvas2);
  var context2 = canvas2.getContext('2d');
  canvas2.width = width;
  canvas2.height = height;
  context2.drawImage(img2, 0, 0);

  var srcData2 = context2.getImageData(0, 0, width, height);
  var dstData2 = context2.createImageData(width, height);
  var src2 = srcData2.data;
  var dst2 = dstData2.data;
  faceFilter(src2, dst2, width, height);
  context2.putImageData(dstData2, 0, 0);

  var canvas3 = document.createElement('canvas');
  one.innerHTML = "しろくろさぶんがぞう";
  two.innerHTML = "";
  one.appendChild(canvas3);
  var context3 = canvas3.getContext('2d');
  canvas3.width = width;
  canvas3.height = height;
  var dstData3 = context3.createImageData(width, height);
  var dst3 = dstData3.data;
  sabunFilter(dst1, dst2, dst3);
  context3.putImageData(dstData3, 0, 0);

  var modal = document.getElementById('patternInner');
  var canvasP = document.createElement('canvas');
  canvasP.setAttribute('onclick','patternLoadJudge(1)');
  modal.appendChild(canvasP);
  var contextP = canvasP.getContext('2d');
  var widthP = 80;
  var heightP = 80;
  canvasP.width = widthP;
  canvasP.height = heightP;
  var dstDataP = contextP.createImageData(widthP, heightP);
  var dstP = dstDataP.data;
  patternGet(dst3, dstP, widthP, heightP, startImagePoint, width, height);
  contextP.putImageData(dstDataP, 0, 0);

  var canvasD1 = document.createElement('canvas');
  canvasD1.setAttribute('onclick','patternLoadJudge(2)');
  modal.appendChild(canvasD1);
  var contextD1 = canvasD1.getContext('2d');
  canvasD1.width = widthP;
  canvasD1.height = heightP;
  var dstDataD1 = contextD1.createImageData(widthP, heightP);
  var dstD1 = dstDataD1.data;
  dummyPatternGet(dst3, dstD1, widthP, heightP, startImagePoint+10, width, height);
  contextD1.putImageData(dstDataD1, 0, 0);

  var canvasD2 = document.createElement('canvas');
  canvasD2.setAttribute('onclick','patternLoadJudge(3)');
  modal.appendChild(canvasD2);
  var contextD2 = canvasD2.getContext('2d');
  canvasD2.width = widthP;
  canvasD2.height = heightP;
  var dstDataD2 = contextD2.createImageData(widthP, heightP);
  var dstD2 = dstDataD2.data;
  dummyPatternGet(dst3, dstD2, widthP, heightP, startImagePoint-10, width, height);
  contextD2.putImageData(dstDataD2, 0, 0);

  modalPatternFlag = true;
  modalOpen('pattern');
}

var modalPatternFlag = false;

var flagP = false;

function patternLoadJudge(e) {
  var img1 = document.getElementById('img2');
  var img2 = document.getElementById('img1');
  document.getElementById('pattern').style.display = "block";
  var canvas1 = document.createElement('canvas');
  var one = document.getElementById('imageOne');
  one.innerHTML = "ひとつめのがぞう：しろくろ";
  one.appendChild(canvas1);
  var context1 = canvas1.getContext('2d');
  var width = img1.width;
  var height = img1.height;
  canvas1.width = width;
  canvas1.height = height;
  context1.drawImage(img1, 0, 0);

  var srcData1 = context1.getImageData(0, 0, width, height);
  var dstData1 = context1.createImageData(width, height);
  var src1 = srcData1.data;
  var dst1 = dstData1.data;
  faceFilter(src1, dst1, width, height);
  context1.putImageData(dstData1, 0, 0);

  var canvas2 = document.createElement('canvas');
  var two = document.getElementById('imageTwo');
  two.innerHTML = "ふたつめのがぞう：しろくろ";
  two.appendChild(canvas2);
  var context2 = canvas2.getContext('2d');
  canvas2.width = width;
  canvas2.height = height;
  context2.drawImage(img2, 0, 0);

  var srcData2 = context2.getImageData(0, 0, width, height);
  var dstData2 = context2.createImageData(width, height);
  var src2 = srcData2.data;
  var dst2 = dstData2.data;
  faceFilter(src2, dst2, width, height);
  context2.putImageData(dstData2, 0, 0);

  var canvas3 = document.createElement('canvas');
  one.innerHTML = "しろくろさぶんがぞう";
  two.innerHTML = "";
  one.appendChild(canvas3);
  var context3 = canvas3.getContext('2d');
  canvas3.width = width;
  canvas3.height = height;
  var dstData3 = context3.createImageData(width, height);
  var dst3 = dstData3.data;
  sabunFilter(dst1, dst2, dst3);
  context3.putImageData(dstData3, 0, 0);

  var correct = document.getElementById('correct');
  var canvasP = document.createElement('canvas');
  correct.appendChild(canvasP);
  var contextP = canvasP.getContext('2d');
  var widthP = 80;
  var heightP = 80;
  canvasP.width = widthP;
  canvasP.height = heightP;
  var dstDataP = contextP.createImageData(widthP, heightP);
  var dstP = dstDataP.data;
  patternGet(dst3, dstP, widthP, heightP, startImagePoint, width, height);
  contextP.putImageData(dstDataP, 0, 0);

  var dummy1 = document.getElementById('dummy1');
  var canvasD1 = document.createElement('canvas');
  dummy1.appendChild(canvasD1);
  var contextD1 = canvasD1.getContext('2d');
  canvasD1.width = widthP;
  canvasD1.height = heightP;
  var dstDataD1 = contextD1.createImageData(widthP, heightP);
  var dstD1 = dstDataD1.data;
  dummyPatternGet(dst3, dstD1, widthP, heightP, startImagePoint+10, width, height);
  contextD1.putImageData(dstDataD1, 0, 0);

  var dummy2 = document.getElementById('dummy2');
  var canvasD2 = document.createElement('canvas');
  dummy2.appendChild(canvasD2);
  var contextD2 = canvasD2.getContext('2d');
  canvasD2.width = widthP;
  canvasD2.height = heightP;
  var dstDataD2 = contextD2.createImageData(widthP, heightP);
  var dstD2 = dstDataD2.data;
  dummyPatternGet(dst3, dstD2, widthP, heightP, startImagePoint-10, width, height);
  contextD2.putImageData(dstDataD2, 0, 0);

  //パターン認識
  switch (e) {
    case 1:
      flagP = patternMatch(dst3, dstP, width, height, widthP, heightP);
      break;
    case 2:
      flagP = patternMatch(dst3, dstD1, width, height, widthP, heightP);
      break;
    case 3:
      flagP = patternMatch(dst3, dstD2, width, height, widthP, heightP);
      break;
  }

  one.innerHTML = "";
  two.innerHTML = "";
  document.getElementById('pattern').innerHTML = "";

  if (flagP) {
    correctPattern();
  }else{
    location.href="over.html";
  }
}

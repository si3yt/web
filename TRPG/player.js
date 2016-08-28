var code = [75,82,76,65,66];
var count = 0;
var codeK = new Array(5);

document.onkeydown = function(e){
  if (e.keyCode == 75) {
    count = 0;
  }
  codeK[count] = e.keyCode;
  count++;
  if (count == 5) {
    for (var i = 0; i < code.length; i++) {
      if (code[i] == codeK[i]) {
        location.href="index.html?player=10";
      }else{
        break;
      }
    }
  }
  if (e.keyCode == 13) {
    selectEnter();
  }
  // 左キーが押されているか調べる
	if(e.keyCode == 37){
    selectArrowRight();
  }
  // 上キーが押されているか調べる
	if(e.keyCode == 38){
    selectArrowUp();
  }
  // 右キーが押されているか調べる
	if(e.keyCode == 39){
    selectArrowLeft();
  }
  // 下キーが押されているか調べる
	if(e.keyCode == 40){
    selectArrowDown();
	}
};

function selectEnter() {
  var radio = document.getElementsByName('radio');
  for (var i = 0; i < radio.length; i++) {
    if (radio[i].checked) {
      switch (i) {
        case 0: //バランス
          location.href="index.html?player=1";
          break;
          default:
        case 1: //体力
          location.href="index.html?player=2";
          break;
        case 2: //知力
          location.href="index.html?player=3";
          break;
        case 3: //精神
          location.href="index.html?player=4";
          break;
      }
    }
  }
}

// 選択下イベント
function selectArrowDown() {
  var radio = document.getElementsByName('radio');
  for (var i = 0; i < radio.length; i++) {
    if (radio[i].checked && i < 2) {
      i+=2;
      radio[i].checked = "true";
      break;
    }
  }
}

// 選択上イベント
function selectArrowUp() {
  var radio = document.getElementsByName('radio');
  for (var i = 0; i < radio.length; i++) {
    if (radio[i].checked && i > 1) {
      i-=2;
      radio[i].checked = "true";
      break;
    }
  }
}

// 選択右イベント
function selectArrowRight() {
  var radio = document.getElementsByName('radio');
  for (var i = 0; i < radio.length; i++) {
    if (radio[i].checked && i%2 === 1) {
      i--;
      radio[i].checked = "true";
      break;
    }
  }
}

// 選択左イベント
function selectArrowLeft() {
  var radio = document.getElementsByName('radio');
  for (var i = 0; i < radio.length; i++) {
    if (radio[i].checked && i%2 === 0) {
      i++;
      radio[i].checked = "true";
      break;
    }
  }
}

var min = 5;
var sec = 1;
var count = min * 60 + sec;
function timer(){
  count--;
  var reMin = count / 60;
  var reSec = count % 60;
  document.getElementById('timer').innerHTML='TIME：'+parseInt(reMin)+'min:'+reSec+'sec';
  if (count > 0) {
    window.setTimeout(timer,1000);
  }else {
    location.href="over.html";
  }
}

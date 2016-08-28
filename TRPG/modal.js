function modalOpen(target){
	$(function(){
		// オーバーレイ用の要素を追加
		$('body').append('<div class="modalOverlay"></div>');
		// オーバーレイをフェードイン
		$('.modalOverlay').fadeIn('slow');

		// モーダルコンテンツのIDを取得
		modal = '#' + target;
		// モーダルコンテンツの表示位置を設定
		modalResize();
		// モーダルコンテンツフェードイン
		$(modal).fadeIn('slow');

		modalFlag(true);

		//　モーダル削除
		if (target != 'pattern') {
				setTimeout(modalOut,3700);
		}

		// モーダルコンテンツの表示位置を設定する関数
		function modalResize(){
		    // ウィンドウの横幅、高さを取得
		    var w = $(window).width();
		    var h = $(window).height();

		    // モーダルコンテンツの表示位置を取得
		    var x = (w - $(modal).outerWidth(true)) / 2;
		    var y = (h - $(modal).outerHeight(true)) / 2 - 100;

		    // モーダルコンテンツの表示位置を設定
		    $(modal).css({'left': x + 'px','top': y + 'px'});
		}
	});
}
var modal = '';

function modalOut(){
	// モーダルコンテンツとオーバーレイをフェードアウト
	$(modal).fadeOut('slow');
	$('.modalOverlay').fadeOut('slow',function(){
			// オーバーレイを削除
			$('.modalOverlay').remove();
	});
	modalFlag(false);
}

function modalOutTarget(target){
	$(function(){
		// モーダルコンテンツのIDを取得
		modal = '#' + target;
		// モーダルコンテンツとオーバーレイをフェードアウト
		$(modal).fadeOut('slow');
		$('.modalOverlay').fadeOut('slow',function(){
				// オーバーレイを削除
				$('.modalOverlay').remove();
		});
	});
	modalFlag(false);
}

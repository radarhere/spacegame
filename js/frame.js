$(document).ready(function () {
	if (typeof Cookies !== 'undefined' && Cookies.get('volume') == 0) {
		$('#sound').addClass('muted').find('span').text('Sound Off');
	}

	$('#sound').click(function () {
		$(this).toggleClass('muted');
		if ($(this).hasClass('muted')) {
			$(this).find('span').text('Sound Off');
			if (typeof Cookies !== 'undefined') Cookies.set('volume', 0, {expires: 30});
			
			if (currentTheme != null) currentTheme.pause();
		} else {
			$(this).find('span').text('Sound On');
			if (typeof Cookies !== 'undefined') Cookies.set('volume', 1, {expires: 30});
			
			if (currentTheme != null) currentTheme.play();
		}
	});

	$('.loading').hide();
	$('#game, #sound').show();
});
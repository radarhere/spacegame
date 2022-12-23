window.onload = function() {
	const sound = document.getElementById('sound')
	if (typeof Cookies !== 'undefined' && Cookies.get('volume') == 0) {
		sound.classList.add('muted')
		sound.querySelector('span').innerText = 'Sound Off';
	}

	sound.addEventListener('click', function () {
		this.classList.toggle('muted');
		const span = this.querySelector('span')
		if (this.classList.contains('muted')) {
			span.innerText = 'Sound Off';
			if (typeof Cookies !== 'undefined') Cookies.set('volume', 0, {expires: 30});
			
			if (currentTheme != null) currentTheme.pause();
		} else {
			span.innerText = 'Sound On';
			if (typeof Cookies !== 'undefined') Cookies.set('volume', 1, {expires: 30});
			
			if (currentTheme != null) currentTheme.play();
		}
	});

	document.querySelector('.loading').remove();
	document.querySelectorAll('#game, #sound').forEach(item => {
		item.style.display = 'block';
	});

	const canvas = document.getElementById('game');
	effectiveCanvas = {
	  width: canvas.width,
	  height: canvas.height - 60
	};

	ctx = canvas.getContext('2d');

	resetScore();
	resetGame();

	setInterval(update, 17);
};
var windowWidth = document.documentElement.clientWidth;
window.addEventListener("resize", () => {
	windowWidth = document.documentElement.clientWidth;
});

const handleStickyMenu = function(){
	var headerPosition = $('.header-bottom').offset().top;
	$(window).scroll(function () {
		var scrollValue = $(window).scrollTop();
		if (scrollValue > headerPosition) {
			$('body').addClass('header-fixed');
		} else {
			$('body').removeClass('header-fixed');
		}

	});
}
// =====================menu mobile==================================
const handleCallMenu = function () {
	const $body = $('body');
	const handleBody = function ($toggle = false) {
		if ($body.hasClass('is-navigation')) {
			$body.removeClass('is-navigation');
			if ($body.hasClass('is-overflow')) {
				$body.removeClass('is-overflow');
			}

			$('#header-navigation ul').collapse('hide');
		} else {
			if ($toggle) {
				$body.addClass('is-navigation is-overflow')
			}
		}

	}

	if (windowWidth <= 1024) {
		const $hamburger = $('#hamburger-button');
		if ($hamburger.length) {
			$hamburger.click(function () {
				handleBody(true)
			});
		}
		const $overlay = $('#header-overlay');
		if ($overlay.length) {
			$overlay.click(function () {
				handleBody();
			});
		}

		const $closeHamburger = $('#close-navigation');
		if ($closeHamburger.length) {
			$closeHamburger.click(function () {
				handleBody(true)
			});
		}


	} else {
		handleBody();
	}
}

// =====================fancybox==================================

const handleInitFancybox = function () {
	if ($('.initFancybox').length) {
		$('.initFancybox').each(function () {
			let elm = $(this);
			Fancybox.bind(`[data-fancybox=${elm.attr('data-fancybox')}]`, {
				thumbs: {
					autoStart: true,
				},
			});
		});
	}
}

// =====================scroll top==================================

const handleScrollTop = function () {
	$(window).scroll(function () {
		if ($(document).scrollTop() > 300) {
			$('.scroll-top').addClass('is-show');
		} else {
			$('.scroll-top').removeClass('is-show');

		}
	})
	$('#scroll-top').click(function (e) {
		e.stopPropagation();
		$("html, body").animate({
			scrollTop: 0
		}, 800);
		return false;
	});
}


// =====================select form==================================

const handleSelectInput = function(){

		let selectOption = $('.form-group__select');

		if(selectOption.length){
			selectOption.each(function(){
				let elmSelect = $(this);
				let inputSelect = elmSelect.find('.input-select');
				let option = elmSelect.find('.select-group__absolute');

				inputSelect.click(function (){
					elmSelect.addClass('show-select');
				})

				if(option.length){
					let optionElm = option.find('li');

					optionElm.click(function(e){
						let elm = $(this);
						let getTitleOption = elm.data('title');

						optionElm.removeClass('active');
						elm.addClass('active');

						let a = elmSelect.find('.input-select');
						a.val(getTitleOption);
						elmSelect.removeClass('show-select');
					})
				}

			})
		}
}

$(function () {
	Fancybox.bind("[data-fancybox]");
	handleStickyMenu();
	handleCallMenu();
	handleInitFancybox();
	handleScrollTop();
	handleSelectInput();
});

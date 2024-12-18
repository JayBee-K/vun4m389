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

const handleSlideScroll = function () {
	if ($('.slideScroll').length > 0) {
		$('.slideScroll').each(function () {
			let slide = $(this),
				slideInner = slide.find('.slideScrollInner'),
				slideItemActive = slideInner.find('.slideScrollItem.active'),
				slidePrev = slide.find('.slideScrollPrev'),
				slideNext = slide.find('.slideScrollNext');

			/*if (slideItemActive.length) {
				let activeOffset = slideItemActive.position().left + slideInner.scrollLeft(); // tính vị trí phần tử active trong container
				slideInner.scrollLeft(activeOffset - (slideInner.width() / 2) + (slideItemActive.outerWidth() / 2)); // cuộn để phần tử active ở giữa viewport
			}*/

			let scrollPixel = slideInner.find('.slideScrollItem').outerWidth() + 15; // Chiều rộng của 1 phần tử + khoảng cách giữa 2 phần tử

			slidePrev.click(function () {
				let maxScrollLeft = slideInner[0].scrollWidth - slideInner.outerWidth();

				if (slideInner.scrollLeft() < maxScrollLeft) {
					// Đang ở vị trí đầu tiên thì không scroll qua trái được
					slideInner.scrollLeft(slideInner.scrollLeft() + scrollPixel);
				}
			})

			slideNext.click(function () {
				if (slideInner.scrollLeft() > 0) {
					// Đang ở vị trí cuối cùng thì không scroll qua phải được
					slideInner.scrollLeft(slideInner.scrollLeft() - scrollPixel);
				}
			})
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
	handleSlideScroll();
});

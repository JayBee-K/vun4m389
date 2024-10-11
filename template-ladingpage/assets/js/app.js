'use strict';

export const handleCallMenu = function () {
	const hamburger = $('#hamburgerButton');
	const body = $('body');
	if (hamburger.length) {
		hamburger.off('click').on('click', function () {
			if (body.hasClass('is-navigation')) {
				body.removeClass('is-navigation is-overflow');
			} else {
				body.addClass('is-navigation is-overflow')
			}
		});
	}
}

export const handleStickHeader = function () {
	$(window).scroll(function (e) {
		if ($(document).scrollTop() > $('#header').innerHeight()) {
			$('#header').addClass('is-scroll');
		} else {
			$('#header').removeClass('is-scroll');
		}
	});
}

export const handleSwiper = function (elm, obj = {}) {
	return new Swiper(elm, {
		loop: true,
		speed: 1000,
		autoplay: {
			delay: 8000,
			disableOnInteraction: true,
		},
		slidesPerView: 1,
		...obj
	});
}

export const handleSelect = function () {
	let selects = $('.handleSelect');

	if (selects.length > 0) {
		selects.each(function () {
			let elmSelect = $(this);
			let selectFill = elmSelect.find('.selectFill');
			let selectList = elmSelect.find('.selectList');

			selectFill.click(function (e) {
				e.stopPropagation();
				if (!elmSelect.hasClass('is-show')) {
					if (selects.hasClass('is-show')) {
						selects.removeClass('is-show')
					}
					elmSelect.addClass('is-show');
				} else {
					elmSelect.removeClass('is-show');
				}
			})

			if (selectList.length) {
				let optionElm = selectList.find('li');

				optionElm.click(function () {
					let elm = $(this);
					let getTitleOption = elm.data('title');

					optionElm.removeClass('active');
					elm.addClass('active');

					let inputData = selectFill.find('input');
					inputData.val(getTitleOption);
					elmSelect.removeClass('is-show');
				})
			}
		})

		$(document).click(function (e) {
			if (!$(e.target).closest('.handleSelect.is-show').length) {
				selects.removeClass('is-show');
			}
		});
	}
}

export const initSliderFeedback = function () {
	if ($('#sliderFeedback').length > 0) {
		const elmSwiper = '#sliderFeedback';
		const objSwiper = {
			speed: 1000,
			loop: true,
			slidesPerView: 3,
			spaceBetween: 30,
			breakpoints: {
				320: {
					slidesPerView: 1.25,
					spaceBetween: 16,
				},
				575: {
					slidesPerView: 2.25,
					spaceBetween: 16,
				},
				991: {
					slidesPerView: 3,
					spaceBetween: 30,
				}
			}
		}
		handleSwiper(elmSwiper + ' .swiper', objSwiper);
	}
}

export const handleSlideScroll = function () {
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

export const spy = new Gumshoe('#header-navigation a', {
	offset: 120
});

export const scroll = new SmoothScroll('#header-navigation a', {
	speed: 500,
	offset: 120
});

$(function () {
	handleCallMenu();
	handleStickHeader();
	handleSelect();
	initSliderFeedback();
	handleSlideScroll();
});
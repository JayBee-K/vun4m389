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
			autoplay: {
				delay: 5000,
				disableOnInteraction: true,
			},
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

export const initSliderDate = function () {
	if ($('#sliderDate').length > 0) {
		const elmSwiper = '#sliderDate';
		const objSwiper = {
			speed: 1000,
			autoplay: {
				delay: 5000,
				disableOnInteraction: true,
			},
			loop: 0,
			slidesPerView: 3.5,
			spaceBetween: 12,
			navigation: {
				nextEl: elmSwiper + " .button-next",
				prevEl: elmSwiper + " .button-prev",
			},
			breakpoints: {
				320: {
					slidesPerView: 2.25,
				},
				575: {
					slidesPerView: 3.25,
				},
				768: {
					slidesPerView: 3.5,
				}
			},
			on: {
				init: function () {
					const index = $('.buttonDate.active').attr('data-index');
					this.slideTo(index)
				},
			}
		}

		const sliderDate = handleSwiper(elmSwiper + ' .swiper', objSwiper);

		if ($('.buttonDate').length > 0) {
			$('.buttonDate').click(function () {
				let button = $(this);

				if (button.hasClass('active')) {
					return false;
				} else {
					$('.buttonDate').removeClass('active');
					button.addClass('active');
					const index = button.parent().attr('data-swiper-slide-index');
					sliderDate.slideTo(index)
				}
			});
		}
	}
}
export const initSliderTime = function () {
	if ($('#sliderTime').length > 0) {
		const elmSwiper = '#sliderTime';
		const objSwiper = {
			speed: 1000,
			autoplay: {
				delay: 5000,
				disableOnInteraction: true,
			},
			loop: 0,
			slidesPerView: 3.5,
			spaceBetween: 12,
			navigation: {
				nextEl: elmSwiper + " .button-next",
				prevEl: elmSwiper + " .button-prev",
			},
			breakpoints: {
				320: {
					slidesPerView: 2.25,
				},
				575: {
					slidesPerView: 3.25,
				},
				768: {
					slidesPerView: 3.5,
				}
			},
			on: {
				init: function () {
					const index = $('.buttonTime.active').attr('data-index');
					this.slideTo(index)
				},
			}
		}

		const sliderTime = handleSwiper(elmSwiper + ' .swiper', objSwiper);

		if ($('.buttonTime').length > 0) {
			$('.buttonTime').click(function () {
				let button = $(this);

				if (button.hasClass('active')) {
					return false;
				} else {
					$('.buttonTime').removeClass('active');
					button.addClass('active');
					const index = button.attr('data-index');
					sliderTime.slideTo(index)
				}
			});
		}
	}
}

$(function () {
	handleCallMenu();
	handleStickHeader();
	handleSelect();
	initSliderFeedback()

	export const spy = new Gumshoe('#header-navigation a', {
		offset: 120
	});

	export const scroll = new SmoothScroll('#header-navigation a', {
		speed: 500,
		offset: 120
	});
});
;(function ($) {
	'use strict';

	let windowWidth = window.innerWidth;

	/***
	 * Function init swiper & init slider
	 * @param elm
	 * @param obj
	 */
	let handleSwiper = function (elm, obj = {}) {
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

	const handleServiceCollapse = function () {

		const serviceCollapse = $('#serviceCollapse');
		if (serviceCollapse.length) {
			const serviceCollapseImage = $('#serviceCollapseImage');
			const serviceLine = serviceCollapse.find('#serviceLine');
			let target = serviceCollapse.find('.collapse.show').attr('id');

			// Sự kiện khi một collapse được mở
			serviceCollapse.on('show.bs.collapse', function (e) {
				const collapseElm = $(e.target); // Collapse vừa được mở
				target = collapseElm.attr('id');
				const buttonElm = serviceCollapse.find(`[data-bs-target="#${collapseElm.attr('id')}"]`);

				const dataImage = buttonElm.attr('data-image');

				// Cập nhật hình ảnh
				if (serviceCollapseImage.length && dataImage) {
					const htmlImage = `<img src="${dataImage}" class="h-100 w-auto mw-100 object-fit-contain" alt="">`;
					serviceCollapseImage.find('img').remove();
					serviceCollapseImage.append(htmlImage);
				}

				// Cập nhật vị trí và chiều cao của serviceLine
				if (serviceLine.length) {
					setTimeout(function () {
						const collapseActive = collapseElm.closest('.service-item')[0];
						serviceLine.css({
							top: `${collapseActive.offsetTop}px`,
							height: `${collapseActive.scrollHeight}px`,
						});
					}, 250);
				}
			});

			serviceCollapse.on('hide.bs.collapse', function (e) {
				const collapseElm = $(e.target);
				if (collapseElm.hasClass('show') && collapseElm.attr('id') == target) {
					e.preventDefault(); // Ngăn chặn hành vi đóng của collapse đang mở
				}
			})

			// Cập nhật trạng thái khi trang được tải
			if (serviceLine.length) {
				const collapseActive = serviceCollapse.find('.collapse.show').closest('.service-item')[0];
				if (collapseActive) {
					serviceLine.css({
						top: `${collapseActive.offsetTop}px`,
						height: `${collapseActive.scrollHeight}px`,
					});
				}
			}
		}
	}

	const handleSliderSupport = function () {
		const elmSwiper = '#sliderSupport';
		if ($(elmSwiper).length > 0) {
			const objSwiper = {
				speed: 1000,
				autoplay: {
					delay: 500000,
					disableOnInteraction: true,
				},
				slidesPerView: 3,
				centeredSlides: true,
				loop: true,
				breakpoints: {
					320: {
						slidesPerView: 1.2,
					},
					375: {
						slidesPerView: 1.25,
					},
					768: {
						slidesPerView: 2.5,
					},
					1400: {
						slidesPerView: 5,
					},
				},
				spaceBetween: 30,
			}
			handleSwiper(elmSwiper + ' .swiper', objSwiper);
		}
	}

	$(function () {
		$(window).resize(function () {
			windowWidth = window.innerWidth;
		});

		handleServiceCollapse();
		handleSliderSupport();
		handleSliderSupport();
	})
})(jQuery);
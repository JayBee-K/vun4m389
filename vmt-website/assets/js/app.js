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

	let handleServiceCollapse = function () {

		const serviceCollapse = $('#serviceCollapse');
		let serviceCollapseButton = serviceCollapse.find('[data-bs-toggle=collapse]');
		if (serviceCollapse.length && serviceCollapseButton.length) {
			const serviceCollapseImage = $('#serviceCollapseImage');

			// Thay đổi collapse
			serviceCollapseButton.each(function () {
				$(this).on('click', function (e) {
					e.stopPropagation();
					const buttonElm = $(this);
					const ariaExpanded = buttonElm.attr('aria-expanded');
					const dataImage = buttonElm.attr('data-image');
					if (ariaExpanded === 'true') {
						setTimeout(function () {
							const collapseActive = buttonElm.closest('.service-item')[0];
							serviceLine.css({
								top: parseInt(collapseActive.offsetTop) + 'px',
								height: parseInt(collapseActive.scrollHeight) + 'px',
							});
						}, 250);

						if (serviceCollapseImage.length) {
							const htmlImage = `<img src="${dataImage}" class="h-100 w-auto mw-100 object-fit-contain" alt="">`
							serviceCollapseImage.find('img')[0].remove();
							serviceCollapseImage.append(htmlImage);
						}
					}
				})
			})

			// Trạng thái khi load trang
			const serviceLine = serviceCollapse.find('#serviceLine');
			if (serviceLine.length) {
				const collapseActive = serviceCollapse.find('.collapse.show').closest('.service-item')[0];
				serviceLine.css({
					top: parseInt(collapseActive.offsetTop) + 'px',
					height: parseInt(collapseActive.scrollHeight) + 'px',
				});
			}
		}
	}

	$(function () {
		$(window).resize(function () {
			windowWidth = window.innerWidth;
		});

		handleServiceCollapse();
	})
})(jQuery);
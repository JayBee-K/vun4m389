;(function ($) {
	'use strict';

	const handleContent = function () {
		const elmContent = $('#handleContent');
		if (elmContent.length > 0) {
			if (elmContent.find('img').length > 0) {
				elmContent.find('img').each((index, elm) => {
					$(elm).wrap(`<a style="cursor: zoom-in" href="${$(elm).attr('src')}" data-caption="${$(elm).attr('alt')}" data-fancybox="images-detail"></a>`);
					$(elm).addClass('img-fluid');
				});

				Fancybox.bind('[data-fancybox]', {
					thumbs: {
						autoStart: true,
					},
				});
			}

			if (elmContent.find('iframe').length > 0) {
				elmContent.find('iframe').each((index, elm) => {
					$(elm).wrap(`<p class="ratio ratio-16x9"></p>`);
				});

				Fancybox.bind('[data-fancybox]', {
					thumbs: {
						autoStart: true,
					},
				});
			}

			if (elmContent.find('table').length > 0) {
				elmContent.find('table').map(function () {
					$(this).addClass('table table-bordered');
					$(this).wrap('<div class="table-responsive"></div>');
				})
			}
		}
	}

	const handleInitToc = function (element) {
		if ($('#handleToc').length > 0) {
			const handleToc = $('#handleToc');
			handleToc.toc({
				elementClass: element,
				ulClass: 'nav',
				heading: '',
				selector: '#handleContent h1, #handleContent h2, #handleContent h3, #handleContent h4, #handleContent h5, #handleContent h6',
				indexingFormats: ""
			});

			$(document).ready(function() {
				let heading = $('#handleContent').find('h1, h2, h3, h4, h5, h6');
				let tocLinks = handleToc.find('[class*=toc-link-]');

				// Lấy chiều cao của header sticky
				let stickyHeaderHeight = 92; // Chiều cao header của bạn

				// Cờ để kiểm tra xem sự kiện click có đang diễn ra hay không
				let isClicking = false;

				// Lắng nghe sự kiện cuộn
				$(window).on('scroll', function () {
					if (isClicking) return; // Bỏ qua sự kiện cuộn khi người dùng đang click

					let scrollPosition = $(document).scrollTop();
					let currentIndex = -1;

					heading.each(function (index) {
						let headingTop = $(this).offset().top - stickyHeaderHeight - 10; // Trừ thêm một khoảng nhỏ để xử lý chính xác

						if (scrollPosition >= headingTop) {
							currentIndex = index;
						}
					});

					if (currentIndex !== -1) {
						tocLinks.removeClass('active');
						tocLinks.eq(currentIndex).addClass('active');
					}
				});

				// Xử lý sự kiện click vào TOC
				tocLinks.on('click', function (e) {
					e.preventDefault();

					// Đặt cờ để sự kiện scroll không can thiệp khi đang click
					isClicking = true;

					let target = $($(this).attr('href'));

					// Cuộn đến vị trí chính xác với bù trừ chiều cao header
					$('html, body').animate({
						scrollTop: target.offset().top - stickyHeaderHeight
					}, 400, function() {
						// Khi cuộn xong, kích hoạt lại sự kiện scroll
						isClicking = false;
					});

					// Xóa class active trước khi thêm vào phần tử vừa click
					tocLinks.removeClass('active');
					$(this).addClass('active');

					return false;
				});
			});

		}
	}

	$(document).ready(function () {
		handleContent();

		handleInitToc('theme-toc')

	});
})
(jQuery);
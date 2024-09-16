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

	$(document).ready(function () {
		handleContent();
	});
})
(jQuery);
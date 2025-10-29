export function handleCollapseContent() {
	if ($('.handleCollapseContent').length) {
		$('.handleCollapseContent').each(function () {
			const collapseContent = $(this);
			const collapseContentDesc = collapseContent.find('.handleCollapseContentDesc');
			const collapseContentToggle = collapseContent.find('.handleCollapseContentToggle button');
			
			if (collapseContentDesc.length && collapseContentToggle.length) {
				const limit = parseInt(collapseContentDesc.attr('data-limit'));
				const full = collapseContentDesc[0].scrollHeight;
				
				if (full > limit) {
					collapseContentDesc.css({
						'--limit': limit + 'px',
						'--full': full + 'px'
					}).removeAttr('data-limit');
					
					collapseContentToggle.click(function () {
						if (collapseContent.hasClass('is-expanded')) {
							collapseContent.removeClass('is-expanded')
							collapseContentToggle.html('Mở rộng');
						} else {
							collapseContent.addClass('is-expanded')
							collapseContentToggle.html('Thu gọn');
						}
					});
				} else {
					collapseContentToggle.parent().remove();
				}
			}
		})
	}
}

handleCollapseContent();
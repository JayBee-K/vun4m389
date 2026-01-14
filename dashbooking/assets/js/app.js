export function handleCallMenu() {
	let windowWidth = document.documentElement.clientWidth;

	$(window).on('resize', function () {
		const newWidth = document.documentElement.clientWidth;
		if (newWidth === windowWidth) return;

		windowWidth = newWidth;
		handleCallMenu();
	});

	const $body = $('body');
	const handleBody = function ($toggle = false) {
		if ($body.hasClass('is-navigation')) {
			$body.removeClass('is-navigation');
			$('#headerNavigation .collapse').collapse('hide');
		} else {
			if ($toggle) {
				$body.addClass('is-navigation');
			}
		}
	}

	const $hamburger = $('#navigationButton');
	if (windowWidth <= 768) {
		if ($hamburger.length && !$hamburger.data("click-added")) {
			$hamburger.on('click', function () {
				handleBody(true);
				$hamburger.data("click-added", true);
			});
		}

		const $overlay = $('#navigationOverlay');
		if ($overlay.length) {
			$overlay.off('click').on('click', function () {
				handleBody();
			});
		}
	} else {
		handleBody();
		$hamburger.off("click").removeData("click-added");
	}
}


export function handleLocationForm() {
	if ($('#bookingForm').length) {

		const input = $('#bookingFillAddress');
		const address = $('#bookingListAddress');
		const addressItem = address.find('.bookingItemAddress');
		if (input.length && address.length && addressItem.length) {
			input.keyup(function () {
				const value = input.val().trim();
				if (!value) {
					address.removeClass('is-dropdown');
				}

				if (!address.hasClass('is-dropdown')) {
					address.addClass('is-dropdown');
				}
			});

			addressItem.click(function () {
				address.removeClass('is-dropdown');
				input.val($(this).attr('data-value'));
			});

			$(document).on('mousedown', function (e) {
				if (!address.is(e.target) && address.has(e.target).length === 0 && !input.is(e.target)) {
					address.removeClass('is-dropdown');
				}
			});
		}


		const button = $('#bookingGetLocation');
		if (button.length && input.length) {
			button.click(function () {
				input.prop('disabled', true);
				button.prop('disabled', true);
				button.addClass('is-loading');

				if (address.length && address.hasClass('is-dropdown')) {
					address.removeClass('is-dropdown');
				}

				setTimeout(function () {
					button.removeClass('is-loading');
					button.prop('disabled', false);

					input.val('1901 Long Prairie Rd Suite 306, Flower Mound, TX 75022');
					input.prop('disabled', false);
				}, 1500);
			});
		}
	}
}

handleCallMenu();
handleLocationForm();
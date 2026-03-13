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

export function handleStickHeader() {
	$(window).scroll(function (e) {
		if ($(document).scrollTop() > $('#header').innerHeight()) {
			$('#header').addClass('is-scroll');
		} else {
			$('#header').removeClass('is-scroll');
		}
	});
}

/***
 * Init Swiper Library Slider
 * @param elm
 * @param obj
 */
export let handleSwiper = function (elm, obj = {}) {
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

export const handleSliderHero = function () {
	if (document.getElementById('sliderHero') !== null) {
		const elmSwiper = '#sliderHero';
		const objSwiper = {
			speed: 1000,
			autoplay: {
				delay: 8000,
				disableOnInteraction: true,
			},
			slidesPerView: 2,
			spaceBetween: 16,
			centeredSlides: true,
			loopAdditionalSlides: 3,
			breakpoints: {
				320: {
					slidesPerView: 1.75,
					spaceBetween: 8,
				},
				768: {
					spaceBetween: 16,
				},
				991: {
					spaceBetween: 24,
				}
			},
		}
		handleSwiper(elmSwiper + ' .swiper', objSwiper);
	}
}

export const handleValidateForm = (elmFrm, urlFetch) => {
	if (elmFrm.length === 0) return false;
	
	elmFrm.submit(function (event) {
		let elmButton = elmFrm.find('button[type=submit]'),
			elmButtonHTML = elmButton.html();
		
		elmButton.html('<span>Loading...</span>').attr('disabled', true);
		
		if (!elmFrm[0].checkValidity()) {
			event.preventDefault();
			event.stopPropagation();
			elmFrm.addClass('was-validated');
			elmButton.html(elmButtonHTML).attr('disabled', false);
		} else {
			// Bỏ false ra khi lauch
			if (false) {
				const frmData = new FormData(elmFrm[0]);
				fetch(urlFetch, {
					method: 'POST', body: frmData,
				})
					.then(response => response.json())
					.then(data => {
						// Xử lý status - fetch return
						elmButton.html(elmButtonHTML).attr('disabled', false);
						return false;
					})
					.catch(() => {
						// Xử lý fail catch
						elmButton.html(elmButtonHTML).attr('disabled', false);
						return false;
					})
			}
		}
		
		return false;
	});
}

handleCallMenu();
handleStickHeader();
handleSliderHero();

handleValidateForm($('#exampleForm'), '')

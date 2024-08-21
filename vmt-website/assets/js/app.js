'use strict';
export let windowWidth = window.innerWidth;

/***
 * Function init swiper & init slider
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
window.addEventListener('load', function () {
	window.addEventListener("resize", () => {
		windowWidth = window.innerWidth;
	});
});



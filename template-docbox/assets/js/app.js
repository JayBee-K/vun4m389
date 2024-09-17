;(function ($) {
	'use strict';

	let windowWidth = document.documentElement.clientWidth;
	window.addEventListener("resize", () => {
		windowWidth = document.documentElement.clientWidth;
	});

	let handleHeaderNavigation = function () {
		if (windowWidth <= 1023) {
			const headerNavigation = $('#header-navigation');
			if (headerNavigation.length) {
				const body = $('body');
				const hamburger = $('#hamburger-button');

				if (hamburger.length) {
					hamburger.click(function () {
						body.toggleClass('is-navigation');
					});
				}
			}
		}
	}


	const handleSidebarNavigation = function () {
		if (windowWidth <= 1023) {
			const sidebarNavigation = $('#sidebar-navigation');
			if (sidebarNavigation.length) {
				const body = $('body');
				const hamburger = $('#sidebar-hamburger');
				const overlay = $('#sidebar-overlay');

				if (hamburger.length) {
					hamburger.click(function () {
						body.toggleClass('is-sidebar');
					});
				}
				if (overlay.length) {
					overlay.click(function () {
						body.removeClass('is-sidebar');
					});
				}
			}
		}
	}

	$(document).ready(function () {
		handleHeaderNavigation();
		handleSidebarNavigation();
		$(window).resize(function () {
			handleHeaderNavigation();
		})
	});
})
(jQuery);
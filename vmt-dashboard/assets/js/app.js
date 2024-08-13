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

export const handleSliderHero = function () {
	if (document.getElementById('heroSlider') !== null) {
		const elmSwiper = '#heroSlider';
		const objSwiper = {
			loop: true,
			centeredSlides: true,
			speed: 300,
			effect: "fade",
			crossFade: true,
			autoplay: {
				delay: 7000,
				disableOnInteraction: true,
			},
		}
		handleSwiper(elmSwiper + ' .swiper', objSwiper);
	}
}

/***
 * Function show text password
 */
export function handleToggleTypePassword() {
	const buttonTogglePassword = document.querySelectorAll('.handleViewPass');
	if (buttonTogglePassword !== null) {
		buttonTogglePassword.forEach((button) => {
			button.addEventListener('click', function () {
				let target = this.getAttribute('data-id');
				if (target !== null) {
					let inputElm = document.getElementById(target);
					if (inputElm !== null) {
						let inputType = inputElm.getAttribute('type');
						if (inputType === 'password') {
							inputElm.setAttribute('type', 'text');
							button.innerHTML = `<svg width="20" height="16" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path fill-rule="evenodd" clip-rule="evenodd" d="M17 9C17 11.7614 14.7614 14 12 14C9.23858 14 7 11.7614 7 9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9ZM15 9C15 10.6569 13.6569 12 12 12C10.3431 12 9 10.6569 9 9C9 7.34315 10.3431 6 12 6C13.6569 6 15 7.34315 15 9Z" fill="#111215"/>
													<path fill-rule="evenodd" clip-rule="evenodd" d="M24 9C24 11.5 18.6274 18 12 18C5.37258 18 0 12 0 9C0 6 5.37258 0 12 0C18.6274 0 24 6.5 24 9ZM21.9995 8.99893L21.9997 9L21.9995 9.00107C21.9972 9.02085 21.9821 9.14491 21.8887 9.38861C21.7858 9.65706 21.6158 9.99772 21.3663 10.3925C20.8668 11.1829 20.1129 12.0894 19.1538 12.9451C17.2109 14.6786 14.665 16 12 16C9.28717 16 6.73355 14.7619 4.82178 13.1112C3.87374 12.2926 3.13408 11.4144 2.64521 10.6218C2.12886 9.7848 2 9.22159 2 9C2 8.77841 2.12886 8.2152 2.64521 7.37816C3.13408 6.58565 3.87374 5.70737 4.82178 4.8888C6.73355 3.23812 9.28717 2 12 2C14.665 2 17.2109 3.32143 19.1538 5.05485C20.1129 5.91057 20.8668 6.81711 21.3663 7.60746C21.6158 8.00228 21.7858 8.34294 21.8887 8.61139C21.9821 8.85509 21.9972 8.97915 21.9995 8.99893Z" fill="#111215"/>
												</svg>`;
						} else {
							inputElm.setAttribute('type', 'password');
							button.innerHTML = `<svg width="20" height="9" viewBox="0 0 20 9" fill="none"
												     xmlns="http://www.w3.org/2000/svg">
													<path d="M1.50028 1.00004C1.22414 0.631849 0.701806 0.55723 0.333616 0.833372C-0.0345735 1.10951 -0.109193 1.63185 0.16695 2.00004C0.479665 2.41699 0.883847 2.87686 1.38411 3.33859L0.140073 5.20441C-0.115243 5.58734 -0.0117939 6.10473 0.371132 6.36005C0.754058 6.61537 1.27145 6.51192 1.52677 6.12899L2.69458 4.3775C3.30038 4.78892 3.99293 5.17477 4.77597 5.5017L4.199 7.52122C4.07258 7.96375 4.32883 8.42499 4.77136 8.55141C5.21389 8.67784 5.67513 8.42159 5.80155 7.97906L6.35588 6.03876C7.20819 6.26651 8.14414 6.42234 9.16695 6.47771V8.16666C9.16695 8.62689 9.54005 8.99999 10.0003 8.99999C10.4605 8.99999 10.8336 8.62689 10.8336 8.16666V6.47771C11.8626 6.42201 12.8037 6.26462 13.6602 6.03461L14.1436 7.9655C14.2554 8.41196 14.7079 8.68327 15.1544 8.57149C15.6008 8.45972 15.8721 8.00718 15.7604 7.56072L15.2429 5.49402C16.0184 5.16875 16.7049 4.78574 17.3059 4.37756L18.4734 6.12895C18.7286 6.5119 19.246 6.61541 19.629 6.36014C20.0119 6.10486 20.1154 5.58748 19.8602 5.20452L18.6164 3.33865C19.1167 2.8769 19.5209 2.41701 19.8336 2.00004C20.1098 1.63185 20.0351 1.10951 19.667 0.833372C19.2988 0.55723 18.7764 0.631849 18.5003 1.00004C17.377 2.49781 14.6931 4.83043 10.0091 4.83337L10.0003 4.83332L9.99143 4.83337C5.30748 4.83043 2.62361 2.49781 1.50028 1.00004Z"
													      fill="#9196A6"/>
												</svg>`;
						}
					}
				}
			});
		});
	}
}

/****
 * Handle Init Material Date
 */

export function handleInitMaterialDate() {
	let handleInitMaterial = document.querySelectorAll('.handleInitMaterial');
	if (handleInitMaterial !== null) {
		handleInitMaterial.forEach(function (item) {
			const picker = new MaterialDatePicker().on('submit', (val) => {
				item.value = moment(val.toDate()).format('DD/MM/YYYY');
			})

			item.addEventListener('click', function () {
				picker.open()
			});
		});
	}
}

/****
 * Handle Init Material Date On Load
 */

export function handleInitMaterialOnLoad() {
	let handleInitMaterialOnLoad = document.getElementById('initMaterial');
	if (handleInitMaterialOnLoad !== null) {
		const picker = new MaterialDatePicker().on('submit', function (d) {
			handleInitMaterialOnLoad.value = d.format("YYYY-MM-DD HH:mm");
		});

		picker.open();

		setTimeout(() => {
			const pickerElement = document.querySelector('.c-datepicker');
			if (pickerElement) {
				pickerElement.previousSibling.remove();
				handleInitMaterialOnLoad.parentNode.insertBefore(pickerElement, handleInitMaterialOnLoad.nextSibling);
			}
		}, 0);

		handleInitMaterialOnLoad.style.display = 'none';
	}
}

/****
 * Handle Call DataPicker Materia
 */

export function handleCallDatePickerMaterial() {
	let btnCall = document.getElementById('callDatePicker');
	if (btnCall !== null) {
		btnCall.addEventListener('click', function () {
			const picker = new MaterialDatePicker();
			picker.open()
		});
	}
}

/****
 * Handle Toggle Sidebar
 */

export function handleToggleSidebar() {
	let btnExpand = document.getElementById('expandSidebar');
	if (btnExpand !== null) {
		btnExpand.addEventListener('click', function () {
			document.body.classList.toggle('sidebar-collapsed');
		});
	}

	let dashboardOverlay = document.getElementById('dashboardOverlay');
	if (dashboardOverlay !== null && windowWidth < 992) {
		dashboardOverlay.addEventListener('click', function () {
			document.body.classList.remove('sidebar-collapsed');
		});
	}
}

/****
 * Handle Toggle Wallet
 */

export function handleToggleWallet() {
	const buttonToggleWallet = document.querySelectorAll('.handleViewWallet');
	if (buttonToggleWallet !== null) {
		buttonToggleWallet.forEach((button) => {
			button.addEventListener('click', function () {
				let target = this.getAttribute('data-id');
				if (target !== null) {
					let wallet = document.getElementById(target);
					if (wallet !== null) {
						let walletValue = wallet.getAttribute('data-value');

						if (wallet.classList.contains('hidden-wallet')) {
							wallet.classList.remove(('hidden-wallet'));
							wallet.innerHTML = walletValue;
							button.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M21.2704 9.18029C20.9804 8.72029 20.6704 8.29029 20.3504 7.89029C19.9804 7.42029 19.2804 7.38029 18.8604 7.80029L15.8604 10.8003C16.0804 11.4603 16.1204 12.2203 15.9204 13.0103C15.5704 14.4203 14.4304 15.5603 13.0204 15.9103C12.2304 16.1103 11.4704 16.0703 10.8104 15.8503C10.8104 15.8503 9.38044 17.2803 8.35044 18.3103C7.85044 18.8103 8.01044 19.6903 8.68044 19.9503C9.75044 20.3603 10.8604 20.5703 12.0004 20.5703C13.7804 20.5703 15.5104 20.0503 17.0904 19.0803C18.7004 18.0803 20.1504 16.6103 21.3204 14.7403C22.2704 13.2303 22.2204 10.6903 21.2704 9.18029Z"
													      fill="#5B6371"/>
													<path d="M14.0196 9.97965L9.97965 14.0196C9.46965 13.4996 9.13965 12.7796 9.13965 11.9996C9.13965 10.4296 10.4196 9.13965 11.9996 9.13965C12.7796 9.13965 13.4996 9.46965 14.0196 9.97965Z"
													      fill="#5B6371"/>
													<path d="M18.25 5.74969L14.86 9.13969C14.13 8.39969 13.12 7.95969 12 7.95969C9.76 7.95969 7.96 9.76969 7.96 11.9997C7.96 13.1197 8.41 14.1297 9.14 14.8597L5.76 18.2497H5.75C4.64 17.3497 3.62 16.1997 2.75 14.8397C1.75 13.2697 1.75 10.7197 2.75 9.14969C3.91 7.32969 5.33 5.89969 6.91 4.91969C8.49 3.95969 10.22 3.42969 12 3.42969C14.23 3.42969 16.39 4.24969 18.25 5.74969Z"
													      fill="#5B6371"/>
													<path d="M14.8601 12.0001C14.8601 13.5701 13.5801 14.8601 12.0001 14.8601C11.9401 14.8601 11.8901 14.8601 11.8301 14.8401L14.8401 11.8301C14.8601 11.8901 14.8601 11.9401 14.8601 12.0001Z"
													      fill="#5B6371"/>
													<path d="M21.7699 2.22988C21.4699 1.92988 20.9799 1.92988 20.6799 2.22988L2.22988 20.6899C1.92988 20.9899 1.92988 21.4799 2.22988 21.7799C2.37988 21.9199 2.56988 21.9999 2.76988 21.9999C2.96988 21.9999 3.15988 21.9199 3.30988 21.7699L21.7699 3.30988C22.0799 3.00988 22.0799 2.52988 21.7699 2.22988Z"
													      fill="#5B6371"/>
												</svg>`;
						} else {
							wallet.classList.add(('hidden-wallet'));
							wallet.innerHTML = '******';
							button.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M21.25 9.14993C18.94 5.51993 15.56 3.42993 12 3.42993C10.22 3.42993 8.49 3.94993 6.91 4.91993C5.33 5.89993 3.91 7.32993 2.75 9.14993C1.75 10.7199 1.75 13.2699 2.75 14.8399C5.06 18.4799 8.44 20.5599 12 20.5599C13.78 20.5599 15.51 20.0399 17.09 19.0699C18.67 18.0899 20.09 16.6599 21.25 14.8399C22.25 13.2799 22.25 10.7199 21.25 9.14993ZM12 16.0399C9.76 16.0399 7.96 14.2299 7.96 11.9999C7.96 9.76993 9.76 7.95993 12 7.95993C14.24 7.95993 16.04 9.76993 16.04 11.9999C16.04 14.2299 14.24 16.0399 12 16.0399Z" fill="#5B6371"/>
													<path d="M11.9999 9.13989C10.4299 9.13989 9.1499 10.4199 9.1499 11.9999C9.1499 13.5699 10.4299 14.8499 11.9999 14.8499C13.5699 14.8499 14.8599 13.5699 14.8599 11.9999C14.8599 10.4299 13.5699 9.13989 11.9999 9.13989Z" fill="#5B6371"/>
												</svg>`;
						}
					}
				}
			});
		});
	}
}

/****
 * Handle Init Tooltip Bootstrap
 */
export function handleInitTooltipBS() {
	const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
	if (tooltipTriggerList.length > 0) {
		const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
	}
}

/****
 * Handle Limit Character Textarea
 */
export function handleCharacterInput() {
	const textareaElm = document.querySelectorAll('.handleLimitCharacterInput');

	if (textareaElm.length > 0) {
		textareaElm.forEach(function (textarea) {
			const limit = parseInt(textarea.dataset.limit, 10);
			const parentElement = textarea.closest('.handleCharacterInput');
			const countDisplay = parentElement.querySelector('.handleCountCharacterInput');

			textarea.addEventListener('input', function () {
				setTimeout(function () {
					let currentLength = textarea.value.length;

					if (currentLength >= limit) {
						parentElement.classList.add('error-limit');
						textarea.value = textarea.value.substring(0, limit);
						currentLength = limit;
					} else {
						parentElement.classList.remove('error-limit');
					}

					countDisplay.textContent = `(${currentLength}/${limit})`;
				}, 0);
			});
		});
	}
}

/****
 * Handle More Voucher
 */
export function handleMoreVoucher() {
	const buttonMoreVouchers = document.querySelectorAll('.handleMoreVoucherButton');

	if (buttonMoreVouchers.length > 0) {
		buttonMoreVouchers.forEach(function (buttonMoreVoucher) {
			const parentElement = buttonMoreVoucher.closest('.handleMoreVoucher');

			const htmlButtonMoreVoucherExpand = buttonMoreVoucher.innerHTML;

			const htmlButtonMoreVoucherCollapse = `Thu gọn
													<svg width="15" height="8" viewBox="0 0 15 8" fill="none"
													     xmlns="http://www.w3.org/2000/svg">
														<path fill-rule="evenodd" clip-rule="evenodd"
														      d="M14.2071 0.292893C14.5976 0.683418 14.5976 1.31658 14.2071 1.70711L8.20711 7.70711C7.81658 8.09763 7.18342 8.09763 6.79289 7.70711L0.792892 1.70711C0.402368 1.31658 0.402369 0.683417 0.792892 0.292893C1.18342 -0.0976317 1.81658 -0.0976317 2.20711 0.292893L7.5 5.58579L12.7929 0.292893C13.1834 -0.0976312 13.8166 -0.0976311 14.2071 0.292893Z"
														      fill="#F5C349"/>
													</svg>`;

			buttonMoreVoucher.addEventListener('click', function () {

				if(parentElement.classList.contains('is-expand')) {
					buttonMoreVoucher.innerHTML = htmlButtonMoreVoucherExpand;
					parentElement.classList.remove('is-expand');
				} else {
					buttonMoreVoucher.innerHTML = htmlButtonMoreVoucherCollapse;
					parentElement.classList.add('is-expand')
				}
			});
		});
	}
}

window.addEventListener('load', function () {
	window.addEventListener("resize", () => {
		windowWidth = window.innerWidth;
	});

	handleToggleTypePassword();
	handleInitMaterialDate();
	handleInitMaterialOnLoad();
	handleCallDatePickerMaterial();

	handleSliderHero();

	handleToggleSidebar();
	handleToggleWallet();
	handleInitTooltipBS();
	handleCharacterInput();
	handleMoreVoucher();
});



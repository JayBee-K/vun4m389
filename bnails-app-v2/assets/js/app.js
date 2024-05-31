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
			effect: "cards",
			grabCursor: true,
			cardsEffect: {
				perSlideOffset: 8,
				perSlideRotate: 0,
				rotate: 0,
				slideShadows: 0
			},
			loop: true,
			centeredSlides: true,
			speed: 300,
			autoplay: {
				delay: 7000000,
				disableOnInteraction: true,
			},
			on: {
				transitionEnd: function (slider) {
					let activeSlide = slider.slides[slider.activeIndex];
					let prevSlide = activeSlide.previousElementSibling;
					if (prevSlide) {
						prevSlide.classList.add('hidden-slide');
					}
				},
				transitionStart: function (slider) {
					let activeSlide = slider.slides[slider.activeIndex];
					activeSlide.classList.remove('hidden-slide');

					let nextSlide = activeSlide.nextElementSibling;
					if (nextSlide) {
						nextSlide.classList.remove('hidden-slide');
					}
				}
			}
		}
		handleSwiper(elmSwiper + ' .swiper', objSwiper);
	}
}

export const handleSliderAppointment = function () {
	if (document.getElementById('appointmentSlider') !== null) {
		const elmSwiper = '#appointmentSlider';
		const objSwiper = {
			autoplay: {
				delay: 7000,
				disableOnInteraction: 1,
			},
			speed: 1000,
			loop: 0,
			slidesPerView: 1.25,
			spaceBetween: 15,
			breakpoints: {
				991: {
					slidesPerView: 3.25,
				},
				575: {
					slidesPerView: 2.25,
				},
				375: {
					slidesPerView: 1.25,
				}
			}
		}
		handleSwiper(elmSwiper + ' .swiper', objSwiper);
	}
}

/***
 * Function init spin lucky
 */
export const handleSpin = function () {
	let spinWrapper = document.getElementById('spinWrapper'),
		spinCanvas = document.getElementById('spinCanvas'),
		spinButton = document.getElementById('spinButton');


	if (spinWrapper !== null && spinCanvas !== null && spinButton !== null) {
		let spinWheel = 0; // Lượt quay đã dùng
		let spinLimit = 3; // Lượt quay giới hạn

		let modalSpin = new bootstrap.Modal('#modalSpin');
		let modalSpinContent = document.getElementById('modalSpin').querySelector('.spin-content');

		// Template phần thưởng khi quay xong
		let spinCongratulation = function (reward) {
			modalSpinContent.innerHTML = `<div class="spin-image">
                        <img src="./assets/images/congratulations.png" width="120" height="120" class="img-fluid" alt="">
                    </div>
                    <div class="spin-title fz-20 fw-700 dark-color">
                        Congratulations!
                    </div>
                    <div class="spin-desc fz-15">
                        Congratulations, you have received a <span class="primary-color fw-700">${reward}</span> reward
                        from Bnails.
                    </div>
                    <div class="spin-button">
                        <button type="button" data-bs-dismiss="modal"
                                class="fz-15 button-theme button-theme_primary w-100">
                            Okay
                        </button>
                    </div>`;
			modalSpin.show();
		}

		// Template thông báo hết lượt quay
		let spinSorry = function () {
			modalSpinContent.innerHTML = `<div class="spin-image">
                        <img src="./assets/images/crying.png" width="120" height="120" class="img-fluid" alt="">
                    </div>
                    <div class="spin-title fz-20 fw-700 dark-color">
                        Sorry!
                    </div>
                    <div class="spin-desc fz-15">
                        Sorry, your turn is over
                    </div>
                    <div class="spin-button">
                        <button type="button" data-bs-dismiss="modal"
                                class="fz-15 button-theme button-theme_primary w-100">
                            Earn spins
                        </button>
                    </div>`;
			modalSpin.show();
		}

		/****
		 * Function quay xong
		 * Set lại text của button
		 * Tính toán lượt quay
		 * Show ra thông báo phần thưởng
		 */
		const doneSpin = function (spinObj) {
			spinWheel++;

			spinButton.innerHTML = 'Spin!';

			theWheel.stopAnimation(false);
			theWheel.draw();
			wheelSpinning = false;

			spinCongratulation(spinObj.text)

		}

		/****
		 * Khởi tạo vòng xoay
		 * Tính kích thước của vòng xoay
		 * Object vòng xoay
		 */
		let spinSize = document.getElementById('spinWrapper').offsetWidth - 20;
		document.getElementById('spinCanvas').setAttribute('height', spinSize);
		document.getElementById('spinCanvas').setAttribute('width', spinSize);

		if (document.getElementById('spinTurn') !== null) {
			document.getElementById('spinTurn').setAttribute('style', '--spacing: ' + (spinSize / 2 + 20) + 'px')
		}

		// Data anh sẽ truyền vào tại đây nha
		let objectData = [
			{
				fillStyle: '#e3fcfa',
				text: 'Voucher',
				textLineWidth: 0,
			},
			{
				fillStyle: '#bcf8f5',
				text: '50 Coin',
				textLineWidth: 0,
			},
			{
				fillStyle: '#e3fcfa',
				text: 'Voucher',
				textLineWidth: 0,
			},
			{
				fillStyle: '#bcf8f5',
				text: '100 Coin',
				textLineWidth: 0,
			},
			{
				fillStyle: '#e3fcfa',
				text: 'Dừng tại đây',
				textLineWidth: 0,
			},
			{
				fillStyle: '#bcf8f5',
				text: '100 Coin',
				textLineWidth: 0,
			},
			{
				fillStyle: '#e3fcfa',
				text: 'Voucher',
				textLineWidth: 0,
			},
			{
				fillStyle: '#bcf8f5',
				text: '500 Coin',
				textLineWidth: 0,
			},
			{
				fillStyle: '#e3fcfa',
				text: 'Voucher',
				textLineWidth: 0,
			},
			{
				fillStyle: '#bcf8f5',
				text: '200 Coin',
				textLineWidth: 0,
			}
		];

		/****
		 * anglePause: Vòng xoay sẽ dừng ở n độ
		 * anglePause = 360 / a * b - ((360 / a) / 2)
		 * Vòng xoay = 360(độ)
		 * Tham số a: objectData.length (các phần của vòng xoay)
		 * Tham số b: vị trí sẽ dừng lại
		 * Tham số ((360 / a) / 2): luôn luôn dừng ở chính giữa của 1 phần
		 * Ví dụ vòng xoay sẽ dừng ở mảng ghép thứ 5 (theo chiều kim đồng hồ)
		 * */
		let anglePause = (360 / objectData.length) * 5 - ((360 / objectData.length) / 2);

		let theWheel = new Winwheel({
			outerRadius: (spinSize / 2) + 13, // Bán kính ngoài
			innerRadius: 40, // Size lỗ trung tâm
			textFontSize: 14, // Size chữ
			textOrientation: 'horizontal', // Chữ nằm ngang
			textAlignment: 'center', // Căn chỉnh văn bản ra bên ngoài bánh xe.
			textDirection: 'reversed',
			responsive: true,
			textFontFamily: "Verdana",
			textFillStyle: '#1aada6',
			lineWidth: 0,
			strokeStyle: 0,
			textLineWidth: 0,
			numSegments: 10, // Số ô
			segments: objectData,
			animation: // Chỉ định hình động để sử dụng.
				{
					spins: 1, // Số vòng quay hoàn chỉnh mặc định.
					callbackFinished: doneSpin,
					type: 'spinToStop',
					duration: 5,
					stopAngle: anglePause
				},
			pins: {
				number: 10,
				responsive: true,
				fillStyle: 'silver',
				outerRadius: 4,
			}
		});

		let wheelSpinning = false;
		let wheelPower = 3;

		/****
		 * Bắt đầu quay
		 * Dựa vào biến wheelSpinning để ngăn người dùng click tiếp khi vòng quay đang quay
		 * Kiếm tra số lượt đã quay so với tổng lượt quay đang có
		 * Thay đổi text của button quay để hiển thị vòng quay đang quay
		 */
		const startSpin = function () {
			if (wheelSpinning === false) {
				if (spinWheel < spinLimit) {
					spinButton.innerHTML = 'Spin<span class="loading-dots"></span>';

					theWheel.rotationAngle = 0;
					theWheel.animation.spins = wheelPower;

					theWheel.startAnimation();

					wheelSpinning = true;

				} else {
					spinSorry();
				}
			}
		}

		spinButton.addEventListener('click', () => startSpin());
	}
}

/***
 * Function calculator size chat editor
 */
export function handleCalcHeightTextarea() {
	const editorForm = document.getElementById('handleCalcSizeForm');
	if (editorForm !== null) {
		const editorFormChange = editorForm.querySelector('#handleEditorChange');
		if (editorFormChange !== null) {
			editorFormChange.addEventListener('input', () => {
				if (editorFormChange.value.trim() !== '') {
					editorForm.style.height = (editorFormChange.scrollHeight + 30) + 'px';
				} else {
					editorForm.style.height = '51px';
				}
			});
		}
	}
}

/***
 * Function highlight input when focus
 */
export function handleFocusInput() {
	const wrapperInput = document.querySelectorAll('.handleFocusInput');
	if (wrapperInput !== null) {
		wrapperInput.forEach((wrapper) => {
			const inputFocus = wrapper.querySelector('.focusInput');
			if (inputFocus !== null) {
				inputFocus.addEventListener('focus', function () {
					wrapper.classList.add('focus-input');
				});

				inputFocus.addEventListener('blur', function () {
					if (inputFocus.value.trim() === '') {
						wrapper.classList.remove('focus-input');
					}
				});
			}
		});
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

/****=
 * Handle Call Modal Location & Fill Data
 */

export function handleModalLocation() {
	let callModalLocation = document.querySelectorAll('.callModalLocation');
	let modalLocation = document.getElementById('modalLocation');
	if (callModalLocation !== null && modalLocation !== null) {
		callModalLocation.forEach(function (item) {
			item.addEventListener('click', function () {

				// Lấy lại vị trí của input và gán vào modal
				// (mục đích để khi selected danh sách sẽ fill vào input trước đó

				let target = item.getAttribute('data-fill');
				modalLocation = new bootstrap.Modal('#modalLocation')
				modalLocation._element.setAttribute('data-target', target);
				modalLocation.show();

				let targetModal = item.getAttribute('data-modal');
				if (document.getElementById(targetModal) !== null) {
					const modalFilter = bootstrap.Modal.getInstance('#' + targetModal);
					modalLocation._element.setAttribute('data-modal', targetModal);
					modalFilter.hide();
				}
			});
		});


		// Nếu mở modal Location từ trong modal Filter
		// Thì khi đóng modal Lcation hoặc đã chọn 1 option (khi chọn 1 option cũng đã gọi lên method hide của modal Location) thì sẽ mở lại modal Filter
		modalLocation.addEventListener('hide.bs.modal', function () {
			let filter = modalLocation._element.getAttribute('data-modal');
			if (document.getElementById(filter) !== null) {
				const modalFilter = bootstrap.Modal.getInstance('#' + filter);
				modalFilter.show();
			}
		});
	}

	let handleChangeList = document.getElementById('handleChangeList');
	if (handleChangeList !== null) {
		let handleChangeListItem = handleChangeList.querySelectorAll('.handleChangeListItem');
		if (handleChangeListItem !== null) {
			handleChangeListItem.forEach(function (item) {
				item.addEventListener('click', function () {
					if (item.classList.contains('is-selected') === false) {
						handleChangeListItem.forEach(function (el) {
							el.classList.remove('is-selected');
						});
						item.classList.add('is-selected');
					}

					// Lấy lại giá trị attribute của modal và tìm vị trí của input để fill giá trị của select
					// (kết hợp với đoạn script phía trên)

					let value = item.getAttribute('data-value');
					let target = modalLocation._element.getAttribute('data-target');

					let input = document.querySelector(`.callModalLocation[data-fill="${target}"]`);
					if (input !== null && value !== null) {
						input.value = value;
						input.parentElement.classList.add('focus-input');
						modalLocation.hide()
					}
					// chưa xử lý mở lại modal Filter
				});
			});
		}
	}
}

/****=
 * Handle Call Modal Booking Service & Fill Data
 */

export function handleModalBookingService() {
	let callModalBookingService = document.querySelectorAll('.callModalBookingService');
	let modalBookingService = document.getElementById('modalBookingService');
	if (callModalBookingService !== null && modalBookingService !== null) {
		callModalBookingService.forEach(function (item) {
			item.addEventListener('click', function () {

				// Lấy lại vị trí của input và gán vào modal
				// (mục đích để khi selected danh sách sẽ fill vào input trước đó

				let target = item.getAttribute('data-fill');
				modalBookingService = new bootstrap.Modal('#modalBookingService')
				modalBookingService._element.setAttribute('data-target', target);
				modalBookingService.show();

				let targetModal = item.getAttribute('data-modal');
				if (document.getElementById(targetModal) !== null) {
					const modalFilter = bootstrap.Modal.getInstance('#' + targetModal);
					modalBookingService._element.setAttribute('data-modal', targetModal);
					modalFilter.hide();
				}
			});
		});


		// Nếu mở modal BookingService từ trong modal Filter
		// Thì khi đóng modal BookingService hoặc đã chọn 1 option (khi chọn 1 option cũng đã gọi lên method hide của modal BookingService) thì sẽ mở lại modal Filter
		modalBookingService.addEventListener('hide.bs.modal', function () {
			let filter = modalBookingService._element.getAttribute('data-modal');
			if (document.getElementById(filter) !== null) {
				const modalFilter = bootstrap.Modal.getInstance('#' + filter);
				modalFilter.show();
			}
		});
	}

	let handleChangeService = document.getElementById('handleChangeService');
	if (handleChangeService !== null) {
		let handleChangeServiceItem = handleChangeService.querySelectorAll('.handleChangeServiceItem');
		if (handleChangeServiceItem !== null) {
			handleChangeServiceItem.forEach(function (item) {
				item.addEventListener('click', function () {
					if (item.classList.contains('is-selected') === false) {
						handleChangeServiceItem.forEach(function (el) {
							el.classList.remove('is-selected');
						});
						item.classList.add('is-selected');
					}

					// Lấy lại giá trị attribute của modal và tìm vị trí của input để fill giá trị của select
					// (kết hợp với đoạn script phía trên)

					let value = item.getAttribute('data-value');
					let target = modalBookingService._element.getAttribute('data-target');

					let input = document.querySelector(`.callModalBookingService[data-fill="${target}"]`);
					if (input !== null && value !== null) {
						input.value = value;
						input.parentElement.classList.add('focus-input');
						modalBookingService.hide()
					}
					// chưa xử lý mở lại modal Filter
				});
			});
		}
	}
}


/****=
 * Handle Call Modal Booking Stylist & Fill Data
 */

export function handleModalBookingStylist() {
	let callModalBookingStylist = document.querySelectorAll('.callModalBookingStylist');
	let modalBookingStylist = document.getElementById('modalBookingStylist');
	if (callModalBookingStylist !== null && modalBookingStylist !== null) {
		callModalBookingStylist.forEach(function (item) {
			item.addEventListener('click', function () {

				// Lấy lại vị trí của input và gán vào modal
				// (mục đích để khi selected danh sách sẽ fill vào input trước đó

				let target = item.getAttribute('data-fill');
				modalBookingStylist = new bootstrap.Modal('#modalBookingStylist')
				modalBookingStylist._element.setAttribute('data-target', target);
				modalBookingStylist.show();

				let targetModal = item.getAttribute('data-modal');
				if (document.getElementById(targetModal) !== null) {
					const modalFilter = bootstrap.Modal.getInstance('#' + targetModal);
					modalBookingStylist._element.setAttribute('data-modal', targetModal);
					modalFilter.hide();
				}
			});
		});


		// Nếu mở modal BookingStylist từ trong modal Filter
		// Thì khi đóng modal BookingStylist hoặc đã chọn 1 option (khi chọn 1 option cũng đã gọi lên method hide của modal BookingStylist) thì sẽ mở lại modal Filter
		modalBookingStylist.addEventListener('hide.bs.modal', function () {
			let filter = modalBookingStylist._element.getAttribute('data-modal');
			if (document.getElementById(filter) !== null) {
				const modalFilter = bootstrap.Modal.getInstance('#' + filter);
				modalFilter.show();
			}
		});
	}

	let handleChangeStylist = document.getElementById('handleChangeStylist');
	if (handleChangeStylist !== null) {
		let handleChangeStylistItem = handleChangeStylist.querySelectorAll('.handleChangeStylistItem');
		if (handleChangeStylistItem !== null) {
			handleChangeStylistItem.forEach(function (item) {
				item.addEventListener('click', function () {
					if (item.classList.contains('is-selected') === false) {
						handleChangeStylistItem.forEach(function (el) {
							el.classList.remove('is-selected');
						});
						item.classList.add('is-selected');
					}

					// Lấy lại giá trị attribute của modal và tìm vị trí của input để fill giá trị của select
					// (kết hợp với đoạn script phía trên)

					let value = item.getAttribute('data-value');
					let image = item.getAttribute('data-image');
					let target = modalBookingStylist._element.getAttribute('data-target');

					let input = document.querySelector(`.callModalBookingStylist[data-fill="${target}"]`);
					if (input !== null && value !== null) {
						input.value = value;
						input.parentElement.classList.add('focus-input');

						if (image !== null) {
							input.insertAdjacentHTML("beforeBegin", `<div class="form-group_button form-group_button__prepend position-absolute top-50 translate-middle-y pe-none zi-2">
																					<img src="${image}" alt="">
																				</div>`);
						}

						let handleSelectTime = document.getElementById('handleSelectTime');
						if (handleSelectTime !== null) {
							handleSelectTime.style.display = 'block';
						}

						modalBookingStylist.hide();
					}
					// chưa xử lý mở lại modal Filter
				});
			});
		}
	}
}


window.addEventListener('load', function () {
	window.addEventListener("resize", () => {
		windowWidth = window.innerWidth;
		handleSpin();
	});

	handleSliderHero();
	handleSliderAppointment();
	handleSpin();
	handleCalcHeightTextarea();
	handleFocusInput();
	handleToggleTypePassword();
	handleInitMaterialDate();
	handleInitMaterialOnLoad();
	handleCallDatePickerMaterial();
	handleModalLocation();
	handleModalBookingService();
	handleModalBookingStylist();
});



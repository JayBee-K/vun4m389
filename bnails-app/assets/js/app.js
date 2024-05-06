'use strict';
export let windowWidth = window.innerWidth;

/***
 * Function init swiper
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
            effect: 'coverflow',
            direction: 'vertical',
            loop: true,
            slideToClickedSlide: true,
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            coverflowEffect: {
                rotate: -5,
                stretch: 170,
                depth: 100,
                modifier: 1,
                slideShadows: false
            },
            speed: 300,
            autoplay: {
                delay: 7000,
                disableOnInteraction: true,
            },
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
        let theWheel = new Winwheel({
            outerRadius: (spinSize / 2) + 13, // Bán kính ngoài
            innerRadius: 40, // Size lỗ trung tâm
            textFontSize: 14, // Size chữ
            textOrientation: 'horizontal', // Chữ nằm ngang
            textAlignment: 'center', // Căn chỉnh văn bản ra bên ngoài bánh xe.
            textDirection: 'reversed',
            responsive: true,
            textFontFamily: "Verdana",
            textFillStyle: '#FB95DB',
            lineWidth: 0,
            strokeStyle: 0,
            textLineWidth: 0,
            numSegments: 10, // Số ô
            segments: [
                {
                    fillStyle: '#FEE4F6',
                    text: 'Voucher',
                    textLineWidth: 0
                },
                {
                    fillStyle: '#FDCAED',
                    text: '50 Coin',
                    textLineWidth: 0
                },
                {
                    fillStyle: '#FEE4F6',
                    text: 'Voucher',
                    textLineWidth: 0
                },
                {
                    fillStyle: '#FDCAED',
                    text: '100 Coin',
                    textLineWidth: 0
                },
                {
                    fillStyle: '#FEE4F6',
                    text: 'Voucher',
                    textLineWidth: 0,
                },
                {
                    fillStyle: '#FDCAED',
                    text: '100 Coin',
                    textLineWidth: 0
                },
                {
                    fillStyle: '#FEE4F6',
                    text: 'Voucher',
                    textLineWidth: 0
                },
                {
                    fillStyle: '#FDCAED',
                    text: '500 Coin',
                    textLineWidth: 0
                },
                {
                    fillStyle: '#FEE4F6',
                    text: 'Voucher',
                    textLineWidth: 0
                },
                {
                    fillStyle: '#FDCAED',
                    text: '200 Coin',
                    textLineWidth: 0
                }
            ],
            animation: // Chỉ định hình động để sử dụng.
                {
                    spins: 1, // Số vòng quay hoàn chỉnh mặc định.
                    callbackFinished: doneSpin,
                    type: 'spinToStop',
                    duration: 5,
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

window.addEventListener('load', function () {
    window.addEventListener("resize", () => {
        windowWidth = window.innerWidth;
        handleSpin();
    });

    handleSliderHero();
    handleSliderAppointment();
    handleSpin();
});



;(function ($) {
    'use strict';

    const handleSliderHero = function () {
        if($('#section-hero .swiper').length){
            new Swiper('#section-hero .swiper', {
                speed: 1000,
                slidesPerView: 1,
                effect: 'fade',
                navigation: {
                    nextEl: '#section-hero .button-next',
                    prevEl: '#section-hero .button-prev',
                }
            });
        }
    }

    const handleSliderCustomers = function () {
        if($('#section-customers .swiper').length){
            new Swiper('#section-customers .swiper', {
                slidesPerView: 1.1,
                centeredSlides: true,
                speed: 1000,
                loop: true,
                navigation: {
                    nextEl: '#section-customers .button-next',
                    prevEl: '#section-customers .button-prev',
                },
                breakpoints: {
                    425: {
                        spaceBetween: 15,
                        slidesPerView: 1.2
                    },
                    576: {
                        spaceBetween: 15,
                        slidesPerView: 1
                    },
                    768: {
                        spaceBetween: 20,
                        slidesPerView: 2
                    },
                    992: {
                        spaceBetween: 20,
                        slidesPerView: 2
                    },
                    1024: {
                        slidesPerView: 2,
                        spaceBetween: 25,
                    },
                    1440: {
                        slidesPerView: 2,
                        spaceBetween: 40,
                    },

                }
            });
        }
    }

    const handleSliderReward = function () {
        if($('#section-reward .swiper').length){
            new Swiper('#section-reward .swiper', {
                slidesPerView: 1.3,
                speed: 1000,
                spaceBetween: 20,
                breakpoints: {
                    375: {
                        spaceBetween: 10,
                        slidesPerView: 1.3,
                    },
                    425: {
                        spaceBetween: 10,
                        slidesPerView: 1.4,
                    },
                    576: {
                        slidesPerView: 2.1,
                    },
                    768: {
                        slidesPerView: 2.5,
                    },
                    992: {
                        slidesPerView: 2.5,

                    },
                    1024: {
                        slidesPerView: 3,

                    },


                }
            });
        }
    }

    const handleSliderGallery = function () {
        if($('#section-gallery .swiper').length){
            new Swiper('#section-gallery .swiper', {
                slidesPerView: 2.1,
                spaceBetween: 16,
                centeredSlides: true,
                loop: true,
                speed: 1000,
                autoplay: {
                    delay: 6000,
                    disableOnInteraction: true,
                },
                breakpoints: {
                    425: {
                        slidesPerView: 2.3
                    },
                    576: {
                        slidesPerView: 3
                    },
                    768: {
                        slidesPerView: 4
                    },
                    992: {
                        slidesPerView: 4
                    },
                    1024: {
                        slidesPerView: 4.3
                    },
                    1440: {
                        slidesPerView: 4.3
                    },

                }
            });
        }
    }

    const handleCallSidebarService = function(){
        let btnService = $('#sidebar-service');
        let closeService = $('#close-service');
        if(btnService.length){
            btnService.click(function(){
                $('body').addClass('show-service');
            })
        }

        if(closeService.length){
            closeService.click(function(){
                $('body').removeClass('show-service');
            })
        }
    }

    const handleSliderCalendar = function () {
        if($('#swiper-calendar .swiper').length){
            new Swiper('#swiper-calendar .swiper', {
                slidesPerView: 2.1,
                spaceBetween: 10,
                loop:true,
                speed: 1000,
                autoplay: {
                    delay: 6000,
                    disableOnInteraction: true,
                },
                navigation: {
                    nextEl: '#swiper-calendar .button-next',
                    prevEl: '#swiper-calendar .button-prev',
                },
                breakpoints: {
                    425: {
                        slidesPerView: 2.8
                    },
                    576: {
                        slidesPerView: 3
                    },
                    768: {
                        slidesPerView: 3.5
                    },
                    992: {
                        slidesPerView: 4
                    },
                    1024: {
                        slidesPerView: 5
                    },
                    1440: {
                        slidesPerView: 5
                    },

                }
            });
        }
    }

    const handleSliderClock = function () {
        if($('#swiper-clock .swiper').length){
            new Swiper('#swiper-clock .swiper', {
                slidesPerView: 2.1,
                spaceBetween: 10,
                loop:true,
                speed: 1000,
                autoplay: {
                    delay: 6000,
                    disableOnInteraction: true,
                },
                navigation: {
                    nextEl: '#swiper-clock .button-next',
                    prevEl: '#swiper-clock .button-prev',
                },
                breakpoints: {
                    425: {
                        slidesPerView: 2.3
                    },
                    576: {
                        slidesPerView: 3
                    },
                    768: {
                        slidesPerView: 3.5
                    },
                    992: {
                        slidesPerView: 4
                    },
                    1024: {
                        slidesPerView: 5
                    },
                    1440: {
                        slidesPerView: 5
                    },

                }
            });
        }
    }
    $(function () {
        handleSliderHero();
        handleSliderCustomers();
        handleSliderReward();
        handleSliderGallery();
        handleCallSidebarService();
        handleSliderCalendar();
        handleSliderClock();
    });

})(jQuery);
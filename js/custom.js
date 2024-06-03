/* ----------------------------------------------------------------

[ Custom settings ]

01. ScrollIt
02. Preloader
03. Navbar scrolling background
04. Close navbar-collapse when a clicked
05. Sections background image from data background
06. Slider-Fade owlCarousel
07. Services 1 owlCarousel
08. Services 2 owlCarousel
09. Services Single owlCarousel
10. Blog owlCarousel 
11. Team owlCarousel 
12. Clients owlCarousel
13. Testimonials owlCarousel
14. MagnificPopup
15. Accordion
16. Isotope Active Masonry Gallery
17. Animations
18. YouTubePopUp
19. Parallaxie
20. Tooltip
21. Wow Animated
22. Splitting Text
23. Reveal Effect
24. Magnet Cursor
25. Mouse Cursor
26. Scroll back to top
27. Contact Form
28. Our Team Slider


------------------------------------------------------------------- */

(function () {
    'use strict';
    var wind = $(window);
    // ScrollIt
    $.scrollIt({
        upKey: 38, // key code to navigate to the next section
        downKey: 40, // key code to navigate to the previous section
        easing: 'swing', // the easing function for animation
        scrollTime: 600, // how long (in ms) the animation takes
        activeClass: 'active', // class given to the active nav element
        onPageChange: null, // function(pageIndex) that is called when page is changed
        topOffset: -70, // offste (in px) for fixed top navigation
    });

    // Preloader
    $('.preloader').fadeOut(400);
    $('.preloader-bg').delay(300).fadeOut(400);
    var wind = $(window);

    const tabs = document.querySelector('.gallery-filter');
    const tabButton = document.querySelectorAll('.tab-button');
    const contents = document.querySelectorAll('.itemBefore');
    
    
    tabs.onclick = (e) => {
        const id = e.target.dataset.id;
        if (id) {
            tabButton.forEach((btn) => {
                btn.classList.remove('active');
            });
            e.target.classList.add('active');

            contents.forEach((content) => {
                content.classList.remove('active');
            });
            const element = document.getElementById(id);
            element.classList.add('active');
        }
    };
    setTimeout(()=>{
        tabButton.forEach((el) => {
            if(el.classList.contains("active")){
                contents.forEach((content) => {
                    if (content.id !== el.dataset.id) {
                        content.classList.remove('active')
                    }
                });
            }
        });
    }, 0)
    
    // $('.gallery-items').imagesLoaded(function () {
    //     // Add isotope on click filter function
    //     $('.gallery-filter li').on('click', function () {
    //         $('.gallery-filter li').removeClass('active');
    //         $(this).addClass('active');
    //         var selector = $(this).attr('data-filter');
    //         $('.gallery-items').isotope({
    //             filter: selector,
    //             // animationOptions: {
    //             //     duration: 750,
    //             //     easing: 'linear',
    //             //     queue: false,
    //             // },
    //         });
    //         return false;
    //     });
    //     $('.gallery-items').isotope({
    //         filter: '.endosphere',
    //         itemSelector: '.single-item',
    //         layoutMode: 'masonry',
    //     });
    // });
    // Testimonials owlCarousel
    $('.testimonials .owl-carousel').owlCarousel({
        loop: true,
        margin: 30,
        mouseDrag: true,
        autoplay: true,
        autoplayTimeout: 7000,
        dots: true,
        nav: false,
        navText: [
            '<i class="fa-light fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa-light fa-angle-right" aria-hidden="true"></i>',
        ],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 1,
            },
            1000: {
                items: 1,
            },
        },
    });
    // Accordion
    if ($('.accordion-box').length) {
        $('.accordion-box').on('click', '.acc-btn', function () {
            var outerBox = $(this).parents('.accordion-box');
            var target = $(this).parents('.accordion');

            if ($(this).next('.acc-content').is(':visible')) {
                //return false;
                $(this).removeClass('active');
                $(this).next('.acc-content').slideUp(300);
                $(outerBox).children('.accordion').removeClass('active-block');
            } else {
                $(outerBox).find('.accordion .acc-btn').removeClass('active');
                $(this).addClass('active');
                $(outerBox).children('.accordion').removeClass('active-block');
                $(outerBox)
                    .find('.accordion')
                    .children('.acc-content')
                    .slideUp(300);
                target.addClass('active-block');
                $(this).next('.acc-content').slideDown(300);
            }
        });
    }
    // Magnet Cursor
    function magnetize(el, e) {
        var mX = e.pageX,
            mY = e.pageY;
        const item = $(el);
        const customDist = item.data('dist') * 20 || 80;
        const centerX = item.offset().left + item.width() / 2;
        const centerY = item.offset().top + item.height() / 2;
        var deltaX = Math.floor(centerX - mX) * -0.35;
        var deltaY = Math.floor(centerY - mY) * -0.35;
        var distance = calculateDistance(item, mX, mY);
        if (distance < customDist) {
            TweenMax.to(item, 0.5, {
                y: deltaY,
                x: deltaX,
                scale: 1,
            });
            item.addClass('magnet');
        } else {
            TweenMax.to(item, 0.6, {
                y: 0,
                x: 0,
                scale: 1,
            });
            item.removeClass('magnet');
        }
    }
    function calculateDistance(elem, mouseX, mouseY) {
        return Math.floor(
            Math.sqrt(
                Math.pow(mouseX - (elem.offset().left + elem.width() / 2), 2) +
                    Math.pow(
                        mouseY - (elem.offset().top + elem.height() / 2),
                        2
                    )
            )
        );
    }
    function lerp(a, b, n) {
        return (1 - n) * a + n * b;
    }
    // Mouse Cursor
    class Cursor {
        constructor() {
            this.bind();
            //seleziono la classe del cursore
            this.cursor = document.querySelector('.js-cursor');

            this.mouseCurrent = {
                x: 0,
                y: 0,
            };

            this.mouseLast = {
                x: this.mouseCurrent.x,
                y: this.mouseCurrent.y,
            };

            this.rAF = undefined;
        }

        bind() {
            ['getMousePosition', 'run'].forEach(
                (fn) => (this[fn] = this[fn].bind(this))
            );
        }

        getMousePosition(e) {
            this.mouseCurrent = {
                x: e.clientX,
                y: e.clientY,
            };
        }

        run() {
            this.mouseLast.x = lerp(this.mouseLast.x, this.mouseCurrent.x, 0.2);
            this.mouseLast.y = lerp(this.mouseLast.y, this.mouseCurrent.y, 0.2);

            this.mouseLast.x = Math.floor(this.mouseLast.x * 100) / 100;
            this.mouseLast.y = Math.floor(this.mouseLast.y * 100) / 100;

            this.cursor.style.transform = `translate3d(${this.mouseLast.x}px, ${this.mouseLast.y}px, 0)`;

            this.rAF = requestAnimationFrame(this.run);
        }

        requestAnimationFrame() {
            this.rAF = requestAnimationFrame(this.run);
        }

        addEvents() {
            window.addEventListener('mousemove', this.getMousePosition, false);
        }

        on() {
            this.addEvents();

            this.requestAnimationFrame();
        }

        init() {
            this.on();
        }
    }
    if ($('.js-cursor').length > 0) {
        const cursor = new Cursor();
        cursor.init();
        // Cursor Conditions
        $(
            '.blog-home .owl-theme .item, .team .owl-theme .item, .services .owl-theme .item, .services2 .owl-theme .item, .testimonials .item, .gallery-item .item'
        ).hover(function () {
            $('.cursor').toggleClass('drag');
        });
        // Cursor Class Settings
        // $('a, ').hover(function () {
        // $('.cursor').toggleClass('light');
        // });
    }

    // Scroll back to top
    var progressPath = document.querySelector('.progress-wrap path');
    var pathLength = progressPath.getTotalLength();
    progressPath.style.transition = progressPath.style.WebkitTransition =
        'none';
    progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
    progressPath.style.strokeDashoffset = pathLength;
    progressPath.getBoundingClientRect();
    progressPath.style.transition = progressPath.style.WebkitTransition =
        'stroke-dashoffset 10ms linear';
    var updateProgress = function () {
        var scroll = $(window).scrollTop();
        var height = $(document).height() - $(window).height();
        var progress = pathLength - (scroll * pathLength) / height;
        progressPath.style.strokeDashoffset = progress;
    };
    updateProgress();
    $(window).scroll(updateProgress);
    var offset = 150;
    var duration = 550;
    jQuery(window).on('scroll', function () {
        if (jQuery(this).scrollTop() > offset) {
            jQuery('.progress-wrap').addClass('active-progress');
        } else {
            jQuery('.progress-wrap').removeClass('active-progress');
        }
    });
    jQuery('.progress-wrap').on('click', function (event) {
        event.preventDefault();
        jQuery('html, body').animate(
            {
                scrollTop: 0,
            },
            duration
        );
        return false;
    });
})();

// gsap
//about images start
gsap.registerPlugin(ScrollTrigger);
gsap.from('.img_smooth_left', {
    scrollTrigger: {
        trigger: '.img_smooth_left',
        scrub: true,
        start: 'top bottom',
        end: '-100% top',
    },
    translateY: 300,
    translateX: -100,
    transformOrigin: 'left center',
    ease: 'sine.inOut',
    opacity: 0.5,
});

gsap.from('.img_smooth_right_bottom', {
    scrollTrigger: {
        trigger: '.img_smooth_right_bottom',
        scrub: true,
        start: 'top bottom',
        end: '-100% top',
    },
    translateY: 200,
    translateX: 100,
    transformOrigin: 'left center',
    ease: 'sine.inOut',
    opacity: 0.5,
});
gsap.from('.img_smooth_right_top', {
    scrollTrigger: {
        trigger: '.img_smooth_right_top',
        scrub: true,
        start: 'top bottom',
        end: '-100% top',
    },
    translateY: 150,
    translateX: 100,
    transformOrigin: 'left center',
    ease: 'sine.inOut',
    opacity: 0.5,
});
gsap.from('#title-block', {
    scrollTrigger: {
        trigger: '#about',
        scrub: true,
        start: 'top bottom',
        end: '40% bottom',
        marker: true,
    },
    translateY: 80,
    transformOrigin: 'left center',
    ease: 'sine.inOut',
    opacity: 0.5,
});
gsap.from('.smoothShowTitle', {
    scrollTrigger: {
        trigger: '.smoothShowTitle',
        scrub: true,
        start: 'top bottom',
        end: '+=50%',
        marker: true,
    },
    translateX: '100%',
    transformOrigin: 'left center',
    ease: 'sine.inOut',
    opacity: 0,
});

gsap.from('#title-block-xl', {
    scrollTrigger: {
        trigger: '#services',
        scrub: true,
        start: 'top bottom',
        end: '+=50%',
    },
    translateX: '100%',
    transformOrigin: 'left center',
    ease: 'sine.inOut',
    opacity: 0.5,
});

gsap.from('.about-title-svg', {
    scrollTrigger: {
        trigger: '#about',
        scrub: true,
        start: 'top bottom',
        end: '40% bottom',
    },
    translateY: 60,
    transformOrigin: 'left center',
    ease: 'sine.inOut',
    opacity: 0.5,
});

gsap.utils
    .toArray('.service-vertical-text-wrapper')
    .forEach(function (container) {
        let itm = container.querySelector('.service-vertical-text');
        gsap.from(itm, {
            scrollTrigger: {
                trigger: itm,
                scrub: true,
                start: 'top bottom',
                end: 'bottom center',
            },
            transformOrigin: 'left center',
            ease: 'sine.inOut',
            opacity: 0.5,
            rotate: -20,
            scale: '0.2',
            translateX: 40,
        });
    });

gsap.utils.toArray('.gigi-circle').forEach(function (container) {
    let itm = container.querySelector('img');
    gsap.to(itm, {
        scrollTrigger: {
            trigger: itm,
            scrub: true,
            start: 'bottom bottom',
            end: 'top top',
        },
        ease: 'sine.inOut',
        rotate: 360,
        scale: 1.2,
    });
});
gsap.utils.toArray('.itemShowFromBottom').forEach(function (container) {
    let itm = container.querySelector('.img-wrapper-gsap');
    gsap.from(itm, {
        scrollTrigger: {
            trigger: itm,
            scrub: true,
            start: 'top bottom',
            end: '+=50%',
        },
        ease: 'sine.inOut',
        opacity: 0,
        translateY: 200,
    });
});

//mobile gsap

gsap.utils
    .toArray('.img_smooth_left_mobile_wrapper')
    .forEach(function (container) {
        let itm = container.querySelector('img');
        gsap.from(container, {
            scrollTrigger: {
                trigger: itm,
                scrub: true,
                start: 'top bottom',
                end: '-80% top',
            },
            translateX: '-100%',
            transformOrigin: 'left center',
            ease: 'sine.inOut',
            opacity: 0.1,
            rotate: 20,
        });
    });

gsap.utils
    .toArray('.img_smooth_right_mobile_wrapper')
    .forEach(function (container) {
        let itm = container.querySelector('img');
        gsap.from(container, {
            scrollTrigger: {
                trigger: itm,
                scrub: true,
                start: 'top bottom',
                end: '-80% top',
            },
            translateX: '100%',
            transformOrigin: 'left center',
            ease: 'sine.inOut',
            opacity: 0.1,
            rotate: 20,
        });
    });

let arrServicesContent = gsap.utils.toArray('.service-bottom');

arrServicesContent.forEach(function (container) {
    let itm = container.querySelector('a');
    gsap.from(itm, {
        scrollTrigger: {
            trigger: itm,
            scrub: true,
            start: '-100% bottom',
            end: '+=25%',
        },
        translateX: '100%',
        opacity: '0.5',
        transformOrigin: 'left center',
        ease: 'sine.inOut',
    });
});
arrServicesContent.forEach(function (container) {
    gsap.from(container, {
        scrollTrigger: {
            trigger: container,
            scrub: true,
            start: 'top bottom',
            end: 'bottom bottom',
        },
        translateY: '10%',
        opacity: '0',
        transformOrigin: 'left center',
        ease: 'sine.inOut',
    });
});

//about images end
//our team
var infiniteSwiper = new Swiper('.js-infinite-slider', {
    slidesPerView: 2,
    spaceBetween: 20,
    speed: 5000,
    loop: true,
    autoplay: {
        delay: 0,
    },
    breakpoints: {
        400: {
            slidesPerView: 3,
        },
        550: {
            slidesPerView: 4,
        },
        768: {
            slidesPerView: 5,
        },
        1000: {
            slidesPerView: 6,
        },
    },
});
const split = new SplitText('.about-sticky p', {
    type: 'words',
});
const splitMain = new SplitText('.main-text-wrapper p', {
    type: 'words',
});

ScrollTrigger.matchMedia({
    // desktop
    // desktop
    '(min-width: 993px)': function () {
        gsap.utils.toArray('.block-title').forEach(function (container) {
            let itm = container.querySelector('h1');
            gsap.from(itm, {
                scrollTrigger: {
                    trigger: itm,
                    scrub: true,
                    start: 'top bottom',
                    end: '+=50%',
                },
                translateX: '-30%',
                transformOrigin: 'left center',
                ease: 'sine.inOut',
                opacity: 0.5,
            });
        });
        gsap.utils
            .toArray('.element_feature')
            .forEach(function (container, idx) {
                console.log(idx);
                gsap.from(container, {
                    scrollTrigger: {
                        trigger: container,
                        scrub: true,
                        start: 'top bottom',
                        end: 'center top',
                    },
                    translateY: '100',
                    transformOrigin: 'left center',
                    ease: 'sine.inOut',
                    opacity: 0.8,
                    rotate: idx % 2 === 0 ? 30 : -30,
                });
            });

        const tlMain = gsap
            .timeline({
                scrollTrigger: {
                    trigger: '.main-text-wrapper p',
                    start: 'bottom bottom',
                    end: 'top center',
                    scrub: 1,
                },
            })
            .set(
                splitMain.words,
                {
                    color: '#333338',
                    stagger: 0.1,
                },
                0.1
            );
        gsap.to('.women-img', {
            scrollTrigger: {
                trigger: '.women-img',
                scrub: true,
                start: 'top 15%',
                end: 'bottom center',
            },
            translateY: 300,
            ease: 'sine.inOut',
        });
        let image = document.querySelector('.small-girl-img');
        let container = document.querySelector('.small-img-container');

        gsap.to(image, {
            y: () => 50,
            ease: 'sine.inOut',
            scrollTrigger: {
                trigger: container,
                scrub: true,
                pin: false,
                invalidateOnRefresh: true,
            },
        });
        gsap.to('.small-img-container', {
            ease: 'sine.inOut',
            scrollTrigger: {
                trigger: '.small-img-container',
                scrub: true,
                start: 'top bottom',
                end: 'bottom center',
            },
            rotate: 20,
            scale: 1.1,
        });
        gsap.to('.fashion-circle-img', {
            ease: 'sine.inOut',
            scrollTrigger: {
                trigger: '.fashion-circle-img',
                scrub: true,
                start: 'top bottom',
                end: 'bottom top',
            },
            rotate: 180,
        });
        gsap.to('.main-bg-logo', {
            ease: 'sine.inOut',
            scrollTrigger: {
                trigger: '.main-bg-logo',
                scrub: true,
                start: '-30% top',
                end: 'bottom top',
            },
            scale: 1.2,
            opacity: 0.5,
            translateY: -50,
        });
        gsap.from('.main-text-wrapper a', {
            ease: 'sine.inOut',
            scrollTrigger: {
                trigger: '.main-text-wrapper a',
                scrub: true,
                start: 'bottom bottom',
                end: 'top center',
            },
            opacity: 0.7,
            translateY: 50,
        });
        gsap.from('.main-bg-logo', {
            ease: 'sine.inOut',
            duration: 1,
            delay: 0.75,
            scale: 0,
            opacity: 0,
            translateY: '100%',
        });
        gsap.from('.women-wrapper', {
            ease: 'sine.inOut',
            opacity: 0,
            duration: 0.85,
            delay: 1.25,
            opacity: 0,
            translateY: 200,
        });
        gsap.from('.navbar', {
            ease: 'sine.inOut',
            opacity: 0,
            duration: 0.75,
            translateY: '-100%',
        });
        gsap.from('.logo', {
            ease: 'sine.inOut',
            opacity: 0,
            duration: 0.75,
            delay: 1.25,
            scale: 0,
        });
    },

    // table
    '(max-width: 993px)': function () {
        gsap.utils.toArray('.block-title').forEach(function (container) {
            let itm = container.querySelector('h1');
            gsap.from(itm, {
                scrollTrigger: {
                    trigger: itm,
                    scrub: true,
                    start: 'top bottom',
                    end: '+=50%',
                },
                translateX: '-100%',
                transformOrigin: 'left center',
                ease: 'sine.inOut',
                opacity: 0.5,
            });
        });
        gsap.utils
            .toArray('.element_feature')
            .forEach(function (container, idx) {
                console.log(idx);
                gsap.from(container, {
                    scrollTrigger: {
                        trigger: container,
                        scrub: true,
                        start: 'top bottom',
                        end: 'center top',
                    },
                    translateY: '40',
                    transformOrigin: 'left center',
                    ease: 'sine.inOut',
                    opacity: 0.8,
                    rotate: idx % 2 === 0 ? 30 : -30,
                });
            });

        gsap.to('.women-wrapper', {
            scrollTrigger: {
                trigger: '.mobileWomens',
                scrub: true,
                start: 'top center',
                end: 'bottom top',
            },
            translateY: 150,
            ease: 'sine.inOut',
        });
        gsap.to('.main-text-wrapper p', {
            scrollTrigger: {
                trigger: '.main-text-wrapper p',
                scrub: true,
                start: '-100% top',
                end: 'bottom top',
            },
            translateX: '50%',
            opacity: 0,
            ease: 'sine.inOut',
        });
        gsap.to('.main-text-wrapper a', {
            scrollTrigger: {
                trigger: '.main-text-wrapper a',
                scrub: true,
                start: '-200% top',
                end: 'bottom top',
            },
            translateX: '-80%',
            opacity: 0,
            ease: 'sine.inOut',
        });

        let image = document.querySelector('.small-girl-img');
        let container = document.querySelector('.small-img-container');

        gsap.to(image, {
            y: () => 20,
            ease: 'sine.inOut',
            scrollTrigger: {
                trigger: container,
                scrub: true,
                pin: false,
                invalidateOnRefresh: true,
            },
        });
        gsap.to('.small-img-container', {
            ease: 'sine.inOut',
            scrollTrigger: {
                trigger: '.mobileWomens',
                scrub: true,
                start: 'top center',
                end: 'bottom center',
            },
            rotate: 15,
            scale: 1.1,
        });
        gsap.to('.fashion-circle-img', {
            ease: 'sine.inOut',
            scrollTrigger: {
                trigger: '.fashion-circle-img',
                scrub: true,
                start: 'top bottom',
                end: 'bottom top',
            },
            rotate: 180,
        });
        gsap.to('.main-bg-logo', {
            ease: 'sine.inOut',
            scrollTrigger: {
                trigger: '.main-images',
                scrub: true,
                start: 'top top',
                end: 'bottom top',
            },
            scale: 1.3,
            opacity: 0.1,
            translateY: -50,
        });
        const tlMain = gsap
            .timeline({
                delay: 1.5,
            })
            .set(
                splitMain.words,
                {
                    opacity: 1,
                    stagger: 0.1,
                },
                0.1
            );
        gsap.from('.main-bg-logo', {
            ease: 'sine.inOut',
            duration: 0.5,
            delay: 0.5,
            opacity: 0,
            translateX: '100%',
        });
        gsap.from('.small-girl-wrapper', {
            ease: 'sine.inOut',
            duration: 0.75,
            delay: 1.5,
            opacity: 0,
            translateY: '100%',
        });
        gsap.from('.main-text-wrapper', {
            ease: 'sine.inOut',
            duration: 0.5,
            delay: 0.75,
            opacity: 0,
            translateX: '-100%',
        });

        gsap.from('.womm', {
            ease: 'sine.inOut',
            opacity: 0,
            duration: 0.7,
            delay: 1,
            opacity: 0,
            translateY: 200,
        });
        gsap.from('.navbar', {
            ease: 'sine.inOut',
            opacity: 0,
            duration: 0.75,
            translateY: '-100%',
        });
        gsap.from('.logo', {
            ease: 'sine.inOut',
            opacity: 0,
            duration: 0.75,
            delay: 0.75,
            scale: 0,
        });
    },
    '(min-width: 768px)': function () {
        const tl = gsap
            .timeline({
                scrollTrigger: {
                    trigger: '.about-sticky p',
                    start: 'center bottom',
                    end: 'bottom top',
                    scrub: 1,
                },
            })
            .set(
                split.words,
                {
                    color: '#000',
                    translateY: -10,
                    stagger: 1,
                },
                2
            );

        gsap.utils.toArray('.hideOpacityBottom').forEach(function (container) {
            let itm = container.querySelector('.service-item');
            gsap.to(itm, {
                scrollTrigger: {
                    trigger: itm,
                    scrub: true,
                    start: '50%',
                    end: '+=50%',
                },
                ease: 'sine.inOut',
                opacity: 0,
                translateY: 100,
            });
        });
    },

    // mobile
    '(max-width: 768px)': function () {
        const tl = gsap
            .timeline({
                scrollTrigger: {
                    trigger: '.img_smooth_right_mobile_wrapper',
                    start: 'bottom bottom',
                    end: 'bottom center',
                    scrub: 1,
                },
            })
            .set(
                split.words,
                {
                    color: '#000',
                    translateY: -10,
                    stagger: 1,
                },
                1
            );

        gsap.utils.toArray('.hideOpacityBottom').forEach(function (container) {
            let itm = container.querySelector('.service-item');
            gsap.to(itm, {
                scrollTrigger: {
                    trigger: itm,
                    scrub: true,
                    start: 'center top',
                    end: 'bottom top',
                },
                ease: 'sine.inOut',
                opacity: 0,
                translateY: -50,
                translateX: '200%',
                rotate: 10,
            });
        });
    },

    // all
    all: function () {
        // ScrollTriggers created here aren't associated with a particular media query,
        // so they persist.
    },
});

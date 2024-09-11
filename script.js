document.addEventListener("DOMContentLoaded", () => {

    function backgroundAnimate() {

        function mainColorAnimateOnHeight(start, end, startColor, endColor) {
            gsap.timeline({
                scrollTrigger: {
                    trigger: "html",
                    start: start,
                    end: end,
                    scrub: true,
                }
            }).fromTo('html', { '--main-color': startColor }, { '--main-color': endColor }, 0)
        }

        mainColorAnimateOnHeight('top bottom', '+=3600', 'rgb(212, 201, 201)', 'rgb(212, 212, 201)');
        mainColorAnimateOnHeight('1900px', '+=3600', 'rgb(212, 212, 201)', 'rgb(201, 212, 201)');
        mainColorAnimateOnHeight('5500px', '+=3600', 'rgb(201, 212, 201)', 'rgb(201, 212, 212)');
        mainColorAnimateOnHeight('9100px', '+=3600', 'rgb(201, 212, 212)', 'rgb(201, 201, 212)');
    }

    function scrollToInit() {
        let scrollToLinks = document.querySelectorAll('[data-scroll-to-id]');
        scrollToLinks.forEach(link => {
            link.addEventListener('click', () => {
                let contentToScroll = document.querySelector("#" + link.dataset.scrollToId)
                console.log(contentToScroll);
                
                let targetPosition = contentToScroll.getBoundingClientRect().top - 50; // целевая позиция прокрутки
                console.log(targetPosition);
                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth",
                })
            })
        })
    }

    function startAnimation() {
        gsap.timeline().fromTo(".header__title-text.first", { rotateX: "-90", y: "75%", z: "-500", opacity: 0.4 }, { rotateX: "0", y: 0, z: 0, opacity: 1, duration: 1 }, 0)
            .fromTo(".header__title-text.second", { rotateX: "-90", y: "50%", z: "-500", opacity: 0 }, { rotateX: "0", y: 0, z: 0, opacity: 1, duration: 1 }, 0.1)
            .fromTo(".header__title-version-text", { rotateX: "-90", y: "25%", z: "-500", opacity: 0 }, { rotateX: "0", y: 0, z: 0, opacity: 1, duration: 1 }, 0.2)
            .fromTo(".header__heading", { y: "-90%" }, { y: 0 }, 0.2)

    }

    function headerHeading() {
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".header",
                start: "top top",
                end: "+=500px",
                scrub: true,
            }
        }).fromTo(".header__heading-text.first", { y: 0 }, { x: "200", y: '400', ease: "linear" }, 0)
            .fromTo(".header__heading-text.second", { y: 0 }, { x: "-200", y: '400', ease: "linear" }, 0)
    }

    function headerTitle() {
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".header",
                start: "top top",
                end: "+=400px",
                scrub: 1,
            }
        }).fromTo(".header__title-text.first", { y: 0 }, { y: '-180', duration: 1.2, ease: "linear" }, 0)
            .fromTo(".header__title-text.second", { y: 0 }, { y: '-140', duration: 1.2, ease: "linear" }, 0)
            .fromTo(".header__title-version-text.first", { y: 0 }, { y: '-220', duration: 1.4, ease: "power1.in" }, 0)
            .fromTo(".header__title-version-text.second", { y: 0 }, { y: '-370', duration: 1.4, ease: "power1.in" }, 0)
            .fromTo(".header__title-version-text.third", { y: 0 }, { y: '-320', duration: 1.4, ease: "power1.in" }, 0)
            .fromTo(".header__title-version-text.fourth", { y: 0 }, { y: '-270', duration: 1.4, ease: "power1.in" }, 0)
            .fromTo(".header__thematic-break", { y: 0 }, { y: '-200', duration: 1.4, ease: "power1.in" }, 0)

        let tl2 = gsap.timeline({
            scrollTrigger: {
                trigger: ".header__thematic-break",
                start: "top 85%",
                end: "+=1px",
                toggleActions: "play none none none",
            }
        }).fromTo(".header__thematic-break", { scale: 0 }, { scale: 1, duration: 0.6, ease: "linear" }, 0)
    }


    function parallaxSectionAnimation() {

        function scrollTriggerParallaxTemplate(number) {
            let scrollTriggerParallaxSection = {
                scrollTrigger: {
                    trigger: ".parallax-section" + '.' + number, // Следим за этой секцией
                    start: "top bottom", // Когда верх секции достигает верха экрана
                    end: "bottom top", // Когда низ секции достигает верха экрана
                    scrub: true // Плавное воспроизведение анимации при скролле
                }
            }
            return scrollTriggerParallaxSection
        }


        gsap.timeline(scrollTriggerParallaxTemplate('two')).fromTo(".parallax-section.two .background",
            { scale: 1.2, y: "10%" }, { y: "-10%", ease: "none" })

        gsap.timeline(scrollTriggerParallaxTemplate('two')).fromTo(".speed-control-first-img",
            { y: "10%" }, { y: "-10%", ease: "none", })

        gsap.timeline(scrollTriggerParallaxTemplate('two')).fromTo('.speed-control__text-container',
            { y: "-300%" }, { y: "300%", ease: "none" })

        gsap.timeline(scrollTriggerParallaxTemplate('four')).fromTo(".parallax-section.four .background",
            { x: '-45%', scale: 1.4, y: "20%" }, { y: "-20%", ease: "none", })

        gsap.timeline(scrollTriggerParallaxTemplate('four')).fromTo('.speed-control-second-img', {
            y: "20%"
        }, {
            y: "-20%"
        })

        gsap.timeline(scrollTriggerParallaxTemplate('eight')).fromTo(".parallax-section.eight .background",
            { scale: 1.8, y: "40%" }, {
            y: "-40%", // Фон будет двигаться медленнее контента
            ease: "none",
        })
        gsap.timeline(scrollTriggerParallaxTemplate('eight')).fromTo('.speed-control-third-img', {
            y: "20%"
        }, {
            y: "-20%"
        })

    }


    // bubble
    function isInviewAdd(selector) {
        // console.log(selector);

        gsap.timeline({
            scrollTrigger: {
                trigger: selector, // Следим за этой секцией
                start: "top-=" + (window.innerHeight / 4) + " bottom", // Когда верх секции достигает низа экрана
                end: "bottom top", // Когда низ секции достигает верха экрана
                onEnter: () => { document.querySelector(selector).classList.add('is-inview') },
                onLeave: () => { document.querySelector(selector).classList.remove('is-inview') },
                onEnterBack: () => { document.querySelector(selector).classList.add('is-inview') },
                onLeaveBack: () => { document.querySelector(selector).classList.remove('is-inview') },
            }
        })
    }



    function blockBubbleSetSpeed(selector, perc) {
        gsap.timeline({
            scrollTrigger: {
                trigger: selector, // Следим за этой секцией
                start: "top bottom", // Когда верх секции достигает 90% от верха экрана
                end: "bottom top", // Когда низ секции достигает верха экрана
                scrub: 1,
            }
        }).fromTo(selector, {
            y: "0",
            ease: "none"
        }, {
            y: perc

        }, 0)
    }




    // scroll direction
    function scrollDirection() {
        gsap.timeline({
            scrollTrigger: {
                trigger: '.scroll-direction', // Следим за этой секцией
                start: "top top", // Когда верх секции достигает верха экрана
                end: "+=" + (window.innerHeight * 1.5), // Когда низ секции достигает + 3000 пикслеей
                pin: true,
            }
        })
        // console.log((window.innerHeight*1.5));
    }

    function rotatedBlocksAnimation() {
        let scrollTriggerSettings = {
            scrollTrigger: {
                trigger: '.scroll-direction', // Следим за этой секцией
                start: "top bottom", // Когда верх секции достигает 90% от верха экрана
                end: "+=" + (window.innerHeight * 3), // Когда низ секции достигает верха экрана
                scrub: true,
            }
        }

        gsap.timeline(scrollTriggerSettings)
            .fromTo(".rotated-block.first", { rotate: "26deg" }, { x: '-50%', y: '-200%', duration: 1 }, 0)
            .fromTo(".rotated-block.second", { x: "-120%", y: "100%" }, { x: '20%', duration: 1 }, 0)

        gsap.timeline(scrollTriggerSettings)
            .fromTo(".rotated-block.third", { rotate: "9deg", x: "120%", y: "240%" }, { x: '-45%', duration: 1 }, 0)

        gsap.timeline(scrollTriggerSettings)
            .fromTo(".rotated-block.fourth", { rotate: "-19deg", x: "80%", y: "0%" }, { x: '-85%', y: "600%", duration: 1 }, 1)

        gsap.timeline(scrollTriggerSettings)
            .fromTo(".rotated-block.fifth", { rotate: "3deg", x: "-500%", y: "-200%" }, { x: '160%', y: "600%", duration: 2 }, 1);
    }


    function lerpAnimations() {
        const duration = window.innerHeight;
        let scrollTriggerTemplateDelay = (selector, scrub, dur) => {
            if (dur == undefined) dur = duration
            let template = gsap.timeline({
                scrollTrigger: {
                    trigger: '.lerp-text__container.' + selector, // Следим за этой секцией
                    start: "top bottom", // Когда верх секции достигает 90% от верха экрана
                    end: "+=" + dur, // Когда низ секции достигает верха экрана
                    scrub: scrub,
                }
            })
            return template;
        }

        // первый
        scrollTriggerTemplateDelay('first', 0.5)
            .fromTo(".lerp-text__container.first .block-bubble__container", { y: '100%' }, { y: '-400%', duration: 1 }, 0);
        scrollTriggerTemplateDelay('first', true)
            .fromTo(".lerp-text__container.first .lerp-text", { y: '100%' }, { y: '-400%', duration: 1 }, 0);




        // второй
        scrollTriggerTemplateDelay('second', 0.5)
            .fromTo(".lerp-text__container.second .block-bubble__container", { y: '0%' }, { y: '-400%', duration: 1 }, 0);
        scrollTriggerTemplateDelay('second', true)
            .fromTo(".lerp-text__container.second .lerp-text", { y: '0%' }, { y: '-400%', duration: 1 }, 0);



        // третий
        scrollTriggerTemplateDelay('third', 0.9, duration / 2)
            .fromTo(".lerp-text__container.third .block-bubble__container", { y: "0%" }, { y: '-400%', duration: 1 }, 0);
        // scrollTriggerTemplateDelay('third', 0.5, duration/2)
        //     .fromTo(".lerp-text__container.third .lerp-word", { y: "0%" }, { y: '-400%', duration: 1, stagger: 0.5 }, 0);
        let lerpWords = gsap.utils.toArray(".lerp-text__container.third .lerp-word");
        lerpWords.forEach((word, index) => {
            index = index / 6

            scrollTriggerTemplateDelay('third', index, duration / 2)
                .fromTo(word, { y: "0%" }, { y: '-400%', duration: 1 }, 0);
        });




        // четвертый
        scrollTriggerTemplateDelay('fourth', 3)
            .fromTo(".lerp-text__container.fourth .block-bubble__container", { y: "0%" }, { y: '-400%', duration: 1 }, 0);
        scrollTriggerTemplateDelay('fourth', 2)
            .fromTo(".lerp-text__container.fourth .lerp-text", { y: "0%" }, { y: '-400%', duration: 1 }, 0);
    }



    function fixedSectionPin() {
        gsap.timeline({
            scrollTrigger: {
                trigger: '.fixed-wrapper', // Следим за этой секцией
                start: "top bottom", // Когда верх секции достигает низа экрана
                end: "+=" + (window.innerHeight * 2), // Когда низ секции достигает + три экрана
                // pin: true, // Закрепляем секцию
                // pinSpacing: false // Если не хотите отступов при закреплении
                scrub: true,

            }
        }).fromTo('.fixed-container', { y: '-100%' }, { y: "100%", ease: 'none', }, 0)

        gsap.timeline({
            scrollTrigger: {
                trigger: '.fixed-section__text-container.first', // Следим за этой секцией
                start: "top 50%", // Когда верх секции достигает низа экрана
                end: "+=" + (window.innerHeight / 2), // Когда низ секции достигает + три экрана
                pin: true, // Закрепляем секцию
            }
        })
        gsap.timeline({
            scrollTrigger: {
                trigger: '.fixed-section__text-container.second', // Следим за этой секцией
                start: "top 50%", // Когда верх секции достигает низа экрана
                end: "+=" + (window.innerHeight / 2.2), // Когда низ секции достигает + три экрана
                pin: true, // Закрепляем секцию
            }
        })
        // }).fromTo('.fixed-section__text-container',{},{y:"100%", ease: 'none',},0)
    }

    function init() {
        gsap.registerPlugin(ScrollTrigger);
        backgroundAnimate()
        scrollToInit()
        startAnimation()
        headerHeading()
        headerTitle()
        isInviewAdd('.block-bubble.first');
        isInviewAdd('.block-bubble.second');
        isInviewAdd('.block-bubble.third');
        isInviewAdd('.block-bubble.fourth');
        isInviewAdd('.block-bubble.fifth');
        isInviewAdd('.block-bubble.sixth');
        parallaxSectionAnimation();
        scrollDirection()
        blockBubbleSetSpeed(".block-bubble.speed-four", "-800%")
        blockBubbleSetSpeed(".block-bubble.speed-three", "-600%")
        blockBubbleSetSpeed(".block-bubble.speed-two", "-400%")
        blockBubbleSetSpeed(".block-bubble.speed-six", "-1200%")
        blockBubbleSetSpeed(".block-bubble.speed-nine", "-1800%")
        rotatedBlocksAnimation()
        fixedSectionPin()
        isInviewAdd('.block-bubble.seventh');
        isInviewAdd('.block-bubble.eighth');
        isInviewAdd('.block-bubble.nineth');
        isInviewAdd('.block-bubble.tenth');
        lerpAnimations()


        ScrollTrigger.refresh();

        const lenis = new Lenis({
            duration: 0.2,
        })

        // lenis.on('scroll', (e) => {
        //   console.log(e)
        // })

        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

    }
    init()


})



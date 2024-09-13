let winHeight = window.innerHeight
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}
function debounce(func, delay) {
    let timeoutId;
    return function () {
        const args = arguments;
        const context = this;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(context, args), delay);
    }
}
// pins section from center to endPos (endPos = amount of pixels from center)
function pinSectionFromCenter(selector, endPos) {
    gsap.timeline({
        scrollTrigger: {
            trigger: selector, // Следим за этой секцией
            start: "top 50%", // Когда верх секции середины экрана
            end: "+=" + endPos,
            pin: true, // Закрепляем секцию
        }
    })
}
// pins section from startPos to endPos (endPos = amount of pixels from startPos)
function pinSection(selector, startPos, endPos) {
    gsap.timeline({
        scrollTrigger: {
            trigger: selector, // Следим за этой секцией
            start: startPos, // Когда верх секции середины экрана
            end: "+=" + endPos,
            pin: true, // Закрепляем секцию
        }
    })
}
// setting speed to block
function blockSetSpeed(selector, perc) {
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
// adds class 'is-inview' if in viewport
function isInviewAdd(selector) {
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
// setting speed and add effect when appearing to bubbles
function bubblesInit() {
    isInviewAdd('.block-bubble.first');
    isInviewAdd('.block-bubble.second');
    isInviewAdd('.block-bubble.third');
    isInviewAdd('.block-bubble.fourth');
    isInviewAdd('.block-bubble.fifth');
    isInviewAdd('.block-bubble.sixth');
    blockSetSpeed(".block-bubble.speed-four", "-800%");
    blockSetSpeed(".block-bubble.speed-three", "-600%");
    blockSetSpeed(".block-bubble.speed-two", "-400%");
    blockSetSpeed(".block-bubble.speed-six", "-1200%");
    blockSetSpeed(".block-bubble.speed-nine", "-1800%");
}

// selection all elements with attribute [data-scroll-to-id] and adds click event listener that smooth scrolling to section
function scrollToInit() {
    let scrollToLinks = document.querySelectorAll('[data-scroll-to-id]');
    scrollToLinks.forEach(link => {
        link.onclick = () => {
            let contentToScroll = document.querySelector("#" + link.dataset.scrollToId)
            // console.log(contentToScroll);

            let targetPosition = contentToScroll.getBoundingClientRect().top - 50; // целевая позиция прокрутки
            // console.log(targetPosition);
            window.scrollTo({
                top: targetPosition,
                behavior: "smooth",
            })
        }
    })
}



// all other functions
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
    mainColorAnimateOnHeight('12700px', '+=3600', 'rgb(201, 201, 212)', 'rgb(212, 201, 212)');
    mainColorAnimateOnHeight('16300px', '+=3600', 'rgb(212, 201, 212)', 'rgb(212, 201, 201)');
}

function startAnimation() {
    gsap.timeline().fromTo(".header__title-text.first", { rotateX: "-90", y: "75%", z: "-500", opacity: 0.4 }, { rotateX: "0", y: 0, z: 0, opacity: 1, duration: 1 }, 0)
        .fromTo(".header__title-text.second", { rotateX: "-90", y: "50%", z: "-500", opacity: 0 }, { rotateX: "0", y: 0, z: 0, opacity: 1, duration: 1 }, 0.1)
        .fromTo(".header__title-version-text", { rotateX: "-90", y: "25%", z: "-500", opacity: 0 }, { rotateX: "0", y: 0, z: 0, opacity: 1, duration: 1 }, 0.2)
        .fromTo(".header__heading", { y: "-90%" }, { y: 0 }, 0.2)
        .fromTo('.header__title', { perspective: 1000 }, { delay: 1, perspective: "none" })

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

// scroll direction
function scrollDirection() {
    pinSection('.scroll-direction', 'top top', winHeight * 1.5)
}

function rotatedBlocksAnimation() {
    let scrollTriggerSettings = {
        scrollTrigger: {
            trigger: '.scroll-direction', // Следим за этой секцией
            start: "top bottom", // Когда верх секции достигает 90% от верха экрана
            end: "+=" + (winHeight * 3), // Когда низ секции достигает верха экрана
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



    isInviewAdd('.block-bubble.seventh');
    isInviewAdd('.block-bubble.eighth');
    isInviewAdd('.block-bubble.nineth');
    isInviewAdd('.block-bubble.tenth');
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


    pinSectionFromCenter('.fixed-section__text-container.first', winHeight / 2)
    pinSectionFromCenter('.fixed-section__text-container.second', winHeight / 2.2)
}

function render3dImage() {
    let image3d = document.getElementById('image3d');
    const section = document.querySelector('.section3d');
    const contextImage3d = image3d.getContext('2d');

    const frameCount = 50;

    // создаем массив изображений и заполняем
    const images = [];
    for (let index = 0; index < frameCount; index++) {
        const imgUltraSpeaker = new Image();
        imgUltraSpeaker.src = `img/speaker/echo-solo (${index + 1}).png`;
        images.push(imgUltraSpeaker);
    }

    const animatedFrame = {
        frame: 0,
    };
    // анимируем frame в ultraSpeaker
    // при каждой итерации анимации frame становится на один меньше
    gsap.to(animatedFrame, {
        frame: frameCount - 1,
        snap: 'frame',
        ease: 'none',
        scrollTrigger: {
            scrub: 0.00001,
            trigger: section,
            start: 'top 90%',
            end: '+=' + winHeight * 2,
        },
        onUpdate: () => {
            // Запускаем анимацию с помощью requestAnimationFrame
            requestAnimationFrame(renderImage);
        },
    });

    images[0].onload = renderImage;

    let lastFrame = -1;
    function renderImage() {
        if (animatedFrame.frame !== lastFrame) {
            contextImage3d.clearRect(0, 0, image3d.width, image3d.height);
            contextImage3d.drawImage(images[animatedFrame.frame], 0, 0, image3d.width, image3d.height);
            lastFrame = animatedFrame.frame; // Сохраняем последний отрисованный кадр
        }
        // Используем requestAnimationFrame для плавности
        requestAnimationFrame(renderImage);
    }
}

function section3d() {
    // pinSectionFromCenter('.section3d__text-container', winHeight * 2)
    pinSection('.section3d', 'top 18%', winHeight * 2)
}

function updateCursor(e) {
    // console.log(e);

    gsap.to(".cursor", {
        duration: 0.3,
        x: e.pageX - 25,
        y: e.pageY - 25,
        ease: "linear",
        stagger: 0.1,
    });
    //   cursorDot.style.top = e.pageY + "px";
    //   cursorDot.style.left = e.pageX + "px";
}
function customCursorInit() {
    window.onmousemove = throttle(updateCursor, 16)
    const baseElement = document.querySelector('.cursor')

    for (let i = 0; i < 4; i++) {
        const clone = baseElement.cloneNode(true);
        document.querySelector('.cursor-container').appendChild(clone);
    }
}


function cubesAnimation() {
    gsap.to(".cubes-title-animation-wrapper .cube", {
        motionPath: {
            path: "M5.66292 27.9032C3.87571 33.7116 2.13116 40.0915 4.43607 46.1526C8.76625 57.5394 20.5894 61.458 31.6568 63.3285C39.4711 64.6492 50.5438 65.0509 58.2641 63.2902C65.043 61.7441 69.2309 55.8157 71.6061 49.6798C73.6914 44.2927 73.293 38.1247 73.293 32.4656C73.293 25.682 73.2296 23.2136 67.8872 18.4335C63.6041 14.6012 56.9942 14.1497 51.5931 13.1043C47.0309 12.2213 42.2198 11.3615 37.5993 12.4909C30.303 14.2745 21.8339 18.003 15.6311 22.229C9.73271 26.2477 8.47694 30.3121 8.42333 37.3346C8.38623 42.1942 7.05075 50.8437 11.0304 54.5489C15.7876 58.9779 21.9123 61.1079 27.8229 63.4818C33.1883 65.6368 39.9799 65.8976 45.7272 66.4723C52.5368 67.1533 61.1903 67.3093 67.6572 65.0921C83.0133 59.8271 87.7852 44.982 87.7852 29.9735C87.7852 15.1593 70.0976 4.56769 56.6155 2.7528C44.3817 1.10594 34.9988 2.94331 25.0241 10.3056C13.4812 18.8254 10.9682 28.6753 12.0272 42.5487C12.9973 55.2565 21.6912 63.4224 30.7367 71.2263C34.5279 74.4972 39.7101 75.5203 44.577 75.5203C53.1636 75.5203 62.1569 76.3677 70.4176 73.6417C79.5937 70.6136 88.777 65.4135 96.5265 59.6479C103.881 54.1762 105.038 47.2164 105.038 38.6765C105.038 22.158 90.7426 9.24455 74.9799 8.04359C69.9129 7.65753 64.7615 7.89023 59.6826 7.89023C55.1683 7.89023 52.3878 10.7947 49.2161 13.5644C40.4339 21.2334 27.8896 28.3484 26.5194 41.0918C25.1366 53.9519 32.056 66.436 42.6984 73.6034C54.5298 81.5714 68.0728 80.2075 81.7276 81.1178C88.5852 81.575 93.2911 82.6867 99.8236 80.0443C104.033 78.3418 110.172 75.7133 112.897 71.9548C114.297 70.0237 114.693 67.7218 115.964 65.7439C118.144 62.354 121.174 59.5955 123.364 56.1974C126.915 50.6869 132.23 46.5595 135.709 41.0918C140.459 33.6271 146.573 25.9216 154.725 21.8456C162.148 18.1341 174.575 17.6282 182.406 20.0054C184.791 20.7293 187.635 21.2207 189.805 22.4974C191.823 23.6843 192.717 25.9428 194.444 27.4431C197.187 29.8248 199.446 32.8106 201.959 35.456C208.488 42.3286 215.279 49.9476 223.582 54.7405C234.065 60.7917 246.532 67.6486 258.547 69.9995C263.96 71.0586 269.623 70.6896 275.11 70.6896C280.179 70.6896 285.6 70.8251 290.292 68.5426C298.893 64.3584 306.744 59.6918 313.832 53.092C315.533 51.5085 317.495 50.2221 319.161 48.6063C320.987 46.8356 321.894 44.4166 323.647 42.5487C328.579 37.2928 332.472 31.9135 338.446 27.7499C346.28 22.29 353.697 17.7249 363.673 19.0852C374.028 20.4972 382.667 26.3347 391.469 31.4304C400.104 36.43 406.67 44.2422 414.817 49.9098C424.794 56.8503 434.414 66.1615 446.83 68.5043C453.584 69.7785 460.615 69.3094 467.457 69.3094C477.739 69.3094 485.556 63.3538 491.342 55.2773C496.776 47.6925 500.32 39.2527 507.138 32.5806C512.59 27.2439 521.756 27.0567 528.799 25.2195C536.364 23.246 543.674 22.1868 551.458 21.3856C564.635 20.029 574.551 21.6287 586.231 27.8265C594.421 32.1724 603.294 36.8581 610.73 42.3954C617.884 47.7227 625.947 51.8536 633.656 56.3508C636.306 57.8965 639.203 59.4221 641.554 61.4115C643.283 62.8742 644.002 64.7055 646.155 65.7822C650.561 67.9854 655.702 68.7513 660.417 69.9995C666.219 71.5351 673.911 73.3496 677.976 67.9292C683.417 60.6748 685.414 50.9373 685.414 42.012C685.414 31.1348 681.249 20.6565 671.037 15.4047C661.436 10.4672 650.762 10.9783 640.251 11.3407C634.043 11.5548 627.506 15.2576 622.001 17.82C615.497 20.848 608.805 23.5215 602.219 26.3697C585.578 33.5654 571.358 45.7447 555.292 54.1271C546.898 58.5066 538.592 60.4475 529.144 60.8748C518.635 61.3501 508.041 61.5404 497.86 58.6511C480.496 53.7237 464.559 46.8633 449.207 37.2963C441.913 32.7507 436.067 26.4659 427.546 24.2993C421.608 22.7897 415.821 20.878 409.641 22.114C397.077 24.6268 387.475 34.1914 377.398 41.2452C365.389 49.6519 353.199 57.7085 338.829 60.8748C332.741 62.2163 326.821 62.4084 320.618 62.4084C316.141 62.4084 310.798 64.8158 306.471 63.3285C301.441 61.5994 296.571 56.6999 293.052 52.9003C288.295 47.7625 283.16 42.6511 277.64 38.3314C267.284 30.2265 256.425 22.3824 242.752 22.3824C238.125 22.3824 233.025 21.7835 228.489 22.8041C222.255 24.2069 218.838 28.3509 213.997 32.0438C207.769 36.7952 202.379 42.3637 195.825 46.766C186.681 52.9076 175.784 56.7096 165.537 60.6064C154.755 64.7066 140.631 66.2657 129.191 64.0186C123.483 62.8974 117.155 58.455 112.245 55.354C106.586 51.7795 100.662 47.7436 95.3763 43.6222C88.4972 38.2588 79.9646 32.5386 71.6828 29.7435C67.5553 28.3505 63.6005 27.5177 59.4909 25.9096C56.51 24.7431 53.4468 24.6952 50.3662 23.9926C46.8133 23.1823 43.4515 21.9039 39.823 21.3856C32.2869 20.309 25.7145 19.0469 18.1231 20.3121C14.8561 20.8566 11.2713 23.0291 8.19329 24.2993C5.66527 25.3427 3.86018 25.7062 2.2124 27.9032",
            // autoRotate: true,
        },
        duration: 20,
        stagger: 0.1,
        repeat: -1,
        yoyo: true,
    });
    gsap.fromTo('.cubes-title-animation-wrapper .cube', { opacity: 0 }, { opacity: 1, delay: 2, duration: 1 })
    gsap.from(".cubes-left-animation-wrapper .cube", {
        y: "96dvh",
        // transformOrigin: "50% 50%",
        duration: 5,
        stagger: 0.1,
        ease: "bounce.inOut",
        repeat: -1,
        yoyo: true,
    });
    gsap.from(".cubes-right-animation-wrapper .cube", {
        y: "96dvh",
        // transformOrigin: "50% 50%",
        duration: 5,
        stagger: 0.1,
        ease: "bounce.inOut",
        repeat: -1,
        yoyo: true,
    });
}

function init() {
    // functions calls
    gsap.registerPlugin(ScrollTrigger);
    gsap.registerPlugin(MotionPathPlugin)
    gsap.registerPlugin(CustomEase)
    backgroundAnimate();
    scrollToInit();
    startAnimation();
    headerHeading();
    headerTitle();
    bubblesInit()
    parallaxSectionAnimation();
    scrollDirection();
    rotatedBlocksAnimation();
    fixedSectionPin();
    lerpAnimations();
    render3dImage();
    section3d();
    customCursorInit();
    cubesAnimation();

    ScrollTrigger.refresh();

    // smooth scroll init
    const lenis = new Lenis()

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    ScrollTrigger.refresh();


}

// when content loading finish we initializing js
document.addEventListener("DOMContentLoaded", () => {
    init()
})
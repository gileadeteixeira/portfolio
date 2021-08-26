export const getTopByRef = (element)=>{
    const id = element.getAttribute('href');
    return document.querySelector(id).offsetTop;
};

export const scrollToPosition = (to)=>{    
    /*window.scroll({
        top: to,
    });*/
    smoothScrollTo(0, to);
};

export const scrollOnClick = (event)=>{
    event.preventDefault();
    const to = getTopByRef(event.target);
    scrollToPosition(to);
};

export const sectionOnScroll = (sections)=>{
    const scrollY = window.pageYOffset;
    sections.forEach(current=>{
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 300;
        let sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(`.nav__menu a[href*=${sectionId}]`).classList.add('active-link');
        } else {
            document.querySelector(`.nav__menu a[href*=${sectionId}]`).classList.remove('active-link');

        }
    });
}


export const scrollToTop = (scrollerTop)=>{
    if (window.pageYOffset >= 200) {
        scrollerTop.classList.add('scroll-top-open');
        scrollerTop.addEventListener("click", (event)=>{
            event.preventDefault();
            scrollToPosition(0);
        });
    }
    else {
        scrollerTop.classList.remove('scroll-top-open');
    }
}

/**
 * Smooth scroll animation
 * @param {int} endX: destination x coordinate
 * @param {int} endY: destination y coordinate
 * @param {int} duration: animation duration in ms
 */
 export const smoothScrollTo = (endX, endY, duration)=>{
    const startX = window.scrollX || window.pageXOffset;
    const startY = window.scrollY || window.pageYOffset;
    const distanceX = endX - startX;
    const distanceY = endY - startY;
    const startTime = new Date().getTime();

    duration = typeof duration !== 'undefined' ? duration : 400;

    // Easing function
    const easeInOutQuart = (time, from, distance, duration) => {
    if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
    return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
    };

    const timer = setInterval(() => {
    const time = new Date().getTime() - startTime;
    const newX = easeInOutQuart(time, startX, distanceX, duration);
    const newY = easeInOutQuart(time, startY, distanceY, duration);
    if (time >= duration) {
        clearInterval(timer);
    }
    window.scroll(newX, newY);
    }, 1000 / 60); // 60 fps
}
export const showRightMenu = (generateModal, container, event, scrollOnClick) => {
    event.preventDefault();
    
    const newModal = document.createElement("div");
    newModal.classList.add("modal-menu");
    newModal.innerHTML = generateModal('menu');

    container.appendChild(newModal);

    const menuBtnClose = document.querySelector('#menu-btn-close');
    const menuItens = document.querySelectorAll('nav.mobile-nav ul li');

    console.log(menuItens);

    menuBtnClose.addEventListener("click", (event)=>{
        event.preventDefault();
        let modal = document.querySelector('.modal-menu');
        container.removeChild(modal);

    });

    menuItens.forEach(
        (item) => {
            item.addEventListener('click', (event)=>{
                scrollOnClick(event);
            });
        }
    );
};

export const showMenu = (toggleId , navId, navListClass) => {
    const toggle = document.getElementById(toggleId);
    const nav = document.getElementById(navId);
    const list = document.querySelector(navListClass);
    const close = () =>{
        const menuIcon = document.getElementById('menu-icon');
        if (menuIcon.className == 'bx bx-menu') {
            nav.classList.add('menu-open');
            menuIcon.className = 'bx bx-x';            
        }
        else {
            nav.classList.remove('menu-open');
            menuIcon.className = 'bx bx-menu';
        }
    }

    if (toggle && nav) {
        toggle.addEventListener("click", () => close());
        nav.addEventListener("click", () => close());
        list.addEventListener("click", () => close());
    }
}

export const loadLinksActions = (scrollOnClick, scrollToPosition)=>{
    const navLinks = document.querySelectorAll('.nav__link');
    const linkAction = (event, key)=>{
        if (key == 0) {
            event.preventDefault();
            scrollToPosition(0);
        }
        else{
            scrollOnClick(event);
        }
        const menuIcon = document.getElementById('menu-icon');
        const navMenu = document.getElementById('nav-menu');
        navMenu.classList.remove('menu-open');
        menuIcon.className = 'bx bx-menu';
    }
    navLinks.forEach(
        (link, key) => {
            link.addEventListener("click", event => linkAction(event, key));
        }
    );
};
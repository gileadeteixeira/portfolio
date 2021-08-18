const container = document.querySelector('.container');
const menuBtn = document.querySelector('#menu-btn-open');

const getTopByRef = (element)=>{
    const id = element.getAttribute('href');
    return document.querySelector(id).offsetTop;
};

const scrolToPosition = (to)=>{    
    window.scroll({
        top: to,
        behavior: 'smooth',
    });
    //smoothScrollTo(0, to);
};

const scrollOnClick = (event)=>{
    event.preventDefault();
    const to = getTopByRef(event.target);
    scrolToPosition(to);
};

const showRightMenu = (container, event) => {
    event.preventDefault();
    const newModal = document.createElement("div");
    newModal.classList.add("modal-menu");
    newModal.innerHTML = `
    <div class="right-bar">
        <button id="menu-btn-close">
            <img src="./assets/icons/inApp-icons/close.svg" alt="close-icon" id="close-icon">
        </button>
        <nav class="mobile-nav">
            <ul>
                <li><a href="#inicio">Início</a></li>
                <li><a href="#sobre-mim">Sobre mim</a></li>
                <li><a href="#principais-projetos">Principais Projetos</a></li>
                <li><a href="#tecnologias">Tecnologias</a></li>
                <li><a href="#contato">Contato</a></li>
            </ul>
        </nav>
    </div>
    `
    container.appendChild(newModal);

    const menuBtnClose = document.querySelector('#menu-btn-close');
    const menuItens = document.querySelectorAll('nav ul li');

    console.log(menuItens)

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

menuBtn.addEventListener("click", (event) => showRightMenu(container,event));



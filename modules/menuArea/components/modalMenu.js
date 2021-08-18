export const showMenuMobile = (container, event) => {
    event.preventDefault();
    let newModal = document.createElement("div");
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

    let btnClose = document.querySelector('#menu-btn-close');
    btnClose.addEventListener("click", (event)=>{
        event.preventDefault();
        let modal = document.querySelector('.modal-menu');
        container.removeChild(modal);

    });
};
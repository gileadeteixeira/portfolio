export const generateModal = (type) =>{
    let w = window.innerWidth;
    let platform = "mobile";
    if(w >= 992){
        platform = "desktop";
    }
    const modal = {
        menu : `
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
        `,

        projects : `
        <div class="modal-info-area">
            <button id="modal-btn-close">
                <img src="./assets/icons/inApp-icons/close.svg" alt="close-icon" id="close-icon">
            </button>
            <div class="modal-info">
                <p>Clique ou toque em um projeto, e ele será exibido no seguinte modelo:</p>
                <img src="./assets/models/project-model-mobile.svg" alt="model-image" class="modal-model">
                <p>QR Code: Clique, toque ou aponte a câmera para acessar o repositório.</p>
            </div>                
        </div>
        `,

        techs : `
        <div class="modal-info-area">
            <button id="modal-btn-close">
                <img src="./assets/icons/inApp-icons/close.svg" alt="close-icon" id="close-icon">
            </button>
            <div class="modal-info">
                <p>Clique ou toque em um projeto, e ele será exibido no seguinte modelo:</p>
                <img src="./assets/models/project-model-mobile.svg" alt="model-image" class="modal-model">
                <p>QR Code: Clique, toque ou aponte a câmera para acessar o repositório.</p>
            </div>                
        </div>
        `
    };


    return modal[type];
};

export const showHelp = (type, container, event)=>{
    event.preventDefault();
    const newModal = document.createElement("div");
    newModal.classList.add("modal-interactive");
    newModal.innerHTML = generateModal(type);
    container.appendChild(newModal);
    const interactiveModalBtnClose = document.querySelector('#modal-btn-close');

    interactiveModalBtnClose.addEventListener("click", (event)=>{
        event.preventDefault();
        let modal = document.querySelector('.modal-interactive');
        container.removeChild(modal);
    });
};
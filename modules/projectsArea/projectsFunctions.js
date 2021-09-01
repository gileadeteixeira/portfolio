import {works} from '../../databases/works.js';

export const createModalProjects = (type, project = null )=>{
    if (type == 'help') {
        return `
        <div class="custom-modal__box">
            <h2 class="custom-modal__title">
                Ajuda
                <i class='bx bx-x custom-modal__icon'></i>
            </h2>
            <div class="custom-modal__data">
                <span class="custom-modal__help-description">
                    Clique ou toque em um projeto, e ele será exibido no seguinte modelo:
                </span>
                <a href="./assets/models/project-model-mobile.svg" target="_blank" rel="noopener noreferrer">
                    <img src="./assets/models/project-model-mobile.svg" alt="model-image" class="custom-modal__model">
                </a>
                <span class="custom-modal__help-text">
                    QR Code:
                    <ul class="custom-modal__help-list">
                        <li>
                            - Clique ou toque para acessar o repositório;
                        </li>
                        <li>
                            - Aponte a câmera para acessar o site.
                        </li>
                    </ul>
                </span>
            </div>
        </div>
        `
    } else if (type == 'info') {
        return `
        <div class="custom-modal__box">
            <h2 class="custom-modal__title">
                ${project.name}
                <i class='bx bx-x custom-modal__icon'></i>
            </h2>
            <div class="custom-modal__data">
                <a href="./assets/works/screenshots/png/${project.screenshot}.png" target="_blank" rel="noopener noreferrer">
                    <img src="./assets/works/screenshots/png/${project.screenshot}.png" alt="${project.screenshot}-screenshot" class="custom-modal__screenshot">
                </a>
                <span class="custom-modal__description">
                    ${project.about}
                </span>
                <a href="${project.url}" target="_blank" rel="noopener noreferrer">
                    <img src="./assets/works/qrcodes/svg/${project.qrcode}.svg" alt="${project.qrcode}-qrcode" class="custom-modal__qrcode">
                </a>
            </div>
        </div>
        `
    }
}

export const showModalProjects = (type, project = null)=>{
    const section = document.querySelector('section#projects');
    const newModal = document.createElement("div");
    newModal.classList.add("custom-modal__container");
    newModal.innerHTML = createModalProjects(type, project);
    newModal.style.transition = "all 0.3s";
    section.appendChild(newModal);

    const modalBackground = document.querySelector('section#projects .custom-modal__container');
    const customModalBtnClose = document.querySelector('section#projects .custom-modal__icon');

    const close = () =>{
        section.removeChild(modalBackground);
    }

    //modalBackground.addEventListener("click", () => close());
    customModalBtnClose.addEventListener("click", () => close());
}

export const loadProjects = ()=>{
    const projectsContent = document.querySelector('section#projects .custom-list__content');
    //console.log(projectsContent);
    works.forEach(
        (project)=>{
            const projectsBox = document.createElement('div');
            projectsBox.classList.add('custom-list__box');
            projectsBox.innerHTML = `
            <h2 class="custom-list__title">
                <i class='bx bx-qr custom-list__title-icon'></i>
                ${project.name}
            </h2>
            `;
            projectsContent.appendChild(projectsBox);

            projectsBox.addEventListener("click", (event)=>{
                const section = document.querySelector('section#projects');
                showModalProjects('info', project);
            })
        }
    );
};

export const helpModal = ()=>{

}
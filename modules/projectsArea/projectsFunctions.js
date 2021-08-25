import {works} from '../../databases/works.js';

export const showModalProject = (container, event, project)=>{
    event.preventDefault();
    const newModal = document.createElement("div");
    newModal.classList.add("modal-interactive");
    newModal.innerHTML = `
    <div class="modal-info-area">
        <button id="modal-btn-close">
            <img src="./assets/icons/inApp-icons/close.svg" alt="close-icon" id="close-icon">
        </button>
        <div class="modal-info">
            <h3>${project.name}</h3>
            <img src="./assets/works/screenshots/png/${project.screenshot}.png" alt="" class="screenshot">
            <p>${project.about}</p>
            <a href="${project.url}" target="_blank" rel="noopener noreferrer">
                <img src="./assets/works/qrcodes/svg/${project.qrcode}.svg" alt="" class="qrcode">
            </a>
        </div>        
    </div>
    `;
    container.appendChild(newModal);
    const interactiveModalBtnClose = document.querySelector('#modal-btn-close');

    interactiveModalBtnClose.addEventListener("click", (event)=>{
        event.preventDefault();
        let modal = document.querySelector('.modal-interactive');
        container.removeChild(modal);

    });
};

export const loadProjects = (container, mainProjects)=>{
    const projectsArea = document.createElement('div');
    projectsArea.classList.add('projects-area');
    const ul = document.createElement('ul');
    works.forEach(
        (project)=>{
            const li = document.createElement('li');
            li.innerHTML = `
            <div class="project-item" id="${project.url}">
                <div class="qr-circle">
                    <img src="./assets/icons/inApp-icons/qricon.svg" alt="">
                </div>
                <p>${project.name}</p>
            </div>
            `
            li.addEventListener("click", (event)=>{
                showModalProject(container, event, project);
            });

            ul.appendChild(li);
        }
    );
    projectsArea.appendChild(ul);
    mainProjects.appendChild(projectsArea);
};
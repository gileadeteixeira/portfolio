import {tools} from '../../databases/tools.js'

//const tools = require('../../databases/tools.json').tools;

export const setStatusIndicator = (tool)=>{
    if (tool.status == null) {
        return '#C61E1E'; //Red
    } else if (tool.status == 'utilizada'){
        return '#E4AE22'; //Yellow
    } else if (tool.status == 'aprofundada'){
        return '#23A959'; //Blue
    }
}

export const createModalTools = (type, tool = null )=>{
    if (type == 'help') {
        return `
        <div class="custom-modal__box">
            <h2 class="custom-modal__title">
                Ajuda
                <i class='bx bx-x custom-modal__icon'></i>
            </h2>
            <div class="custom-modal__data">
                <span class="custom-modal__help-text">
                    Clique ou toque em uma tecnologia, e ela será exibida no seguinte modelo:
                </span>
                <a href="./assets/models/tech-model-mobile.svg" target="_blank" rel="noopener noreferrer">
                    <img src="./assets/models/tech-model-mobile.svg" alt="model-image" class="custom-modal__model">
                </a>
                <div clas="custom-modal__indicators-box">
                    <span class="custom-modal__indicator-text">
                        <i class='bx bxs-circle custom-modal__indicator-circle' id="indicator-circle-1"></i>
                        Nunca utilizei
                    </span>
                    <span class="custom-modal__indicator-text">
                        <i class='bx bxs-circle custom-modal__indicator-circle' id="indicator-circle-2"></i>
                        Utilizei, mas não apronfudei
                    </span>
                    <span class="custom-modal__indicator-text">
                        <i class='bx bxs-circle custom-modal__indicator-circle' id="indicator-circle-3"></i>
                        Aprofundei ou Aprofundando
                    </span>
                </div>
            </div>
        </div>
        `
    } else if (type == 'info') {
        return `
        <div class="custom-modal__box tech-box">
            <i class='bx bx-x custom-modal__icon tech-close-icon'></i>
            <div class="custom-modal__data tech-data">
                <img src="./assets/icons/tools-icons/${tool.src}.svg" alt="${tool.src}-icon" class="custom-modal__tool-icon">
                <h2 class="custom-modal__tool-name">
                    ${tool.alias}
                </h2>
                <span class="custom-modal__description">
                    ${tool.about.replace(".","")}
                </span>
                <span class="custom-modal__description">
                    Início: ${tool.start == null ? "---" : new Date(tool.start).toLocaleString('pt-BR',{dateStyle: 'long'})}
                </span>
                <span class="custom-modal__description">
                    Avanço: ${tool.advance == null ? "---" : new Date(tool.advance).toLocaleString('pt-BR',{dateStyle: 'long'})}
                </span>
                <span class="custom-modal__indicator-text">
                    <i class='bx bxs-circle custom-modal__indicator-circle' style="color: ${setStatusIndicator(tool)};"></i>
                    ${tool.status == null ? "Nunca utilizei": (tool.status == "utilizada" ? "Utilizei, mas não apronfudei" : "Aprofundei/Aprofundando")}
                </span>
            </div>
        </div>
        `
    }
}

export const sortTools = {
    byGrowingAlphabetical : ()=>{//A-Z
        return 1;
    },

    byDecreasingAlphabetical : ()=>{//Z-A
        return -1;
    },

    byGrowingEvolution : (first, second)=>{//mais antiga primeiro
        return first - second;
    },

    byDecreasingEvolution : (first, second)=>{//mais recente primeiro
        return second - first;
    }
}

export const editTools = {
    loadAllTools : ()=>{        
        return tools.map(tool=>{
            return editTools.setLongDate(tool);
        })
    },

    setMainDate : (tool)=>{
        let mainDate = null;
        if (tool.advance != null) {mainDate = tool.advance}
        else if (tool.start != null) {mainDate = tool.start};
        return mainDate != null ? {...tool, mainDate: new Date(mainDate)} : {...tool, mainDate: null};
    },

    setNotNull : (tool)=>{
        if (tool != null) {
            return tool.start != null;
        };
    },

    filterBy : (tool, key, value)=>{
        if (tool != null) {
            return tool[key] == value;
        };
        /*
        Keys:
            type: "framework"; "server"; "text editor"; "cloud"; "programming language"; "stylesheet language"; "software"; "markup language"; "library"; "data-interchange language" "software compilation";

            stack: null; "front-end"; "back-end"; "full-stack";

            area: null; "web"; "mobile"; "desktop"; "logic"; "multi-platform", "server", "package manager".

            status: null; "utilizada"; "aprofundada"
        */
    },
    
    setSort : (toolA, toolB, sortType)=>{
        let result = null;
        let type = sortType.name.replace(/byGrowing|byDecreasing/gmi, '').toLowerCase();
        switch (type) {
            case "alphabetical":
                result = sortType();
                break;
            case "evolution":
                let date1 = toolA.advance != null ? new Date(toolA.advance) : new Date(toolA.start);
                let date2 = toolB.advance != null ? new Date(toolB.advance) : new Date(toolB.start);
                result = sortType(date1, date2);
                break;
            default:
                break;
        };
        return result;
    },

    setLongDate : (tool)=>{
        let tollEdited  = editTools.setMainDate(tool);
        if (tollEdited.mainDate!=null) {
            const longDate = tollEdited.mainDate.toLocaleString('pt-BR',{dateStyle: 'long'});
            tollEdited.mainDate = longDate;
        }
        return tollEdited;
    },

    myTools : (sortType = sortTools.byGrowingAlphabetical) =>{//default A-Z
        return tools
        .filter(tool =>{
            return editTools.setNotNull(tool);
        })
        .sort((toolA,toolB)=>{
            return editTools.setSort(toolA,toolB,sortType);
        })
        .map(tool=>{
            return editTools.setLongDate(tool);
        });
    }
}

export const loadTools = (customTools = editTools.loadAllTools())=>{
    const techsContent = document.querySelector('section#techs .custom-list__content');
    customTools.forEach(
        (tech,index)=>{
            const techsBox = document.createElement('div');
            techsBox.classList.add('custom-list__box');
            techsBox.innerHTML = `
            <h2 class="custom-list__title tech-title">
                <div class="custom-list__title-box">
                    <div class="custom-list__title-image-box">
                        <img src="./assets/icons/tools-icons/${tech.src}.svg" alt="${tech.src}-icon" class="custom-list__title-image">
                    </div>
                    ${tech.alias}
                </div>
                <i class='bx bxs-circle custom-list__indicator-circle' style="color: ${setStatusIndicator(tech)};"></i>
            </h2>
            `;
            techsContent.appendChild(techsBox);            
            techsBox.addEventListener("click", (event)=>{
                const section = document.querySelector('#techs');
                showModalTechs('info', section, event, tech);
            })
        }
    );
    
    const divs = document.querySelectorAll('section#techs .custom-list__box');
    divs.forEach((div) => {
        div.style.display = 'none';
        div.style.visibility = 'hidden';
        div.style.transition = '0.3s';
        //console.log(div.style.visibility);
    });
    changeVisibility();
}

export const changeVisibility = (action = 'more')=>{
    const divs = document.querySelectorAll('section#techs .custom-list__box'); 
    let end = 0;
    divs.forEach((div,key)=>{
        if (div.style.visibility == 'visible') {
            end = key+1;
        }
    })
    //console.log(end, divs.length);

    if (action == 'more') {
        if (end == divs.length) {
            alert('Todas as Tecnologias já estão em exibição.');         
        }
        else{
            for (let i = end; i < end+9 && i < divs.length ; i++) {
                divs[i].style.display = 'block';
                divs[i].style.visibility = 'visible';
            }
        }
    } else if (action == 'less'){
        if (end <= 9) {
            alert('Impossível exibir menos.');
        } else {
            for (let i = end % 3 == 0 ? end-9 : end-8; i < end; i++) {
                divs[i].style.display = 'none';
                divs[i].style.visibility = 'hidden';
            }            
        }
    }
}

export const showModalTechs = (type, section, event, project = null)=>{
    event.preventDefault();
    const newModal = document.createElement("div");
    newModal.classList.add("custom-modal__container");
    newModal.innerHTML = createModalTools(type, project);
    newModal.style.transition = '0.3s';
    section.appendChild(newModal);

    const modalBackground = document.querySelector('.custom-modal__container');
    const customModalBtnClose = document.querySelector('.custom-modal__icon');

    const close = () =>{
        section.removeChild(modalBackground);
    }

    //modalBackground.addEventListener("click", () => close());
    customModalBtnClose.addEventListener("click", () => close());
}

/*console.table(
    editTools.myTools(sortTools.byDecreasingEvolution)
    //editTools.loadAllTools()
);*/
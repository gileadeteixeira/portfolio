import {tools} from '../../databases/tools.js';

        /*
        Keys:
            type: "framework"; "server"; "text editor"; "cloud"; "programming language"; "stylesheet language"; "software"; "markup language"; "library"; "data-interchange language" "software compilation";

            stack: null; "front-end"; "back-end"; "full-stack";

            area: null; "web"; "mobile"; "logic"; "multi-platform", "server", "package manager".

            status: null; "utilizada"; "aprofundada"
        */

import {filters} from '../../databases/filters.js';

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

export const loadTools = (action = 'more', reset = false, customTools = editTools.loadAllTools())=>{
    const techsContent = document.querySelector('section#techs .custom-list__content');
    let start = techsContent.children.length;
    let end = start + 9;
    if (reset) {
        for (let index = start-1; index >= 0; index--) {
            techsContent.removeChild(techsContent.children[index]);        
        }
    }
    action == 'more'
        ? showMoreTechs(customTools, techsContent, start, end)
        : (action == 'less' && showLessTechs(techsContent, start));    
}

export const showMoreTechs = (customTools, techsContent, start, end)=>{
    if (start < customTools.length) {
        for (let index = start; index < end; index++) {
            if (customTools[index] != null) {
                const tech = customTools[index];
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
        }
    }
    else{
        alert('Impossível exibir mais.');
    }
}

export const showLessTechs = (techsContent, start)=>{
    if (start > 9) {
        const number = start % 3 == 0 ? 9 : 8;
        for (let index = start-1; index >= start - number; index--) {
            techsContent.removeChild(techsContent.children[index]);            
        }
    }
    else{
        alert('Impossível exibir menos.');
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

export const showModalPicker = ()=>{
    modalGenerator();
    filters.forEach((property)=>selectsGenerator(property));
    const closeButton = document.querySelector(".field-options__close-icon");
    closeButton.addEventListener("click", () => closeModal());
}

export const modalGenerator = ()=>{
    const filterBar = document.querySelector('#filter-bar');
    const modalPicker = document.createElement('div');
    modalPicker.classList.add('custom-modal__container');
    modalPicker.id = 'modal-picker';
    modalPicker.innerHTML = `
    <div class="custom-modal__box field-options__box">
        <i class='bx bx-x custom-modal__icon field-options__close-icon'></i>
        <div class="field-options__data"></div>
        <div class="field-options__ok-button-box">
            <button class="button interactive" id="field-options__ok-button">OK</button>
        </div>
    </div>
    `;
    filterBar.appendChild(modalPicker);
}

export const selectsGenerator = (property)=>{
    const modalPickerData = document.querySelector('.field-options__data');
    const fieldOption = document.createElement('div');
    fieldOption.classList.add('field__option');
    fieldOption.innerHTML=`
    <label for="${property.id}">${property.label}</label>    
    <select id="${property.id}"></select>
    `;
    modalPickerData.appendChild(fieldOption);
    optionsGenerator(property);
    selectOption(property);
}

export const optionsGenerator = (property)=>{
    const select = document.querySelector(`.field-options__data select#${property.id}`);
    const optionDefault = document.createElement('option');
    optionDefault.value = "";
    optionDefault.innerHTML = "Nenhum";
    select.appendChild(optionDefault);
    property.itens.forEach((item)=>{
        const option = document.createElement('option');
        option.value = `${item.key}`;
        option.innerHTML = `${item.value}`;
        select.appendChild(option);
    })
}

export const selectOption = (property)=>{
    const select = document.querySelector(`.field-options__data select#${property.id}`);
    select.addEventListener('change', ()=>{
        const allSelects = document.querySelectorAll(`.field-options__data select`);
        allSelects.forEach((slct)=>{
            if (slct.id != property.id) {
                slct.selectedIndex = 0;
                slct.value = "";
            }
        })
    })
}

export const closeModal = ()=>{
    const filterBar = document.querySelector('#filter-bar');
    const modalPicker = document.querySelector('#modal-picker');
    filterBar.removeChild(modalPicker);
}
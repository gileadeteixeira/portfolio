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

   
let optionSelected = {
    "key": "",
    "value": "",
    "result": "",
};
let currentBase = [];

export const setStatusIndicator = (tool)=>{
    if (tool.status == null) {
        return '#C61E1E'; //Red
    } else if (tool.status == 'utilizada'){
        return '#E4AE22'; //Yellow
    } else if (tool.status == 'aprofundada'){
        return '#23A959'; //Blue
    }
}

export const createModalTools = {
    "help": (tool)=>{
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
                <div class="custom-modal__indicators-box">
                    <span class="custom-modal__help-indicator-text">
                        <i class='bx bxs-circle custom-modal__indicator-circle' id="indicator-circle-1"></i>
                        Nunca utilizei
                    </span>
                    <span class="custom-modal__help-indicator-text">
                        <i class='bx bxs-circle custom-modal__indicator-circle' id="indicator-circle-2"></i>
                        Utilizei, mas não apronfudei
                    </span>
                    <span class="custom-modal__help-indicator-text">
                        <i class='bx bxs-circle custom-modal__indicator-circle' id="indicator-circle-3"></i>
                        Aprofundei ou Aprofundando
                    </span>
                </div>
            </div>
        </div>
        `;
    },

    "info": (tool)=>{
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
                <span class="custom-modal__tech-indicator-text">
                    <i class='bx bxs-circle custom-modal__indicator-circle' style="color: ${setStatusIndicator(tool)};"></i>
                    ${tool.status == null ? "Nunca utilizei": (tool.status == "utilizada" ? "Utilizei, mas não apronfudei" : "Aprofundei/Aprofundando")}
                </span>
            </div>
        </div>
        `;
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
            return tool.status != null;
        };
    },

    filterBy : (base, key, value)=>{
        return base.filter(tool =>{
            return tool[key] == value;
        })
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

export const filterOnInput = (text)=>{
    let arrayTools = null;
    if (text != '') {
        arrayTools = tools.filter((tool)=>{
            let alias = tool.alias;
            let fullName = tool.fullName;
            let type = tool.type;
            let area = tool.area == null ? "" : tool.area ;
            let stack = tool.stack == null ? "" : tool.stack;
            let associated = tool.associated;

            RegExp.quote = (str) =>{
                return str.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
            };

            let regexText = new RegExp(RegExp.quote(text), "gi");
            
            //console.log(alias, fullName, type, area, stack)
            if ((alias.match(regexText) && alias != null) || (fullName.match(regexText) && fullName != null) || (type.match(regexText) && type != null) || (area != null && area.match(regexText)) || (stack.match(regexText) && stack != null)) {
                return tool;
            } else {
                let ok = false;
                for (const key of associated) {
                    if (key.match(regexText)) {
                        ok = true;
                    }
                }
                return ok == true && tool;
            }
        })
        //console.log(arrayTools);
    }
    
    const timeout = 500;
    currentBase = arrayTools;
    resetFilter(timeout, arrayTools);
}

export const loadTools = (base = 'default', action = 'more', reset = false, arrayBase = currentBase)=>{
    const techsContent = document.querySelector('section#techs .custom-list__content');
    const span = document.querySelector('section#techs .selector-search');
    let id = ''
    let key = '';
    if (span.innerText != 'Pesquisar por categoria...') {
        filters.forEach((filter)=>{
            if (span.innerHTML.match(filter.label)) {
                id = `${filter.id.replace("-selector", "")}`;
                filter.itens.forEach((item)=>{
                    if (span.innerHTML.match(item.value)) {
                        key = `${item.key}`;
                    }
                })
            }
        });
        console.log(id + " , " + key);
    }
    //span.classList.remove('filled');

    let arrayTools = arrayBase;
    //console.log(arrayTools);
    switch (base) {
        case 'default':
            if (arrayTools.length == 0) {
                arrayTools = editTools.loadAllTools();
            }
            break;

        case 'custom':
            if (arrayTools.length == 0) {
                arrayTools = editTools.myTools();             
            }
            break; 

        default:
            break;
    }
        
        
    if (id != '' && key !='' && (optionSelected.key == '' && optionSelected.result =='' && optionSelected.value =='')) {
        arrayTools = editTools.filterBy(arrayTools, id, key);
    }
    
    let start = techsContent.children.length;
    let end = start + 9;
    if (reset == true) {
        for (let index = start-1; index >= 0; index--) {
            techsContent.removeChild(techsContent.children[index]);        
        }
        start = 0;
        end = 9;
    }
    
    
    action == 'more'
    ? showMoreTechs(arrayTools, techsContent, start, end)
    : (action == 'less' && showLessTechs(techsContent, start));
}

export const showMoreTechs = (arrayTools, techsContent, start, end)=>{
    if (start < arrayTools.length) {
        for (let index = start; index < end; index++) {
            if (arrayTools[index] != null) {
                const tech = arrayTools[index];
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
                    const section = document.querySelector('section#techs');
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
    newModal.innerHTML = createModalTools[type](project);
    newModal.style.transition = '0.3s';
    section.appendChild(newModal);

    const modalBackground = document.querySelector('section#techs .custom-modal__container');
    const customModalBtnClose = document.querySelector('section#techs .custom-modal__icon');

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

export const showModalPicker = (type, base)=>{
    modalGenerator();
    switch (type) {
        case 'filter':
            filters.forEach((property)=>{selectsGenerator(type, base, property)}); 
            break;
        case 'sort':
            selectsGenerator(type, base);
            break;
        default:
            break;
    }
    finishFilter(base);
    const closeButton = document.querySelector("section#techs .field-options__close-icon");
    closeButton.addEventListener("click", () => closeModal());
}

export const modalGenerator = ()=>{
    const filterBar = document.querySelector('section#techs #filter-bar');
    const modalPicker = document.createElement('div');
    modalPicker.classList.add('custom-modal__container');
    modalPicker.id = 'modal-picker';
    modalPicker.innerHTML = `
    <div class="custom-modal__box field-options__box">
        <h2 class="custom-modal__title">
            Categorias
            <i class='bx bx-x custom-modal__icon field-options__close-icon'></i>
        </h2>
        <span class="custom-modal__help-text categories-help-text">
            Selecione somente uma categoria, aplique o filtro adicional (ou não), e clique (ou toque) em "OK"
        </span>
        <div class="field-options__data"></div>
        <div class="field-options__checkbox-box">
            <input type="checkbox" class="field-options__checkbox" id="change-tools-checkbox">
            <label for="change-tools-checkbox" class="label__for-checkbox">Aplicar apenas para as tecnologias utilizadas</label>
        </div>
        <div class="field-options__ok-button-box">
            <button class="button interactive" id="field-options__ok-button">OK</button>
        </div>
    </div>
    `;
    filterBar.appendChild(modalPicker);
}

export const selectsGenerator = (type, base, property)=> {
    const modalPickerData = document.querySelector('section#techs .field-options__data');
    const fieldOption = document.createElement('div');
    fieldOption.classList.add('field__option');
    switch (type) {
        case 'filter':
            //property = filter property
            fieldOption.innerHTML=`
            <label for="${property.id}">${property.label}</label>    
            <select id="${property.id}"></select>
            `;
            modalPickerData.appendChild(fieldOption);
            optionsGenerator[type](property);
            selectOption(base, property);
            break;
        case 'sort':
            //property = sort property
            fieldOption.innerHTML=`
            <label for="sort-selector">Tipo</label>    
            <select id="sort-selector"></select>
            `; 
            modalPickerData.appendChild(fieldOption);
            optionsGenerator[type]();
            selectOption(base);
        default:
            break;
    }
}

export const optionsGenerator = {
    filter : (property)=>{
        const select = document.querySelector(`section#techs .field-options__data select#${property.id}`);
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
    },
    
    sort : ()=>{
        const select = document.querySelector(`section#techs .field-options__data select#sort-selector`);
        const optionDefault = document.createElement('option');
        optionDefault.value = "";
        optionDefault.innerHTML = "Nenhum";
        select.appendChild(optionDefault);
        const sortsNames = Object.getOwnPropertyNames(sortTools);
        sortsNames.forEach((name)=>{
            const option = document.createElement('option');
            option.value = `${name}`;
            switch (name) {
                case 'byGrowingAlphabetical':
                    option.innerHTML = `Alfabética A - Z`;
                    break;

                case 'byDecreasingAlphabetical':
                    option.innerHTML = `Alfabética Z - A`;
                    break;

                case 'byGrowingEvolution':
                    option.innerHTML = `Trajetória crescente (ex.: 01/01 - 02/01)`;
                    break;

                case 'byDecreasingEvolution':
                    option.innerHTML = `Trajetória decrescente (ex.: 02/01 - 01/01)`;
                    break;

                default:
                    break;
            }
            select.appendChild(option);
        });
    }
}

export const selectOption = (base, property = null)=>{ 
    if (property != null) {
        const select = document.querySelector(`section#techs .field-options__data select#${property.id}`);
        select.addEventListener('change', (event)=>{
            const allSelects = document.querySelectorAll(`.field-options__data select`);
            allSelects.forEach((slct)=>{
                if (slct.id != property.id) {
                    slct.selectedIndex = 0;
                    slct.value = "";
                }
            });
            let id = event.target.id;
            let key = event.target.value;
            optionSelected.key = id.replace('-selector', '');
            optionSelected.value = key == 'null' ? null : key;
            optionSelected.result = resultGenerator(id, key);
            //console.log(optionSelected);
        });
    } else {
        const select = document.querySelector(`section#techs .field-options__data select#sort-selector`);
    }     
}

export const closeModal = ()=>{
    const filterBar = document.querySelector('section#techs #filter-bar');
    const modalPicker = document.querySelector('section#techs #modal-picker');
    filterBar.removeChild(modalPicker);
}

export const resetData = ()=>{
    optionSelected = {
        "key": "",
        "value": "",
        "result": "",
    };
}

export const finishFilter = (base)=>{
    const okButton = document.querySelector('section#techs #field-options__ok-button');
    okButton.addEventListener("click", ()=>{
        let arrayTools = [];
        if (optionSelected.key != '' && optionSelected.value != '') {
            const techsContent = document.querySelector('section#techs .custom-list__content');
            const checkBox = document.querySelector('section#techs #change-tools-checkbox');
            const span = document.querySelector('section#techs .selector-search');
            if (checkBox.checked == true){
                techsContent.setAttribute('base', 'custom');
                arrayTools = editTools.myTools();
                //console.log(listContent.getAttribute('base'));
            } else {
                techsContent.setAttribute('base', 'default');
                arrayTools = editTools.loadAllTools();
            }
            let arrayBase = editTools.filterBy(arrayTools, optionSelected.key, optionSelected.value);
            if (arrayBase.length > 0) {
                loadTools(base,'more', true, arrayBase);                
            } else {
                const warningMsg = document.createElement('span');
                warningMsg.innerHTML = 'Nenhuma tecnologia encontrada.'
                let start = techsContent.children.length;
                for (let index = start-1; index >= 0; index--) {
                    techsContent.removeChild(techsContent.children[index]);        
                }
                techsContent.appendChild(warningMsg);
            }
            span.innerHTML = optionSelected.result;
            span.classList.add('filled');
            //optionSelected.result
            resetData();
            closeModal();
        } else {
            alert('Você não selecionou nenhuma opção!');
        }
    });
}

export const resultGenerator = (id, key)=>{
    let result = '';
    filters.forEach((filter)=>{
        if (filter.id == id) {
            result = `${filter.label}:<br>`;
            filter.itens.forEach((item)=>{
                if (item.key == key) {
                    result += `${item.value}`;
                }
            })
        }
    });
    
    return result;
}

export const resetFilter = (timeout = 1000, arrayTools = null, resetInput = false)=>{
    const input = document.querySelector('section#techs #tech-search-by-name');
    const span = document.querySelector('section#techs .selector-search');
    const techsContent = document.querySelector('section#techs .custom-list__content');
    const loadIcon = document.createElement('div');

    if (input.value != '' && resetInput == true) {
        input.value = '';
    }

    if (span.innerText != 'Pesquisar por categoria...') {
        span.innerText = 'Pesquisar por categoria...';
        span.classList.remove('filled');
    }

    loadIcon.classList.add('loading-icon__box');
    loadIcon.innerHTML = `<i class='bx bx-loader-alt loading-icon'></i>`;

    let start = techsContent.children.length;
    if (start == 0) {
        techsContent.innerHTML = ``;
    }

    for (let index = start-1; index >= 0; index--) {
        techsContent.removeChild(techsContent.children[index]);
    }

    techsContent.appendChild(loadIcon);

    

    setTimeout(() => {
        if (arrayTools != null) {
            loadTools('default', 'more', true, arrayTools);
        } else {
            currentBase = [];
            loadTools('default', 'more', true);
        }
    }, timeout);
}

export const compressString = (string, elementMaxWidth)=>{
    return string.replace(string.substring(elementMaxWidth, string.length), "...");
}
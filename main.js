const container = document.querySelector('.container');
const menuBtn = document.querySelector('.nav__toggle');
const mainProjects = document.querySelector('div#principais-projetos');
const menuItens = document.querySelectorAll('nav ul li');
const aboutTexts = document.querySelectorAll('div.about-texts p');
const btnsHelp = document.querySelectorAll('.help__button');

const sections = document.querySelectorAll('section[id]');
const scrollerTop = document.getElementById('scroll-top');
const aboutBtn = document.getElementById('about-button');

const techsListContent = document.querySelector('section#techs .custom-list__content');

const searchByNameInput = document.querySelector('section#techs #tech-search-by-name');
const searchByCategoryDiv = document.querySelector('section#techs #tech-search-by-category');

const showMoreButton = document.querySelector('section#techs #tech-button-show-more');
const showLessButton = document.querySelector('section#techs #tech-button-show-less');
const orderButton = document.querySelector('section#techs #tech-button-order');
const resetButton = document.querySelector('section#techs #tech-button-reset');


let base = 'default';

const observer = new MutationObserver((mutations)=>{
    mutations.forEach((mutation)=>{
        base = techsListContent.getAttribute(mutation.attributeName);
    })
});

observer.observe(techsListContent, {
    attributes: true,
});

import {scrollOnClick, sectionOnScroll, scrollToTop, scrollToPosition, filterBarFixed} from './modules/scrollFunctions.js';
import {showRightMenu, loadLinksActions, showMenu} from './modules/menuArea/menuFunctions.js';
import {loadProjects, showModalProjects} from './modules/projectsArea/projectsFunctions.js';
import {loadTools, filterOnInput, showModalTechs, sortTools, showModalPicker, resetFilter} from './modules/toolsArea/toolsFunctions.js'
import {generateModal, showHelp} from './modules/modalFunctions.js';
import {projectColors} from './assets/projectInfo.js';
import {loadEducation} from './modules/aboutArea/components/education.js';

showMenu('nav-toggle','nav-menu','.nav__list');

loadLinksActions(scrollOnClick, scrollToPosition);

loadEducation();

loadProjects();

btnsHelp[0].addEventListener("click", (event)=>{
    //Help Button for Projects Section
    const section = document.querySelector('section#projects');
    showModalProjects('help', section, event);
});

btnsHelp[1].addEventListener("click", (event)=>{
    //Help Button for Techs Section
    const section = document.querySelector('section#techs');
    showModalTechs('help', section, event);
});

loadTools();

searchByNameInput.addEventListener("input", (event)=>{
    filterOnInput(event.target.value);
})

searchByCategoryDiv.addEventListener("click", (event)=>{
    event.preventDefault();
    showModalPicker('filter', base);
})

showMoreButton.addEventListener("click", (event)=>{
    event.preventDefault();
    loadTools(base);
});

showLessButton.addEventListener("click", (event)=>{
    event.preventDefault();
    loadTools(base, 'less');
});

orderButton.addEventListener("click", (event)=>{
    event.preventDefault();
    //loadTools(base, 'more', true);
});

resetButton.addEventListener("click", (event)=>{
    event.preventDefault();
    resetFilter(1000, null, true);
});

aboutBtn.addEventListener("click", (event)=>{
    scrollOnClick(event);
});

const teste2 = document.getElementById('filter-bar');
//console.log(teste.offsetTop + teste.offsetHeight, teste2.offsetWidth)

window.addEventListener("scroll", () => {
    sectionOnScroll(sections);
    scrollToTop(scrollerTop, projectColors);
    filterBarFixed();
    //console.log(searchByCategoryDiv.offsetTop + searchByCategoryDiv.offsetHeight, teste2.offsetWidth)    
});


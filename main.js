const homeAboutButton = document.querySelector('section#home #about-button');
const scrollerTop = document.querySelector('#scroll-top');

const sections = document.querySelectorAll('section[id]');

const projectsHelpButton = document.querySelector('section#projects #help__projects');
const techsHelpButton = document.querySelector('section#techs #help__techs');

const techsListContent = document.querySelector('section#techs .custom-list__content');

const searchByNameInput = document.querySelector('section#techs #tech-search-by-name');
const searchByCategoryDiv = document.querySelector('section#techs #tech-search-by-category');

const showMoreButton = document.querySelector('section#techs #tech-button-show-more');
const showLessButton = document.querySelector('section#techs #tech-button-show-less');
const orderButton = document.querySelector('section#techs #tech-button-order');
const resetButton = document.querySelector('section#techs #tech-button-reset');

const contactEmail = document.querySelector('section#contact #contact__email');

import {scrollOnClick, sectionOnScroll, scrollToTop, scrollToPosition, filterBarFixed} from './modules/scrollFunctions.js';
import {loadLinksActions, showMenu} from './modules/menuArea/menuFunctions.js';
import {loadEducation} from './modules/aboutArea/aboutFunctions.js';
import {loadProjects, showModalProjects} from './modules/projectsArea/projectsFunctions.js';
import {loadTools, filterOnInput, showModalTechs, showModalPicker, resetFilter, showLoading ,moveOnChangeContent} from './modules/toolsArea/toolsFunctions.js';
import {copyEmail} from './modules/socialArea/socialFunctions.js';

homeAboutButton.addEventListener("click", (event)=>{
    scrollOnClick(event);
});

let base = 'default';

const observer = new MutationObserver((mutations)=>{
    mutations.forEach((mutation)=>{
        base = techsListContent.getAttribute(mutation.attributeName);
    });
});

observer.observe(techsListContent, {
    attributes: true,
});

showMenu('#nav-toggle','#nav-menu','.nav__list');

loadLinksActions(scrollOnClick, scrollToPosition);

loadEducation();

loadProjects();

loadTools();

projectsHelpButton.addEventListener("click", (event)=>{
    //Help Button for Projects Section
    event.preventDefault();
    showModalProjects('help', event);
});

techsHelpButton.addEventListener("click", (event)=>{
    //Help Button for Techs Section
    event.preventDefault();
    showModalTechs('help', event);
});

searchByNameInput.addEventListener("input", (event)=>{
    filterOnInput(event.target.value);
});

searchByCategoryDiv.addEventListener("click", (event)=>{
    event.preventDefault();
    showModalPicker('filter', base);
});

showMoreButton.addEventListener("click", (event)=>{
    event.preventDefault();
    moveOnChangeContent();
    showLoading();
    setTimeout(() => {
        loadTools(base);        
    }, 1000);
});

showLessButton.addEventListener("click", (event)=>{
    event.preventDefault();
    loadTools(base, 'less');
    moveOnChangeContent(); 
});

orderButton.addEventListener("click", (event)=>{
    event.preventDefault();
    showModalPicker('sort', base);
});

resetButton.addEventListener("click", (event)=>{
    event.preventDefault();
    const sectionProjectsOffsetTop = document.querySelector('section#techs').offsetTop;
    scrollToPosition(sectionProjectsOffsetTop);
    setTimeout(() => {
        resetFilter(1000, null, true);        
    }, 500);
});

contactEmail.addEventListener("click", (event)=>{
    event.preventDefault();
    copyEmail();
})

window.addEventListener("scroll", () => {
    sectionOnScroll(sections);
    scrollToTop(scrollerTop);
    filterBarFixed();   
});
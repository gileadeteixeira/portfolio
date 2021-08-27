const container = document.querySelector('.container');
const menuBtn = document.querySelector('.nav__toggle');
const mainProjects = document.querySelector('div#principais-projetos');
const menuItens = document.querySelectorAll('nav ul li');
const aboutTexts = document.querySelectorAll('div.about-texts p');
const btnsHelp = document.querySelectorAll('.help__button');

const sections = document.querySelectorAll('section[id]');
const scrollerTop = document.getElementById('scroll-top');
const aboutBtn = document.getElementById('about-button');

const showMoreButton = document.getElementById('tech-button-show-more');
const showLessButton = document.getElementById('tech-button-show-less');
const searchByCategoryDiv = document.getElementById('tech-search-by-category');

import {scrollOnClick, sectionOnScroll, scrollToTop, scrollToPosition, filterBarFixed} from './modules/scrollFunctions.js';
import {showRightMenu, loadLinksActions, showMenu} from './modules/menuArea/menuFunctions.js';
import {loadProjects, showModalProjects} from './modules/projectsArea/projectsFunctions.js';
import {generateModal, showHelp} from './modules/modalFunctions.js';
import {projectColors} from './assets/projectInfo.js';
import {loadEducation} from './modules/aboutArea/components/education.js';
import {loadTools, editTools, sortTools, showModalPicker} from './modules/toolsArea/toolsFunctions.js'

showMenu('nav-toggle','nav-menu','.nav__list');
loadLinksActions(scrollOnClick, scrollToPosition);
loadEducation();
loadProjects();
btnsHelp[0].addEventListener("click", (event)=>{
    //Help Button for Projects Section
    const section = document.querySelector('#projects');
    showModalProjects('help', section, event);
});

loadTools();

showMoreButton.addEventListener("click", (event)=>{
    event.preventDefault();
    loadTools();
})
showLessButton.addEventListener("click", (event)=>{
    event.preventDefault();
    loadTools('less');
})

const resetColor = (element, color)=>{
    element.style.backgroundColor = color;
}

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

searchByCategoryDiv.addEventListener("click", (event)=>{
    event.preventDefault();
    showModalPicker();
})

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

import {scrollOnClick, sectionOnScroll, scrollToTop, scrollToPosition} from './modules/scrollFunctions.js';
import {showRightMenu, loadLinksActions, showMenu} from './modules/menuArea/menuFunctions.js';
import {loadProjects, showModalProjects} from './modules/projectsArea/projectsFunctions.js';
import {generateModal, showHelp} from './modules/modalFunctions.js';
import {projectColors} from './assets/projectInfo.js';
import {loadEducation} from './modules/aboutArea/components/education.js';
import {loadTools, editTools, sortTools, changeVisibility} from './modules/toolsArea/toolsFunctions.js'

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
    changeVisibility();
})
showLessButton.addEventListener("click", (event)=>{
    event.preventDefault();
    changeVisibility('less');
})

const resetColor = (element, color)=>{
    element.style.backgroundColor = color;
}

aboutBtn.addEventListener("click", (event)=>{
    scrollOnClick(event);
});

window.addEventListener("scroll", () => {
    sectionOnScroll(sections);
    scrollToTop(scrollerTop, projectColors);
});

/*
menuBtn.addEventListener("click", (event) => showRightMenu(generateModal, container, event, scrollOnClick));
aboutBtn.addEventListener("click", (event) => scrollOnClick(event));

btnsHelp.forEach(
    (btn)=>{
        let type = btn.id.replace("btn-help-", "");
        btn.addEventListener("click", (event)=>{
            showHelp(type, container, event);
        })
    }
);
*/
/*(()=>{
    menuItens.forEach(
        (item) => {
            item.addEventListener('click', (event)=>{
                scrollOnClick(event);
            });
        }
    );

    aboutTexts.forEach(
        (p, key)=>{
            p.style.textAlign = key % 2 == 0 ? 'left' : 'right'            
        }
    );

    loadProjects(container, mainProjects);
})();*/
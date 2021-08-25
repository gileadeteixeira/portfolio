const container = document.querySelector('.container');
const menuBtn = document.querySelector('.nav__toggle');
const mainProjects = document.querySelector('div#principais-projetos');
const menuItens = document.querySelectorAll('nav ul li');
const aboutTexts = document.querySelectorAll('div.about-texts p');
const btnsHelp = document.querySelectorAll('.btn-help');

const sections = document.querySelectorAll('section[id]');
const scrollerTop = document.getElementById('scroll-top');
const aboutBtn = document.getElementById('about-button');

import {scrollOnClick, sectionOnScroll, scrollToTop, scrollToPosition} from './modules/scrollFunctions.js';
import {showRightMenu, loadLinksActions, showMenu} from './modules/menuArea/menuFunctions.js';
import {loadProjects} from './modules/projectsArea/projectsFunctions.js';
import {generateModal, showHelp} from './modules/modalFunctions.js';
import {projectColors} from './assets/projectInfo.js';
import {loadEducation} from './modules/aboutArea/components/education.js';

showMenu('nav-toggle','nav-menu');
loadLinksActions(scrollOnClick, scrollToPosition);
loadEducation();

const resetColor = (element, color)=>{
    element.style.backgroundColor = color;
}

aboutBtn.addEventListener("click", (event)=>{
    scrollOnClick(event);
    resetColor(aboutBtn, projectColors.black);
});

window.addEventListener("scroll", () => {
    sectionOnScroll(sections);
    scrollToTop(scrollerTop, resetColor, projectColors);
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
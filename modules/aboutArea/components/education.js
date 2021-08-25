import {courses} from '../../../databases/courses.js';

//const courses = require('../../../databases/courses.json').courses;

export const sortEducationByDate = (courses) =>{
    return courses
    .sort((courseA , courseB)=>{
        let date1 = courseA.endDate != 'Present' ? new Date(courseA.startDate) : new Date();
        let date2 = courseB.endDate != 'Present' ? new Date(courseB.startDate) : new Date();
        return date2 - date1;
    })
}

//console.table(sortEducationByDate(courses));

export const newEducationCard = (course) =>{
    const translateMonth = (dateString) =>{
        if (dateString != 'Present') {
            let month = new Date(dateString).toLocaleString('pt-BR', {dateStyle: 'medium'}).substring(5,8);
            month = month.replace(month.charAt(0), month.charAt(0).toUpperCase());
            dateString = dateString.replace(dateString.substring(0,3), month);
        }
        else{
            dateString = 'Presente'
        }
        return dateString;
    }
    return `
    <h3 class="qualification__area">
        ${course.name}
    </h3>
    <div class="qualification__box">
        <span class="qualification__work">
            <i class='bx bxs-map education__icon'></i>
            ${course.institution} - ${course.place}
        </span>

        <span class="qualification__work">
            <i class='bx bx-calendar education__icon'></i>
            ${translateMonth(course.startDate)} - ${translateMonth(course.endDate)}
        </span>
    </div>
    `;
}

export const loadEducation = ()=>{
    const gridDiv = document.getElementById('qualification-courses');
    const sortedCourses = sortEducationByDate(courses);
    sortedCourses.forEach((course) => {
        const dataDiv = document.createElement('div');
        dataDiv.classList.add('qualification__data');
        dataDiv.innerHTML = newEducationCard(course);
        gridDiv.appendChild(dataDiv);        
    });
}
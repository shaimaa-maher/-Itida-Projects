/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
 */

/**
 * Define Global Variables
 * 
 */

let AllSections = document.querySelectorAll('section'),
    sectionsNum = AllSections.length;
let element;
const MySections = [];





/**
 * End Global Variables
 * Start Helper Functions
 * 
 */

for (let i = 0; i < sectionsNum; i++) {
    element = AllSections[i];
    MySections.push({ id: element.id, dataNavBar: element.getAttribute('data-nav') });
}


function RemoveActive() {
    for (let i = 0; i < AllSections.length; i++) {

        if (AllSections[i].classList.contains("your-active-class")) {
            AllSections[i].classList.remove("your-active-class");

        }

    }
}



function RemoveActiveNavItem() {
    let navItems = document.getElementsByTagName('li');

    for (let i = 0; i < navItems.length; i++) {

        if (navItems[i].classList.contains("active")) {
            navItems[i].classList.remove("active");
        }
    }
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
 */

window.onscroll = function() { scrollFun(); };

function scrollFun() {
    let topBTN = document.getElementById("myBtn");
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        topBTN.style.display = "block";
    } else {
        topBTN.style.display = "none";
    }
}


function topFun() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// build the nav

let navMenu = document.querySelector('.navbar__menu').firstElementChild;

let item;

// Build menu 
for (let i = 0; i < MySections.length; i++) {
    item = document.createElement("li");
    item.textContent = MySections[i].dataNavBar;
    item.className = "menu__link";
    navMenu.appendChild(item);


    // Scroll to anchor ID using scrollTO event
    item.addEventListener("click", () => {

        RemoveActiveNavItem();
        let id = MySections[i].id;
        let section = document.getElementById(id);


        // Scroll to section on link click
        section.scrollIntoView();
        RemoveActive();

        let itemLi = document.querySelectorAll('li')[i];
        document.getElementById(id).classList.add("your-active-class");
        // Set sections as active
        itemLi.classList.add("active");
    });

}
// Add class 'active' to section when near top of viewport


/**
 * End Main Functions
 * Begin Events
 * 
 */
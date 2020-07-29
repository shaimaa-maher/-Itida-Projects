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


function RemoveActiveSec() {
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


// appear/hide the top button.
function scrollFun() {
    let topBTN = document.getElementById("myBtn");
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        topBTN.style.display = "block";
    } else {
        topBTN.style.display = "none";
    }
}

// scroll to top of the page.
function topFun() {
    RemoveActiveNavItem();
    RemoveActiveSec();
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
    // item.id = MySections[i].id;
    navMenu.appendChild(item);


    // Scroll to anchor ID using scrollTO event
    item.addEventListener("click", () => {

        RemoveActiveNavItem();
        let id = MySections[i].id;
        let section = document.getElementById(id);


        // Scroll to section on link click
        section.scrollIntoView();
        RemoveActiveSec();

        let itemLi = document.querySelectorAll('li')[i];
        document.getElementById(id).classList.add("your-active-class");
        // Set sections as active
        itemLi.classList.add("active");
    });

}


//get sections id and send it to viewPortSection().
function getSectionIdToViewPort() {

    for (let i = 0; i < MySections.length; i++) {
        const elementId = MySections[i].id;

        viewPortSection(elementId);

    }
}


function viewPortSection(secId) {
    let secTop = document.getElementById(secId).getBoundingClientRect().top;

    if (secTop <= 500) {
        RemoveActiveSec();
        RemoveActiveNavItem();

        document.getElementById(secId).classList.add("your-active-class");

        // console.log(secId + " is active now");

        let allNavItems = document.querySelectorAll("li");

        for (let i = 0; i < allNavItems.length; i++) {

            const navElement = allNavItems[i];

            // console.log(navElement.textContent);
            // console.log("Section " + secId.slice(-1));

            if (navElement.textContent === "Section " + secId.slice(-1)) {
                navElement.classList.add("active");
                //  console.log(navElement.id + "is active ");
            }

        }

    } else {
        document.getElementById(secId).classList.remove("your-active-class");
    }
}




/**
 * End Main Functions
 * Begin Events
 * 
 */

// Add class 'active' to section when near top of viewport

let prevScrollpos = window.pageYOffset;
window.onscroll = () => {
    //top button function
    scrollFun();

    //view port function
    getSectionIdToViewPort();

};

// collapse the section 

let collItem = document.getElementsByClassName("collapsible");

for (let i = 0; i < collItem.length; i++) {

    collItem[i].addEventListener("click", function() {


        //console.log();
        let content = this.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
            document.getElementsByTagName("span")[i].textContent = '+';

        } else {
            content.style.maxHeight = content.scrollHeight + "px";
            document.getElementsByTagName("span")[i].textContent = '-';

        }
    });
}
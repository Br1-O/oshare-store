const navBar = document.querySelector("nav");
const logo = document.getElementById("logo");

//toggle on or off compact design for navbar when scrolling
window.addEventListener("scroll", () => {
    navBar.classList.toggle("compact-view", window.scrollY > 0);
    logo.classList.toggle("compact-view", window.scrollY > 0);
});

//hamburguer menu
const menuIcon = document.getElementById("menu-icon");
const menu = document.getElementById("nav-menu");

let menuOpen = false;

menuIcon.addEventListener("click", () => {

    menu.classList.toggle("menu-open");

    if (!menuOpen) {
        menuIcon.classList.remove("bx-menu");
        menuIcon.classList.add("bx-x");
        menuOpen = true;
    } else {
        menuIcon.classList.remove("bx-x");
        menuIcon.classList.add("bx-menu");
        menuOpen = false;
    };
});
const navBar = document.querySelector("nav");
const logo = document.getElementById("logo");


//toggle on or off compact design for navbar when scrolling
window.addEventListener("scroll", () => {
    navBar.classList.toggle("compact-view", window.scrollY > 0);
    logo.classList.toggle("compact-view", window.scrollY > 0);
});
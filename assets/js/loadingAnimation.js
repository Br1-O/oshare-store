const body = document.querySelector("body");

document.addEventListener("DOMContentLoaded", () => {

    const loadingScreen = document.getElementById("loading-overlay");
    const body = document.querySelector("body");

    loadingScreen.classList.add("flex");
    body.style.overflowY = "hidden";

    window.onload = () => {
        loadingScreen.classList.remove("flex");
        loadingScreen.classList.add("d-none");
        body.style.overflowY = "scroll";
    }
})
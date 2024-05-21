import { setEventListenerModalAccount } from "../modals/account.js";
import { setEventListenerModalShop } from "../modals/shop.js";

//default navBar
const defaultNavBar = `
<nav class="nav">

    <a href="#" title="¡Tus prendas favoritas a un click de distancia!">
        <img class="logo" id="logo" src="assets/resources/img/Logo_Oshare.jpg" alt="Oshare Designs Logo">
    </a>

    <ul class="nav-menu" id="nav-menu">
        <li>
            <a href="#" title="Oshare Designs Store"> Inicio </a>
        </li>
        <li>
            <a href="#shop" title="¡Compra tus prendas favoritas!"> Shop </a>
        </li>
        <li>
            <a href="#trending-now" title="¡Mira nuestros productos!"> Productos </a>
        </li>
        <li>
            <a href="#contacto" title="¡Visitanos!"> Contacto </a>
        </li>
        </ul>

        <ul class="nav-icons">
        <li>        
            <a href="#">
                <i class='bx bx-search nav-icon' id="search-icon" alt="Search" title="¡Busca la prenda que deseas!"></i>
            </a>
        </li>
        <li>
            <a href="#">
                <i class='bx bx-cart nav-icon' id="shop-icon" alt="Shop" title="Chequea tus compras"></i>
            </a>
        </li>
        <li>
            <a href="#">
                <i class='bx bx-user nav-icon' id="account-icon" alt="Login" title="¡Accede a tu cuenta!"></i>
            </a>
        </li>
        <li>
            <i class='bx bx-menu nav-icon' id="menu-icon" alt="Side menu" title="¡Accede a tu cuenta!"></i>
        </li>
    </ul>
</nav>
`

//session navBar
const sessionNavBar = `
<nav class="nav">

    <a href="#" title="¡Tus prendas favoritas a un click de distancia!">
        <img class="logo" id="logo" src="assets/resources/img/Logo_Oshare.jpg" alt="Oshare Designs Logo">
    </a>

    <ul class="nav-menu" id="nav-menu">
        <li>
            <a href="#" title="Oshare Designs Store"> Inicio </a>
        </li>
        <li>
            <a href="#shop" title="¡Compra tus prendas favoritas!"> Shop </a>
        </li>
        <li>
            <a href="#trending-now" title="¡Mira nuestros productos!"> Productos </a>
        </li>
        <li>
            <a href="#contacto" title="¡Visitanos!"> Contacto </a>
        </li>
        </ul>

        <ul class="nav-icons">
        <li>        
            <a href="#">
                <i class='bx bx-search nav-icon' id="search-icon" alt="Search" title="¡Busca la prenda que deseas!"></i>
            </a>
        </li>
        <li>
            <a href="#">
                <i class='bx bx-cart nav-icon' id="shop-icon" alt="Shop" title="Chequea tus compras"></i>
            </a>
        </li>
        <li>
            <a href="#">
                <i class='bx bxs-user-detail nav-icon' id="account-icon" alt="Login" title="¡Accede a tu cuenta!"></i>
            </a>
        </li>
        <li>
            <i class='bx bx-menu nav-icon' id="menu-icon" alt="Side menu" title="¡Accede a tu cuenta!"></i>
        </li>
    </ul>
</nav>
`

//header tag
const header = document.getElementById('navContainer');

export const navBar = (isConnected = false, userData = {}) => {
    
    //check if user is connected
    if (!isConnected) {
        //change content of navBar
        header.innerHTML = defaultNavBar;

        //nav icons
        const btnAccount = document.getElementById("account-icon");
        const btnShop = document.getElementById("shop-icon");


        //event listeners

        // Open account modal when account icon is clicked
        setEventListenerModalAccount(btnAccount);
        setEventListenerModalShop(btnShop);

    } else {
        header.innerHTML = sessionNavBar;
    }

    //scroll behavior

    //elements
    const navBar = document.querySelector("nav");
    const logo = document.getElementById("logo");

    //toggle on or off compact design for navbar when scrolling
    window.addEventListener("scroll", () => {
        navBar.classList.toggle("compact-view", window.scrollY > 0);
        logo.classList.toggle("compact-view", window.scrollY > 0);
    });

    //hamburguer menu

    //elements
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

}
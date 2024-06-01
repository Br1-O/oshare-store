import { setEventListenerModalAccount } from "../modals/account.js";
import { setEventListenerModalCart, setModalCart } from "../modals/cart.js";
import { updateContent } from "../routing/routing.js";
import { redirectToPage } from "../utils/redirectToPage.js";
import { freeSessionData, setUserDataFromSessionData } from "../utils/sessionStorage.js";
import { userData } from "../models/user.js";

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
            <a href="#tienda" title="¡Compra tus prendas favoritas!"> Shop </a>
        </li>
        <li>
            <a href="#productos" title="¡Mira nuestros productos!"> Productos </a>
        </li>
        <li>
            <a href="#contacto" title="¡Visitanos!"> Contacto </a>
        </li>
    </ul>

    <ul class="nav-icons">
        <li>        
            <i class='bx bx-search nav-icon' id="search-icon" alt="Search" title="¡Busca la prenda que deseas!"></i>
        </li>
        <li>
            <i class='bx bx-cart nav-icon' id="shop-icon" alt="Shop" title="Chequea tus compras"></i>
        </li>
        <li>
            <i class='bx bx-user nav-icon' id="account-icon" alt="Login" title="¡Accede a tu cuenta!"></i>
        </li>
        <li>
            <i class='bx bx-menu nav-icon' id="menu-icon" alt="Side menu"></i>
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
            <a href="#tienda" title="¡Compra tus prendas favoritas!"> Shop </a>
        </li>
        <li>
            <a href="#productos" title="¡Mira nuestros productos!"> Productos </a>
        </li>
        <li>
            <a href="#contacto" title="¡Visitanos!"> Contacto </a>
        </li>
    </ul>

    <ul class="nav-icons">
        <li>        
            <i class='bx bx-search nav-icon' id="search-icon" alt="Search" title="¡Busca la prenda que deseas!"></i>
        </li>
        <li>
            <i class='bx bx-cart nav-icon' id="shop-icon" alt="Shop" title="Chequea tus compras"></i>
        </li>
        <li>
            <i class='bx bxs-user-detail nav-icon' id="profile-icon" alt="Profile options" title="Datos del perfil"></i>
        </li>
        <li>
            <i class='bx bx-log-in nav-icon' id="log-out-icon" alt="Logout" title="Cerrar sesión"></i>
        </li>
        <li>
            <i class='bx bx-menu nav-icon' id="menu-icon" alt="Side menu"></i>
        </li>
    </ul>
</nav>
`

//header tag
const header = document.getElementById('navContainer');

export const navBar = (isConnected = false, userInfo = {}) => {

    //check if user is connected

        if (!isConnected) {
            //change content of navBar
            header.innerHTML = defaultNavBar;

            //nav icons
            const btnAccount = document.getElementById("account-icon");
            const btnCart = document.getElementById("shop-icon");

            //event listeners
            setEventListenerModalAccount(btnAccount);
            setEventListenerModalCart(btnCart);

        } else {
            //change content of navBar
            header.innerHTML = sessionNavBar;

            //nav icons
            const btnCart = document.getElementById("shop-icon");
            const btnProfile = document.getElementById("profile-icon");
            const btnLogOut = document.getElementById("log-out-icon");

            //set user object's data with session data
            setUserDataFromSessionData(userData);

            //event listeners
            setEventListenerModalCart(btnCart);
            
            //event listener for profile options icon
            btnProfile.addEventListener("click", () => {
                console.log(userData.name);
                console.log(userData.surname);
                console.log(userData.email);
                console.log(userData.cart);
                console.log(userData);
            });

            //event listener for log out icon
            btnLogOut.addEventListener("click", () => {
                //change session state
                userData.isSessionSet = false;

                //delete user object data
                userData.name = "";
                userData.surname = "";
                userData.email = "";
                userData.picture = "";
                userData.cart = [];

                //delete session data
                freeSessionData("oshare_designs_session");

                //redirect to logged page
                redirectToPage((window.location.hash).slice(1), 0);
                
                //update content based on change of session state
                updateContent();
            });
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

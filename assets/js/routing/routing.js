//utils import
import { fetchData } from "../utils/fetch.js";
import { carouselFunctionality } from "../utils/carousel.js";
import { redirectToPage } from "../utils/redirectToPage.js";
//navBar content
import { navBar } from "../components/navBar.js";
//home page content
import { homeContent } from "../pages/home/MAIN.js";
import { displayProductList } from "../pages/home/products.js";
import { displayBillboard } from "../pages/home/billboard.js";
import { displayReviews } from "../pages/home/reviews.js";
import { displayBlogArticles } from "../pages/home/blog.js";
//shop page content
import { shopContent } from "../pages/shop/MAIN.js";
//contact page content
import { contactPageContent } from "../pages/contact/MAIN.js";
import { validationContactForm } from "../validation/contactForm.js";
import { maxLengthValidation, minLengthValidation, phoneNumberValidation, emailValidation } from "../validation/utils.js";

//page not found content
import { notFoundMessage } from "../pages/notFound404.js";
//carousel EXPERIMENTAL
import { carousel } from "../pages/carousel-experimental.js";
import { userData } from "../models/user.js";
import { footer } from "../components/footer.js";
import { displaySingleProductPage } from "../pages/product/MAIN.js";
import { getSessionData, modifySessionCart, setUserDataFromSessionData } from "../utils/sessionStorage.js";
import { setModalCart } from "../modals/cart.js";
import { updateAccountData } from "../utils/localStorage.js";
import { isInStock } from "../utils/products.js";

//I'm not implementing this until finishing the project, since local server is unable to redirect all petitions to my index.html without using backend server utilities

// Define your routes and corresponding templates
// const routes = {
//     "/": "<h2>Home</h2><p>Welcome to our website!</p>",
//     "/#trending-now": "<h2>Trending Products</h2><p>This is the trending products section.</p>",
//     "/#contacto": "<h2>Contact Us</h2><p>Feel free to reach out to us!</p>"
//   };
  
  // Function to update content based on current URL
//   const updateContent = () => {
//     const path = window.location.pathname;
//     const content = routes[path] || "<h2>¡ Pagina no encontrada!</h2><p>La página que buscas no existe :(</p>";
//     document.getElementById("page-container").innerHTML = content;
//   }

//provitional hash based routing system until finishing project, then we switch to the routing based on raw URL paths

//Update content based on hash
export const updateContent = async() => {
    //get the url
    const hash = window.location.hash.substring(1); // Remove leading "#"

    //get the section ID from the hash
    const sectionId = window.location.hash.substring(1); // Remove the leading '#'

    //container for page content
    const content = document.getElementById("main");
    //section with the corresponding ID
    const section = document.getElementById(sectionId);

    //fetch product data
    let productsList = await fetchData("assets/js/json/products-list.json", "products");

    //■■■■■■■■■■■■■■■■■■■■ Shopping cart updating ■■■■■■■■■■■■■■■■■■■■//

    //update shopping cart's content
    setModalCart(userData, productsList, isInStock);

    // Listen for itemAddedToCart event to update the cart
    window.addEventListener('itemAddedToCart', () => {                
        
        //update session storage cart to user object's cart
        modifySessionCart(userData);

        //update shopping cart's content
        setModalCart(userData, productsList, isInStock);
        
        //update account's data
        updateAccountData(userData);
    });

    // Listen for itemDeletedFromCart event to update the cart
    window.addEventListener('itemDeletedFromCart', () => {

        //update session's shopping cart value
        modifySessionCart(userData);
        
        //update account's data
        updateAccountData(userData);

        //update shopping cart's content
        setModalCart(userData, productsList, isInStock);

    });

    //■■■■■■■■■■■■■■■■■■■■ Product page dinamic URL rendering ■■■■■■■■■■■■■■■■■■■■//

    //find product by category and name (name separated with "-" instead of blank spaces)
    const findProductByCategoryAndName = async(category, name) => {

        //fetch product data
        let products = await fetchData("assets/js/json/products-list.json", "products");

        //check if any of the categories or the name matches 
        return products.find((product) => {
            return product.categories.some(productCategory => productCategory === category) 
                && product.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/ /g, '-') === name;
        });
        //(normalize first to wipe special characters -> change to lowercase version -> replace the spaces with "-")
    }

    // Function to render a product page
    const renderProductPage = (product) => {

        //check if product exists
        if (!product) {
            //if not display 404 page and redirect
            content.innerHTML = notFoundMessage;
            redirectToPage("", 5000);
            return;
        }else{
            //display page product's content
            displaySingleProductPage(product, content, userData);

            //if user is logged update user's model data from session storage data
            if (userData.isSessionSet) {
                setUserDataFromSessionData(userData);
            }
        }
    }

    // Dynamic URL matching with regular expression
    const tiendaProductoPattern = /^tienda\/producto\/([^\/]+)\/([^\/]+)$/;
    //URL has to be in the form: tienda/producto/category/name-of-product

    if (tiendaProductoPattern.test(hash)) {
        //check and get all the dynamic paths of the URL
        const match = hash.match(tiendaProductoPattern);
        const category = match[1];
        const productName = match[2];

        //find the product
        const product = await findProductByCategoryAndName(category, productName);

        //render the product 
        renderProductPage(product);

        
        //update title attribute of loading page
        document.title =  `${product.name} · Oshare Designs`;
        
        //scroll to the top of the new page
        window.scrollTo({ top: 0});

        //include proper navbar
        navBar(userData.isSessionSet);
        //include footer
        footer();

        return;
    }

    //■■■■■■■■■■■■■■■■■■■■ hash system routing ■■■■■■■■■■■■■■■■■■■■//

    if (section) {
        //scroll to the section with that id if it exist
        section.scrollIntoView({ behavior: 'smooth' }); // Scroll smoothly to the section

    }else{
        // Change page content based on hash
        switch(hash) {
            //home page
            case '':

                //update title attribute of page
                document.title =  `Oshare Designs · Fashionable Store`;

                //include proper navbar
                navBar(userData.isSessionSet);

                //update home content
                content.innerHTML = homeContent;
                
                //products container
                const containerTrendingProducts = document.getElementById("container-trending-products");
                //billboard container
                const containerBillboard = document.getElementById("billboard-ad-container");
                //reviews container
                const containerReviews = document.getElementById("reviews-container");
                //blog articles container
                const containerBlogArticles = document.getElementById("blog-container-articles");
                
                //fetch to home data
                const homeFetchUtils = async () => {
                    let products= await fetchData("assets/js/json/products-list.json", "products"); 
                    let billboardAds= await fetchData("assets/js/json/billboard.json", "billboard");            
                    let reviews= await fetchData("assets/js/json/reviews.json", "reviews");            
                    let blogArticles= await fetchData("assets/js/json/blog.json", "articles");            

                    displayProductList(products, containerTrendingProducts);
                    displayBillboard(billboardAds, containerBillboard);
                    displayReviews(reviews, containerReviews);
                    displayBlogArticles(blogArticles, containerBlogArticles);
                }

                //apply fetch to home data
                homeFetchUtils();

                //include footer
                footer();

            break;
            //store page
            case 'tienda':

                //update title attribute of page
                document.title =  `Oshare Designs · Shop Online`;

                //include proper navbar
                navBar(userData.isSessionSet);

                //update page content
                content.innerHTML = shopContent;

                //products container
                const shopContainerTrendingProducts = document.getElementById("container-trending-products");

                //fetch to shop data
                const shopFetchUtils = async () => {
                    let products= await fetchData("assets/js/json/products-list.json", "products"); 

                    displayProductList(products, shopContainerTrendingProducts);
                }

                //apply fetch to shop data
                shopFetchUtils();

                //include footer
                footer();
                
            break;
            //contact page
            case 'contacto':

                //update title attribute of page
                document.title =  `Oshare Designs · Contacto`;

                //include proper navbar
                navBar(userData.isSessionSet);

                //update page content
                content.innerHTML = contactPageContent;

                //include validation for contact form
                validationContactForm(maxLengthValidation, minLengthValidation, phoneNumberValidation, emailValidation);

                //don't include footer
                footer(false);

            break;
            //products page
            case 'productos':

                //update title attribute of page
                document.title =  `Oshare Designs · Catalogo`;

                //include proper navbar
                navBar(userData.isSessionSet);

                content.innerHTML = carousel;

                //include footer
                footer();
            break;
            //not found page
            default:

                //update title attribute of page
                document.title =  `Oshare Designs · 404 Not Found`;

                //include proper navbar
                navBar(userData.isSessionSet);

                content.innerHTML = notFoundMessage;
                redirectToPage("", 3000);

                //include footer
                footer();
            break;
        }

        // Scroll to the top of the page once content is changed
        window.scrollTo({ top: 0});

        //carousel functionality
        const buttons = document.querySelectorAll("[data-carousel-button]");
        if (buttons) {
            carouselFunctionality(buttons);
        }
        //init Animation on Scroll library
        AOS.init();
    }
}

//handle popstate event (back/forward navigation)
window.addEventListener("popstate", updateContent);

//update content when the page loads or hash changes
window.addEventListener('hashchange', updateContent);

//update content when the page loads or hash changes
document.addEventListener("DOMContentLoaded", () => {

    //update title attribute of loading page
    document.title =  `Oshare Designs · Loading...`;

    const loadingScreen = document.getElementById("loading-overlay");
    const body = document.querySelector("body");

    //display loading screen on DOM loading start
    loadingScreen.classList.add("flex");
    body.style.overflowY = "hidden";

    window.onload = () => {

        //display content when the window if fully loaded
        loadingScreen.classList.remove("flex");
        loadingScreen.classList.add("d-none");
        body.style.overflowY = "scroll";


        //recover session data if user was connected
        if(getSessionData("oshare_designs_session")){
            //set user object's data with session's data  
            setUserDataFromSessionData(userData);
        }

        //update content based on the URL
        updateContent();

    }
});

// window.onbeforeunload = function () {

//     return "Are you sure";
// };
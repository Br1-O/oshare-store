//fetch util import
import { fetchData } from "../utils/fetch.js";
//home page content
import { homeContent } from "../pages/home/MAIN.js";
import { displayProductList } from "../pages/home/products.js";
import { displayBillboard } from "../pages/home/billboard.js";
import { displayReviews } from "../pages/home/reviews.js";
import { displayBlogArticles } from "../pages/home/blog.js";
//shop page content
import { shopContent } from "../pages/shop/MAIN.js";
//page not found content
import { notFoundMessage } from "../pages/notFound404.js";


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
const updateContent = () => {
    const hash = window.location.hash.substring(1); // Remove leading "#"
    // Get the section ID from the hash
    const sectionId = window.location.hash.substring(1); // Remove the leading '#'

    //container for page content
    const content = document.getElementById("main");
    //section with the corresponding ID
    const section = document.getElementById(sectionId);

    if (section) {
        //scroll to the section with that id if it exist
        section.scrollIntoView({ behavior: 'smooth' }); // Scroll smoothly to the section

    }else{
        // Change page content based on hash
        switch(hash) {
            //home page
            case '':
                content.innerHTML = homeContent;
                
                //products container
                const containerTrendingProducts = document.getElementById("container-trending-products");
                //billboard container
                const containerBillboard = document.getElementById("billboard-ad-container");
                //reviews container
                const containerReviews = document.getElementById("reviews-container");
                //blog articles container
                const containerBlogArticles = document.getElementById("blog-container-articles");
                
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

                homeFetchUtils();
            
            break;
            //store page
            case 'shop':
                content.innerHTML = shopContent;

                //products container
                const shopContainerTrendingProducts = document.getElementById("container-trending-products");

                const shopFetchUtils = async () => {
                    let products= await fetchData("assets/js/json/products-list.json", "products"); 

                    displayProductList(products, shopContainerTrendingProducts);
                }

                shopFetchUtils();
            break;
            case 'contact':
                content.innerHTML = '<h2>Contact Us</h2><p>Feel free to reach out to us.</p>';
            break;
            //not found page
            default:
                content.innerHTML = notFoundMessage;
            break;
        }
        // Scroll to the top of the page once content is changed
        window.scrollTo({ top: 0});
    }
}

//Handle popstate event (back/forward navigation)
window.addEventListener("popstate", updateContent);
// Update content when the page loads or hash changes
window.addEventListener('load', updateContent);
window.addEventListener('hashchange', updateContent);
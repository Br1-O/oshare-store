export const displaySingleProductPage = (product, container, userData = {}) => {

    //final template storage
    let template = "";
    let tagsTemplate = "";
    let ratingTemplate = "";

    //add product's info into literal template

        //set rating template
        switch (parseFloat(product.rating)) {
            
            case 5:
                ratingTemplate = 
                `<i class='bx bxs-star'></i>
                <i class='bx bxs-star'></i>
                <i class='bx bxs-star'></i>
                <i class='bx bxs-star'></i>
                <i class='bx bxs-star' ></i>`
                break;
            
            case 4.5:
                ratingTemplate = 
                `<i class='bx bxs-star'></i>
                <i class='bx bxs-star'></i>
                <i class='bx bxs-star'></i>
                <i class='bx bxs-star'></i>
                <i class='bx bxs-star-half' ></i>`
                break;        
            
            case 4:
                ratingTemplate = 
                `<i class='bx bxs-star'></i>
                <i class='bx bxs-star'></i>
                <i class='bx bxs-star'></i>
                <i class='bx bxs-star'></i>
                <i class='bx bx-star'></i>`
                break;       
            
            case 3.5:
                ratingTemplate = 
                `<i class='bx bxs-star'></i>
                <i class='bx bxs-star'></i>
                <i class='bx bxs-star-half'></i>
                <i class='bx bx-star'></i>
                <i class='bx bx-star'></i>`
                break;        
            
            case 3:
                ratingTemplate = 
                `<i class='bx bxs-star'></i>
                <i class='bx bxs-star'></i>
                <i class='bx bxs-star'></i>
                <i class='bx bx-star'></i>
                <i class='bx bx-star'></i>`
                break;

            case 2.5:
                ratingTemplate = 
                `<i class='bx bxs-star'></i>
                <i class='bx bxs-star'></i>
                <i class='bx bxs-star-half'></i>
                <i class='bx bx-star'></i>
                <i class='bx bx-star'></i>`
                break;

            case 2:
                ratingTemplate = 
                `<i class='bx bxs-star'></i>
                <i class='bx bxs-star'></i>
                <i class='bx bx-star'></i>
                <i class='bx bx-star'></i>
                <i class='bx bx-star'></i>`
                break;

            case 1.5:
                ratingTemplate = 
                `<i class='bx bxs-star'></i>
                <i class='bx bxs-star-half'></i>
                <i class='bx bx-star'></i>
                <i class='bx bx-star'></i>
                <i class='bx bx-star'></i>`
                break;

            case 1:
                ratingTemplate = 
                `<i class='bx bxs-star'></i>
                <i class='bx bx-star'></i>
                <i class='bx bx-star'></i>
                <i class='bx bx-star'></i>
                <i class='bx bx-star-half'></i>`
                break;

            case 0.5:
                ratingTemplate = 
                `<i class='bx bxs-star-half'></i>
                <i class='bx bx-star'></i>
                <i class='bx bx-star'></i>
                <i class='bx bx-star'></i>
                <i class='bx bx-star'></i>`
                break;

            default:
                ratingTemplate = 
                `<i class='bx bx-star'></i>
                <i class='bx bx-star'></i>
                <i class='bx bx-star'></i>
                <i class='bx bx-star'></i>
                <i class='bx bx-star-half'></i>`
                break;
        }

        let tagColor = "";

        //set tags template
        (product.tags).forEach(tag => {

            //set proper bg color of tag
            switch (tag) {
                case "Nuevo":
                    tagColor="--tag-color-new";
                    break;
                case "Oferta":
                    tagColor="--tag-color-discount";
                    break;
                case "Oferta especial":
                    tagColor="--tag-color-special";
                    break;
                default:
                    tagColor="white";
                    break;
            }

            tagsTemplate += `<span class="product-tag" style="background-color:var(${tagColor})"><h5> ${tag} </h5></span>`;
        });

        //add filled product's template into variable
        template = `
        
            <div id="product-page-container" class="flex d-col" data-product="${product.id}" data-aos="fade-up" data-aos-offset="50" data-aos-duration="2000">
        
                <section id="product-page-info"  class="flex rowToCol">
                    
                    <article id="product-images">

                        <div id="product-images-column"> 
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>

                        <div id="product-images-selected"> 
                        
                            <a href=${product.image[0]} target="_blank">
                                <img id="product-page-image" src= ${product.image[0]} src2= ${product.image[1] ? product.image[1] : "none"} data-src=${product.image[0]} loading="lazy" alt="${product.name}">
                            </a>

                        </div>

                    </article>

                    <article id="product-details">

                        <div class="inline-navigation-bar">
                            <p> 
                                <span>Path</span> / 
                                <span>Path</span> / 
                                <span>Path</span> 
                            </p>
                        </div>

                        <div class="product-tags">
                            ${tagsTemplate}
                        </div>

                        <h2> ${product.name} </h2>

                        <h4> $${product.price} </h4>

                        <p id="product-page-description"> ${product["description-cover"]} </p>

                        <div id="product-stock-info">

                            <div class="flex col">
                                
                                <h5> Talle </h5>

                                <div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>

                            </div>

                            <div class="flex col">
                                
                                <h5> Color </h5>

                                <div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>

                            </div>

                        </div>

                        <div class="flex row">


                            <div id="product-add-to-cart-container">
                                    
                                <input type="number" id="product-add-to-cart-quantity" name="quantity" value="1" min="1" max="100">

                                <button class="form-btn" id="btn-cart-add">
                                    <i class='bx bxs-cart-add'></i>
                                    Añadir al carrito
                                </button>
                            </div>
                        
                        </div>

                        <div class="product-container-favs-rating">
                            <div class="product-favorite">
                                <span> Añadir a favoritos </span> ${product.favorite ? "<i class='bx bxs-heart'></i>" :  "<i class='bx bx-heart'></i>" }
                            </div>
                            
                            <div class="product-rating">
                                <span> Valoración: </span> ${ratingTemplate}
                            </div>
                        </div>


                        <div class="product-container-additional-data">

                            <div> 
                                <h4></h4>

                                <div></div>
                            </div>

                            <div> 
                                <h4></h4>

                                <div></div>
                            </div>

                            <div> 
                                <h4></h4>

                                <div></div>
                            </div>

                        </div>

                    </article>

                </section>
        
                <section id="product-recomendations" class="flex rowToCol">

                </section>
        
                <section id="product-reviews">

                </section>
        
            </div>
    
        `;

    //set product page template into container
    container.innerHTML = template;

    //set event listeners

        //add to shopping cart button
        let btnAddToCart = document.getElementById("btn-cart-add");

        btnAddToCart.addEventListener("click", () => {

            //add product to cart of user object
            userData.cart.push(product.id);

            //dispatch event to update screen
            window.dispatchEvent(new Event('itemAddedToCart'));
        });
}

{/* <div class="product-card" id="product-${product.id}" data-product="${product.id}" data-aos="fade-up" data-aos-offset="50" data-aos-duration="2000" >
<a href="${product.link}">
    <img class="product-image" id="product-img-${product.id}" src= ${product.image[0]} src2= ${product.image[1] ? product.image[1] : "none"} data-src=${product.image[0]} loading="lazy" alt="${product.name}">
</a>

<div class="product-info">

    <div class="product-tags">
        ${tagsTemplate}
    </div>

    <div class="product-container-favs-rating">
        <div class="product-favorite">
            <span> Añadir a favoritos </span> ${product.favorite ? "<i class='bx bxs-heart'></i>" :  "<i class='bx bx-heart'></i>" }
        </div>
        
        <div class="product-rating">
            <span> Valoración: </span> ${ratingTemplate}
        </div>
    </div>

    <a href="${product.link}">
        <h4 class="product-name"> ${product.name} </h4>
    </a>
    <p class="product-description-cover"> ${product["description-cover"]} </p>
    
    <div class="flex row" style="justify-content: space-between;">
        <i id="btn-cart-add" class='bx bxs-cart-add' style="margin-right:20vh; font-size:2rem; cursor:pointer;"></i>
        <p class="product-price"> $${product.price} </p>
    </div>
</div>
</div> */}
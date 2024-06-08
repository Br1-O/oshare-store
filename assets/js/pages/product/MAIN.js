import { getStockOfProductOrderedBySize } from "../../utils/products.js";

export const displaySingleProductPage = async(product, container, userData = {}) => {

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

            tagsTemplate += `<a href="#tienda/productos/${(tag).toLowerCase()}">
                                <span class="product-tag" style="background-color:var(${tagColor})">
                                    <h5> ${tag} </h5>
                                </span>
                            </a>`;
        });

        //set category with mayus on first letter
        let category = (((product.categories[0]).charAt(0)).toUpperCase()) + (product.categories[0]).slice(1);

        //set preview images template
        let previewImagesColumnTemplate = "";

        (product.image).forEach(image => {

            previewImagesColumnTemplate += 
            `
                <img src="${image}" class="preview-thumbnail">
            `;
        
        });

        //get stock info for sizes available
        const stockOfProductOrderedBySize = await getStockOfProductOrderedBySize(product.id);

        //template for sizes options
        let templateSizesOption = "";

        //template for colors options
        let templateColorsOption = "";
        
        //btns for available colors
        let btnColors;

        //flag for iteration
        let i = 0;
        
        //set sizes options template
        stockOfProductOrderedBySize.forEach((size) => {

            // Check if any item of that size is in stock
            let isInStock = (size.stock).some(product => product.in_stock);

            //change size code into size letter
            let sizeLetter;

            switch (size.size) {
                case 1:
                    sizeLetter = "XS";
                break;

                case 2:
                    sizeLetter = "S";
                break;

                case 3:
                    sizeLetter = "L";
                break;

                case 4:
                    sizeLetter = "XL";
                break;
            }

            //assign template for sizes if any product of that size is in stock
            if (isInStock) {

                //if it is the first iteration, select it
                if(i === 0){

                    templateSizesOption += 
                    `
                        <div class="product-stock-info-size" data-size=${size.size} data-selected> ${sizeLetter} </div>
                    `;

                    //set template to all available colors
                    size.stock.forEach(product => {

                        //if product is in stock, show all the color options
                        if (product.in_stock) {

                            templateColorsOption +=
                            `
                                <div class="product-stock-info-color" style="background-color:${product.code}" data-stock="${product.quantity}"></div>
                            `;
                        }

                    });

                    //btns for available colors
                    btnColors = document.getElementsByClassName("product-stock-info-color");

                    //increase flag once first iteration is over
                    i++;

                }else{
                    templateSizesOption += 
                    `
                        <div class="product-stock-info-size" data-size=${size.size}> ${sizeLetter} </div>
                    `;
                }
            } else {
                //if not in stock, show the size in gray with no interaction available
                templateSizesOption += 
                `
                    <div class="product-stock-info-size" style="cursor:none; pointer-events: none; user-select: none; filter:brightness(50%);" data-size=${size.size}> ${sizeLetter} </div>
                `;
            }

        });

        //add filled product's template into variable
        template = `
        
            <div id="product-page-container" class="flex d-col" data-product="${product.id}" data-aos="fade-up" data-aos-offset="50" data-aos-duration="2000">
        
                <section id="product-page-info"  class="flex rowToCol">
                    
                    <article id="product-images">

                        <div id="product-images-column"> 
                            ${previewImagesColumnTemplate}
                        </div>

                        <div id="product-images-selected"> 
                        
                            <a href="#" target="_blank">
                                <img id="product-page-image" class="preview-image" src= ${product.image[0]} data-src=${product.image[0]} loading="lazy" alt="${product.name}">
                            </a>

                        </div>

                    </article>

                    <article id="product-details">

                        <div class="inline-navigation-bar">
                            <p> 

                                <a href="#tienda">
                                    Tienda / 
                                </a>

                                <a href="#tienda/productos">
                                    Productos / 
                                </a>

                                <a href="#tienda/productos/${category}">
                                    ${category} / 
                                </a>

                                <span> ${product.name} </span>

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
                                    ${templateSizesOption}
                                </div>

                            </div>

                            <div class="flex col">
                                
                                <h5> Color </h5>

                                <div id="product-stock-info-colors">
                                    ${templateColorsOption}
                                </div>

                            </div>

                        </div>

                        <div class="flex col">

                            <p id="product-add-to-cart-display-quantity"></p>

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

                    </article>

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

        //product image toggle with thumbnail images
        let previewThumbnails = document.getElementsByClassName("preview-thumbnail");
        let previewImage = document.querySelector(".preview-image");

        for (const thumbnail of previewThumbnails) {

            let thumbnailSrc = thumbnail.src;

            //change the source of the preview image to the thumbnail's source
            thumbnail.addEventListener("click", () => {
                previewImage.src = thumbnailSrc;
                //change the href of the a so it opens the new image when clicked
                (previewImage.parentElement).href = thumbnailSrc;
            });
        }

        //product sizes to show available colors
        const btnSizes = document.getElementsByClassName("product-stock-info-size");
        const containerColors = document.getElementById("product-stock-info-colors");
        const containerQuantity = document.getElementById("product-add-to-cart-display-quantity");

        //iterate all sizes buttons
        for (const btn of btnSizes) {
            
            //event listener to set all the colors options for that size on click
            btn.addEventListener("click", () => {

                //remove selected dataset from selected size and select current size
                setBtnAsSelected(btn, btnSizes);

                //clean template color from previous colors
                templateColorsOption = "";

                //erase the quantity available for the last product
                containerQuantity.innerText = "";

                //get size id from dataset of btn
                let sizeId = parseInt(btn.dataset.size);

                //check all sizes of the product for that size data
                stockOfProductOrderedBySize.forEach(size => {

                    if (size.size === sizeId) {
                        
                        //set template to all available colors
                        size.stock.forEach(product => {

                            //if product is in stock, show the option for that color
                            if (product.in_stock) {
                                templateColorsOption +=
                                `
                                    <div class="product-stock-info-color" style="background-color:${product.code}" data-stock="${product.quantity}"></div>
                                `
                            }

                        });

                        //display template of color's options
                        containerColors.innerHTML = templateColorsOption;
                    }
                });

                //btns for available colors
                btnColors = document.getElementsByClassName("product-stock-info-color");

                if (btnColors.length !== 0) {

                    //iterate all color buttons
                    for (const btn of btnColors) {

                        //remove previous event listeners to avoid unstable behaviour
                        btn.removeEventListener("click", setBtnAsSelected);
        
                        //event listener for all color buttons 
                        btn.addEventListener("click", () => {
                            //remove selected dataset from selected color and select current color
                            setBtnAsSelected(btn, btnColors);
                            //display the quantity available for that product
                            containerQuantity.innerText = 
                            `
                                ${btn.dataset.stock > 1 ? btn.dataset.stock + " disponibles" : "¡" + btn.dataset.stock + " disponible!"} 
                            `
                        });
                    }
                }

            });
        }

        //This event listener is outside size btns eventListener for the case where size btn is not clicked
            //iterate all color buttons
            for (const btn of btnColors) {
                //event listener for all color buttons 
                btn.addEventListener("click", () => {
                    //remove selected dataset from selected color and select current color
                    setBtnAsSelected(btn, btnColors);
                    //display the quantity available for that product
                    containerQuantity.innerText = 
                    `
                        ${btn.dataset.stock > 1 ? btn.dataset.stock + " disponibles" : "¡" + btn.dataset.stock + " disponible!"}
                    `
                });
            }

        //function to set only a targeted btn from a collection with the dataset-selected
        function setBtnAsSelected(btnSelected, ElementsByClassCollection) {
        
            //remove selected dataset from selected color
            for (const btn of ElementsByClassCollection){
                btn.hasAttribute("data-selected") && btn.removeAttribute("data-selected");
            }
            
            //add dataset selected to this btn size
            btnSelected.dataset.selected = "";
        }
}
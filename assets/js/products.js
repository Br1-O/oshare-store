//display content of products json into container
const displayProductList = (productList, container) => {

    //final template storage
    let template = "";
    let tagsTemplate = "";
    let ratingTemplate = "";

    //add each product's info into literal template
    productList.forEach(product => {

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
                <i class='bx bx-star'></i>
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
        template += `<div class="product-card">
                        <a href="${product.link}">
                            <img class="product-image" src= ${product.image} alt="">
                        </a>

                        <div class="product-info">
                    
                            <div class="product-tags">
                                ${tagsTemplate}
                            </div>

                            <div class="product-favorite">
                                <span> Añadir a favoritos </span> ${product.favorite ? "<i class='bx bxs-heart'></i>" :  "<i class='bx bx-heart'></i>" }
                            </div>
                            
                            <div class="product-rating">
                                <span> Valoración: </span> ${ratingTemplate}
                            </div>

                            <a href="${product.link}">
                                <h4 class="product-name"> ${product.name} </h4>
                            </a>
                            <p class="product-description-cover"> ${product["description-cover"]} </p>
                            <p class="product-price"> ${product.price} </p>
                        </div>
                    </div>`;

        //clean tags variable for new iteration
        tagsTemplate = "";
    });

    //set container's content as template
    container.innerHTML = template;
}

//load trending products into page when loaded
document.addEventListener('DOMContentLoaded', async () => {

    //DOM elements
    const containerTrendingProducts = document.getElementById("container-trending-products");

    try {
        const response = await fetch("assets/js/json/products-list.json",{ 
            method:'GET',
            headers: {
                'content-type': 'application/json'    
            }
        });

        if (!response.ok) {
            throw new Error("Couldn't retrieve list of products");
        }
    
        const res = await response.json();

        displayProductList(res.data.products, containerTrendingProducts);

    } catch (error) {
        console.log("An error happened fetching the trending products list: ", error);
    }

});

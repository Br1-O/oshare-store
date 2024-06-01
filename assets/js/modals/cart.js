//■■■■■ Shop modal ■■■■■

export const setEventListenerModalCart = (btnCart) => {

    const cartContainer = document.getElementById("cart-container");

    const btnCloseCart = document.getElementById("btn-cart-close");

    btnCart.addEventListener("click", () => {

        // Check if the cart menu already exists
        if (cartContainer.classList.contains("d-none")) {

            //show cart
            cartContainer.classList.remove("d-none");
    
        } else {
            //hide cart
            cartContainer.classList.add("d-none");
        }
        
    });

    btnCloseCart.addEventListener("click", () => {
        cartContainer.classList.add("d-none");
    });
}

export const setModalCart = (cart, productList) => {

    const cartContainer = document.getElementById("cart-container");
    const cartContent = document.getElementById("cart-items");

    const cartsubtotal = document.querySelector("#cart-subtotal span");
    const cartNumberOfItems = document.getElementById("cart-total-items");


    let cartTemplate = "";
    let subtotal = 0;

    if (cart.length === 0) {
        cartTemplate = 
        `   
            <p> Tu carrito está vacio </p>
        `
    } else {

        cartContent.innerHTML = "";

        let size = "S";
        let color = "Rojo";
        let isInStock = "En Stock";
        
        //function to count how many copies of the same product are in the shopping cart
        const countQuantity = (array, value) => {
            return array.reduce((count, current) => {
                return current === value ? count + 1 : count;
            }, 0);
        }

        // New map to store products and their quantities
        let cartWithQuantity = new Map();

        //iterate through all products in the shopping cart
        cart.forEach((item) => {

            // Check if product is already in the cartWithQuantity
            if (!cartWithQuantity.has(item)) {
                let quantity = countQuantity(cart, item);
                cartWithQuantity.set(item, quantity);
            }
                            
        });

        // Convert the map to an array of tuples
        cartWithQuantity = Array.from(cartWithQuantity.entries());

        //iterate through all products in the shopping cart
        cartWithQuantity.forEach((item) => {

            //check that productList is valid
            if (productList != null && productList != undefined) {

                //iterate through productList
                productList.forEach((product) => {

                    //check if any of the products are present in the array
                    if (product.id === item[0]) {

                        cartTemplate +=
                        `
                        <article id="cart-card-product" class="rowToCol" data-product=${product.id}>

                            <a href=${product.link}>
                                <img src=${product.image[0]} alt="">
                            </a>
                        
                            <div id="cart-card-product-info">
                        
                                <a href=${product.link}>
                                    <h2> ${product.name} </h2>
                                </a>
                        
                                <h4> Talle: ${size} Color: ${color} </h4>
                                <p> ${item[1]} x $ ${product.price} </p>
                                <p> ${isInStock} </p>
                                
                                <p id="btn-cart-delete-product"> 
                                    <i class='bx bxs-trash'></i>
                                    <span> Eliminar </span>
                                </p>
                            </div>
                        
                        </article>
                        `
                        //change subtotal of the shopping cart
                        subtotal += parseFloat(item[1])*parseFloat(product.price);
                    }

                });
            }

        });
    }

    //change number of items in the shopping cart
    cartNumberOfItems.innerText = "(" + cart.length+ ")" ;

    //change content and subtotal of the shopping cart
    cartContent.innerHTML = cartTemplate;
    cartsubtotal.innerText = subtotal;
}
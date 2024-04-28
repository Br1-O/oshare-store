//body
const pageContent = document.getElementById("page-content");

//modal
const modal = document.querySelector("dialog");
const modalContent = document.getElementById("modal-content");
const btnCloseModal = document.getElementById("btn-modal-close");

//nav icons
const btnShop = document.getElementById("shop-icon");
const btnAccount = document.getElementById("account-icon");

//■■■■■ ChangeContent-Open-Close dialog window ■■■■■

//change content modal
const changeModal = (template) => {
    modalContent.innerHTML = template;
};

const openModal = (template = "") => {
    template && changeModal(template);
    modal.setAttribute("open", "");
    pageContent.classList.add("overlay");
};

const closeModal = () => {
        changeModal("");
        modal.removeAttribute("open");
        pageContent.classList.remove("overlay");
};

//btn close modal
btnCloseModal.addEventListener("click", () => {
    closeModal();
});

//■■■■■ Account modal ■■■■■

// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■
//Bug with event listeners creation, it provokes the modal to close when trying to toggle back into login modal after going to register modal
//The elements are defined inside the string literal templates so taking out eventListeners is not posible in this setup
//Future's Bruno, CHECK THIS WHEN ABLE!!!
// ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

btnAccount.addEventListener("click", () => {

    const loginTemplate = 
    `<h4> Ingresa a tu cuenta </h4>

    <form action="#" method="post" id="modal-container-form">

      <div class="col w-100">
        <div class="row w-100">
          <label for="user"> Usuario </label>
          <input type="text" class="form-field" name="user" class="form-text-input" placeholder="Ingrese su usuario">
        </div>

        <div class="row w-100">
          <label for="password"> Contraseña </label>
          <input type="password" class="form-field" name="password" class="form-text-input" placeholder="Ingrese su contraseña">
        </div>
      </div>

      <p id="btn-go-to-register"> ¿No tienes una cuenta? <a href="" style="font-weight: 400;"> ¡Registrate aquí! </a> </p>

      <button class="form-btn">Ingresar</button>

      <p> ¿Olvidaste tu contraseña?</p>

      <div class="modal-connectvia w-100">

        <p>Al ingresar, aceptas las <a href="">Condiciones de uso</a>, la <a href="">Política de privacidad</a>  y la <a href="">Política de cookies</a>.</p>
        
        <div class="row w-100">
          <button class="form-btn connectvia-btn">
            <i class='bx bxl-google'></i> 
            Connect via Google 
          </button>
          <button class="form-btn connectvia-btn">
            <i class='bx bxl-facebook'></i> 
            Connect via Facebook 
          </button>
        </div>

      </div>
    </form>`

    openModal(loginTemplate);

    //■■ toggle to Register Modal ■■

    const btnGoToRegister = document.getElementById("btn-go-to-register");

    const toggleToRegister = () => {
        //there might be an issue w/ event listener, at third iteration of: 
        //account-> goToregister -> close, modal window closes before clicking close
        btnGoToRegister.removeEventListener("click", toggleToRegister);
        const registerTemplate = 
        `<h4> ¡Crea tu cuenta! </h4>
  
        <form action="#" method="post" id="modal-container-form">
    
          <div class="col w-100">
            <div class="row w-100">
              <label for="user"> Usuario </label>
              <input type="text" class="form-field" name="user" class="form-text-input" placeholder="Ingrese su usuario">
            </div>
    
            <div class="row w-100">
              <label for="password"> Contraseña </label>
              <input type="password" class="form-field" name="password" class="form-text-input" placeholder="Ingrese su contraseña">
            </div>
  
            <div class="row w-100">
              <label for="user"> Email </label>
              <input type="email" class="form-field" name="user" class="form-text-input" placeholder="Ingrese su usuario">
            </div>
          </div>
    
          <p id="btn-go-to-login"> ¿Ya posees una cuenta? <a href="" style="font-weight: 400;"> ¡Ingresa aquí! </a> </p>
    
          <button class="form-btn"> Registrarse </button>
    
          <div class="modal-connectvia w-100">
    
            <p>Al ingresar, aceptas las <a href="">Condiciones de uso</a>, la <a href="">Política de privacidad</a>  y la <a href="">Política de cookies</a>.</p>
            
            <div class="row w-100">
              <button class="form-btn connectvia-btn">
                <i class='bx bxl-google'></i> 
                Connect via Google 
              </button>
              <button class="form-btn connectvia-btn">
                <i class='bx bxl-facebook'></i> 
                Connect via Facebook 
              </button>
            </div>
    
          </div>
        </form>`;
        changeModal(registerTemplate);

        //■■ toggle to Login Modal ■■

        const btnGoToLogin = document.getElementById("btn-go-to-login");

        const toggleToLogin = () => {
            btnGoToLogin.removeEventListener("click", toggleToLogin);
            changeModal(loginTemplate);
        };

        btnGoToLogin.addEventListener("click",toggleToLogin);
        
    };

    btnGoToRegister.addEventListener("click",toggleToRegister);
});



//■■■■■ Shop modal ■■■■■

btnShop.addEventListener("click", () => {
    const shopTemplate = 
    `<h4> Pagina en construcción </h4>
    <img src="assets/resources/img/Logo_Oshare.jpg" style="max-width:100%; max-height:100%; border: solid 1px var(--border-color); border-radius:15px;" alt="">`
    openModal(shopTemplate);
});




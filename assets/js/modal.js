import { validationLoginRegister } from "./validation/login&register.js";

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

export const accountTemplate = 
`
<div id="modalLogin">
  <h4> Ingresa a tu cuenta </h4>

  <form action="#" method="post" id="modal-container-form">

    <div class="col w-100">

      <p id="errorEmailLogin" class="error d-none"></p>
      <div class="row w-100">
        <label for="email"> Correo </label>
        <input type="text" class="form-field" name="email" class="form-text-input" placeholder="Ingrese su correo electronico">
      </div>

      <p id="errorPasswordLogin" class="error d-none"></p>
      <div class="row w-100" style="position:relative;">
        <label for="password"> Contraseña </label>
        <input type="password" class="form-field" name="password" class="form-text-input" placeholder="Ingrese su contraseña">
        <i class='bx bx-low-vision display-password' aria-label="show hide password eye icon"></i>
      </div>
    </div>

    <p class="btn-go-to-register"> ¿No tienes una cuenta? <a href="" style="font-weight: 400;"> ¡Registrate aquí! </a> </p>

    <button class="form-btn" id="btnLogin">Ingresar</button>

    <p id="btn-go-to-recoverPass"> ¿Olvidaste tu contraseña?</p>

    <div class="modal-connectvia w-100">

      <p>Al ingresar, aceptas las <a href="">Condiciones de uso</a>, la <a href="">Política de privacidad</a>  y la <a href="">Política de cookies</a>.</p>
      
      <div class="col w-100" style="padding:0rem; align-items:flex-start;">

        <button class="form-btn connectvia-btn">
          <img class="iconConnectVia" src="assets/resources/img/icons/google.png" alt="connect with google"> 
          Connect via Google 
        </button>

        <button class="form-btn connectvia-btn">
          <img class="iconConnectVia" src="assets/resources/img/icons/facebook.png" alt="connect with facebook">
          Connect via Facebook  
        </button>

      </div>
    </div>
  </form>
</div>

<div id="modalRegister" class="d-none">
  <h4> ¡Crea tu cuenta! </h4>

  <form action="#" method="post" id="modal-container-form">

    <div class="col w-100">

      <p id="errorEmailRegister" class="error d-none"></p>
      <div class="row w-100">
        <label for="email"> Correo </label>
        <input type="email" class="form-field" name="email" class="form-text-input" placeholder="Ingrese su correo electronico">
      </div>

      <p id="errorEmailConfirmRegister" class="error d-none"></p>
      <div class="row w-100">
        <label for="emailConfirm"> Correo </label>
        <input type="email" class="form-field" name="emailConfirm" class="form-text-input" placeholder="Confirme su correo electronico">
      </div>

      <p id="errorPasswordRegister" class="error d-none"></p>
      <div class="row w-100" style="position:relative;">
        <label for="password"> Contraseña </label>
        <input type="password" class="form-field" name="password" class="form-text-input" placeholder="Ingrese una contraseña">
        <i class='bx bx-low-vision display-password' aria-label="show hide password eye icon"></i>
      </div>

      <p id="errorPasswordConfirmRegister" class="error d-none"></p>
      <div class="row w-100" style="position:relative;">
        <label for="passwordConfirm"> Contraseña </label>
        <input type="password" class="form-field" name="passwordConfirm" class="form-text-input" placeholder="Confirme la contraseña">
        <i class='bx bx-low-vision display-password' aria-label="show hide password eye icon"></i>
      </div>

    </div>

    <p class="btn-go-to-login"> ¿Ya posees una cuenta? <a href="" style="font-weight: 400;"> ¡Ingresa aquí! </a> </p>

    <button class="form-btn" id="btnRegister"> Registrarse </button>

    <div class="modal-connectvia w-100">

      <p>Al ingresar, aceptas las <a href="">Condiciones de uso</a>, la <a href="">Política de privacidad</a>  y la <a href="">Política de cookies</a>.</p>
      
      <div class="col w-100" style="padding:0rem; align-items:flex-start;">

        <button class="form-btn connectvia-btn">
          <img class="iconConnectVia" src="assets/resources/img/icons/google.png" alt="connect with google"> 
          Connect via Google 
        </button>

        <button class="form-btn connectvia-btn">
          <img class="iconConnectVia" src="assets/resources/img/icons/facebook.png" alt="connect with facebook">
          Connect via Facebook  
        </button>

      </div>
    </div>
  </form>
</div>

<div id="modalRecoverPass" class="d-none">
  <h4> Recupera tu contraseña </h4>

  <form action="#" method="post" id="modal-container-form" style="min-width:100%;">

    <div class="col w-100">

      <p id="errorEmailRecoverPass" class="error d-none"></p>
      <div class="row w-100">
        <label for="email"> Correo </label>
        <input type="text" class="form-field" name="email" class="form-text-input" placeholder="Ingrese su correo electronico">
      </div>
    </div>

    <button class="form-btn" id="btnRecover"> Recuperar contraseña </button>

    <p class="btn-go-to-login"> ¿Ya posees una cuenta? <a href="" style="font-weight: 400;"> ¡Ingresa aquí! </a> </p>

    <p class="btn-go-to-register"> ¿No tienes una cuenta? <a href="" style="font-weight: 400;"> ¡Registrate aquí! </a> </p>

  </form>
</div>
`;

// Function to open modal with given template
export function accountModal(template) {
  // Open the modal
  openModal(template);

  // Get references to the modal elements
  const modalLogin = document.getElementById("modalLogin");
  const modalRegister = document.getElementById("modalRegister");
  const modalRecoverPass = document.getElementById("modalRecoverPass");

  // Get reference to toggle buttons
  const toggleBtn = document.getElementsByClassName("btn-go-to-register");
  const toggleBtnRegister = document.getElementsByClassName("btn-go-to-login");
  const toggleBtnRecoverPass = document.getElementById("btn-go-to-recoverPass");

  //input fields for focus
  const inputUserLogin = document.querySelector('#modalLogin [name="email"]');
  const inputUserRegister = document.querySelector('#modalRegister [name="email"]');
  const inputUserRecover = document.querySelector('#modalRecoverPass [name="email"]');

  //show/hide password eye icons
  const btnShowPassword = document.getElementsByClassName('display-password');

  //focus first field
  inputUserLogin.focus();

  // Add click event listener to toggle button
  for (const btn of toggleBtn) {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
  
      modalLogin.classList.add("d-none");
      modalRegister.classList.remove("d-none");
      modalRecoverPass.classList.add("d-none");
  
      inputUserRegister.focus();
    });
  }

  for (const btn of toggleBtnRegister) {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      modalLogin.classList.remove("d-none");
      modalRegister.classList.add("d-none");
      modalRecoverPass.classList.add("d-none");
  
      inputUserLogin.focus();
    });
  }

  toggleBtnRecoverPass.addEventListener("click", (e) => {
    e.preventDefault();
    modalRecoverPass.classList.remove("d-none");
    modalLogin.classList.add("d-none");
    modalRegister.classList.add("d-none");

    inputUserRecover.focus();
  });

  // Add click event listener for show/hide password
  for (const btn of btnShowPassword) {
    btn.addEventListener("click", (e) => {

      e.preventDefault();

      //toggle type of input to show/hide password
      if (btn.classList.contains("bx-low-vision")) {
        //change icon
        btn.classList.add("bxs-low-vision");
        btn.classList.remove("bx-low-vision");
        //change type of input
        btn.previousElementSibling.type= "text";
        btn.previousElementSibling.focus();
      } else {
        //change icon
        btn.classList.remove("bxs-low-vision");
        btn.classList.add("bx-low-vision");
        //change type of input
        btn.previousElementSibling.type= "password";
        btn.previousElementSibling.focus();
      }
    });
  }
}



// Open account modal when account icon is clicked
btnAccount.addEventListener("click", () => {
  accountModal(accountTemplate);
  
  // Include validations for login and register forms
  validationLoginRegister();
});


//■■■■■ Shop modal ■■■■■

btnShop.addEventListener("click", () => {
    const shopTemplate = 
    `<h4> Pagina en construcción </h4>
    <img src="assets/resources/img/Logo_Oshare.jpg" style="max-width:100%; max-height:100%; border: solid 1px var(--border-color); border-radius:15px;" alt="">`
    openModal(shopTemplate);
});




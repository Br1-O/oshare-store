import { fetchData } from "../utils/fetch.js";
import { accountTemplate, accountModal } from "../modals/account.js";

export const validationLoginRegister = () => {

  //login form
    const formLogin = document.querySelector('#modalLogin form');
    const btnLogin = document.getElementById('btnLogin');
  //login input fields
    const emailLogin = document.querySelector('#modalLogin [name="email"]');
    const passwordLogin = document.querySelector('#modalLogin [name="password"]');
  //login error messages
    const emailLoginErrorMessage = document.getElementById('errorEmailLogin');
    const passwordLoginErrorMessage = document.getElementById('errorPasswordLogin');

  //register form
    const formRegister = document.querySelector('#modalRegister form');
    const btnRegister = document.getElementById('btnRegister');
  //register input fields
    const emailRegister = document.querySelector('#modalRegister [name="email"]');
    const emailConfirmRegister = document.querySelector('#modalRegister [name="emailConfirm"]');
    const passwordRegister = document.querySelector('#modalRegister [name="password"]');
    const passwordConfirmRegister = document.querySelector('#modalRegister [name="passwordConfirm"]');
  //register error messages
    const EmailRegisterErrorMessage = document.getElementById('errorEmailRegister');
    const EmailConfirmRegisterErrorMessage = document.getElementById('errorEmailConfirmRegister');
    const PasswordRegisterErrorMessage = document.getElementById('errorPasswordRegister');
    const PasswordConfirmRegisterErrorMessage = document.getElementById('errorPasswordConfirmRegister');

  //recover password form
    const formRecover = document.querySelector('#modalRecoverPass form');
  //recover password input fields
    const emailRecover = document.querySelector('#modalRecoverPass [name="email"]');
  //register error messages
    const emailRecoverErrorMessage = document.getElementById('errorEmailRecoverPass');

  //all error fields
    const errorMessages = document.getElementsByClassName('error');

  //regex
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexPassword = /^(?=.*[0-9])(?=.*[.,*_\-+?¡!¿])(?=.*[A-Z]).{8,}$/;
    const regexLength10 = /^.{10,}$/;
    const regexLength8 = /^.{8,}$/;


  //validation for login fields
  formLogin.addEventListener("submit", (event) => {

    //prevent submit of form
    event.preventDefault();

    //empty all previous error messages
    for (const error of errorMessages) {
      error.classList.add("d-none");
      error.innerText = "";
    }

    //check if email is empty
    if (emailLogin.value == "") {
      //display error message
      emailLoginErrorMessage.classList.remove("d-none");
      emailLoginErrorMessage.innerText = "*este campo es obligatorio";

      emailLogin.focus();
    }
    //check if email has minimum length
    else if(!regexLength10.test(emailLogin.value)){
      //display error message
      emailLoginErrorMessage.classList.remove("d-none");
      emailLoginErrorMessage.innerText = "*el correo es demasiado corto";

      emailLogin.focus();
    }
    //check if email is valid
    else if(!regexEmail.test(emailLogin.value)){
      //display error message
      emailLoginErrorMessage.classList.remove("d-none");
      emailLoginErrorMessage.innerText = "*el correo debe ser válido";

      emailLogin.focus();
    }
    //check if password is empty
    else if(passwordLogin.value == "") {
      //display error message
      passwordLoginErrorMessage.classList.remove("d-none");
      passwordLoginErrorMessage.innerText = "*este campo es obligatorio";

      passwordLogin.focus();
    }
    //check if password has minimum length
    else if(!regexLength8.test(passwordLogin.value)){
      //display error message
      passwordLoginErrorMessage.classList.remove("d-none");
      passwordLoginErrorMessage.innerText = "*la contraseña debe tener al menos 8 caracteres";

      passwordLogin.focus();
    }
    //check if password is valid
    else if(!regexPassword.test(passwordLogin.value)){
    //display error message
    passwordLoginErrorMessage.classList.remove("d-none");
    passwordLoginErrorMessage.innerText = "*la contraseña debe contener al menos un número, una mayuscula y un simbolo (*.,¡!¿?-_+)";

    passwordLogin.focus();
    }
    //submit login petition if all fields are valid
    else{

      //input data
      let email = emailLogin.value;
      let hashedPassword = CryptoJS.SHA256(passwordLogin.value).toString(CryptoJS.enc.Hex);

      let data = {
        email: email,
        password: hashedPassword
      }

      //verification to dummy data (later will be switched for fetch function to backend db)
      let getUsers = async () => {
        let validUser = false;
        let users = await fetchData("assets/js/json/users.json", "users");

        users.forEach(user => {

          if (user.email === email) {
            validUser = true;
            if (user.password === hashedPassword) {
              alert("¡Login exitoso, "+ user.name + "!");
            } else {
              //display error message
              emailLoginErrorMessage.classList.remove("d-none");
              emailLoginErrorMessage.innerText = "¡Usuario o contraseña incorrectos!";

              emailLogin.focus();
            }
          }
        });

        if (!validUser) {
          //display error message
          emailLoginErrorMessage.classList.remove("d-none");
          emailLoginErrorMessage.innerText = "¡Usuario o contraseña incorrectos!";

          emailLogin.focus();
        }
      }

      getUsers();

    }
  });
  
  //validation for register fields
  formRegister.addEventListener("submit", (event) => {
        
    //prevent submit of form
    event.preventDefault();

    //empty all previous error messages
    for (const error of errorMessages) {
      error.classList.add("d-none");
      error.innerText = "";
    }

    //check if email is empty
    if (emailRegister.value == "") {
      //display error message
      EmailRegisterErrorMessage.classList.remove("d-none");
      EmailRegisterErrorMessage.innerText = "*este campo es obligatorio";

      emailRegister.focus();
    }
    //check if email has minimum length
    else if(!regexLength10.test(emailRegister.value)){
      //display error message
      EmailRegisterErrorMessage.classList.remove("d-none");
      EmailRegisterErrorMessage.innerText = "*el correo es demasiado corto";
      
      emailRegister.focus();
    }
    //check if email is valid
    else if(!regexEmail.test(emailRegister.value)){
      //display error message
      EmailRegisterErrorMessage.classList.remove("d-none");
      EmailRegisterErrorMessage.innerText = "*el correo debe ser válido";
      
      emailRegister.focus();
    }
    //check if email is equal to confirm email
    else if(emailRegister.value != emailConfirmRegister.value){
      //display error message
      EmailConfirmRegisterErrorMessage.classList.remove("d-none");
      EmailConfirmRegisterErrorMessage.innerText = "*los correos deben coincidir";
      
      emailConfirmRegister.focus();
    }
    //check if password is empty
    else if(passwordRegister.value == "") {
      //display error message
      PasswordRegisterErrorMessage.classList.remove("d-none");
      PasswordRegisterErrorMessage.innerText = "*este campo es obligatorio";

      passwordRegister.focus();
    }
    //check if password has minimum length
    else if(!regexLength8.test(passwordRegister.value)){
      //display error message
      PasswordRegisterErrorMessage.classList.remove("d-none");
      PasswordRegisterErrorMessage.innerText = "*la contraseña debe tener al menos 8 caracteres";

      passwordRegister.focus();
    }
    //check if password is valid
    else if(!regexPassword.test(passwordRegister.value)){
    //display error message
    PasswordRegisterErrorMessage.classList.remove("d-none");
    PasswordRegisterErrorMessage.innerText = "*la contraseña debe contener al menos un número, una mayuscula y un simbolo (*.,¡!¿?-_+)";

    passwordRegister.focus();
    }
    //check if password and password confirm are equal
    else if(passwordRegister.value != passwordConfirmRegister.value){
      PasswordConfirmRegisterErrorMessage.classList.remove("d-none");
      PasswordConfirmRegisterErrorMessage.innerText = "*las contraseñas deben coincidir";

      passwordConfirmRegister.focus();
    }
    //submit register petition if all fields are valid
    else{
      //input data
      let email = emailRegister.value;
      let hashedPassword = CryptoJS.SHA256(passwordRegister.value).toString(CryptoJS.enc.Hex);

      let data = {
        email: email,
        password: hashedPassword
      }

      let validUser = true;

      //verification to dummy data (later will be switched for fetch function to backend db)
      let checkUsers = async () => {
        let users = await fetchData("assets/js/json/users.json", "users");

        users.forEach(user => {
          //check if email is already registered
          if (user.email == emailRegister.value) {
            validUser = false;
          }
        });

        //if register input is valid
        if (validUser) {
          //display message
          alert("¡Registro exitoso con el correo: " + email + " !");
          //reset register fields value
          formRegister.reset();
          //switch to login modal
          accountModal(accountTemplate);
        }else{
          //display message
          EmailRegisterErrorMessage.classList.remove("d-none");
          EmailRegisterErrorMessage.innerText= "¡Este correo ya está registrado!";

          emailRegister.focus();
        }
      }

      checkUsers();
    }
  });

  //validation for recover password field
  formRecover.addEventListener("submit", (event) => {

    //prevent submit of form
    event.preventDefault();

    //empty all previous error messages
    for (const error of errorMessages) {
      error.classList.add("d-none");
      error.innerText = "";
    }

    //check if email is empty
    if (emailRecover.value == "") {
      //display error message
      emailRecoverErrorMessage.classList.remove("d-none");
      emailRecoverErrorMessage.innerText = "*debe ingresar un correo";

      emailRecover.focus();
    }
    //check if email has minimum length
    else if(!regexLength10.test(emailRecover.value)){
      //display error message
      emailRecoverErrorMessage.classList.remove("d-none");
      emailRecoverErrorMessage.innerText = "*el correo es demasiado corto";

      emailRecover.focus();
    }
    //check if email is valid
    else if(!regexEmail.test(emailRecover.value)){
      //display error message
      emailRecoverErrorMessage.classList.remove("d-none");
      emailRecoverErrorMessage.innerText = "*el correo debe ser válido";

      emailRecover.focus();
    }else{
      //display message
      alert("¡Chequee su correo y siga las instrucciones!");
      //reset register fields value
      formRecover.reset();
      //switch to login modal
      accountModal(accountTemplate);
    }
  });
}


//dummy data from users.json w/ password for testing hash:

// "email": "john.doe@example.com",
// "password": "Password123!",
// "username": "johndoe",
// "name": "John",
// "surname": "Doe",

// "email": "jane.smith@example.com",
// "password": "SecurePass456!",
// "username": "janesmith",
// "name": "Jane",
// "surname": "Smith",

// "email": "bob.jones@example.com",
// "password": "MyPassword789!",
// "username": "bobjones",
// "name": "Bob",
// "surname": "Jones",


// "email": "alice.wilson@example.com",
// "password": "AlicePass123!",
// "username": "alicewilson",
// "name": "Alice",
// "surname": "Wilson",

// "email": "charlie.brown@example.com",
// "password": "Charlie123!",
// "username": "charliebrown",
// "name": "Charlie",
// "surname": "Brown",

// "email": "bruce.wayne@example.com",
// "password": "Batman123!",
// "username": "brucewayne",
// "name": "Bruce",
// "surname": "Wayne",

// "email": "clark.kent@example.com",
// "password": "Superman123!",
// "username": "clarkkent",
// "name": "Clark",
// "surname": "Kent",

// "email": "barbara.gordon@example.com",
// "password": "Batgirl123!",
// "username": "barbaragordon",
// "name": "Barbara",
// "surname": "Gordon",

// "email": "peter.parker@example.com",
// "password": "Spiderman123!",
// "username": "peterparker",
// "name": "Peter",
// "surname": "Parker",

// "email": "dorothy.gale@example.com",
// "password": "YellowBrickRoad!",
// "username": "dorothygale",
// "name": "Dorothy",
// "surname": "Gale",

// "email": "harry.potter@example.com",
// "password": "Hogwarts123!",
// "username": "harrypotter",
// "name": "Harry",
// "surname": "Potter",

// "email": "hermione.granger@example.com",
// "password": "WitchCraft123!",
// "username": "hermionegranger",
// "name": "Hermione",
// "surname": "Granger",

// "email": "ron.weasley@example.com",
// "password": "GingerWizard123!",
// "username": "ronweasley",
// "name": "Ron",
// "surname": "Weasley",

// "email": "albus.dumbledore@example.com",
// "password": "Headmaster123!",
// "username": "albusdumbledore",
// "name": "Albus",
// "surname": "Dumbledore",

// "email": "gandalf@example.com",
// "password": "YouShallNotPass123!",
// "username": "gandalf",
// "name": "Gandalf",
// "surname": "The Grey",

// "email": "bilbo.baggins@example.com",
// "password": "TheHobbit123!",
// "username": "bilbobaggins",
// "name": "Bilbo",
// "surname": "Baggins",

// "email": "aragorn@example.com",
// "password": "Strider123!",
// "username": "aragorn",
// "name": "Aragorn",
// "surname": "Son of Arathorn",

// "email": "legolas@example.com",
// "password": "Greenleaf123!",
// "username": "legolas",
// "name": "Legolas",
// "surname": "";

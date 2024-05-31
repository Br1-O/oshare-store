import { fetchData } from "../utils/fetch.js";
import { accountTemplate, accountModal } from "../modals/account.js";
import { setSessionData } from "../utils/sessionStorage.js";
import { redirectToPage } from "../utils/redirectToPage.js";
import { userData } from "../models/user.js";
import { updateContent } from "../routing/routing.js";
import { closeModal } from "../modals/utils.js";
import { areValuesEqual, emailValidation, passwordValidation } from "./utils.js";
import { getLocalData, searchInLocalStorage, setLocalData } from "../utils/localStorage.js";

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

  //validation for login fields and implementation for login
  formLogin.addEventListener("submit", (event) => {

    //prevent submit of form
    event.preventDefault();

    //empty all previous error messages
    for (const error of errorMessages) {
      error.classList.add("d-none");
      error.innerText = "";
    }

    let isEmailValid = emailValidation(emailLogin, emailLoginErrorMessage);
    let isPasswordValid = false;

    if (isEmailValid) {
      isPasswordValid = passwordValidation(passwordLogin, passwordLoginErrorMessage);
    }

    //submit login petition if all fields are valid
    if(isEmailValid && isPasswordValid){

      //input data
      let email = emailLogin.value;
      let hashedPassword = CryptoJS.SHA256(passwordLogin.value).toString(CryptoJS.enc.Hex);

      //verification to dummy data (later will be switched for fetch function to backend db)
      let submitLogin = async () => {
        let validUser = false;

        //check if oshare_designs object already exists in localstorage
        let oshareLocal = searchInLocalStorage("oshare_designs");

        //if it exist
        if (oshareLocal) {

          //parse the JSON into a Js object
          oshareLocal = JSON.parse(oshareLocal);

          //iterate through users in the object
          oshareLocal.users.forEach(user => {
            //check if email exists
            if (user.email == email) {

              validUser = true;

              //check if passwords match
              if (user.key === hashedPassword) {
  
                //set session object
                let sessionData = {
                  "name" : user.name,
                  "surname" : user.surname,
                  "email" : user.email,
                  "picture" : user.profileImage,
                  "cart" : user.cart
                }
  
                //set user object
                userData.name = user.name;
                userData.surname = user.surname;
                userData.email = user.email;
                userData.picture = user.profileImage;
                userData.cart = [1, 2, 1, 1, 1, 2];
  
                //change session state
                userData.isSessionSet = true;
  
                //set session data
                setSessionData("user", JSON.stringify(sessionData));
  
                //reset form fields values
                formRegister.reset();
                formLogin.reset();
                formRecover.reset();
                    
                //close modal window
                closeModal();
  
                //redirect to logged page
                redirectToPage((window.location.hash).slice(1), 0);
  
                //update content based on change of session state
                updateContent();
  
              } else {
                //display error message
                emailLoginErrorMessage.classList.remove("d-none");
                emailLoginErrorMessage.innerText = "¡Usuario o contraseña incorrectos!";
  
                emailLogin.focus();
              }
            }
          });
        }

        if (!validUser) {
          //display error message
          emailLoginErrorMessage.classList.remove("d-none");
          emailLoginErrorMessage.innerText = "¡Usuario o contraseña incorrectos!";

          emailLogin.focus();
        }
      }

      submitLogin();
    }
  });
  
  //validation for register fields and implementation for register
  formRegister.addEventListener("submit", (event) => {
        
    //prevent submit of form
    event.preventDefault();

    //empty all previous error messages
    for (const error of errorMessages) {
      error.classList.add("d-none");
      error.innerText = "";
    }

    let isEmailValid = emailValidation(emailRegister, EmailRegisterErrorMessage);
    let areEmailsEqual = false;
    let isPasswordValid = false;
    let arePasswordsEqual = false;

    if (isEmailValid) {
      areEmailsEqual = areValuesEqual(emailRegister, emailConfirmRegister, EmailConfirmRegisterErrorMessage, "*los correos deben coincidir");
    }

    if (isEmailValid && areEmailsEqual) {
      isPasswordValid = passwordValidation(passwordRegister, PasswordRegisterErrorMessage);
    }

    if (isEmailValid && areEmailsEqual && isPasswordValid) {
      arePasswordsEqual = areValuesEqual(passwordRegister, passwordConfirmRegister, PasswordConfirmRegisterErrorMessage, "*las contraseñas deben coincidir");
    }

    //submit register petition if all fields are valid
    if(isEmailValid && areEmailsEqual && isPasswordValid && arePasswordsEqual){
      //input data
      let email = emailRegister.value;
      let hashedPassword = CryptoJS.SHA256(passwordRegister.value).toString(CryptoJS.enc.Hex);

      let validUser = true;

      //verification to dummy data (later will be switched for fetch function to backend db)
      let submitRegister = async () => {

        //check if oshare_designs object is already in localstorage
        let oshareLocal = searchInLocalStorage("oshare_designs");

        //If not create empty object
        if (!oshareLocal) {

          let oshareLocalObject = 
          {
            users: [],
            preferences: []
          }

          //set empty object into localstorage
          setLocalData("oshare_designs", JSON.stringify(oshareLocalObject));

          //get empty object from localstorage
          oshareLocal = getLocalData("oshare_designs");
        }

        //parse the JSON into Js object
        oshareLocal = JSON.parse(oshareLocal);

        //iterate through users store in the object
        oshareLocal.users.forEach(user => {
          //check if email is already registered
          if (user.email == emailRegister.value) {
            validUser = false;
          }
        });

        //if register input is valid
        if (validUser) {

          //display message
          alert("¡Registro exitoso con el correo: " + email + " !");

          //reset form fields values
          formRegister.reset();
          formLogin.reset();
          formRecover.reset();

          //close modal window
          closeModal();

          //set user object for localStorage
          let user = {
            "name" : "",
            "surname" : "",
            "email" : email,
            "key" : hashedPassword,
            "profileImage" : "",
            "cart" : []
          }

          //add user to oshareLocal's users
          oshareLocal.users.push(user);
          //set localStorage data
          setLocalData("oshare_designs", JSON.stringify(oshareLocal));

          //set data to user object
          userData.email = email;

          
          //set session object for sessionStorage
          let sessionData = {
            "name" : "",
            "surname" : "",
            "email" : email,
            "picture" : "",
            "cart" : []
          }

          //change session state
          userData.isSessionSet = true;
          //set session data
          setSessionData("user", JSON.stringify(sessionData));

          //redirect to logged page
          redirectToPage((window.location.hash).slice(1), 0);

          //update content based on change of session state
          updateContent();

        }else{
          //display message
          EmailRegisterErrorMessage.classList.remove("d-none");
          EmailRegisterErrorMessage.innerText= "¡Este correo ya está registrado!";

          emailRegister.focus();
        }
      }

      submitRegister();
    }
  });

  //validation for recover password field and implementation for recover
  formRecover.addEventListener("submit", (event) => {

    //prevent submit of form
    event.preventDefault();

    //empty all previous error messages
    for (const error of errorMessages) {
      error.classList.add("d-none");
      error.innerText = "";
    }

    //check email
      if(emailValidation(emailRecover, emailRecoverErrorMessage)){
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

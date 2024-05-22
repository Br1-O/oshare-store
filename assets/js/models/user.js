let isSessionSet = sessionStorage.getItem("user") ? true : false;

export let userData = {

    //state for session
    isSessionSet : isSessionSet,

    //most used attributes
    name : "",
    surname : "",
    email : "",
    picture : "",
    cart : []
}
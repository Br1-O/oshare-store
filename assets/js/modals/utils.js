//■■■■■ ChangeContent-Open-Close dialog window ■■■■■

//body
export const pageContent = document.getElementById("page-content");

//modal
export const modal = document.querySelector("dialog");
export const modalContent = document.getElementById("modal-content");

//close modal btn
export const btnCloseModal = document.getElementById("btn-modal-close");

//change content modal
export const changeModal = (template) => {
    modalContent.innerHTML = template;
};

export const openModal = (template = "") => {
    //potential issue
    template && changeModal(template); 
    
    modal.setAttribute("open", "");
    pageContent.classList.add("overlay");
};

export const closeModal = () => {
        changeModal("");
        modal.removeAttribute("open");
        pageContent.classList.remove("overlay");
};

//btn close modal
btnCloseModal.addEventListener("click", () => {
    closeModal();
});

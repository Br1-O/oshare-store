import { openModal } from "./utils.js";

//■■■■■ Shop modal ■■■■■

export const setEventListenerModalShop = (btnShop) => {
    btnShop.addEventListener("click", () => {
        const shopTemplate = 
        `<h4> Pagina en construcción </h4>
        <img src="assets/resources/img/Logo_Oshare.jpg" style="max-width:100%; max-height:100%; border: solid 1px var(--border-color); border-radius:15px;" alt="">`
        openModal(shopTemplate);
    });
}



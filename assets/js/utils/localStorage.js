export const setLocalData = (key, value) => {
    localStorage.setItem(key, value);
}

export const getLocalData = (key) => {
    return localStorage.getItem(key);
}

export const freeLocalData = (key) => {
    localStorage.removeItem(key);
}

export const searchInLocalStorage = (searchKey) => {
    
    for (let index = 0; index < localStorage.length; index++) {

        if (localStorage.key(index) === searchKey){
            return localStorage.getItem(searchKey);
        }
    }

    return null;
}
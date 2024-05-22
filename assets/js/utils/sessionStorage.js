export const setSessionData = (key, value) => {
    sessionStorage.setItem(key, value);
}

export const getSessionData = (key) => {
    sessionStorage.getItem(key);
}

export const freeSessionData = (key) => {
    sessionStorage.removeItem(key);
}
import Cookies from "universal-cookie"

export const setCookie = (name, value) => {
    const cookies = new Cookies();
    cookies.set(name, value, { path: '/' })
}

export const getCookie = (name) => {
    const cookies = new Cookies();
    return cookies.get(name)
}
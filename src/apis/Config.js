import axios from "axios";
import { getCookie } from "../utilities/Cookie";

axios.defaults.baseURL = 'https://fwa-ec-quiz.herokuapp.com';


axios.interceptors.request.use((req) => {
    req.headers = {
        ...req.headers,
        Authorization: `Bearer ${getCookie('tokenuser')}`,
    }
    return req
}, function (error) {
    return Promise.reject(error)
})
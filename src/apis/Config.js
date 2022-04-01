import axios from "axios";
import { getCookie, setCookie } from "../utilities/Cookie";
import { refreshToken } from "./Auth";

axios.defaults.baseURL = 'https://fwa-ec-quiz.herokuapp.com';


axios.interceptors.request.use(async (req) => {
    const expires = Number(new Date(getCookie("expires")));
    const current = Number(new Date());

    if (expires <= current) {
        await refreshToken(getCookie("refreshuser"))
            .then((res) => {
                console.log(res);
                setCookie("tokenuser", res.data.access.token);
                setCookie("expires", res.data.access.expires);
                setCookie("refreshuser", res.data.refresh.token);
                req.headers = {
                    ...req.headers,
                    Authorization: `Bearer ${res.data.access.token}`,
                };

                return req;
            })
            .catch((err) => console.log(err));
    }


    req.headers = {
        ...req.headers,
        Authorization: `Bearer ${getCookie('tokenuser')}`,
    }
    return req
}, function (error) {
    return Promise.reject(error)
})
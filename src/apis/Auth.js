import axios from "axios";

export const authLogin = async (user) => {
    try {
        const res = await axios.post(`/v1/auth/login`, user)
        return {
            success: true,
            data: res.data
        };
    } catch (error) {
        return {
            success: false,
            data: error.response.data.message
        }
    }
}

export const authRegister = async (user) => {
    try {
        const res = await axios.post(`/v1/auth/register`, user)
        return {
            success: true,
            data: res.data
        };
    } catch (error) {
        return {
            success: false,
            data: error.response.data.message
        }
    }
}
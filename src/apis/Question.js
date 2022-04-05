import axios from "axios";

export const getQuestionUsers = async (limit) => {
    try {
        const res = await axios.get(`/v1/questions?limit=${limit}`)
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

export const submitAnswers = async (listAns) => {
    try {
        const res = await axios.post(`/v1/questions/submit`, listAns)
        return {
            success: true,
            data: res.data
        };
    } catch (error) {
        console.error(error.response.data.message);
        return {
            success: false,
            data: error.response.data.message
        }
    }
}

export const getQuestionAdmin = async (page) => {
    try {
        const res = await axios.get(`/v1/questions/edit?page=${page}`)
        return {
            success: true,
            data: res.data
        };
    } catch (error) {
        console.error(error.response.data.message);
        return {
            success: false,
            data: error.response.data.message
        }
    }
}

export const deleteQuestionById = async (id) => {
    try {
        const res = await axios.delete(`v1/questions/edit/${id}`)
        return {
            success: true,
            data: res.data
        };
    } catch (error) {
        console.error(error.response.data.message);
        return {
            success: false,
            data: error.response.data.message
        }
    }
}

export const createQuestion = async (question) => {
    try {
        const res = await axios.post(`v1/questions/edit`,question)
        return {
            success: true,
            data: res.data
        };
    } catch (error) {
        console.error(error.response.data.message);
        return {
            success: false,
            data: error.response.data.message
        }
    }
}

export const getQuestionById = async (id) => {
    try {
        const res = await axios.get(`v1/questions/edit/${id}`)
        return {
            success: true,
            data: res.data
        };
    } catch (error) {
        console.error(error.response.data.message);
        return {
            success: false,
            data: error.response.data.message
        }
    }
}

export const updateQuestion = async (question,id) => {
    try {
        const res = await axios.patch(`v1/questions/edit/${id}`,question)
        return {
            success: true,
            data: res.data
        };
    } catch (error) {
        console.error(error.response.data.message);
        return {
            success: false,
            data: error.response.data.message
        }
    }
}
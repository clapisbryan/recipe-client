import axios from 'axios';

const API_URL = "http://localhost:3001/auth"

export const register = async (payload) => {
    try {
        const { data } = await axios.post(`${API_URL}/register`, {
            username: payload.username,
            password: payload.password
        })
        return data;
    } catch (error) {
        console.error(error)
    }
}

export const login = async (payload) => {
    try {
        const { data } = await axios.post(`${API_URL}/login`, {
            username: payload.username,
            password: payload.password
        })
        return data;
    } catch (error) {
        console.error(error)
    }
}
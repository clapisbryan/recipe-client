import axios from "axios";
import { useCookies } from "react-cookie"

const API_URL = `${import.meta.env.VITE_URL}/recipes`


export const getRecipe = async () => {
    try {
        const { data } = await axios.get(`${API_URL}`);
        return data
    } catch (error) {
        console.error(error);
    }
}
export const getRecipeByUserID = async (userID, cookies) => {
    try {
        const { data } = await axios.get(`${API_URL}/saved-recipe/ids/${userID}`, {
            headers: {
                Authorization: cookies.access_token
            }
        });
        return data
    } catch (error) {
        console.error(error);
    }
}

export const getSavedRecipeByUserId = async (userID, cookies) => {
    try {
        const { data } = await axios.get(`${API_URL}/saved-recipe/${userID}`, {
            headers: {
                Authorization: cookies.access_token
            }
        });
        return data
    } catch (error) {
        console.error(error);
    }
}

export const createRecipe = async (recipe, cookies) => {
    try {
        const { data } = await axios.post(`${API_URL}/create-recipe`, recipe, {
            headers: {
                Authorization: cookies.access_token
            }
        });
        return data
    } catch (error) {
        console.error(error);
    }
}

export const putRecipeById = async (payload) => {
    try {
        const { data } = await axios.put(`${API_URL}`, {
            recipeID: payload.recipeID,
            userID: payload.userID,
        }, {
            headers: {
                Authorization: payload.cookies.access_token
            }
        });
        return data
    } catch (error) {
        console.error(error);
    }
}

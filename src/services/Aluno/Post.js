import { Constants } from "expo-constants"
import { API_URL } from "../constants"

export const postLogin = async (encoded) => {
    return fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Authorization': `Basic ${encoded}`
        }
    })
}
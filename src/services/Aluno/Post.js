
export const postLogin = async (encoded) => {
    return fetch(`${process.env.API_URL}/login`, {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Authorization': `Basic ${encoded}`
        }
    })
}
import axios from "axios"


const base = import.meta.env.VITE_API_BASE_URL;

const loginAPI = async (username: string, password: string) => {
    const url = base + "/api/login"
    return await axios.post(url, { username, password })
}

const getUserAPI = async (accessToken: string) => {
    const url = base + "/api/account"
    return await axios.get(url, { headers: { Authorization: `Bearer ${accessToken}` } })


}
const getUsersAPI = async (accessToken: string) => {
    const url = base + "/api/users"
    return await axios.get(url, { headers: { Authorization: `Bearer ${accessToken}` } })
}

const getProductsAPI = async () => {
    const url = base + "/api/products"
    return await axios.get(url)
}

export { loginAPI, getUserAPI, getUsersAPI, getProductsAPI }
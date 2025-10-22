import axios from "axios"
import qs from "qs"

const base = import.meta.env.VITE_API_BASE_URL;

const registerAPI = async (name: string, username: string, email: string, password: string, confirmPassword: string) => {
    const url = base + "/api/register"
    return await axios.post(url, { name, username, email, password, confirmPassword })
}
const loginAPI = async (username: string, password: string) => {
    const url = base + "/api/login"
    return await axios.post(url, { username, password })
}

const logoutAPI = async () => {
    const url = base + "/api/logout"
    return await axios.post(url)
}

const getUserAPI = async (accessToken: string) => {
    const url = base + "/api/account"
    return await axios.get(url, { headers: { Authorization: `Bearer ${accessToken}` } })


}
const getUsersAPI = async (accessToken: string) => {
    const url = base + "/api/users"
    return await axios.get(url, { headers: { Authorization: `Bearer ${accessToken}` } })
}

const getProductsAPI = async (page: number, pageSize: number, inStockOnly: boolean, brands?: string[], targets?: string[], priceRange?: [number, number], sort?: string) => {
    console.log(import.meta.env.MODE);
    let url = base + "/api/products"
    return await axios.get(url, {
        params: { page, pageSize, brands, targets, priceRange, inStockOnly, sort },
        paramsSerializer: params => qs.stringify(params, { arrayFormat: "repeat" })
    })
}

const getProductAPI = async (id: number) => {
    let url = base + `/api/products/${id}`
    console.log(import.meta.env.MODE);
    return await axios.get(url)
}

export { loginAPI, getProductAPI, getUserAPI, getUsersAPI, getProductsAPI, registerAPI, logoutAPI }
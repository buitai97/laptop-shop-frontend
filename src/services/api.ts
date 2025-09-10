import axios from "axios"

const loginAPI = async (username: string, password: string) => {
    const url = "http://localhost:5000/api/login"
    return await axios.post(url, { username, password })
}

const getUserAPI = async (accessToken: string) => {
    const url = "http://localhost:5000/api/account"
    return await axios.get(url, { headers: { Authorization: `Bearer ${accessToken}` } })
    
    
}


export { loginAPI, getUserAPI }
import { Outlet } from "react-router"
import AppHeader from "./components/layout/app.header"
import { useEffect } from "react"
import { useAppContext } from "./context/app.provider"
import { getUserAPI } from "./services/api"

const Layout = () => {
    const { setUser } = useAppContext()

    useEffect(() => {
        const initUser = async () => {
            const accessToken = localStorage.getItem("accessToken")
            if (accessToken) {
                const res = await getUserAPI(accessToken)
                const user = res?.data?.data?.user
                if (user) {
                    setUser({ isAuthenticated: true, id: user.id, username: user.username, name: user.name })
                    console.log(user)
                }
            }
        }
        initUser()
    }, [])
    return (
        <>
            <AppHeader />
            <Outlet />
        </>
    )
}

export default Layout

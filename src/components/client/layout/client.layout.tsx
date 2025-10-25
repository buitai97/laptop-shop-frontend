import { Outlet } from "react-router"
import { useEffect } from "react"
import { useAppContext } from "@context/app.provider"
import { Spin } from "antd"
import ClientFooter from "./client.footer"
import ClientHeader from "./client.header"
import { fetchAccountAPI } from "@/services/api"

const ClientLayout = () => {
    const { setUser, isPageLoading, setIsPageLoading, setIsAuthenticated } = useAppContext()
    useEffect(() => {
        const initUser = async () => {
            setIsPageLoading(true)
            const accessToken = localStorage.getItem("accessToken")
            if (accessToken) {
                const res = await fetchAccountAPI()
                const user = res?.data?.data?.user
                if (user) {
                    setUser({ id: user.id, username: user.username, name: user.name, email: user.email, avatar: user.avatar, role: user.role })
                    setIsAuthenticated(true)
                }
            }
            setIsPageLoading(false)
        }
        initUser()
    }, [])
    return (
        <>
            {isPageLoading === false ? (
                <>
                    <div className="page">
                        <div className="app-header">
                            <ClientHeader />
                        </div>
                        <div className="app-content">
                            <Outlet />
                        </div>
                        <div className="app-footer">
                            <ClientFooter />
                        </div>
                    </div>

                </>

            ) :
                <div>
                    <Spin size="large" className="spin" />
                </div>
            }
        </>
    )
}

export default ClientLayout

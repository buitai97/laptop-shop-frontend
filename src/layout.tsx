import { Outlet } from "react-router"
import AppHeader from "./components/layout/app.header"
import { useEffect } from "react"
import { useAppContext } from "./context/app.provider"
import { getUserAPI } from "./services/api"
import { Spin } from "antd"
import AppFooter from "./components/layout/app.footer"

const Layout = () => {
    const { setUser, isPageLoading, setIsPageLoading } = useAppContext()
    useEffect(() => {
        const initUser = async () => {
            setIsPageLoading(true)
            const accessToken = localStorage.getItem("accessToken")
            if (accessToken) {
                const res = await getUserAPI(accessToken)
                const user = res?.data?.data?.user
                if (user) {
                    setUser({ isAuthenticated: true, id: user.id, username: user.username, name: user.name })
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
                            <AppHeader />
                        </div>
                        <div className="app-content">
                            <Outlet />
                        </div>
                        <div className="app-footer">
                            <AppFooter />
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

export default Layout

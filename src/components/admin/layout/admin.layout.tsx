import { Outlet } from "react-router"
import AdminHeader from "@/components/admin/layout/admin.header"
import { useEffect } from "react"
import { useAppContext } from "@context/app.provider"
import { getUserAPI } from "@services/api"
import { Spin } from "antd"
import AdminFooter from "@/components/admin/layout/admin.footer"

const Layout = () => {
    const { setUser, isPageLoading, setIsPageLoading, setIsAuthenticated } = useAppContext()
    useEffect(() => {
        const initUser = async () => {
            setIsPageLoading(true)
            const accessToken = localStorage.getItem("accessToken")
            if (accessToken) {
                const res = await getUserAPI(accessToken)
                const user = res?.data?.data?.user
                if (user) {
                    setUser({ id: user.id, username: user.username, name: user.name })
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
                            <AdminHeader />
                        </div>
                        <div className="app-content">
                            <Outlet />
                        </div>
                        <div className="app-footer">
                            <AdminFooter />
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

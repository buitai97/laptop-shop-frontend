import { MenuOutlined } from "@ant-design/icons";
import { Dropdown, Layout, Space, type MenuProps } from "antd";
import { useAppContext } from "@/context/app.provider";
import { Link, useNavigate } from "react-router";

const { Header } = Layout;


const ClientHeader = () => {
    const { user, setUser, setIsAuthenticated } = useAppContext()
    const navigate = useNavigate()
    const handleLogout = async () => {
        setUser(null);
        setIsAuthenticated(false)
        localStorage.removeItem('accessToken')
        navigate("/login")
    }

    const items: MenuProps['items'] = [
        {
            label: (
                <a href="/" rel="noopener noreferrer">
                    Home
                </a>
            ),
            key: '1',
        },
        {
            label: (
                <a href="/products" rel="noopener noreferrer">
                    Products
                </a>
            ),
            key: '2',
        }
        ,
        {
            label: (
                <a onClick={handleLogout} rel="noopener noreferrer">
                    Log Out
                </a>
            ),
            key: '3',
        }
        ,
    ];

    return (
        <Header className="flex !items-center !justify-between !bg-white shadow">

            <div className="text-xl font-bold text-cyan-900 cursor-pointer" onClick={() => { navigate("/") }}>Tech Store</div>
            <div className="">
                <div>
                    <Link to="/" className="text-gray-500!">Home</Link>
                    <Link to="/products" className="p-5 text-gray-500!">Products</Link>
                </div>
            </div>


            {user ? (

                <Dropdown
                    menu={{ items }}
                    trigger={['click']}
                    className="cursor-pointer"
                >
                    <Space>
                        <MenuOutlined />
                    </Space>
                </Dropdown>
            ) :
                <Link to="/login">Login</Link>
            }
        </Header>
    )

};
export default ClientHeader
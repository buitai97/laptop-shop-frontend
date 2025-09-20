import { MenuOutlined } from "@ant-design/icons";
import { Dropdown, Layout, Menu, Space, type MenuProps } from "antd";

const { Header } = Layout;

const ClientHeader = () => {
    const items: MenuProps['items'] = [
        {
            label: (
                <a href="/" rel="noopener noreferrer">
                    Home
                </a>
            ),
            key: '0',
        },
        {
            label: (
                <a href="/products"  rel="noopener noreferrer">
                    Products
                </a>
            ),
            key: '1',
        },
        {
            label: <a href="/login" rel="noopener noreferrer">
                Login
            </a>,
            key: '2',
        },
    ];

    return (
        <Header className="flex !items-center !justify-between !bg-white shadow">

            <div className="text-xl font-bold text-cyan-900">Tech Store</div>
            <Menu
                mode="horizontal"
                className="!hidden md:block!  ml-auto min-w-0"
                items={items}
                style={{ minWidth: "230px" }}
            />

            <Dropdown className="md:hidden" menu={{ items }} trigger={['click']}>
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        <MenuOutlined />
                    </Space>
                </a>
            </Dropdown>
        </Header>
    )

};
export default ClientHeader
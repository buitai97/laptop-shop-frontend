import { useState } from 'react';
import { HomeOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { Link, useNavigate } from 'react-router';
import { useAppContext } from '@context/app.provider';

type MenuItem = Required<MenuProps>['items'][number];


const AppHeader = () => {
    const { user, setUser } = useAppContext()
    const navigate = useNavigate()

    let items: MenuItem[] = [
        {
            label: <Link to="/">Home</Link>,
            key: 'home',
            icon: <HomeOutlined />,
        },
        {
            label: <Link to="/users">Users</Link>,
            key: 'users',
            icon: <UserOutlined />,
        },
        {
            label: 'Profile',
            key: 'Profile',
            icon: <SettingOutlined />,
            children: [
                { label: `Hello, ${user?.name ?? " "}`, key: 'greeting', disabled: true },

                {
                    label: <span >Log Out</span>,
                    key: 'logout',
                    onClick: () => {
                        localStorage.removeItem("accessToken")
                        setUser({ id: 0, isAuthenticated: false, name: "", username: "" })
                        navigate("/login")
                    }
                },
            ],
        },
    ];
    if (!user?.isAuthenticated) {
        items = [
            {
                label: <Link to="/">Home</Link>,
                key: 'home',
                icon: <HomeOutlined />,
            },
            {
                label: <Link to="/login" > Login </Link >,
                key: 'Login',
            },
        ];
    }


    const [current, setCurrent] = useState('home');

    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);
    };

    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};

export default AppHeader;
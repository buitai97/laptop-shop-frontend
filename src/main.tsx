import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Layout from './layout'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import './styles/global.css'
import User from './pages/admin/user';
import Home from './pages/admin/home';
import LoginPage from './pages/auth/login';
import { App } from 'antd';
import '@ant-design/v5-patch-for-react-19';
import AppProvider from './context/app.provider';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "users",
                element: <User />
            }
        ]
    },
    {
        path: "/login",
        element: <LoginPage />
    }
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AppProvider>
            <App>
                <RouterProvider router={router} />
            </App>
        </AppProvider>
    </StrictMode>
)

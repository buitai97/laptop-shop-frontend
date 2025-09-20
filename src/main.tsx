import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Layout from './components/admin/layout/admin.layout'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import User from '@pages/admin/user';
import Home from '@/pages/admin/home';
import ClientHomePage from '@/pages/client/home'
import LoginPage from '@pages/auth/login';
import { App } from 'antd';
import '@ant-design/v5-patch-for-react-19';
import AppProvider from '@context/app.provider';
import ClientLayout from './components/client/layout/client.layout';
import '@styles/global.scss'
import "@styles/tailwind.css";

const router = createBrowserRouter([
    {
        path: "/",
        element: <ClientLayout />,
        children: [
            {
                index: true,
                element: <ClientHomePage />
            },
            {
                path: "products",
                element: "Product Page"
            }
        ]
    },
    {
        path: "/admin",
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

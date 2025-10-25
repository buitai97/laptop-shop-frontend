import { createContext, useContext, useState } from "react";

interface IProps {
    children: React.ReactNode
}

interface IAppData {
    user?: IUser | null,
    isPageLoading: boolean,
    isAuthenticated: boolean,
    setUser: (v: IUser | null) => void,
    setIsPageLoading: (v: boolean) => void,
    setIsAuthenticated: (v: boolean) => void,

};

const AppContext = createContext<IAppData | null>(null);
const AppProvider = (props: IProps) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const [user, setUser] = useState<IUser | null>(null)
    const [isPageLoading, setIsPageLoading] = useState<boolean>(false)
    const { children } = props
    return (
        <AppContext value={{ user, setUser, isPageLoading, setIsPageLoading, isAuthenticated, setIsAuthenticated }}>
            {children}
        </AppContext>
    )
}

export const useAppContext = () => {
    const object = useContext(AppContext);
    if (!object) { throw new Error("useAppContext must be used within a Provider") }
    return object;
}

export default AppProvider
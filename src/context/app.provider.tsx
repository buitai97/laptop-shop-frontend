import { createContext, useContext, useState } from "react";

interface IProps {
    children: React.ReactNode
}

interface IUser {
    id: number,
    username: string,
    name: string,
}

interface IAppData {
    isAuthenticated: boolean,
    user?: IUser | null,
    setUser: (v: IUser | null) => void,
    isPageLoading: boolean,
    setIsPageLoading: (v: boolean) => void,
    setIsAuthenticated: (v: boolean) => void,

};

// The context is created with `| null` in the type, to accurately reflect the default value.
const AppContext = createContext<IAppData | null>(null);

// The `| null` will be removed via the check in the Hook.
export const useAppContext = () => {
    const object = useContext(AppContext);
    if (!object) { throw new Error("useAppContext must be used within a Provider") }
    return object;
}

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

export default AppProvider
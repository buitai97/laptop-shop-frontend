import { createContext, useContext, useState } from "react";

interface IProps {
    children: React.ReactNode
}

interface IUser {
    isAuthenticated: boolean,
    id: number,
    username: string,
    name: string
}

interface IAppData {
    user?: IUser,
    setUser: (v: IUser) => void

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

    const [user, setUser] = useState<IUser>({ isAuthenticated: false, id: 0, username: "", name: "" })
    const { children } = props
    return (
        <AppContext value={{ user, setUser }}>
            {children}
        </AppContext>
    )
}

export default AppProvider
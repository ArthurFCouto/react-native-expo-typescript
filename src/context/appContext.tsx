import React, { createContext, useContext, useState } from 'react';

type User = {
    logged: boolean,
    token: string | null,
    usuario: {
        emailUsuario: string,
        nomeUsuario: string,
    },
}

type SetUser = (user: User) => void;

type Context = {
    resetUser: () => void;
    setUser: SetUser;
    user: User;
}

type Props = {
    children: React.ReactNode
}

const ContextInitialValue = {
    resetUser: () => { },
    setUser: () => { },
    user: {
        token: null,
        usuario: {
            emailUsuario: '',
            nomeUsuario: '',
        },
        logged: false,
    },
}

const AppContext = createContext<Context>(ContextInitialValue);

export default function AppProvider({ children }: Props) {
    const [user, setUser] = useState<User>(ContextInitialValue.user);

    const resetUserContext = () => {
        setUser(ContextInitialValue.user);
    }

    const setUserContext = (user: User) => {
        setUser({ ...user, logged: true });
    }

    return (
        <AppContext.Provider value={{
            resetUser: resetUserContext,
            setUser: setUserContext,
            user: user,
        }}>
            {children}
        </AppContext.Provider >
    )
}

export function useAppContext() {
    const { resetUser, setUser, user } = useContext(AppContext);
    return {
        resetUser, setUser, user
    }
}
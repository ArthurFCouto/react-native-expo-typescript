import React, { createContext, useEffect, useContext, useState } from 'react';
import { User } from '../service/types';
import userStorage from '../util/userStorage';

export type UserContext = {
    token: string | null,
    usuario: {
        emailUsuario: string,
        nomeUsuario: string,
    },
    logged: boolean
}

type Context = {
    resetUser: () => void;
    setUser: (user: User) => void;
    user: UserContext;
}

type Props = {
    children: React.ReactNode
}

const ContextInitialValue = {
    resetUser: () => {},
    setUser: () => {},
    user: {
        token: null,
        usuario: {
            emailUsuario: '',
            nomeUsuario: '',
        },
        logged: false,
    },
}

const UserContext = createContext<Context>(ContextInitialValue);

export default function UserProvider({ children }: Props) {
    const [userContext, setUserContext] = useState<UserContext>(ContextInitialValue.user);

    const saveUserStorage = async (user: UserContext) => userStorage.saveUserLocalStorage(user);

    const resetUserStorage = async () => userStorage.deleteUserLocalStorage();

    const getUserStorage = async () => {
        const user = await userStorage.getUserLocalStorage();
        if (user !== null)
            setUserContext(user);
    }

    const resetUser = () => {
        setUserContext(ContextInitialValue.user);
        resetUserStorage();
    }

    const setUser = (user: User) => {
        setUserContext({ ...user, logged: true });
        saveUserStorage({ ...user, logged: true });
    }

    useEffect(() => {
        getUserStorage();
    }, []);

    return (
        <UserContext.Provider value={{
            resetUser: resetUser,
            setUser: setUser,
            user: userContext,
        }}>
            {children}
        </UserContext.Provider >
    )
}

export function userContext() {
    const { resetUser, setUser, user } = useContext(UserContext);
    return {
        resetUser, setUser, user
    }
}
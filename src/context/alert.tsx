import React, { createContext, useContext, useState } from 'react';

type Style = 'primary' | 'danger' | 'warning';

type SetMessageAlert = (message: string, style: Style) => void;

type Context = {
    messageAlert: string;
    setMessageAlert: SetMessageAlert;
    style: Style,
}

type Props = {
    children: React.ReactNode
}

const ContextInitialValue: Context = {
    messageAlert: '',
    setMessageAlert: () => { },
    style: 'danger',
}

const AlertContext = createContext<Context>(ContextInitialValue);

export default function AlertProvider({ children }: Props) {
    const [message, setMessage] = useState<string>(ContextInitialValue.messageAlert);
    const [style, setStyle] = useState<Style>(ContextInitialValue.style);

    const setMessageAlert = (message: string, style: Style) => {
        style = style || 'danger';
        setMessage(message);
        setStyle(style);
    }

    return (
        <AlertContext.Provider value={{ messageAlert: message, setMessageAlert, style }}>
            {children}
        </AlertContext.Provider >
    )
}

export function useAlert() {
    const { messageAlert, setMessageAlert, style } = useContext(AlertContext);
    return {
        messageAlert, setMessageAlert, style
    }
}
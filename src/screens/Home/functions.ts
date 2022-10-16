import React from 'react';
import { Keyboard } from 'react-native';
import { NavigationProp, RouterPropsParams } from '@react-navigation/native';
import ProductApi from '../../service/ProductApi';

const isEAN = (data: string) => {
    const codeRegex = /\d{13}/g;
    return codeRegex.test(data);
}

export function handleSearch(data: string, navigator: NavigationProp<RouterPropsParams>, setLoading: React.Dispatch<React.SetStateAction<boolean>>, setMessageAlert: Function) {
    Keyboard.dismiss();
    if (isEAN(data))
        return handleRedirectDetails(data, navigator, setLoading, setMessageAlert);
    navigator.navigate('StackSearch', { nameSearch: data });
}

export function handleScanner(code: string, navigator: NavigationProp<RouterPropsParams>, setLoading: React.Dispatch<React.SetStateAction<boolean>>, setMessageAlert: Function) {
    if (!isEAN(code))
        return setMessageAlert(`[${code}] Código inválido!`, 'danger');
    handleRedirectDetails(code, navigator, setLoading, setMessageAlert);
}

export async function handleRedirectDetails(code: string, navigator: NavigationProp<RouterPropsParams>, setLoading: React.Dispatch<React.SetStateAction<boolean>>, setMessageAlert: Function) {
    setLoading(true);
    const data = await ProductApi.findByCode(code);
    setLoading(false);
    if (data)
        return data.error ? setMessageAlert(`[${code}] Produto não encontrado!`, 'danger') : navigator.navigate('StackDetails', { product: data });
    setMessageAlert('Ops! Tivemos um problema de conexão. Tente mais tarde!', 'danger');
}
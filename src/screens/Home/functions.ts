import { Keyboard } from 'react-native';
import { NavigationProp, RouterPropsParams } from '@react-navigation/native';
import ProductApi from '../../service/ProductApi';
import { codeIsEAN } from '../../util';

export default class HomeFunctions {

    private _navigator: NavigationProp<RouterPropsParams>;
    private _setLoading: Function;
    private _setMessageAlert: Function;

    constructor(navigator: NavigationProp<RouterPropsParams>, setLoading: Function, setMessageAlert: Function) {
        this._navigator = navigator;
        this._setLoading = setLoading;
        this._setMessageAlert = setMessageAlert;
    }

    handleSearch(data: string) {
        Keyboard.dismiss();
        if (codeIsEAN(data))
            return this._handleRedirectDetails(data);
        if (!data || data.trim().length === 0)
            return this._setMessageAlert('Digite algo para pesquisar!', 'warning');
        this._navigator.navigate('StackSearch', { nameSearch: data });
    }

    handleScanner(code: string) {
        if (!codeIsEAN(code))
            return this._setMessageAlert(`[${code}] Código inválido!`, 'danger');
        this._handleRedirectDetails(code);
    }

    private async _handleRedirectDetails(code: string) {
        this._setLoading(true);
        const data = await ProductApi.findByCode(code);
        this._setLoading(false);
        if (data)
            return data.error ? this._setMessageAlert(`[${code}] Produto não encontrado!`, 'danger') : this._navigator.navigate('StackDetails', { product: data });
        this._setMessageAlert('Ops! Tivemos um problema de conexão. Tente mais tarde!', 'danger');
    }
}
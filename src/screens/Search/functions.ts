import { Keyboard } from 'react-native';
import ProductApi, { ProductError, ProductObjectResponse } from '../../service/ProductApi';
import { codeIsEAN, isConnected } from '../../util';

export default class SearchFunctions {

    private _data: ProductObjectResponse | ProductError | undefined;
    private _setLoading: Function;
    private _setMessageAlert: Function;
    private _setProductList: Function;

    constructor(setLoading: Function, setMessageAlert: Function, setProductList: Function) {
        this._data = undefined;
        this._setLoading = setLoading;
        this._setMessageAlert = setMessageAlert;
        this._setProductList = setProductList;
    }

    private _handleProductApi() {
        if (!this._data)
            return this._setMessageAlert('Ops! Tivemos um problema de conexão. Tente mais tarde!', 'danger');
        if (this.instanceOfProductError(this._data)) {
            this._setProductList([]);
            return this._setMessageAlert(`Erro durante a busca: ${this._data.error}`, 'danger');
        }
        return this._data.listaProduto ? this._setProductList(this._data.listaProduto) : this._setProductList([this._data]);
    }

    async getAllProduct() {
        Keyboard.dismiss();
        if (!(await isConnected()))
            return this._setMessageAlert('Aparelho sem conexão no momento!', 'danger');
        this._setLoading(true);
        this._data = await ProductApi.findAll();
        this._setLoading(false);
        return this._handleProductApi();
    }

    async getProductByName(description: string) {
        Keyboard.dismiss();
        if (!(await isConnected()))
            return this._setMessageAlert('Aparelho sem conexão no momento!', 'danger');
        if (!description || description.trim().length === 0 || description === '*')
            return this.getAllProduct();
        this._setLoading(true);
        codeIsEAN(description) ? this._data = await ProductApi.findByCode(description) : this._data = await ProductApi.findByName(description);
        this._setLoading(false);
        return this._handleProductApi();
    }

    instanceOfProductError(data: any): data is ProductError {
        return 'error' in data;
    }
}
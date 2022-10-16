import { Keyboard } from 'react-native';
import ProductApi, { Product, ProductError, ProductObjectResponse } from '../../service/ProductApi';
import { isConnected } from '../../util';

export function instanceOfProductError(data: any): data is ProductError {
    return 'error' in data;
}

function handleProductApi(data: ProductObjectResponse | ProductError, setProductList: React.Dispatch<React.SetStateAction<Array<any>>>, setMessageAlert: Function) {
    if (!data)
        return setMessageAlert('Ops! Tivemos um problema de conexão. Tente mais tarde!', 'danger');
    if (instanceOfProductError(data)) {
        setProductList([]);
        return setMessageAlert(`Erro durante a busca: ${data.error}`, 'danger');
    }
    setProductList(data.listaProduto);
}

export async function getAllProduct(setLoading: React.Dispatch<React.SetStateAction<boolean>>, setProductList: React.Dispatch<React.SetStateAction<Array<Product>>>, setMessageAlert: Function) {
    Keyboard.dismiss();
    if (!(await isConnected()))
        return setMessageAlert('Aparelho sem conexão no momento!', 'danger');
    setLoading(true);
    const data = await ProductApi.findAll();
    setLoading(false);
    return handleProductApi(data, setProductList, setMessageAlert);
}

export async function getProductByName(setLoading: React.Dispatch<React.SetStateAction<boolean>>, setProductList: React.Dispatch<React.SetStateAction<Array<Product>>>, setMessageAlert: Function, description: string) {
    Keyboard.dismiss();
    if (!(await isConnected()))
        return setMessageAlert('Aparelho sem conexão no momento!', 'danger');
    if (!description || description.trim().length === 0)
        return setMessageAlert('Digite algo para pesquisar!', 'warning');
    setLoading(true);
    const data = await ProductApi.findByName(description);
    setLoading(false);
    return handleProductApi(data, setProductList, setMessageAlert);
}
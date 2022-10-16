import Api from '..';

export type Product = {
    atualizadoEm: string,
    barcodeProduto: string,
    categoriaProduto: string,
    codigoProduto: string,
    descricaoProduto: string,
    detalheProduto: string,
    id: number,
    imagemProduto: string,
    marcaProduto: string,
    origem: string,
    precoMedioNacional: string,
}

export type ProductObjectResponse = {
    atualPagina: number,
    porPagina: number,
    totalPagina: number,
    totalProduto: number,
    proximaPagina: string | object,
    listaProduto: Product[],
}

export type ProductError = {
    error: string,
    details: {
        status: number,
        statusText: string,
        data: any,
    }
}

class ProductApi {

    async findAll() {
        const url = 'produto';
        const { data } = await Api.get(url).catch((error) => {
            return error.response;
        });
        return data;
    }

    async findByName(description: string, database?: string) {
        const url = 'produto/buscar';
        const { data } = await Api.get(url, {
            params: {
                description,
                database: database || ''
            }
        }).catch((error) => error.response);
        return data;
    }

    async findByCode(code: string | number) {
        const url = `produto/${code}`;
        const { data } = await Api.get(url).catch((error) => error.response);
        return data;
    }
}

export default new ProductApi();
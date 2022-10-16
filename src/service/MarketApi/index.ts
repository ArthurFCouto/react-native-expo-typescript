import Api from '..';

type Market = {
    id: number,
    cnpjMercado: string,
    nomeMercado: string,
    enderecoMercado: string,
    cidadeMercado: string,
    cepMercado: string,
    telefoneMercado: string,
    atualizadoEm: string
}

class MarketApi {
    async findAll(): Promise<Array<Market> | []> {
        const url = 'mercado';
        const { data } = await Api.get(url).catch((error) => {
            return error.response;
        });
        return data || [];
    }
}

export default new MarketApi();
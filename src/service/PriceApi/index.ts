import Api from '..';

export type Price = {
  codigoProduto: string,
  precoAtual: string,
  emailUsuario: string,
  atualizadoEm: string,
  mercado: {
    cnpjMercado: string,
    nomeMercado: string,
    enderecoMercado: string,
    cidadeMercado: string,
    cepMercado: number,
    telefoneMercado: number,
  }
}

class PriceApi {
  async findByCode(code: string | number) {
    const url = `preco/${code}`;
    const { data } = await Api.get(url).catch((error) => error.response);
    return data;
  }

  async save(token: string, codigoProduto: string, cnpjMercado: string, precoAtual: string) {
    const { data } = await Api.post('preco', {
      codigoProduto,
      cnpjMercado,
      precoAtual
    }, {
      headers: {
        'Authorization': `Basic ${token}`
      }
    }).catch((error) => error.response);
    return data;
  }
}

export default new PriceApi();
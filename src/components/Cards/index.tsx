import { Image, StyleSheet, Text, View } from 'react-native';
import { NavigationProp, RouterPropsParams, useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { Product } from '../../service/ProductApi';
import { Price } from '../../service/PriceApi';
import { CardPriceColumnCenter, CardPriceColumnLeft, CardPriceColumnRight, CardPriceLabelNameMarket, CardPriceLabelPrice, CardPriceLabelUpdate, CardSearchBrand, CardSearchCode, CardSearchDetails, CardSearchName, ContainerCardPrices, ContainerCardSearch } from './styles';
import { getShadowProps } from '../../util';
import { useAlert } from '../../context/alert';

interface CardSearchProps {
    index: number,
    product: Product,
}

interface CardPriceProps {
    product: Product,
    price: Price
}

export function CardSearch(props: CardSearchProps) {
    const navigator = useNavigation<NavigationProp<RouterPropsParams>>();
    const theme = useTheme();
    const { index, product } = props;
    const { codigoProduto, descricaoProduto, imagemProduto, marcaProduto } = product;

    const handleDetails = () => {
        navigator.navigate('StackDetails', { product });
    }

    return (
        <ContainerCardSearch
            activeOpacity={0.75}
            key={index}
            onPress={handleDetails}
            style={getShadowProps()}
        >
            <Image
                defaultSource={require('../../../assets/icon.png')}
                resizeMode={'contain'}
                source={{ uri: imagemProduto }}
                style={styles.imageCardSearch}
            />
            <CardSearchDetails>
                <View>
                    <CardSearchName
                        ellipsizeMode='tail'
                        numberOfLines={2}
                    >
                        {descricaoProduto}
                    </CardSearchName>
                    <CardSearchBrand>{marcaProduto}</CardSearchBrand>
                </View>
                <CardSearchCode>#{codigoProduto}</CardSearchCode>
            </CardSearchDetails>
        </ContainerCardSearch>
    )
}

export function CardPrices(props: CardPriceProps) {
    const theme = useTheme();
    const { setMessageAlert } = useAlert();
    const { price, product: { imagemProduto } } = props;
    const { atualizadoEm, emailUsuario, mercado, precoAtual } = price;
    return (
        <ContainerCardPrices
        activeOpacity={0.75}
        onLongPress={()=> setMessageAlert(`R$ ${precoAtual} em ${mercado.nomeMercado} - ${mercado.enderecoMercado} ${mercado.cidadeMercado}`, 'primary')}
        >
            <CardPriceColumnLeft>
                <Image
                    defaultSource={require('../../../assets/icon.png')}
                    resizeMode={'center'}
                    source={{ uri: imagemProduto }}
                    style={styles.imageCardPrice}
                />
            </CardPriceColumnLeft>
            <CardPriceColumnCenter>
                <CardPriceLabelNameMarket
                    numberOfLines={1}
                    ellipsizeMode={'tail'}
                >
                    {mercado.nomeMercado}
                </CardPriceLabelNameMarket>
                <View>
                    <Text
                        style={{ color: theme.colors.gray }}
                        numberOfLines={1}
                        ellipsizeMode={'tail'}
                    >
                        {emailUsuario}
                    </Text>
                    <CardPriceLabelUpdate>
                        {atualizadoEm}
                    </CardPriceLabelUpdate>
                </View>
            </CardPriceColumnCenter>
            <CardPriceColumnRight>
                <CardPriceLabelPrice
                    numberOfLines={1}
                    ellipsizeMode={'tail'}
                >
                    {'R$ ' + precoAtual}
                </CardPriceLabelPrice>
            </CardPriceColumnRight>
        </ContainerCardPrices>
    )
}

const styles = StyleSheet.create({
    imageCardSearch: {
        height: 100,
        width: 100,
    },
    imageCardPrice: {
        width: 40,
        height: 40
    }
})
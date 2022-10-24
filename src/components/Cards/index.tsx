import { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, Text, View } from 'react-native';
import { NavigationProp, RouterPropsParams, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { useAlert } from '../../context/alert';
import { getShadowProps } from '../../util';
import { Product } from '../../service/ProductApi';
import { Price } from '../../service/PriceApi';
import {
    CardPriceColumnCenter, CardPriceColumnLeft, CardPriceColumnRight,
    CardPriceLabelNameMarket, CardPriceLabelPrice, CardPriceLabelUpdate,
    CardSearchBrand, CardSearchCode, CardSearchDetails, CardSearchFavorite, CardSearchName,
    ContainerCardPrices, ContainerCardSearch
} from './styles';

interface CardSearchProps {
    index: number,
    product: Product,
}

interface CardPriceProps {
    index: number,
    price: Price
}

export function CardSearch(props: CardSearchProps) {
    const navigator = useNavigation<NavigationProp<RouterPropsParams>>();
    const animateOpacity = useRef(new Animated.Value(0)).current;
    const theme = useTheme();
    const { setMessageAlert } = useAlert();
    const { index, product } = props;
    const { codigoProduto, descricaoProduto, imagemProduto, marcaProduto } = product;

    const handleDetails = () => {
        navigator.navigate('StackDetails', { product });
    }

    useEffect(() => {
        Animated.timing(animateOpacity, {
            toValue: 1,
            duration: 700,
            useNativeDriver: true
        }).start();
    }, []);

    return (
        <Animated.View style={{ opacity: animateOpacity }}>
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
                <CardSearchFavorite
                    activeOpacity={0.5}
                    onPress={() => setMessageAlert('Ainda não implementado', 'warning')}
                >
                    <Ionicons
                        color={theme.colors.button}
                        name='heart-outline'
                        size={24}

                    />
                </CardSearchFavorite>
            </ContainerCardSearch>
        </Animated.View>
    )
}

export function CardPrices(props: CardPriceProps) {
    const theme = useTheme();
    const { setMessageAlert } = useAlert();
    const { index, price } = props;
    const { atualizadoEm, emailUsuario, mercado: { cidadeMercado, enderecoMercado, nomeMercado, telefoneMercado }, precoAtual } = price;
    return (
        <ContainerCardPrices
            activeOpacity={0.75}
            key={index}
            onPress={() => setMessageAlert(`R$ ${precoAtual} em ${nomeMercado}\n${enderecoMercado} ${cidadeMercado}\n${telefoneMercado}`, 'primary')}
            style={getShadowProps()}
        >
            <CardPriceColumnLeft>
                <Image
                    defaultSource={require('../../../assets/market-default.png')}
                    source={require('../../../assets/market-default.png')}
                    style={styles.imageCardPrice}
                />
            </CardPriceColumnLeft>
            <CardPriceColumnCenter>
                <CardPriceLabelNameMarket
                    numberOfLines={1}
                    ellipsizeMode={'tail'}
                >
                    {nomeMercado}
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
                    index={index}
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
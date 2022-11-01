import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Modal, Text, useWindowDimensions } from 'react-native';
import { RouteProp, RouterPropsParams, useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import ImageViewer from 'react-native-image-zoom-viewer';
import { useAlert } from '../../context/alert';
import { userContext } from '../../context/user';
import { Product } from '../../service/ProductApi';
import PriceApi, { Price } from '../../service/PriceApi';
import { CardPrices } from '../../components/Cards';
import { PriceSubmit } from '../../components/PriceSubmit';
import AdditionalInformation from './AdditionalInformation';
import {
    AreaDetails, AreaImage, Brand, ButtonBack,
    ButtonImageViewer, ButtonLike, ContainerButtonPrice,
    ContainerDetails, HeaderPrices, LabelButtonPrice,
    LabelListCount, LabelListPrice, LabelUpdate, LineBetween, Name
} from './styles';

/*
 * Utilizar FlatList no lugar no .map
 */

export default function Details() {
    const router = useRoute<RouteProp<RouterPropsParams>>();
    const dimensions = useWindowDimensions();
    const theme = useTheme();
    const navigation = useNavigation();
    const { setMessageAlert } = useAlert();
    const { user } = userContext();
    const [loading, setLoading] = useState(true);
    const [showImageViewer, setShowImageViewer] = useState<boolean>(false);
    const [showPriceSubmit, setShowPriceSubmit] = useState<boolean>(false);
    const [listPrice, setListPrice] = useState<Array<Price>>([]);
    const [priceMedium, setPriceMedium] = useState<string>('');
    const product = router.params?.product as Product;
    const { atualizadoEm, codigoProduto, descricaoProduto, imagemProduto, marcaProduto } = product;
    const image = [{ url: imagemProduto || '' }];

    const ButtonPrice: React.FC = () => (
        <ContainerButtonPrice
            onPress={handlePriceSubmit}
            activeOpacity={0.5}
        >
            <LabelButtonPrice>Informar Preço</LabelButtonPrice>
        </ContainerButtonPrice>
    )

    const handlePriceSubmit = () => {
        if (loading)
            return;
        if (!user.logged)
            return setMessageAlert('É preciso estar logado!', 'danger');
        setShowPriceSubmit(true);
    }

    const requestPrice = async () => {
        setLoading(true);
        const data = await PriceApi.findByCode(codigoProduto);
        setLoading(false);
        if (data)
            return data.error ? setMessageAlert(`${data.error}`, 'danger') : setListPrice(data);
        setListPrice([]);
        setMessageAlert('Ops! Tivemos um problema de conexão. Tente mais tarde!', 'danger');
    }

    useEffect(() => {
        requestPrice();
    }, []);

    useEffect(() => {
        if (listPrice.length > 0) {
            const sum = listPrice.reduce((total: number, price: Price) => { return total + parseFloat(price.precoAtual) }, 0);
            setPriceMedium((sum / listPrice.length).toFixed(2));
        }
    }, [listPrice]);

    return (
        <ContainerDetails
            bounces={false}
            showsVerticalScrollIndicator={false}
        >
            <ButtonBack onPress={() => navigation.goBack()} >
                <Ionicons
                    color={theme.colors.button}
                    name='arrow-back-outline'
                    size={36}
                />
            </ButtonBack>
            <ButtonLike onPress={() => setMessageAlert('Ainda não implementado', 'warning')}>
                <Ionicons
                    color={theme.colors.button}
                    name='heart-outline'
                    size={36}
                />
            </ButtonLike>
            <AreaImage
                activeOpacity={0.75}
                onPress={() => setShowImageViewer(true)}>
                <Image
                    defaultSource={require('../../../assets/icon.png')}
                    resizeMode={'center'}
                    source={{ uri: imagemProduto }}
                    style={{
                        width: dimensions.width,
                        height: (dimensions.height / 2) - 15
                    }}
                />
                <Brand
                    ellipsizeMode='tail'
                    numberOfLines={1}
                >
                    {marcaProduto}
                </Brand>
            </AreaImage>
            <AreaDetails>
                <Name
                    ellipsizeMode='tail'
                    numberOfLines={2}
                    onPress={() => setMessageAlert(`Nome completo: ${descricaoProduto}`, 'primary')}
                >
                    {descricaoProduto}
                </Name>
                <LineBetween>
                    <LabelUpdate>
                        Atualizado {atualizadoEm.substring(0, 10)}
                    </LabelUpdate>
                    <LabelUpdate onLongPress={() => setMessageAlert('Ainda não implementado', 'warning')}>
                        {'#' + codigoProduto}
                    </LabelUpdate>
                </LineBetween>
                <AdditionalInformation
                    priceMedium={priceMedium}
                    product={product}
                />
                <ButtonPrice />
                <HeaderPrices>
                    <LineBetween>
                        <LabelListPrice>
                            Lista de Preços*
                        </LabelListPrice>
                        <LabelListCount>
                            {
                                loading ? (
                                    <ActivityIndicator
                                        size={18}
                                        color={theme.colors.primary}
                                    />
                                ) : listPrice.length
                            }
                        </LabelListCount>
                    </LineBetween>
                </HeaderPrices>
                <Text style={{ color: theme.colors.primary, marginVertical: 10 }}>
                    *Os preços são informados pelos usuários, e podem não refletir a realidade.
                </Text>
                {
                    listPrice.length > 0 &&
                    listPrice.sort((previus, next) => { return previus.precoAtual > next.precoAtual ? 1 : -1 }).map((price: Price, index: number) =>
                        <CardPrices
                            index={index}
                            key={index}
                            price={price}
                        />
                    )
                }
            </AreaDetails>
            <Modal visible={showImageViewer}>
                <ButtonImageViewer onPress={() => setShowImageViewer(false)}>
                    <Ionicons
                        name='close-sharp'
                        size={36}
                        color={theme.colors.button}
                    />
                </ButtonImageViewer>
                <ImageViewer
                    renderIndicator={() => <></>}
                    imageUrls={image}
                    enableSwipeDown={true}
                    onSwipeDown={() => setShowImageViewer(false)}
                />
                <StatusBar style={'auto'} />
            </Modal>
            <Modal
                visible={showPriceSubmit}
                transparent
                animationType='fade'
            >
                <PriceSubmit
                    code={codigoProduto}
                    onClose={() => setShowPriceSubmit(false)}
                />
            </Modal>
        </ContainerDetails>
    )
}
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Modal, useWindowDimensions } from 'react-native';
import { RouteProp, RouterPropsParams, useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import ImageViewer from 'react-native-image-zoom-viewer';
import { useAlert } from '../../context/alert';
import { Product } from '../../service/ProductApi';
import PriceApi, { Price } from '../../service/PriceApi';
import { CardPrices } from '../../components/Cards';
import { PriceSubmit } from '../../components/PriceSubmit';
import AdditionalInformation from './AdditionalInformation';
import { AreaDetails, AreaImage, Brand, ButtonBack, ButtonImageViewer, ButtonLike, ContainerButtonPrice, ContainerDetails, HeaderPrices, LabelButtonPrice, LabelListPrice, LabelUpdate, LineRowBetween, Name } from './styles';
import { useAppContext } from '../../context/appContext';

export default function Details() {
    const router = useRoute<RouteProp<RouterPropsParams>>();
    const dimensions = useWindowDimensions();
    const theme = useTheme();
    const navigation = useNavigation();
    const { setMessageAlert } = useAlert();
    const { user } = useAppContext();
    const [loading, setLoading] = useState(true);
    const [showImageViewer, setShowImageViewer] = useState<boolean>(false);
    const [showPriceSubmit, setShowPriceSubmit] = useState<boolean>(false);
    const [listPrice, setListPrice] = useState<Array<Price>>([]);
    const product = router.params?.product as Product;
    const { atualizadoEm, codigoProduto, descricaoProduto, imagemProduto, marcaProduto } = product;
    const image = [{ url: imagemProduto || '' }];

    const handlePriceSubmit = () => {
        if (loading)
            return;
        if (!user.logged)
            return setMessageAlert('É preciso estar logado!', 'danger');
        setShowPriceSubmit(true);
    }

    const ButtonPrice: React.FC = () => (
        <ContainerButtonPrice
            onPress={handlePriceSubmit}
            activeOpacity={0.5}
        >
            <LabelButtonPrice>Informar Preço</LabelButtonPrice>
        </ContainerButtonPrice>
    )

    useEffect(() => {
        const requestPrice = async () => {
            setLoading(true);
            const data = await PriceApi.findByCode(codigoProduto);
            setLoading(false);
            if (data)
                return data.error ? setMessageAlert(`${data.error}`, 'danger') : setListPrice(data);
            setListPrice([]);
            setMessageAlert('Ops! Tivemos um problema de conexão. Tente mais tarde!', 'danger');
        }
        requestPrice();
    }, []);

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
                    onLongPress={() => setMessageAlert(`Nome completo: ${descricaoProduto}`, 'primary')}
                >
                    {descricaoProduto}
                </Name>
                <LineRowBetween>
                    <LabelUpdate>
                        Atualizado {atualizadoEm.substring(0, 10)}
                    </LabelUpdate>
                    <LabelUpdate onLongPress={() => setMessageAlert('Ainda não implementado', 'warning')}>
                        {'#' + codigoProduto}
                    </LabelUpdate>
                </LineRowBetween>
                <AdditionalInformation product={product} />
                <ButtonPrice />
                <HeaderPrices>
                    <LineRowBetween>
                        <LabelListPrice>
                            Lista de Preços
                        </LabelListPrice>
                        <LabelListPrice style={{ paddingRight: 10 }}>
                            {
                                loading ? (
                                    <ActivityIndicator
                                        size={18}
                                        color={theme.colors.primary}
                                    />
                                ) : listPrice.length
                            }
                        </LabelListPrice>
                    </LineRowBetween>
                </HeaderPrices>
                {
                    listPrice.length > 0 &&
                    listPrice.sort((prevPrice, nextPrice)=> prevPrice.precoAtual > nextPrice.precoAtual ? 1 : -1).map((price: Price, index: number) =>
                        <CardPrices
                            key={index}
                            product={product}
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
            <StatusBar style={'dark'} />
        </ContainerDetails>
    )
}
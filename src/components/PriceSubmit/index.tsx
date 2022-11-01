import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import { TextInputMask } from 'react-native-masked-text';
import { userContext } from '../../context/user';
import { useAlert } from '../../context/alert';
import MarketApi from '../../service/MarketApi';
import PriceApi from '../../service/PriceApi';
import SelectCustom from '../SelectCustom';
import { instanceOfErrorApi } from '../../util';
import {
    AreaButton, AreaInputPrice, ContainerButton,
    ContainerPriceSubmit, LabelButton, LabelMarket,
    LabelPrice
} from './styles';


interface PriceSubmitProps {
    code: string;
    onClose: () => void;
}

export function PriceSubmit(props: PriceSubmitProps) {
    const { code, onClose } = props;
    const { user: { token } } = userContext();
    const theme = useTheme();
    const { setMessageAlert } = useAlert();
    const [maskPrice, setMaskPrice] = useState<string>('');
    const [loadingMarket, setLoadingMarket] = useState<boolean>(true);
    const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
    const [listMarket, setListMarket] = useState<Array<any>>([]);
    const [marketSelected, setMarketSelected] = useState({
        name: 'Selecionar mercado',
        value: ''
    });

    const submitPrice = async () => {
        if (loadingSubmit)
            return;
        const price = maskPrice.replace('.', '').replace(',', '.').substring(3);
        setLoadingSubmit(true);
        const data = await PriceApi.save(token || '', code, marketSelected.value, price);
        setLoadingSubmit(false);
        onClose();
        if (data)
            return instanceOfErrorApi(data) ? setMessageAlert(data.error, 'danger') : setMessageAlert('Preço atualizado!', 'primary');
        return setMessageAlert('Ops! Tivemos um problema de conexão. Tente mais tarde!', 'danger');
    };

    const findMarket = async () => {
        setLoadingMarket(true)
        const data = await MarketApi.findAll();
        setLoadingMarket(false);
        const listObjSelect = data.map((market) => {
            const objSelect = {
                name: market.nomeMercado,
                value: market.cnpjMercado
            }
            return objSelect;
        })
        setListMarket(listObjSelect);
    }

    useEffect(() => {
        findMarket();
    }, []);

    return (
        <TouchableOpacity
            onPress={() => onClose()}
            activeOpacity={0}
            style={{
                backgroundColor: theme.colors.light + '50',
                flex: 1
            }}
        >
            <ContainerPriceSubmit>
                <Ionicons
                    color={theme.colors.button}
                    name='close-sharp'
                    onPress={() => onClose()}
                    size={36}
                    style={styles.buttonClose}
                />
                <AreaInputPrice>
                    <LabelPrice>Informe o preço</LabelPrice>

                    <TextInputMask
                        onChangeText={(text: string) => setMaskPrice(text)}
                        options={{
                            unit: 'R$ ',
                        }}
                        style={styles.inputPrice}
                        type={'money'}
                        value={maskPrice}
                    />

                </AreaInputPrice>
                <AreaInputPrice>
                    <LabelMarket>Selecionar Mercado</LabelMarket>
                    {
                        loadingMarket ?
                            (
                                <ActivityIndicator color={theme.colors.primary} />
                            ) : (
                                <SelectCustom
                                    list={listMarket}
                                    selected={(market) => setMarketSelected(market)}
                                    label={marketSelected.name}
                                    style={styles.select}
                                />
                            )
                    }
                </AreaInputPrice>
                <AreaButton>
                    <ContainerButton onPress={() => submitPrice()}>
                        {
                            loadingSubmit ?
                                (
                                    <ActivityIndicator color={theme.colors.light} />
                                ) : (
                                    <LabelButton>
                                        Enviar
                                    </LabelButton>
                                )
                        }
                    </ContainerButton>
                </AreaButton>
            </ContainerPriceSubmit>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonClose: {
        marginLeft: 'auto'
    },
    inputPrice: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        fontSize: 18,
        marginVertical: 5,
        paddingHorizontal: 10,
        paddingVertical: 15,
        textAlign: 'right',
    },
    select: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        marginVertical: 5,
        paddingVertical: 15,
        paddingHorizontal: 10
    }
});
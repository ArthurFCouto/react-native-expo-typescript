import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity} from 'react-native';
import { useTheme } from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import { useAppContext } from '../../context/appContext';
import { useAlert } from '../../context/alert';
import MarketApi from '../../service/MarketApi';
import SelectCustom from '../SelectCustom';
import PriceApi from '../../service/PriceApi';
import { AreaButton, AreaInputPrice, ContainerButton, ContainerPriceSubmit, LabelButton, LabelMarket, LabelPrice } from './styles';
import { TextInputMask } from 'react-native-masked-text';

interface PriceSubmitProps {
    code: string;
    onClose: () => void;
}

export function PriceSubmit(props: PriceSubmitProps) {
    const { code, onClose } = props;
    const { user: { token } } = useAppContext();
    const theme = useTheme();
    const { setMessageAlert } = useAlert();
    const [price, setPrice] = useState<string>('0,00');
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
        const formatPrice = price.replace('.', '').replace(',', '.').substring(3);
        setLoadingSubmit(true);
        const data = await PriceApi.save(token || '', code, marketSelected.value, formatPrice);
        setLoadingSubmit(false);
        onClose();
        if (data)
            return data.error ? setMessageAlert(data.error, 'danger') : setMessageAlert('Preço atualizado!', 'primary');
        return setMessageAlert('Ops! Tivemos um problema de conexão. Tente mais tarde!', 'danger');
    };

    const findMarket = async () => {
        setLoadingMarket(true)
        const data = await MarketApi.findAll();
        setLoadingMarket(false);
        const listSelect = data.map((market) => {
            const objSelect = {
                name: market.nomeMercado,
                value: market.cnpjMercado
            }
            return objSelect;
        })
        setListMarket(listSelect);
    }

    useEffect(() => {
        findMarket();
    }, []);

    return (
        <TouchableOpacity
        onPress={()=> onClose()}
        activeOpacity={0}
        style={{
            backgroundColor: theme.colors.light+'50',
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
                        onChangeText={(text: string) => setPrice(text)}
                        options={{
                            unit: 'R$ ',
                        }}
                        style={styles.inputPrice}
                        type={'money'}
                        value={price}
                    />
                </AreaInputPrice>
                <AreaInputPrice>
                    <LabelMarket>Selecionar Mercado</LabelMarket>
                    {
                        loadingMarket ?
                            (
                                <ActivityIndicator />
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
                                    <ActivityIndicator />
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
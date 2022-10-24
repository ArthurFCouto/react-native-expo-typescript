import { useEffect, useRef, useState } from 'react';
import {
    FlatList, Keyboard, StyleSheet,
    Text, TouchableOpacity, TouchableWithoutFeedback
} from 'react-native';
import { RouteProp, RouterPropsParams, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import { useAlert } from '../../context/alert';
import { Product } from '../../service/ProductApi';
import lottieFiles from '../../assets/lottie';
import { CardSearch } from '../../components/Cards';
import ButtonCustom from '../../components/ButtonCustom';
import HeaderSearch from './HeaderSearch';
import SearchFunctions from './functions';
import {
    AreaAnimation, AreaFilter, ContainerComponentEmpty,
    ContainerSearch, LabelEmpty
} from './styles';

export default function Products() {
    const router = useRoute<RouteProp<RouterPropsParams>>();
    const theme = useTheme();
    const { setMessageAlert } = useAlert();
    const [nameSearch, setNameSearch] = useState<string>(router.params !== null ? String(router.params.nameSearch) : '');
    const [loading, setLoading] = useState<boolean>(false);
    const [productList, setProductList] = useState<Array<Product>>([]);
    const functions = new SearchFunctions(setLoading, setMessageAlert, setProductList);

    const ComponentSeparator: React.FC = () => (
        <TouchableWithoutFeedback>
            <Text></Text>
        </TouchableWithoutFeedback>
    )

    const ComponentEmpty: React.FC = () => {
        const animationEmpty = useRef<LottieView>(null);
        useEffect(() => animationEmpty.current?.play(0, 100), []);
        return (
            <ContainerComponentEmpty>
                <LabelEmpty>Sem resultados</LabelEmpty>
                <TouchableWithoutFeedback onPress={() => animationEmpty.current?.play(0, 100)}>
                    <LottieView
                        autoPlay={false}
                        loop={false}
                        ref={animationEmpty}
                        style={{ width: '50%' }}
                        source={lottieFiles.notFound}
                    />
                </TouchableWithoutFeedback>
                <ButtonCustom
                    onPress={() => setNameSearch('')}
                    style={{ width: '100%' }}
                    title='Listar todos'
                    icon='ios-list-circle-outline'
                />
            </ContainerComponentEmpty>
        )
    }

    useEffect(() => {
        functions.getProductByName(nameSearch);
    }, [nameSearch]);

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <ContainerSearch>
                <HeaderSearch
                    nameSearch={nameSearch}
                    setNameSearch={(text) => setNameSearch(text)}
                />
                <AreaFilter>
                    <TouchableOpacity onPress={() => setMessageAlert('Ainda não implementado', 'warning')}>
                        <Ionicons
                            name='filter'
                            size={24}
                            color={theme.colors.button}
                        />
                    </TouchableOpacity>
                </AreaFilter>
                {
                    loading ? (
                        <AreaAnimation>
                            <LottieView
                                autoPlay
                                style={styles.lottie}
                                source={lottieFiles.search}
                            />
                        </AreaAnimation>
                    ) : (
                        <FlatList
                            data={productList}
                            contentContainerStyle={styles.list}
                            ItemSeparatorComponent={() => <ComponentSeparator />}
                            ListEmptyComponent={() => <ComponentEmpty />}
                            keyExtractor={(item) => item.codigoProduto}
                            renderItem={({ item, index, separators }) => <CardSearch product={item} index={index} />}
                            showsVerticalScrollIndicator={false}
                        />
                    )
                }
            </ContainerSearch>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    lottie: {
        width: '100%'
    },
    list: {
        paddingVertical: 15,
    },
});
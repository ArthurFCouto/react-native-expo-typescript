import { useEffect, useRef, useState } from 'react';
import { Button, FlatList, Keyboard, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { RouteProp, RouterPropsParams, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import { useAlert } from '../../context/alert';
import { CardSearch } from '../../components/Cards';
import { Product } from '../../service/ProductApi';
import lottieFiles from '../../assets/lottie';
import HeaderSearch from './HeaderSearch';
import { getAllProduct, getProductByName } from './functions';
import { AreaAnimation, AreaFilter, AreaLabelFilter, ContainerComponentEmpty, ContainerSearch, LabelEmpty, LabelFilter } from './styles';

export default function Products() {
    const router = useRoute<RouteProp<RouterPropsParams>>();
    const theme = useTheme();
    const animation = useRef<LottieView>(null);
    const { setMessageAlert } = useAlert();
    const [nameSearch, setNameSearch] = useState<string>(router.params !== null ? String(router.params.nameSearch) : '');
    const [loading, setLoading] = useState<boolean>(false);
    const [productList, setProductList] = useState<Array<Product>>([]);

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
                <LottieView
                    loop={false}
                    ref={animationEmpty}
                    style={{ width: '50%' }}
                    source={lottieFiles.notFound}
                />
                <Button
                    title='Listar Cadastrados'
                    onPress={() => getAllProduct(setLoading, setProductList, setMessageAlert)}
                />
            </ContainerComponentEmpty>
        )
    }

    useEffect(() => {
        getProductByName(setLoading, setProductList, setMessageAlert, nameSearch);
    }, [nameSearch]);

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <ContainerSearch>
                <HeaderSearch
                    nameSearch={nameSearch}
                    setNameSearch={(text) => setNameSearch(text)}
                />
                <AreaFilter>
                    <AreaLabelFilter>
                        <LabelFilter>Itens por página: -</LabelFilter>
                        <LabelFilter>Página atual: -</LabelFilter>
                    </AreaLabelFilter>
                    <TouchableOpacity onPress={()=> setMessageAlert('Ainda não implementado', 'warning')}>
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
                                ref={animation}
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
        flex: 1,
        paddingVertical: 15,
    },
});
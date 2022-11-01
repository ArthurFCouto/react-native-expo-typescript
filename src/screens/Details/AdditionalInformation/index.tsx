import { useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';
import { useTheme } from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import { Product } from '../../../service/ProductApi';
import {
    ColumnLeft, ColumnRight, ContainerAddInformation,
    HeaderAddInformation, LabelAddInformation, LabelLeft,
    LabelRight, LabelRightDetails, Line
} from './styles';

interface PropsAdditionalInformation {
    priceMedium: string;
    product: Product;
}

export default function AdditionalInformation(props: PropsAdditionalInformation) {
    const theme = useTheme();
    const animateOpacity = useRef(new Animated.Value(0)).current;
    const [showContainer, setShowContainer] = useState<boolean>(false);
    const { priceMedium, product: { categoriaProduto, detalheProduto, precoMedioNacional } } = props;

    useEffect(() => {
        Animated.timing(animateOpacity, {
            toValue: showContainer ? 1 : 0,
            duration: 500,
            useNativeDriver: true
        }).start();
    }, [showContainer]);

    return (
        <ContainerAddInformation>
            <HeaderAddInformation
                onPress={() => setShowContainer(!showContainer)}
                activeOpacity={0.75}
            >
                <LabelAddInformation>
                    Informações adicionais
                </LabelAddInformation>
                <Ionicons
                    name={showContainer ? 'md-eye' : 'md-eye-off'}
                    size={18}
                    color={theme.colors.primary}
                />
            </HeaderAddInformation>
            {
                showContainer && (
                    <Animated.View style={{ opacity: animateOpacity }}>
                        <Line>
                            <ColumnLeft>
                                <LabelLeft>Preço médio Nacional</LabelLeft>
                            </ColumnLeft>
                            <ColumnRight>
                                <LabelRight>
                                    {'R$ ' + precoMedioNacional}
                                </LabelRight>
                            </ColumnRight>
                        </Line>
                        <Line>
                            <ColumnLeft>
                                <LabelLeft>
                                    Preço médio Local
                                </LabelLeft>
                            </ColumnLeft>
                            <ColumnRight>
                                <LabelRight>
                                    {'R$ ' + priceMedium}
                                </LabelRight>
                            </ColumnRight>
                        </Line>
                        <Line>
                            <ColumnLeft>
                                <LabelLeft>
                                    Categoria
                                </LabelLeft>
                            </ColumnLeft>
                            <ColumnRight>
                                <LabelRight>
                                    {
                                        categoriaProduto.length > 0 ? categoriaProduto : 'Não informado'
                                    }
                                </LabelRight>
                            </ColumnRight>
                        </Line>
                        <Line>
                            <ColumnLeft>
                                <LabelLeft>
                                    Descrição NCM
                                </LabelLeft>
                            </ColumnLeft>
                            <ColumnRight>
                                <LabelRightDetails>
                                    {detalheProduto}
                                </LabelRightDetails>
                            </ColumnRight>
                        </Line>
                    </Animated.View>
                )
            }
        </ContainerAddInformation>
    )
}
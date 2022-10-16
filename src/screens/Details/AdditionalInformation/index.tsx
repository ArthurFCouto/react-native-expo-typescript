import { useState } from 'react';
import { View } from 'react-native';
import { useTheme } from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import { Product } from '../../../service/ProductApi';
import { ColumnLeft, ColumnRight, ContainerAddInformation, HeaderAddInformation, LabelAddInformation, LabelLeft, LabelRight, LabelRightDetails, Line } from './styles';

interface PropsAdditionalInformation {
    product: Product;
}

export default function AdditionalInformation(props: PropsAdditionalInformation) {
    const theme = useTheme();
    const [showContainer, setShowContainer] = useState<boolean>(false);
    const { product: { categoriaProduto, detalheProduto, precoMedioNacional } } = props;

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
                    name={showContainer ? 'remove-circle-sharp' : 'add-circle-sharp'}
                    size={18}
                    color={theme.colors.primary}
                />
            </HeaderAddInformation>
            {
                showContainer && (
                    <View>
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
                                    Não implementado
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
                    </View>
                )
            }
        </ContainerAddInformation>
    )
}
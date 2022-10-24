import { useState } from 'react';
import { Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import { InputSearch } from '../../../components/InputCustom';
import Scanner from '../../../components/Scanner';
import {
    AreaInputSearch, ContainerHeaderSearch, DetailsSearch,
    LabelSearch, LabelSearchName, TitleSearch
} from './styles';

interface HeaderSearchProps {
    nameSearch: string,
    setNameSearch: (text: string) => void
}

export default function HeaderSearch(props: HeaderSearchProps) {
    const { nameSearch, setNameSearch } = props;
    const navigator = useNavigation();
    const theme = useTheme();
    const [showScanner, setShowScanner] = useState(false);

    return (
        <ContainerHeaderSearch>
            <TitleSearch onPress={() => navigator.goBack()}>
                É Quanto?
            </TitleSearch>
            <AreaInputSearch>
                <InputSearch
                    placeholder='Digite um nome'
                    submit={(text) => setNameSearch(text)}
                />
                <TouchableOpacity onPress={() => setShowScanner(true)}>
                    <Ionicons
                        color={theme.colors.button}
                        name='ios-barcode-outline'
                        size={36}
                        style={styles.barcode}
                    />
                </TouchableOpacity>
            </AreaInputSearch>
            {
                (nameSearch && nameSearch !== '*') && (
                    <DetailsSearch>
                        <LabelSearch>Pesquisando por </LabelSearch>
                        <LabelSearchName>{nameSearch}</LabelSearchName>
                    </DetailsSearch>
                )
            }
            <Modal
                animationType='slide'
                transparent
                visible={showScanner}
            >
                <Scanner
                    action={(code) => setNameSearch(code)}
                    onClose={() => setShowScanner(false)}
                />
            </Modal>
        </ContainerHeaderSearch>
    )
}

const styles = StyleSheet.create({
    barcode: {
        marginLeft: 10,
    },
})
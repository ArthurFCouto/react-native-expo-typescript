import { useState } from 'react';
import {
    ActivityIndicator, Keyboard, Modal,
    StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View
} from 'react-native';
import { NavigationProp, RouterPropsParams, useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAlert } from '../../context/alert';
import ButtonCustom from '../../components/ButtonCustom';
import { InputSearch } from '../../components/InputCustom';
import Scanner from '../../components/Scanner';
import { SubTitle, Title } from '../../components/Styles';
import HomeFunctions from './functions';
import { ViewInput, ViewScanner } from './styles';

export default function Home() {
    const theme = useTheme();
    const navigator = useNavigation<NavigationProp<RouterPropsParams>>();
    const { setMessageAlert } = useAlert();
    const [showScanner, setShowScanner] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const functions = new HomeFunctions(navigator, setLoading, setMessageAlert);

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <LinearGradient
                colors={[theme.colors.bgPrimary, theme.colors.bgSecondary]}
                style={styles.containerLinearGradient}
            >
                <Title>É Quanto?</Title>
                <SubTitle>Faça cotações de preços em mercados sem sair de casa</SubTitle>
                <ViewInput>
                    <InputSearch
                        placeholder='Digite um nome ou código'
                        submit={(text) => functions.handleSearch(text)}
                    />
                    <TouchableOpacity onPress={() => setShowScanner(true)}>
                        <Ionicons
                            color={theme.colors.button}
                            name='ios-barcode-outline'
                            size={36}
                            style={styles.barcode}
                        />
                    </TouchableOpacity>
                </ViewInput>
                <ViewScanner>
                    {
                        loading ?
                            (
                                <ActivityIndicator
                                    color={theme.colors.button}
                                    size={'large'}
                                    style={styles.activityIndicator}
                                />
                            ) : (
                                <View>
                                    <ButtonCustom
                                        icon='ios-list-circle-outline'
                                        onPress={() => functions.handleSearch('*')}
                                        space={true}
                                        style={styles.buttons}
                                        title='Listar todos'
                                    />
                                    <ButtonCustom
                                        icon='heart-outline'
                                        onPress={() => setMessageAlert('Ainda não implementado', 'warning')}
                                        space={true}
                                        style={styles.buttons}
                                        title='Favoritos'
                                    />
                                </View>
                            )
                    }
                </ViewScanner>
                <Modal
                    animationType='slide'
                    transparent
                    visible={showScanner}
                >
                    <Scanner
                        action={(code) => functions.handleScanner(code)}
                        onClose={() => setShowScanner(false)}
                    />
                </Modal>
            </LinearGradient>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    activityIndicator: {
        marginTop: 15,
    },
    barcode: {
        marginLeft: 5,
    },
    buttons: {
        marginVertical: 10,
        maxWidth: '50%',
    },
    containerLinearGradient: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
});
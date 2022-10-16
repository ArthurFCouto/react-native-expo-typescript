import { useState } from 'react';
import { ActivityIndicator, Keyboard, Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { NavigationProp, RouterPropsParams, useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAlert } from '../../context/alert';
import Scanner from '../../components/Scanner';
import InputCustom from '../../components/InputCustom';
import { handleScanner, handleSearch } from './functions';
import { SubTitle, Title, ViewInput } from './styles';

export default function Home() {
    const navigator = useNavigation<NavigationProp<RouterPropsParams>>();
    const theme = useTheme();
    const [showScanner, setShowScanner] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const { setMessageAlert } = useAlert();

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <LinearGradient
                colors={[theme.colors.bgPrimary, theme.colors.bgSecondary]}
                style={styles.containerLinearGradient}
            >
                <Title>Quanto Tá?</Title>
                <SubTitle>Saiba o preço dos produtos antes de sair de casa</SubTitle>
                <ViewInput>
                    <InputCustom
                        placeholder='Digite um nome ou código'
                        submit={(text) => handleSearch(text, navigator, setLoading, setMessageAlert)}
                    />
                </ViewInput>
                <View style={styles.viewScanner}>
                    {
                        loading ?
                            (
                                <ActivityIndicator
                                    color={theme.colors.button}
                                    size={'large'}
                                    style={styles.activityIndicator}
                                />
                            ) : (
                                <TouchableOpacity onPress={() => setShowScanner(true)}>
                                    <Ionicons
                                        color={theme.colors.button}
                                        name='ios-barcode-outline'
                                        size={36}
                                        style={styles.icon}
                                    />
                                    <Text style={{ color: theme.colors.button }}>
                                        Ler código de barras
                                    </Text>
                                </TouchableOpacity>
                            )
                    }
                </View>
                <Modal
                    animationType='slide'
                    transparent
                    visible={showScanner}
                >
                    <Scanner
                        action={(code) => handleScanner(code, navigator, setLoading, setMessageAlert)}
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
    containerLinearGradient: {
        flex: 1,
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        textAlign: 'center',
    },
    viewScanner: {
        alignItems: 'center',
    }
});
import { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from 'styled-components';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import lottieFiles from '../../assets/lottie';
import { BarCodeBox, BarCodeLabel, ContainerScanner, Message } from './styles';

interface Payload {
    type: string,
    data: string
}

interface ScannerProps {
    onClose: () => void,
    action: (code: string) => void
}

export default function Scanner(props: ScannerProps) {
    const { onClose, action } = props;
    const theme = useTheme();
    const [hasPermission, setHasPermission] = useState<boolean>(true);

    const askCameraPermission = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
    }

    const onBarCodeScanned = (payload: Payload) => {
        const { data } = payload;
        onClose();
        action(data);
    }

    useEffect(() => {
        askCameraPermission();
    }, []);

    return (
        <TouchableOpacity
            onPress={() => onClose()}
            activeOpacity={0}
            style={{
                flex: 1
            }}
        >
            <ContainerScanner>
                <Ionicons
                    color={theme.colors.button}
                    name='close-sharp'
                    onPress={() => onClose()}
                    size={36}
                    style={styles.buttonClose}
                />
                <BarCodeBox>
                    <BarCodeLabel>
                        {
                            hasPermission ? (
                                <LottieView
                                    autoPlay
                                    source={lottieFiles.scanner}
                                    style={{
                                        width: '100%',
                                    }}
                                />
                            ) : (
                                <Message>
                                    Autorize uso da camera
                                </Message>
                            )
                        }
                    </BarCodeLabel>
                    {
                        hasPermission && (
                            <BarCodeScanner
                                onBarCodeScanned={onBarCodeScanned}
                                style={styles.barCode}
                            />
                        )
                    }
                </BarCodeBox>
            </ContainerScanner>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    barCode: {
        height: '100%',
        position: 'absolute',
        width: '100%',
        zIndex: 1
    },
    buttonClose: {
        marginLeft: 'auto'
    }
});
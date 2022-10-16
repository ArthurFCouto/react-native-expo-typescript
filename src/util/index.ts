import { Platform, StyleProp, ViewStyle } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

export async function isConnected() {
    return NetInfo.fetch().then(state => {
        const { isConnected } = state;
        return isConnected;
    });
}

export function getShadowProps(): StyleProp<ViewStyle> {
    if (Platform.OS === 'ios') {
        return {
            shadowOffset: {
                height: 1,
                width: 0,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3
        }
    }
    return {
        elevation: 3,
    }
}
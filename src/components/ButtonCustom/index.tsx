import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from 'styled-components';
import { getShadowProps } from '../../util';
import { LabelButton, TouchableButton } from './styles';

interface ButtonCustomProps {
    icon?: 'heart-outline' | 'ios-barcode-outline' | 'ios-list-circle-outline' | 'log-in' | 'log-out';
    loading?: boolean;
    onPress: () => void;
    space?: boolean;
    style?: StyleProp<ViewStyle>;
    title: string;
    transparent?: boolean;
}

export default function ButtonCustom(props: ButtonCustomProps) {
    const { icon, loading, onPress, space, style, title, transparent } = props;
    const theme = useTheme();
    const shadow = transparent ? {} : getShadowProps();
    const colorIcon = transparent ? theme.colors.primary : theme.colors.light;
    const Icon = {
        'heart-outline':
            <Ionicons
                name='heart-outline'
                size={24}
                color={colorIcon}
            />,
        'ios-barcode-outline':
            <Ionicons
                name='ios-barcode-outline'
                size={24}
                color={colorIcon}
            />,
        'ios-list-circle-outline':
            <Ionicons
                name='ios-list-circle-outline'
                size={24}
                color={colorIcon}
            />,
        'log-in':
            <Ionicons
                name='log-in'
                size={24}
                color={colorIcon}
            />,
        'log-out':
            <Ionicons
                name='log-out'
                size={24}
                color={colorIcon}
            />,
    }

    const handleOnPress = () => {
        if (loading)
            return;
        onPress();
    }

    const Label = () => {
        if (loading)
            return <ActivityIndicator color={theme.colors.light} size={24} />
        return (
            <>
                <LabelButton
                    isSpace={space}
                    transparent={transparent}
                >
                    {title}
                </LabelButton>
                {
                    icon && Icon[icon]
                }
            </>
        )
    }

    return (
        <TouchableButton
            activeOpacity={0.5}
            onPress={handleOnPress}
            isSpace={space}
            style={[shadow, style]}
            transparent={transparent}
        >
            <Label />
        </TouchableButton>
    )
}
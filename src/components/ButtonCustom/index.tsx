import { Ionicons } from '@expo/vector-icons';
import { GestureResponderEvent, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from 'styled-components';
import { getShadowProps } from '../../util';
import { LabelButton, TouchableButton } from './styles';

interface ButtonCustomProps {
    icon?: 'heart-outline' | 'ios-barcode-outline' | 'ios-list-circle-outline' | 'log-in';
    onPress: ((event: GestureResponderEvent) => void);
    space?: boolean;
    style?: StyleProp<ViewStyle>;
    title: string;
}

export default function ButtonCustom(props: ButtonCustomProps) {
    const { icon, onPress, space, style, title } = props;
    const theme = useTheme();
    const shadow = getShadowProps();
    const Icon = {
        'heart-outline':
            <Ionicons
                name='heart-outline'
                size={24}
                color={theme.colors.light}
            />,
        'ios-barcode-outline':
            <Ionicons
                name='ios-barcode-outline'
                size={24}
                color={theme.colors.light}
            />,
        'ios-list-circle-outline':
            <Ionicons
                name='ios-list-circle-outline'
                size={24}
                color={theme.colors.light}
            />,
        'log-in':
            <Ionicons
                name='log-in'
                size={24}
                color={theme.colors.light}
            />,
    }

    return (
        <TouchableButton
            activeOpacity={0.5}
            onPress={onPress}
            isSpace={space}
            style={[shadow, style]}
        >
            <LabelButton isSpace={space}>{title}</LabelButton>
            {
                icon && Icon[icon]
            }
        </TouchableButton>
    )
}
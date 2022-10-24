import { useState } from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { useTheme } from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import { ContainerInput, Input } from './styles';

interface InputSearchProps {
    placeholder: string;
    style?: StyleProp<ViewStyle>;
    submit: (text: string) => void;
}

export function InputSearch(props: InputSearchProps) {
    const { placeholder, style, submit } = props;
    const theme = useTheme();
    const [valueText, setValueText] = useState<string>('');

    return (
        <ContainerInput style={style}>
            <Input
                multiline={false}
                placeholder={placeholder}
                placeholderTextColor={theme.colors.gray}
                onChangeText={(text: string) => setValueText(text)}
                onSubmitEditing={() => submit(valueText)}
                returnKeyType={'search'}
            />
            <TouchableOpacity
                onPress={() => submit(valueText)}
                style={styles.button}
            >
                <Ionicons
                    color={theme.colors.button}
                    name='ios-search'
                    size={24}
                />
            </TouchableOpacity>
        </ContainerInput>
    )
}

const styles = StyleSheet.create({
    button: {
        marginHorizontal: 5
    }
})
import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useTheme } from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import { ContainerInput, Input } from './styles';

interface InputCustomProps {
    placeholder: string,
    submit: (text: string) => void
}

export default function InputCustom(props: InputCustomProps) {
    const { placeholder, submit } = props;
    const theme = useTheme();
    const [valueText, setValueText] = useState<string>('');

    return (
        <ContainerInput>
            <Input
                multiline={false}
                placeholder={placeholder}
                placeholderTextColor={theme.colors.gray}
                onChangeText={(text: string) => setValueText(text)}
                onSubmitEditing={() => submit(valueText)}
                returnKeyType={'search'}
            />
            <View style={styles.buttonArea}>
                <TouchableOpacity
                    onPress={() => submit(valueText)}
                    style={styles.buttons}
                >
                    <Ionicons
                        color={theme.colors.button}
                        name='ios-search'
                        size={24}
                    />
                </TouchableOpacity>
            </View>
        </ContainerInput>
    )
}

const styles = StyleSheet.create({
    buttonArea: {
        flexDirection: 'row'
    },
    buttons: {
        marginHorizontal: 5
    }
})
import { useRef, useState } from 'react';
import { ActivityIndicator, Keyboard, StyleSheet, Text, TextInput, TouchableWithoutFeedback } from 'react-native';
import { useTheme } from 'styled-components';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAlert } from '../../context/alert';
import UserApi from '../../service/UserApi';
import { useAppContext } from '../../context/appContext';
import { Button, InputEmail, InputPassword, LabelButton, SubTitle, Title, ViewInput } from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getShadowProps } from '../../util';

export default function Account() {
    const { resetUser, setUser, user } = useAppContext();
    const { logged, usuario: { nomeUsuario } } = user;
    const theme = useTheme();
    const { setMessageAlert } = useAlert();
    const passwordRef = useRef<TextInput>(null);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleLogin = async () => {
        if (email.trim().length === 0 || password.trim().length === 0)
            return setMessageAlert('Preencha todos os campos!', 'warning');
        setLoading(true);
        const data = await UserApi.login(email, password);
        setLoading(false);
        if (data) {
            return data.error ? setMessageAlert(data.error, 'danger') : setUser(data);
        }
        setMessageAlert('Ops! Tivemos um problema de conexão. Tente mais tarde!', 'danger');
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <LinearGradient
                colors={[theme.colors.bgPrimary, theme.colors.bgSecondary]}
                style={styles.containerLinearGradient}
            >
                {
                    logged ? (
                        <>
                            <Title>Bem vindo(a)!</Title>
                            <SubTitle>{nomeUsuario}</SubTitle>
                        </>
                    ) : (
                        <>
                            <Title>Acesse sua conta</Title>
                            <SubTitle>Entre com seu e-mail e senha</SubTitle>
                        </>
                    )
                }
                <ViewInput>
                    <InputEmail
                        autoCapitalize={'none'}
                        autoComplete={'email'}
                        autoCorrect={false}
                        blurOnSubmit={false}
                        editable={!logged}
                        keyboardType={'email-address'}
                        onChangeText={(text: string) => setEmail(text)}
                        onSubmitEditing={() => passwordRef.current?.focus()}
                        placeholder='Email'
                        placeholderTextColor={theme.colors.gray}
                        returnKeyType={'next'}
                        value={email}
                    />
                    <InputPassword
                        autoCapitalize={'none'}
                        editable={!logged}
                        onChangeText={(text: string) => setPassword(text)}
                        onSubmitEditing={() => Keyboard.dismiss()}
                        placeholder='Senha'
                        placeholderTextColor={theme.colors.gray}
                        ref={passwordRef}
                        secureTextEntry={true}
                        value={password}
                    />
                </ViewInput>
                {
                    loading ?
                        <ActivityIndicator />
                        : logged ?
                            <TouchableOpacity
                                onPress={() => resetUser()}
                                style={styles.logout}
                            >
                                <Text style={{ color: theme.colors.primary }}>Sair </Text>
                                <Ionicons
                                    name='log-out'
                                    size={22}
                                    color={theme.colors.primary}
                                />
                            </TouchableOpacity>
                            :
                            <Button
                                onPress={() => handleLogin()}
                                style={getShadowProps()}
                            >
                                <LabelButton>Loggin</LabelButton>
                                <Ionicons
                                    name='log-in'
                                    size={24}
                                    color={theme.colors.light}
                                />
                            </Button>
                }
            </LinearGradient>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    containerLinearGradient: {
        flex: 1,
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logout: {
        alignItems: 'center',
        flexDirection: 'row',
    },
});
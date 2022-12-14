import { useRef, useState } from 'react';
import {
    Keyboard, StyleSheet,
    TextInput, TouchableWithoutFeedback
} from 'react-native';
import { useTheme } from 'styled-components';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAlert } from '../../context/alert';
import { userContext } from '../../context/user';
import UserApi from '../../service/UserApi';
import ButtonCustom from '../../components/ButtonCustom';
import { SubTitle, Title } from '../../components/Styles';
import {
    AreaInput, InputEmail,
    InputPassword, LineInput
} from './styles';
import { instanceOfErrorApi } from '../../util';

export default function Account() {
    const theme = useTheme();
    const { setMessageAlert } = useAlert();
    const { resetUser, setUser, user } = userContext();
    const { logged, usuario: { nomeUsuario } } = user;
    const passwordRef = useRef<TextInput>(null);
    const [email, setEmail] = useState<string>(user.usuario.emailUsuario);
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const handleLogin = async () => {
        if (email.trim().length === 0 || password.trim().length === 0)
            return setMessageAlert('Preencha todos os campos!', 'warning');
        setLoading(true);
        const data = await UserApi.login(email, password);
        setLoading(false);
        if (data)
            return instanceOfErrorApi(data) ? setMessageAlert(data.error, 'danger') : setUser(data);
        setMessageAlert('Ops! Tivemos um problema de conexão. Tente mais tarde!', 'danger');
    }

    const Logout = () => (
        <ButtonCustom
            icon='log-out'
            loading={loading}
            onPress={() => resetUser()}
            style={{ width: '50%' }}
            title='Sair'
            transparent={true}
        />
    )

    const Login = () => (
        <ButtonCustom
            icon='log-in'
            loading={loading}
            onPress={()=> handleLogin()}
            title='Login'
            style={{ width: '50%' }}
        />
    )

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <LinearGradient
                colors={[theme.colors.bgPrimary, theme.colors.bgSecondary]}
                style={styles.containerLinearGradient}
            >
                <Title>{logged ? 'Bem vindo(a)!' : 'Acesse sua conta'}</Title>
                <SubTitle>{logged ? nomeUsuario : 'Entre com seu e-mail e senha'}</SubTitle>
                <AreaInput>
                    <LineInput>
                        <InputEmail
                            autoCapitalize={'none'}
                            autoComplete={'email'}
                            autoCorrect={false}
                            blurOnSubmit={false}
                            editable={!logged}
                            keyboardType={'email-address'}
                            logged={logged}
                            onChangeText={(text: string) => setEmail(text)}
                            onSubmitEditing={() => passwordRef.current?.focus()}
                            placeholder='Email'
                            placeholderTextColor={theme.colors.gray}
                            returnKeyType={'next'}
                            value={email}
                        />
                        <Ionicons
                            name='mail-outline'
                            size={18}
                            color={theme.colors.gray}
                        />
                    </LineInput>
                    <LineInput>
                        <InputPassword
                            editable={!logged}
                            logged={logged}
                            onChangeText={(text: string) => setPassword(text)}
                            onSubmitEditing={() => Keyboard.dismiss()}
                            placeholder='Senha'
                            placeholderTextColor={theme.colors.gray}
                            ref={passwordRef}
                            secureTextEntry={!showPassword}
                        />
                        <TouchableWithoutFeedback onPress={() => setShowPassword(!showPassword)}>
                            <Ionicons
                                name={showPassword ? 'lock-open-outline' : 'lock-closed-outline'}
                                size={18}
                                color={theme.colors.gray}
                            />
                        </TouchableWithoutFeedback>
                    </LineInput>
                </AreaInput>
                {
                    logged ? <Logout /> : <Login />
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
});
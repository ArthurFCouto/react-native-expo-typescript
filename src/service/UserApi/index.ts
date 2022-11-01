import Api from '..';
import { ErrorApi, User } from '../types';

class UserApi {
    async login(email: string, password: string): Promise<User | ErrorApi> {
        const { data } = await Api.post('/login', {
            email: email,
            senha: password,
        }).catch((error) => error.response);
        return data;
    }

    async singUp(nomeUsuario: string, emailUsuario: string, telefoneUsuario: string, senhaUsuario: string): Promise<User | ErrorApi> {
        const { data } = await Api.post('/usuario', {
            nomeUsuario,
            emailUsuario,
            telefoneUsuario,
            senhaUsuario
        }).catch((error) => error.response);
        return data;
    }
}

export default new UserApi();
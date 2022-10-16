import Api from '..';

class UserApi {
    async login(email: string, password: string) {
        const { data } = await Api.post('/login', {
            email: email,
            senha: password,
        }).catch((error) => error.response);
        return data;
    }

    async singUp( nomeUsuario: string, emailUsuario: string, telefoneUsuario: string, senhaUsuario: string) {
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
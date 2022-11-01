import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../context/user';

class userStorage {
    keyUser = 'userLocalStorage';

    async getUserLocalStorage(): Promise<UserContext | null> {
        try {
            const user = await AsyncStorage.getItem(this.keyUser) as string;
            const userJson = JSON.parse(user) as UserContext;
            return userJson;
        } catch {
            return null;
        }
    }

    async saveUserLocalStorage(user: UserContext) {
        await AsyncStorage.setItem(this.keyUser, JSON.stringify(user));
    }

    async deleteUserLocalStorage() {
        return await AsyncStorage.setItem(this.keyUser, 'null');
    }
}

export default new userStorage();
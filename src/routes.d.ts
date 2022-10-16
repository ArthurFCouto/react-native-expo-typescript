import '@react-navigation/native';
import { Product } from './service/types';

declare module '@react-navigation/native' {
    export interface RouterPropsParams {
        [params: string]: {
            nameSearch?: string,
            product?: Product
        }
    }
}
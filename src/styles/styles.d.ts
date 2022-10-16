import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            primary: string,
            secondary: string,
            gray: string,
            dark: string,
            button: string,
            light: string,
            bgPrimary: string,
            bgSecondary: string,
            bgTabBar: string,
        },
        statusBar: {
            style: 'auto' | 'inverted' | 'light' | 'dark'
        },
        isDark: boolean
    }
}
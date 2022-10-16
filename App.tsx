import { ThemeProvider } from 'styled-components';
import { useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Routes from './src/Routes';
import themes from './src/styles/themes';
import AlertProvider from './src/context/alert';
import Alert from './src/components/Alert';
import AppProvider from './src/context/appContext';

export default function App() {
  const deviceTheme = useColorScheme();
  const theme = themes[deviceTheme || 'dark'];

  return (
    <ThemeProvider theme={theme}>
      <AppProvider>
        <StatusBar style={theme.statusBar.style} />
        <AlertProvider>
          <Routes />
          <Alert />
        </AlertProvider>
      </AppProvider>
    </ThemeProvider>
  );
}
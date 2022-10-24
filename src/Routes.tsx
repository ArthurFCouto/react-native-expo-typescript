import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

import Account from './screens/Account';
import Details from './screens/Details';
import Home from './screens/Home';
import Search from './screens/Search';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                animation: 'slide_from_right',
                customAnimationOnGesture: true,
                headerBackTitle: 'Voltar',
                headerShown: false,
                gestureEnabled: true,
                gestureDirection: 'horizontal'
            }}>
            <Stack.Screen
                name='StackHome'
                component={Home}
            />
            <Stack.Screen
                name='StackDetails'
                component={Details}
            />
            <Stack.Screen
                name='StackSearch'
                component={Search}
            />
        </Stack.Navigator>
    )
}

export default function Routes() {
    const theme = useTheme();
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarActiveTintColor: theme.colors.button,
                    tabBarInactiveTintColor: theme.colors.primary,
                    headerShown: false,
                    tabBarShowLabel: true,
                    tabBarLabelPosition: 'below-icon',
                    tabBarHideOnKeyboard: false,
                    tabBarStyle: {
                        backgroundColor: theme.colors.bgTabBar
                    }
                })}
            >
                <Tab.Screen
                    name='Home'
                    component={StackNavigator}
                    options={{
                        tabBarIcon: ({ focused, color, size }) => {
                            return <Ionicons
                                name={focused ? 'home' : 'home-outline'}
                                color={color}
                                size={size} />
                        }
                    }} />
                <Tab.Screen
                    name='Account'
                    component={Account}
                    options={{
                        tabBarIcon: ({ focused, color, size }) => {
                            return <Ionicons
                                name={focused ? 'person' : 'person-outline'}
                                color={color}
                                size={size} />
                        }
                    }} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}
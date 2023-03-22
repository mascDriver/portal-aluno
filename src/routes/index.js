import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import  Ionicons  from '@expo/vector-icons/Ionicons'
import Welcome from "../pages/Welcome";
import SignIn from "../pages/SignIn";
import Home from "../pages/Home";
import Matriz from "../pages/Matriz";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export function RoutesBottom() {
    return (
        <Tab.Navigator
        screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle:{
                backgroundColor: '#006d40',
            }
        }}
        >
            <Tab.Screen
                name="Inicio"
                component={Home}
                options={{
                    headerShown: false,
                    tabBarIcon:({color, size, focused}) =>{
                        return <Ionicons name='home' size={30} color='#dddddd'/>
                    }

                }}
            />
            <Tab.Screen
                name="Matriz"
                component={Matriz}
                options={{
                    headerShown: false,
                    tabBarIcon:({color, size, focused}) =>{
                        return <Ionicons name='school' size={30} color='#dddddd'/>
                    }

                }}
            />
        </Tab.Navigator>
    );
}

export function Routes() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Welcome"
                component={Welcome}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SignIn"
                component={SignIn}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Home"
                component={RoutesBottom}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}
import { RegisterModule } from 'modules/register/RegisterModule';
import { LoginModule } from 'modules/login/LoginModule';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const NoAuthNav = () => {
    return (
        <NavigationContainer
            theme={{
                dark: true,
                colors,
            }}
        >
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name='Login' component={LoginModule} />
                <Stack.Screen name='Register' component={RegisterModule} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const colors = {
    primary: 'black',
    background: 'black',
    card: 'black',
    text: 'grey',
    border: '#2756B1',
    notification: 'white',
};

export { NoAuthNav };

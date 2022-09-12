import { RegisterModule } from 'modules/register/RegisterModule';
import { LoginModule } from 'modules/login/LoginModule';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const NoAuthNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name='Register' component={RegisterModule} />
                <Stack.Screen name='Login' component={LoginModule} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export { NoAuthNavigation };

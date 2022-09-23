import React from 'react';
import { Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { UserProfilePanel } from 'modules/user-profile-panel/UserProfilePanel';
import { EditNick } from 'modules/user-edit/EditNick';
import { EditCurrency } from 'modules/user-edit/EditCurrency';

const Stack = createNativeStackNavigator();

const Profile = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerRight: () => <Text>Test</Text>,
                headerTitleStyle: { color: '#2756B1' },
            }}
        >
            <Stack.Screen name='Account' component={UserProfilePanel} />
            <Stack.Screen name='Edit Nick' component={EditNick} />
            <Stack.Screen name='Edit Currency' component={EditCurrency} />
        </Stack.Navigator>
    );
};

export { Profile };

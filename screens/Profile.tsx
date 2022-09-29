import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { UserProfilePanel } from 'modules/user-profile-panel/UserProfilePanel';
import { EditNick } from 'modules/user-profile-panel/EditNick';
import { EditCurrency } from 'modules/user-profile-panel/EditCurrency';
import { CreateBroker, EditBroker } from 'modules/broker-accounts/components';

const Stack = createNativeStackNavigator();

const Profile = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleStyle: { color: '#2756B1' },
                
            }}
        >
            <Stack.Screen name='Account' component={UserProfilePanel} />
            <Stack.Screen name='Edit Nick' component={EditNick} />
            <Stack.Screen name='Edit Currency' component={EditCurrency} />
            <Stack.Screen name='Create Broker' component={CreateBroker} />
            <Stack.Screen name='Edit Broker' component={EditBroker} />
        </Stack.Navigator>
    );
};

export { Profile };

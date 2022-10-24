import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { UserProfilePanel } from 'modules/user-profile-panel/UserProfilePanel';
import {
    EditNick,
    EditPin,
    EditCurrency,
} from 'modules/user-profile-panel/forms';
import { CreateBroker, EditBroker } from 'modules/broker-accounts/forms';
import { ContactAuthor } from 'modules/contact-author/ContactAuthor';

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
            <Stack.Screen name='Edit Pin' component={EditPin} />
            <Stack.Screen name='Create Broker' component={CreateBroker} />
            <Stack.Screen name='Edit Broker' component={EditBroker} />
            <Stack.Screen name='Send Email' component={ContactAuthor} />
        </Stack.Navigator>
    );
};

export { Profile };

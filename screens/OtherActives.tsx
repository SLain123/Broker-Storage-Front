import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ActiveList } from 'modules/active-list/ActiveList';
import { CreateActiveForm } from 'modules/active-list/forms';

const Stack = createNativeStackNavigator();

const OtherActives = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleStyle: { color: '#2756B1' },
                headerBackTitleVisible: false,
            }}
        >
            <Stack.Screen name='Actives' component={ActiveList} />
            <Stack.Screen name='Active Details' component={ActiveList} />
            <Stack.Screen name='Create Active' component={CreateActiveForm} />
        </Stack.Navigator>
    );
};

export { OtherActives };

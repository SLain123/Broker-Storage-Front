import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ActiveList } from 'modules/active-list/ActiveList';
import { CreateActiveForm } from 'modules/active-list/forms';
import { CreatePaymentForm } from 'modules/dividend/form/CreatePaymentForm';
import { ActiveDetails } from 'modules/active-details/ActiveDetails';
import { EditActiveForm } from 'modules/active-list/forms/EditActiveForm';

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
            <Stack.Screen name='Active Details' component={ActiveDetails} />
            <Stack.Screen name='Create Active' component={CreateActiveForm} />
            <Stack.Screen name='Add Payment' component={CreatePaymentForm} />
            <Stack.Screen name='Edit Active' component={EditActiveForm} />
        </Stack.Navigator>
    );
};

export { OtherActives };

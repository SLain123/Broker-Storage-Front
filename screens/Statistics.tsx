import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StatisticList } from 'modules/statistics/StatisticList';

const Stack = createNativeStackNavigator();

const Statistic = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleStyle: { color: '#2756B1' },
                headerBackTitleVisible: false,
            }}
        >
            <Stack.Screen name='Statistic List' component={StatisticList} />
        </Stack.Navigator>
    );
};

export { Statistic };

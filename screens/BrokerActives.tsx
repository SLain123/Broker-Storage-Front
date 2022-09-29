import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StockBrokerList } from 'modules/stock-broker-list/StockBrokerList';

const Stack = createNativeStackNavigator();

const BrokerActives = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleStyle: { color: '#2756B1' },
                headerBackTitleVisible: false,
            }}
        >
            <Stack.Screen name='Brokers' component={StockBrokerList}  />
            <Stack.Screen name='Stock List' component={StockBrokerList}  />
        </Stack.Navigator>
    );
};

export { BrokerActives };

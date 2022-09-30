import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StockBrokerList } from 'modules/stock-broker-list/StockBrokerList';
import { StockList } from 'modules/stock-list/StockList';

const Stack = createNativeStackNavigator();

const BrokerActives = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleStyle: { color: '#2756B1' },
                headerBackTitleVisible: false,
            }}
        >
            <Stack.Screen name='Brokers' component={StockBrokerList} />
            <Stack.Screen name='Stock List' component={StockList} />
            <Stack.Screen name='Stock Details' component={StockList} />
        </Stack.Navigator>
    );
};

export { BrokerActives };

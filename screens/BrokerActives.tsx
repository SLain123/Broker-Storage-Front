import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StockBrokerList } from 'modules/stock-broker-list/StockBrokerList';
import { StockList } from 'modules/stock-list/StockList';
import { CreateStockForm } from 'modules/stock-list/components';
import { StockDetails } from 'modules/stock-details/StockDetails';

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
            <Stack.Screen name='Stock Details' component={StockDetails} />
            <Stack.Screen name='Create Stock' component={CreateStockForm} />
        </Stack.Navigator>
    );
};

export { BrokerActives };

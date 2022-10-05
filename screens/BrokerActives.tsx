import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StockBrokerList } from 'modules/stock-broker-list/StockBrokerList';
import { StockList } from 'modules/stock-list/StockList';
import { CreateStockForm, AddStockForm } from 'modules/stock-list/forms';
import { StockDetails } from 'modules/stock-details/StockDetails';
import { CreateDividendForm } from 'modules/dividend/form/CreateDividendForm';

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
            <Stack.Screen name='Add Stock' component={AddStockForm} />
            <Stack.Screen name='Add Dividend' component={CreateDividendForm} />
        </Stack.Navigator>
    );
};

export { BrokerActives };

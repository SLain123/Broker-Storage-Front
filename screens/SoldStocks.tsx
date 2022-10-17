import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SoldStockList } from 'modules/sold-stocks/SoldStockList';

const Stack = createNativeStackNavigator();

const SoldStocks = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleStyle: { color: '#2756B1' },
                headerBackTitleVisible: false,
            }}
        >
            <Stack.Screen name='Sold List' component={SoldStockList} />
        </Stack.Navigator>
    );
};

export { SoldStocks };

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { BrokerActives } from 'screens/BrokerActives';
import { SoldStocks } from 'screens/SoldStocks';
import { OtherActives } from 'screens/OtherActives';
import { Statistic } from 'screens/Statistics';
import { Profile } from 'screens/Profile';

import BrokerIcon from 'assets/icons/bag.svg';
import SoldIcon from 'assets/icons/sold.svg';
import ActivesIcon from 'assets/icons/newspaper.svg';
import StatIcon from 'assets/icons/stat.svg';
import ProfileIcon from 'assets/icons/profile.svg';

const Tab = createBottomTabNavigator();

const AuthNav = () => {
    return (
        <NavigationContainer theme={{ dark: true, colors }}>
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: '#2756B1',
                    tabBarStyle: {
                        borderTopWidth: 2,
                        borderTopColor: '#2756B1',
                        height: 60,
                    },
                    headerShown: false,
                }}
            >
                <Tab.Screen
                    name='Broker Actives'
                    component={BrokerActives}
                    options={{
                        tabBarIcon: () => <BrokerIcon width={55} />,
                    }}
                />
                <Tab.Screen
                    name='Sold Stocks'
                    component={SoldStocks}
                    options={{
                        tabBarIcon: () => <SoldIcon width={55} height={28} />,
                    }}
                />
                <Tab.Screen
                    name='Other Actives'
                    component={OtherActives}
                    options={{
                        tabBarIcon: () => <ActivesIcon width={55} />,
                    }}
                />
                <Tab.Screen
                    name='Statistics'
                    component={Statistic}
                    options={{
                        tabBarIcon: () => <StatIcon width={55} />,
                    }}
                />
                <Tab.Screen
                    name='Profile'
                    component={Profile}
                    options={{
                        tabBarIcon: () => <ProfileIcon width={55} />,
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

const colors = {
    primary: 'black',
    background: 'black',
    card: 'black',
    text: 'grey',
    border: '#2756B1',
    notification: 'white',
};

export { AuthNav };

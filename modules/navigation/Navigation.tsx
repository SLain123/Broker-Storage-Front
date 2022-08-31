import { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { BrokerActives } from 'screens/BrokerActives';
import { OtherActives } from 'screens/OtherActives';

import BrokerIcon from 'assets/icons/bag.svg';
import ActivesIcon from 'assets/icons/newspaper.svg';
import StatIcon from 'assets/icons/stat.svg';
import MoreIcon from 'assets/icons/more.svg';

const Tab = createBottomTabNavigator();

const Navigation: FC = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: '#2756B1',
                    tabBarStyle: {
                        backgroundColor: 'black',
                        borderTopWidth: 2,
                        borderTopColor: '#2756B1',
                    },
                }}
            >
                <Tab.Screen
                    name='Broker Actives'
                    component={BrokerActives}
                    options={{
                        tabBarIcon: () => <BrokerIcon width={50} />,
                    }}
                />
                <Tab.Screen
                    name='Other Actives'
                    component={OtherActives}
                    options={{
                        tabBarIcon: () => <ActivesIcon width={50} />,
                    }}
                />
                <Tab.Screen
                    name='Statistics'
                    component={BrokerActives}
                    options={{
                        tabBarIcon: () => <StatIcon width={50} />,
                    }}
                />
                <Tab.Screen
                    name='More'
                    component={OtherActives}
                    options={{
                        tabBarIcon: () => <MoreIcon width={50} />,
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export { Navigation };

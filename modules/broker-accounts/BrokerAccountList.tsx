import React, { FC } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

import { IBroker } from 'types/brokerTypes';
import { BrokerAccountItem } from './components/BrokerAccountItem';

export interface IBrokerAccountList {
    brokerAccounts: IBroker[];
}

const BrokerAccountList: FC<IBrokerAccountList> = ({ brokerAccounts }) => {
    const navigation = useNavigation<NavigationProp<any, any>>();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your brokers:</Text>
            <View style={styles.headerBlock}>
                <Text style={styles.headerText}>Broker Name</Text>
                <Text style={styles.headerText}>
                    Sum Balance, All Actives + Cash
                </Text>
            </View>
            {brokerAccounts.length ? (
                brokerAccounts.map(
                    ({ _id, title, currency, sumBalance, status, cash }) => (
                        <BrokerAccountItem
                            key={_id}
                            _id={_id}
                            title={title}
                            currency={currency}
                            sumBalance={sumBalance}
                            status={status}
                            cash={cash}
                        />
                    ),
                )
            ) : (
                <Text style={styles.message}>
                    Right now you don't have any brokers. Please, create new
                    broker account using the button below
                </Text>
            )}

            <TouchableOpacity
                style={styles.addBtn}
                activeOpacity={0.5}
                onPress={() => navigation.navigate('Create Broker')}
            >
                <Text style={styles.addText}>Add New Broker</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 46,
        marginBottom: 46,
        borderBottomColor: '#2756B1',
        borderBottomWidth: 1,
        borderTopColor: '#2756B1',
        borderTopWidth: 1,
    },
    title: {
        color: 'white',
        fontSize: 20,
        marginTop: 16,
    },
    headerBlock: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
        padding: 8,
        borderBottomColor: 'rgba(255,255,255,0.7)',
        borderBottomWidth: 1,
    },
    headerText: {
        color: 'white',
        fontSize: 12,
    },
    addBtn: {
        marginTop: 24,
        marginBottom: 16,
        backgroundColor: '#2756B1',
        padding: 16,
        borderRadius: 4,
    },
    addText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
    message: {
        color: 'white',
        fontSize: 16,
        marginTop: 16,
    },
});

export { BrokerAccountList };

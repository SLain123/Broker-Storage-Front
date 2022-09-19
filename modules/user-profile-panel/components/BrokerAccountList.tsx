import React, { FC } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { IBroker } from 'types/brokerTypes';
import { BrokerAccountItem } from './BrokerAccountItem';

export interface IBrokerAccountList {
    brokerAccounts: IBroker[];
}

const BrokerAccountList: FC<IBrokerAccountList> = ({ brokerAccounts }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your brokers:</Text>

            {brokerAccounts.length ? (
                brokerAccounts.map(
                    ({ _id, title, currency, sumBalance, status }) => {
                        return (
                            <BrokerAccountItem
                                key={_id}
                                title={title}
                                currency={currency}
                                sumBalance={sumBalance}
                                status={status}
                                onPress={() => console.log(_id)}
                            />
                        );
                    },
                )
            ) : (
                <Text style={styles.message}>
                    Right now you don't have any brokers. Please, create new
                    broker account using the button below
                </Text>
            )}

            <TouchableOpacity style={styles.addBtn} activeOpacity={0.5}>
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

import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { IBroker } from 'types/brokerTypes';

import RightArrow from 'assets/icons/right-arrow.svg';

export interface IBrokerAccountItem
    extends Omit<IBroker, '_id' | 'sumStocks' | 'cash'> {
    onPress: () => void;
}

const BrokerAccountItem: FC<IBrokerAccountItem> = ({
    title,
    currency,
    sumBalance,
    status,
    onPress,
}) => {
    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={0.5}
            onPress={onPress}
        >
            <Text style={styles.title}>{title}</Text>
            {status === 'active' ? (
                <Text style={styles.cash}>
                    {sumBalance} {currency.ticker}
                </Text>
            ) : (
                <Text style={styles.inactive}>Inactive</Text>
            )}
            <RightArrow width={25} height={25} style={styles.arrow} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 8,
        borderBottomColor: 'rgba(255,255,255,0.3)',
        borderBottomWidth: 1,
    },
    title: {
        color: 'white',
        fontSize: 16,
        maxWidth: '60%',
        height: 20,
    },
    cash: {
        color: '#2756B1',
        fontSize: 14,
        marginLeft: 'auto',
    },
    inactive: {
        color: '#A30000',
        marginLeft: 'auto',
        fontSize: 14,
    },
    arrow: { marginLeft: 16 },
});

export { BrokerAccountItem };

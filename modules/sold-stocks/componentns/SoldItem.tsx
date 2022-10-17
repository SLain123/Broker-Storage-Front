import React, { FC } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

import { ICurrency } from 'types/currencyTypes';
import { moneyFormater } from 'utils/formaters';
import { IBroker } from 'types/brokerTypes';

export interface ISoldItem {
    _id: string;
    broker: IBroker;
    currency: ICurrency;
    profit: number;
    title: string;
    fee: number;
}

const SoldItem: FC<ISoldItem> = ({
    _id,
    broker,
    currency,
    title,
    profit,
    fee,
}) => {
    const navigation = useNavigation<NavigationProp<any, any>>();

    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={0.5}
            onPress={() =>
                navigation.navigate('Stock Details', { stockId: _id })
            }
        >
            <View style={styles.headerBlock}>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.profitBlock}>
                    <Text style={styles.infoText}>Profit:</Text>
                    <Text style={styles.profit}>
                        {moneyFormater(profit)} {currency.ticker}
                    </Text>
                </View>
            </View>

            <View style={styles.bodyBlock}>
                <Text style={styles.infoText}>Broker:</Text>
                <Text style={styles.infoValue}>{broker.title}</Text>
            </View>
            <View style={styles.bodyBlock}>
                <Text style={styles.infoText}>Broker Status:</Text>
                <Text style={styles.infoValue}>{broker.status}</Text>
            </View>
            <View style={styles.bodyBlock}>
                <Text style={styles.infoText}>Broker Fee:</Text>
                <Text style={styles.infoValue}>
                    {moneyFormater(fee)} {currency.ticker}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        borderBottomColor: 'rgba(255,255,255,0.5)',
        borderWidth: 1,
    },
    headerBlock: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: '#2756B1',
        paddingBottom: 8,
        marginBottom: 8,
        borderWidth: 1,
    },
    bodyBlock: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        color: 'white',
        fontSize: 18,
    },
    profitBlock: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 140,
    },
    profit: { color: 'white' },
    infoText: { color: '#2756B1' },
    infoValue: { color: '#2756B1', fontSize: 16 },
});

export { SoldItem };

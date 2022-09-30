import React, { FC } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

import { StockStatus } from 'types/stockTypes';
import { ICurrency } from 'types/currencyTypes';
import { moneyFormater } from 'utils/formaters';
import { IScreenProps } from 'types/commonTypes';

export interface IStockItem extends IScreenProps {
    _id: string;
    status: StockStatus;
    title: string;
    restCount: number;
    deltaBuy: number;
    fee: number;
    currency: ICurrency;
}

const StockItem: FC<IStockItem> = ({
    _id,
    status,
    title,
    restCount,
    deltaBuy,
    fee,
    currency,
    navigation,
}) => {
    if (status !== 'active') {
        return null;
    }

    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={0.5}
            onPress={() => navigation.navigate('Stock Details', { id: _id })}
        >
            <View style={styles.headerBlock}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.count}>{restCount} stocks</Text>
            </View>

            <View style={styles.bodyBlock}>
                <Text style={styles.infoText}>
                    Average Price of the Stocks:
                </Text>
                <Text style={styles.infoValue}>
                    {moneyFormater(deltaBuy)} {currency.ticker}
                </Text>
            </View>
            <View style={styles.bodyBlock}>
                <Text style={styles.infoText}>Total Price of the Stocks:</Text>
                <Text style={styles.infoValue}>
                    {moneyFormater(deltaBuy * restCount + fee)}{' '}
                    {currency.ticker}
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
    count: { color: 'white', fontSize: 16 },
    infoText: { color: '#2756B1' },
    infoValue: { color: '#2756B1', fontSize: 16 },
});

export { StockItem };

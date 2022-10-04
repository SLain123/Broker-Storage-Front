import React, { FC } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { IHistory } from 'types/stockTypes';
import { moneyFormater } from 'utils/formaters';

export interface IStockHistoryItem extends Omit<IHistory, '_id'> {}

const StockHistoryItem: FC<IStockHistoryItem> = ({
    action,
    count,
    date,
    fee,
    pricePerSingle,
}) => {
    const newDate = new Date(date);
    const formatedDate = `${newDate.getDate()}.${newDate.getMonth()}.${newDate.getFullYear()}`;

    const actionStyle = action === 'buy' ? styles.buy : styles.sell;

    return (
        <View style={styles.row}>
            <Text style={styles.text}>{formatedDate}</Text>
            <Text style={{ ...styles.text, ...actionStyle }}>{action}</Text>
            <Text style={styles.text}>{count}</Text>
            <Text style={styles.text}>{moneyFormater(pricePerSingle)}</Text>
            <Text style={styles.text}>
                {moneyFormater(count * pricePerSingle + fee)}
            </Text>
            <Text style={styles.text}>{moneyFormater(fee)}</Text>

            <TouchableOpacity style={styles.btn} activeOpacity={0.5}>
                <Text>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} activeOpacity={0.5}>
                <Text>Remove</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    text: {
        color: 'white',
        padding: 8,
        borderWidth: 1,
        borderColor: '#2756B1',
        width: 105,
        maxWidth: 105,
        height: 35,
    },
    buy: { color: 'green' },
    sell: {
        color: 'red',
    },
    btn: {
        width: 105,
        maxWidth: 105,
        height: 35,
        backgroundColor: 'white',
    },
});

export { StockHistoryItem };

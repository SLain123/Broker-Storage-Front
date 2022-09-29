import React, { FC } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { IBroker } from 'types/brokerTypes';
import { moneyFormater } from 'utils/formaters';
import { IScreenProps } from 'types/commonTypes';

export interface IStockBrokerItem
    extends Omit<IBroker, 'status' | 'sumBalance'>,
        IScreenProps {
    disabled?: boolean;
}

const StockBrokerItem: FC<IStockBrokerItem> = ({
    _id,
    title,
    sumStocks,
    cash,
    currency,
    navigation,
    disabled = false,
}) => {
    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={disabled ? 1 : 0.5}
            onPress={() =>
                !disabled && navigation.navigate('Stock List', { id: _id })
            }
        >
            <Text style={disabled ? styles.disabledName : styles.brokerName}>
                {title}
            </Text>
            <View style={styles.infoBlock}>
                <View style={styles.columns}>
                    <Text style={styles.textInfo}>Total value of stocks:</Text>
                    <Text style={styles.textInfo}>Free cash:</Text>
                </View>
                <View style={styles.columns}>
                    <Text style={styles.textCash}>
                        {moneyFormater(sumStocks)} {currency.ticker}
                    </Text>
                    <Text style={styles.textCash}>
                        {moneyFormater(cash)} {currency.ticker}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        borderColor: 'rgba(255,255,255,0.4)',
        borderBottomWidth: 1,
        paddingTop: 8,
    },
    brokerName: {
        color: 'white',
        fontSize: 20,
        fontWeight: '700',
        maxHeight: 30
    },
    disabledName: {
        color: '#A30000',
        fontSize: 20,
        fontWeight: '700',
    },
    infoBlock: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
        marginBottom: 8,
    },
    columns: {
        display: 'flex',
    },
    textInfo: { color: '#2756B1' },
    textCash: {
        color: '#2756B1',
        textAlign: 'right',
    },
});

export { StockBrokerItem };

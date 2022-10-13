import React, { FC } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { IFeeResult } from 'types/statTypes';
import { moneyFormater } from 'utils/formaters';

const FeeRow: FC<IFeeResult> = ({ fee, currency, broker }) => {
    return (
        <View style={styles.row}>
            <Text style={styles.text}>{broker.title}</Text>
            <Text style={styles.text}>{`${moneyFormater(fee)} ${
                currency.ticker
            }`}</Text>
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
        paddingBottom: 8,
    },
});

export { FeeRow };

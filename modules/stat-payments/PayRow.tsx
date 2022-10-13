import React, { FC } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { IPaymentsResult } from 'types/statTypes';
import { moneyFormater } from 'utils/formaters';

const PayRow: FC<IPaymentsResult> = ({
    title,
    currency,
    allPayments,
    totalAmountOfInvest,
}) => {
    const percentCalc = (allPayments / totalAmountOfInvest) * 100;
    const percentTotal = isNaN(percentCalc) ? 0 : percentCalc;

    return (
        <View style={styles.row}>
            <Text style={styles.text}>{title}</Text>
            <Text style={styles.text}>{`${moneyFormater(allPayments)} ${
                currency.ticker
            }`}</Text>
            <Text style={styles.text}>{`${moneyFormater(
                percentTotal,
            )} %`}</Text>
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
        width: '33%',
    },
});

export { PayRow };

import React, { FC } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { moneyFormater } from 'utils/formaters';

export interface IProfitRow {
    rowData: { [key: string]: string };
}

const ProfitRow: FC<IProfitRow> = ({ rowData }) => {
    return (
        <View style={styles.row}>
            <Text style={styles.text}>{Object.keys(rowData)}</Text>
            <Text style={styles.text}>
                {moneyFormater(Number(Object.values(rowData)))}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 8,
    },
    text: {
        color: 'white',
        paddingTop: 8,
    },
});

export { ProfitRow };

import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface IRowDetail {
    description: string;
    value: string;
}

const RowDetail: FC<IRowDetail> = ({ description, value }) => {
    return (
        <View style={styles.row}>
            <Text style={styles.text}>{description}</Text>
            <Text style={styles.text}>{value}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        padding: 8,
        paddingLeft: 16,
        paddingRight: 16,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    text: { color: 'white', fontSize: 16 },
});

export { RowDetail };

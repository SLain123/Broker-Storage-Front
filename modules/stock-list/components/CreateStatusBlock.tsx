import React, { FC } from 'react';
import { Text, StyleSheet } from 'react-native';

import { ICreateStockRes } from 'types/stockTypes';
import { ICreateStatusBlock } from '../StockType';

const CreateStatusBlock: FC<ICreateStatusBlock> = ({ data, error }) => {
    if (data?.message) {
        return <Text style={styles.success}>{data.message}</Text>;
    }
    const err = error as ICreateStockRes;
    if (error) {
        return err?.data?.errors ? (
            <Text style={styles.error}>{err?.data.errors[0].msg}</Text>
        ) : (
            <Text style={styles.error}>Something was wrong</Text>
        );
    }
    return null;
};

const styles = StyleSheet.create({
    error: { color: '#A30000', padding: 6 },
    success: { color: 'green', padding: 6 },
});

export { CreateStatusBlock };

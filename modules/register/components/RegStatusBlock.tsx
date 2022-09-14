import React, { FC } from 'react';
import { Text, StyleSheet } from 'react-native';

import { IRegResponse } from 'types/authTypes';
import { IStatusBlock } from '../RegisterType';

const RegStatusBlock: FC<IStatusBlock> = ({ data, error }) => {
    if (data?.message) {
        return <Text style={styles.success}>{data.message}</Text>;
    }
    const err = error as IRegResponse;
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
    error: { color: 'red', padding: 6 },
    success: { color: 'green', padding: 6 },
});

export { RegStatusBlock };

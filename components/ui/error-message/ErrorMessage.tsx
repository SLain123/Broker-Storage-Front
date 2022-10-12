import React, { FC } from 'react';
import { Text, StyleSheet } from 'react-native';

export interface IErrorMessage {
    message: string;
}

const ErrorMessage: FC<IErrorMessage> = ({ message }) => {
    return <Text style={styles.error}>{message}</Text>;
};

const styles = StyleSheet.create({
    error: { color: '#A30000', textAlign: 'center', padding: 16 },
});

export { ErrorMessage };

import React, { FC } from 'react';
import { Text, StyleSheet } from 'react-native';

const EmptyListNotification: FC = () => {
    return (
        <Text style={styles.info}>
            The broker doesn't have active stocks or something was wrong while
            downloading data. Make sure that the broker has at least one paper
            in the active state or create a new position using the button Add
            new Stock.
        </Text>
    );
};

const styles = StyleSheet.create({
    info: { color: 'white', fontSize: 16, padding: 12, lineHeight: 24 },
});

export { EmptyListNotification };

import React, { FC } from 'react';
import { ActivityIndicator, StyleSheet, SafeAreaView } from 'react-native';

const BlanketSpinner: FC = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ActivityIndicator size='large' color='white' />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: 'black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export { BlanketSpinner };

import React from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    SafeAreaView,
    Image,
} from 'react-native';

const LoadingPreview = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Image source={require('assets/logo.png')} style={styles.logo} />
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
    logo: {
        marginLeft: 10,
        marginBottom: 48,
        width: 240,
        height: 200,
    },
});

export { LoadingPreview };

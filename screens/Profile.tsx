import React, { FC, useEffect } from 'react';
import { Text, SafeAreaView, StyleSheet } from 'react-native';
import { useGetUserProfileQuery } from 'api/profileApi';

const Profile: FC = () => {
    const { data, error } = useGetUserProfileQuery();

    useEffect(() => {
        console.log(data, error);
    }, [data, error]);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>Pro</Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { paddingTop: 50, paddingLeft: 16, paddingRight: 16 },
    text: { color: 'white' },
});

export { Profile };

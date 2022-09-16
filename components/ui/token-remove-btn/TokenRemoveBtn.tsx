import React, { FC } from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { saveToStore } from 'utils/secureStoreFuncs';
import { useAppDispatch } from 'hooks';
import { setAuthStatus } from 'slice/authSlice';

const TokenRemoveBtn: FC = () => {
    const dispatch = useAppDispatch();

    return (
        <SafeAreaView>
            <TouchableOpacity
                onPress={() => {
                    saveToStore('token', '123');
                    dispatch(setAuthStatus(false));
                }}
            >
                <Text style={styles.text}> Remove token</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    text: {
        color: 'red',
        textAlign: 'center',
    },
});

export { TokenRemoveBtn };

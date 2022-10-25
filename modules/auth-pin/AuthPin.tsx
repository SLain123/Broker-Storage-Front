import React, { useState, FC, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import SimplePin from 'react-native-simple-pin';
import Toast from 'react-native-root-toast';

import { useAppSelector, useAppDispatch } from 'hooks';
import { setPin, getPin, setAuthStatus } from 'slice/authSlice';
import { saveToStore } from 'utils/secureStoreFuncs';

const AuthPin: FC = () => {
    const [resultMessage, setResultMessage] = useState('');

    const dispatch = useAppDispatch();
    const pin = useAppSelector(getPin);

    const onSuccess = () => {
        setResultMessage('Successfully');
        setTimeout(() => {
            dispatch(setPin([]));
        }, 10);
    };

    const onFailure = () => {
        setResultMessage('PIN Code Wrong');
    };

    const exitFromAccount = () => {
        saveToStore('token', '');
        dispatch(setAuthStatus(false));
        dispatch(setPin([]));
    };

    useEffect(() => {
        resultMessage &&
            Toast.show(resultMessage, {
                duration: Toast.durations.SHORT,
                position: Toast.positions.CENTER,
                animation: true,
                backgroundColor:
                    resultMessage === 'Successfully' ? '#2756B1' : '#A30000',
            });
    }, [resultMessage]);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                activeOpacity={0.5}
                style={styles.exitBtn}
                onPress={exitFromAccount}
            >
                <Text style={styles.exitText}>Exit from Account</Text>
            </TouchableOpacity>
            <SimplePin
                pin={pin}
                title='Type your PIN'
                onSuccess={onSuccess}
                onFailure={onFailure}
                titleStyle={styles.title}
                numpadTextStyle={styles.numPad}
                bulletStyle={styles.bullet}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        height: '100%',
    },
    title: {
        fontSize: 20,
        color: 'white',
    },
    numPad: { fontSize: 30, color: 'white' },
    bullet: { fontSize: 30, color: '#2756B1', margin: 16 },
    exitBtn: {
        backgroundColor: '#2756B1',
        padding: 16,
        width: 240,
        borderRadius: 4,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 24,
    },
    exitText: { color: 'white', textAlign: 'center' },
});

export { AuthPin };

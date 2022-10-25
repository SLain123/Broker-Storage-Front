import React, { useState, FC, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import SimplePin from 'react-native-simple-pin';
import Toast from 'react-native-root-toast';

import { useAppSelector, useAppDispatch } from 'hooks';
import { setPin, getPin } from 'slice/authSlice';

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
});

export { AuthPin };

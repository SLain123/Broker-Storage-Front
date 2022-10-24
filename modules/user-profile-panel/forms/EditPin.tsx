import React, { FC, useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import SimplePin from 'react-native-simple-pin';

import { saveToStore, getValueFromStore } from 'utils/secureStoreFuncs';
import { ActionPinPanel } from '../components/ActionPinPanel';

const EditPin: FC = () => {
    const [resultMessage, setResultMessage] = useState('');
    const [pin, setPin] = useState<number[]>([]);
    const [displayChangePanel, setdisplayChangePanel] = useState(true);

    const currentPin = getValueFromStore('pin');
    const navigation = useNavigation<NavigationProp<any, any>>();

    const messageStyle =
        resultMessage === 'PIN Code Saved' ? styles.success : styles.error;

    const savePin = (pin: number[]) => {
        saveToStore('pin', pin.join(''));
        setPin(pin);
        setResultMessage('PIN code saved');
        setTimeout(() => navigation.goBack(), 1500);
    };

    const errorPin = () => {
        pin.length
            ? setResultMessage('PIN Code Wrong')
            : setResultMessage('PIN Code does not Match');
    };

    const cleanPin = () => {
        saveToStore('pin', '');
        setPin([]);
        setResultMessage('');
        setdisplayChangePanel(true);
    };

    const changeFunc = useCallback(() => {
        setdisplayChangePanel(false);
    }, []);

    const disableFunc = useCallback(() => {
        navigation.navigate('Account');
    }, []);

    useEffect(() => {
        currentPin.then((pin) => {
            if (pin) {
                setPin(pin.split('').map(Number));
            }
            setdisplayChangePanel(false);
        });
    }, []);

    useEffect(() => {
        resultMessage && setTimeout(() => setResultMessage(''), 2000);
    }, [resultMessage]);

    if (displayChangePanel) {
        return (
            <ActionPinPanel changeFunc={changeFunc} disableFunc={disableFunc} />
        );
    }

    return (
        <>
            {resultMessage && (
                <Text style={{ ...styles.result, ...messageStyle }}>
                    {resultMessage}
                </Text>
            )}
            <SimplePin
                pin={pin.length ? pin : 4}
                title={pin.length ? 'Type Your Current PIN' : 'Type New PIN'}
                onSuccess={pin.length ? cleanPin : savePin}
                onFailure={errorPin}
                titleStyle={styles.title}
                numpadTextStyle={styles.numPad}
                bulletStyle={styles.bullet}
            />
        </>
    );
};

const styles = StyleSheet.create({
    result: {
        position: 'relative',
        marginLeft: 'auto',
        marginRight: 'auto',
        top: '45%',
        fontSize: 26,
    },
    success: { color: 'green' },
    error: { color: '#A30000' },
    title: {
        fontSize: 20,
        color: 'white',
    },
    numPad: { fontSize: 30, color: 'white' },
    bullet: { fontSize: 30, color: '#2756B1', margin: 16 },
});

export { EditPin };

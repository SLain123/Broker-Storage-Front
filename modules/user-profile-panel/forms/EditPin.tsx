import React, { FC, useState, useEffect, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import SimplePin from 'react-native-simple-pin';
import Toast from 'react-native-root-toast';

import { saveToStore, getValueFromStore } from 'utils/secureStoreFuncs';
import { ActionPinPanel } from '../components/ActionPinPanel';

const EditPin: FC = () => {
    const [resultMessage, setResultMessage] = useState('');
    const [pin, setPin] = useState<number[]>([]);
    const [displayChangePanel, setdisplayChangePanel] = useState(true);

    const currentPin = getValueFromStore('pin');
    const navigation = useNavigation<NavigationProp<any, any>>();

    const savePin = (pin: number[]) => {
        saveToStore('pin', pin.join(''));
        setPin(pin);
        setResultMessage('PIN code saved');
        setTimeout(() => navigation.goBack(), 10);
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
        resultMessage &&
            Toast.show(resultMessage, {
                duration: Toast.durations.SHORT,
                position: Toast.positions.CENTER,
                animation: true,
                backgroundColor:
                    resultMessage === 'PIN code saved' ? '#2756B1' : '#A30000',
            });
    }, [resultMessage]);

    if (displayChangePanel) {
        return (
            <ActionPinPanel changeFunc={changeFunc} disableFunc={disableFunc} />
        );
    }

    return (
        <SimplePin
            pin={pin.length ? pin : 4}
            title={pin.length ? 'Type Your Current PIN' : 'Type New PIN'}
            onSuccess={pin.length ? cleanPin : savePin}
            onFailure={errorPin}
            titleStyle={styles.title}
            numpadTextStyle={styles.numPad}
            bulletStyle={styles.bullet}
        />
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        color: 'white',
    },
    numPad: { fontSize: 30, color: 'white' },
    bullet: { fontSize: 30, color: '#2756B1', margin: 16 },
});

export { EditPin };

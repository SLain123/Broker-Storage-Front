import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { IBroker } from 'types/brokerTypes';
import { IScreenProps } from 'types/commonTypes';

import EditIcon from 'assets/icons/edit.svg';
import ActiveIcon from 'assets/icons/shutdown-blue.svg';
import DeactiveIcon from 'assets/icons/shutdown-red.svg';

export interface IBrokerActionPanel
    extends IScreenProps,
        Omit<IBroker, 'sumStocks' | 'sumBalance'> {
    closeBottomModal: () => void;
    openChangeModal: () => void;
}

const BrokerActionPanel: FC<IBrokerActionPanel> = ({
    _id,
    title,
    status,
    cash,
    currency,
    navigation,
    closeBottomModal,
    openChangeModal,
}) => {
    const changeBrokerData = () =>
        navigation.navigate('Edit Broker', {
            _id,
            title,
            status,
            currency,
            cash,
        });

    return (
        <View style={styles.container}>
            {status === 'active' && (
                <TouchableOpacity style={styles.btn} onPress={changeBrokerData}>
                    <EditIcon width='20%' height='50%' />
                    <Text style={styles.btnText}>Edit Broker</Text>
                </TouchableOpacity>
            )}

            <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                    openChangeModal();
                    closeBottomModal();
                }}
            >
                {status === 'active' ? (
                    <>
                        <DeactiveIcon width='20%' height='50%' />
                        <Text style={styles.btnDeactText}>
                            Deactivate Broker
                        </Text>
                    </>
                ) : (
                    <>
                        <ActiveIcon width='20%' height='50%' />
                        <Text style={styles.btnText}>Activate Broker</Text>
                    </>
                )}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 24,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 'auto',
        marginBottom: 'auto',
    },
    btn: {
        width: '45%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: '#2756B1',
        marginTop: 8,
    },
    btnDeactText: {
        color: '#A30000',
        marginTop: 8,
    },
});

export { BrokerActionPanel };

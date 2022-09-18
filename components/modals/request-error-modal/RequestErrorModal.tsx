import React, { FC } from 'react';
import { StyleSheet, Text, Modal, View, TouchableOpacity } from 'react-native';
import * as Updates from 'expo-updates';

export interface IRequestErrorModal {
    visible: boolean;
    message?: string;
}

const RequestErrorModal: FC<IRequestErrorModal> = ({ visible, message }) => {
    const reloadApp = async () => {
        await Updates.reloadAsync();
    };

    return (
        <Modal animationType='fade' transparent visible={visible}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.title}>Something was wrong...</Text>
                    {message && <Text style={styles.text}>{message}</Text>}

                    <TouchableOpacity style={styles.btn} onPress={reloadApp}>
                        <Text style={styles.text}>REBOOT</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 4,
        margin: 16,
    },
    title: { color: 'red', textAlign: 'center', fontSize: 18 },
    text: { color: 'red', textAlign: 'center' },
    btn: {
        backgroundColor: 'black',
        padding: 8,
        width: 100,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 8,
        borderRadius: 4,
    },
});

export { RequestErrorModal };

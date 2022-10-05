import React, { FC } from 'react';
import { StyleSheet, Text, Modal, View, TouchableOpacity } from 'react-native';

export interface IRemoveStock {
    isVisbleRemoveModal: boolean;
    closeModal: () => void;
}

const RemoveStock: FC<IRemoveStock> = ({ isVisbleRemoveModal, closeModal }) => {
    return (
        <Modal animationType='fade' transparent visible={isVisbleRemoveModal}>
            <TouchableOpacity style={styles.blanket} onPress={closeModal} />
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text>123</Text>
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
    blanket: {
        position: 'absolute',
        zIndex: 9,
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
    },
    content: {
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 4,
        margin: 16,
    },
});

export { RemoveStock };

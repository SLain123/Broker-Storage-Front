import React, { FC, ReactElement } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity } from 'react-native';

export interface IStandartModal {
    visible: boolean;
    closeModal: () => void;
    children: ReactElement | ReactElement[];
}

const StandartModal: FC<IStandartModal> = ({
    visible,
    closeModal,
    children,
}) => {
    return (
        <Modal animationType='fade' transparent visible={visible}>
            <TouchableOpacity style={styles.blanket} onPress={closeModal} />
            <View style={styles.content}>{children}</View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    blanket: {
        position: 'absolute',
        zIndex: 9,
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255,255,255, 0.4)',
    },
    content: {
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 4,
        zIndex: 10,
        margin: 16,
        position: 'absolute',
        top: '40%',
        left: 16,
    },
});

export { StandartModal };

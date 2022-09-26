import React, { FC, ReactElement } from 'react';
import { Modal, View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export interface ISlideBottomModal {
    isVisible: boolean;
    closeModalFunc: () => void;
    children: ReactElement;
    height?: number | string;
}

const SlideBottomModal: FC<ISlideBottomModal> = ({
    isVisible,
    closeModalFunc,
    children,
    height = '15%',
}) => {
    return (
        <Modal animationType='slide' transparent={true} visible={isVisible}>
            <TouchableOpacity style={styles.blanket} onPress={closeModalFunc} />
            <View style={{ height, marginTop: 'auto' }}>
                <View style={styles.content}>{children}</View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 8,
        zIndex: 10,
    },
    blanket: {
        position: 'absolute',
        zIndex: 9,
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
    },
});

export { SlideBottomModal };

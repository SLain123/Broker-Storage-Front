import React, { FC, ReactElement } from 'react';
import { Modal, View, TouchableOpacity, StyleSheet } from 'react-native';

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
}) => {
    return (
        <Modal animationType='slide' transparent={true} visible={isVisible}>
            <View style={styles.panel}>
                <View style={styles.content}>{children}</View>
            </View>
            <TouchableOpacity style={styles.blanket} onPress={closeModalFunc} />
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
    panel: { height: '15%', marginTop: 'auto' },
    blanket: {
        position: 'absolute',
        zIndex: 9,
        left: 0,
        top: 0,
        width: '100%',
        height: '85%',
    },
});

export { SlideBottomModal };

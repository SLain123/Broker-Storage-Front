import React, { FC, ReactElement } from 'react';
import { StyleSheet } from 'react-native';
import Overlay from 'react-native-modal-overlay';

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
        <Overlay
            visible={visible}
            onClose={closeModal}
            closeOnTouchOutside
            childrenWrapperStyle={styles.window}
            containerStyle={styles.overlay}
        >
            {children}
        </Overlay>
    );
};

const styles = StyleSheet.create({
    overlay: { backgroundColor: 'rgba(255, 255, 255, 0.7)' },
    window: { borderRadius: 4 },
});

export { StandartModal };

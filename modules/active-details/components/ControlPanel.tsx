import React, { FC, useState, useCallback } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

import { StandartModal } from 'components/modals';
import { ArchiveWindow } from './ArchiveWindow';
import { RemoveWindow } from './RemoveWindow';
import { ActiveStatusType } from 'types/activeTypes';

export interface IControlPanel {
    id: string;
    title: string;
    status: ActiveStatusType;
}

const ControlPanel: FC<IControlPanel> = ({ id, title, status }) => {
    const navigation = useNavigation<NavigationProp<any, any>>();

    const [isVisibleArchiveWindow, setVisibleArchiveWindow] = useState(false);
    const [isVisibleRemoveWindow, setVisibleRemoveWindow] = useState(false);

    const closeArchiveWindow = useCallback(() => {
        setVisibleArchiveWindow(false);
    }, []);

    const closeRemoveWindow = useCallback(() => {
        setVisibleRemoveWindow(false);
    }, []);

    return (
        <>
            {status === 'active' && (
                <>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={styles.btn}
                        onPress={() =>
                            navigation.navigate('Add Payment', { activeId: id })
                        }
                    >
                        <Text style={styles.btnText}>Add Payment</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={styles.btn}
                        onPress={() =>
                            navigation.navigate('Edit Active', { id })
                        }
                    >
                        <Text style={styles.btnText}>Edit Active</Text>
                    </TouchableOpacity>
                </>
            )}
            <TouchableOpacity
                activeOpacity={0.5}
                style={status === 'active' ? styles.redBtn : styles.btn}
                onPress={() => setVisibleArchiveWindow(true)}
            >
                <Text style={styles.btnText}>
                    {status === 'active'
                        ? 'Send to Archive'
                        : 'Return from Archive'}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.5}
                style={styles.redBtn}
                onPress={() => setVisibleRemoveWindow(true)}
            >
                <Text style={styles.btnText}>Remove Active</Text>
            </TouchableOpacity>

            {/* Windows */}
            <StandartModal
                visible={isVisibleArchiveWindow}
                closeModal={closeArchiveWindow}
            >
                <ArchiveWindow id={id} closeModal={closeArchiveWindow} />
            </StandartModal>
            <StandartModal
                visible={isVisibleRemoveWindow}
                closeModal={closeRemoveWindow}
            >
                <RemoveWindow
                    id={id}
                    title={title}
                    closeModal={closeRemoveWindow}
                />
            </StandartModal>
        </>
    );
};

const styles = StyleSheet.create({
    btn: {
        backgroundColor: '#2756B1',
        width: '80%',
        borderRadius: 4,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 8,
        padding: 16,
    },
    redBtn: {
        backgroundColor: '#A30000',
        width: '80%',
        borderRadius: 4,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 8,
        padding: 16,
    },
    btnText: {
        color: 'white',
        fontWeight: '700',
        textAlign: 'center',
    },
});

export { ControlPanel };

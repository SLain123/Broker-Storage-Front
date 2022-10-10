import React, { FC, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useEditActiveMutation, useGetActiveQuery } from 'api/activeApi';
import { RequestErrorModal } from 'components/modals';

export interface IArchiveWindow {
    id: string;
    closeModal: () => void;
}

const ArchiveWindow: FC<IArchiveWindow> = ({ id, closeModal }) => {
    const navigation = useNavigation();

    const { data: activeData } = useGetActiveQuery({
        id,
    });
    const [editActive, { isLoading, isSuccess, isError }] =
        useEditActiveMutation();

    const changeActiveStatus = () => {
        editActive({
            id: activeData?.active._id,
            title: activeData.active.title,
            currencyId: activeData.active.currency._id,
            cash: activeData.active.cash,
            status:
                activeData.active.status === 'inactive' ? 'active' : 'inactive',
        });
    };

    useEffect(() => {
        isSuccess && navigation.goBack();
    }, [isSuccess]);

    return (
        <>
            <Text style={styles.title}>
                {activeData.active.status === 'active'
                    ? 'Are you sure you want to send this Active to Archive?'
                    : 'Are you sure you want to return this Active from Archive?'}
            </Text>

            <View style={styles.btnBlock}>
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.removeBtn}
                    onPress={changeActiveStatus}
                    disabled={isSuccess || isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator size='small' color='black' />
                    ) : (
                        <Text style={styles.text}>
                            {activeData.active.status === 'active'
                                ? 'Send to Archive'
                                : 'Return from Archive'}
                        </Text>
                    )}
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.standartBtn}
                    onPress={closeModal}
                >
                    <Text style={styles.text}>Cancel</Text>
                </TouchableOpacity>
            </View>

            <RequestErrorModal
                visible={isError}
                message="Active status wasn't change. Please, try to reboot the app."
            />
        </>
    );
};

const styles = StyleSheet.create({
    title: { textAlign: 'center', fontSize: 18 },
    text: { color: 'white', textAlign: 'center' },
    btnBlock: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 'auto',
    },
    standartBtn: {
        backgroundColor: '#2756B1',
        padding: 12,
        width: '45%',
        marginTop: 8,
        borderRadius: 4,
    },
    removeBtn: {
        backgroundColor: '#A30000',
        padding: 12,
        width: '45%',
        marginTop: 8,
        borderRadius: 4,
    },
});

export { ArchiveWindow };

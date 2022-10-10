import React, { FC, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useRemoveActiveMutation } from 'api/activeApi';
import { RequestErrorModal } from 'components/modals';

export interface IRemoveWindow {
    id: string;
    closeModal: () => void;
}

const RemoveWindow: FC<IRemoveWindow> = ({ id, closeModal }) => {
    const navigation = useNavigation();

    const [removeActive, { isLoading, isSuccess, isError }] =
        useRemoveActiveMutation();

    useEffect(() => {
        isSuccess && navigation.goBack();
    }, [isSuccess]);

    return (
        <>
            <Text style={styles.title}>
                Are you sure you want to remove this Active?
            </Text>

            <View style={styles.btnBlock}>
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.removeBtn}
                    onPress={() => removeActive({ id })}
                    disabled={isSuccess || isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator size='small' color='black' />
                    ) : (
                        <Text style={styles.text}>Remove</Text>
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
                message="Active wasn't remove. Please, try to reboot the app."
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

export { RemoveWindow };

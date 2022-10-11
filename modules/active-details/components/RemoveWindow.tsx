import React, { FC, useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator,
    TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useRemoveActiveMutation } from 'api/activeApi';
import { RequestErrorModal } from 'components/modals';

export interface IRemoveWindow {
    id: string;
    title: string;
    closeModal: () => void;
}

const RemoveWindow: FC<IRemoveWindow> = ({ id, closeModal, title }) => {
    const navigation = useNavigation();

    const [isDisabledBtn, setDisabledBtn] = useState(true);
    const [checkInputValue, setCheckInputValue] = useState('');

    const [removeActive, { isLoading, isSuccess, isError }] =
        useRemoveActiveMutation();

    const removeBtnStyle = isDisabledBtn
        ? styles.disabledBtn
        : styles.removeBtn;

    useEffect(() => {
        title.toLowerCase() === checkInputValue.toLowerCase()
            ? setDisabledBtn(false)
            : setDisabledBtn(true);
    }, [checkInputValue]);

    useEffect(() => {
        isSuccess && navigation.goBack();
    }, [isSuccess]);

    return (
        <>
            <Text style={styles.title}>
                Are you sure you want to remove this Active?
            </Text>

            <View>
                <Text style={styles.bold}>{title}</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Type name of Active to activate the button'
                    value={checkInputValue}
                    onChangeText={(text) => {
                        setCheckInputValue(text);
                    }}
                />
                <View style={styles.btnBlock}>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={removeBtnStyle}
                        onPress={() => removeActive({ id })}
                        disabled={isSuccess || isLoading || isDisabledBtn}
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
    disabledBtn: {
        backgroundColor: '#A30000',
        opacity: 0.35,
        padding: 12,
        width: '45%',
        marginTop: 8,
        borderRadius: 4,
    },
    bold: { fontSize: 16, fontWeight: '700' },
    input: {
        borderColor: 'black',
        borderWidth: 1,
        marginBottom: 12,
        padding: 8,
        borderRadius: 4,
    },
});

export { RemoveWindow };

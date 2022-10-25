import React, { FC } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useRemoveStockMutation } from 'api/stockApi';

export interface IRemoveStock {
    id: string;
    closeModal: () => void;
    isLast: boolean;
}

const RemoveStock: FC<IRemoveStock> = ({ id, closeModal, isLast }) => {
    const navigation = useNavigation();

    const [removeStock, { isLoading, isError, isSuccess }] =
        useRemoveStockMutation();

    const removeStockFunc = () => {
        removeStock({ id });
        if (isLast) {
            navigation.goBack();
        }
        isSuccess && closeModal();
    };

    if (isError) {
        return (
            <Text style={styles.error}>
                The Stock was not removed. Please, try to repeate the action or
                reboot the app.
            </Text>
        );
    }

    return (
        <View>
            <Text style={styles.title}>
                Are you sure you want to remove the operation/stock?
            </Text>

            <View style={styles.btnBlock}>
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.removeBtn}
                    onPress={removeStockFunc}
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
        </View>
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
        width: '48%',
        marginTop: 8,
        borderRadius: 4,
    },
    removeBtn: {
        backgroundColor: '#A30000',
        padding: 12,
        width: '48%',
        marginTop: 8,
        borderRadius: 4,
    },
    error: {
        color: '#A30000',
        textAlign: 'center',
        lineHeight: 26,
    },
});

export { RemoveStock };

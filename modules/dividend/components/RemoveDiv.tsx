import React, { FC } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';

import { useRemoveDivMutation } from 'api/dividendApi';
import { useGetStockQuery } from 'api/stockApi';
import { IRemoveDividendRes } from 'types/dividendTypes';

export interface IRemoveDiv {
    id: string;
    closeModal: () => void;
    stockId: string;
}

const RemoveDiv: FC<IRemoveDiv> = ({ id, closeModal, stockId }) => {
    const [removeDiv, { isLoading, isError, isSuccess }] =
        useRemoveDivMutation();
    const { refetch } = useGetStockQuery({ id: stockId });

    const removeStockFunc = () => {
        removeDiv({ id }).then((data) => {
            const result = data as IRemoveDividendRes;
            if (result.data.message) {
                refetch();
                closeModal();
            }
        });
    };

    if (isError) {
        return (
            <Text style={styles.error}>
                The Dividend was not removed. Please, try to repeate the action
                or reboot the app.
            </Text>
        );
    }

    return (
        <>
            <Text style={styles.title}>
                Are you sure you want to remove the dividend?
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
    error: {
        color: '#A30000',
        textAlign: 'center',
        lineHeight: 26,
    },
});

export { RemoveDiv };

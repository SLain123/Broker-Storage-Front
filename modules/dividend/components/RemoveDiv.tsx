import React, { FC } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';

import { useRemoveDivMutation } from 'api/dividendApi';
import { useGetActiveQuery } from 'api/activeApi';
import { useGetStockQuery } from 'api/stockApi';
import { useRemovePaymentMutation } from 'api/paymentsApi';
import { IRemoveDividendRes } from 'types/dividendTypes';

export interface IRemoveDiv {
    id: string;
    closeModal: () => void;
    payId: string;
    type: 'dividend' | 'payment';
}

const RemoveDiv: FC<IRemoveDiv> = ({ id, closeModal, payId, type }) => {
    const [
        removeDiv,
        {
            isLoading: isLoadingDiv,
            isError: isErrorDiv,
            isSuccess: isSuccessDiv,
        },
    ] = useRemoveDivMutation();
    const [
        removePayment,
        {
            isLoading: isLoadingPay,
            isError: isErrorPay,
            isSuccess: isSuccessPay,
        },
    ] = useRemovePaymentMutation();
    const { refetch: refetchStock } = useGetStockQuery({
        id: payId,
    });
    const { refetch: refetchActive } = useGetActiveQuery({ id: payId });

    const isDisabledRemoveBtn =
        isSuccessDiv || isSuccessPay || isLoadingDiv || isLoadingPay;

    const removeDivFunc = () => {
        removeDiv({ id }).then((data) => {
            const result = data as IRemoveDividendRes;
            if (result.data.message) {
                refetchStock();
                closeModal();
            }
        });
    };

    const removePaymentFunc = () => {
        removePayment({ id }).then((data) => {
            const result = data as IRemoveDividendRes;
            if (result.data.message) {
                refetchActive();
                closeModal();
            }
        });
    };

    const onPressRemoveBtn = () => {
        type === 'dividend' ? removeDivFunc() : removePaymentFunc();
    };

    if (isErrorDiv || isErrorPay) {
        return (
            <Text style={styles.error}>
                The Payment was not removed. Please, try to repeate the action
                or reboot the app.
            </Text>
        );
    }

    return (
        <View>
            <Text style={styles.title}>
                Are you sure you want to remove the dividend?
            </Text>

            <View style={styles.btnBlock}>
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.removeBtn}
                    onPress={onPressRemoveBtn}
                    disabled={isDisabledRemoveBtn}
                >
                    {isLoadingDiv || isLoadingPay ? (
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

export { RemoveDiv };

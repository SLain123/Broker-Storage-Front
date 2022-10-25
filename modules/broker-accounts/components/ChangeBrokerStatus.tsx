import React, { FC, useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
} from 'react-native';

import { useEditBrokerMutation } from 'api/brokerApi';
import { useGetUserProfileQuery } from 'api/profileApi';
import { IBroker } from 'types/brokerTypes';
import { RequestErrorModal, StandartModal } from 'components/modals';

export interface IChangeBrokerStatus
    extends Omit<IBroker, 'sumStocks' | 'sumBalance'> {
    isVisibleChangeModal: boolean;
    closeChangeModal: () => void;
}

const ChangeBrokerStatus: FC<IChangeBrokerStatus> = ({
    isVisibleChangeModal,
    _id,
    title,
    status,
    currency,
    cash,
    closeChangeModal,
}) => {
    const [isDisabledBtn, setDisabledBtn] = useState(status === 'active');
    const [checkInputValue, setCheckInputValue] = useState('');

    const cleanFunc = () => {
        setCheckInputValue('');
        closeChangeModal();
    };

    const { refetch } = useGetUserProfileQuery();
    const [editBroker, { isLoading, isError, isSuccess }] =
        useEditBrokerMutation();

    const mainBtnStyle =
        status === 'active'
            ? isDisabledBtn
                ? styles.disabledBtn
                : styles.deactBtn
            : styles.standartBtn;

    const changeBrokerStatus = () => {
        editBroker({
            id: _id,
            title,
            status: status === 'active' ? 'inactive' : 'active',
            currencyId: currency._id,
            cash,
        });
    };

    useEffect(() => {
        setDisabledBtn(status === 'active');
    }, [status]);

    useEffect(() => {
        if (status === 'active') {
            title.toLowerCase() === checkInputValue.toLowerCase()
                ? setDisabledBtn(false)
                : setDisabledBtn(true);
        }
    }, [checkInputValue]);

    useEffect(() => {
        if (isSuccess) {
            refetch();
            cleanFunc();
        }
    }, [isSuccess]);

    return (
        <StandartModal
            visible={isVisibleChangeModal}
            closeModal={closeChangeModal}
        >
            <View>
                <Text style={styles.title}>
                    {status === 'active'
                        ? 'Are you sure you want to deactivate the selected broker?'
                        : 'Are you sure you want to reactivate the selected broker?'}
                </Text>

                {status === 'active' && (
                    <View>
                        <Text style={styles.bold}>{title}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Type name of Broker to activate the button'
                            value={checkInputValue}
                            onChangeText={(text) => {
                                setCheckInputValue(text);
                            }}
                        />
                    </View>
                )}

                <View style={styles.btnBlock}>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={mainBtnStyle}
                        onPress={changeBrokerStatus}
                        disabled={isDisabledBtn || isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator size='small' color='black' />
                        ) : (
                            <Text style={styles.text}>
                                {status === 'active'
                                    ? 'Deactivate'
                                    : 'Activate'}
                            </Text>
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={styles.standartBtn}
                        onPress={cleanFunc}
                    >
                        <Text style={styles.text}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <RequestErrorModal
                visible={isError}
                message="Broker status wasn't change. Please, try to reboot the app."
            />
        </StandartModal>
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
    deactBtn: {
        backgroundColor: '#A30000',
        padding: 12,
        width: '48%',
        marginTop: 8,
        borderRadius: 4,
    },
    standartBtn: {
        backgroundColor: '#2756B1',
        padding: 12,
        width: '48%',
        marginTop: 8,
        borderRadius: 4,
    },
    disabledBtn: {
        backgroundColor: '#A30000',
        opacity: 0.35,
        padding: 12,
        width: '48%',
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

export { ChangeBrokerStatus };

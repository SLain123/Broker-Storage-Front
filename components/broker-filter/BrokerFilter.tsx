import React, { FC, useMemo, useState, useCallback } from 'react';
import {
    ActivityIndicator,
    TouchableOpacity,
    Text,
    StyleSheet,
    View,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

import { useGetBrokerListQuery } from 'api/brokerApi';
import { RequestErrorModal } from 'components/modals';
import { StandartModal } from 'components/modals';
import { IComponentActions } from 'types/commonTypes';

export interface IBrokerFilter {
    dropdownRef: React.MutableRefObject<SelectDropdown>;
    saveBrokerFunc: (brokerId: string) => void;
}

const BrokerFilter: FC<IBrokerFilter> & IComponentActions = ({
    dropdownRef,
    saveBrokerFunc,
}) => {
    const [isVisibleModal, setVisibleModal] = useState(false);
    const [title, setTitle] = useState('Filter by All Brokers');

    const { data: brokerList, isLoading, isError } = useGetBrokerListQuery();

    const selectBrokerList = useMemo(
        () =>
            !isLoading && !isError
                ? brokerList.brokerAccounts.map(
                      (broker) => `${broker.title} - (${broker.status})`,
                  )
                : [],
        [isLoading, isError, brokerList],
    );

    const toggleModal = useCallback(() => {
        setVisibleModal((prev) => !prev);
    }, []);

    const changeBroker = (index: number) => {
        setTitle(`Filter by ${brokerList.brokerAccounts[index].title}`);
        saveBrokerFunc(brokerList.brokerAccounts[index]._id);
        toggleModal();
    };

    const reset = () => {
        setTitle('Filter by All Brokers');
        saveBrokerFunc(null);
        setVisibleModal(false);
    };

    BrokerFilter.reset = reset;

    return isLoading ? (
        <ActivityIndicator size='large' color='white' style={styles.spin} />
    ) : (
        <>
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={toggleModal}
                style={styles.filterBtn}
            >
                <Text style={styles.filterText}>{title}</Text>
            </TouchableOpacity>

            <StandartModal visible={isVisibleModal} closeModal={toggleModal}>
                <View style={styles.container}>
                    <SelectDropdown
                        ref={dropdownRef}
                        data={selectBrokerList}
                        onSelect={(_selectedItem, index) => {
                            changeBroker(index);
                        }}
                        rowTextForSelection={(item) => item}
                        defaultButtonText='Select broker'
                        buttonTextAfterSelection={(selectedItem) =>
                            selectedItem
                        }
                        buttonStyle={styles.selectBody}
                        buttonTextStyle={styles.selectText}
                        dropdownStyle={styles.dropdownBody}
                        rowTextStyle={styles.dropdownText}
                        selectedRowTextStyle={styles.dropdownActiveText}
                        dropdownOverlayColor='rgba(255,255,255,0.7)'
                    />
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={reset}
                        style={styles.btnReset}
                    >
                        <Text style={styles.filterText}>Reset</Text>
                    </TouchableOpacity>
                </View>
            </StandartModal>

            <RequestErrorModal
                visible={isError}
                message="Broker list wasn't download from the server. Please, try to reboot the app."
            />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        width: "100%"
    },
    selectBody: {
        backgroundColor: 'black',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 4,
        width: '80%',
    },
    selectText: {
        color: 'white',
        textAlign: 'justify',
    },
    dropdownBody: {
        backgroundColor: 'black',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 4,
    },
    dropdownText: {
        color: 'white',
    },
    dropdownActiveText: {
        color: '#2756B1',
    },
    spin: {
        marginBottom: 24,
    },
    filterBtn: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 16,
        padding: 8,
        paddingLeft: 16,
        paddingRight: 16,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 4,
    },
    filterText: { color: 'white', fontSize: 16, textAlign: 'center' },
    btnReset: {
        backgroundColor: '#A30000',
        borderRadius: 4,
        padding: 16,
        width: '80%',
        marginTop: 16,
    },
});

export { BrokerFilter };

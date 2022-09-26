import React, { FC, useState, useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { IBroker } from 'types/brokerTypes';
import { SlideBottomModal } from 'components/modals';
import { BrokerActionPanel } from './BrokerActionPanel';
import { IScreenProps } from 'types/commonTypes';
import { ChangeBrokerStatus } from './ChangeBrokerStatus';
import { moneyFormater } from 'utils/formaters';

import RightArrow from 'assets/icons/right-arrow.svg';

export interface IBrokerAccountItem
    extends IScreenProps,
        Omit<IBroker, 'sumStocks'> {}

const BrokerAccountItem: FC<IBrokerAccountItem> = ({
    _id,
    title,
    currency,
    sumBalance,
    status,
    cash,
    navigation,
}) => {
    const [isVisibleBottomModal, setVisibleBottomModal] = useState(false);
    const [isVisibleChangeModal, setVisibleChangeModal] = useState(false);

    const closeBottomModal = useCallback(
        () => setVisibleBottomModal(false),
        [],
    );
    const closeChangeModal = useCallback(
        () => setVisibleChangeModal(false),
        [],
    );
    const openChangeModal = useCallback(() => setVisibleChangeModal(true), []);

    return (
        <>
            <TouchableOpacity
                style={styles.container}
                activeOpacity={0.5}
                onPress={() => setVisibleBottomModal(true)}
            >
                <Text style={styles.title}>{title}</Text>
                {status === 'active' ? (
                    <Text style={styles.cash}>
                        {moneyFormater(sumBalance)} {currency.ticker}
                    </Text>
                ) : (
                    <Text style={styles.inactive}>Inactive</Text>
                )}
                <RightArrow width={25} height={25} style={styles.arrow} />
            </TouchableOpacity>

            <SlideBottomModal
                isVisible={isVisibleBottomModal}
                closeModalFunc={closeBottomModal}
            >
                <BrokerActionPanel
                    _id={_id}
                    title={title}
                    status={status}
                    cash={cash}
                    currency={currency}
                    navigation={navigation}
                    closeBottomModal={closeBottomModal}
                    openChangeModal={openChangeModal}
                />
            </SlideBottomModal>

            <ChangeBrokerStatus
                isVisibleChangeModal={isVisibleChangeModal}
                _id={_id}
                title={title}
                status={status}
                currency={currency}
                cash={cash}
                closeChangeModal={closeChangeModal}
            />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 8,
        borderBottomColor: 'rgba(255,255,255,0.3)',
        borderBottomWidth: 1,
    },
    title: {
        color: 'white',
        fontSize: 16,
        maxWidth: '60%',
        height: 20,
    },
    cash: {
        color: '#2756B1',
        fontSize: 14,
        marginLeft: 'auto',
    },
    inactive: {
        color: '#A30000',
        marginLeft: 'auto',
        fontSize: 14,
    },
    arrow: { marginLeft: 16 },
});

export { BrokerAccountItem };

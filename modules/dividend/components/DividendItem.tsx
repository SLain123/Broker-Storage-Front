import React, { FC, useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { moneyFormater, dateFormater } from 'utils/formaters';
import { StandartModal } from 'components/modals';
import { IDividend } from 'types/dividendTypes';
import { RemoveDiv } from './RemoveDiv';

import RemoveIcon from 'assets/icons/remove.svg';

export interface IDividendItem extends Omit<IDividend, 'currency'> {
    payId: string;
    type: 'dividend' | 'payment';
}

const DividendItem: FC<IDividendItem> = ({
    _id,
    date,
    payment,
    sumPriceBuyngStoсk,
    payId,
    type,
}) => {
    const [isVisbleRemoveModal, setVisibleRemoveModal] = useState(false);

    const closeModal = useCallback(() => {
        setVisibleRemoveModal(false);
    }, []);

    return (
        <>
            <View style={styles.row}>
                <Text style={styles.text}>{dateFormater(new Date(date))}</Text>
                <Text style={styles.text}>{moneyFormater(payment)}</Text>
                <Text style={styles.text}>
                    {`${((payment / sumPriceBuyngStoсk) * 100).toFixed(1)} %`}
                </Text>
                <Text style={styles.text}>
                    {moneyFormater(sumPriceBuyngStoсk)}
                </Text>

                <TouchableOpacity
                    style={styles.btn}
                    activeOpacity={0.5}
                    onPress={() => setVisibleRemoveModal(true)}
                >
                    <RemoveIcon width={22} height={35} />
                </TouchableOpacity>
            </View>

            <StandartModal
                visible={isVisbleRemoveModal}
                closeModal={closeModal}
            >
                <RemoveDiv
                    id={_id}
                    closeModal={closeModal}
                    payId={payId}
                    type={type}
                />
            </StandartModal>
        </>
    );
};

const styles = StyleSheet.create({
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    text: {
        color: 'white',
        padding: 8,
        borderWidth: 1,
        borderColor: '#2756B1',
        width: 105,
        maxWidth: 105,
        height: 35,
    },
    buy: { color: 'green' },
    sell: {
        color: 'red',
    },
    btn: {
        width: 105,
        maxWidth: 105,
        height: 35,
        borderWidth: 1,
        borderColor: '#2756B1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export { DividendItem };

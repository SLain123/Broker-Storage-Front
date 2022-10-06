import React, { FC, useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { IHistory } from 'types/stockTypes';
import { moneyFormater } from 'utils/formaters';
import { StandartModal } from 'components/modals';
import { RemoveStock } from 'modules/stock-details/components';

import RemoveIcon from 'assets/icons/remove.svg';

export interface IStockHistoryItem extends IHistory {
    isFirst: boolean;
    isLast: boolean;
}

const StockHistoryItem: FC<IStockHistoryItem> = ({
    _id,
    action,
    count,
    date,
    fee,
    pricePerSingle,
    isFirst,
    isLast,
}) => {
    const [isVisbleRemoveModal, setVisibleRemoveModal] = useState(false);

    const newDate = new Date(date);
    const formatedDate = `${newDate.getDate()}.${newDate.getMonth()}.${newDate.getFullYear()}`;

    const actionStyle = action === 'buy' ? styles.buy : styles.sell;

    const toggleModal = useCallback(() => {
        setVisibleRemoveModal((prev) => !prev);
    }, []);

    return (
        <>
            <View style={styles.row}>
                <Text style={styles.text}>{formatedDate}</Text>
                <Text style={{ ...styles.text, ...actionStyle }}>{action}</Text>
                <Text style={styles.text}>{count}</Text>
                <Text style={styles.text}>{moneyFormater(pricePerSingle)}</Text>
                <Text style={styles.text}>
                    {moneyFormater(count * pricePerSingle + fee)}
                </Text>
                <Text style={styles.text}>{moneyFormater(fee)}</Text>

                <TouchableOpacity
                    style={styles.btn}
                    activeOpacity={0.5}
                    onPress={toggleModal}
                    disabled={isFirst}
                >
                    {!isFirst && <RemoveIcon width={22} height={35} />}
                </TouchableOpacity>
            </View>

            <StandartModal
                visible={isVisbleRemoveModal}
                closeModal={toggleModal}
            >
                <RemoveStock
                    id={_id}
                    closeModal={toggleModal}
                    isLast={isLast}
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

export { StockHistoryItem };

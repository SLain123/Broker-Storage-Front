import React, { FC } from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';

import { IHistory } from 'types/stockTypes';
import { HistoryItem } from './HistoryItem';

export interface IHistoryList {
    history: IHistory[];
}

const HistoryList: FC<IHistoryList> = ({ history }) => {
    return (
        <ScrollView horizontal={true}>
            <View style={styles.table}>
                <View style={styles.head}>
                    <Text style={styles.headText}>Date</Text>
                    <Text style={styles.headText}>Operation</Text>
                    <Text style={styles.headText}>Unit</Text>
                    <Text style={styles.headText}>Price per Unit</Text>
                    <Text style={styles.headText}>Total Price</Text>
                    <Text style={styles.headText}>Fee</Text>
                    <Text style={styles.headText}>Remove</Text>
                </View>

                {history.map(
                    (
                        { _id, action, count, date, fee, pricePerSingle },
                        index,
                    ) => (
                        <HistoryItem
                            key={_id}
                            _id={_id}
                            action={action}
                            count={count}
                            date={date}
                            fee={fee}
                            pricePerSingle={pricePerSingle}
                            isFirst={history.length > 1 && index === 0}
                            isLast={history.length < 2}
                        />
                    ),
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    table: { display: 'flex', marginBottom: 16 },
    head: {
        display: 'flex',
        flexDirection: 'row',
    },
    headText: {
        color: '#2756B1',
        padding: 8,
        borderColor: '#2756B1',
        borderWidth: 1,
        width: 105,
        maxWidth: 105,
    },
});

export { HistoryList };

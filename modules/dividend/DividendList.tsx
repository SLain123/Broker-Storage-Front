import React, { FC } from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';

import { IDividend } from 'types/dividendTypes';
import { DividendItem } from './components';

export interface IDividendList {
    divList: IDividend[];
    id: string;
    type?: 'dividend' | 'payment';
}

const DividendList: FC<IDividendList> = ({
    divList,
    id,
    type = 'dividend',
}) => {
    return (
        <ScrollView horizontal={true}>
            <View style={styles.table}>
                <View style={styles.head}>
                    <Text style={styles.headText}>Div Date</Text>
                    <Text style={styles.headText}>Div Payment</Text>
                    <Text style={styles.headText}>Profit percentage</Text>
                    <Text style={styles.headText}>Sum of all Stocks</Text>
                    <Text style={styles.headText}>Remove</Text>
                </View>

                {divList.map(({ _id, date, sumPriceBuyngStoсk, payment }) => (
                    <DividendItem
                        key={_id}
                        _id={_id}
                        date={date}
                        sumPriceBuyngStoсk={sumPriceBuyngStoсk}
                        payment={payment}
                        payId={id}
                        type={type}
                    />
                ))}
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

export { DividendList };

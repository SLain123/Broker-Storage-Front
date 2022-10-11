import React, { FC, useEffect } from 'react';
import {
    ScrollView,
    View,
    RefreshControl,
    StyleSheet,
    Text,
} from 'react-native';

import { Accordion } from 'components/ui';
import {
    useGetFeeQuery,
    useGetPaymentsQuery,
    useGetDividendsQuery,
} from 'api/statApi';

const StatisticList: FC = () => {
    const { data: feeData, refetch: feeRefetch } = useGetFeeQuery({});
    const { data: paymentsData, refetch: paymentsRefetch } =
        useGetPaymentsQuery({});
    const { data: dividendsData, refetch: dividendsRefetch } =
        useGetDividendsQuery({});

    const refetchAll = () => {
        feeRefetch();
        paymentsRefetch();
        dividendsRefetch();
    };

    useEffect(() => {
        console.log(feeData);
    }, [feeData]);

    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={false} onRefresh={refetchAll} />
            }
        >
            <View style={styles.container}>
                <Accordion header='Sum of all Dividends'>
                    <Text>Div</Text>
                </Accordion>

                <Accordion header='Sum of all Payments'>
                    <Text>Pay</Text>
                </Accordion>

                <Accordion header='All Fee'>
                    <Text>Fee</Text>
                </Accordion>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {},
});

export { StatisticList };

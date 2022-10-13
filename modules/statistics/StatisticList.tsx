import React, { FC } from 'react';
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
import { StatFee } from 'modules/stat-fee/StatFee';
import { StatPayments } from 'modules/stat-payments/StatPayments';

const StatisticList: FC = () => {
    const { refetch: feeRefetch } = useGetFeeQuery({});
    const { refetch: paymentsRefetch } = useGetPaymentsQuery({});
    const { refetch: dividendsRefetch } = useGetDividendsQuery({});

    const refetchAll = () => {
        feeRefetch();
        paymentsRefetch();
        dividendsRefetch();
    };

    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={false} onRefresh={refetchAll} />
            }
        >
            <View style={styles.container}>
                <StatPayments type='Dividends' />
                <StatPayments type='Payments' />
                <StatFee />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {},
});

export { StatisticList };

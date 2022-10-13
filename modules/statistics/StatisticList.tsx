import React, { FC, useEffect } from 'react';
import { ScrollView, RefreshControl } from 'react-native';

import {
    useGetFeeQuery,
    useGetPaymentsQuery,
    useGetDividendsQuery,
} from 'api/statApi';
import { StatFee } from 'modules/stat-fee/StatFee';
import { StatPayments } from 'modules/stat-payments/StatPayments';
import { useAppSelector } from 'hooks';
import { getAuthStatus } from 'slice/authSlice';

const StatisticList: FC = () => {
    const currentYear = new Date().getFullYear();
    const isAuth = useAppSelector(getAuthStatus);

    const { refetch: feeRefetch } = useGetFeeQuery({ byYear: currentYear });
    const { refetch: paymentsRefetch } = useGetPaymentsQuery({
        byYear: currentYear,
    });
    const { refetch: dividendsRefetch } = useGetDividendsQuery({
        byYear: currentYear,
    });

    const refetchAll = () => {
        feeRefetch();
        paymentsRefetch();
        dividendsRefetch();
    };

    useEffect(() => {
        refetchAll();
    }, [isAuth]);

    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={false} onRefresh={refetchAll} />
            }
        >
            <StatPayments type='Dividends' />
            <StatPayments type='Payments' />
            <StatFee />
        </ScrollView>
    );
};

export { StatisticList };

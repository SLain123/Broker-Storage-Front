import React, { FC, useState, useCallback, useMemo } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';

import { Accordion } from 'components/ui';
import { YearFilter } from 'components/year-filter/YearFilter';
import { PayRow } from './PayRow';
import { useGetPaymentsQuery, useGetDividendsQuery } from 'api/statApi';
import { ErrorMessage } from 'components/ui';
import { IYearFilter } from 'types/statTypes';

export interface IStatPayments {
    type: 'Dividends' | 'Payments';
}

const StatPayments: FC<IStatPayments> = ({ type }) => {
    const currentYear = new Date().getFullYear();
    const [byYear, setYear] = useState<IYearFilter>({
        byYear: currentYear,
    });

    const {
        data: payData,
        isError: isPayError,
        isLoading: isPayLoading,
    } = useGetPaymentsQuery(byYear);
    const {
        data: divData,
        isError: isDivError,
        isLoading: isDivLoading,
    } = useGetDividendsQuery(byYear);

    const dataList = useMemo(() => {
        if (type === 'Dividends') {
            return divData?.result
                ? divData.result.map((data) => ({
                      ...data,
                      title: `${data.type} in ${data.currency.ticker}`,
                  }))
                : [];
        } else {
            return payData?.result ? payData.result : [];
        }
    }, [payData, divData, type]);

    const saveYear = useCallback((year: number) => {
        setYear({ byYear: year });
    }, []);

    if (isPayLoading || isDivLoading) {
        return <ActivityIndicator size='large' color='white' />;
    }

    return (
        <Accordion header={`Sum of all ${type}`} fontSize={16}>
            <>
                {isPayError ||
                    (isDivError && (
                        <ErrorMessage
                            message={`The ${type} have not been downloaded from server, please try to reboot App.`}
                        />
                    ))}

                {dataList?.length ? (
                    <>
                        <View style={styles.row}>
                            <Text style={styles.col}>
                                {type === 'Dividends'
                                    ? 'Stock Type/Currency'
                                    : 'Active Name'}
                            </Text>
                            <Text style={styles.col}>Sum of Payments</Text>
                            <Text style={styles.col}>Percent %</Text>
                        </View>

                        {dataList.map(
                            ({
                                title,
                                currency,
                                allPayments,
                                totalAmountOfInvest,
                            }) => (
                                <PayRow
                                    key={`${title}/${currency._id}/${allPayments}`}
                                    title={title}
                                    currency={currency}
                                    allPayments={allPayments}
                                    totalAmountOfInvest={totalAmountOfInvest}
                                />
                            ),
                        )}
                    </>
                ) : (
                    <Text style={styles.text}>
                        {`No ${type} were found for the specified year`}
                    </Text>
                )}
                {!isPayError && !isDivError && (
                    <YearFilter
                        saveYearFunc={saveYear}
                        defaultYear={currentYear}
                    />
                )}
            </>
        </Accordion>
    );
};

const styles = StyleSheet.create({
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    col: {
        color: '#2756B1',
        paddingBottom: 8,
        width: '33%',
        fontSize: 12,
    },
    text: {
        color: '#2756B1',
        paddingBottom: 8,
        textAlign: 'center',
    },
});

export { StatPayments };

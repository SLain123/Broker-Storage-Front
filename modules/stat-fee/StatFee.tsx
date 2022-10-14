import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';

import { Accordion } from 'components/ui';
import { YearFilter } from 'components/year-filter/YearFilter';
import { FeeRow } from './FeeRow';
import { useGetFeeQuery } from 'api/statApi';
import { ErrorMessage } from 'components/ui';
import { IYearFilter } from 'types/statTypes';

const StatFee = () => {
    const currentYear = new Date().getFullYear();
    const [byYear, setYear] = useState<IYearFilter>({
        byYear: currentYear,
    });

    const { data, isError, isLoading } = useGetFeeQuery(byYear);

    const saveYear = useCallback((year: number) => {
        setYear({ byYear: year });
    }, []);

    if (isLoading) {
        return <ActivityIndicator size='large' color='white' />;
    }

    return (
        <Accordion header='All Fee' fontSize={16}>
            <>
                {isError && (
                    <ErrorMessage message='The Fees have not been downloaded from server, please try to reboot App.' />
                )}
                {data?.result?.length ? (
                    <>
                        <View style={styles.row}>
                            <Text style={styles.text}>Broker Name</Text>
                            <Text style={styles.text}>Sum of Fee</Text>
                        </View>
                        {data.result.map(({ fee, currency, broker }) => (
                            <FeeRow
                                key={broker._id}
                                fee={fee}
                                currency={currency}
                                broker={broker}
                            />
                        ))}
                    </>
                ) : (
                    <Text style={styles.text}>
                        No fee were found for the specified year
                    </Text>
                )}
                {!isError && (
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
    text: {
        color: '#2756B1',
        paddingBottom: 8,
        textAlign: 'center',
        fontSize: 12,
    },
});

export { StatFee };

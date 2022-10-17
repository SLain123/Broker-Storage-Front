import React, { FC, useState, useCallback, useMemo } from 'react';
import { Text, StyleSheet, ActivityIndicator, View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

import { useGetProfitQuery } from 'api/statApi';
import { IGetProfitReq } from 'types/statTypes';
import { YearFilter } from 'components/year-filter/YearFilter';
import { ErrorMessage } from 'components/ui';
import { IStock } from 'types/stockTypes';
import { ProfitRow } from './ProfitRow';

const StatProfit: FC = () => {
    const currentYear = new Date().getFullYear();
    const [filters, setFilters] = useState<IGetProfitReq>({
        year: currentYear,
        plusInactiveBrokers: false,
    });

    const { data, isLoading, isError } = useGetProfitQuery(filters);

    const saveYear = useCallback(
        (year: number) => {
            isNaN(year)
                ? setFilters({ ...filters, year: currentYear })
                : setFilters({ ...filters, year });
        },
        [filters],
    );

    const changeInactiveBrokerStatus = (isChecked: boolean) => {
        setFilters({
            ...filters,
            plusInactiveBrokers: isChecked,
        });
    };

    const separateByBroker = useMemo(() => {
        return data?.filtredList
            ? getSeparateList(data.filtredList, 'broker')
            : [];
    }, [data]);

    const separateByCurrency = useMemo(() => {
        return data?.filtredList
            ? getSeparateList(data.filtredList, 'currency')
            : [];
    }, [data]);

    if (isLoading) {
        return <ActivityIndicator size='large' color='white' />;
    }

    return (
        <>
            {isError && (
                <ErrorMessage message='The Profit have not been downloaded from server, please try to reboot App.' />
            )}
            {data?.filtredList.length ? (
                <>
                    <View style={styles.block}>
                        <Text style={styles.headTitle}>
                            Profit divided by Brokers
                        </Text>
                        {separateByBroker.map((data, indx) => (
                            <ProfitRow rowData={data} key={indx} />
                        ))}
                    </View>
                    <View style={styles.block}>
                        <Text style={styles.headTitle}>
                            Profit divided by Currency
                        </Text>
                        {separateByCurrency.map((data, indx) => (
                            <ProfitRow rowData={data} key={indx} />
                        ))}
                    </View>
                </>
            ) : (
                <Text style={styles.text}>
                    No profit data were found for the specified filters
                </Text>
            )}
            {!isError && (
                <View style={styles.filterContainer}>
                    <View style={styles.checkboxContainer}>
                        <BouncyCheckbox
                            size={30}
                            fillColor='#2756B1'
                            unfillColor='#FFFFFF'
                            innerIconStyle={{ borderWidth: 2 }}
                            onPress={(isChecked: boolean) => {
                                changeInactiveBrokerStatus(isChecked);
                            }}
                            isChecked={filters.plusInactiveBrokers}
                        />
                        <Text style={styles.text}>
                            {filters.plusInactiveBrokers
                                ? 'With Inactive Brokers'
                                : 'Only Active Brokers'}
                        </Text>
                    </View>
                    <YearFilter
                        saveYearFunc={saveYear}
                        defaultYear={currentYear}
                    />
                </View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    block: {
        padding: 16,
    },
    headTitle: {
        color: '#2756B1',
        paddingBottom: 8,
        borderBottomColor: '#2756B1',
        borderBottomWidth: 1,
    },
    text: { color: 'white', padding: 16 },
    filterContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 16,
    },
    checkboxContainer: {
        paddingBottom: 16,
        display: 'flex',
        flexDirection: 'row',
    },
    checkboxText: {
        color: 'white',
    },
});

const getSeparateList = (
    list: IStock[],
    type: 'broker' | 'currency',
): { [key: string]: string }[] => {
    let resultList = {};
    if (type === 'broker') {
        list.forEach(({ profit, broker, currency }) => {
            if (resultList.hasOwnProperty(broker._id)) {
                resultList[broker._id] = {
                    [`${broker.title} (${currency.ticker})`]:
                        resultList[broker._id][
                            `${broker.title} (${currency.ticker})`
                        ] + profit,
                };
            } else {
                resultList[broker._id] = {
                    [`${broker.title} (${currency.ticker})`]: profit,
                };
            }
        });
    }
    if (type === 'currency') {
        list.forEach(({ profit, currency }) => {
            if (resultList.hasOwnProperty(currency._id)) {
                resultList[currency._id] = {
                    [currency.title]:
                        resultList[currency._id][currency.title] + profit,
                };
            } else {
                resultList[currency._id] = { [currency.title]: profit };
            }
        });
    }

    return Object.values(resultList);
};

export { StatProfit };

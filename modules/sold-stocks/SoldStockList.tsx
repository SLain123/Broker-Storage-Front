import React, { useState, FC, useCallback, useEffect, useRef } from 'react';
import {
    ScrollView,
    RefreshControl,
    View,
    StyleSheet,
    Text,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

import { useGetProfitQuery } from 'api/statApi';
import { IGetProfitReq } from 'types/statTypes';
import { BlanketSpinner } from 'components/ui';
import { RequestErrorModal } from 'components/modals';
import { SoldItem } from './componentns/SoldItem';
import { YearFilter } from 'components/year-filter/YearFilter';
import { BrokerFilter } from 'components/broker-filter/BrokerFilter';
import { getAuthStatus } from 'slice/authSlice';
import { useAppSelector } from 'hooks';

const SoldStockList: FC = () => {
    const dropdownRef = useRef<SelectDropdown>(null);

    const isAuth = useAppSelector(getAuthStatus);
    const [filters, setFilters] = useState<IGetProfitReq>({
        plusInactiveBrokers: true,
    });

    const { data, isLoading, isError, refetch } = useGetProfitQuery(filters);

    const saveYear = useCallback(
        (year: number) => {
            if (isNaN(year)) {
                const newFilters = { ...filters };
                delete newFilters.year;
                setFilters(newFilters);
            } else {
                setFilters({ ...filters, year });
            }
        },
        [filters],
    );

    const saveBroker = useCallback(
        (brokerId: string) => {
            if (!brokerId) {
                const newFilters = { ...filters };
                delete newFilters.brokerId;
                setFilters(newFilters);
            } else {
                setFilters({ ...filters, brokerId });
            }
        },
        [filters],
    );

    const resetAll = () => {
        BrokerFilter.reset();
        YearFilter.reset();
        setFilters({ plusInactiveBrokers: true });
        refetch();
    };

    useEffect(() => {
        refetch();
    }, [isAuth]);

    if (isLoading) {
        return <BlanketSpinner />;
    }

    if (isError) {
        return (
            <RequestErrorModal
                visible
                message="Stock list wasn't download from the server. Please, try to reboot the app."
            />
        );
    }

    return (
        <>
            <View style={styles.filterBlock}>
                <BrokerFilter
                    dropdownRef={dropdownRef}
                    saveBrokerFunc={saveBroker}
                />
                <YearFilter saveYearFunc={saveYear} />
            </View>
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={false} onRefresh={resetAll} />
                }
            >
                <View style={styles.container}>
                    {data?.filtredList &&
                        data.filtredList.map(
                            ({ _id, broker, currency, title, profit, fee }) => (
                                <SoldItem
                                    key={_id}
                                    _id={_id}
                                    broker={broker}
                                    currency={currency}
                                    title={title}
                                    profit={profit}
                                    fee={fee}
                                />
                            ),
                        )}
                    {data?.filtredList && !data?.filtredList.length && (
                        <Text style={styles.text}>
                            You do not have any Sold Stock with specifyed
                            Filters
                        </Text>
                    )}
                </View>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 64,
    },
    filterBlock: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    text: { color: 'white', padding: 16, fontSize: 16 },
});

export { SoldStockList };

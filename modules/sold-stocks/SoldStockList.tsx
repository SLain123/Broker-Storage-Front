import React, { useState, FC } from 'react';
import { ScrollView, RefreshControl, View, StyleSheet } from 'react-native';

import { useGetProfitQuery } from 'api/statApi';
import { IGetProfitReq } from 'types/statTypes';
import { BlanketSpinner } from 'components/ui';
import { RequestErrorModal } from 'components/modals';
import { SoldItem } from './componentns/SoldItem';

const SoldStockList: FC = () => {
    const currentYear = new Date().getFullYear();
    const [filters, setFilters] = useState<IGetProfitReq>({
        year: currentYear,
        plusInactiveBrokers: true,
    });

    const { data, isLoading, isError, refetch } = useGetProfitQuery(filters);

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
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={false} onRefresh={refetch} />
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
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 64,
    },
});

export { SoldStockList };

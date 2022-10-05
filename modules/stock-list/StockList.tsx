import React, { FC, useMemo } from 'react';
import { ScrollView, RefreshControl, View, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';

import { IScreenProps } from 'types/commonTypes';
import { useGetAllStockListQuery } from 'api/stockApi';
import { BlanketSpinner } from 'components/ui';
import {
    StockItem,
    EmptyListNotification,
    CreateStockPanel,
} from './components';
import { RequestErrorModal } from 'components/modals';

export interface IStockList extends IScreenProps {
    route: RouteProp<
        {
            params: {
                brokerId: string;
            };
        },
        'params'
    >;
}

const StockList: FC<IStockList> = ({ route, navigation }) => {
    const { brokerId } = route.params;

    const { data, isLoading, isError, refetch } = useGetAllStockListQuery({
        filters: { brokerId },
    });

    const onlyInactiveStocks = useMemo(
        () =>
            data?.stocks &&
            data.stocks.every(({ status }) => status === 'closed'),
        [data],
    );

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

    if (onlyInactiveStocks || !data?.stocks.length) {
        return (
            <>
                <EmptyListNotification />
                <CreateStockPanel navigation={navigation} brokerId={brokerId} />
            </>
        );
    }

    return (
        <>
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={false} onRefresh={refetch} />
                }
            >
                <View style={styles.container}>
                    {data?.stocks &&
                        data.stocks.map(
                            ({
                                _id,
                                status,
                                title,
                                restCount,
                                deltaBuy,
                                fee,
                                currency,
                            }) => (
                                <StockItem
                                    key={_id}
                                    _id={_id}
                                    status={status}
                                    title={title}
                                    restCount={restCount}
                                    deltaBuy={deltaBuy}
                                    fee={fee}
                                    currency={currency}
                                    navigation={navigation}
                                />
                            ),
                        )}
                </View>
            </ScrollView>
            <CreateStockPanel navigation={navigation} brokerId={brokerId} />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 64,
    },
});

export { StockList };

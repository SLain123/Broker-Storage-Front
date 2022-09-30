import React, { FC, useEffect, useMemo } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { RouteProp } from '@react-navigation/native';

import { IScreenProps } from 'types/commonTypes';
import { useGetAllStockListMutation } from 'api/stockApi';
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

    const [getAllStockList, { isLoading, data, isError }] =
        useGetAllStockListMutation();

    const getFiltredStockList = () => {
        brokerId && getAllStockList({ filters: { brokerId } });
    };

    const onlyInactiveStocks = useMemo(
        () =>
            data?.stocks &&
            data.stocks.every(({ status }) => status === 'closed'),
        [data],
    );

    useEffect(() => {
        getFiltredStockList();
    }, [brokerId]);

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
                    <RefreshControl
                        refreshing={false}
                        onRefresh={getFiltredStockList}
                    />
                }
            >
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
            </ScrollView>
            <CreateStockPanel navigation={navigation} brokerId={brokerId} />
        </>
    );
};

export { StockList };

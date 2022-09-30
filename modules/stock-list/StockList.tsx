import React, { FC, useEffect, useMemo } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { RouteProp } from '@react-navigation/native';

import { IScreenProps } from 'types/commonTypes';
import { useGetAllStockListMutation } from 'api/stockApi';
import { BlanketSpinner } from 'components/ui';
import { StockItem, EmptyListNotification } from './components';
import { RequestErrorModal } from 'components/modals';

export interface IStockList extends IScreenProps {
    route: RouteProp<
        {
            params: {
                id: string;
            };
        },
        'params'
    >;
}

const StockList: FC<IStockList> = ({ route, navigation }) => {
    const { id } = route.params;

    const [getAllStockList, { isLoading, data, isError }] =
        useGetAllStockListMutation();

    const getFiltredStockList = () => {
        id && getAllStockList({ filters: { brokerId: id } });
    };

    const onlyInactiveStocks = useMemo(
        () =>
            data?.stocks &&
            data.stocks.every(({ status }) => status === 'closed'),
        [data],
    );

    useEffect(() => {
        getFiltredStockList();
    }, [id]);

    if (isLoading) {
        return <BlanketSpinner />;
    }

    if (onlyInactiveStocks) {
        return <EmptyListNotification />;
    }

    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={false}
                    onRefresh={getFiltredStockList}
                />
            }
        >
            {data?.stocks && data.stocks.length ? (
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
                )
            ) : (
                <EmptyListNotification />
            )}

            <RequestErrorModal
                visible={isError}
                message="Stock list wasn't download from the server. Please, try to reboot the app."
            />
        </ScrollView>
    );
};

export { StockList };

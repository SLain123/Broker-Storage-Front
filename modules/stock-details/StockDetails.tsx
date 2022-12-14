import React, { FC } from 'react';
import { Text, ScrollView, RefreshControl, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';

import { useGetStockQuery } from 'api/stockApi';
import { Accordion, BlanketSpinner } from 'components/ui';
import { RequestErrorModal } from 'components/modals';
import { moneyFormater } from 'utils/formaters';
import { HistoryList } from 'modules/history/HistoryList';
import { ControlPanel, RowDetail } from './components';
import { DividendList } from 'modules/dividend/DividendList';

export interface IStockDetails {
    route: RouteProp<
        {
            params: {
                stockId: string;
            };
        },
        'params'
    >;
}

const StockDetails: FC<IStockDetails> = ({ route }) => {
    const { stockId } = route.params;

    const { data, isLoading, isError, refetch } = useGetStockQuery({
        id: stockId,
    });

    if (isLoading) {
        return <BlanketSpinner />;
    }

    if (isError) {
        return (
            <RequestErrorModal
                visible
                message="Stock information wasn't download from the server. Please, try to reboot the app."
            />
        );
    }

    return (
        <>
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={false} onRefresh={refetch} />
                }
            >
                <Text style={styles.title}>{data?.stock?.title}</Text>
                {data?.stock?.restCount ? (
                    <RowDetail
                        description='Count of Stocks:'
                        value={`${data?.stock?.restCount} unit`}
                    />
                ) : null}
                {data?.stock?.deltaBuy ? (
                    <RowDetail
                        description='Total Price of Stock:'
                        value={`${moneyFormater(
                            data?.stock?.restCount * data?.stock?.deltaBuy,
                        )} ${data?.stock?.currency?.ticker}`}
                    />
                ) : null}
                {data?.stock?.deltaBuy ? (
                    <RowDetail
                        description='Delta of Buy Price per Unit:'
                        value={`${moneyFormater(data?.stock?.deltaBuy)} ${
                            data?.stock?.currency?.ticker
                        }`}
                    />
                ) : null}
                <RowDetail
                    description='Summary Broker Fee:'
                    value={`${moneyFormater(data?.stock?.fee)} ${
                        data?.stock?.currency?.ticker
                    }`}
                />
                <RowDetail
                    description={
                        data?.stock?.restCount > 0
                            ? 'Potential Profit at the moment:'
                            : 'Total Profit:'
                    }
                    value={`${moneyFormater(data?.stock?.profit)} ${
                        data?.stock?.currency?.ticker
                    }`}
                />
                <RowDetail
                    description='Stock Type:'
                    value={data?.stock?.type}
                />

                <Accordion header='All operation (history):'>
                    <HistoryList history={data?.stock?.history} />
                </Accordion>

                {data?.stock?.type === 'stock' &&
                data?.stock?.dividends.length ? (
                    <Accordion header='All dividends:'>
                        <DividendList
                            divList={data.stock.dividends}
                            id={stockId}
                        />
                    </Accordion>
                ) : null}
            </ScrollView>

            {data?.stock?.status === 'active' && (
                <ControlPanel
                    stockId={data?.stock._id}
                    type={data?.stock?.type}
                />
            )}
            {data?.stock?.broker.status === 'inactive' && (
                <Text style={styles.warning}>
                    The broker is not active! You cannot edit operation until
                    the broker is reactivated.
                </Text>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    title: {
        color: 'white',
        fontSize: 24,
        fontWeight: '700',
        textAlign: 'center',
        letterSpacing: 1.1,
        paddingTop: 16,
        paddingBottom: 16,
        borderBottomColor: 'white',
        borderTopColor: 'white',
        borderWidth: 1,
        backgroundColor: '#2756B1',
    },
    warning: {
        color: '#A30000',
        padding: 16,
        fontSize: 20,
        marginBottom: 16,
        textAlign: 'center',
    },
});

export { StockDetails };

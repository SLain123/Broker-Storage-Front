import React, { FC } from 'react';
import { Text, ScrollView, RefreshControl, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

import { useGetStockQuery } from 'api/stockApi';
import { Accordion, BlanketSpinner } from 'components/ui';
import { RequestErrorModal } from 'components/modals';
import { moneyFormater } from 'utils/formaters';
import { StockHistoryList } from 'modules/stock-history/StockHistoryList';
import { ControlPanel, RowDetail } from './components';

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
    const navigation = useNavigation<NavigationProp<any, any>>();
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
                <RowDetail
                    description='Count of Stocks:'
                    value={`${data?.stock?.restCount} unit`}
                />
                <RowDetail
                    description='Total Price of Stock:'
                    value={`${moneyFormater(
                        data?.stock?.restCount * data?.stock?.deltaBuy,
                    )} ${data?.stock?.currency?.ticker}`}
                />
                <RowDetail
                    description='Delta of Buy Price per Unit:'
                    value={`${moneyFormater(data?.stock?.deltaBuy)} ${
                        data?.stock?.currency?.ticker
                    }`}
                />
                <RowDetail
                    description='Summary Broker Fee:'
                    value={`${moneyFormater(data?.stock?.fee)} ${
                        data?.stock?.currency?.ticker
                    }`}
                />
                <RowDetail
                    description='Potential Profit at the moment:'
                    value={`${moneyFormater(data?.stock?.profit)} ${
                        data?.stock?.currency?.ticker
                    }`}
                />
                <RowDetail
                    description='Stock Type:'
                    value={data?.stock?.type}
                />

                <Accordion header='All operation (history):'>
                    <StockHistoryList history={data?.stock?.history} />
                </Accordion>

                {data?.stock?.type === 'stock' &&
                data?.stock?.dividends.length ? (
                    <Accordion header='All dividends:'>
                        <Text>Dividend List</Text>
                    </Accordion>
                ) : null}
            </ScrollView>

            <ControlPanel stockId={data?.stock._id} type={data?.stock?.type} />
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
    row: {
        padding: 8,
        paddingLeft: 16,
        paddingRight: 16,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    text: { color: 'white', fontSize: 16 },
});

export { StockDetails };

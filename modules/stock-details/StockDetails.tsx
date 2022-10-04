import React, { FC, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    RefreshControl,
    StyleSheet,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';

import { useGetStockMutation } from 'api/stockApi';
import { Accordion, BlanketSpinner } from 'components/ui';
import { RequestErrorModal } from 'components/modals';
import { IScreenProps } from 'types/commonTypes';
import { moneyFormater } from 'utils/formaters';
import { StockHistoryList } from 'modules/stock-history/StockHistoryList';

export interface IStockDetails extends IScreenProps {
    route: RouteProp<
        {
            params: {
                stockId: string;
            };
        },
        'params'
    >;
}

const StockDetails: FC<IStockDetails> = ({ route, navigation }) => {
    const { stockId } = route.params;

    const [getStock, { isLoading, isError, data }] = useGetStockMutation();

    const getStockDetails = () => {
        stockId && getStock({ id: stockId });
    };

    useEffect(() => {
        getStockDetails();
    }, [stockId]);

    // useEffect(() => data?.stock && console.log(data.stock), [data]);

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
                    <RefreshControl
                        refreshing={false}
                        onRefresh={getStockDetails}
                    />
                }
            >
                <Text style={styles.title}>{data?.stock?.title}</Text>
                <View style={styles.row}>
                    <Text style={styles.text}>Count of Stocks:</Text>
                    <Text style={styles.text}>
                        {data?.stock?.restCount} unit
                    </Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.text}>Total Price of Stock:</Text>
                    <Text style={styles.text}>
                        {moneyFormater(
                            data?.stock?.restCount * data?.stock?.deltaBuy,
                        )}{' '}
                        {data?.stock?.currency?.ticker}
                    </Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.text}>
                        Delta of Buy Price per Unit:
                    </Text>
                    <Text style={styles.text}>
                        {moneyFormater(data?.stock?.deltaBuy)}{' '}
                        {data?.stock?.currency?.ticker}
                    </Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.text}>Summary Broker Fee:</Text>
                    <Text style={styles.text}>
                        {moneyFormater(data?.stock?.fee)}{' '}
                        {data?.stock?.currency?.ticker}
                    </Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.text}>
                        Potential Profit at the moment:
                    </Text>
                    <Text style={styles.text}>
                        {moneyFormater(data?.stock?.profit)}{' '}
                        {data?.stock?.currency?.ticker}
                    </Text>
                </View>

                <Accordion header='All operation (history):'>
                    <StockHistoryList history={data?.stock?.history} />
                </Accordion>

                {data?.stock?.type === 'stock' &&
                data?.stock?.dividends.length ? (
                    <Accordion header='All dividends:'>
                        <Text>123</Text>
                    </Accordion>
                ) : null}
            </ScrollView>
            {/* <CreateStockPanel navigation={navigation} brokerId={brokerId} /> */}
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

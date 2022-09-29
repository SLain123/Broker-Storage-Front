import React, { FC, useMemo, useEffect } from 'react';
import {
    ScrollView,
    Text,
    StyleSheet,
    RefreshControl,
    View,
} from 'react-native';
import {
    Collapse,
    CollapseHeader,
    CollapseBody,
} from 'accordion-collapse-react-native';

import { useGetBrokerListQuery } from 'api/brokerApi';
import { BlanketSpinner } from 'components/ui';
import { RequestErrorModal } from 'components/modals';
import { StockBrokerItem } from './StockBrokerItem';
import { IScreenProps } from 'types/commonTypes';
import { getAuthStatus } from 'slice/authSlice';
import { useAppSelector } from 'hooks';

const StockBrokerList: FC<IScreenProps> = ({ navigation }) => {
    const isAuth = useAppSelector(getAuthStatus);
    const { data, isLoading, isError, refetch } = useGetBrokerListQuery();

    const activeBrokers = useMemo(
        () =>
            data?.brokerAccounts
                ? data.brokerAccounts.filter(
                      (broker) => broker.status === 'active',
                  )
                : [],
        [data],
    );
    const inactiveBrokers = useMemo(
        () =>
            data?.brokerAccounts
                ? data.brokerAccounts.filter(
                      (broker) => broker.status === 'inactive',
                  )
                : [],
        [data],
    );

    useEffect(() => {
        refetch();
    }, [isAuth]);

    if (isLoading) {
        return <BlanketSpinner />;
    }

    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={false} onRefresh={refetch} />
            }
        >
            {activeBrokers.length ? (
                <View style={styles.container}>
                    {activeBrokers.map(
                        ({ _id, title, sumStocks, cash, currency }) => (
                            <StockBrokerItem
                                key={_id}
                                _id={_id}
                                title={title}
                                sumStocks={sumStocks}
                                currency={currency}
                                cash={cash}
                                navigation={navigation}
                            />
                        ),
                    )}
                </View>
            ) : (
                <Text style={styles.text}>
                    You don't have any active broker accounts. You can create
                    them in the profile. Or you can reactivate one of inactive
                    accounts.
                </Text>
            )}

            {inactiveBrokers.length ? (
                <Collapse style={styles.container}>
                    <CollapseHeader style={styles.accHeaderBlock}>
                        <Text style={styles.accHeaderText}>
                            Inactive brokers
                        </Text>
                    </CollapseHeader>
                    <CollapseBody>
                        {inactiveBrokers.map(
                            ({ _id, title, sumStocks, cash, currency }) => (
                                <StockBrokerItem
                                    key={_id}
                                    _id={_id}
                                    title={title}
                                    sumStocks={sumStocks}
                                    currency={currency}
                                    cash={cash}
                                    navigation={navigation}
                                    disabled
                                />
                            ),
                        )}
                    </CollapseBody>
                </Collapse>
            ) : null}

            <RequestErrorModal
                visible={isError}
                message="Broker list wasn't download from the server. Please, try to reboot the app."
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        borderBottomColor: 'white',
        borderWidth: 1,
        marginLeft: 16,
        marginRight: 16,
        marginBottom: 16,
    },
    accHeaderBlock: {
        color: 'white',
    },
    accHeaderText: {
        color: 'white',
        paddingBottom: 16,
        fontSize: 10,
        textAlign: 'center',
    },
    text: { color: 'white', margin: 16, fontSize: 18 },
});

export { StockBrokerList };

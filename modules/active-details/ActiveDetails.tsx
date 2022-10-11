import React, { FC } from 'react';
import {
    Text,
    ScrollView,
    RefreshControl,
    StyleSheet,
    View,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';

import { useGetActiveQuery } from 'api/activeApi';
import { Accordion, BlanketSpinner } from 'components/ui';
import { RequestErrorModal } from 'components/modals';
import { moneyFormater } from 'utils/formaters';
import { DividendList } from 'modules/dividend/DividendList';
import { ControlPanel } from './components/ControlPanel';

export interface IActiveDetails {
    route: RouteProp<
        {
            params: {
                id: string;
            };
        },
        'params'
    >;
}

const ActiveDetails: FC<IActiveDetails> = ({ route }) => {
    const { id } = route.params;

    const { data, isLoading, isError, refetch } = useGetActiveQuery({
        id,
    });

    if (isLoading) {
        return <BlanketSpinner />;
    }

    if (isError) {
        return (
            <RequestErrorModal
                visible
                message="Active information wasn't download from the server. Please, try to reboot the app."
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
                <Text style={styles.title}>{data?.active?.title}</Text>

                <View style={styles.row}>
                    <Text style={styles.text}>Cash:</Text>
                    <Text style={styles.text}>{`${moneyFormater(
                        data?.active?.cash,
                    )} ${data?.active?.currency?.ticker}`}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.text}>Status:</Text>
                    <Text style={styles.text}>{data?.active?.status}</Text>
                </View>

                {data?.active?.dividends?.length ? (
                    <Accordion header='All payments:'>
                        <DividendList
                            divList={data?.active?.dividends}
                            id={id}
                            type='payment'
                        />
                    </Accordion>
                ) : null}
            </ScrollView>

            <ControlPanel
                id={id}
                title={data?.active?.title}
                status={data?.active?.status}
            />
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

export { ActiveDetails };

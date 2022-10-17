import React, { FC, useEffect, useMemo } from 'react';
import {
    ScrollView,
    RefreshControl,
    View,
    StyleSheet,
    Text,
} from 'react-native';

import { CreateActivePanel, ActiveItem } from './components';
import { useGetAllActiveListQuery } from 'api/activeApi';
import { Accordion } from 'components/ui';
import { RequestErrorModal } from 'components/modals';
import { useAppSelector } from 'hooks';
import { getAuthStatus } from 'slice/authSlice';
import { LoadingPreview } from 'components/loading-preview/LoadingPreview';

const ActiveList: FC = () => {
    const isAuth = useAppSelector(getAuthStatus);
    const { data, isLoading, isError, refetch } = useGetAllActiveListQuery({});

    const activeList = useMemo(
        () =>
            data?.actives
                ? data.actives.filter((act) => act.status === 'active')
                : [],
        [data],
    );
    const disabledList = useMemo(
        () =>
            data?.actives
                ? data.actives.filter((act) => act.status === 'inactive')
                : [],
        [data],
    );

    useEffect(() => {
        refetch();
    }, [isAuth]);

    if (isLoading) {
        return <LoadingPreview />;
    }

    return (
        <>
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={false} onRefresh={refetch} />
                }
            >
                {activeList.length ? (
                    <View style={styles.container}>
                        {activeList.map(
                            ({ _id, status, title, currency, cash }) => (
                                <ActiveItem
                                    key={_id}
                                    _id={_id}
                                    status={status}
                                    title={title}
                                    currency={currency}
                                    cash={cash}
                                />
                            ),
                        )}
                    </View>
                ) : (
                    <Text style={styles.text}>
                        You don't have any actives. You can create them use
                        button below. Or you can reactivate one of disebled
                        actives.
                    </Text>
                )}

                {disabledList.length ? (
                    <Accordion header='Disabled actives'>
                        <View>
                            {disabledList.map(
                                ({ _id, status, title, currency, cash }) => (
                                    <ActiveItem
                                        key={_id}
                                        _id={_id}
                                        status={status}
                                        title={title}
                                        currency={currency}
                                        cash={cash}
                                    />
                                ),
                            )}
                        </View>
                    </Accordion>
                ) : null}

                <RequestErrorModal
                    visible={isError}
                    message="Active list wasn't download from the server. Please, try to reboot the app."
                />
            </ScrollView>
            <CreateActivePanel />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
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

export { ActiveList };

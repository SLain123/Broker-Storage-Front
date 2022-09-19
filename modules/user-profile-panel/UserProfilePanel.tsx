import React, { FC, useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import { useGetUserProfileQuery } from 'api/profileApi';
import { BlanketSpinner, InteractiveStringLink } from 'components/ui';
import { RequestErrorModal } from 'components/modals';
import { BrokerAccountList } from './components/BrokerAccountList';
import { saveToStore } from 'utils/secureStoreFuncs';
import { useAppDispatch, useAppSelector } from 'hooks';
import { setAuthStatus, getAuthStatus } from 'slice/authSlice';

import At from 'assets/icons/at.svg';
import Person from 'assets/icons/person.svg';
import Currency from 'assets/icons/currency.svg';
import Exit from 'assets/icons/exit.svg';

const UserProfilePanel: FC = () => {
    const dispatch = useAppDispatch();
    const { data, isLoading, isError, refetch } = useGetUserProfileQuery();
    const isAuth = useAppSelector(getAuthStatus);

    const exitFromAccount = () => {
        saveToStore('token', '');
        dispatch(setAuthStatus(false));
    };

    useEffect(() => {
        refetch();
    }, [isAuth]);

    if (isLoading) {
        return <BlanketSpinner />;
    }

    if (isError) {
        return (
            <RequestErrorModal
                visible={isError}
                message="User data wasn't download from the server. Please, try to reboot the app."
            />
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <InteractiveStringLink
                icon={<At width={32} height={32} />}
                title={data.user.email}
                disabled
            />
            <InteractiveStringLink
                onPress={() => console.log('press!')}
                icon={<Person width={32} height={32} />}
                title={data.user.nickName}
                desc='You can change your nick here'
            />
            <InteractiveStringLink
                onPress={() => console.log('press!')}
                icon={<Currency width={32} height={32} />}
                title={`${data.user.defaultCurrency.title} ${data.user.defaultCurrency.ticker}`}
                desc='You can change your default currency'
            />
            <BrokerAccountList brokerAccounts={data.user.brokerAccounts} />
            <InteractiveStringLink
                onPress={exitFromAccount}
                icon={<Exit width={32} height={32} />}
                title='Exit from Account'
                desc='You will EXIT from your account press here'
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { padding: 12, marginTop: 32 },
});

export { UserProfilePanel };

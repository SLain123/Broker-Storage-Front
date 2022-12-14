import React, { FC, useEffect } from 'react';
import { StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

import { useGetUserProfileQuery } from 'api/profileApi';
import { InteractiveStringLink } from 'components/ui';
import { RequestErrorModal } from 'components/modals';
import { BrokerAccountList } from '../broker-accounts/BrokerAccountList';
import { saveToStore } from 'utils/secureStoreFuncs';
import { useAppDispatch, useAppSelector } from 'hooks';
import { setAuthStatus, getAuthStatus, setPin } from 'slice/authSlice';
import { LoadingPreview } from 'components/loading-preview/LoadingPreview';

import At from 'assets/icons/at.svg';
import Person from 'assets/icons/person.svg';
import Currency from 'assets/icons/currency.svg';
import Message from 'assets/icons/message.svg';
import Pin from 'assets/icons/pin.svg';
import Exit from 'assets/icons/exit.svg';

const UserProfilePanel: FC = () => {
    const navigation = useNavigation<NavigationProp<any, any>>();
    const dispatch = useAppDispatch();
    const { data, isLoading, isError, refetch } = useGetUserProfileQuery();
    const isAuth = useAppSelector(getAuthStatus);

    const exitFromAccount = () => {
        saveToStore('token', '');
        saveToStore('pin', '');
        dispatch(setAuthStatus(false));
        dispatch(setPin([]));
    };

    useEffect(() => {
        refetch();
    }, [isAuth]);

    if (isLoading) {
        return <LoadingPreview />;
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
        <ScrollView
            contentContainerStyle={styles.container}
            refreshControl={
                <RefreshControl refreshing={false} onRefresh={refetch} />
            }
        >
            <InteractiveStringLink
                icon={<At width={32} height={32} />}
                title={data.user.email}
                disabled
            />
            <InteractiveStringLink
                onPress={() => navigation.navigate('Edit Nick')}
                icon={<Person width={32} height={32} />}
                title={data.user.nickName}
                desc='You can change your nick here'
            />
            <InteractiveStringLink
                onPress={() => navigation.navigate('Edit Currency')}
                icon={<Currency width={32} height={32} />}
                title={`${data.user.defaultCurrency.title} ${data.user.defaultCurrency.ticker}`}
                desc='You can change your default currency'
            />
            <InteractiveStringLink
                onPress={() => navigation.navigate('Edit Pin')}
                icon={<Pin width={32} height={28} />}
                title='PIN Code'
                desc='Create or change your PIN code'
            />

            <BrokerAccountList brokerAccounts={data.user.brokerAccounts} />

            <InteractiveStringLink
                onPress={() => navigation.navigate('Send Email')}
                icon={<Message width={30} height={30} />}
                title={'Send message to Author App'}
                desc='You can send your feedback to author'
            />
            <InteractiveStringLink
                onPress={exitFromAccount}
                icon={<Exit width={32} height={32} />}
                title='Exit from Account'
                desc='You will EXIT from your account press here'
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { padding: 12 },
});

export { UserProfilePanel };

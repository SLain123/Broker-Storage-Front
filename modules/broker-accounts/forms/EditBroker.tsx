import React, { FC, useEffect } from 'react';
import { useWindowDimensions, StyleSheet, RefreshControl } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { RouteProp } from '@react-navigation/native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { FormBtn, FormInput } from 'components/ui';
import { RequestErrorModal } from 'components/modals';
import { ICreateBrokerReq, BrokerStatus } from 'types/brokerTypes';
import { useEditBrokerMutation } from 'api/brokerApi';
import { useGetUserProfileQuery } from 'api/profileApi';

export interface IEditBroker {
    route: RouteProp<
        {
            params: {
                _id: string;
                title: string;
                status: BrokerStatus;
                cash: number;
            };
        },
        'params'
    >;
}

const EditBroker: FC<IEditBroker> = ({ route }) => {
    const navigation = useNavigation<NavigationProp<any, any>>();
    const { _id, title, status, cash } = route.params;

    const window = useWindowDimensions();
    const [editBroker, { isLoading, isError, isSuccess }] =
        useEditBrokerMutation();
    const { refetch } = useGetUserProfileQuery();

    const isDisabled = isSuccess || isLoading;
    const initialValues: ICreateBrokerReq = {
        title,
        cash: String(cash),
    };
    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Broker Name is Required'),
        cash: Yup.number()
            .min(0, 'Specify Amount of Cash, min 0')
            .max(999999999999, 'Amount is Too Large'),
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: ({ title, cash }) => {
            status === 'active' && editBroker({ id: _id, title, cash });
        },
    });
    const { handleSubmit, resetForm } = formik;

    const resetAllForm = () => {
        resetForm();
    };

    useEffect(() => {
        if (isSuccess) {
            refetch();
            navigation.navigate('Account');
        }
    }, [isSuccess]);

    return (
        <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
            ...styles.container,
            paddingTop: window.height >= 700 ? '20%' : 10,
        }}
        refreshControl={
            <RefreshControl refreshing={false} onRefresh={resetAllForm} />
        }
    >
            <FormInput
                formik={formik}
                field='title'
                editable={!isDisabled}
                placeholder='Type Broker Name'
            />
            <FormInput
                formik={formik}
                field='cash'
                editable={!isDisabled}
                placeholder='Specify the amount of Сash'
                keyboardType='number-pad'
            />

            <FormBtn
                onPress={handleSubmit as any}
                isLoading={isLoading}
                btnText='Change Broker'
            />
            <RequestErrorModal
                visible={isError}
                message='Broker has not been changed. Try to reboot the app and repeat changing'
            />
        </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
        paddingBottom: 16,
    },
});

export { EditBroker };

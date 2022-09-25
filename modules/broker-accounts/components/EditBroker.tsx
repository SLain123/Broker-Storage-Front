import React, { FC, useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { RouteProp } from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown';

import { IScreenProps, StatusType } from 'types/commonTypes';
import { FormBtn, FormInput, CurrencySelect } from 'components/ui';
import { RequestErrorModal } from 'components/modals';
import { ICurrency } from 'types/currencyTypes';
import { ICreateBrokerReq } from 'types/brokerTypes';
import { useEditBrokerMutation } from 'api/brokerApi';
import { useGetUserProfileQuery } from 'api/profileApi';

export interface IEditBroker extends IScreenProps {
    route: RouteProp<
        {
            params: {
                _id: string;
                title: string;
                status: StatusType;
                cash: number;
                currency: ICurrency;
            };
        },
        'params'
    >;
}

const EditBroker: FC<IEditBroker> = ({ navigation, route }) => {
    const dropdownRef = useRef<SelectDropdown>(null);
    const { _id, title, status, cash, currency } = route.params;

    const [editBroker, { isLoading, isError, isSuccess }] =
        useEditBrokerMutation();
    const { refetch } = useGetUserProfileQuery();

    const isDisabled = isSuccess || isLoading;
    const initialValues: ICreateBrokerReq = {
        title,
        cash: String(cash),
        currencyId: currency._id,
    };
    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Broker Name is Required'),
        currencyId: Yup.string().required('Broker Currency is Required'),
        cash: Yup.number()
            .min(0, 'Specify Amount of Cash, min 0')
            .max(999999999999, 'Amount is Too Large'),
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: ({ title, cash, currencyId }) => {
            status === 'active' &&
                editBroker({ id: _id, title, cash, currencyId });
        },
    });
    const { handleSubmit, resetForm } = formik;

    const resetAllForm = () => {
        resetForm();
        dropdownRef.current.reset();
    };

    useEffect(() => {
        if (isSuccess) {
            refetch();
            navigation.navigate('Account');
        }
    }, [isSuccess]);

    return (
        <ScrollView
            contentContainerStyle={styles.container}
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
            <CurrencySelect
                formik={formik}
                isDisabled={isDisabled}
                dropdownRef={dropdownRef}
                defaultBtnText={`${currency.title} (${currency.ticker})`}
                formikFieldName='currencyId'
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
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
    },
});

export { EditBroker };

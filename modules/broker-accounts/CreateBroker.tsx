import React, { useEffect, useRef, FC } from 'react';
import { ScrollView, StyleSheet, Text, RefreshControl } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SelectDropdown from 'react-native-select-dropdown';

import { ICreateBrokerReq } from 'types/brokerTypes';
import { FormBtn, FormInput, CurrencySelect } from 'components/ui';
import { RequestErrorModal } from 'components/modals';
import { IScreenProps } from 'types/commonTypes';
import { useGetUserProfileQuery } from 'api/profileApi';
import { useCreateBrokerMutation } from 'api/brokerApi';

const CreateBroker: FC<IScreenProps> = ({ navigation }) => {
    const dropdownRef = useRef<SelectDropdown>(null);
    const { data, refetch } = useGetUserProfileQuery();
    const [createBroker, { isSuccess, isLoading, isError }] =
        useCreateBrokerMutation();

    const isDisabled = isLoading || isSuccess;

    const initialValues: ICreateBrokerReq = {
        title: '',
        currencyId: data.user.defaultCurrency._id,
        cash: -1,
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
        onSubmit: ({ title, currencyId, cash }) => {
            createBroker({ title, currencyId, cash });
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
            <Text style={styles.title}>Create New Broker</Text>
            <FormInput
                formik={formik}
                field='title'
                isDisabled={!isDisabled}
                placeholder='Type Broker Name'
            />
            <CurrencySelect
                formik={formik}
                isDisabled={isDisabled}
                dropdownRef={dropdownRef}
                defaultBtnText={`${data.user.defaultCurrency.title} (${data.user.defaultCurrency.ticker})`}
                formikFieldName='currencyId'
            />
            <FormInput
                formik={formik}
                field='cash'
                isDisabled={!isDisabled}
                placeholder='Specify the amount of Сash'
                keyboardType='number-pad'
            />

            <FormBtn
                onPress={handleSubmit as any}
                isDisabled={isDisabled}
                isLoading={isLoading}
                btnText='Create Broker'
            />
            <RequestErrorModal
                visible={isError}
                message="Broker wasn't create. Please, try to reboot the app."
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
    title: {
        fontSize: 20,
        marginBottom: 16,
        color: 'white',
    },
});

export { CreateBroker };

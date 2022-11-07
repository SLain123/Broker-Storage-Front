import React, { useEffect, FC, useRef } from 'react';
import {
    useWindowDimensions,
    StyleSheet,
    Text,
    RefreshControl,
} from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import {
    FormBtn,
    FormInput,
    CurrencySelect,
    FormStatusBlock,
    BlanketSpinner,
} from 'components/ui';
import { useCreateActiveMutation } from 'api/activeApi';
import { ICreateActiveReq } from 'types/activeTypes';
import { useGetUserProfileQuery } from 'api/profileApi';

const CreateActiveForm: FC = () => {
    const navigation = useNavigation<NavigationProp<any, any>>();
    const dropdownRef = useRef<SelectDropdown>(null);

    const window = useWindowDimensions();
    const [createActive, { isLoading, isSuccess, data, error }] =
        useCreateActiveMutation();
    const { data: userData, isLoading: userLoading } = useGetUserProfileQuery();

    const isDisabled = isLoading || isSuccess;
    const defaultBtnText = userData?.user?.defaultCurrency
        ? `${userData.user.defaultCurrency.title} (${userData.user.defaultCurrency.ticker})`
        : 'Specify active currency';

    const initialValues: ICreateActiveReq = {
        title: '',
        currencyId: userData?.user?.defaultCurrency?._id
            ? userData.user.defaultCurrency._id
            : '',
        cash: -1,
    };
    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Name of stock is Required'),
        currencyId: Yup.string().required('Broker Currency is Required'),
        cash: Yup.number()
            .typeError(
                'Cash must be a number, use a dot for fractional numbers',
            )
            .min(0, 'Specify Amount of Cash, min 0')
            .max(999999999999, 'Amount is Too Large'),
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        validationSchema,
        onSubmit: ({ title, currencyId, cash }) => {
            createActive({ title, currencyId, cash });
        },
    });
    const { handleSubmit, resetForm } = formik;

    const resetAllForm = () => {
        resetForm();
        dropdownRef.current.reset();
    };

    useEffect(() => {
        if (isSuccess) {
            setTimeout(() => {
                navigation.goBack();
            }, 1500);
        }
    }, [isSuccess]);

    if (userLoading) {
        <BlanketSpinner />;
    }

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
            <Text style={styles.title}>Create New Active</Text>

            <FormInput
                formik={formik}
                field='title'
                editable={!isDisabled}
                placeholder='Specify Name of Active'
            />
            <CurrencySelect
                formik={formik}
                isDisabled={isDisabled}
                dropdownRef={dropdownRef}
                defaultBtnText={defaultBtnText}
                formikFieldName='currencyId'
            />
            <FormInput
                formik={formik}
                field='cash'
                editable={!isDisabled}
                placeholder='Specify sum of Cash'
                keyboardType='number-pad'
            />
            <FormStatusBlock data={data} error={error} />

            <FormBtn
                onPress={handleSubmit as any}
                isDisabled={isDisabled}
                isLoading={isLoading}
                btnText='Add Active'
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
    title: {
        fontSize: 20,
        marginBottom: 16,
        color: 'white',
    },
});

export { CreateActiveForm };

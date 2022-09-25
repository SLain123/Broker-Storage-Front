import React, { FC, useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SelectDropdown from 'react-native-select-dropdown';

import { FormBtn, CurrencySelect } from 'components/ui';
import {
    useGetUserProfileQuery,
    useChangeUserDataMutation,
} from 'api/profileApi';
import { IScreenProps } from 'types/commonTypes';
import { RequestErrorModal } from 'components/modals';

const EditCurrency: FC<IScreenProps> = ({ navigation }) => {
    const { data, refetch } = useGetUserProfileQuery();
    const [changeUserData, { isSuccess, isError, isLoading: isLoadChanging }] =
        useChangeUserDataMutation();

    const dropdownRef = useRef<SelectDropdown>(null);
    const isDisabled = isLoadChanging || isSuccess;

    const initialValues: { defaultCurrencyId: string } = {
        defaultCurrencyId: data.user.defaultCurrency._id,
    };
    const validationSchema = Yup.object().shape({
        defaultCurrencyId: Yup.string().required(
            'Default Currency is Required',
        ),
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: ({ defaultCurrencyId }) => {
            changeUserData({
                nickName: data.user.nickName,
                defaultCurrencyId,
            });
        },
    });
    const { handleSubmit, resetForm } = formik;

    const resetAllForm = () => {
        dropdownRef.current.reset();
        resetForm();
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
            <CurrencySelect
                formik={formik}
                dropdownRef={dropdownRef}
                isDisabled={isDisabled}
                defaultBtnText={`${data.user.defaultCurrency.title} (${data.user.defaultCurrency.ticker})`}
            />
            <FormBtn
                onPress={handleSubmit as any}
                isDisabled={isDisabled}
                isLoading={isLoadChanging}
                btnText='Change Currency'
            />
            <RequestErrorModal
                visible={isError}
                message='Currency has not been changed. Try to reboot the app and repeat changing'
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

export { EditCurrency };

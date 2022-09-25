import React, { FC, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, RefreshControl } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { FormInput, FormBtn } from 'components/ui';
import {
    useGetUserProfileQuery,
    useChangeUserDataMutation,
} from 'api/profileApi';
import { IScreenProps } from 'types/commonTypes';
import { RequestErrorModal } from 'components/modals';

const EditNick: FC<IScreenProps> = ({ navigation }) => {
    const { data, refetch } = useGetUserProfileQuery();
    const [changeUserData, { isSuccess, isError, isLoading }] =
        useChangeUserDataMutation();

    const isDisabled = isLoading || isSuccess;
    const initialValues: { nickName: string } = {
        nickName: data.user.nickName,
    };
    const validationSchema = Yup.object().shape({
        nickName: Yup.string().required('Nickname is Required'),
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: ({ nickName }) => {
            changeUserData({
                nickName,
                defaultCurrencyId: data.user.defaultCurrency._id,
            });
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
        <ScrollView
            contentContainerStyle={styles.container}
            refreshControl={
                <RefreshControl refreshing={false} onRefresh={resetAllForm} />
            }
        >
            <FormInput
                formik={formik}
                field='nickName'
                placeholder='Your nick or first name'
                editable={!isDisabled}
            />
            <FormBtn
                onPress={handleSubmit as any}
                isLoading={isDisabled}
                btnText='Change Nick'
            />
            <RequestErrorModal
                visible={isError}
                message='Nick has not been changed. Try to reboot the app and repeat changing'
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

export { EditNick };

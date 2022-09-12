import React, { useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, Text, RefreshControl } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SelectDropdown from 'react-native-select-dropdown';

import { IInitialValues } from './RegisterType';
import { CurrencySelect, StatusBlock } from './components';
import { useMakeRegisterMutation } from 'api/registerApi';
import { FormInput } from 'components/form-input/FormInput';
import { FormBtn } from 'components/form-btn/FormBtn';

const RegisterModule = ({ navigation }) => {
    const dropdownRef = useRef<SelectDropdown>(null);
    const [makeRegister, { isSuccess, isLoading, data, error }] =
        useMakeRegisterMutation();

    const isDisabled = isLoading || isSuccess;

    const initialValues: IInitialValues = {
        email: '',
        password: '',
        confirmPassword: '',
        nickName: '',
        defaultCurrencyId: '',
    };
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid Email')
            .required('Email is Required'),
        password: Yup.string()
            .min(6, 'Too Short Password')
            .required('Password is Required'),
        confirmPassword: Yup.string()
            .required('Confirm your Password')
            .test(
                'confirm-password-test',
                'Password and confirm password should match',
                function (value) {
                    return value === this.parent.password;
                },
            ),
        nickName: Yup.string().required('Nickname is Required'),
        defaultCurrencyId: Yup.string().required(
            'Default Currency is Required',
        ),
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: ({ email, password, nickName, defaultCurrencyId }) => {
            makeRegister({
                email,
                password,
                nickName,
                defaultCurrencyId,
            });
        },
    });
    const { handleSubmit, resetForm } = formik;

    const resetAllForm = () => {
        resetForm();
        dropdownRef.current.reset();
    };

    useEffect(() => {
        isSuccess &&
            setTimeout(
                () => navigation.navigate('Login', { test: 'test' }),
                3000,
                [isSuccess],
            );
    });

    return (
        <ScrollView
            contentContainerStyle={styles.container}
            refreshControl={
                <RefreshControl refreshing={false} onRefresh={resetAllForm} />
            }
        >
            <Text style={styles.title}>Sign up</Text>
            <FormInput
                formik={formik}
                field='email'
                isDisabled={!isDisabled}
                placeholder='Email Address'
                keyboardType='email-address'
            />
            <FormInput
                formik={formik}
                field='password'
                isDisabled={!isDisabled}
                placeholder='Password'
                secureTextEntry
            />
            <FormInput
                formik={formik}
                field='confirmPassword'
                isDisabled={!isDisabled}
                placeholder='Confirm Password'
                secureTextEntry
            />
            <FormInput
                formik={formik}
                field='nickName'
                isDisabled={!isDisabled}
                placeholder='Your nick or first name'
            />
            <CurrencySelect
                formik={formik}
                isDisabled={isDisabled}
                dropdownRef={dropdownRef}
            />

            <StatusBlock data={data} error={error} />
            <FormBtn
                onPress={handleSubmit as any}
                isDisabled={isDisabled}
                isLoading={isLoading}
                btnText='Sign up'
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

export { RegisterModule };

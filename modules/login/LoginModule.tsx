import React, { useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, Text, RefreshControl } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { IInitialValues } from './LoginType';
import { LoginStatusBlock } from './LoginStatusBlock';
import { useMakeLoginMutation } from 'api/authApi';
import { FormInput, FormLink, FormBtn } from 'components/ui';

const LoginModule = ({ navigation }) => {
    const [makeLogin, { isSuccess, isLoading, data, error }] =
        useMakeLoginMutation();

    const isDisabled = isLoading || isSuccess;

    const initialValues: IInitialValues = {
        email: '',
        password: '',
    };
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid Email')
            .required('Email is Required'),
        password: Yup.string()
            .min(6, 'Too Short Password')
            .required('Password is Required'),
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: ({ email, password }) => {
            makeLogin({
                email,
                password,
            }).then((result) => console.log(result));
        },
    });
    const { handleSubmit, resetForm } = formik;

    const resetAllForm = () => {
        resetForm();
    };

    // useEffect(() => {
    //     isSuccess &&
    //         setTimeout(
    //             () => navigation.navigate('Login', { test: 'test' }),
    //             3000,
    //             [isSuccess],
    //         );
    // });

    return (
        <ScrollView
            contentContainerStyle={styles.container}
            refreshControl={
                <RefreshControl refreshing={false} onRefresh={resetAllForm} />
            }
        >
            <Text style={styles.title}>Sign in</Text>
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

            <FormLink
                textList={["Don't have an account yet?", 'Sign up here']}
                onPress={() => navigation.navigate('Register')}
            />
            <LoginStatusBlock data={data} error={error} />
            <FormBtn
                onPress={handleSubmit as any}
                isDisabled={isDisabled}
                isLoading={isLoading}
                btnText='Sign in'
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

export { LoginModule };

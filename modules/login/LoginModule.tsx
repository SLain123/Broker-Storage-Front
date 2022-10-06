import React, { useEffect, FC } from 'react';
import { ScrollView, StyleSheet, Text, RefreshControl } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigation, NavigationProp } from '@react-navigation/native';

import { IInitialValues } from './LoginType';
import { useMakeLoginMutation } from 'api/authApi';
import { FormInput, FormLink, FormBtn, FormStatusBlock } from 'components/ui';
import { saveToStore } from 'utils/secureStoreFuncs';
import { useAppDispatch } from 'hooks';
import { setAuthStatus } from 'slice/authSlice';

const LoginModule: FC = () => {
    const navigation = useNavigation<NavigationProp<any, any>>();
    const dispatch = useAppDispatch();
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
            });
        },
    });
    const { handleSubmit, resetForm } = formik;

    const resetAllForm = () => {
        resetForm();
    };

    useEffect(() => {
        if (isSuccess) {
            saveToStore('token', data.token);
            saveToStore('userId', data.userId);
            setTimeout(() => {
                dispatch(setAuthStatus(true));
            }, 1500);
        }
    }, [isSuccess]);

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
                editable={!isDisabled}
                placeholder='Email Address'
                keyboardType='email-address'
            />
            <FormInput
                formik={formik}
                field='password'
                editable={!isDisabled}
                placeholder='Password'
                secureTextEntry
            />

            <FormLink
                textList={["Don't have an account yet?", 'Sign up here']}
                onPress={() => navigation.navigate('Register')}
            />
            <FormStatusBlock data={data} error={error} />

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

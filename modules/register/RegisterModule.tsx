import React, { useEffect, useRef, FC } from 'react';
import {
    StyleSheet,
    Text,
    RefreshControl,
    useWindowDimensions,
} from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SelectDropdown from 'react-native-select-dropdown';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { IInitialValues } from './RegisterType';
import { useMakeRegisterMutation } from 'api/authApi';
import {
    FormBtn,
    FormInput,
    FormLink,
    CurrencySelect,
    FormStatusBlock,
} from 'components/ui';

const RegisterModule: FC = () => {
    const navigation = useNavigation<NavigationProp<any, any>>();
    const dropdownRef = useRef<SelectDropdown>(null);

    const window = useWindowDimensions();
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
        isSuccess && setTimeout(() => navigation.navigate('Login'), 1500);
    }, [isSuccess]);

    return (
        <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                ...styles.container,
                paddingTop: window.height >= 700 ? '30%' : 10,
            }}
            refreshControl={
                <RefreshControl refreshing={false} onRefresh={resetAllForm} />
            }
        >
            <Text style={styles.title}>Sign up</Text>
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
            <FormInput
                formik={formik}
                field='confirmPassword'
                editable={!isDisabled}
                placeholder='Confirm Password'
                secureTextEntry
            />
            <FormInput
                formik={formik}
                field='nickName'
                editable={!isDisabled}
                placeholder='Your nick or first name'
            />
            <CurrencySelect
                formik={formik}
                isDisabled={isDisabled}
                dropdownRef={dropdownRef}
            />

            <FormLink
                textList={['Already have an account?', 'Sign in here']}
                onPress={() => navigation.navigate('Login')}
            />
            <FormStatusBlock data={data} error={error} />

            <FormBtn
                onPress={handleSubmit as any}
                isDisabled={isDisabled}
                isLoading={isLoading}
                btnText='Sign up'
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

export { RegisterModule };

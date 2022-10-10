import React, { useEffect, FC } from 'react';
import { ScrollView, StyleSheet, Text, RefreshControl } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { RouteProp } from '@react-navigation/native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

import {
    FormInput,
    FormBtn,
    FormCalendar,
    FormStatusBlock,
} from 'components/ui';
import { useCreatePaymentMutation } from 'api/paymentsApi';
import { ICreatePaymentReq } from 'types/dividendTypes';
import { useGetActiveQuery } from 'api/activeApi';

interface ICreateDividendForm {
    route: RouteProp<
        {
            params: {
                activeId: string;
            };
        },
        'params'
    >;
}

const CreatePaymentForm: FC<ICreateDividendForm> = ({ route }) => {
    const navigation = useNavigation<NavigationProp<any, any>>();
    const { activeId } = route.params;

    const [createPayment, { isLoading, isSuccess, data, error }] =
        useCreatePaymentMutation();
    const { refetch } = useGetActiveQuery({ id: activeId });

    const isDisabled = isLoading || isSuccess;

    const initialValues: ICreatePaymentReq = {
        activeId,
        date: '',
        payment: 0,
    };
    const validationSchema = Yup.object().shape({
        date: Yup.string().required('Transaction Date is Required'),
        payment: Yup.number()
            .min(1, 'Specify sum of payment, min 1')
            .max(999999999999, 'Amount is Too Large'),
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: ({ activeId, date, payment }) => {
            createPayment({
                activeId,
                date,
                payment,
            });
        },
    });
    const { handleSubmit, resetForm } = formik;

    const resetAllForm = () => {
        resetForm();
    };

    useEffect(() => {
        if (isSuccess) {
            setTimeout(() => {
                refetch();
                navigation.navigate('Active Details', {
                    id: activeId,
                });
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
            <Text style={styles.title}>Add New Payment</Text>

            <FormCalendar
                formik={formik}
                field='date'
                placeholder='Select the transaction date'
            />
            <FormInput
                formik={formik}
                field='payment'
                editable={!isDisabled}
                placeholder='Specify the Sum of Dividend'
                keyboardType='number-pad'
            />
            <FormStatusBlock data={data} error={error} />

            <FormBtn
                onPress={handleSubmit as any}
                isDisabled={isDisabled}
                isLoading={isLoading}
                btnText='Add Payment'
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

export { CreatePaymentForm };

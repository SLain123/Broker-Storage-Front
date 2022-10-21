import React, { useEffect, FC } from 'react';
import {
    useWindowDimensions,
    StyleSheet,
    Text,
    RefreshControl,
} from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { RouteProp } from '@react-navigation/native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import {
    FormInput,
    FormBtn,
    FormCalendar,
    FormStatusBlock,
} from 'components/ui';
import { useCreateDivMutation } from 'api/dividendApi';
import { ICreateDividendReq } from 'types/dividendTypes';
import { useGetStockQuery } from 'api/stockApi';

interface ICreateDividendForm {
    route: RouteProp<
        {
            params: {
                stockId: string;
            };
        },
        'params'
    >;
}

const CreateDividendForm: FC<ICreateDividendForm> = ({ route }) => {
    const navigation = useNavigation<NavigationProp<any, any>>();
    const { stockId } = route.params;

    const window = useWindowDimensions();
    const [createDiv, { isLoading, isSuccess, data, error }] =
        useCreateDivMutation();
    const { refetch } = useGetStockQuery({ id: stockId });

    const isDisabled = isLoading || isSuccess;

    const initialValues: ICreateDividendReq = {
        stockId,
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
        onSubmit: ({ stockId, date, payment }) => {
            createDiv({
                stockId,
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
                navigation.navigate('Stock Details', {
                    stockId,
                });
            }, 1500);
        }
    }, [isSuccess]);

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
            <Text style={styles.title}>Add New Dividend Payment</Text>

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
                btnText='Add Dividend'
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

export { CreateDividendForm };

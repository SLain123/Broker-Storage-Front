import React, { useEffect, FC, useRef, useMemo } from 'react';
import { ScrollView, StyleSheet, Text, RefreshControl } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { RouteProp } from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown';
import { useNavigation, NavigationProp } from '@react-navigation/native';

import {
    FormInput,
    FormBtn,
    FormCalendar,
    FormSelect,
    FormStatusBlock,
} from 'components/ui';
import { useAddStockMutation } from 'api/stockApi';
import { IAddStockReq } from 'types/stockTypes';
import { useGetBrokerListQuery } from 'api/brokerApi';

interface IAddStockForm {
    route: RouteProp<
        {
            params: {
                stockId: string;
            };
        },
        'params'
    >;
}

const AddStockForm: FC<IAddStockForm> = ({ route }) => {
    const navigation = useNavigation<NavigationProp<any, any>>();
    const { stockId } = route.params;

    const [addStock, { isLoading, isSuccess, data, error }] =
        useAddStockMutation();
    const { refetch } = useGetBrokerListQuery();

    const dropdownRef = useRef<SelectDropdown>(null);
    const isDisabled = isLoading || isSuccess;

    const selectActionList = useMemo(() => ['buy', 'sell'], []);

    const initialValues: IAddStockReq = {
        id: stockId,
        action: '',
        date: '',
        count: 0,
        pricePerSingle: -1,
        fee: -1,
    };
    const validationSchema = Yup.object().shape({
        action: Yup.string().required('Chose operation type'),
        date: Yup.string().required('Transaction Date is Required'),
        count: Yup.number()
            .min(1, 'Specify count of stock, min 1')
            .max(999999999999, 'Amount is Too Large'),
        pricePerSingle: Yup.number()
            .min(0, 'Specify price of stock, min 0')
            .max(999999999999, 'Amount is Too Large'),
        fee: Yup.number()
            .min(0, 'Specify fee of stock, min 0')
            .max(999999999999, 'Amount is Too Large'),
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: ({ id, action, date, count, pricePerSingle, fee }) => {
            addStock({
                id,
                action,
                date,
                count,
                pricePerSingle,
                fee,
            });
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
                refetch();
                navigation.goBack();
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
            <Text style={styles.title}>Add Buy/Sell Operation</Text>

            <FormSelect
                formik={formik}
                formikFieldName='action'
                dropdownRef={dropdownRef}
                defaultBtnText='Select operation type'
                selectList={selectActionList}
            />
            <FormCalendar
                formik={formik}
                field='date'
                placeholder='Select the transaction date'
            />
            <FormInput
                formik={formik}
                field='count'
                editable={!isDisabled}
                placeholder='Specify the Count of Stock'
                keyboardType='number-pad'
            />
            <FormInput
                formik={formik}
                field='pricePerSingle'
                editable={!isDisabled}
                placeholder='Specify the Price of Stock'
                keyboardType='number-pad'
            />
            <FormInput
                formik={formik}
                field='fee'
                editable={!isDisabled}
                placeholder='Specify the Fee of Stock'
                keyboardType='number-pad'
            />
            <FormStatusBlock data={data} error={error} />

            <FormBtn
                onPress={handleSubmit as any}
                isDisabled={isDisabled}
                isLoading={isLoading}
                btnText='Add Operation'
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

export { AddStockForm };
import React, { useEffect, FC, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, RefreshControl } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { RouteProp } from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown';

import { FormInput, FormBtn, FormCalendar, TypeSelect } from 'components/ui';
import { IScreenProps } from 'types/commonTypes';
import { useCreateStockMutation } from 'api/stockApi';
import { ICreateStockReq } from 'types/stockTypes';
import { CreateStatusBlock } from './CreateStatusBlock';

interface ICreateStockForm extends IScreenProps {
    route: RouteProp<
        {
            params: {
                brokerId: string;
            };
        },
        'params'
    >;
}

const CreateStockForm: FC<ICreateStockForm> = ({ navigation, route }) => {
    const { brokerId } = route.params;
    const [stockId, setStockId] = useState('');

    const [createStock, { isLoading, isSuccess, data, error }] =
        useCreateStockMutation();

    const dropdownRef = useRef<SelectDropdown>(null);
    const isDisabled = isLoading || isSuccess;

    const initialValues: ICreateStockReq = {
        date: '',
        title: '',
        count: 0,
        pricePerSingle: -1,
        fee: -1,
        brokerId,
        type: '',
    };
    const validationSchema = Yup.object().shape({
        date: Yup.string().required('Transaction Date is Required'),
        title: Yup.string().required('Password is Required'),
        count: Yup.number()
            .min(1, 'Specify count of stock, min 1')
            .max(999999999999, 'Amount is Too Large'),
        pricePerSingle: Yup.number()
            .min(0, 'Specify price of stock, min 0')
            .max(999999999999, 'Amount is Too Large'),
        fee: Yup.number()
            .min(0, 'Specify fee of stock, min 0')
            .max(999999999999, 'Amount is Too Large'),
        brokerId: Yup.string().required('Broker Currency is Required'),
        type: Yup.string().required('Specify type of stock'),
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: ({
            date,
            title,
            count,
            pricePerSingle,
            fee,
            brokerId,
            type,
        }) => {
            createStock({
                date,
                title,
                count,
                pricePerSingle,
                fee,
                brokerId,
                type,
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
            setStockId(data.stock._id);
            setTimeout(() => {
                navigation.navigate('Stock Details', { stockId });
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
            <Text style={styles.title}>Create New Position</Text>

            <FormCalendar
                formik={formik}
                field='date'
                placeholder='Select the transaction date'
            />
            <FormInput
                formik={formik}
                field='title'
                editable={!isDisabled}
                placeholder='Specify Name of Stock'
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
            <TypeSelect
                formik={formik}
                formikFieldName='type'
                dropdownRef={dropdownRef}
                defaultBtnText='Select stock type'
            />
            <CreateStatusBlock data={data} error={error} />

            <FormBtn
                onPress={handleSubmit as any}
                isDisabled={isDisabled}
                isLoading={isLoading}
                btnText='Add Stock'
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

export { CreateStockForm };

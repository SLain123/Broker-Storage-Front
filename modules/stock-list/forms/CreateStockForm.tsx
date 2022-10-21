import React, { useEffect, FC, useRef, useMemo } from 'react';
import {
    StyleSheet,
    Text,
    RefreshControl,
    useWindowDimensions,
} from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { RouteProp } from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import {
    FormInput,
    FormBtn,
    FormCalendar,
    FormSelect,
    FormStatusBlock,
} from 'components/ui';
import { useCreateStockMutation } from 'api/stockApi';
import { ICreateStockReq } from 'types/stockTypes';
import { useGetBrokerListQuery } from 'api/brokerApi';

interface ICreateStockForm {
    route: RouteProp<
        {
            params: {
                brokerId: string;
            };
        },
        'params'
    >;
}

const CreateStockForm: FC<ICreateStockForm> = ({ route }) => {
    const navigation = useNavigation<NavigationProp<any, any>>();
    const { brokerId } = route.params;

    const window = useWindowDimensions();
    const [createStock, { isLoading, isSuccess, data, error }] =
        useCreateStockMutation();
    const { refetch } = useGetBrokerListQuery();

    const dropdownRef = useRef<SelectDropdown>(null);
    const isDisabled = isLoading || isSuccess;

    const selectTypeList = useMemo(
        () => ['stock', 'bond', 'futures', 'currency'],
        [],
    );

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
        title: Yup.string().required('Name of stock is Required'),
        count: Yup.number()
            .min(1, 'Specify count of stock, min 1')
            .max(999999999999, 'Amount is Too Large'),
        pricePerSingle: Yup.number()
            .min(0, 'Specify price of stock, min 0')
            .max(999999999999, 'Amount is Too Large'),
        fee: Yup.number()
            .min(0, 'Specify fee of stock, min 0')
            .max(999999999999, 'Amount is Too Large'),
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
            setTimeout(() => {
                refetch();
                navigation.goBack();
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
            <FormSelect
                formik={formik}
                formikFieldName='type'
                dropdownRef={dropdownRef}
                defaultBtnText='Select stock type'
                selectList={selectTypeList}
            />
            <FormStatusBlock data={data} error={error} />

            <FormBtn
                onPress={handleSubmit as any}
                isDisabled={isDisabled}
                isLoading={isLoading}
                btnText='Add Stock'
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

export { CreateStockForm };

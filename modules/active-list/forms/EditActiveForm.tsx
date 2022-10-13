import React, { useEffect, FC, useRef } from 'react';
import { ScrollView, StyleSheet, Text, RefreshControl } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    useNavigation,
    NavigationProp,
    RouteProp,
} from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown';

import { FormBtn, FormInput, FormStatusBlock } from 'components/ui';
import { useEditActiveMutation, useGetActiveQuery } from 'api/activeApi';
import { IEditActiveReq } from 'types/activeTypes';

export interface IEditActiveForm {
    route: RouteProp<
        {
            params: {
                id: string;
            };
        },
        'params'
    >;
}

const EditActiveForm: FC<IEditActiveForm> = ({ route }) => {
    const { id } = route.params;
    const navigation = useNavigation<NavigationProp<any, any>>();
    const dropdownRef = useRef<SelectDropdown>(null);

    const { data: activeData, isLoading: isLoadingActive } = useGetActiveQuery({
        id,
    });
    const [editActive, { isLoading, isSuccess, data, error }] =
        useEditActiveMutation();

    const isDisabled = isLoading || isSuccess || isLoadingActive;

    const initialValues: IEditActiveReq = {
        id,
        title: activeData.active.title,
        cash: String(activeData.active.cash),
        status: activeData.active.status,
    };
    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Name of stock is Required'),
        cash: Yup.number()
            .min(0, 'Specify Amount of Cash, min 0')
            .max(999999999999, 'Amount is Too Large'),
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        validationSchema,
        onSubmit: ({ id, title, cash, status }) => {
            editActive({ id, title, cash, status });
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
            <Text style={styles.title}>Edit Active</Text>

            <FormInput
                formik={formik}
                field='title'
                editable={!isDisabled}
                placeholder='Specify Name of Active'
            />
            <FormInput
                formik={formik}
                field='cash'
                editable={!isDisabled}
                placeholder='Specify sum of Cash'
                keyboardType='number-pad'
            />
            <FormStatusBlock data={data} error={error} />

            <FormBtn
                onPress={handleSubmit as any}
                isDisabled={isDisabled}
                isLoading={isLoading || isLoadingActive}
                btnText='Edit Active'
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

export { EditActiveForm };

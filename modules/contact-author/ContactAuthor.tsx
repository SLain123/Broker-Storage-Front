import React, { FC } from 'react';
import { ScrollView, StyleSheet, Text, RefreshControl } from 'react-native';
import Communications from 'react-native-communications';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigation, NavigationProp } from '@react-navigation/native';

import { FormBtn, FormInput } from 'components/ui';

export interface IInitalEmail {
    subject: string;
    body: string;
}

const ContactAuthor: FC = () => {
    const navigation = useNavigation<NavigationProp<any, any>>();

    const initialValues: IInitalEmail = {
        subject: '',
        body: '',
    };
    const validationSchema = Yup.object().shape({
        subject: Yup.string().required('Subject is Required'),
        body: Yup.string().required('Message text is Required'),
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: ({ subject, body }) => {
            openEmail(subject, body);
        },
    });
    const { handleSubmit, resetForm } = formik;

    const openEmail = (subject, body) => {
        Communications.email(['sl163@ya.ru'], null, null, subject, body);
        navigation.goBack();
    };

    return (
        <ScrollView
            contentContainerStyle={styles.container}
            refreshControl={
                <RefreshControl refreshing={false} onRefresh={resetForm} />
            }
        >
            <Text style={styles.title}>Send Email to UBA Author</Text>
            <FormInput
                formik={formik}
                field='subject'
                placeholder='Specify Topic of Email'
            />
            <FormInput
                formik={formik}
                field='body'
                placeholder='Enter message'
                numberOfLines={6}
            />

            <FormBtn onPress={handleSubmit as any} btnText='Send Email' />
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

export { ContactAuthor };

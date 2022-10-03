import React, { FC, useContext } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

import { CalendarContext } from './ContextCalendar';

const InputCalendar: FC = () => {
    const {
        formik,
        field,
        toggleModal,
        placeholder = 'Select the date',
    } = useContext(CalendarContext);

    const errorMessage =
        formik.touched[field] && (formik.errors[field] as string);

    return (
        <>
            <TouchableOpacity
                style={styles.inputContainer}
                onPress={toggleModal}
            >
                {formik.values[field] ? (
                    <Text style={styles.text}>{formik.values[field]}</Text>
                ) : (
                    <Text style={styles.placeholder}>{placeholder}</Text>
                )}
            </TouchableOpacity>
            <Text style={styles.error}>{errorMessage}</Text>
        </>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        padding: 10,
        width: '80%',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 4,
    },
    text: { color: 'white', fontSize: 18 },
    placeholder: {
        color: 'grey',
        fontSize: 18,
    },
    error: { color: '#A30000', padding: 6 },
});

export { InputCalendar };

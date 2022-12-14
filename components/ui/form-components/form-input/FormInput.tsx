import React, { FC } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    KeyboardTypeOptions,
} from 'react-native';
import { FormikProps } from 'formik';

export interface IFormInput {
    formik: FormikProps<any>;
    editable?: boolean;
    field: string;
    placeholder?: string;
    secureTextEntry?: boolean;
    keyboardType?: KeyboardTypeOptions;
    numberOfLines?: number;
}

const FormInput: FC<IFormInput> = ({
    formik,
    editable = true,
    field,
    placeholder = '',
    secureTextEntry = false,
    keyboardType = 'default',
    numberOfLines = 1,
}) => {
    const errorMessage =
        formik.touched[field] && (formik.errors[field] as string);

    return (
        <>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    placeholderTextColor='grey'
                    onChangeText={formik.handleChange(field)}
                    onBlur={formik.handleBlur(field)}
                    value={formik.values[field]}
                    keyboardType={keyboardType}
                    editable={editable}
                    secureTextEntry={secureTextEntry}
                    multiline={numberOfLines > 1}
                    numberOfLines={numberOfLines}
                />
            </View>
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
    input: {
        color: 'white',
        fontSize: 18,
    },
    error: { color: '#A30000', padding: 6 },
});

export { FormInput };

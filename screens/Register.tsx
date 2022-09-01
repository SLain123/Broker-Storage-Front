import { FC, useRef } from 'react';
import {
    ScrollView,
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    RefreshControl,
} from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SelectDropdown from 'react-native-select-dropdown';

const countries = ['Egypt', 'Canada', 'Australia', 'Ireland'];

const Register: FC = () => {
    const dropdownRef = useRef<SelectDropdown>(null);
    const initialValues = {
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

    const {
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        touched,
        errors,
        resetForm,
        setFieldValue,
    } = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => console.log(values),
    });

    const changeCurrency = (currency: any) => {
        setFieldValue('defaultCurrencyId', currency);
    };

    const resetAllForm = () => {
        resetForm();
        dropdownRef.current.reset();
    };

    return (
        <ScrollView
            contentContainerStyle={styles.container}
            refreshControl={
                <RefreshControl refreshing={false} onRefresh={resetAllForm} />
            }
        >
            <Text style={styles.title}>Sign up</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder='Email Address'
                    placeholderTextColor='grey'
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    keyboardType='email-address'
                />
            </View>
            <Text style={styles.error}>{touched.email && errors.email}</Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder='Password'
                    placeholderTextColor='grey'
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    secureTextEntry
                />
            </View>
            <Text style={styles.error}>
                {touched.password && errors.password}
            </Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder='Confirm Password'
                    placeholderTextColor='grey'
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    value={values.confirmPassword}
                    secureTextEntry
                />
            </View>
            <Text style={styles.error}>
                {touched.confirmPassword && errors.confirmPassword}
            </Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder='Your nick or first name'
                    placeholderTextColor='grey'
                    onChangeText={handleChange('nickName')}
                    onBlur={handleBlur('nickName')}
                    value={values.nickName}
                />
            </View>
            <Text style={styles.error}>
                {touched.nickName && errors.nickName}
            </Text>

            <SelectDropdown
                ref={dropdownRef}
                data={countries}
                onSelect={(selectedItem) => changeCurrency(selectedItem)}
                rowTextForSelection={(item) => item}
                defaultButtonText='Select default currency'
                buttonTextAfterSelection={(selectedItem) => selectedItem}
                buttonStyle={styles.selectBody}
                buttonTextStyle={styles.selectText}
                dropdownStyle={styles.dropdownBody}
                rowTextStyle={styles.dropdownText}
                selectedRowTextStyle={styles.dropdownActiveText}
                dropdownOverlayColor='white'
            />
            <Text style={styles.error}>
                {touched.defaultCurrencyId && errors.defaultCurrencyId}
            </Text>

            <TouchableOpacity
                onPress={handleSubmit as any}
                style={styles.sendBtn}
            >
                <Text style={styles.sendText}>Sign up</Text>
            </TouchableOpacity>
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
    error: { color: 'red', padding: 6 },
    sendBtn: {
        backgroundColor: 'white',
        marginHorizontal: 15,
        padding: 15,
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        width: '80%',
    },
    sendText: { color: 'black', fontWeight: 'bold' },
    selectBody: {
        backgroundColor: 'black',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 4,
        width: '80%',
    },
    selectText: {
        color: 'white',
        textAlign: 'justify',
    },
    dropdownBody: {
        backgroundColor: 'black',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 4,
    },
    dropdownText: {
        color: 'white',
    },
    dropdownActiveText: {
        color: '#2756B1',
    },
});

export { Register };

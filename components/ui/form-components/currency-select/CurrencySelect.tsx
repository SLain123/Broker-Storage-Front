import React, { FC, useMemo } from 'react';
import { ActivityIndicator, StyleSheet, Text } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

import { RequestErrorModal } from 'components/modals';
import { useGetCurrencyListQuery } from 'api/currencyApi';
import { ICommonSelect } from 'types/commonTypes';

export interface ICurrencySelect extends Omit<ICommonSelect, 'selectList'> {}

const CurrencySelect: FC<ICurrencySelect> = ({
    dropdownRef,
    formik,
    isDisabled = false,
    defaultBtnText,
    formikFieldName = 'defaultCurrencyId',
}) => {
    const {
        data: currencyList,
        isLoading,
        isError,
    } = useGetCurrencyListQuery();

    const selectCurrencyList = useMemo(
        () =>
            !isLoading && !isError
                ? currencyList.currencies.map(
                      (cur) => `${cur.title} (${cur.ticker})`,
                  )
                : [],
        [isLoading, isError, currencyList],
    );

    const changeCurrency = (index: number) => {
        formik.setFieldValue(
            formikFieldName,
            currencyList.currencies[index]._id,
        );
    };

    return isLoading ? (
        <ActivityIndicator size='large' color='white' style={styles.spin} />
    ) : (
        <>
            <SelectDropdown
                ref={dropdownRef}
                data={selectCurrencyList}
                onSelect={(_selectedItem, index) => {
                    changeCurrency(index);
                }}
                rowTextForSelection={(item) => item}
                defaultButtonText={
                    defaultBtnText ? defaultBtnText : 'Select default currency'
                }
                buttonTextAfterSelection={(selectedItem) => selectedItem}
                buttonStyle={styles.selectBody}
                buttonTextStyle={styles.selectText}
                dropdownStyle={styles.dropdownBody}
                rowTextStyle={styles.dropdownText}
                selectedRowTextStyle={styles.dropdownActiveText}
                dropdownOverlayColor='rgba(255,255,255,0.7)'
                disabled={isDisabled}
            />
            <Text style={styles.error}>
                {formik.touched[formikFieldName] &&
                    formik.errors[formikFieldName]}
            </Text>
            <RequestErrorModal
                visible={isError}
                message="Currency wasn't download from the server. Please, try to reboot the app."
            />
        </>
    );
};

const styles = StyleSheet.create({
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
    error: { color: '#A30000', padding: 6 },
    spin: {
        marginBottom: 24,
    },
});

export { CurrencySelect };

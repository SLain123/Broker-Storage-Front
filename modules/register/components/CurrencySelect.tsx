import React, { FC, useMemo } from 'react';
import { ActivityIndicator, StyleSheet, Text } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

import { ICurrencySelect } from '../RegisterType';
import { useGetCurrencyListQuery } from 'api/currencyApi';

const CurrencySelect: FC<ICurrencySelect> = ({
    dropdownRef,
    formik,
    isDisabled,
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
            'defaultCurrencyId',
            currencyList.currencies[index]._id,
        );
    };

    return isLoading ? (
        <ActivityIndicator size='large' color='white' />
    ) : (
        <>
            <SelectDropdown
                ref={dropdownRef}
                data={selectCurrencyList}
                onSelect={(_selectedItem, index) => {
                    changeCurrency(index);
                }}
                rowTextForSelection={(item) => item}
                defaultButtonText='Select default currency'
                buttonTextAfterSelection={(selectedItem) => selectedItem}
                buttonStyle={styles.selectBody}
                buttonTextStyle={styles.selectText}
                dropdownStyle={styles.dropdownBody}
                rowTextStyle={styles.dropdownText}
                selectedRowTextStyle={styles.dropdownActiveText}
                dropdownOverlayColor='white'
                disabled={isDisabled}
            />
            <Text style={styles.error}>
                {formik.touched.defaultCurrencyId &&
                    formik.errors.defaultCurrencyId}
            </Text>
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
    error: { color: 'red', padding: 6 },
});

export { CurrencySelect };

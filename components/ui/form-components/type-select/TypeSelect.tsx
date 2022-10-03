import React, { FC, useMemo, useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

import { ICommonSelect } from 'types/commonTypes';

const TypeSelect: FC<ICommonSelect> = ({
    dropdownRef,
    formik,
    isDisabled = false,
    defaultBtnText,
    formikFieldName = 'defaultCurrencyId',
}) => {
    const selectTypeList = useMemo(
        () => ['stock', 'bond', 'futures', 'currency'],
        [],
    );

    const changeCurrency = (index: number) => {
        formik.setFieldValue(formikFieldName, selectTypeList[index]);
    };

    return (
        <>
            <SelectDropdown
                ref={dropdownRef}
                data={selectTypeList}
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
                dropdownOverlayColor='white'
                disabled={isDisabled}
            />
            <Text style={styles.error}>
                {formik.touched[formikFieldName] &&
                    formik.errors[formikFieldName]}
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
    error: { color: '#A30000', padding: 6 },
});

export { TypeSelect };

import React, { FC, useState, useCallback } from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    TextInput,
    View,
} from 'react-native';

import { StandartModal } from 'components/modals';
import { IComponentActions } from 'types/commonTypes';

export interface IYearFilter {
    saveYearFunc: (year: number | {}) => void;
    defaultYear?: number;
}

const YearFilter: FC<IYearFilter> & IComponentActions = ({
    saveYearFunc,
    defaultYear = '',
}) => {
    const [isVisibleInputModal, setVisibleInputModal] = useState(false);
    const [inputValue, setValue] = useState(String(defaultYear));
    const [displayError, setError] = useState(false);
    const [title, setTitle] = useState(
        defaultYear ? `Filter by ${defaultYear} year` : 'Add filter by Year',
    );

    const closeInputModal = useCallback(() => {
        setError(false);
        setVisibleInputModal(false);
    }, []);

    const checkYear = () => {
        if (inputValue.match(/^(20)\d{2}$/)) {
            setError(false);
            saveYearFunc(+inputValue);
            setTitle(`Filter by ${inputValue} year`);
            setVisibleInputModal(false);
        } else {
            setError(true);
        }
    };

    const reset = () => {
        setError(false);
        saveYearFunc(defaultYear ? +defaultYear : {});
        setValue(String(defaultYear));
        setTitle(
            defaultYear
                ? `Filter by ${defaultYear} year`
                : 'Add filter by Year',
        );
        setVisibleInputModal(false);
    };

    YearFilter.reset = reset;

    return (
        <>
            <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => setVisibleInputModal(true)}
                style={styles.filterBtn}
            >
                <Text style={styles.filterText}>{title}</Text>
            </TouchableOpacity>

            <StandartModal
                visible={isVisibleInputModal}
                closeModal={closeInputModal}
            >
                <View style={styles.container}>
                    <TextInput
                        value={inputValue}
                        onChangeText={setValue}
                        style={styles.input}
                        placeholder='Specify year for filtering (2000-2099)'
                        keyboardType='number-pad'
                    />

                    <Text style={styles.error}>
                        {displayError && 'Wrong year'}
                    </Text>

                    <View style={styles.btnBlock}>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={checkYear}
                            style={styles.btn}
                        >
                            <Text style={styles.filterText}>
                                Add Year Filter
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={reset}
                            style={styles.btnReset}
                        >
                            <Text style={styles.filterText}>Reset</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </StandartModal>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        width: '100%',
    },
    filterBtn: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 16,
        padding: 8,
        paddingLeft: 16,
        paddingRight: 16,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 4,
    },
    filterText: { color: 'white', fontSize: 16, textAlign: 'center' },
    btnBlock: {
        marginTop: 8,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btn: {
        backgroundColor: '#2756B1',
        borderRadius: 4,
        padding: 16,
        width: '48%',
    },
    btnReset: {
        backgroundColor: '#A30000',
        borderRadius: 4,
        padding: 16,
        width: '48%',
        marginLeft: '4%',
        display: 'flex',
        justifyContent: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 4,
        padding: 8,
        width: '100%',
    },
    error: {
        color: '#A30000',
        marginTop: 8,
    },
});

export { YearFilter };

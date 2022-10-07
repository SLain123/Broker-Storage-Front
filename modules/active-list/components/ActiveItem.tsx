import React, { FC } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

import { IActive } from 'types/activeTypes';
import { moneyFormater } from 'utils/formaters';

export interface IActiveItem extends Omit<IActive, 'dividends'> {}

const ActiveItem: FC<IActiveItem> = ({
    _id,
    title,
    currency,
    cash,
    status,
}) => {
    const navigation = useNavigation<NavigationProp<any, any>>();

    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={0.5}
            onPress={() => navigation.navigate('Active Details', { id: _id })}
        >
            <Text
                style={
                    status === 'inactive'
                        ? styles.disabledName
                        : styles.activeName
                }
            >
                {title}
            </Text>
            <View style={styles.infoBlock}>
                <View style={styles.columns}>
                    <Text style={styles.textInfo}>Cash:</Text>
                </View>
                <View style={styles.columns}>
                    <Text style={styles.textCash}>
                        {moneyFormater(cash)} {currency.ticker}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        borderColor: 'rgba(255,255,255,0.4)',
        borderBottomWidth: 1,
        paddingTop: 8,
    },
    activeName: {
        color: 'white',
        fontSize: 20,
        fontWeight: '700',
        maxHeight: 30,
    },
    disabledName: {
        color: '#A30000',
        fontSize: 20,
        fontWeight: '700',
    },
    infoBlock: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
        marginBottom: 8,
    },
    columns: {
        display: 'flex',
    },
    textInfo: { color: '#2756B1' },
    textCash: {
        color: '#2756B1',
        textAlign: 'right',
    },
});

export { ActiveItem };

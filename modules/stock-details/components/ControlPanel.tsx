import React, { FC } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

import { StockType } from 'types/stockTypes';
import { IScreenProps } from 'types/commonTypes';

export interface IControlPanel extends IScreenProps {
    stockId: string;
    type: StockType;
}

const ControlPanel: FC<IControlPanel> = ({ stockId, type, navigation }) => {
    return (
        <View>
            <TouchableOpacity
                activeOpacity={0.5}
                style={styles.btn}
                onPress={() => navigation.navigate('Add Stock', { stockId })}
            >
                <Text style={styles.btnText}>Add New Operation</Text>
            </TouchableOpacity>
            {type === 'stock' && (
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.btn}
                    onPress={() =>
                        navigation.navigate('Add Dividend', { stockId })
                    }
                >
                    <Text style={styles.btnText}>Add Dividend</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    btn: {
        backgroundColor: '#2756B1',
        width: '80%',
        borderRadius: 4,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 8,
        padding: 16,
    },
    btnText: {
        color: 'white',
        fontWeight: '700',
        textAlign: 'center',
    },
});

export { ControlPanel };

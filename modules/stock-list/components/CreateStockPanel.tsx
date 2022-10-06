import React, { FC } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

import { StaticBottomModal } from 'components/modals';

export interface ICreateStockPanel {
    brokerId: string;
}

const CreateStockPanel: FC<ICreateStockPanel> = ({ brokerId }) => {
    const navigation = useNavigation<NavigationProp<any, any>>();

    return (
        <StaticBottomModal>
            <TouchableOpacity
                style={styles.btn}
                activeOpacity={0.5}
                onPress={() =>
                    navigation.navigate('Create Stock', { brokerId })
                }
            >
                <Text style={styles.text}>Add new Stock</Text>
            </TouchableOpacity>
        </StaticBottomModal>
    );
};

const styles = StyleSheet.create({
    btn: {
        width: '80%',
        backgroundColor: '#2756B1',
        borderRadius: 4,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 4,
        padding: 16,
    },
    text: { color: 'white', textAlign: 'center', fontWeight: '700' },
});

export { CreateStockPanel };

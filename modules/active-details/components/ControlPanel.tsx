import React, { FC } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

export interface IControlPanel {
    activeId: string;
}

const ControlPanel: FC<IControlPanel> = ({ activeId }) => {
    const navigation = useNavigation<NavigationProp<any, any>>();

    return (
        <View>
            <TouchableOpacity
                activeOpacity={0.5}
                style={styles.btn}
                onPress={() => navigation.navigate('Add Payment', { activeId })}
            >
                <Text style={styles.btnText}>Add Payment</Text>
            </TouchableOpacity>

            <TouchableOpacity
                activeOpacity={0.5}
                style={styles.btn}
                onPress={() => navigation.navigate('Edit Active', { activeId })}
            >
                <Text style={styles.btnText}>Edit Active</Text>
            </TouchableOpacity>

            <TouchableOpacity
                activeOpacity={0.5}
                style={styles.btn}
                onPress={() =>
                    navigation.navigate('Remove Active', { activeId })
                }
            >
                <Text style={styles.btnText}>Remove Active</Text>
            </TouchableOpacity>
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

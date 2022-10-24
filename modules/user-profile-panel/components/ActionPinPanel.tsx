import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export interface IActionPinPanel {
    changeFunc: () => void;
    disableFunc: () => void;
}

const ActionPinPanel: FC<IActionPinPanel> = ({ changeFunc, disableFunc }) => {
    return (
        <View style={styles.btnContainer}>
            <TouchableOpacity
                style={styles.btn}
                activeOpacity={0.5}
                onPress={changeFunc}
            >
                <Text style={styles.btnText}>Change PIN</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.btn}
                activeOpacity={0.5}
                onPress={disableFunc}
            >
                <Text style={styles.btnText}>Disable PIN</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    btnContainer: {
        position: 'relative',
        top: '60%',
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        maxWidth: 320,
        width: '100%',
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 4,
    },
    btn: {
        backgroundColor: '#2756B1',
        borderRadius: 4,
        padding: 16,
        width: '48%',
    },
    btnText: { color: 'white', fontSize: 16, textAlign: 'center' },
});

export { ActionPinPanel };

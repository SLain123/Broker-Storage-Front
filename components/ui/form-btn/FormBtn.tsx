import React, { FC } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';

export interface IFormBtn {
    onPress: () => void;
    isLoading?: boolean;
    isDisabled?: boolean;
    btnText: string;
}

const FormBtn: FC<IFormBtn> = ({
    onPress,
    isLoading = false,
    isDisabled = false,
    btnText,
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.sendBtn}
            disabled={isDisabled}
        >
            {isLoading ? (
                <ActivityIndicator size='small' color='black' />
            ) : (
                <Text style={styles.sendText}>{btnText}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
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
});

export { FormBtn };

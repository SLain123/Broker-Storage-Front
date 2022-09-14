import React, { FC } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export interface IFormLink {
    textList: string[];
    onPress: () => void;
}

const FormLink: FC<IFormLink> = ({ textList, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.btn}>
            {textList.map((text) => (
                <Text style={styles.text}>{text}</Text>
            ))}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    btn: { display: 'flex' },
    text: { color: 'white', textAlign: 'center' },
});

export { FormLink };

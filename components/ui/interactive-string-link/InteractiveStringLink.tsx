import React, { FC } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';

import RightArrow from 'assets/icons/right-arrow.svg';

export interface IInteractiveStringLink {
    icon?: React.ReactElement;
    title?: string;
    desc?: string;
    onPress?: () => void;
    disabled?: boolean;
}

const InteractiveStringLink: FC<IInteractiveStringLink> = ({
    icon,
    title,
    desc,
    onPress,
    disabled = false,
}) => {
    return (
        <TouchableOpacity
            onPress={() => {
                !disabled && onPress && onPress();
            }}
            style={styles.container}
            activeOpacity={disabled ? 1 : 0.5}
        >
            <View style={styles.icon}>{icon && icon}</View>
            <View style={styles.textBlock}>
                {title && <Text style={styles.title}>{title}</Text>}
                {desc && <Text style={styles.desc}>{desc}</Text>}
            </View>
            {!disabled && (
                <RightArrow width={25} height={25} style={styles.arrow} />
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        borderBottomColor: 'rgba(255, 255, 255, 0.3)',
        borderBottomWidth: 1,
        display: 'flex',
        flexDirection: 'row',
        padding: 12,
        paddingBottom: 8,
        alignItems: 'center',
    },
    icon: { width: 32, height: 32 },
    textBlock: {
        marginLeft: 16,
        maxWidth: '80%',
        overflow: 'hidden',
    },
    title: { color: 'white', fontSize: 18, maxHeight: 24 },
    desc: { color: '#2756B1', maxHeight: 20 },
    arrow: { marginLeft: 'auto' },
});

export { InteractiveStringLink };

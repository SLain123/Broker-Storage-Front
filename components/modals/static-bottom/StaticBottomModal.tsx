import React, { FC, ReactElement } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

export interface IStaticBottomModal {
    children: ReactElement;
    height?: number | string;
}

const StaticBottomModal: FC<IStaticBottomModal> = ({
    children,
    height = 60,
}) => {
    return (
        <SafeAreaView style={{ ...styles.container, height }}>
            {children}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
    },
});

export { StaticBottomModal };

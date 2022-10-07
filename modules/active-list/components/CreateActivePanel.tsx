import React, { FC } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

import { StaticBottomModal } from 'components/modals';

const CreateActivePanel: FC = () => {
    const navigation = useNavigation<NavigationProp<any, any>>();

    return (
        <StaticBottomModal>
            <TouchableOpacity
                style={styles.btn}
                activeOpacity={0.5}
                onPress={() => navigation.navigate('Create Active')}
            >
                <Text style={styles.text}>Add new Active</Text>
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

export { CreateActivePanel };

import React, { FC, ReactElement } from 'react';
import { Text, StyleSheet } from 'react-native';
import {
    Collapse,
    CollapseHeader,
    CollapseBody,
} from 'accordion-collapse-react-native';

export interface IAccordion {
    header: string;
    children: ReactElement | ReactElement[];
}

const Accordion: FC<IAccordion> = ({ header, children }) => {
    return (
        <Collapse style={styles.container}>
            <CollapseHeader style={styles.accHeaderBlock}>
                <Text style={styles.accHeaderText}>{header}</Text>
            </CollapseHeader>
            <CollapseBody>{children}</CollapseBody>
        </Collapse>
    );
};

const styles = StyleSheet.create({
    container: {
        borderTopColor: 'white',
        borderBottomColor: 'white',
        borderWidth: 1,
        marginLeft: 16,
        marginRight: 16,
        marginBottom: 16,
    },
    accHeaderBlock: {
        color: 'white',
    },
    accHeaderText: {
        color: 'white',
        paddingTop: 16,
        paddingBottom: 16,
        fontSize: 10,
        textAlign: 'center',
    },
});

export { Accordion };

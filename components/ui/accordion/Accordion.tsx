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
    fontSize?: number;
}

const Accordion: FC<IAccordion> = ({ header, children, fontSize = 10 }) => {
    return (
        <Collapse style={styles.container}>
            <CollapseHeader style={styles.accHeaderBlock}>
                <Text style={{ ...styles.accHeaderText, fontSize }}>
                    {header}
                </Text>
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
        textAlign: 'center',
    },
});

export { Accordion };
